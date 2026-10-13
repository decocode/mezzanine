import { useEffect, useState, type RefObject } from 'react'

// Follow the CSS container query, including changes caused by enlarged text.
// Once requested, keep the tree mounted so resizing preserves expanded groups.
export function useSidebarNavigationVisibility(ref: RefObject<HTMLDivElement | null>) {
  const [wasVisible, setWasVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new ResizeObserver(() => {
      if (element.getBoundingClientRect().width > 0) {
        setWasVisible(true)
        observer.disconnect()
      }
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref])

  return wasVisible
}
