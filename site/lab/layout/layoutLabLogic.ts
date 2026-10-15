import { useSyncExternalStore } from 'react'

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
export function measureProbes(container: HTMLElement | null) {
  if (!container) return []
  return [...container.querySelectorAll<HTMLElement>('[data-probe]')].map((probe) => ({
    label: probe.dataset.probe ?? '',
    pixels: Math.round(probe.getBoundingClientRect().height || parseFloat(getComputedStyle(probe).paddingTop)),
  }))
}

// Reads env(safe-area-inset-*) through a probe whose padding uses each inset.
export function measureSafeAreas(probe: HTMLElement | null) {
  if (!probe) return []
  const style = getComputedStyle(probe)
  return [
    { label: 'Top', pixels: style.paddingTop },
    { label: 'Right', pixels: style.paddingRight },
    { label: 'Bottom', pixels: style.paddingBottom },
    { label: 'Left', pixels: style.paddingLeft },
  ]
}

// Splits text on backticks: odd-numbered parts were inside backticks and are code.
export function splitInlineCode(text: string) {
  return text.split('`').map((part, index) => ({ part, isCode: index % 2 === 1 }))
}
