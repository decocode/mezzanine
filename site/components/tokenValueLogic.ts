import { useCallback, useSyncExternalStore } from 'react'
import { subscribeToColorScheme } from '../themeSwitcherLogic'

// Token values change when the page's theme changes (its data-theme attribute), the system colour
// scheme changes, or the system reduced-motion setting changes, so watch just those three.
function subscribeToTokenChanges(notify: () => void) {
  const observer = new MutationObserver(notify)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion.addEventListener('change', notify)
  const stopColorScheme = subscribeToColorScheme(notify)
  return () => {
    observer.disconnect()
    reducedMotion.removeEventListener('change', notify)
    stopColorScheme()
  }
}

// The theme is applied before React renders, so the value read here is current.
export function useTokenValue(token: string) {
  const readValue = useCallback(
    () => getComputedStyle(document.documentElement).getPropertyValue(token).trim(),
    [token],
  )
  return useSyncExternalStore(subscribeToTokenChanges, readValue)
}

// Describes a font-size token in rem: a fixed value gives one size, and a clamp() gives its
// smallest–largest range.
export function describeFontSize(value: string) {
  const range = value.match(/^clamp\(\s*([\d.]+)rem\s*,.*,\s*([\d.]+)rem\s*\)$/)
  if (range) return `${parseFloat(range[1])}–${parseFloat(range[2])}rem`
  const fixed = value.match(/^([\d.]+)rem$/)
  return fixed ? `${parseFloat(fixed[1])}rem` : value
}
