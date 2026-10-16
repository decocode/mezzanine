import { Heading, Link, Text } from '@decocode/mezzanine'
import { layoutLabIntro, layoutLabSections, layoutStages, stagePagesByStage, type LayoutStage, type StagePage } from './layout/layoutLabContent'
import {
  ContainerQueryDemo, EnvironmentDemo, LayersDemo, NamedLayersDemo, ScrollPaddingDemo, ViewportDemo,
} from './layout/FoundationDemos'
import { EmergingFeatureDemos } from './layout/EmergingFeatureDemos'
import { StageOverview, StagePageView } from './layout/StagePages'
import './layout/layout-lab.css'

// Pages from the first version of the tour, keyed by their slug, until they move into a stage.
const sectionPages: Record<string, () => React.JSX.Element> = {
  [layoutLabSections.container.slug]: ContainerQueryDemo,
  [layoutLabSections.environment.slug]: EnvironmentDemo,
  [layoutLabSections.namedLayers.slug]: NamedLayersDemo,
  [layoutLabSections.viewport.slug]: ViewportDemo,
  [layoutLabSections.scrollPadding.slug]: ScrollPaddingDemo,
  [layoutLabSections.layers.slug]: LayersDemo,
  [layoutLabSections.emerging.slug]: EmergingFeatureDemos,
}

export function hasLayoutSectionPage(slug: string) {
  return slug in sectionPages
}

// The overview: each stage with links to its pages, then the pages still to be sorted. Illustrative and unapproved.
export function LayoutOverviewPage() {
  return <div className="lab-layout">
    <div className="lab-layout-intro">
      <Heading level={1} className="mz-text-heading-lg">{layoutLabIntro.title}</Heading>
      <Text elementType="p" className="mz-text-body-lg">{layoutLabIntro.summary}</Text>
      <Text elementType="p" className="mz-text-body-md">{layoutLabIntro.key}</Text>
      <Text elementType="p" className="mz-text-body-md">{layoutLabIntro.frames}</Text>
    </div>
    <ol className="lab-stage-list">
      {layoutStages.map((stage) => <li key={stage.slug}>
        <Heading level={2} className="mz-text-heading-md"><Link href={`/site/lab/layout/${stage.slug}`}>{stage.title}</Link></Heading>
        <Text elementType="p" className="mz-text-body-md">{stage.summary}</Text>
        <ul className="lab-stage-pages mz-text-body-md">
          {stagePagesByStage(stage.key).map((page) => <li key={page.key}><Link href={page.href}>{page.title}</Link></li>)}
        </ul>
      </li>)}
    </ol>
    <div className="lab-layout-intro">
      <Heading level={2} className="mz-text-heading-md">{layoutLabIntro.moreHeading}</Heading>
      <Text elementType="p" className="mz-text-body-md">{layoutLabIntro.more}</Text>
      <ul className="lab-experiment-list">
        {Object.values(layoutLabSections).map((section) => <li key={section.slug}>
          <Heading level={3} className="mz-text-heading-sm"><Link href={`/site/lab/layout/${section.slug}`}>{section.title}</Link></Heading>
          <Text elementType="p" className="mz-text-body-md">{section.what}</Text>
        </li>)}
      </ul>
    </div>
  </div>
}

// A stage's overview page.
export function LayoutStagePage({ stage }: { stage: LayoutStage }) {
  return <div className="lab-layout"><StageOverview stage={stage} /></div>
}

// A page inside a stage.
export function LayoutStageChildPage({ page }: { page: StagePage }) {
  return <div className="lab-layout"><StagePageView page={page} /></div>
}

// One of the pages still to be sorted.
export function LayoutSectionPage({ slug }: { slug: string }) {
  const Section = sectionPages[slug]
  return <div className="lab-layout"><Section /></div>
}
