import { useEffect, useRef, useState } from 'react'

/** Observe the rendered demo, including native drag and parent-layout resizing. */
export function useDemoWidth() {
  const demoRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const element = demoRef.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)))
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return { demoRef, width }
}
