import { Badge, type NavTreeItemData } from '@decocode/mezzanine'
import { labBadgeLabel } from './shared/labValues'
import { layoutStages, stagePagesByStage } from './layout/layoutContent'
import { layersLab, layersPages } from './layers/layersContent'
import { browserAndDeviceLab, browserAndDevicePages } from './browser-and-device/browserAndDeviceContent'
import { emergingFeatures, futurePages } from './emerging-features/emergingFeaturesContent'
import { labTopLevelPages } from './labTopLevelPages'

export const labContent = {
  index: { label: 'Lab', href: '/site/lab' },
  layoutPage: { label: 'Layout', href: '/site/lab/layout', description: 'How boxes are sized, spaced and arranged: mobile first, and responding to their container.' },
  componentsPage: { label: 'Components', href: '/site/lab/components' },
  searchPage: { label: 'Search', href: '/site/lab/components/search' },
}

// The Lab's own navigation tree, shown in the site sidebar and the Navbar menu on Lab pages.
// Each experiment is a top-level item: Layout, Layers, Browser and device, Emerging features, then Components, then pages not specific to layout.
// Layout is a top-level group. Its stages come first, each holding its pages in reading order,
// Emerging features carries the Lab badge.
export const labNavigationItems: NavTreeItemData[] = [
  {
    id: 'layout', label: labContent.layoutPage.label, href: labContent.layoutPage.href,
    children: layoutStages.map((stage) => ({
      id: `layout-${stage.slug}`, label: stage.title, href: `${labContent.layoutPage.href}/${stage.slug}`,
      children: stagePagesByStage(stage.key).map((page) => ({ id: `layout-${page.key}`, label: page.title, href: page.href })),
    })),
  },
  {
    id: 'layers', label: layersLab.title, href: '/site/lab/layers',
    children: Object.values(layersPages).map((page) => ({ id: `layers-${page.id}`, label: page.title, href: page.href })),
  },
  {
    id: 'browser-and-device', label: browserAndDeviceLab.title, href: browserAndDeviceLab.href,
    children: Object.values(browserAndDevicePages).map((page) => ({ id: `browser-and-device-${page.id}`, label: page.title, href: page.href })),
  },
  {
    id: 'emerging-features', label: emergingFeatures.title, href: emergingFeatures.href,
    content: <Badge variant="warning">{labBadgeLabel}</Badge>,
    children: futurePages.map((page) => ({ id: `emerging-features-${page.key}`, label: page.title, href: page.href })),
  },
  {
    id: 'components', label: labContent.componentsPage.label, href: labContent.componentsPage.href,
    children: [{ id: 'components-search', label: labContent.searchPage.label, href: labContent.searchPage.href }],
  },
  // Pages that aren't specific to layout sit at the bottom until they find a home.
  ...Object.values(labTopLevelPages).map((page) => ({ id: `lab-${page.href.split('/').pop()}`, label: page.title, href: page.href })),
]
