import type { JSX } from 'react'
import { Badge, Button, Card, Heading, Text } from '@decocode/mezzanine'
import { BrowserSupport, LabSectionIntro, SimilarToLinks } from './LabParts'
import { buildingBlockLabel, childPageCardAction, stagePagesByStage, type LayoutStage, type StagePage } from './layoutLabContent'
import { oneBoxDemos } from './OneBoxDemos'
import { insideTheBoxDemos } from './InsideTheBoxDemos'
import { arrangingBoxesDemos } from './ArrangingBoxesDemos'
import { boxFormationDemos } from './BoxFormationDemos'

// Each stage page's examples, keyed by the page's key. Pages with one example use the
// "Example" heading and put the CSS behind it under a second-level heading.
export type StageDemos = Record<string, { Demo: () => JSX.Element; isSingleExample?: boolean }>

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

// One stage page: its introduction, examples, where a building block comes from, and browser support.
export function StagePageView({ page }: { page: StagePage }) {
  const { Demo, isSingleExample = false } = demos[page.key]
  return <section aria-labelledby={page.id} className="lab-layout-section">
    <LabSectionIntro section={page} isSingleExample={isSingleExample} isBuildingBlock={page.similarTo != null} />
    <Demo />
    {page.similarTo && <SimilarToLinks links={page.similarTo} />}
    <BrowserSupport section={page} />
  </section>
}
