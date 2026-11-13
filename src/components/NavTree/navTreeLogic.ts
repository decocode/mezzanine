import { useCallback, useMemo, useRef, useState, type Ref, type RefCallback } from 'react'
import type { Key } from 'react-aria-components'
import type { NavTreeItemData, NavTreeProps } from './NavTree'

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

// An uncontrolled tree opens the route's ancestors when the route, or where it sits
// in the items, changes; re-renders cannot undo a manual collapse. It also drops
// keys for removed items. A controlled tree's keys belong to the caller, as in React Aria.
export function useNavTreeExpansion({ items, selectedRoute, expandedKeys, defaultExpandedKeys, onExpandedChange }: Pick<NavTreeProps,
  'items' | 'selectedRoute' | 'expandedKeys' | 'defaultExpandedKeys' | 'onExpandedChange'>) {
  const index = useMemo(() => indexNavTree(items, selectedRoute), [items, selectedRoute])
  const [internalKeys, setInternalKeys] = useState(() => new Set([
    ...[...(defaultExpandedKeys ?? [])].filter(key => index.keys.has(key)), ...index.ancestors,
  ]))
  const [reconciledIndex, setReconciledIndex] = useState(index)
  if (expandedKeys === undefined && reconciledIndex !== index) {
    setReconciledIndex(index)
    const next = new Set([...internalKeys].filter(key => index.keys.has(key)))
    if (reconciledIndex.routeIdentity !== index.routeIdentity) index.ancestors.forEach(key => next.add(key))
    setInternalKeys(next)
  }

  const changeExpansion = useCallback((keys: Set<Key>) => {
    if (expandedKeys === undefined) setInternalKeys(new Set(keys))
    onExpandedChange?.(new Set(keys))
  }, [expandedKeys, onExpandedChange])
  return { expandedKeys: expandedKeys ?? internalKeys, onExpandedChange: changeExpansion }
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
    recover()
    const observer = new MutationObserver(recover)
    observer.observe(tree, { childList: true, subtree: true })
    tree.addEventListener('focusin', rememberFocus)
    tree.addEventListener('focusout', forgetOutsideFocus)
    return () => {
      observer.disconnect()
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
