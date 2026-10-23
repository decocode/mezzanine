import type { FuturePage, LayoutChildPage as LayoutChildPageContent } from './labTypes'
import { layoutOverview, layoutPages } from '../layout/layoutContent'
import { layoutExamples } from '../layout/layoutExamples'
import { emergingFeatures, futurePages } from '../emerging-features/emergingFeaturesContent'
import { futureExamples } from '../emerging-features/emergingFeaturesExamples'
import { LabContentPage, OverviewPage } from './StagePages'
import './layout-lab.css'

// The Lab's pages, each built with the docs site's ContentPage. Illustrative and unapproved.

// The Layout overview: what layout is, then a Card for each of its pages.
export function LayoutOverviewPage() {
  return <OverviewPage content={layoutOverview} cards={layoutPages.map((page) => ({ headingId: `lab-child-page-card-${page.key}`, title: page.title, href: page.href, text: typeof page.description === 'string' ? page.description : undefined }))} />
}

// A Layout page: its example, and any Mezzanine detail after it, in the Example section.
export function LayoutChildPage({ page }: { page: LayoutChildPageContent }) {
  const { Example, Detail } = layoutExamples[page.key]
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
