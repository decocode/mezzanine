import { useLayoutEffect, useRef, useState } from 'react'

// Measure both available space and the token-sized slot, including text enlargement.
export function useTabBarCapacity() {
  const listRef = useRef<HTMLUListElement>(null)
  const slotRef = useRef<HTMLSpanElement>(null)
  const [capacity, setCapacity] = useState(1)

  useLayoutEffect(() => {
    const list = listRef.current
    const slot = slotRef.current
    if (!list || !slot) return

    const measure = () => {
      const style = getComputedStyle(list)
      const gap = parseFloat(style.columnGap) || 0
      const width = list.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
      const slotWidth = slot.getBoundingClientRect().width
      setCapacity(Math.max(1, Math.floor((width + gap) / (slotWidth + gap))))
    }
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    observer.observe(slot)
    measure()
    return () => observer.disconnect()
  }, [])

  return { listRef, slotRef, capacity }
}
