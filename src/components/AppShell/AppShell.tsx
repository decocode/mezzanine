import { createContext, useCallback, useContext, useState, useSyncExternalStore, type ReactNode } from 'react'
import { lengthInPixels, panelPresentations, type PanelPresentation } from './appShellLayout'
import { PanelStore, type PanelEdge } from './panelStore'

interface AppShellState {
  store: PanelStore
  presentation: (edge: PanelEdge) => PanelPresentation
}

const AppShellContext = createContext<AppShellState | null>(null)

export function useAppShell(component: string) {
  const state = useContext(AppShellContext)
  if (!state) throw new Error(`${component} must be inside AppShell.`)
  return state
}

export interface AppShellProps {
  // A <header>, Panels at their edges and the app's own <main>.
  children: ReactNode
  // Whether a bottom Panel sits under the main content only, or under the side Panels too.
  bottomPanelSpan?: 'main' | 'full'
  className?: string
}

// The AppShell's inline size, kept current as its container changes, without an effect.
function useInlineSize(element: HTMLElement | null) {
  const subscribe = useCallback((notify: () => void) => {
    if (!element) return () => {}
    const observer = new ResizeObserver(notify)
    observer.observe(element)
    return () => observer.disconnect()
  }, [element])
  return useSyncExternalStore(subscribe, () => element?.getBoundingClientRect().width ?? 0, () => 0)
}

// Reads a length token from the AppShell element, in pixels.
function tokenInPixels(element: HTMLElement | null, token: string) {
  if (!element) return 0
  const styles = getComputedStyle(element)
  return lengthInPixels(styles.getPropertyValue(token), parseFloat(getComputedStyle(document.documentElement).fontSize), parseFloat(styles.fontSize))
}

// The frame around an app's main content: a header across the top, Panels at the start, end and
// bottom edges that share the space, and the main content in the middle, which shrinks to make room.
export function AppShell({ children, bottomPanelSpan = 'main', className }: AppShellProps) {
  const [store] = useState(() => new PanelStore())
  const [element, setElement] = useState<HTMLDivElement | null>(null)
  useSyncExternalStore(store.subscribe, store.getVersion, store.getVersion)
  const shellSize = useInlineSize(element)

  const panels = store.panels()
  const onEdge = (edge: PanelEdge) => panels.find(([, entry]) => entry.edge === edge)
  const [start, end, bottom] = [onEdge('start'), onEdge('end'), onEdge('bottom')]
  const presentations = panelPresentations({
    shellSize,
    panelSize: tokenInPixels(element, '--panel-width'),
    minMainSize: tokenInPixels(element, '--app-shell-min-main-width'),
    hasStart: start != null,
    hasEnd: end != null,
    isStartOpen: start != null && store.isOpen(start[0]),
  })
  const presentation = (edge: PanelEdge): PanelPresentation => edge === 'bottom' ? 'inline' : presentations[edge]

  // What each edge's track shows: an open Panel, its minimised version, or nothing.
  const trackState = (panel: typeof start, edge: PanelEdge) => {
    if (!panel) return undefined
    const [id, entry] = panel
    if (store.isOpen(id) && presentation(edge) === 'inline') return 'open'
    return entry.hasMinimized ? 'minimized' : 'closed'
  }

  return (
    <AppShellContext.Provider value={{ store, presentation }}>
      <div
        ref={setElement}
        className={['mezzanine-app-shell', className].filter(Boolean).join(' ')}
        data-bottom-panel-span={bottomPanelSpan}
        data-start={trackState(start, 'start')}
        data-end={trackState(end, 'end')}
        data-bottom={trackState(bottom, 'bottom')}
      >
        {children}
      </div>
    </AppShellContext.Provider>
  )
}
