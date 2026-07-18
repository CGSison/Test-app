export type AssistantResponse = {
  response: string
}

// Simple local ISMS assistant API.  This can be replaced with a remote service later.
export async function answerQuery(prompt: string, documents?: Record<string, string>): Promise<AssistantResponse> {
  const normalized = prompt.toLowerCase()

  const canned: { match: string[]; response: string }[] = [
    {
      match: ["isms controls", "key isms"],
      response:
        "Key ISMS controls typically include access management, encryption, incident response, change management, monitoring, and vendor risk management.",
    },
    {
      match: ["incident response"],
      response:
        "An incident response program should define detection, escalation, containment, eradication, recovery, and post-incident review processes.",
    },
    {
      match: ["access management", "access control"],
      response: "Access management should follow least privilege, strong authentication, and periodic access reviews.",
    },
  ]

  for (const item of canned) {
    if (item.match.some((m) => normalized.includes(m))) {
      // if documents provided, try to include a short reference snippet
      let ref = ''
      if (documents) {
        for (const name of Object.keys(documents)) {
          const text = documents[name].toLowerCase()
          for (const m of item.match) {
            const idx = text.indexOf(m)
            if (idx !== -1) {
              const start = Math.max(0, idx - 80)
              const end = Math.min(text.length, idx + m.length + 80)
              ref = documents[name].slice(start, end).replace(/\s+/g, ' ').trim()
              return { response: item.response + '\n\nReference: ' + ref }
            }
          }
        }
      }

      return { response: item.response }
    }
  }

  // fallback: if docs available, search for sentences containing any keyword
  if (documents) {
    const keywords = normalized.split(/\s+/).filter(Boolean).slice(0, 6)
    for (const name of Object.keys(documents)) {
      const text = documents[name]
      const lower = text.toLowerCase()
      for (const kw of keywords) {
        const idx = lower.indexOf(kw)
        if (idx !== -1) {
          const start = Math.max(0, idx - 100)
          const end = Math.min(text.length, idx + 100)
          const ref = text.slice(start, end).replace(/\s+/g, ' ').trim()
          return { response: `Found context in ${name}: ${ref}` }
        }
      }
    }
  }

  return { response: "I don't have a specific answer; try rephrasing the question or provide a document to search." }
}

export default { answerQuery }
