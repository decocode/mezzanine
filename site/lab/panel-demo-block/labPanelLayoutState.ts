// The state a LabPanelLayout shares with its Panels and toggles: every Panel's expanded state and size,
// the layout's own width, and whether each side Panel shares the space or becomes an overlay. Taken from
// the first library attempt's PanelLayout. Illustrative and unapproved.
import { createContext, useCallback, useContext, useState, useSyncExternalStore, type CSSProperties } from 'react'
import { lengthInPixels, labPanelPresentations, type LabPanelPresentation } from './labPanelPresentation'
import type { LabPanelPlacement } from './labPanelSize'
import { LabPanelStore } from './labPanelStore'

export interface LabPanelLayoutState {
  store: LabPanelStore
  presentation: (placement: LabPanelPlacement) => LabPanelPresentation
  // The widest a side Panel can be resized to before the content drops below its minimum.
  maxPanelSize: (placement: 'start' | 'end') => number
}

export const LabPanelLayoutContext = createContext<LabPanelLayoutState | null>(null)

export function useLabPanelLayout(component: string) {
  const state = useContext(LabPanelLayoutContext)
  if (!state) throw new Error(`${component} must be inside a LabPanelLayout.`)
  return state
}

// Whether a Panel shows now, for things outside it, such as a twin toggle that appears while it doesn't.
export function useIsLabPanelShown(panel: string) {
  const { store, presentation } = useLabPanelLayout('useIsLabPanelShown')
  useSyncExternalStore(store.subscribe, store.getVersion, store.getVersion)
  const entry = store.entry(panel)
  return entry != null && store.isShown(panel, presentation(entry.placement) === 'overlay')
}

// The layout's inline size, kept current as its container changes, without an effect.
function useInlineSize(element: HTMLElement | null) {
  const subscribe = useCallback((notify: () => void) => {
    if (!element) return () => {}
    const observer = new ResizeObserver(notify)
    observer.observe(element)
    return () => observer.disconnect()
  }, [element])
  return useSyncExternalStore(subscribe, () => element?.getBoundingClientRect().width ?? 0, () => 0)
}

// Reads a length custom property from an element, in pixels. A plain length is converted directly;
// anything else, such as a calc() sum, is measured on a hidden probe inside the element.
export function lengthOnElement(element: HTMLElement | null, property: string) {
  if (!element) return 0
  const styles = getComputedStyle(element)
  const value = styles.getPropertyValue(property).trim()
  if (value === '') return 0
  const pixels = lengthInPixels(value, parseFloat(getComputedStyle(document.documentElement).fontSize), parseFloat(styles.fontSize))
  if (pixels !== undefined) return pixels
  const probe = document.createElement('div')
  probe.style.position = 'absolute'
  probe.style.visibility = 'hidden'
  probe.style.inlineSize = value
  element.append(probe)
  const measured = probe.getBoundingClientRect().width
  probe.remove()
  return measured
}

// Everything a LabPanelLayout's element needs: the state its Panels and toggles share, and the data
// attributes and resized sizes its CSS lays the tracks out from.
export function useLabPanelLayoutState() {
  const [store] = useState(() => new LabPanelStore())
  const [element, setElement] = useState<HTMLDivElement | null>(null)
  useSyncExternalStore(store.subscribe, store.getVersion, store.getVersion)
  const layoutSize = useInlineSize(element)

  const panels = store.panels()
  const at = (placement: LabPanelPlacement) => panels.find(([, entry]) => entry.placement === placement)
  const [start, end, bottom] = [at('start'), at('end'), at('bottom')]
  // A resized Panel's width replaces its usual width.
  const sizeOf = (panel: typeof start, property: string) => (panel && store.size(panel[0])) ?? lengthOnElement(element, property)
  const startSize = sizeOf(start, '--_lab-panel-start-width')
  const endSize = sizeOf(end, '--_lab-panel-end-width')
  const minContentSize = lengthOnElement(element, '--_lab-panel-layout-min-content-width')
  const presentations = labPanelPresentations({
    layoutSize,
    startSize,
    endSize,
    minContentSize,
    hasStart: start != null,
    hasEnd: end != null,
    isStartExpanded: start != null && store.isExpanded(start[0]),
  })
  // A bottom Panel is always a drawer (owner, 29 October 2026): it opens over the content, never squashing it.
  const presentation = (placement: LabPanelPlacement): LabPanelPresentation => placement === 'bottom' ? 'overlay' : presentations[placement]
  const isInlineShown = (panel: typeof start, placement: 'start' | 'end') => panel != null && store.isExpanded(panel[0]) && presentations[placement] === 'inline'
  const maxPanelSize = (placement: 'start' | 'end') => layoutSize - minContentSize - (placement === 'start' ? (isInlineShown(end, 'end') ? endSize : 0) : (isInlineShown(start, 'start') ? startSize : 0))
  // Resized sizes reach the tracks through the layout, in place of the usual sizes.
  const resizedSizes = Object.fromEntries([['start', start], ['end', end], ['bottom', bottom]]
    .filter(([, panel]) => panel && store.size((panel as [string, unknown])[0]) !== undefined)
    .map(([placement, panel]) => [`--_lab-panel-${placement}-size`, `${store.size((panel as [string, unknown])[0])}px`])) as CSSProperties

  // What each placement's track shows: an expanded Panel beside the content, or nothing.
  const trackState = (panel: typeof start, placement: LabPanelPlacement) => {
    if (!panel) return undefined
    return store.isExpanded(panel[0]) && presentation(placement) === 'inline' ? 'open' : 'closed'
  }

  const state: LabPanelLayoutState = { store, presentation, maxPanelSize }
  const elementProps = {
    ref: setElement,
    'data-animated': store.hasChanged || undefined,
    'data-resizing': store.isResizing || undefined,
    style: resizedSizes,
    'data-start': trackState(start, 'start'),
    'data-end': trackState(end, 'end'),
    'data-bottom': trackState(bottom, 'bottom'),
  }
  return { state, elementProps }
}
