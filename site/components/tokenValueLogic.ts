import { useCallback, useSyncExternalStore } from 'react'
import { subscribeToColorScheme } from '../themeSwitcherLogic'

// The library announces theme and motion changes on this internal event.
const motionChangeEvent = 'mezzanine-internal-motion-change'

function subscribeToTokenChanges(notify: () => void) {
  window.addEventListener(motionChangeEvent, notify)
  const stopColorScheme = subscribeToColorScheme(notify)
  return () => {
    window.removeEventListener(motionChangeEvent, notify)
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

const pixelsPerRem = 16
const roundPixels = (rem: string) => `${Math.round(parseFloat(rem) * pixelsPerRem * 100) / 100}`

// Turns a font-size token into pixels at the browser's default 16px text size:
// a fixed rem value gives one size, and a rem clamp() gives its smallest–largest range.
export function describeFontSize(value: string) {
  const range = value.match(/^clamp\(\s*([\d.]+)rem\s*,.*,\s*([\d.]+)rem\s*\)$/)
  if (range) return `${roundPixels(range[1])}–${roundPixels(range[2])}px`
  const fixed = value.match(/^([\d.]+)rem$/)
  return fixed ? `${roundPixels(fixed[1])}px` : value
}
