import { useCallback, useState } from 'react'

/** Observe the rendered demo, including native drag and parent-layout resizing. */
export function useDemoWidth() {
  const [width, setWidth] = useState(0)

  const demoRef = useCallback((element: HTMLDivElement | null) => {
    if (!element) return
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)))
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return { demoRef, width }
}
