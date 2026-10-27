// A countdown that closes a pop-up after it has gone unused, run from event handlers rather than an
// effect. Lab only: illustrative and unapproved.
import { useCallback, useRef } from 'react'

// How long the Volume and Zoom pages' pop-ups stay open after their last use.
export const autoCloseAfterMs = 2000

export function useAutoCloseTimer(delayMs: number, close: () => void) {
  const timer = useRef<number | undefined>(undefined)
  const cancel = useCallback(() => window.clearTimeout(timer.current), [])
  const restart = () => {
    cancel()
    timer.current = window.setTimeout(close, delayMs)
  }
  // Given to the pop-up's content as a ref: the countdown stops when the content goes away. It stays
  // the same function across renders, so React doesn't run its cleanup on every update.
  const stopOnUnmount = useCallback(() => cancel, [cancel])
  return { restart, cancel, stopOnUnmount }
}
