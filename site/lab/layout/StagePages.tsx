import type { JSX, ReactNode } from 'react'
import { Badge, Button, Card, Heading, Text } from '@decocode/mezzanine'
import { DocsPageTemplate } from '../../templates/DocsPageTemplate'
import {
  boxToTheFuture, buildingBlockLabel, candidateBadgeLabel, childPageCardAction, futurePages, labBadgeLabel, stagePageHeadings,
  stageIntros, stagePagesByStage, todayBadgeLabel, type FuturePage, type LabSection, type LayoutStage, type StagePage,
} from './layoutLabContent'
import { futureDemos } from './EmergingFeatureDemos'
import { mezzanineUses, type MezzanineUse } from './mezzanineUsesContent'
import { theBoxDemos } from './TheBoxDemos'
import { insideTheBoxDemos } from './InsideTheBoxDemos'
import { arrangingBoxesDemos } from './ArrangingBoxesDemos'
import { boxFormationDemos } from './BoxFormationDemos'
import { boxesOnDevicesDemos } from './BoxesOnDevicesDemos'

// Each stage page's examples, keyed by the page's key. Pages with several examples give each a
// third-level heading; pages with one put the CSS behind it under a third-level heading. A page can
// also show Mezzanine's own detail, such as the spacing scale, in its "How Mezzanine uses it" half.
export type StageDemos = Record<string, { Demo: () => JSX.Element; MezzanineDetail?: () => JSX.Element }>

const demos: StageDemos = { ...theBoxDemos, ...insideTheBoxDemos, ...arrangingBoxesDemos, ...boxFormationDemos, ...boxesOnDevicesDemos }

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

// The "How Mezzanine uses it" half: what the library does today and Lab candidates, plus any detail.
function howMezzanineUsesItSection(id: string, uses: MezzanineUse[], detail?: ReactNode) {
  return {
    id: `${id}-how-mezzanine-uses-it`,
    title: stagePageHeadings.howMezzanineUsesIt,
    content: <div className="lab-section-body">
      <ul className="lab-uses mz-text-body-md">
        {uses.map((use, index) => <MezzanineUseItem key={index} use={use} />)}
      </ul>
      {detail}
    </div>,
  }
}

// A stage's overview: what the stage is about, its own "How it works" when it has one (The box
// explains the box model), then a Card for each of its pages. The Button is described by the
// Card's heading, so each "Read docs" is distinguishable to screen reader users.
export function StageOverview({ stage }: { stage: LayoutStage }) {
  const intro = stageIntros[stage.key]
  const IntroDemo = intro && demos[intro.key].Demo
  // A stage with only its Cards is an index page, so it has no On this page list.
  return <DocsPageTemplate title={stage.title} description={stage.summary} showContents={intro != null} references={intro?.references ?? []} sections={[
    ...(intro && IntroDemo ? [...howItWorksSections(intro, <IntroDemo />), howMezzanineUsesItSection(intro.id, mezzanineUses[intro.key] ?? [])] : []),
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

// One line of "How Mezzanine uses it", marked as what the library does today or as a Lab candidate.
function MezzanineUseItem({ use }: { use: MezzanineUse }) {
  return <li className="lab-use">
    {use.status === 'today'
      ? <Badge variant="success">{todayBadgeLabel}</Badge>
      : <Badge variant="warning">{candidateBadgeLabel}</Badge>}
    <span>{use.text}</span>
  </li>
}

// One stage page in two halves. How it works: the CSS idea, its examples and browser support.
// How Mezzanine uses it: what the library does today and Lab candidates. A building block's
// Every Layout and Bedrock sources are its References.
export function StagePageView({ page }: { page: StagePage }) {
  const { Demo, MezzanineDetail } = demos[page.key]
  const uses = [
    ...(mezzanineUses[page.key] ?? []),
    ...(page.similarTo ? [{ status: 'candidate' as const, text: `The ${page.title} building block on this page, following Bedrock Layouts.` }] : []),
  ]
  return <DocsPageTemplate
    title={page.title}
    description={page.subtitle}
    sections={[
      ...howItWorksSections(page, <Demo />),
      howMezzanineUsesItSection(page.id, uses, MezzanineDetail && <MezzanineDetail />),
    ]}
    references={[...(page.similarTo ?? []), ...(page.references ?? [])]}
  />
}

// A page still to be sorted into a stage, or a Lab page outside Layout: its "How it works" and "Example" sections.
export function SectionPageView({ section, Demo }: { section: Pick<LabSection, 'id' | 'title' | 'subtitle' | 'what' | 'why' | 'details' | 'support' | 'similarTo' | 'references'> & { usesKey?: string; relatedPages?: { label: string; href: string }[] }; Demo: () => JSX.Element }) {
  const uses = section.usesKey ? mezzanineUses[section.usesKey] : undefined
  return <DocsPageTemplate
    title={section.title}
    description={section.subtitle}
    sections={[...howItWorksSections(section, <Demo />), ...(uses ? [howMezzanineUsesItSection(section.id, uses)] : [])]}
    relatedPages={section.relatedPages ?? []}
    references={section.references ?? section.similarTo ?? []}
  />
}

// Box to the Future's overview: what emerging features are, then a Card for each, marked Lab.
export function FutureOverview() {
  return <DocsPageTemplate title={boxToTheFuture.title} description={[boxToTheFuture.what, boxToTheFuture.why, boxToTheFuture.support]} sections={[{
    id: `${boxToTheFuture.id}-pages`,
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
