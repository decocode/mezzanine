import { Badge, type NavTreeSectionData } from '@decocode/mezzanine'
import { siteNavigationGroups } from '../siteStructure'
import { labBadgeLabel } from './shared/labValues'
import { layoutPages } from './layout/layoutContent'
import { emergingFeatures, futurePages } from './emerging-features/emergingFeaturesContent'
import { noticePage } from './notice/noticeContent'
import { volumeAndZoomPage } from './volume-and-zoom/volumeAndZoomContent'

export const labContent = {
  index: { label: 'Lab', href: '/site/lab' },
  // The heading of the Lab's navigation Panel.
  navigationTitle: 'Lab',
  layoutPage: { label: 'Layout', href: '/site/lab/layout', description: 'How boxes are sized, spaced and arranged: mobile first, and responding to their container.' },
}

// The Docs navigation's label for one of its top-level groups, so the Lab's headers read the same.
const docsGroupLabel = (id: string) => siteNavigationGroups.find((group) => group.id === id)?.label

// The Lab's own navigation tree, shown in its start Panel and the TopBar menu on Lab pages. Like the
// Docs navigation, it has Foundations and Components sections with headers. Foundations holds Layout,
// with its pages in reading order, then Emerging features, which carries the Lab
// badge. Components holds the candidate components.
export const labNavigationItems: NavTreeSectionData[] = [
  { type: 'section', id: 'foundations', label: docsGroupLabel('foundations'), children: [
    {
      id: 'layout', label: labContent.layoutPage.label, href: labContent.layoutPage.href,
      children: layoutPages.map((page) => ({ id: `layout-${page.key}`, label: page.title, href: page.href })),
    },
    {
      id: 'emerging-features', label: emergingFeatures.title, href: emergingFeatures.href,
      content: <Badge purpose="warning">{labBadgeLabel}</Badge>,
      children: futurePages.map((page) => ({ id: `emerging-features-${page.key}`, label: page.title, href: page.href })),
    },
  ] },
  { type: 'section', id: 'components', label: docsGroupLabel('components'), children: [
    { id: 'notice', label: noticePage.title, href: noticePage.href, content: <Badge purpose="warning">{labBadgeLabel}</Badge> },
    { id: 'volume-and-zoom', label: volumeAndZoomPage.title, href: volumeAndZoomPage.href, content: <Badge purpose="warning">{labBadgeLabel}</Badge> },
  ] },
]
