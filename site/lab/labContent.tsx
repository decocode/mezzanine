import { Badge, type NavTreeItemData } from '@decocode/mezzanine'
import { boxToTheFuture, futurePages, labBadgeLabel, labTopLevelPages, layersLab, layersPages, layoutLabSections, layoutStages, stagePagesByStage } from './layout/layoutLabContent'

export const labContent = {
  index: { label: 'Lab', href: '/site/lab' },
  layoutPage: { label: 'Layout', href: '/site/lab/layout', description: 'A hands-on tour of layout, told through boxes: one box, what goes inside it, how boxes arrange themselves, and ready-made formations. Each page has a live demo and the CSS behind it.' },
  internationalisationPage: { label: 'Internationalisation', href: '/site/lab/internationalisation', description: 'Making layouts work in any language: reading direction, line length in different scripts, long words, and translations that are longer than the original.' },
}

// The Lab's own navigation tree, shown in the site sidebar and the Navbar menu on Lab pages.
// Each experiment is a top-level item: Layout, Layers, then Internationalisation, then pages not specific to layout.
// Layout is a top-level group. Its stages come first, each holding its pages in reading order,
// then the pages still to be sorted, then Box to the Future, which carries the Lab badge.
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
      })),
      {
        id: `layout-${boxToTheFuture.slug}`, label: boxToTheFuture.title, href: `${labContent.layoutPage.href}/${boxToTheFuture.slug}`,
        content: <Badge variant="warning">{labBadgeLabel}</Badge>,
        children: futurePages.map((page) => ({ id: `layout-${page.key}`, label: page.title, href: page.href })),
      },
    ],
  },
  {
    id: 'layers', label: layersLab.title, href: '/site/lab/layers',
    children: Object.values(layersPages).map((page) => ({ id: `layers-${page.id}`, label: page.title, href: page.href })),
  },
  { id: 'internationalisation', label: labContent.internationalisationPage.label, href: labContent.internationalisationPage.href },
  // Pages that aren't specific to layout sit at the bottom until they find a home.
  ...Object.values(labTopLevelPages).map((page) => ({ id: `lab-${page.href.split('/').pop()}`, label: page.title, href: page.href })),
]
