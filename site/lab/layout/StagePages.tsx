import type { JSX } from 'react'
import { Badge, Button, Card, Heading, Text } from '@decocode/mezzanine'
import { SimilarToLinks } from './LabParts'
import {
  buildingBlockLabel, candidateBadgeLabel, childPageCardAction, stagePageHeadings, stagePagesByStage, todayBadgeLabel,
  type LayoutStage, type StagePage,
} from './layoutLabContent'
import { mezzanineUses, type MezzanineUse } from './mezzanineUsesContent'
import { oneBoxDemos } from './OneBoxDemos'
import { insideTheBoxDemos } from './InsideTheBoxDemos'
import { arrangingBoxesDemos } from './ArrangingBoxesDemos'
import { boxFormationDemos } from './BoxFormationDemos'

// Each stage page's examples, keyed by the page's key. Pages with several examples give each a
// third-level heading; pages with one put the CSS behind it under a third-level heading. A page can
// also show Mezzanine's own detail, such as the spacing scale, in its "How Mezzanine uses it" half.
export type StageDemos = Record<string, { Demo: () => JSX.Element; MezzanineDetail?: () => JSX.Element }>

const demos: StageDemos = { ...oneBoxDemos, ...insideTheBoxDemos, ...arrangingBoxesDemos, ...boxFormationDemos }

// A stage's overview: what the stage is about, then a Card for each of its pages. The Button is
// described by the Card's heading, so each "Read docs" is distinguishable to screen reader users.
export function StageOverview({ stage }: { stage: LayoutStage }) {
  return <section aria-labelledby={stage.id} className="lab-layout-section">
    <Heading id={stage.id} level={1} className="mz-text-heading-lg">{stage.title}</Heading>
    <Text elementType="p" className="lab-subtitle mz-text-body-lg">{stage.summary}</Text>
    <ul className="lab-child-page-cards">
      {stagePagesByStage(stage.key).map((page) => <li key={page.key}>
        <Card>
          <Heading level={2} id={`lab-child-page-card-${page.key}`}>{page.title}</Heading>
          {page.similarTo && <p className="lab-page-badges"><Badge>{buildingBlockLabel}</Badge></p>}
          <p>{page.subtitle}</p>
          <Button variant="secondary" href={page.href} aria-describedby={`lab-child-page-card-${page.key}`}>{childPageCardAction}</Button>
        </Card>
      </li>)}
    </ul>
  </section>
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
// How Mezzanine uses it: what the library does today, Lab candidates, and where a building block comes from.
export function StagePageView({ page }: { page: StagePage }) {
  const { Demo, MezzanineDetail } = demos[page.key]
  const uses = [
    ...(mezzanineUses[page.key] ?? []),
    ...(page.similarTo ? [{ status: 'candidate' as const, text: `The ${page.title} building block on this page, following Bedrock Layouts.` }] : []),
  ]
  return <section aria-labelledby={page.id} className="lab-layout-section">
    <Heading id={page.id} level={1} className="mz-text-heading-lg">{page.title}</Heading>
    <Text elementType="p" className="lab-subtitle mz-text-body-lg">{page.subtitle}</Text>
    {page.similarTo && <p className="lab-page-badges"><Badge>{buildingBlockLabel}</Badge></p>}

    <Heading level={2} className="lab-section-heading mz-text-heading-md">{stagePageHeadings.howItWorks}</Heading>
    <div className="lab-explainer">
      <Text elementType="p" className="mz-text-body-md">{page.what}</Text>
      <Text elementType="p" className="mz-text-body-md">{page.why}</Text>
    </div>
    <Demo />
    <Heading level={3} className="lab-section-heading mz-text-heading-sm">{stagePageHeadings.browserSupport}</Heading>
    <Text elementType="p" className="lab-demo-text mz-text-body-md">{page.support}</Text>

    <Heading level={2} className="lab-section-heading mz-text-heading-md">{stagePageHeadings.howMezzanineUsesIt}</Heading>
    <ul className="lab-uses mz-text-body-md">
      {uses.map((use, index) => <MezzanineUseItem key={index} use={use} />)}
    </ul>
    {MezzanineDetail && <MezzanineDetail />}
    {page.similarTo && <SimilarToLinks links={page.similarTo} />}
  </section>
}
