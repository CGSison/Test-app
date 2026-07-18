import { useMemo, useState } from "react"
import { answerQuery as ismsAnswer } from "@/api/ismsAssistant"
import bspLogo from "@/imports/bsp-logonew.png"
import headerBg from "@/imports/Header.png"

const NAV_LINKS = ["Space", "Score", "Sign in"]

const QUICK_PROMPTS = [
  "What are the key ISMS controls for BSP?",
  "Summarize the incident response requirements.",
  "How should access management be handled?",
]

type ChatMessage = {
  id: number
  role: "assistant" | "user"
  text: string
}

type ChatSession = {
  id: number
  title: string
  messages: ChatMessage[]
}

const INITIAL_HISTORY: ChatMessage[] = [
  {
    id: 1,
    role: "assistant",
    text: "Hello. I can help answer questions about BSP information security standards, governance controls, and secure operating practices.",
  },
]

const CARDS = [
  {
    id: "space",
    tag: "SPACE",
    aiLabel: "AI-enabled",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" fill="#6366f1" opacity="0.15" />
        <path d="M10 22 C10 16 14 10 16 10 C18 10 22 16 22 22" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <circle cx="16" cy="10" r="2.5" fill="#6366f1"/>
        <path d="M8 22 h16" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: "#6366f1",
    bgAccent: "#ede9fe",
    title: "Privacy Assessment Copilot",
    desc: "Guides PIA completion and generates a secure, review-ready report.",
    features: [
      {
        icon: "⚙️",
        label: "Regulatory-ready workflow",
        detail: "Built around BSP standards and requirements.",
      },
      {
        icon: "🛡️",
        label: "Secure by design",
        detail: "Your data is protected at every step.",
      },
    ],
    cta: "Open Space",
  },
  {
    id: "score",
    tag: "SCORE",
    aiLabel: "AI-enabled",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" fill="#0d9488" opacity="0.15" />
        <path d="M10 20 L14 15 L18 17 L22 11" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="22" cy="11" r="2" fill="#0d9488"/>
      </svg>
    ),
    color: "#0d9488",
    bgAccent: "#d1fae5",
    title: "Supplier Risk Review",
    desc: "Uploads vendor documents and checks compliance against policy and regulation.",
    features: [
      {
        icon: "⚙️",
        label: "Regulatory-ready workflow",
        detail: "Standardized checks aligned with BSP rules.",
      },
      {
        icon: "🛡️",
        label: "Secure by design",
        detail: "End-to-end encryption and access controls.",
      },
    ],
    cta: "Open Score",
  },
  {
    id: "sign",
    tag: "SIGN",
    aiLabel: "AI-enabled",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" fill="#7c3aed" opacity="0.15" />
        <path d="M11 21 L14 18 M16 10 C16 10 22 13 20 18 C19 21 15 23 12 21" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M10 24 L13 21" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: "#7c3aed",
    bgAccent: "#ede9fe",
    title: "ISMS Governance Assistant",
    desc: "Returns questions, context answers from trusted BSP information security standards.",
    features: [
      {
        icon: "⚙️",
        label: "Regulatory-ready workflow",
        detail: "Returns contextual answers from trusted BSP information security standards.",
      },
      {
        icon: "🛡️",
        label: "Secure by design",
        detail: "Verified sources. Private and compliant.",
      },
    ],
    cta: "Open Sign",
  },
]

function GovSeal() {
  return (
    <img
      src={bspLogo}
      alt="Bangko Sentral ng Pilipinas seal"
      style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
    />
  )
}

