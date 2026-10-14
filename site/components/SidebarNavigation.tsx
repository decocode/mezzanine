import { NavTree } from '@decocode/mezzanine'
import type { SitePageDefinition } from '../siteStructure'
import { sidebarNavigationItems } from './sidebarNavigationItems'

interface SidebarNavigationProps {
  currentPage: SitePageDefinition
  'aria-label'?: string
}

export default function SidebarNavigation({ currentPage, 'aria-label': label = 'Mezzanine documentation' }: SidebarNavigationProps) {
  return <NavTree aria-label={label} selectedRoute={currentPage.path} items={sidebarNavigationItems} />
}
