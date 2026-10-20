import type { TableOfContentsSection } from './TableOfContents'

// Every section id, children included, in reading order.
export function sectionIds(sections: readonly TableOfContentsSection[]): string[] {
  return sections.flatMap(({ id, children }) => [id, ...sectionIds(children ?? [])])
}

// Scrolling anywhere on the page (scroll events don't bubble, so this listens while they're captured)
// or resizing the window can change which section is being read.
export function subscribeToReading(onChange: () => void) {
  document.addEventListener('scroll', onChange, { capture: true, passive: true })
  window.addEventListener('resize', onChange)
  window.addEventListener('hashchange', onChange)
  return () => {
    document.removeEventListener('scroll', onChange, { capture: true })
    window.removeEventListener('resize', onChange)
    window.removeEventListener('hashchange', onChange)
  }
}

// The nearest ancestor that scrolls vertically, or the page itself.
function scrollerOf(element: Element): Element {
  for (let parent = element.parentElement; parent; parent = parent.parentElement) {
    const overflow = getComputedStyle(parent).overflowY
    if ((overflow === 'auto' || overflow === 'scroll') && parent.scrollHeight > parent.clientHeight) return parent
  }
  return document.scrollingElement ?? document.documentElement
}

// The section being read: the last one whose start has passed a reading line a third of the way down
// the window. At the end of the page it's the last section, since the last ones may never reach the
// line; before any has passed, it's the first.
export function currentSectionId(ids: readonly string[]): string | undefined {
  const elements = ids.map((id) => document.getElementById(id)).filter((element): element is HTMLElement => element != null)
  if (elements.length === 0) return undefined
  const scroller = scrollerOf(elements[0])
  const isAtEnd = scroller.scrollHeight > scroller.clientHeight && scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2
  if (isAtEnd) return elements[elements.length - 1].id
  const readingLine = window.innerHeight / 3
  const passed = elements.filter((element) => element.getBoundingClientRect().top <= readingLine)
  return (passed[passed.length - 1] ?? elements[0]).id
}
