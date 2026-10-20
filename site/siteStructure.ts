// This file describes how the site's pages are organised: their navigation
// groups, display names, URLs and implementation status.
// It also helps the site find a page from its URL and the navigation groups that
// contain it, and says which folder in site/pages holds each page.

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
    // Foundations: how Mezzanine works and its visual values. Themes can change many of the values.
    id: 'foundations',
    label: 'Foundations',
    pages: [
      { id: 'accessibility', label: 'Accessibility', path: '/accessibility', status: 'implemented' },
      { id: 'color', label: 'Color', path: '/color', status: 'implemented' },
      { id: 'motion', label: 'Motion', path: '/motion', status: 'implemented' },
      { id: 'icons', label: 'Icons', path: '/icons', status: 'implemented' },
      { id: 'layout', label: 'Layout', path: '/layout', status: 'implemented' },
    ],
    groups: [
      {
        id: 'interaction',
        label: 'Interaction',
        path: '/interaction',
        pages: [
          { id: 'states', label: 'States', path: '/interaction/states', status: 'implemented' },
          { id: 'target-size', label: 'Target size', path: '/interaction/target-size', status: 'implemented' },
        ],
      },
      {
        id: 'text',
        label: 'Text',
        path: '/text',
        pages: [
          { id: 'typography', label: 'Typography', path: '/typography', status: 'implemented' },
          { id: 'prose', label: 'Prose', path: '/typography/prose', status: 'implemented' },
          { id: 'fonts', label: 'Fonts', path: '/fonts', status: 'empty' },
          { id: 'fluid-text', label: 'Fluid text', path: '/text/fluid-text', status: 'implemented' },
          { id: 'reading-direction', label: 'Reading direction', path: '/text/reading-direction', status: 'implemented' },
        ],
      },
      {
        id: 'effects',
        label: 'Effects',
        pages: [
          { id: 'elevation', label: 'Elevation', path: '/elevation', status: 'implemented' },
          { id: 'opacity', label: 'Opacity', path: '/opacity', status: 'implemented' },
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
      {
        // "Layers" here means stacking, not CSS cascade layers: an agreed exception to the CSS-word rule.
        id: 'layers',
        label: 'Layers',
        path: '/layers',
        pages: [
          { id: 'positioning', label: 'Positioning', path: '/layers/positioning', status: 'implemented' },
          { id: 'ordering-layers', label: 'Ordering layers', path: '/layers/ordering-layers', status: 'implemented' },
          { id: 'bundles-of-layers', label: 'Bundles of layers', path: '/layers/bundles-of-layers', status: 'implemented' },
          { id: 'scroll-padding', label: 'Scroll padding', path: '/layers/scroll-padding', status: 'implemented' },
        ],
      },
    ],
  },
  {
    id: 'themes',
    label: 'Themes',
    pages: [
      { id: 'wireframe', label: 'Wireframe', path: '/wireframe', status: 'implemented' },
      { id: 'light-and-dark-mode', label: 'Light & Dark mode', path: '/light-and-dark-mode', status: 'empty' },
      { id: 'custom-themes', label: 'Custom themes', path: '/custom-themes', status: 'empty' },
    ],
  },
  {
    // Agreed groups, 20 October 2026. They don't follow React Aria's own grouping.
    id: 'components',
    label: 'Components',
    pages: [],
    groups: [
      {
        id: 'control',
        label: 'Control',
        pages: [
          { id: 'button', label: 'Button', path: '/button', status: 'implemented' },
          { id: 'toggle-button', label: 'Toggle button', path: '/toggle-button', status: 'implemented' },
          { id: 'slider', label: 'Slider', path: '/slider', status: 'empty' },
          { id: 'switch', label: 'Switch', path: '/switch', status: 'implemented' },
          { id: 'checkbox', label: 'Checkbox', path: '/checkbox', status: 'implemented' },
          { id: 'radio-group', label: 'Radio group', path: '/radio-group', status: 'implemented' },
          { id: 'drop-zone', label: 'Drop zone', path: '/drop-zone', status: 'empty' },
        ],
      },
      {
        // For typing only, plus Form.
        id: 'input',
        label: 'Input',
        pages: [
          { id: 'form', label: 'Form', path: '/form', status: 'empty' },
          { id: 'text-field', label: 'Text field', path: '/text-field', status: 'implemented' },
          { id: 'text-area', label: 'Text area', path: '/text-area', status: 'implemented' },
          { id: 'number-field', label: 'Number field', path: '/number-field', status: 'empty' },
          { id: 'token-field', label: 'Token field', path: '/token-field', status: 'empty' },
        ],
      },
      {
        id: 'navigate',
        label: 'Navigate',
        pages: [
          { id: 'link', label: 'Link', path: '/link', status: 'implemented' },
          { id: 'breadcrumbs', label: 'Breadcrumbs', path: '/breadcrumbs', status: 'implemented' },
          { id: 'navigation-tree', label: 'Nav Tree', path: '/navigation-tree', status: 'implemented' },
          { id: 'table-of-contents', label: 'Table of contents', path: '/table-of-contents', status: 'implemented' },
          { id: 'tabs', label: 'Tabs', path: '/tabs', status: 'implemented' },
          { id: 'pagination', label: 'Pagination', path: '/pagination', status: 'empty' },
        ],
      },
      {
        id: 'organise-info',
        label: 'Organise info',
        pages: [
          { id: 'table', label: 'Table', path: '/table', status: 'implemented' },
          { id: 'grid-list', label: 'Grid list', path: '/grid-list', status: 'empty' },
          { id: 'tree', label: 'Tree', path: '/tree', status: 'empty' },
          { id: 'tag-group', label: 'Tag group', path: '/tag-group', status: 'empty' },
          { id: 'code-block', label: 'Code block', path: '/code-block', status: 'implemented' },
          { id: 'disclosure', label: 'Disclosure', path: '/disclosure', status: 'implemented' },
          { id: 'card', label: 'Card', path: '/card', status: 'implemented' },
          { id: 'separator', label: 'Separator', path: '/separator', status: 'empty' },
          { id: 'virtualizer', label: 'Virtualizer', path: '/virtualizer', status: 'empty' },
        ],
      },
      {
        id: 'search',
        label: 'Search',
        pages: [
          { id: 'search-field', label: 'SearchField', path: '/search-field', status: 'empty' },
          { id: 'autocomplete', label: 'Autocomplete', path: '/autocomplete', status: 'empty' },
        ],
      },
      {
        id: 'options',
        label: 'Options',
        pages: [
          { id: 'list-box', label: 'ListBox', path: '/list-box', status: 'empty' },
          { id: 'select', label: 'Select', path: '/select', status: 'empty' },
          { id: 'combo-box', label: 'Combo box', path: '/combo-box', status: 'empty' },
          { id: 'menu', label: 'Menu', path: '/menu', status: 'empty' },
        ],
      },
      {
        id: 'status',
        label: 'Status',
        pages: [
          { id: 'badge', label: 'Badge', path: '/badge', status: 'implemented' },
          { id: 'progress-bar', label: 'Progress bar', path: '/progress-bar', status: 'empty' },
          { id: 'meter', label: 'Meter', path: '/meter', status: 'empty' },
        ],
      },
      {
        id: 'overlay',
        label: 'Overlay',
        pages: [
          { id: 'tooltip', label: 'Tooltip', path: '/tooltip', status: 'implemented' },
          { id: 'dialog', label: 'Dialog', path: '/dialog', status: 'implemented' },
          { id: 'modal', label: 'Modal', path: '/modal', status: 'empty' },
          { id: 'popover', label: 'Popover', path: '/popover', status: 'empty' },
          { id: 'preview-trigger', label: 'Preview trigger', path: '/preview-trigger', status: 'empty' },
          { id: 'sheet', label: 'Sheet', path: '/sheet', status: 'empty' },
        ],
      },
      {
        // The components that frame an app's screen. Last, because it may move out of Components.
        id: 'structure',
        label: 'Structure',
        pages: [
          { id: 'app-shell', label: 'AppShell', path: '/app-shell', status: 'implemented' },
          { id: 'panel', label: 'Panel', path: '/panel', status: 'implemented' },
          { id: 'top-bar', label: 'Top bar', path: '/top-bar', status: 'implemented' },
          { id: 'footer', label: 'Footer', path: '/footer', status: 'implemented' },
          { id: 'rail', label: 'Rail', path: '/rail', status: 'empty' },
          { id: 'toolbar', label: 'Toolbar', path: '/toolbar', status: 'empty' },
        ],
      },
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

// The folder in site/pages that holds a page: its navigation groups, then the page itself, such as
// "foundations/interaction/target-size". A group's own page lives in the group's folder.
export function sitePageFolder(pageId: string): string {
  if (pageId === landingPage.id) return pageId
  const groups = findSiteNavigationGroups(pageId)
  if (!groups.length) throw new Error(`Page "${pageId}" is not in the navigation.`)
  const folders = groups.map((group) => group.id)
  return groups.at(-1)?.id === pageId ? folders.join('/') : [...folders, pageId].join('/')
}

// The page's component file within its folder, such as "TargetSizePage.tsx".
export function sitePageFile(pageId: string): string {
  return `${pageId.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join('')}Page.tsx`
}
