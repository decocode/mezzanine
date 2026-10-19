import { useSyncExternalStore, type RefObject } from 'react'
import type { DocsPageContent } from '../../templates/docsPageContent'

// Live media query matching without effects: the browser notifies React of changes.
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

// Whether this browser supports a CSS property and value. Checked during rendering.
export function supportsCss(property: string, value: string) {
  return typeof CSS !== 'undefined' && CSS.supports(property, value)
}

// Whether a CSS at-rule condition is supported, such as a scroll-state container query.
export function supportsCondition(condition: string) {
  return typeof CSS !== 'undefined' && CSS.supports(condition)
}

// Reads the rendered height of each probe element, for the viewport-unit comparison.
// Window and screen changes that can alter a measurement: resizing, rotating, and on phones the
// browser's toolbar showing or hiding, which resizes the visual viewport.
function subscribeToScreenChanges(onChange: () => void) {
  window.addEventListener('resize', onChange)
  window.addEventListener('orientationchange', onChange)
  window.visualViewport?.addEventListener('resize', onChange)
  return () => {
    window.removeEventListener('resize', onChange)
    window.removeEventListener('orientationchange', onChange)
    window.visualViewport?.removeEventListener('resize', onChange)
  }
}

// The height of each [data-probe] inside the container, read again once the probes are on the
// page and whenever the screen changes. The snapshot is a string, so React only re-renders when a
// height actually changes.
export function useProbeHeights(container: RefObject<HTMLElement | null>) {
  const snapshot = useSyncExternalStore(
    subscribeToScreenChanges,
    () => container.current
      ? [...container.current.querySelectorAll<HTMLElement>('[data-probe]')]
        .map((probe) => `${probe.dataset.probe ?? ''}\t${Math.round(probe.getBoundingClientRect().height)}`).join('\n')
      : '',
    () => '',
  )
  return snapshot ? snapshot.split('\n').map((line) => {
    const [label, pixels] = line.split('\t')
    return { label, pixels: Number(pixels) }
  }) : []
}

// Reads env(safe-area-inset-*) through a probe whose padding uses each inset. React reads it
// again once the probe is on the page, and whenever the window resizes or the screen rotates.
// Safe areas are physical: they belong to the screen's own edges, not the reading direction.
export function useSafeAreas(probe: RefObject<HTMLElement | null>) {
  const snapshot = useSyncExternalStore(
    subscribeToScreenChanges,
    () => {
      if (!probe.current) return ''
      const style = getComputedStyle(probe.current)
      return [style.paddingTop, style.paddingRight, style.paddingBottom, style.paddingLeft].join(' ')
    },
    () => '',
  )
  const [top = '0px', right = '0px', bottom = '0px', left = '0px'] = snapshot ? snapshot.split(' ') : []
  return [
    { label: 'Top', pixels: top },
    { label: 'Right', pixels: right },
    { label: 'Bottom', pixels: bottom },
    { label: 'Left', pixels: left },
  ]
}

// The first paragraph of a page's How it works section, which its Card on an overview also shows.
export function howItWorksLead(page: DocsPageContent): string {
  const block = page.sections?.find((section) => section.key === 'howItWorks')?.body?.[0]
  return typeof block === 'string' ? block : ''
}
