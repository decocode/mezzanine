import { createContext } from 'react'
import type { TableOfContentsSection } from '@decocode/mezzanine'

// Docs pages tell their AppShell which sections they have, so the shell can show them in its end
// Panel. Pages register from a ref callback; the shell subscribes.
export class DocsContentsStore {
  private sections: readonly TableOfContentsSection[] | null = null
  private listeners = new Set<() => void>()

  subscribe = (listener: () => void) => {
    this.listeners.add(listener)
    return () => { this.listeners.delete(listener) }
  }

  getSections = () => this.sections

  setSections(sections: readonly TableOfContentsSection[] | null) {
    if (sections === this.sections) return
    this.sections = sections
    for (const listener of this.listeners) listener()
  }
}

export const DocsContentsContext = createContext<DocsContentsStore | null>(null)
