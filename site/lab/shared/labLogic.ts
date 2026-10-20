import { useSyncExternalStore, type RefObject } from 'react'
import { subscribeToScreenChanges } from '../../components/browserLogic'

// The browser checks are shared with the docs; the Lab imports them from here as before.
export { supportsCondition, supportsCss, useMediaQuery, useSafeAreas } from '../../components/browserLogic'

// Reads the rendered height of each probe element, for the viewport-unit comparison.
// The height of each [data-probe] inside the container, read again once the probes are on the
// page and whenever the screen changes. The snapshot is a string, so React only re-renders when a
// height actually changes.
export function useProbeHeights(container: RefObject<HTMLElement | null>) {
  const snapshot = useSyncExternalStore(
    subscribeToScreenChanges,
    () => container.current
      ? [...container.current.querySelectorAll<HTMLElement>('[data-probe]')]
        .map((probe) => `${probe.dataset.probe ?? ''}\t${Math.round(probe.getBoundingClientRect().height)}`).join('\n')
      : '',
    () => '',
  )
  return snapshot ? snapshot.split('\n').map((line) => {
    const [label, pixels] = line.split('\t')
    return { label, pixels: Number(pixels) }
  }) : []
}
