import { useCallback, useSyncExternalStore } from 'react'

// A CSS length, such as a pointer with a calc() fallback, in pixels, resolved on the element it
// applies to.
function lengthInPixels(element: HTMLElement, length: string) {
  const probe = document.createElement('div')
  probe.style.position = 'absolute'
  probe.style.visibility = 'hidden'
  probe.style.inlineSize = length
  element.append(probe)
  const pixels = probe.getBoundingClientRect().width
  probe.remove()
  return pixels
}

// Whether the end panel fits beside the demo: the frame is at least as wide as the demo's narrowest,
// --demo-area-content-min-width, plus the panel and its two offsets.
function fitsSideBySide(frame: HTMLElement) {
  const needed = lengthInPixels(frame, 'var(--demo-area-content-min-width, var(--width-md))')
    + lengthInPixels(frame, 'var(--demo-area-end-panel-width, var(--width-sm))')
    + 2 * lengthInPixels(frame, 'var(--demo-area-end-panel-offset, var(--surface-gap))')
  return frame.clientWidth >= needed
}

// Follows the frame's width without an effect, so the end panel moves above the demo when it no
// longer fits beside it. Until the frame is measured, the panel sits beside the demo.
export function useIsSideBySide(frame: HTMLElement | null) {
  const subscribe = useCallback((notify: () => void) => {
    if (!frame) return () => {}
    const observer = new ResizeObserver(notify)
    observer.observe(frame)
    return () => observer.disconnect()
  }, [frame])
  return useSyncExternalStore(subscribe, () => frame == null || fitsSideBySide(frame), () => true)
}
