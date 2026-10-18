import type { JSX, ReactNode } from 'react'
import { Badge, Button, Card, Heading, Text } from '@decocode/mezzanine'
import { DocsPageTemplate } from '../../templates/DocsPageTemplate'
import { DocsTable } from '../../components/DocsTable'
import { splitInlineCode } from './layoutLabLogic'
import {
  emergingFeatures, buildingBlockLabel, childPageCardAction, futurePages, labBadgeLabel, stagePageHeadings,
  stageIntros, stagePagesByStage, type FuturePage, type LabSection, type LayoutStage, type StagePage,
} from './layoutLabContent'
import { futureDemos } from './EmergingFeatureDemos'
import { ColumnDropDemo, ContainerQueryDemo, FluidSizingDemo, ViewportDemo } from './FoundationDemos'
import { theBoxDemos } from './TheBoxDemos'
import { insideTheBoxDemos } from './InsideTheBoxDemos'
import { arrangingBoxesDemos } from './ArrangingBoxesDemos'
import { boxFormationDemos } from './BoxFormationDemos'

// Each stage page's examples, keyed by the page's key. Pages with several examples give each a
// third-level heading; pages with one put the CSS behind it under a third-level heading. A page can
// also show Mezzanine's own detail, such as the spacing scale, after its demo in the Example section.
export type StageDemos = Record<string, { Demo: () => JSX.Element; Detail?: () => JSX.Element }>

// The pages that moved into stages from the first version of the tour.
const sortedPageDemos: StageDemos = {
  columnDrop: { Demo: ColumnDropDemo },
  containerQueries: { Demo: ContainerQueryDemo },
  fluidSizing: { Demo: FluidSizingDemo },
  viewportUnits: { Demo: ViewportDemo },
}

const demos: StageDemos = { ...theBoxDemos, ...insideTheBoxDemos, ...arrangingBoxesDemos, ...boxFormationDemos, ...sortedPageDemos }

// The "How it works" and "Example" sections shared by every Layout page: what it is, why it matters
// and browser support, then the examples with the CSS behind them. Each is a section of the docs page template.
function howItWorksSections(page: { id: string; what: string; why: string; details?: readonly string[]; support?: string }, examples: ReactNode) {
  return [{
    id: `${page.id}-how-it-works`,
    title: stagePageHeadings.howItWorks,
    content: <div className="lab-section-body">
      <div className="lab-explainer">
        {[page.what, page.why, ...(page.details ?? [])].map((paragraph) => <Text key={paragraph} elementType="p" className="mz-text-body-md">{paragraph}</Text>)}
      </div>
      {page.support && <>
        <Heading level={3} className="lab-section-heading mz-text-heading-sm">{stagePageHeadings.browserSupport}</Heading>
        <Text elementType="p" className="lab-demo-text mz-text-body-md">{page.support}</Text>
      </>}
    </div>,
  }, {
    id: `${page.id}-example`,
    title: stagePageHeadings.example,
    content: <div className="lab-section-body">{examples}</div>,
  }]
}

// A stage's overview: what the stage is about, its own "How it works" when it has one (Box basics
// explains the box model), then a Card for each of its pages. The Button is described by the
// Card's heading, so each "Read docs" is distinguishable to screen reader users.
export function StageOverview({ stage }: { stage: LayoutStage }) {
  const intro = stageIntros[stage.key]
  const IntroDemo = intro && demos[intro.key].Demo
  // A stage with only its Cards is an index page, so it has no On this page list.
  return <DocsPageTemplate title={stage.title} description={stage.summary} showContents={intro != null} references={intro?.references ?? []} sections={[
    ...(intro && IntroDemo ? [...howItWorksSections(intro, <IntroDemo />)] : []),
    {
      id: `${stage.id}-pages`,
      title: stage.pagesHeading ?? stagePageHeadings.pages,
      content: <ul className="lab-child-page-cards">
        {stagePagesByStage(stage.key).map((page) => <li key={page.key}>
          <Card>
            <Heading level={3} id={`lab-child-page-card-${page.key}`}>{page.title}</Heading>
            {page.similarTo && <p className="lab-page-badges"><Badge>{buildingBlockLabel}</Badge></p>}
            <p>{page.subtitle}</p>
            <Button variant="secondary" href={page.href} aria-describedby={`lab-child-page-card-${page.key}`}>{childPageCardAction}</Button>
          </Card>
        </li>)}
      </ul>,
    },
  ]} />
}

