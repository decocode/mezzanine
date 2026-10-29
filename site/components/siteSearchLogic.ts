import type { NavTreeItemData, NavTreeProps } from '@decocode/mezzanine'
import { docsNavigationItems } from './docsNavigationItems'

// What the site search lists: every linked page in a navigation tree, grouped by area. Docs pages
// always; the Lab adds its own pages when the search opens from a Lab page.

export interface SearchResult {
  id: string
  label: string
  href: string
  // The groups above the page, such as "Foundations › Shape".
  location?: string
}

export interface SearchSection {
  id: string
  label: string
  results: SearchResult[]
}

// Every linked item in a navigation tree, in reading order, with the labels of the groups above it.
// A section's heading counts as a group.
export function collectResults(items: NavTreeProps['items'], sectionId: string, parents: readonly string[] = []): SearchResult[] {
  return items.flatMap((item): SearchResult[] => item.type === 'section'
    ? collectResults(item.children, sectionId, item.label ? [...parents, item.label] : parents)
    : collectItem(item, sectionId, parents))
}

function collectItem(item: NavTreeItemData, sectionId: string, parents: readonly string[]): SearchResult[] {
  return [
    ...(item.href == null ? [] : [{
      id: `${sectionId}-${String(item.id)}`,
      label: item.label,
      href: item.href,
      location: parents.length > 0 ? parents.join(' › ') : undefined,
    }]),
    ...collectResults(item.children ?? [], sectionId, [...parents, item.label]),
  ]
}

export const docsSearchSection: SearchSection = { id: 'docs', label: 'Docs', results: collectResults(docsNavigationItems, 'docs') }

// Cmd+K on Apple devices, Ctrl+K elsewhere, with no other modifier.
export function isSearchShortcut(event: KeyboardEvent) {
  return event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey) && !event.altKey && !event.shiftKey
}
