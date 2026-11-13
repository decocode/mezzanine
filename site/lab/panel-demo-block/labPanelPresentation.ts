// Decides whether each side Panel shares the space beside the content or becomes an overlay inside the
// LabPanelLayout. The content keeps its minimum width; when two expanded Panels don't both fit, the end
// Panel gives way first. Taken from the first library attempt. Illustrative and unapproved.

export type LabPanelPresentation = 'inline' | 'overlay'

export interface LabSidePanels {
  // The layout's inline size in pixels; 0 before it has been measured.
  layoutSize: number
  startSize: number
  endSize: number
  minContentSize: number
  hasStart: boolean
  hasEnd: boolean
  isStartExpanded: boolean
}

export function labPanelPresentations({ layoutSize, startSize, endSize, minContentSize, hasStart, hasEnd, isStartExpanded }: LabSidePanels) {
  // Unmeasured, as during the first render: share the space rather than flash an overlay.
  if (layoutSize <= 0) return { start: 'inline', end: 'inline' } as const
  const fits = (...panels: number[]) => layoutSize >= minContentSize + panels.reduce((total, size) => total + size, 0)
  // A Panel is placed as if it were expanded, so its toggle always knows how it will appear.
  const startInline = !hasStart || fits(startSize)
  const startTakesSpace = hasStart && startInline && isStartExpanded
  // The end Panel gives way first, so it never shares the space while the start Panel can't.
  const endInline = !hasEnd || (startInline && fits(startTakesSpace ? startSize : 0, endSize))
  const presentation = (inline: boolean): LabPanelPresentation => inline ? 'inline' : 'overlay'
  return { start: presentation(startInline), end: presentation(endInline) }
}

// Converts a length's computed value, such as "20rem" or "240px", to pixels, or undefined for anything
// else, such as a calc() sum, which has to be measured.
export function lengthInPixels(value: string, rootFontSize: number, fontSize: number) {
  const match = value.trim().match(/^(-?[\d.]+)(px|rem|em)?$/)
  if (!match) return undefined
  const amount = Number(match[1])
  if (match[2] === 'rem') return amount * rootFontSize
  if (match[2] === 'em') return amount * fontSize
  return amount
}
