import { Heading, Link, Text } from '@decocode/mezzanine'
import { layoutLabIntro, layoutLabSections } from './layout/layoutLabContent'
import {
  ContainerQueryDemo, EnvironmentDemo, HasDemo, IntrinsicDemo, LayersDemo, LogicalDemo,
  ScrollPaddingDemo, SubgridDemo, TokensDemo, ViewportDemo,
} from './layout/FoundationDemos'
import { WildCardDemos } from './layout/WildCardDemos'
import './layout/layout-lab.css'

// Each section of the tour is its own child page, keyed by its slug.
const sectionPages: Record<string, () => React.JSX.Element> = {
  [layoutLabSections.intrinsic.slug]: IntrinsicDemo,
  [layoutLabSections.container.slug]: ContainerQueryDemo,
  [layoutLabSections.environment.slug]: EnvironmentDemo,
  [layoutLabSections.tokens.slug]: TokensDemo,
  [layoutLabSections.logical.slug]: LogicalDemo,
  [layoutLabSections.subgrid.slug]: SubgridDemo,
  [layoutLabSections.has.slug]: HasDemo,
  [layoutLabSections.viewport.slug]: ViewportDemo,
  [layoutLabSections.scrollPadding.slug]: ScrollPaddingDemo,
  [layoutLabSections.layers.slug]: LayersDemo,
  [layoutLabSections.wild.slug]: WildCardDemos,
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

// One section of the tour as its own page.
export function LayoutSectionPage({ slug }: { slug: string }) {
  const Section = sectionPages[slug]
  return <div className="lab-layout"><Section /></div>
}
