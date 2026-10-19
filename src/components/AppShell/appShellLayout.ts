// Decides whether each side Panel shares the space or becomes a drawer. The main content keeps its
// minimum width; when two open Panels don't both fit, the end Panel gives way first.

export type PanelPresentation = 'inline' | 'drawer'

export interface SidePanels {
  // The AppShell's inline size in pixels; 0 before it has been measured.
  shellSize: number
  panelSize: number
  minMainSize: number
  hasStart: boolean
  hasEnd: boolean
  isStartOpen: boolean
}

export function panelPresentations({ shellSize, panelSize, minMainSize, hasStart, hasEnd, isStartOpen }: SidePanels) {
  // Unmeasured, as during the first render: share the space rather than flash a drawer.
  if (shellSize <= 0) return { start: 'inline', end: 'inline' } as const
  const fits = (...panels: number[]) => shellSize >= minMainSize + panels.reduce((total, size) => total + size, 0)
  // A Panel is placed as if it were open, so its trigger always knows how it will appear.
  const startInline = !hasStart || fits(panelSize)
  const startTakesSpace = hasStart && startInline && isStartOpen
  const endInline = !hasEnd || fits(startTakesSpace ? panelSize : 0, panelSize)
  const presentation = (inline: boolean): PanelPresentation => inline ? 'inline' : 'drawer'
  return { start: presentation(startInline), end: presentation(endInline) }
}

// Converts a length token's computed value, such as "20rem" or "240px", to pixels.
export function lengthInPixels(value: string, rootFontSize: number, fontSize: number) {
  const match = value.trim().match(/^(-?[\d.]+)(px|rem|em)?$/)
  if (!match) return 0
  const amount = Number(match[1])
  if (match[2] === 'rem') return amount * rootFontSize
  if (match[2] === 'em') return amount * fontSize
  return amount
}
