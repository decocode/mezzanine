import { Button, Heading, Link, Text } from '@decocode/mezzanine'
import { DocsPageTemplate } from '../templates/DocsPageTemplate'
import { boxToTheFuture, childPageCardAction, futurePages, layoutLabIntro, layoutLabSections, layoutStages, stagePagesByStage, type FuturePage, type LayoutStage, type StagePage } from './layout/layoutLabContent'
import {
  ColumnDropDemo, ContainerQueryDemo, FluidSizingDemo, LayersDemo, NamedLayersDemo, PositioningDemo, ResponsiveDesignDemo,
  ScrollPaddingDemo, SupportsDemo, ViewportDemo,
} from './layout/FoundationDemos'
import { FutureOverview, FuturePageView, SectionPageView, StageOverview, StagePageView } from './layout/StagePages'
import './layout/layout-lab.css'

// Pages from the first version of the tour, keyed by their slug, until they move into a stage.
const sectionPages: Record<string, () => React.JSX.Element> = {
  [layoutLabSections.positioning.slug]: PositioningDemo,
  [layoutLabSections.columnDrop.slug]: ColumnDropDemo,
  [layoutLabSections.responsiveDesign.slug]: ResponsiveDesignDemo,
  [layoutLabSections.fluidSizing.slug]: FluidSizingDemo,
  [layoutLabSections.supports.slug]: SupportsDemo,
  [layoutLabSections.container.slug]: ContainerQueryDemo,
  [layoutLabSections.namedLayers.slug]: NamedLayersDemo,
  [layoutLabSections.viewport.slug]: ViewportDemo,
  [layoutLabSections.scrollPadding.slug]: ScrollPaddingDemo,
  [layoutLabSections.layers.slug]: LayersDemo,
}

export function hasLayoutSectionPage(slug: string) {
  return slug in sectionPages
}

// The overview: a section for each stage with links to its pages, then the pages still to be
// sorted, then Box to the Future. Built with the docs page template. Illustrative and unapproved.
export function LayoutOverviewPage() {
  return <div className="lab-layout">
    <DocsPageTemplate
      title={layoutLabIntro.title}
      description={[layoutLabIntro.summary, layoutLabIntro.frames]}
      sections={[
        ...layoutStages.map((stage) => ({
          id: stage.id,
          title: stage.title,
          content: <div className="lab-section-body">
            <Text elementType="p" className="mz-text-body-md">{stage.summary}</Text>
            <ul className="lab-stage-pages mz-text-body-md">
              {stagePagesByStage(stage.key).map((page) => <li key={page.key}><Link href={page.href}>{page.title}</Link></li>)}
            </ul>
            <div><Button variant="secondary" href={`/site/lab/layout/${stage.slug}`} aria-describedby={stage.id}>{childPageCardAction}</Button></div>
          </div>,
        })),
        {
          id: 'lab-still-to-be-sorted',
          title: layoutLabIntro.moreHeading,
          content: <div className="lab-section-body">
            <Text elementType="p" className="mz-text-body-md">{layoutLabIntro.more}</Text>
            <ul className="lab-experiment-list">
              {Object.values(layoutLabSections).map((section) => <li key={section.slug}>
                <Heading level={3} className="mz-text-heading-sm"><Link href={`/site/lab/layout/${section.slug}`}>{section.title}</Link></Heading>
                <Text elementType="p" className="mz-text-body-md">{section.what}</Text>
              </li>)}
            </ul>
          </div>,
        },
        {
          id: boxToTheFuture.id,
          title: boxToTheFuture.title,
          content: <div className="lab-section-body">
            <Text elementType="p" className="mz-text-body-md">{boxToTheFuture.what}</Text>
            <ul className="lab-stage-pages mz-text-body-md">
              {futurePages.map((page) => <li key={page.key}><Link href={page.href}>{page.title}</Link></li>)}
            </ul>
            <div><Button variant="secondary" href={`/site/lab/layout/${boxToTheFuture.slug}`} aria-describedby={boxToTheFuture.id}>{childPageCardAction}</Button></div>
          </div>,
        },
      ]}
    />
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
  const section = Object.values(layoutLabSections).find((item) => item.slug === slug)!
  return <div className="lab-layout"><SectionPageView section={section} Demo={sectionPages[slug]} /></div>
}

// Box to the Future's overview page.
export function LayoutFuturePage() {
  return <div className="lab-layout"><FutureOverview /></div>
}

// One emerging feature's page.
export function LayoutFutureChildPage({ page }: { page: FuturePage }) {
  return <div className="lab-layout"><FuturePageView page={page} /></div>
}
