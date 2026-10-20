import type { JSX } from 'react'
import type { FuturePage, LabPage, LayoutStage, StagePage } from './labTypes'
import { overviewPagesHeading } from './labValues'
import { layoutOverview, layoutStages, stagePagesByStage } from '../layout/layoutContent'
import { stageExamples } from '../layout/layoutExamples'
import { emergingFeatures, futurePages } from '../emerging-features/emergingFeaturesContent'
import { futureExamples } from '../emerging-features/emergingFeaturesExamples'
import { labTopLevelPages } from '../labTopLevelPages'
import { StylePriorityExample } from '../style-priority/StylePriorityExample'
import { LabContentPage, OverviewPage } from './StagePages'
import './layout-lab.css'

// The Lab's pages, each built with the docs site's ContentPage. Illustrative and unapproved.

// The Layout overview: what layout is, then a Card for each group.
export function LayoutOverviewPage() {
  return <OverviewPage content={layoutOverview} cards={layoutStages.map((stage) => ({ headingId: stage.id, title: stage.title, href: `/site/lab/layout/${stage.slug}`, text: stage.summary }))} />
}

// A group's overview: what the group is about, then a Card for each of its pages.
export function LayoutStagePage({ stage }: { stage: LayoutStage }) {
  return <OverviewPage
    content={{ id: stage.id, kind: 'foundation', title: stage.title, description: stage.summary, sections: [{ key: 'pages', title: stage.pagesHeading ?? overviewPagesHeading }] }}
    cards={stagePagesByStage(stage.key).map((page) => ({ headingId: `lab-child-page-card-${page.key}`, title: page.title, href: page.href, text: typeof page.description === 'string' ? page.description : undefined }))}
  />
}

// A page inside a group: its example, and any Mezzanine detail after it, in the Example section.
export function LayoutStageChildPage({ page }: { page: StagePage }) {
  const { Example, Detail } = stageExamples[page.key]
  return <LabContentPage content={page} parts={{ example: <><Example />{Detail && <Detail />}</> }} />
}

// The Emerging features overview: what emerging features are, then a Card for each, marked Lab.
// Unlike the other overviews, it has always had an On this page list.
export function LayoutFuturePage() {
  return <OverviewPage showContents content={emergingFeatures} cards={futurePages.map((page) => ({ headingId: `lab-child-page-card-${page.key}`, title: page.title, href: page.href, isLab: true }))} />
}

// One emerging feature: its example, which says which browsers support it, in How it works.
export function LayoutFutureChildPage({ page }: { page: FuturePage }) {
  const Example = futureExamples[page.key]
  return <LabContentPage content={page} parts={{ howItWorks: <Example /> }} />
}

// Lab pages outside Layout, keyed by their address.
const topLevelExamples: Record<string, () => JSX.Element> = {
  [labTopLevelPages.stylePriority.href]: StylePriorityExample,
}

// A Lab page outside Layout: How it works, then its example.
export function LabTopLevelPageView({ page }: { page: LabPage }) {
  const Example = topLevelExamples[page.href]
  return <LabContentPage content={page} parts={{ example: <Example /> }} />
}
