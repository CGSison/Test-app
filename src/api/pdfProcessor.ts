export type ChecklistResult = {
  item: string
  satisfied: boolean
  reference?: string
  score?: number
}

export async function processPdfBuffer(_arrayBuffer: ArrayBuffer, checklist: string[]): Promise<{ fullText: string; results: ChecklistResult[] }> {
  throw new Error('Direct PDF processing has been moved to the FastAPI backend. Use processFile instead.')
}

export async function processFile(file: File, checklist: string[]) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('checklist', JSON.stringify(checklist))

  const response = await fetch('/api/pdf/analyze', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('PDF analysis request failed')
  }

  return response.json()
}

export default { processPdfBuffer, processFile }