// What designers, engineers, print and other design systems call the same thing, in a closed Disclosure.
function alsoKnownAsSection(id: string, title: string, names: NonNullable<StagePage['alsoKnownAs']>) {
  return {
    id: `${id}-also-known-as`,
    title: stagePageHeadings.alsoKnownAs,
    isCollapsible: true,
    content: <DocsTable aria-label={`Other names for ${title}`} nameColumn="Where" descriptionColumn="Called" namesAreCode={false} rows={names.map(({ where, called }) => ({
      name: where,
      description: splitInlineCode(called).map(({ part, isCode }, index) => isCode ? <code key={index}>{part}</code> : part),
    }))} />,
  }
}

// One stage page: Also known as when its name is agreed, How it works, then Example. A building
// block's Every Layout and Bedrock sources are its References.
export function StagePageView({ page }: { page: StagePage }) {
  const { Demo, Detail } = demos[page.key]
  return <DocsPageTemplate
    title={page.title}
    description={page.subtitle}
    sections={[
      ...(page.alsoKnownAs ? [alsoKnownAsSection(page.id, page.title, page.alsoKnownAs)] : []),
      ...howItWorksSections(page, <><Demo />{Detail && <Detail />}</>),
    ]}
    references={[...(page.similarTo ?? []), ...(page.references ?? [])]}
  />
}

// A page still to be sorted into a stage, or a Lab page outside Layout: its "How it works" and "Example" sections.
export function SectionPageView({ section, Demo }: { section: Pick<LabSection, 'id' | 'title' | 'subtitle' | 'what' | 'why' | 'details' | 'support' | 'similarTo' | 'references'> & { relatedPages?: { label: string; href: string }[] }; Demo: () => JSX.Element }) {
  return <DocsPageTemplate
    title={section.title}
    description={section.subtitle}
    sections={howItWorksSections(section, <Demo />)}
    relatedPages={section.relatedPages ?? []}
    references={section.references ?? section.similarTo ?? []}
  />
}

// Emerging features' overview: what emerging features are, then a Card for each, marked Lab.
export function FutureOverview() {
  return <DocsPageTemplate title={emergingFeatures.title} description={[emergingFeatures.what, emergingFeatures.why, emergingFeatures.support]} sections={[{
    id: `${emergingFeatures.id}-pages`,
    title: stagePageHeadings.pages,
    content: <ul className="lab-child-page-cards">
      {futurePages.map((page) => <li key={page.key}>
        <Card>
          <Heading level={3} id={`lab-child-page-card-${page.key}`}>{page.title}</Heading>
          <p className="lab-page-badges"><Badge variant="warning">{labBadgeLabel}</Badge></p>
          <Button variant="secondary" href={page.href} aria-describedby={`lab-child-page-card-${page.key}`}>{childPageCardAction}</Button>
        </Card>
      </li>)}
    </ul>,
  }]} />
}

// One emerging feature: its demo, which says which browsers support it, in a "How it works" section.
export function FuturePageView({ page }: { page: FuturePage }) {
  const Demo = futureDemos[page.key]
  return <DocsPageTemplate title={page.title} references={page.references ?? []} sections={[{
    id: `${page.id}-how-it-works`,
    title: stagePageHeadings.howItWorks,
    content: <div className="lab-section-body"><Demo /></div>,
  }]} />
}
