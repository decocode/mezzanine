import { createContext, useCallback, useContext, useLayoutEffect, useRef, useSyncExternalStore, type RefObject } from 'react'

export interface SidebarState {
  isModal: boolean
  isCollapsible: boolean
  isExpanded: boolean
  isOpen: boolean
  panelId: string
  triggerRef: RefObject<HTMLButtonElement | null>
  setExpanded: (expanded: boolean) => void
  setOpen: (open: boolean) => void
}

export const SidebarContext = createContext<SidebarState | null>(null)

export function useSidebarState() {
  const state = useContext(SidebarContext)
  if (!state) throw new Error('SidebarTrigger and SidebarPanel must be inside Sidebar.')
  return state
}

// Keep the responsive decision in one place for the trigger and its panel.
// The subscription changes only with the query, so React does not resubscribe on every render.
export function useSidebarMediaQuery(query: string) {
  const subscribe = useCallback((notify: () => void) => {
    const media = window.matchMedia(query)
    media.addEventListener('change', notify)
    return () => media.removeEventListener('change', notify)
  }, [query])
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false)
}

// Collapsing a focused body or expanding a focused rail must not strand focus
// in hidden content, including when expansion is controlled by the application.
export function useSidebarFocus(isExpanded: boolean, triggerRef: RefObject<HTMLButtonElement | null>) {
  const focusedElement = useRef<HTMLElement | null>(null)
  useLayoutEffect(() => {
    const previous = focusedElement.current
    if (previous?.closest('[hidden]')
      && (document.activeElement === previous || document.activeElement === document.body)) {
      const trigger = triggerRef.current
      // A rail can replace the external launcher. Restore focus to a visible
      // control in the panel when that launcher is intentionally hidden.
      const panel = previous.closest('.mezzanine-sidebar-panel')
      const fallback = [...(panel?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? [])]
        .find(button => button.getClientRects().length > 0)
      const target = trigger?.getClientRects().length ? trigger : fallback
      focusedElement.current = null
      target?.focus()
    }
  }, [isExpanded, triggerRef])
  return focusedElement
}
