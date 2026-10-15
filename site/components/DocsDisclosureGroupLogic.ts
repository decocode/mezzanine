import { useEffect, useState, type RefObject } from 'react'

// URL navigation opens the containing disclosure; React Aria owns its controls.
export function useDocsDisclosureGroupLogic(groupRef: RefObject<HTMLDivElement | null>) {
  const [expandedKeys, setExpandedKeys] = useState<Set<string | number>>(new Set())
  const [scrollTarget, setScrollTarget] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const revealHash = () => {
      let id: string
      try {
        id = decodeURIComponent(window.location.hash.slice(1))
      } catch {
        return
      }
      const target = document.getElementById(id)
      const disclosure = target?.closest<HTMLElement>('[data-documentation-disclosure]')
      const key = disclosure?.dataset.documentationDisclosure
      if (!target || !disclosure || !key || !groupRef.current?.contains(disclosure)) return
      setExpandedKeys(keys => new Set([...keys, key]))
      setScrollTarget(target)
    }
    const revisitHash = (event: MouseEvent) => {
      // Following the current hash again does not emit hashchange.
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = event.target instanceof Element ? event.target.closest('a') : null
      if (link && link.href === window.location.href && link.target !== '_blank') revealHash()
    }
    revealHash()
    window.addEventListener('hashchange', revealHash)
    document.addEventListener('click', revisitHash, true)
    return () => {
      window.removeEventListener('hashchange', revealHash)
      document.removeEventListener('click', revisitHash, true)
    }
  }, [groupRef])

  useEffect(() => {
    if (!scrollTarget) return
    // Wait until React has rendered the open panel before positioning the page.
    // No behaviour option, so the motion policy's scroll-behavior applies:
    // smooth normally, immediate in Wireframe or with reduced motion.
    const frame = requestAnimationFrame(() => {
      scrollTarget.scrollIntoView()
      setScrollTarget(null)
    })
    return () => cancelAnimationFrame(frame)
  }, [scrollTarget, expandedKeys])

  return { expandedKeys, setExpandedKeys }
}
