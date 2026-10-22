import { Badge, type NavTreeItemData } from '@decocode/mezzanine'
import { labBadgeLabel } from './shared/labValues'
import { layoutStages, stagePagesByStage } from './layout/layoutContent'
import { emergingFeatures, futurePages } from './emerging-features/emergingFeaturesContent'
import { noticePage } from './notice/noticeContent'

export const labContent = {
  index: { label: 'Lab', href: '/site/lab' },
  // The heading of the Lab's navigation Panel.
  navigationTitle: 'Lab',
  layoutPage: { label: 'Layout', href: '/site/lab/layout', description: 'How boxes are sized, spaced and arranged: mobile first, and responding to their container.' },
}

// The Lab's own navigation tree, shown in its start Panel and the TopBar menu on Lab pages.
// Each experiment is a top-level item: Layout, Emerging features, then pages not specific to layout.
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
    id: 'emerging-features', label: emergingFeatures.title, href: emergingFeatures.href,
    content: <Badge variant="warning">{labBadgeLabel}</Badge>,
    children: futurePages.map((page) => ({ id: `emerging-features-${page.key}`, label: page.title, href: page.href })),
  },
  { id: 'notice', label: noticePage.title, href: noticePage.href, content: <Badge variant="warning">{labBadgeLabel}</Badge> },
]
