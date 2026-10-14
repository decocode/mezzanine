import { useCallback, useLayoutEffect, useRef, type ForwardedRef } from 'react'
import { observeMotionPolicy, readMotionDuration } from '../motionPolicy'

// React Aria supplies aria-hidden immediately, but delays hidden until motion
// finishes. Inert blocks focus during that gap; remove it once hidden so browser
// find-in-page can still discover the panel's hidden="until-found" content.
export function useDisclosurePanelMotion(isExpanded: boolean, forwardedRef: ForwardedRef<HTMLDivElement>) {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const ref = useCallback((element: HTMLDivElement | null) => {
    panelRef.current = element
    if (typeof forwardedRef === 'function') return forwardedRef(element)
    if (forwardedRef) forwardedRef.current = element
  }, [forwardedRef])

  useLayoutEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    const settle = () => {
      // Cancelling an animation rejects React Aria's completion promise. Settle
      // the same hidden state when a policy change interrupts a closing panel.
      if (readMotionDuration(panel) === 0) {
        if (isExpanded) {
          if (panel.hasAttribute('hidden')) panel.removeAttribute('hidden')
          for (const property of ['--disclosure-panel-height', '--disclosure-panel-width']) {
            if (panel.style.getPropertyValue(property) !== 'auto') panel.style.setProperty(property, 'auto')
          }
        } else if (!panel.hasAttribute('hidden')) {
          panel.setAttribute('hidden', 'until-found')
        }
      }
      panel.inert = !isExpanded && !panel.hasAttribute('hidden')
    }
    settle()
    const observer = new MutationObserver(settle)
    observer.observe(panel, { attributes: true, attributeFilter: ['hidden'] })
    const stopObserving = observeMotionPolicy(settle)
    return () => {
      observer.disconnect()
      stopObserving()
    }
  }, [isExpanded])
  return ref
}
