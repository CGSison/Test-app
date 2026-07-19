import unittest

from server import build_assistant_response, evaluate_checklist


class BackendBehaviorTests(unittest.TestCase):
    def test_assistant_response_uses_keywords(self) -> None:
        response = build_assistant_response("What are the key ISMS controls for BSP?", {})
        self.assertIn("access management", response["response"].lower())
        self.assertIn("incident response", response["response"].lower())

    def test_checklist_marks_present_and_missing_items(self) -> None:
        full_text = "Data encryption at rest and in transit. Access control and least privilege."
        results = evaluate_checklist(full_text, [
            "Data encryption at rest and in transit",
            "Incident response and notification",
        ])
        self.assertTrue(results[0]["satisfied"])
        self.assertFalse(results[1]["satisfied"])


if __name__ == "__main__":
    unittest.main()
