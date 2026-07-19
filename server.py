from __future__ import annotations

import json
import re
from io import BytesIO
from typing import Any

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pypdf import PdfReader

app = FastAPI(title="BSP Compliance API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AssistantRequest(BaseModel):
    prompt: str
    documents: dict[str, str] | None = None


def build_assistant_response(prompt: str, documents: dict[str, str] | None = None) -> dict[str, str]:
    normalized = prompt.lower()

    canned: list[dict[str, Any]] = [
        {
            "match": ["isms controls", "key isms"],
            "response": "Key ISMS controls typically include access management, encryption, incident response, change management, monitoring, and vendor risk management.",
        },
        {
            "match": ["incident response"],
            "response": "An incident response program should define detection, escalation, containment, eradication, recovery, and post-incident review processes.",
        },
        {
            "match": ["access management", "access control"],
            "response": "Access management should follow least privilege, strong authentication, and periodic access reviews.",
        },
    ]

    for item in canned:
        if any(keyword in normalized for keyword in item["match"]):
            reference = ""
            if documents:
                for name, text in documents.items():
                    lower_text = text.lower()
                    for keyword in item["match"]:
                        idx = lower_text.find(keyword)
                        if idx != -1:
                            start = max(0, idx - 80)
                            end = min(len(text), idx + len(keyword) + 80)
                            reference = re.sub(r"\s+", " ", text[start:end]).strip()
                            return {"response": item["response"] + "\n\nReference: " + reference}
            return {"response": item["response"]}

    if documents:
        keywords = normalized.split()[:6]
        for name, text in documents.items():
            lower_text = text.lower()
            for keyword in keywords:
                idx = lower_text.find(keyword)
                if idx != -1:
                    start = max(0, idx - 100)
                    end = min(len(text), idx + 100)
                    reference = re.sub(r"\s+", " ", text[start:end]).strip()
def evaluate_checklist(full_text: str, checklist: list[str]) -> list[dict[str, Any]]:
    normalized = full_text.lower()
    results: list[dict[str, Any]] = []

    for item in checklist:
        needle = item.lower()
        idx = normalized.find(needle)
        if idx == -1:
            words = [word for word in needle.split() if word]
            found_words = sum(1 for word in words if word in normalized)
            score = found_words / len(words) if words else 0
            results.append({"item": item, "satisfied": score > 0.6, "score": score})
            continue

        start = max(0, idx - 120)
        end = min(len(full_text), idx + len(item) + 120)
        reference = re.sub(r"\s+", " ", full_text[start:end]).strip()
        results.append({"item": item, "satisfied": True, "reference": reference, "score": 1.0})

    return results


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/assistant")
def assistant(payload: AssistantRequest) -> dict[str, str]:
    return build_assistant_response(payload.prompt, payload.documents)


@app.post("/api/pdf/analyze")
async def analyze_pdf(file: UploadFile = File(...), checklist: str = Form("[]")) -> dict[str, Any]:
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Please upload a PDF file")

    try:
        payload = json.loads(checklist)
        checklist_items = [item for item in payload if isinstance(item, str)]
    except json.JSONDecodeError as exc:
        raise HTTPException(status_code=400, detail="Checklist must be a valid JSON array") from exc

    content = await file.read()
    try:
        reader = PdfReader(BytesIO(content))
    except Exception as exc:
        raise HTTPException(status_code=400, detail="Unable to read the PDF file") from exc

    pages: list[str] = []
    for page in reader.pages:
        text = page.extract_text() or ""
        pages.append(text)

    full_text = " ".join(part for part in pages if part)
    results = evaluate_checklist(full_text, checklist_items)
    return {"fullText": full_text, "results": results}
