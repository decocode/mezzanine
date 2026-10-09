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
  pages: SitePageDefinition[]
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
    label: 'Get Started',
    pages: [
      { id: 'introduction', label: 'Introduction', path: '/introduction', status: 'implemented' },
    ],
  },
  {
    id: 'foundations',
    label: 'Foundations',
    pages: [
      { id: 'color', label: 'Color', path: '/color', status: 'implemented' },
      { id: 'typography', label: 'Typography', path: '/typography', status: 'implemented' },
      { id: 'shapes', label: 'Shapes', path: '/shapes', status: 'empty' },
      { id: 'elevation', label: 'Elevation', path: '/elevation', status: 'empty' },
      { id: 'textures', label: 'Textures', path: '/textures', status: 'empty' },
      { id: 'spacing', label: 'Spacing', path: '/spacing', status: 'empty' },
      { id: 'icons', label: 'Icons', path: '/icons', status: 'empty' },
    ],
  },
  {
    id: 'components',
    label: 'Components',
    pages: [
      { id: 'button', label: 'Button', path: '/button', status: 'implemented' },
      { id: 'link', label: 'Link', path: '/link', status: 'empty' },
      { id: 'card', label: 'Card', path: '/card', status: 'empty' },
      { id: 'table', label: 'Table', path: '/table', status: 'implemented' },
      { id: 'carousel', label: 'Carousel', path: '/carousel', status: 'empty' },
      { id: 'image-viewer', label: 'Image Viewer', path: '/image-viewer', status: 'empty' },
      { id: 'tag-group', label: 'TagGroup', path: '/tag-group', status: 'empty' },
      { id: 'toggle-button', label: 'ToggleButton', path: '/toggle-button', status: 'empty' },
      { id: 'toggle-button-group', label: 'ToggleButtonGroup', path: '/toggle-button-group', status: 'empty' },
      { id: 'disclosure', label: 'Disclosure', path: '/disclosure', status: 'empty' },
      { id: 'checkbox', label: 'Checkbox', path: '/checkbox', status: 'empty' },
      { id: 'radio-group', label: 'RadioGroup', path: '/radio-group', status: 'empty' },
      { id: 'text-field', label: 'TextField', path: '/text-field', status: 'empty' },
      { id: 'text-area', label: 'TextArea', path: '/text-area', status: 'empty' },
    ],
  },
  {
    id: 'navigation',
    label: 'Navigation',
    pages: [
      { id: 'header', label: 'Header', path: '/header', status: 'empty' },
      { id: 'sidebar', label: 'Sidebar', path: '/sidebar', status: 'empty' },
      { id: 'footer', label: 'Footer', path: '/footer', status: 'empty' },
    ],
  },
  {
    id: 'content-blocks',
    label: 'Content Blocks',
    pages: [
      { id: 'hero-section', label: 'Hero Section', path: '/hero-section', status: 'empty' },
    ],
  },
  {
    id: 'brand-assets',
    label: 'Brand Assets',
    pages: [
      { id: 'logo', label: 'Logo', path: '/logo', status: 'empty' },
    ],
  },
]

export const sitePages = [
  landingPage,
  ...siteNavigationGroups.flatMap((group) => group.pages),
]

export function findSitePage(pathname: string) {
  const path = pathname === '/' ? pathname : pathname.replace(/\/$/, '')
  return sitePages.find((page) => page.path === path)
}

export function findSiteNavigationGroup(pageId: string) {
  return siteNavigationGroups.find((group) => (
    group.pages.some((page) => page.id === pageId)
  ))
}
