export type AssistantResponse = {
  response: string
}

export async function answerQuery(prompt: string, documents?: Record<string, string>): Promise<AssistantResponse> {
  const response = await fetch('/api/assistant', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, documents: documents ?? {} }),
  })

  if (!response.ok) {
    throw new Error('Assistant request failed')
  }

  return response.json()
}

export default { answerQuery }
