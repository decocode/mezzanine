import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type Ref, type RefCallback } from 'react'
import type { Key } from 'react-aria-components'
import type { NavTreeItemData, NavTreeProps } from './NavTree'
import { observeMotionPolicy, readMotionDuration } from '../motionPolicy'

function indexNavTree(items: NavTreeProps['items'], route: NavTreeProps['selectedRoute']) {
  const keys = new Set<Key>()
  const paths = new Map<string, string[]>()
  let match: { id: Key; ancestors: Key[] } | undefined
  function visit(item: NavTreeItemData, ancestors: Key[]) {
    keys.add(item.id)
    paths.set(String(item.id), [String(item.id), ...ancestors.map(String).reverse()])
    if (!match && item.href && item.href === route) match = { id: item.id, ancestors }
    item.children?.forEach(child => visit(child, [...ancestors, item.id]))
  }
  items.forEach(item => {
    if (item.type === 'section') item.children.forEach(child => visit(child, []))
    else visit(item, [])
  })
  return { keys, paths, ancestors: match?.ancestors ?? [], routeIdentity: JSON.stringify([route ?? null, match ?? null]) }
}

function equalKeys(left: Set<Key>, right: Set<Key>) {
  return left.size === right.size && [...left].every(key => right.has(key))
}

// Route changes add ancestors once. Re-renders cannot undo a manual collapse.
// Controlled callers receive requests, never an invisible override of their keys.
export function useNavTreeExpansion({ items, selectedRoute, expandedKeys, defaultExpandedKeys, onExpandedChange }: Pick<NavTreeProps,
  'items' | 'selectedRoute' | 'expandedKeys' | 'defaultExpandedKeys' | 'onExpandedChange'>) {
  const index = useMemo(() => indexNavTree(items, selectedRoute), [items, selectedRoute])
  const [internalKeys, setInternalKeys] = useState(() => new Set([
    ...[...(defaultExpandedKeys ?? [])].filter(key => index.keys.has(key)), ...index.ancestors,
  ]))
  const currentKeys = useMemo(() => expandedKeys === undefined ? internalKeys : new Set(expandedKeys), [expandedKeys, internalKeys])
  const revealedRoute = useRef<string | undefined>(undefined)
  const lastRequest = useRef<string | undefined>(undefined)

  useEffect(() => {
    const next = new Set([...currentKeys].filter(key => index.keys.has(key)))
    const routeChanged = revealedRoute.current !== index.routeIdentity
    revealedRoute.current = index.routeIdentity
    if (routeChanged) index.ancestors.forEach(key => next.add(key))
    if (equalKeys(currentKeys, next)) return
    const request = JSON.stringify([index.routeIdentity, [...currentKeys], [...next]])
    if (request === lastRequest.current) return
    lastRequest.current = request
    if (expandedKeys === undefined) setInternalKeys(next)
    onExpandedChange?.(next)
  }, [currentKeys, expandedKeys, index, onExpandedChange])

  const changeExpansion = useCallback((keys: Set<Key>) => {
    lastRequest.current = undefined
    if (expandedKeys === undefined) setInternalKeys(new Set(keys))
    onExpandedChange?.(new Set(keys))
  }, [expandedKeys, onExpandedChange])
  return { expandedKeys: currentKeys, onExpandedChange: changeExpansion }
}

// React Aria handles normal keyboard collapse. Controlled changes or data removal
// can remove a focused link without moving DOM focus; recover only that lost focus.
export function useNavTreeElement(items: NavTreeProps['items'], forwardedRef: Ref<HTMLDivElement> | undefined): RefCallback<HTMLDivElement> {
  const root = useRef<HTMLDivElement | null>(null)
  const focused = useRef<{ element: HTMLElement; path: string[] } | null>(null)
  const paths = useMemo(() => indexNavTree(items, null).paths, [items])
  const ref = useCallback((element: HTMLDivElement | null) => {
    root.current = element
    if (typeof forwardedRef === 'function') return forwardedRef(element)
    if (forwardedRef) forwardedRef.current = element
  }, [forwardedRef])
  useLayoutEffect(() => {
    const tree = root.current
    if (!tree) return
    const recover = () => {
      const previous = focused.current
      if (!previous || previous.element.isConnected) return
      focused.current = null
      if (document.activeElement !== document.body && document.activeElement !== tree) return
      const rows = [...tree.querySelectorAll<HTMLElement>('.mezzanine-nav-tree-item')].filter(row => row.getAttribute('aria-disabled') !== 'true')
      const ancestor = previous.path.map(key => rows.find(row => row.dataset.key === key)).find(Boolean)
      ;(ancestor ?? tree).focus()
    }
    const rememberFocus = (event: FocusEvent) => {
      const element = event.target as HTMLElement
      const row = element.closest<HTMLElement>('.mezzanine-nav-tree-item')
      focused.current = row ? { element, path: paths.get(row.dataset.key ?? '') ?? [] } : null
    }
    const forgetOutsideFocus = (event: FocusEvent) => {
      if (event.relatedTarget && !tree.contains(event.relatedTarget as Node)) focused.current = null
    }
    const settleChevronMotion = () => {
      if (readMotionDuration(tree) !== 0) return
      // Changing a transition's duration alone does not finish one already in
      // progress. Complete only owned chevrons when the shared policy suppresses it.
      for (const icon of tree.querySelectorAll('.mezzanine-nav-tree-chevron')) {
        for (const animation of icon.getAnimations()) animation.finish()
      }
    }
    recover()
    settleChevronMotion()
    const stopObservingMotion = observeMotionPolicy(settleChevronMotion)
    const observer = new MutationObserver(recover)
    observer.observe(tree, { childList: true, subtree: true })
    tree.addEventListener('focusin', rememberFocus)
    tree.addEventListener('focusout', forgetOutsideFocus)
    return () => {
      observer.disconnect()
      stopObservingMotion()
      tree.removeEventListener('focusin', rememberFocus)
      tree.removeEventListener('focusout', forgetOutsideFocus)
    }
  })
  return ref
}
