export type ChecklistResult = {
  item: string
  satisfied: boolean
  reference?: string
  score?: number
}

async function loadPdfjs() {
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf')
  // @ts-ignore
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`
  return pdfjsLib
}

export async function processPdfBuffer(arrayBuffer: ArrayBuffer, checklist: string[]): Promise<{ fullText: string; results: ChecklistResult[] }> {
  const pdfjsLib = await loadPdfjs()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  let fullText = ''
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    const strings = content.items.map((s: any) => s.str || '').join(' ')
    fullText += ' ' + strings
  }

  const normalized = fullText.toLowerCase()

  const results = checklist.map((item) => {
    const needle = item.toLowerCase()
    const idx = normalized.indexOf(needle)
    if (idx === -1) {
      // attempt weaker matching: require most words present somewhere nearby
      const words = needle.split(/\s+/).filter(Boolean)
      let foundWords = 0
      for (const w of words) {
        if (normalized.includes(w)) foundWords++
      }
      const score = words.length ? foundWords / words.length : 0
      return { item, satisfied: score > 0.6, score }
    }

    const start = Math.max(0, idx - 120)
    const end = Math.min(fullText.length, idx + needle.length + 120)
    const reference = fullText.slice(start, end).replace(/\s+/g, ' ').trim()
    return { item, satisfied: true, reference, score: 1 }
  })

  return { fullText, results }
}

export async function processFile(file: File, checklist: string[]) {
  const buffer = await file.arrayBuffer()
  return processPdfBuffer(buffer, checklist)
}

export default { processPdfBuffer, processFile }
