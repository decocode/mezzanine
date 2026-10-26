// The candidate Panel's size limits, read from tokens when someone resizes it. Illustrative and unapproved.

export type LabPanelPlacement = 'start' | 'end' | 'top' | 'bottom'

export interface PanelSizeLimits {
  min: number
  max: number
  // How far one arrow key press moves the edge.
  step: number
}

// A length token's value in pixels, read from the element it applies to.
function tokenInPixels(element: HTMLElement | null, token: string) {
  if (!element) return 0
  const probe = document.createElement('div')
  probe.style.inlineSize = `var(${token})`
  probe.style.position = 'absolute'
  probe.style.visibility = 'hidden'
  element.append(probe)
  const pixels = probe.getBoundingClientRect().width
  probe.remove()
  return pixels
}

// An element's width with its margins, in pixels.
function outerWidth(element: Element) {
  const styles = getComputedStyle(element)
  return element.getBoundingClientRect().width + parseFloat(styles.marginInlineStart) + parseFloat(styles.marginInlineEnd)
}

// A side Panel resizes between the xs and md widths, and never so wide that the host's content drops
// below xs beside the other side Panel. A top or bottom one resizes between the xs and sm widths, as
// heights.
export function panelSizeLimits(element: HTMLElement | null, placement: LabPanelPlacement): PanelSizeLimits {
  const isSide = placement === 'start' || placement === 'end'
  const min = tokenInPixels(element, '--width-xs')
  let max = tokenInPixels(element, isSide ? '--width-md' : '--width-sm')
  const host = element?.parentElement
  if (isSide && element && host) {
    const others = [...host.querySelectorAll(':scope > .lab-panel:is([data-placement="start"], [data-placement="end"])')].filter((panel) => panel !== element)
    const margins = outerWidth(element) - element.getBoundingClientRect().width
    const room = host.clientWidth - others.reduce((total, panel) => total + outerWidth(panel), 0) - min - margins
    max = Math.max(min, Math.min(max, room))
  }
  return { min, max, step: tokenInPixels(element, '--space-4') }
}

export function clampSize(size: number, { min, max }: PanelSizeLimits) {
  return Math.min(max, Math.max(min, size))
}
