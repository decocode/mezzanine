export type LineMark = 'highlighted' | 'added' | 'removed'

export interface CodeLine {
  number: number
  text: string
  mark?: LineMark
}

interface LineOptions {
  startLine: number
  highlightedLines?: readonly number[]
  addedLines?: readonly number[]
  removedLines?: readonly number[]
}

// Splits code into numbered lines, ignoring one final line break, and marks each line by its number.
// Added and removed outrank highlighted, since a diff line's meaning matters more than emphasis.
export function codeLines(code: string, { startLine, highlightedLines = [], addedLines = [], removedLines = [] }: LineOptions): CodeLine[] {
  return code.replace(/\n$/, '').split('\n').map((text, index) => {
    const number = startLine + index
    const mark: LineMark | undefined = addedLines.includes(number) ? 'added'
      : removedLines.includes(number) ? 'removed'
        : highlightedLines.includes(number) ? 'highlighted'
          : undefined
    return { number, text, mark }
  })
}
