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
