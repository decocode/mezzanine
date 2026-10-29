import type { NavTreeSectionData } from '@decocode/mezzanine'
import { siteNavigationGroups } from '../siteStructure'
import { layoutPages } from './layout/layoutContent'
import { emergingFeatures, futurePages } from './emerging-features/emergingFeaturesContent'
import { demoBlockPage, panelLayoutPage, panelPage } from './panel-demo-block/panelDemoBlockContent'
import { itemPage } from './item/itemContent'
import { expandingControlsPage, volumePage, zoomPage } from './volume-and-zoom/volumeAndZoomContent'

export const labContent = {
  index: { label: 'Lab', href: '/site/lab' },
  // The heading of the Lab's navigation Panel.
  navigationTitle: 'Lab',
  layoutPage: { label: 'Layout', href: '/site/lab/layout', description: 'How boxes are sized, spaced and arranged: mobile first, and responding to their container.' },
}

// The Docs navigation's label for one of its top-level groups, so the Lab's headers read the same.
const docsGroupLabel = (id: string) => siteNavigationGroups.find((group) => group.id === id)?.label

// The Lab's own navigation tree, shown in its start Panel and the TopBar menu on Lab pages. Like the
// Docs navigation, it has Foundations, Components and Structure sections with headers. Foundations holds Layout,
// with its pages in reading order, then Emerging features. Components and Structure hold the candidate
// components. Every page is in the Lab, so the tree has no Lab badges.
export const labNavigationItems: NavTreeSectionData[] = [
  { type: 'section', id: 'foundations', label: docsGroupLabel('foundations'), children: [
    {
      id: 'layout', label: labContent.layoutPage.label, href: labContent.layoutPage.href,
      children: layoutPages.map((page) => ({ id: `layout-${page.key}`, label: page.title, href: page.href })),
    },
    {
      id: 'emerging-features', label: emergingFeatures.title, href: emergingFeatures.href,
      children: futurePages.map((page) => ({ id: `emerging-features-${page.key}`, label: page.title, href: page.href })),
    },
  ] },
  { type: 'section', id: 'components', label: docsGroupLabel('components'), children: [
    { id: 'item', label: itemPage.title, href: itemPage.href },
    { id: 'demo-block', label: demoBlockPage.title, href: demoBlockPage.href },
    { id: 'volume', label: volumePage.title, href: volumePage.href },
    { id: 'zoom', label: zoomPage.title, href: zoomPage.href },
    { id: 'expanding-controls', label: expandingControlsPage.title, href: expandingControlsPage.href },
  ] },
  { type: 'section', id: 'structure', label: docsGroupLabel('structure'), children: [
    { id: 'panel', label: panelPage.title, href: panelPage.href },
    { id: 'panel-layout', label: panelLayoutPage.title, href: panelLayoutPage.href },
  ] },
]
