export type SitePageStatus = 'implemented' | 'empty'

export interface SitePageDefinition {
  id: string
  label: string
  path: string
  reactAriaPage?: string
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
    id: 'foundations',
    label: 'Foundations',
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
    ],
    pages: [
      { id: 'color', label: 'Color', path: '/color', status: 'implemented' },
      { id: 'elevation', label: 'Elevation', path: '/elevation', status: 'implemented' },
      { id: 'motion', label: 'Motion', path: '/motion', status: 'implemented' },
      { id: 'icons', label: 'Icons', path: '/icons', status: 'implemented' },
      { id: 'spacing', label: 'Spacing', path: '/spacing', status: 'implemented' },
      { id: 'shape', label: 'Shape', path: '/shape', status: 'implemented' },
      { id: 'textures', label: 'Textures', path: '/textures', status: 'empty' },
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
          { id: 'link', label: 'Link', path: '/link', reactAriaPage: 'Link', status: 'implemented' },
          { id: 'breadcrumbs', label: 'Breadcrumbs', path: '/breadcrumbs', reactAriaPage: 'Breadcrumbs', status: 'implemented' },
          { id: 'navigation-tree', label: 'Navigation tree', path: '/navigation-tree', reactAriaPage: 'NavigationTree', status: 'implemented' },
          { id: 'table-of-contents', label: 'Table of contents', path: '/table-of-contents', status: 'implemented' },
          { id: 'tabs', label: 'Tabs', path: '/tabs', reactAriaPage: 'Tabs', status: 'implemented' },
          { id: 'pagination', label: 'Pagination', path: '/pagination', status: 'empty' },
          { id: 'menu', label: 'Menu', path: '/menu', reactAriaPage: 'Menu', status: 'empty' },
          { id: 'header', label: 'Header', path: '/header', status: 'empty' },
          { id: 'sidebar', label: 'Sidebar', path: '/sidebar', status: 'empty' },
          { id: 'footer', label: 'Footer', path: '/footer', status: 'empty' },
        ],
      },
      {
        id: 'actions-and-controls',
        label: 'Actions and controls',
        pages: [
          { id: 'button', label: 'Button', path: '/button', reactAriaPage: 'Button', status: 'implemented' },
          { id: 'toggle-button', label: 'Toggle button', path: '/toggle-button', reactAriaPage: 'ToggleButton', status: 'implemented' },
        ],
      },
      {
        id: 'forms-and-input',
        label: 'Forms and input',
        pages: [
          { id: 'checkbox', label: 'Checkbox', path: '/checkbox', reactAriaPage: 'Checkbox', status: 'implemented' },
          { id: 'radio-group', label: 'RadioGroup', path: '/radio-group', reactAriaPage: 'RadioGroup', status: 'implemented' },
          { id: 'text-field', label: 'TextField', path: '/text-field', reactAriaPage: 'TextField', status: 'empty' },
          { id: 'text-area', label: 'TextArea', path: '/text-area', reactAriaPage: 'TextField', status: 'empty' },
        ],
      },
      {
        id: 'overlays',
        label: 'Overlays',
        pages: [
          { id: 'dialog', label: 'Dialog', path: '/dialog', reactAriaPage: 'Modal', status: 'implemented' },
        ],
      },
      {
        id: 'cards',
        label: 'Cards',
        pages: [
          { id: 'card', label: 'Card', path: '/card', status: 'empty' },
        ],
      },
    ],
    pages: [
      { id: 'badge', label: 'Badge', path: '/badge', status: 'implemented' },
      { id: 'table', label: 'Table', path: '/table', reactAriaPage: 'Table', status: 'implemented' },
      { id: 'disclosure', label: 'Disclosure', path: '/disclosure', reactAriaPage: 'Disclosure', status: 'implemented' },
      { id: 'carousel', label: 'Carousel', path: '/carousel', status: 'empty' },
      { id: 'image-viewer', label: 'Image Viewer', path: '/image-viewer', status: 'empty' },
      { id: 'tag-group', label: 'TagGroup', path: '/tag-group', reactAriaPage: 'TagGroup', status: 'empty' },
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
