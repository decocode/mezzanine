// Whether the person's main pointer can hover, such as a mouse, read with useSyncExternalStore so it
// follows a change of device without an effect. Lab only: illustrative and unapproved.
import { useSyncExternalStore } from 'react'

const query = '(hover: hover)'

function subscribe(onChange: () => void) {
  const list = window.matchMedia(query)
  list.addEventListener('change', onChange)
  return () => list.removeEventListener('change', onChange)
}

export function useCanHover() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches)
}