function Card({ card, onOpen }: { card: (typeof CARDS)[0]; onOpen?: (id: string) => void }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        padding: "28px 28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        boxShadow: "0 2px 16px rgba(15,23,42,0.08)",
        border: "1px solid rgba(226,232,240,0.8)",
      }}
    >
      {/* Tag + AI badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {card.icon}
          <span
            style={{
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.12em",
              color: card.color,
              textTransform: "uppercase",
            }}
          >
            {card.tag}
          </span>
        </div>
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.06em",
            color: "#64748b",
            background: "#f1f5f9",
            border: "1px solid #e2e8f0",
            borderRadius: 20,
            padding: "2px 8px",
            textTransform: "uppercase",
          }}
        >
          {card.aiLabel}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: 17,
          fontWeight: 700,
          color: "#0f172a",
          margin: "0 0 8px",
          lineHeight: 1.3,
        }}
      >
        {card.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: 13,
          color: "#64748b",
          lineHeight: 1.6,
          margin: "0 0 20px",
        }}
      >
        {card.desc}
      </p>

      {/* Divider */}
      <div style={{ height: 1, background: "#f1f5f9", marginBottom: 18 }} />

      {/* Features */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
        {card.features.map((f) => (
          <div key={f.label} style={{ display: "flex", gap: 12 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: card.bgAccent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
                flexShrink: 0,
              }}
            >
              {f.icon}
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#1e293b", margin: "0 0 2px" }}>
                {f.label}
              </p>
              <p style={{ fontSize: 11.5, color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                {f.detail}
              </p>
                  </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button
        onClick={() => onOpen?.(card.id)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          width: "100%",
          padding: "11px 0",
          borderRadius: 8,
          border: "none",
          background: card.color,
          color: "white",
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer",
          letterSpacing: "0.02em",
          transition: "opacity 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        {card.cta}
        <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
          <path d="M3 7h8M7.5 4l3.5 3-3.5 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}

export default function App() {
  const [activeView, setActiveView] = useState<"landing" | "assistant" | "score">("landing")
  const [sessions, setSessions] = useState<ChatSession[]>([
    { id: 1, title: "Welcome", messages: INITIAL_HISTORY },
  ])
  const [activeSessionId, setActiveSessionId] = useState<number | null>(1)
  const [draft, setDraft] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [processingMap, setProcessingMap] = useState<Record<string, boolean>>({})
  const [checklists, setChecklists] = useState<Record<string, { item: string; satisfied: boolean; reference?: string }[]>>({})
  const [parsedTextMap, setParsedTextMap] = useState<Record<string, string>>({})
  const [showFullTextMap, setShowFullTextMap] = useState<Record<string, boolean>>({})

  const assistantTitle = useMemo(() => "ISMS Governance Assistant", [])
  const activeSession = sessions.find((session) => session.id === activeSessionId) ?? null

  const handleCreateNewChat = () => {
    const newSessionId = Date.now()
    const newSession: ChatSession = {
      id: newSessionId,
      title: "New chat",
      messages: [
        {
          id: newSessionId,
          role: "assistant",
          text: "A fresh chat is ready. Ask about BSP information security controls, governance, or response expectations.",
        },
      ],
    }

    setSessions((prev) => [...prev, newSession])
    setActiveSessionId(newSessionId)
    setDraft("")
  }

  const handleClearHistory = () => {
    setSessions([])
    setActiveSessionId(null)
    setDraft("")
  }

  const handleSend = async () => {
    const trimmed = draft.trim()
    if (!trimmed) return

    let sessionId = activeSessionId
    if (sessionId === null) {
      const newSessionId = Date.now()
      const newSession: ChatSession = {
        id: newSessionId,
        title: "New chat",
        messages: [],
      }
      setSessions((prev) => [...prev, newSession])
      setActiveSessionId(newSessionId)
      sessionId = newSessionId
    }

    const nextMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      text: trimmed,
    }

    setSessions((prev) =>
      prev.map((session) =>
        session.id === sessionId
          ? { ...session, messages: [...session.messages, nextMessage] }
          : session
      )
    )
    setDraft("")

    try {
      const res = await ismsAnswer(trimmed, parsedTextMap)
      const assistantReply: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        text: res.response,
      }

      setSessions((prev) =>
        prev.map((session) =>
          session.id === sessionId
            ? { ...session, messages: [...session.messages, assistantReply] }
            : session
        )
      )
    } catch {
      setSessions((prev) =>
        prev.map((session) =>
          session.id === sessionId
            ? {
                ...session,
                messages: [
                  ...session.messages,
                  {
                    id: Date.now() + 1,
                    role: "assistant",
                    text: "The assistant service could not be reached. Please try again shortly.",
                  },
                ],
              }
            : session
        )
      )
    }
  }

  if (activeView === "assistant") {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)", fontFamily: "system-ui, -apple-system, sans-serif", color: "#0f172a" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "24px 24px 40px" }}>
          <button
            onClick={() => setActiveView("landing")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid #cbd5e1",
              background: "white",
              color: "#0f172a",
              borderRadius: 999,
              padding: "10px 14px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              marginBottom: 20,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <path d="M8 3L4 7l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to main page
          </button>

          <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 20, minHeight: "80vh" }}>
            <aside style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(226,232,240,0.9)", borderRadius: 20, padding: 18, boxShadow: "0 8px 30px rgba(15,23,42,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="14" fill="#7c3aed" opacity="0.15" />
                    <path d="M11 21 L14 18 M16 10 C16 10 22 13 20 18 C19 21 15 23 12 21" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    <path d="M10 24 L13 21" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7c3aed", margin: 0 }}>BSP AI</p>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: "2px 0 0" }}>{assistantTitle}</h3>
                </div>
              </div>

              <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 12, marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                  <button
                    onClick={handleCreateNewChat}
                    style={{ flex: 1, border: "1px solid #cbd5e1", background: "white", color: "#0f172a", borderRadius: 999, padding: "8px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                  >
                    New chat
                  </button>
                  <button
                    onClick={handleClearHistory}
                    style={{ border: "1px solid #fecaca", background: "#fef2f2", color: "#b91c1c", borderRadius: 999, padding: "8px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                  >
                    Clear
                  </button>
                </div>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#64748b", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.12em" }}>Chat history</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {sessions.length === 0 ? (
                    <div style={{ background: "#f8fafc", border: "1px dashed #cbd5e1", borderRadius: 10, padding: "10px 12px", color: "#64748b", fontSize: 12 }}>
                      No saved chats yet.
                    </div>
                  ) : (
                    sessions.map((session) => (
                      <button
                        key={session.id}
                        onClick={() => setActiveSessionId(session.id)}
                        style={{
                          background: session.id === activeSessionId ? "#ede9fe" : "#f8fafc",
                          border: session.id === activeSessionId ? "1px solid #c4b5fd" : "1px solid #e2e8f0",
                          borderRadius: 10,
                          padding: "10px 12px",
                          textAlign: "left",
                          cursor: "pointer",
                        }}
                      >
                        <p style={{ fontSize: 11, fontWeight: 700, color: "#0f172a", margin: 0 }}>{session.title}</p>
                        <p style={{ fontSize: 12, color: "#64748b", margin: "4px 0 0", lineHeight: 1.45 }}>
                          {session.messages[session.messages.length - 1]?.text ?? "New conversation"}
                        </p>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </aside>

            <section style={{ background: "white", border: "1px solid rgba(226,232,240,0.9)", borderRadius: 24, boxShadow: "0 12px 40px rgba(15,23,42,0.08)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
              <div style={{ padding: "24px 24px 16px", borderBottom: "1px solid #f1f5f9", background: "linear-gradient(90deg, rgba(15,23,42,0.96) 0%, rgba(51,65,85,0.98) 100%)", color: "white" }}>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.72)", margin: 0 }}>Secure knowledge assistant</p>
                <h2 style={{ fontSize: 24, fontWeight: 800, margin: "6px 0 4px" }}>Ask about BSP information security</h2>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", margin: 0, lineHeight: 1.6 }}>Get guidance on controls, governance, incident response, and secure practices aligned to BSP expectations.</p>
              </div>

              <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12, flex: 1, background: "#f8fafc" }}>
                {activeSession?.messages.map((item) => (
                  <div key={item.id} style={{ display: "flex", justifyContent: item.role === "user" ? "flex-end" : "flex-start" }}>
                    <div style={{ maxWidth: "80%", padding: "12px 14px", borderRadius: 14, background: item.role === "user" ? "#4f46e5" : "white", color: item.role === "user" ? "white" : "#0f172a", boxShadow: "0 4px 18px rgba(15,23,42,0.06)", border: item.role === "assistant" ? "1px solid #e2e8f0" : "none" }}>
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ padding: "0 20px 20px" }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => setDraft(prompt)}
                      style={{ border: "1px solid #cbd5e1", background: "white", color: "#334155", borderRadius: 999, padding: "8px 12px", fontSize: 12, cursor: "pointer" }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <input
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") handleSend()
                    }}
                    placeholder="Ask about BSP information security..."
                    style={{ flex: 1, border: "1px solid #cbd5e1", borderRadius: 999, padding: "12px 14px", fontSize: 14, outline: "none" }}
                  />
                  <button
                    onClick={handleSend}
                    style={{ border: "none", background: "#4f46e5", color: "white", borderRadius: 999, padding: "0 16px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  }

  if (activeView === "score") {
    const handleFilesChange = (e: any) => {
      const files = Array.from(e.target.files || []) as File[]
      setUploadedFiles(files)
      setChecklists({})
      setProcessingMap({})
    }

    const analyzeFile = async (file: File) => {
      setProcessingMap((p) => ({ ...p, [file.name]: true }))
      try {
        const processor = await import('@/api/pdfProcessor')
        const sampleChecklist = [
          'Data encryption at rest and in transit',
          'Access control and least privilege',
          'Incident response and notification',
          'Third-party risk and due diligence',
          'Data retention and disposal',
          'Contractual obligations and SLA',
        ]

        const { fullText, results } = await processor.processFile(file, sampleChecklist)
        setChecklists((c) => ({ ...c, [file.name]: results }))
        setParsedTextMap((p) => ({ ...p, [file.name]: fullText }))
      } catch (err) {
        setChecklists((c) => ({ ...c, [file.name]: [{ item: 'Error parsing PDF', satisfied: false }] }))
      } finally {
        setProcessingMap((p) => ({ ...p, [file.name]: false }))
      }
    }

    const downloadResults = async (name: string) => {
      const results = checklists[name]
      if (!results) return

      try {
        const mod = await import('xlsx')
        const XLSX = (mod && (mod.default ?? mod)) as any

        const rows = results.map((r) => ({ Requirement: r.item, Evaluation: r.satisfied ? 'Satisfied' : 'Not found', 'Reference text': r.reference ?? '' }))
        const ws = XLSX.utils.json_to_sheet(rows)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Checklist')
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${name}-checklist.xlsx`
        a.click()
        URL.revokeObjectURL(url)
      } catch (err) {
        // Fallback to JSON if xlsx fails
        const payload = { file: name, results, satisfiedCount: results.filter((r) => r.satisfied).length }
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${name}-checklist.json`
        a.click()
        URL.revokeObjectURL(url)
      }
    }

    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)", fontFamily: "system-ui, -apple-system, sans-serif", color: "#0f172a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 24px 40px" }}>
          <button
            onClick={() => setActiveView("landing")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid #cbd5e1",
              background: "white",
              color: "#0f172a",
              borderRadius: 999,
              padding: "10px 14px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              marginBottom: 20,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <path d="M8 3L4 7l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to main page
          </button>

          <div style={{ background: "white", border: "1px solid rgba(226,232,240,0.9)", borderRadius: 20, padding: 20 }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>Supplier Risk Review — Score</h2>
            <p style={{ marginTop: 8, color: "#64748b" }}>Upload PDF contract files to generate a sample compliance checklist extracted from the document.</p>

            <div style={{ marginTop: 18, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              <input type="file" accept="application/pdf" multiple onChange={handleFilesChange} />
              <button
                onClick={() => {
                  uploadedFiles.forEach((f) => analyzeFile(f))
                }}
                disabled={uploadedFiles.length === 0}
                style={{ border: "none", background: "#0d9488", color: "white", borderRadius: 8, padding: "8px 12px", fontWeight: 700, cursor: "pointer" }}
              >
                Analyze all
              </button>
            </div>

            <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>
              {uploadedFiles.length === 0 ? (
                <div style={{ color: "#94a3b8" }}>No files selected.</div>
              ) : (
                uploadedFiles.map((file) => (
                  <div key={file.name} style={{ border: "1px solid #e6eef2", borderRadius: 12, padding: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{file.name}</div>
                      <div style={{ fontSize: 13, color: "#64748b" }}>{(file.size / 1024).toFixed(1)} KB</div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <button
                        onClick={() => analyzeFile(file)}
                        disabled={!!checklists[file.name] || !!processingMap[file.name]}
                        style={{ border: "1px solid #cbd5e1", background: "white", padding: "8px 10px", borderRadius: 8, cursor: "pointer" }}
                      >
                        {processingMap[file.name] ? "Analyzing..." : checklists[file.name] ? "Done" : "Analyze"}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 14 }}>
              {Object.keys(checklists).map((name) => (
                <div key={name} style={{ background: "#f8fafc", borderRadius: 12, padding: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ fontWeight: 800 }}>{name} — Extracted checklist</div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <div style={{ fontSize: 13, color: "#475569" }}>{checklists[name].filter((r) => r.satisfied).length}/{checklists[name].length} satisfied</div>
                        <button onClick={() => downloadResults(name)} style={{ border: "1px solid #cbd5e1", background: "white", padding: "6px 10px", borderRadius: 8, cursor: "pointer" }}>Download results</button>
                      </div>
                  </div>
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                          <tr style={{ textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>
                            <th style={{ padding: "8px 6px" }}>Requirement</th>
                            <th style={{ padding: "8px 6px", width: 140 }}>Evaluation</th>
                            <th style={{ padding: "8px 6px" }}>Reference text</th>
                          </tr>
                        </thead>
                        <tbody>
                          {checklists[name].map((item, idx) => (
                            <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
                              <td style={{ padding: "10px 6px", verticalAlign: "top" }}>{item.item}</td>
                              <td style={{ padding: "10px 6px", verticalAlign: "top" }}>{item.satisfied ? "Satisfied" : "Not found"}</td>
                              <td style={{ padding: "10px 6px", verticalAlign: "top", color: "#334155" }}>{item.reference ?? ""}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div style={{ marginTop: 10, display: "flex", gap: 8, alignItems: "center" }}>
                      <button
                        onClick={() => setShowFullTextMap((s) => ({ ...s, [name]: !s[name] }))}
                        style={{ border: "1px solid #cbd5e1", background: "white", padding: "6px 10px", borderRadius: 8, cursor: "pointer" }}
                      >
                        {showFullTextMap[name] ? "Hide full text" : "View full text"}
                      </button>
                      <div style={{ fontSize: 13, color: "#475569" }}>{parsedTextMap[name] ? "Full text available" : "No extracted text"}</div>
                    </div>

                    {showFullTextMap[name] && (
                      <div style={{ marginTop: 12, border: "1px solid #e2e8f0", borderRadius: 8, padding: 12, background: "white", maxHeight: 360, overflow: "auto", whiteSpace: "pre-wrap", fontSize: 13, color: "#0f172a" }}>
                        {parsedTextMap[name] ? parsedTextMap[name].replace(/\s+/g, ' ').trim() : "(No extracted text available)"}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Header / Hero */}
      <header
        style={{
          position: "relative",
          minHeight: "clamp(280px, 38vh, 420px)",
          padding: "0 0 32px",
          backgroundImage: `url(${headerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        {/* Dark overlay so text stays legible over the background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, rgba(5,15,40,0.82) 0%, rgba(5,15,40,0.55) 60%, rgba(5,15,40,0.2) 100%)",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, paddingBottom: 24 }}>
          {/* Header: logo left, text center-left, nav right */}
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              justifyContent: "space-between",
              minHeight: 120,
              paddingTop: 8,
            }}
          >
            {/* Logo + text block */}
            <div style={{ display: "flex", alignItems: "stretch" }}>
              {/* Logo fills full header height */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "14px 20px 14px 32px",
                  borderRight: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <GovSeal />
              </div>

              {/* Org label + title + subtitle */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "14px 32px 14px 20px",
                  gap: 4,
                }}
              >
                <p
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    color: "rgba(255,255,255,0.55)",
                    textTransform: "uppercase",
                    margin: 0,
                  }}
                >
                  Technology and Digital Innovation Office
                </p>
                <h1
                  style={{
                    fontSize: "clamp(20px, 2.8vw, 32px)",
                    fontWeight: 800,
                    color: "white",
                    lineHeight: 1.15,
                    margin: 0,
                    letterSpacing: "-0.02em",
                    textShadow: "0 2px 12px rgba(0,0,0,0.35)",
                  }}
                >
                  Digital Compliance Experience
                </h1>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.5 }}>
                  AI-enabled tools that make compliance simpler, smarter, and secure.
                </p>
              </div>
            </div>

            {/* Nav links */}
            <div style={{ display: "flex", alignItems: "center", gap: 24, paddingRight: 36 }}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (link === "Space") setActiveView("landing")
                    if (link === "Score") setActiveView("score")
                    if (link === "Sign in") setActiveView("assistant")
                  }}
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: 16,
                    fontWeight: 500,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    whiteSpace: "nowrap",
                  }}
                >
                  {link === "Space" && (
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" fill="none" />
                      <circle cx="7" cy="7" r="2" fill="currentColor" />
                    </svg>
                  )}
                  {link === "Score" && (
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
                      <path d="M2 10 L5 7 L8 9 L12 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                    </svg>
                  )}
                  {link === "Sign in" && (
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
                      <path d="M2 12 C2 9.5 4 8 7 8 C10 8 12 9.5 12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                    </svg>
                  )}
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div style={{ padding: "44px 32px 0" }}>
            <div style={{ maxWidth: 740 }}>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  color: "rgba(255,255,255,0.8)",
                  textTransform: "uppercase",
                  margin: "0 0 12px",
                }}
              >
                AI-enabled compliance experience
              </p>
              <h2
                style={{
                  fontSize: "clamp(32px, 3.6vw, 48px)",
                  fontWeight: 800,
                  color: "white",
                  lineHeight: 1.08,
                  margin: "0 0 16px",
                  letterSpacing: "-0.03em",
                  textShadow: "0 2px 12px rgba(0,0,0,0.35)",
                }}
              >
                Move from manual reviews to trusted digital action.
              </h2>
              <p
                style={{
                  fontSize: 18,
                  color: "rgba(255,255,255,0.84)",
                  lineHeight: 1.65,
                  margin: 0,
                  maxWidth: 680,
                }}
              >
                Streamline assessments, supplier reviews, and governance with a secure experience built for BSP teams.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
                <a
                  href="#"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "12px 18px",
                    borderRadius: 999,
                    background: "white",
                    color: "#0f172a",
                    fontSize: 14,
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Explore the tools
                </a>
                <a
                  href="#"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "12px 18px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.35)",
                    background: "rgba(255,255,255,0.1)",
                    color: "white",
                    fontSize: 14,
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Cards */}
      <main
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "48px 32px 64px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {CARDS.map((card) => (
            <Card
              key={card.id}
              card={card}
              onOpen={(id) => {
                if (id === "sign") setActiveView("assistant")
                if (id === "score") setActiveView("score")
                if (id === "space") setActiveView("landing")
              }}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid #e2e8f0",
          padding: "18px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src={bspLogo}
            alt="Bangko Sentral ng Pilipinas"
            style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }}
          />
          <span style={{ fontSize: 12, color: "#64748b" }}>
            Technology and Digital Innovation Office &bull; Bangko Sentral ng Pilipinas
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
            <path d="M7 1 L9 5 L13 5.5 L10 8.5 L10.5 13 L7 11 L3.5 13 L4 8.5 L1 5.5 L5 5 Z" fill="#0d9488" />
          </svg>
          <span style={{ fontSize: 11.5, color: "#64748b", letterSpacing: "0.08em" }}>
            Secure &bull; Trusted &bull; Compliant
          </span>
        </div>
      </footer>
    </div>
  )
}
