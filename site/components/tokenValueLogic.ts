import { useEffect, useState } from 'react'

export function useTokenValue(token: string, refreshKey: string) {
  const [value, setValue] = useState('')

  useEffect(() => {
    const refresh = () => {
      const styles = getComputedStyle(document.documentElement)
      setValue(styles.getPropertyValue(token).trim())
    }
    const frame = requestAnimationFrame(refresh)
    window.addEventListener('mezzanine-internal-motion-change', refresh)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mezzanine-internal-motion-change', refresh)
    }
  }, [refreshKey, token])

  return value
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
