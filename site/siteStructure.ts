// This file describes how the site's pages are organised: their navigation
// groups, display names, URLs and implementation status.
// It also helps the site find a page from its URL and the sidebar groups that
// contain it. Page components are listed separately in pageRegistry.ts.

export type SitePageStatus = 'implemented' | 'empty'

export interface SitePageDefinition {
  id: string
  label: string
  path: string
  status: SitePageStatus
}

export interface SiteNavigationGroup {
  id: string
  label: string
  path?: string
  pages: SitePageDefinition[]
  groups?: SiteNavigationGroup[]
}

export const landingPage: SitePageDefinition = {
  id: 'home',
  label: 'Mezzanine',
  path: '/',
  status: 'implemented',
}

export const siteNavigationGroups: SiteNavigationGroup[] = [
  {
    id: 'get-started',
    label: 'Get started',
    pages: [
      { id: 'introduction', label: 'Introduction', path: '/introduction', status: 'implemented' },
    ],
  },
  {
    id: 'principles',
    label: 'Principles',
    pages: [
      { id: 'usability', label: 'Usability', path: '/usability', status: 'empty' },
      { id: 'inclusivity', label: 'Inclusivity', path: '/inclusivity', status: 'empty' },
      { id: 'creativity', label: 'Creativity', path: '/creativity', status: 'empty' },
    ],
  },
  {
    // Foundations do not change with the theme.
    id: 'foundations',
    label: 'Foundations',
    path: '/foundations',
    pages: [
      { id: 'spacing', label: 'Spacing', path: '/spacing', status: 'implemented' },
      { id: 'accessibility', label: 'Accessibility', path: '/accessibility', status: 'implemented' },
      { id: 'interaction', label: 'Interaction', path: '/interaction', status: 'implemented' },
    ],
  },
  {
    // Styles change with the theme.
    id: 'styles',
    label: 'Styles',
    groups: [
      {
        id: 'typography',
        label: 'Typography',
        path: '/typography',
        pages: [
          { id: 'text-styles', label: 'Text styles', path: '/typography/text-styles', status: 'implemented' },
          { id: 'prose', label: 'Prose', path: '/typography/prose', status: 'implemented' },
        ],
      },
      {
        id: 'shape',
        label: 'Shape',
        path: '/shape',
        pages: [
          { id: 'corners', label: 'Corners', path: '/shape/corners', status: 'implemented' },
          { id: 'borders', label: 'Borders', path: '/shape/borders', status: 'implemented' },
        ],
      },
    ],
    pages: [
      { id: 'color', label: 'Color', path: '/color', status: 'implemented' },
      { id: 'elevation', label: 'Elevation', path: '/elevation', status: 'implemented' },
      { id: 'motion', label: 'Motion', path: '/motion', status: 'implemented' },
      { id: 'icons', label: 'Icons', path: '/icons', status: 'implemented' },
    ],
  },
  {
    id: 'themes',
    label: 'Themes',
    pages: [
      { id: 'wireframe', label: 'Wireframe', path: '/wireframe', status: 'empty' },
      { id: 'light-and-dark-mode', label: 'Light & Dark mode', path: '/light-and-dark-mode', status: 'empty' },
      { id: 'custom-themes', label: 'Custom themes', path: '/custom-themes', status: 'empty' },
    ],
  },
  {
    id: 'components',
    label: 'Components',
    groups: [
      {
        id: 'navigation',
        label: 'Navigation',
        pages: [
          { id: 'link', label: 'Link', path: '/link', status: 'implemented' },
          { id: 'breadcrumbs', label: 'Breadcrumbs', path: '/breadcrumbs', status: 'implemented' },
          { id: 'navigation-tree', label: 'Nav Tree', path: '/navigation-tree', status: 'implemented' },
          { id: 'table-of-contents', label: 'Table of contents', path: '/table-of-contents', status: 'implemented' },
          { id: 'tabs', label: 'Tabs', path: '/tabs', status: 'implemented' },
          { id: 'pagination', label: 'Pagination', path: '/pagination', status: 'empty' },
          { id: 'menu', label: 'Menu', path: '/menu', status: 'empty' },
          { id: 'tab-bar', label: 'Tab bar', path: '/tab-bar', status: 'implemented' },
          { id: 'navbar', label: 'Navbar', path: '/navbar', status: 'implemented' },
          { id: 'sidebar', label: 'Sidebar', path: '/sidebar', status: 'implemented' },
          { id: 'footer', label: 'Footer', path: '/footer', status: 'empty' },
        ],
      },
      {
        id: 'actions-and-controls',
        label: 'Actions and controls',
        pages: [
          { id: 'button', label: 'Button', path: '/button', status: 'implemented' },
          { id: 'toggle-button', label: 'Toggle button', path: '/toggle-button', status: 'implemented' },
        ],
      },
      {
        id: 'forms-and-input',
        label: 'Forms and input',
        pages: [
          { id: 'checkbox', label: 'Checkbox', path: '/checkbox', status: 'implemented' },
          { id: 'radio-group', label: 'Radio group', path: '/radio-group', status: 'implemented' },
          { id: 'text-field', label: 'Text field', path: '/text-field', status: 'implemented' },
          { id: 'text-area', label: 'Text area', path: '/text-area', status: 'implemented' },
        ],
      },
      {
        id: 'overlays',
        label: 'Overlays',
        pages: [
          { id: 'tooltip', label: 'Tooltip', path: '/tooltip', status: 'implemented' },
          { id: 'dialog', label: 'Dialog', path: '/dialog', status: 'implemented' },
        ],
      },
      {
        id: 'cards',
        label: 'Cards',
        pages: [
          { id: 'card', label: 'Card', path: '/card', status: 'implemented' },
        ],
      },
    ],
    pages: [
      { id: 'badge', label: 'Badge', path: '/badge', status: 'implemented' },
      { id: 'code-block', label: 'Code block', path: '/code-block', status: 'implemented' },
      { id: 'table', label: 'Table', path: '/table', status: 'implemented' },
      { id: 'disclosure', label: 'Disclosure', path: '/disclosure', status: 'implemented' },
      { id: 'tag-group', label: 'Tag group', path: '/tag-group', status: 'empty' },
    ],
  },
]

function collectSitePages(groups: SiteNavigationGroup[]): SitePageDefinition[] {
  return groups.flatMap((group) => [
    ...(group.path ? [{ id: group.id, label: group.label, path: group.path, status: 'implemented' as const }] : []),
    ...collectSitePages(group.groups ?? []),
    ...group.pages,
  ])
}

export const sitePages = [
  landingPage,
  ...collectSitePages(siteNavigationGroups),
]

export function findSitePage(pathname: string) {
  const path = pathname === '/' ? pathname : pathname.replace(/\/$/, '')
  return sitePages.find((page) => page.path === path)
}

export function findSiteNavigationGroup(pageId: string) {
  return findSiteNavigationGroups(pageId).at(-1)
}

export function findSiteNavigationGroups(
  pageId: string,
  groups: SiteNavigationGroup[] = siteNavigationGroups,
): SiteNavigationGroup[] {
  for (const group of groups) {
    if (group.id === pageId || group.pages.some((page) => page.id === pageId)) return [group]
    const childGroups = findSiteNavigationGroups(pageId, group.groups ?? [])
    if (childGroups.length > 0) return [group, ...childGroups]
  }
  return []
}
