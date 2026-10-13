import { createContext, useContext, useLayoutEffect, useRef, useSyncExternalStore, type RefObject } from 'react'

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
export function useSidebarMediaQuery(query: string) {
  return useSyncExternalStore(
    (notify) => {
      const media = window.matchMedia(query)
      media.addEventListener('change', notify)
      return () => media.removeEventListener('change', notify)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

// Collapsing a focused body or expanding a focused rail must not strand focus
// in hidden content, including when expansion is controlled by the application.
export function useSidebarFocus(isExpanded: boolean, triggerRef: RefObject<HTMLButtonElement | null>) {
  const focusedElement = useRef<HTMLElement | null>(null)
  useLayoutEffect(() => {
    const previous = focusedElement.current
    if (previous?.closest('[hidden]')
      && (document.activeElement === previous || document.activeElement === document.body)) {
      triggerRef.current?.focus()
      focusedElement.current = null
    }
  }, [isExpanded, triggerRef])
  return focusedElement
}
