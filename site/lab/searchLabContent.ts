import type { NavTreeItemData } from '@decocode/mezzanine'
import { sidebarNavigationItems } from '../components/sidebarNavigationItems'
import { labNavigationItems } from './labContent'

export interface SearchLabResult {
  id: string
  label: string
  href: string
  // The groups above the page, such as "Styles › Shape".
  location?: string
}

export interface SearchLabSection {
  id: string
  label: string
  results: SearchLabResult[]
}

// Every linked item in a navigation tree, in reading order, with the labels of the groups above it.
function collectResults(items: readonly NavTreeItemData[], sectionId: string, parents: readonly string[] = []): SearchLabResult[] {
  return items.flatMap(item => [
    ...(item.href == null ? [] : [{
      id: `${sectionId}-${String(item.id)}`,
      label: item.label,
      href: item.href,
      location: parents.length > 0 ? parents.join(' › ') : undefined,
    }]),
    ...collectResults(item.children ?? [], sectionId, [...parents, item.label]),
  ])
}

// Sample results for the search experiment: page titles from the docs and Lab navigation.
// What search indexes is still to be agreed.
export const searchLabSections: SearchLabSection[] = [
  { id: 'docs', label: 'Docs', results: collectResults(sidebarNavigationItems, 'docs') },
  { id: 'lab', label: 'Lab', results: collectResults(labNavigationItems, 'lab') },
]
