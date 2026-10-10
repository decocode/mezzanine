import { useCallback, useEffect, useRef, useState } from 'react'
import type { Key } from 'react-aria-components'

function getNavigationTreeMotionDuration() {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue('--navigation-tree-motion-duration').trim()
  const duration = Number.parseFloat(value)
  if (!Number.isFinite(duration) || duration < 0) return 0
  if (value.endsWith('ms')) return duration
  if (value.endsWith('s')) return duration * 1000
  return 0
}

function removeKey(keys: Set<Key>, key: Key) {
  const nextKeys = new Set(keys)
  nextKeys.delete(key)
  return nextKeys
}

export function useAnimatedNavigationTree(initialExpandedKeys: Iterable<Key>) {
  const [expandedKeys, setExpandedKeys] = useState(() => new Set(initialExpandedKeys))
  const [openingKeys, setOpeningKeys] = useState<Set<Key>>(() => new Set())
  const [closingKeys, setClosingKeys] = useState<Set<Key>>(() => new Set())
  const motionTimers = useRef(new Map<Key, ReturnType<typeof setTimeout>>())

  useEffect(() => () => {
    motionTimers.current.forEach(clearTimeout)
  }, [])

  const scheduleMotionEnd = useCallback((key: Key, onMotionEnd: () => void) => {
    const existingTimer = motionTimers.current.get(key)
    if (existingTimer) clearTimeout(existingTimer)

    const timer = setTimeout(() => {
      motionTimers.current.delete(key)
      onMotionEnd()
    }, getNavigationTreeMotionDuration())

    motionTimers.current.set(key, timer)
  }, [])

  const onExpandedChange = useCallback((requestedKeys: Set<Key>) => {
    const nextKeys = new Set(requestedKeys)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      motionTimers.current.forEach(clearTimeout)
      motionTimers.current.clear()
      setOpeningKeys(new Set())
      setClosingKeys(new Set())
      setExpandedKeys(nextKeys)
      return
    }

    nextKeys.forEach((key) => {
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
    closingKeys,
    expandedKeys,
    onExpandedChange,
    openingKeys,
  }
}
