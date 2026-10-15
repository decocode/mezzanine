import type { NavTreeItemData } from '@decocode/mezzanine'
import { childPagesBySection, layoutLabSections } from './layout/layoutLabContent'

export const labContent = {
  index: { label: 'Lab', href: '/site/lab' },
  layoutPage: { label: 'Layout', href: '/site/lab/layout', description: 'A hands-on tour of modern layout: intrinsic patterns, container queries and newer CSS, each with a live demo and the CSS behind it.' },
}

// The Lab's own navigation tree, shown in the site sidebar and the Navbar menu on Lab pages.
// Layout is a top-level group; its child pages keep the tour's reading order. Sections split into
// child pages, such as Intrinsic primitives, hold those pages.
export const labNavigationItems: NavTreeItemData[] = [
  {
    id: 'layout', label: labContent.layoutPage.label, href: labContent.layoutPage.href,
    children: Object.values(layoutLabSections).map((section) => ({
      id: `layout-${section.slug}`, label: section.title, href: `${labContent.layoutPage.href}/${section.slug}`,
      children: childPagesBySection[section.slug]?.map((page) => ({ id: `layout-${page.key}`, label: page.title, href: page.href })),
    })),
  },
]
