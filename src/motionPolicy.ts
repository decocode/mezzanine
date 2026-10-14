// Internal browser bridge. No public export or consumer event contract.
const motionChangeEvent = 'mezzanine-internal-motion-change'

export function readMotionDuration(element: Element | null) {
  if (typeof window === 'undefined') return 0
  const styles = getComputedStyle(element ?? document.documentElement)
  if (styles.getPropertyValue('--_motion-enabled').trim() === '0') return 0
  const value = styles.getPropertyValue('--motion-duration-interface').trim()
  const match = /^(\d*\.?\d+)(ms|s)$/.exec(value)
  if (!match) return 0
  const duration = Number(match[1]) * (match[2] === 's' ? 1000 : 1)
  return Number.isFinite(duration) ? duration : 0
}

export function observeMotionPolicy(onChange: () => void) {
  if (typeof window === 'undefined') return () => {}
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  preference.addEventListener('change', onChange)
  const observer = new MutationObserver(onChange)
  // Theme and speed changes on any ancestor may affect the component.
  observer.observe(document.documentElement, {
    attributes: true, subtree: true, attributeFilter: ['data-theme', 'style'],
  })
  return () => {
    preference.removeEventListener('change', onChange)
    observer.disconnect()
  }
}

// The documentation reads tokens through CSS, without importing private library
// modules or adding a second preference query. This event is internal plumbing.
if (typeof window !== 'undefined') {
  const stopObserving = observeMotionPolicy(() => {
    window.dispatchEvent(new Event(motionChangeEvent))
  })
  if (import.meta.hot) import.meta.hot.dispose(stopObserving)
}
