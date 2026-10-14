import { useCallback, useEffect, useRef, useState } from 'react'
import { observeMotionPolicy, readMotionDuration } from '../motionPolicy'
import type { Key } from 'react-aria-components'

export {
  NavigationTree,
  NavigationTreeHeader,
  NavigationTreeItem,
  NavigationTreeItemContent,
  NavigationTreeSection,
} from 'react-aria-components/NavigationTree'

export type {
  NavigationTreeHeaderProps,
  NavigationTreeItemContentProps,
  NavigationTreeItemContentRenderProps,
  NavigationTreeItemProps,
  NavigationTreeItemRenderProps,
  NavigationTreeProps,
  NavigationTreeRenderProps,
  NavigationTreeSectionProps,
} from 'react-aria-components/NavigationTree'

function removeKey(keys: Set<Key>, key: Key) {
  const nextKeys = new Set(keys)
  nextKeys.delete(key)
  return nextKeys
}

export function useAnimatedNavigationTree(initialExpandedKeys: Iterable<Key>) {
  // Optional, additive bridge until the tree build removes this hook.
  // Unattached refs intentionally use the page-level motion policy.
  const treeRef = useRef<HTMLDivElement>(null)
  const [expandedKeys, setExpandedKeys] = useState(() => new Set(initialExpandedKeys))
  const [openingKeys, setOpeningKeys] = useState<Set<Key>>(() => new Set())
  const [closingKeys, setClosingKeys] = useState<Set<Key>>(() => new Set())
  const requestedExpandedKeys = useRef(expandedKeys)
  const motionTimers = useRef(new Map<Key, ReturnType<typeof setTimeout>>())

  useEffect(() => () => {
    motionTimers.current.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    const finishMotion = () => {
      if (readMotionDuration(treeRef.current) > 0) return
      motionTimers.current.forEach(clearTimeout)
      motionTimers.current.clear()
      setOpeningKeys(new Set())
      setClosingKeys(new Set())
      setExpandedKeys(new Set(requestedExpandedKeys.current))
    }
    return observeMotionPolicy(finishMotion)
  }, [])

  const scheduleMotionEnd = useCallback((key: Key, onMotionEnd: () => void) => {
    const existingTimer = motionTimers.current.get(key)
    if (existingTimer) clearTimeout(existingTimer)

    const timer = setTimeout(() => {
      motionTimers.current.delete(key)
      onMotionEnd()
    }, readMotionDuration(treeRef.current))

    motionTimers.current.set(key, timer)
  }, [])

  const onExpandedChange = useCallback((requestedKeys: Set<Key>) => {
    const nextKeys = new Set(requestedKeys)
    requestedExpandedKeys.current = nextKeys
    const prefersReducedMotion = readMotionDuration(treeRef.current) === 0

    if (prefersReducedMotion) {
      motionTimers.current.forEach(clearTimeout)
      motionTimers.current.clear()
      setOpeningKeys(new Set())
      setClosingKeys(new Set())
      setExpandedKeys(nextKeys)
      return
    }

    nextKeys.forEach((key) => {
      // A second toggle can reopen a row before its delayed collapse finishes.
      if (closingKeys.has(key)) {
        clearTimeout(motionTimers.current.get(key))
        motionTimers.current.delete(key)
        setClosingKeys((currentKeys) => removeKey(currentKeys, key))
      }
      if (expandedKeys.has(key)) return

      setExpandedKeys((currentKeys) => new Set(currentKeys).add(key))
      setClosingKeys((currentKeys) => removeKey(currentKeys, key))
      setOpeningKeys((currentKeys) => new Set(currentKeys).add(key))
      scheduleMotionEnd(key, () => {
        setOpeningKeys((currentKeys) => removeKey(currentKeys, key))
      })
    })

    expandedKeys.forEach((key) => {
      if (nextKeys.has(key) || closingKeys.has(key)) return

      setOpeningKeys((currentKeys) => removeKey(currentKeys, key))
      setClosingKeys((currentKeys) => new Set(currentKeys).add(key))
      scheduleMotionEnd(key, () => {
        setClosingKeys((currentKeys) => removeKey(currentKeys, key))
        setExpandedKeys((currentKeys) => removeKey(currentKeys, key))
      })
    })
  }, [closingKeys, expandedKeys, scheduleMotionEnd])

  return {
    treeRef,
    closingKeys,
    expandedKeys,
    onExpandedChange,
    openingKeys,
  }
}
