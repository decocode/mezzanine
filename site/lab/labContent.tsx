import { Badge, type NavTreeItemData } from '@decocode/mezzanine'
import { holdBadgeLabel, layoutLabSections, layoutStages, stagePagesByStage } from './layout/layoutLabContent'

export const labContent = {
  index: { label: 'Lab', href: '/site/lab' },
  layoutPage: { label: 'Layout', href: '/site/lab/layout', description: 'A hands-on tour of layout, told through boxes: one box, what goes inside it, how boxes arrange themselves, and ready-made formations. Each page has a live demo and the CSS behind it.' },
}

// The Lab's own navigation tree, shown in the site sidebar and the Navbar menu on Lab pages.
// Layout is a top-level group. Its stages come first, each holding its pages in reading order,
// then the pages still to be sorted. Emerging features carries the Hold badge.
export const labNavigationItems: NavTreeItemData[] = [
  {
    id: 'layout', label: labContent.layoutPage.label, href: labContent.layoutPage.href,
    children: [
      ...layoutStages.map((stage) => ({
        id: `layout-${stage.slug}`, label: stage.title, href: `${labContent.layoutPage.href}/${stage.slug}`,
        children: stagePagesByStage(stage.key).map((page) => ({ id: `layout-${page.key}`, label: page.title, href: page.href })),
      })),
      ...Object.values(layoutLabSections).map((section) => ({
        id: `layout-${section.slug}`, label: section.title, href: `${labContent.layoutPage.href}/${section.slug}`,
        content: section === layoutLabSections.emerging ? <Badge variant="danger">{holdBadgeLabel}</Badge> : undefined,
      })),
    ],
  },
]
