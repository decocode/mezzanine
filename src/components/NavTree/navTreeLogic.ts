import { useCallback, useEffect, useEffectEvent, useMemo, useRef, useState, type Ref, type RefCallback } from 'react'
import type { Key } from 'react-aria-components'
import type { NavTreeItemData, NavTreeProps } from './NavTree'
import { observeMotionPolicy, readMotionDuration } from '../../motionPolicy'

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
  const [revealedRoute, setRevealedRoute] = useState<string | undefined>(undefined)
  const [request, setRequest] = useState<{ keys: Set<Key>; identity: string } | undefined>(undefined)
  const currentKeys = useMemo(() => expandedKeys === undefined ? internalKeys : new Set(expandedKeys), [expandedKeys, internalKeys])

  // Reconcile while rendering: drop keys for removed items and add the route's ancestors once.
  const next = new Set([...currentKeys].filter(key => index.keys.has(key)))
  if (revealedRoute !== index.routeIdentity) {
    setRevealedRoute(index.routeIdentity)
    index.ancestors.forEach(key => next.add(key))
  }
  if (!equalKeys(currentKeys, next)) {
    const identity = JSON.stringify([index.routeIdentity, [...currentKeys], [...next]])
    if (identity !== request?.identity) {
      if (expandedKeys === undefined) setInternalKeys(next)
      setRequest({ keys: next, identity })
    }
  }

  // React does not allow calling the application's callback while rendering,
  // so telling it about a reconciled change is the one step left to an effect.
  const notifyExpandedChange = useEffectEvent((keys: Set<Key>) => onExpandedChange?.(keys))
  useEffect(() => {
    if (request) notifyExpandedChange(request.keys)
  }, [request])

  const changeExpansion = useCallback((keys: Set<Key>) => {
    setRequest(undefined)
    if (expandedKeys === undefined) setInternalKeys(new Set(keys))
    onExpandedChange?.(new Set(keys))
  }, [expandedKeys, onExpandedChange])
  return { expandedKeys: currentKeys, onExpandedChange: changeExpansion }
}

// React Aria handles normal keyboard collapse. Controlled changes or data removal
// can remove a focused link without moving DOM focus; recover only that lost focus.
export function useNavTreeElement(items: NavTreeProps['items'], forwardedRef: Ref<HTMLDivElement> | undefined): RefCallback<HTMLDivElement> {
  const focused = useRef<{ element: HTMLElement; path: string[] } | null>(null)
  const paths = useMemo(() => indexNavTree(items, null).paths, [items])
  // React calls this when the tree element appears and runs the returned
  // clean-up when it goes, or before attaching again after the items change.
  return useCallback((tree: HTMLDivElement | null) => {
    const releaseForwardedRef = attachForwardedRef(forwardedRef, tree)
    if (!tree) return releaseForwardedRef
    const recover = () => {
      const previous = focused.current
      if (!previous || previous.element.isConnected) return
      focused.current = null
      if (document.activeElement !== document.body && document.activeElement !== tree) return
      const rows = [...tree.querySelectorAll<HTMLElement>('.mz-nav-tree-item')].filter(row => row.getAttribute('aria-disabled') !== 'true')
      const ancestor = previous.path.map(key => rows.find(row => row.dataset.key === key)).find(Boolean)
      ;(ancestor ?? tree).focus()
    }
    const rememberFocus = (event: FocusEvent) => {
      const element = event.target as HTMLElement
      const row = element.closest<HTMLElement>('.mz-nav-tree-item')
      focused.current = row ? { element, path: paths.get(row.dataset.key ?? '') ?? [] } : null
    }
    const forgetOutsideFocus = (event: FocusEvent) => {
      if (event.relatedTarget && !tree.contains(event.relatedTarget as Node)) focused.current = null
    }
    const settleChevronMotion = () => {
      if (readMotionDuration(tree) !== 0) return
      // Changing a transition's duration alone does not finish one already in
      // progress. Complete only owned chevrons when the shared policy suppresses it.
      for (const icon of tree.querySelectorAll('.mz-nav-tree-chevron')) {
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
      releaseForwardedRef()
    }
  }, [forwardedRef, paths])
}

function attachForwardedRef(ref: Ref<HTMLDivElement> | undefined, element: HTMLDivElement | null) {
  if (typeof ref === 'function') {
    const cleanup = ref(element)
    return () => { if (typeof cleanup === 'function') cleanup(); else ref(null) }
  }
  if (ref) ref.current = element
  return () => { if (ref) ref.current = null }
}
