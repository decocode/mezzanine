import { useCallback, useState } from 'react'
import { flushSync } from 'react-dom'

// URL navigation opens the containing disclosure; React Aria owns its controls.
export function useDocsDisclosureGroupLogic() {
  const [expandedKeys, setExpandedKeys] = useState<Set<string | number>>(new Set())

  const groupRef = useCallback((group: HTMLDivElement | null) => {
    if (!group) return
    const findHashTarget = () => {
      let id: string
      try {
        id = decodeURIComponent(window.location.hash.slice(1))
      } catch {
        return null
      }
      const target = document.getElementById(id)
      const disclosure = target?.closest<HTMLElement>('[data-documentation-disclosure]')
      const key = disclosure?.dataset.documentationDisclosure
      if (!target || !disclosure || !key || !group.contains(disclosure)) return null
      return { target, key }
    }
    const revealHash = () => {
      const found = findHashTarget()
      if (!found) return
      // Render the open panel now, so the page is positioned against it.
      // No behaviour option, so the motion policy's scroll-behavior applies:
      // smooth normally, immediate in Wireframe or with reduced motion.
      flushSync(() => setExpandedKeys(keys => new Set([...keys, found.key])))
      found.target.scrollIntoView()
    }
    const revisitHash = (event: MouseEvent) => {
      // Following the current hash again does not emit hashchange.
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = event.target instanceof Element ? event.target.closest('a') : null
      if (link && link.href === window.location.href && link.target !== '_blank') revealHash()
    }
    // On arrival, only open the panel. PageLoader scrolls to the section once the page has rendered.
    const initial = findHashTarget()
    if (initial) setExpandedKeys(keys => new Set([...keys, initial.key]))
    window.addEventListener('hashchange', revealHash)
    document.addEventListener('click', revisitHash, true)
    return () => {
      window.removeEventListener('hashchange', revealHash)
      document.removeEventListener('click', revisitHash, true)
    }
  }, [])

  return { groupRef, expandedKeys, setExpandedKeys }
}
