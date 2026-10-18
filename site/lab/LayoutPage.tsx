import { Button, Card, Heading } from '@decocode/mezzanine'
import { DocsPageTemplate } from '../templates/DocsPageTemplate'
import { childPageCardAction, browserAndDeviceLab, browserAndDevicePages, labTopLevelPages, layersLab, layersPages, layoutLabIntro, layoutStages, type FuturePage, type LabTopLevelPage, type LayoutStage, type StagePage } from './layout/layoutLabContent'
import { NamedLayersExample, PositioningExample, ScrollPaddingExample, StackingContextsExample } from './layout/LayersExamples'
import { MediaQueriesExample, SafeAreasExample, SupportsExample, TargetSizeExample } from './layout/BrowserAndDeviceExamples'
import { ReadingOrderExample } from './layout/ReadingOrderExamples'
import { StylePriorityExample } from './layout/StylePriorityExamples'
import { FutureOverview, FuturePageView, SectionPageView, StageOverview, StagePageView } from './layout/StagePages'
import './layout/layout-lab.css'


// The overview: what layout is, then a Card for each group. Built with the docs page template.
// Illustrative and unapproved.
export function LayoutOverviewPage() {
  return <div className="lab-layout">
    <DocsPageTemplate
      title={layoutLabIntro.title}
      description={[layoutLabIntro.summary, layoutLabIntro.principles]}
      showContents={false}
      sections={[{
        id: 'lab-layout-groups',
        title: layoutLabIntro.groupsHeading,
        content: <ul className="lab-child-page-cards">
          {layoutStages.map((stage) => <li key={stage.key}>
            <Card>
              <Heading level={3} id={stage.id}>{stage.title}</Heading>
              <p>{stage.summary}</p>
              <Button variant="secondary" href={`/site/lab/layout/${stage.slug}`} aria-describedby={stage.id}>{childPageCardAction}</Button>
            </Card>
          </li>)}
        </ul>,
      }]}
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

// The Emerging features experiment's overview page.
export function LayoutFuturePage() {
  return <div className="lab-layout"><FutureOverview /></div>
}

// One emerging feature's page.
export function LayoutFutureChildPage({ page }: { page: FuturePage }) {
  return <div className="lab-layout"><FuturePageView page={page} /></div>
}

// Lab pages outside Layout, keyed by their address.
const topLevelExamples: Record<string, () => React.JSX.Element> = {
  [layersPages.positioning.href]: PositioningExample,
  [layersPages.layerOrder.href]: NamedLayersExample,
  [layersPages.stackingContexts.href]: StackingContextsExample,
  [layersPages.scrollPadding.href]: ScrollPaddingExample,
  [browserAndDevicePages.mediaQueries.href]: MediaQueriesExample,
  [browserAndDevicePages.safeAreas.href]: SafeAreasExample,
  [browserAndDevicePages.targetSize.href]: TargetSizeExample,
  [labTopLevelPages.readingOrder.href]: ReadingOrderExample,
  [browserAndDevicePages.supports.href]: SupportsExample,
  [labTopLevelPages.stylePriority.href]: StylePriorityExample,
}

export function LabTopLevelPageView({ page }: { page: LabTopLevelPage }) {
  return <div className="lab-layout"><SectionPageView section={page} Example={topLevelExamples[page.href]} /></div>
}

// An experiment's overview outside Layout: what it covers, then a Card for each page.
function ExperimentOverview({ experiment, pages }: { experiment: { id: string; title: string; summary: string }; pages: Record<string, LabTopLevelPage> }) {
  return <div className="lab-layout">
    <DocsPageTemplate title={experiment.title} description={experiment.summary} showContents={false} sections={[{
      id: `${experiment.id}-pages`,
      title: 'Pages',
      content: <ul className="lab-child-page-cards">
        {Object.values(pages).map((page) => <li key={page.href}>
          <Card>
            <Heading level={3} id={`lab-card-${page.id}`}>{page.title}</Heading>
            <p>{page.what}</p>
            <Button variant="secondary" href={page.href} aria-describedby={`lab-card-${page.id}`}>{childPageCardAction}</Button>
          </Card>
        </li>)}
      </ul>,
    }]} />
  </div>
}

// The Layers experiment's overview.
export function LayersOverviewPage() {
  return <ExperimentOverview experiment={layersLab} pages={layersPages} />
}

// The Browser and device experiment's overview.
export function BrowserAndDeviceOverviewPage() {
  return <ExperimentOverview experiment={browserAndDeviceLab} pages={browserAndDevicePages} />
}
