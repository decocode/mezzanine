import { Children, createContext, isValidElement, useCallback, useContext, useState, useSyncExternalStore, type ReactNode } from 'react'
import { Footer } from '../Footer/Footer'
import { lengthInPixels, panelPresentations, type PanelPresentation } from './appShellLayout'
import { PanelStore, type PanelEdge } from './panelStore'

interface AppShellState {
  store: PanelStore
  presentation: (edge: PanelEdge) => PanelPresentation
  // True when the start Panel can't be closed but is hidden for lack of room, so its content (usually
  // navigation) has to be reached another way, such as a TopBar's menu.
  isStartPanelHidden: boolean
}

const AppShellContext = createContext<AppShellState | null>(null)

// The AppShell around a component, or null outside one.
export function useOptionalAppShell() {
  return useContext(AppShellContext)
}

export function useAppShell(component: string) {
  const state = useContext(AppShellContext)
  if (!state) throw new Error(`${component} must be inside AppShell.`)
  return state
}

export interface AppShellProps {
  // A <header>, Panels at their edges, the app's own <main> and an optional Footer.
  children: ReactNode
  // Whether a bottom Panel sits under the main content only, or under the side Panels too.
  bottomPanelSpan?: 'main' | 'full'
  // Whether a side Panel sits beside the main content only, or runs the full height, beside the header too.
  startPanelSpan?: 'main' | 'full'
  endPanelSpan?: 'main' | 'full'
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

// The frame around an app's main content: an optional header across the top, Panels at the start, end and
// bottom edges that share the space, and the main content in the middle, which shrinks to make room.
export function AppShell({ children, bottomPanelSpan = 'main', startPanelSpan = 'main', endPanelSpan = 'main', className }: AppShellProps) {
  const [store] = useState(() => new PanelStore())
  const [element, setElement] = useState<HTMLDivElement | null>(null)
  useSyncExternalStore(store.subscribe, store.getVersion, store.getVersion)
  const shellSize = useInlineSize(element)

  const panels = store.panels()
  const onEdge = (edge: PanelEdge) => panels.find(([, entry]) => entry.edge === edge)
  const [start, end, bottom] = [onEdge('start'), onEdge('end'), onEdge('bottom')]
  const presentations = panelPresentations({
    shellSize,
    startSize: tokenInPixels(element, '--panel-start-width'),
    endSize: tokenInPixels(element, '--panel-end-width'),
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

  // The main content and Footer scroll together, so the Footer comes at the end of the content
  // while staying outside <main>.
  const isContent = (child: ReactNode) => isValidElement(child) && (child.type === 'main' || child.type === Footer)
  const childList = Children.toArray(children)
  const content = childList.filter(isContent)
  const contentIndex = childList.findIndex(isContent)

  return (
    <AppShellContext.Provider value={{ store, presentation, isStartPanelHidden: start != null && !start[1].isCollapsible && presentation('start') === 'drawer' }}>
      <div
        ref={setElement}
        className={['mz-app-shell', className].filter(Boolean).join(' ')}
        data-bottom-panel-span={bottomPanelSpan}
        data-start-panel-span={startPanelSpan}
        data-end-panel-span={endPanelSpan}
        data-animated={store.hasChanged || undefined}
        data-start={trackState(start, 'start')}
        data-end={trackState(end, 'end')}
        data-bottom={trackState(bottom, 'bottom')}
      >
        {childList.slice(0, Math.max(contentIndex, 0))}
        {content.length > 0 && <div className="mz-app-shell-content">{content}</div>}
        {childList.slice(Math.max(contentIndex, 0)).filter((child) => !isContent(child))}
      </div>
    </AppShellContext.Provider>
  )
}
