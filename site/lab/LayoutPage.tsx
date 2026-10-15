import { Heading, Link, Text } from '@decocode/mezzanine'
import { layoutLabIntro, layoutLabSections } from './layout/layoutLabContent'
import {
  ContainerQueryDemo, EnvironmentDemo, HasDemo, LayersDemo, LogicalDemo, NamedLayersDemo,
  ReadingWidthDemo, ScrollPaddingDemo, SubgridDemo, TargetSizeDemo, ViewportDemo,
} from './layout/FoundationDemos'
import { ChildPageContent, IntrinsicOverview } from './layout/ChildPages'
import type { ChildPage } from './layout/layoutLabContent'
import { EmergingFeatureDemos } from './layout/EmergingFeatureDemos'
import './layout/layout-lab.css'

// Each section of the tour is its own child page, keyed by its slug.
const sectionPages: Record<string, () => React.JSX.Element> = {
  [layoutLabSections.intrinsic.slug]: IntrinsicOverview,
  [layoutLabSections.container.slug]: ContainerQueryDemo,
  [layoutLabSections.environment.slug]: EnvironmentDemo,
  [layoutLabSections.readingWidth.slug]: ReadingWidthDemo,
  [layoutLabSections.targetSize.slug]: TargetSizeDemo,
  [layoutLabSections.namedLayers.slug]: NamedLayersDemo,
  [layoutLabSections.logical.slug]: LogicalDemo,
  [layoutLabSections.subgrid.slug]: SubgridDemo,
  [layoutLabSections.has.slug]: HasDemo,
  [layoutLabSections.viewport.slug]: ViewportDemo,
  [layoutLabSections.scrollPadding.slug]: ScrollPaddingDemo,
  [layoutLabSections.layers.slug]: LayersDemo,
  [layoutLabSections.emerging.slug]: EmergingFeatureDemos,
}

export function hasLayoutSectionPage(slug: string) {
  return slug in sectionPages
}

// The overview, listing the child pages of the tour. Illustrative and unapproved.
export function LayoutOverviewPage() {
  return <div className="lab-layout">
    <div className="lab-layout-intro">
      <Heading level={1} className="mz-text-heading-lg">{layoutLabIntro.title}</Heading>
      <Text elementType="p" className="mz-text-body-lg">{layoutLabIntro.summary}</Text>
      <Text elementType="p" className="mz-text-body-md">{layoutLabIntro.key}</Text>
      <Text elementType="p" className="mz-text-body-md">{layoutLabIntro.frames}</Text>
    </div>
    <ul className="lab-experiment-list">
      {Object.values(layoutLabSections).map((section) => <li key={section.slug}>
        <Heading level={2} className="mz-text-heading-sm"><Link href={`/site/lab/layout/${section.slug}`}>{section.title}</Link></Heading>
        <Text elementType="p" className="mz-text-body-md">{section.what}</Text>
      </li>)}
    </ul>
  </div>
}

// A page under one of the sections, such as a primitive or a token family.
export function LayoutChildPage({ page }: { page: ChildPage }) {
  return <div className="lab-layout"><ChildPageContent page={page} /></div>
}

// One section of the tour as its own page.
export function LayoutSectionPage({ slug }: { slug: string }) {
  const Section = sectionPages[slug]
  return <div className="lab-layout"><Section /></div>
}
