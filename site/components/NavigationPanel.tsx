import { NavTree, type NavTreeItemData } from '@decocode/mezzanine'
import type { SitePageDefinition } from '../siteStructure'
import { docsNavigationItems } from './docsNavigationItems'

interface NavigationPanelProps {
  'aria-label': string
  navigationLabel: string
  items: NavTreeItemData[]
  selectedRoute: string
}

// A section's navigation tree, in its Panel or the TopBar menu. Docs and the Lab each pass their own items.
export function NavigationPanel({ 'aria-label': label, navigationLabel, items, selectedRoute }: NavigationPanelProps) {
  return (
    <nav aria-label={label}>
      <NavTree aria-label={navigationLabel} selectedRoute={selectedRoute} items={items} />
    </nav>
  )
}

interface DocsNavigationProps {
  currentPage: SitePageDefinition
  'aria-label'?: string
  navigationLabel?: string
}

export function DocsNavigation({ currentPage, 'aria-label': label = 'Mezzanine sections', navigationLabel = 'Mezzanine documentation' }: DocsNavigationProps) {
  return <NavigationPanel aria-label={label} navigationLabel={navigationLabel} items={docsNavigationItems} selectedRoute={currentPage.path} />
}
