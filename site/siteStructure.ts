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
  // The ids of its pages and child groups in reading order, for a group whose items read as a
  // sequence. Without it, navigation lists them alphabetically.
  order?: readonly string[]
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
    order: ['typography', 'dimension', 'layout', 'layers', 'color', 'shape', 'effects', 'motion', 'icons', 'interaction', 'accessibility', 'themes'],
    pages: [
      { id: 'accessibility', label: 'Accessibility', path: '/accessibility', status: 'implemented' },
      { id: 'motion', label: 'Motion', path: '/motion', status: 'implemented' },
      { id: 'icons', label: 'Icons', path: '/icons', status: 'implemented' },
    ],
    groups: [
      {
        id: 'interaction',
        label: 'Interaction',
        path: '/interaction',
        pages: [
          { id: 'states', label: 'States', path: '/interaction/states', status: 'implemented' },
          { id: 'target-size', label: 'Target size', path: '/interaction/target-size', status: 'implemented' },
          { id: 'media-queries', label: 'Media queries', path: '/interaction/media-queries', status: 'implemented' },
          { id: 'safe-areas', label: 'Safe areas', path: '/interaction/safe-areas', status: 'implemented' },
          { id: 'supports', label: 'Supports', path: '/interaction/supports', status: 'implemented' },
        ],
      },
      {
        id: 'typography',
        label: 'Typography',
        path: '/typography',
        order: ['typeface-and-fonts', 'size-and-scaling', 'font-weight', 'spacing-and-rhythm', 'lines-and-words', 'text-styles', 'semantic-html', 'global-and-languages', 'text-rendering'],
        pages: [
          { id: 'typeface-and-fonts', label: 'Typeface and fonts', path: '/typography/typeface-and-fonts', status: 'implemented' },
          { id: 'size-and-scaling', label: 'Size and scaling', path: '/typography/size-and-scaling', status: 'implemented' },
          { id: 'font-weight', label: 'Font weight', path: '/typography/font-weight', status: 'implemented' },
          { id: 'spacing-and-rhythm', label: 'Spacing and rhythm', path: '/typography/spacing-and-rhythm', status: 'implemented' },
          { id: 'lines-and-words', label: 'Lines and words', path: '/typography/lines-and-words', status: 'implemented' },
          { id: 'text-styles', label: 'Text styles', path: '/typography/text-styles', status: 'implemented' },
          { id: 'semantic-html', label: 'Semantic HTML', path: '/typography/semantic-html', status: 'implemented' },
          { id: 'global-and-languages', label: 'Global and languages', path: '/typography/global-and-languages', status: 'implemented' },
          { id: 'text-rendering', label: 'Text rendering', path: '/typography/text-rendering', status: 'implemented' },
        ],
      },
      {
        id: 'layout',
        label: 'Layout',
        path: '/layout',
        order: ['stack', 'row', 'row-wrap', 'row-wrap-grow', 'ratio-pair', 'reel', 'grid', 'subgrid', 'container-queries', 'reading-order'],
        pages: [
          { id: 'stack', label: 'Stack', path: '/layout/stack', status: 'implemented' },
          { id: 'row', label: 'Row', path: '/layout/row', status: 'implemented' },
          { id: 'row-wrap', label: 'Row wrap', path: '/layout/row-wrap', status: 'implemented' },
          { id: 'row-wrap-grow', label: 'Row wrap grow', path: '/layout/row-wrap-grow', status: 'implemented' },
          { id: 'ratio-pair', label: 'Ratio pair', path: '/layout/ratio-pair', status: 'implemented' },
          { id: 'reel', label: 'Reel', path: '/layout/reel', status: 'implemented' },
          { id: 'grid', label: 'Grid', path: '/layout/grid', status: 'implemented' },
          { id: 'subgrid', label: 'Subgrid', path: '/layout/subgrid', status: 'implemented' },
          { id: 'container-queries', label: 'Container queries', path: '/layout/container-queries', status: 'implemented' },
          { id: 'reading-order', label: 'Reading order', path: '/layout/reading-order', status: 'implemented' },
        ],
      },
      {
        id: 'dimension',
        label: 'Dimension',
        path: '/dimension',
        order: ['width', 'aspect-ratio', 'fluid-sizing', 'space', 'spacing-scale', 'spacing-roles', 'units'],
        pages: [
          { id: 'width', label: 'Width', path: '/dimension/width', status: 'implemented' },
          { id: 'aspect-ratio', label: 'Aspect ratio', path: '/dimension/aspect-ratio', status: 'implemented' },
          { id: 'fluid-sizing', label: 'Fluid sizing', path: '/dimension/fluid-sizing', status: 'implemented' },
          { id: 'space', label: 'Space', path: '/dimension/space', status: 'implemented' },
          { id: 'spacing-scale', label: 'Shared spacing', path: '/dimension/spacing-scale', status: 'implemented' },
          { id: 'spacing-roles', label: 'Spacing roles', path: '/dimension/spacing-roles', status: 'implemented' },
          { id: 'units', label: 'Units', path: '/dimension/units', status: 'implemented' },
        ],
      },
      {
        id: 'color',
        label: 'Color',
        path: '/color',
        order: ['color-palettes', 'color-roles'],
        pages: [
          { id: 'color-palettes', label: 'Color palettes', path: '/color/palettes', status: 'implemented' },
          { id: 'color-roles', label: 'Color roles', path: '/color/roles', status: 'implemented' },
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
        order: ['positioning', 'ordering-layers', 'layer-groups', 'scroll-padding'],
        pages: [
          { id: 'positioning', label: 'Positioning', path: '/layers/positioning', status: 'implemented' },
          { id: 'ordering-layers', label: 'Ordering layers', path: '/layers/ordering-layers', status: 'implemented' },
          { id: 'layer-groups', label: 'Layer groups', path: '/layers/layer-groups', status: 'implemented' },
          { id: 'scroll-padding', label: 'Scroll padding', path: '/layers/scroll-padding', status: 'implemented' },
        ],
      },
      {
        id: 'themes',
        label: 'Themes',
        path: '/themes',
        order: ['light-mode', 'dark-mode', 'wireframe', 'custom-themes', 'style-priority'],
        pages: [
          { id: 'light-mode', label: 'Light mode', path: '/themes/light-mode', status: 'empty' },
          { id: 'dark-mode', label: 'Dark mode', path: '/themes/dark-mode', status: 'empty' },
          { id: 'wireframe', label: 'Wireframe', path: '/themes/wireframe', status: 'implemented' },
          { id: 'custom-themes', label: 'Custom themes', path: '/themes/custom-themes', status: 'empty' },
          { id: 'style-priority', label: 'Style priority', path: '/themes/style-priority', status: 'implemented' },
        ],
      },
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
          { id: 'toggle-button-group', label: 'Toggle button group', path: '/toggle-button-group', status: 'implemented' },
          { id: 'slider', label: 'Slider', path: '/slider', status: 'implemented' },
          { id: 'switch', label: 'Switch', path: '/switch', status: 'implemented' },
          { id: 'checkbox', label: 'Checkbox', path: '/checkbox', status: 'implemented' },
          { id: 'radio-group', label: 'Radio group', path: '/radio-group', status: 'implemented' },
          { id: 'drop-zone', label: 'Drop zone', path: '/drop-zone', status: 'implemented' },
          { id: 'toolbar', label: 'Toolbar', path: '/toolbar', status: 'implemented' },
        ],
      },
      {
        // For typing only, plus Form.
        id: 'input',
        label: 'Input',
        pages: [
          { id: 'form', label: 'Form', path: '/form', status: 'implemented' },
          { id: 'text-field', label: 'Text field', path: '/text-field', status: 'implemented' },
          { id: 'text-area', label: 'Text area', path: '/text-area', status: 'implemented' },
          { id: 'number-field', label: 'Number field', path: '/number-field', status: 'implemented' },
          { id: 'token-field', label: 'Token field', path: '/token-field', status: 'implemented' },
          { id: 'group', label: 'Group', path: '/group', status: 'implemented' },
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
        ],
      },
      {
        id: 'organise-info',
        label: 'Organise info',
        pages: [
          { id: 'table', label: 'Table', path: '/table', status: 'implemented' },
          { id: 'grid-list', label: 'Grid list', path: '/grid-list', status: 'implemented' },
          { id: 'tree', label: 'Tree', path: '/tree', status: 'implemented' },
          { id: 'tag-group', label: 'Tag group', path: '/tag-group', status: 'implemented' },
          { id: 'code-block', label: 'Code block', path: '/code-block', status: 'implemented' },
          { id: 'disclosure', label: 'Disclosure', path: '/disclosure', status: 'implemented' },
          { id: 'card', label: 'Card', path: '/card', status: 'implemented' },
          { id: 'avatar', label: 'Avatar', path: '/avatar', status: 'implemented' },
          { id: 'demo-area', label: 'Demo area', path: '/demo-area', status: 'implemented' },
          { id: 'separator', label: 'Separator', path: '/separator', status: 'implemented' },
          { id: 'virtualizer', label: 'Virtualizer', path: '/virtualizer', status: 'implemented' },
        ],
      },
      {
        id: 'search',
        label: 'Search',
        pages: [
          { id: 'search-field', label: 'SearchField', path: '/search-field', status: 'implemented' },
          { id: 'autocomplete', label: 'Autocomplete', path: '/autocomplete', status: 'implemented' },
          { id: 'search-trigger', label: 'SearchTrigger', path: '/search-trigger', status: 'implemented' },
        ],
      },
      {
        id: 'options',
        label: 'Options',
        pages: [
          { id: 'list-box', label: 'ListBox', path: '/list-box', status: 'implemented' },
          { id: 'select', label: 'Select', path: '/select', status: 'implemented' },
          { id: 'combo-box', label: 'Combo box', path: '/combo-box', status: 'implemented' },
          { id: 'menu', label: 'Menu', path: '/menu', status: 'implemented' },
        ],
      },
      {
        id: 'status',
        label: 'Status',
        pages: [
          { id: 'badge', label: 'Badge', path: '/badge', status: 'implemented' },
          { id: 'notice', label: 'Notice', path: '/notice', status: 'implemented' },
          { id: 'progress-bar', label: 'Progress bar', path: '/progress-bar', status: 'implemented' },
          { id: 'meter', label: 'Meter', path: '/meter', status: 'implemented' },
        ],
      },
      {
        id: 'overlay',
        label: 'Overlay',
        pages: [
          { id: 'tooltip', label: 'Tooltip', path: '/tooltip', status: 'implemented' },
          { id: 'dialog', label: 'Dialog', path: '/dialog', status: 'implemented' },
          { id: 'modal', label: 'Modal', path: '/modal', status: 'implemented' },
          { id: 'popover', label: 'Popover', path: '/popover', status: 'implemented' },
          { id: 'preview-trigger', label: 'Preview trigger', path: '/preview-trigger', status: 'implemented' },
          { id: 'sheet', label: 'Sheet', path: '/sheet', status: 'implemented' },
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
