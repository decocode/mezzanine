import type { ReactNode } from 'react'
import { Badge, Button, Card, Heading } from '@decocode/mezzanine'
import { ContentPage } from '../../templates/ContentPage'
import type { DocsPageContent } from '../../templates/docsPageContent'
import { childPageCardAction, labBadgeLabel } from './labValues'

// One Lab page, built by the docs site's ContentPage from its content file: Also known as when its
// name is agreed, How it works (with Browser support where it matters), then the page's example(s)
// in the section the part names. The wrapper gives examples the Lab's spacing.
export function LabContentPage({ content, parts }: { content: DocsPageContent; parts: Partial<Record<string, ReactNode>> }) {
  return <div className="lab-layout">
    <ContentPage content={content} parts={Object.fromEntries(Object.entries(parts).map(([key, part]) => [key, <div className="lab-section-body">{part}</div>]))} />
  </div>
}

export interface PageCard {
  // The Card's heading id, which describes its Button.
  headingId: string
  title: string
  href: string
  text?: string
  // Emerging features show the Lab badge instead of text.
  isLab?: boolean
}

// An overview page: its content file's introduction, then its one section holding a Card for each
// page, usually with no On this page list. The Button is described by the Card's heading, so each
// "Read docs" is distinguishable to screen reader users.
export function OverviewPage({ content, cards, showContents = false }: { content: DocsPageContent; cards: readonly PageCard[]; showContents?: boolean }) {
  const sectionKey = content.sections?.[0]?.key ?? ''
  return <div className="lab-layout">
    <ContentPage content={content} showContents={showContents} parts={{
      [sectionKey]: <ul className="lab-child-page-cards">
        {cards.map((card) => <li key={card.href}>
          <Card>
            <Heading level={3} id={card.headingId}>{card.title}</Heading>
            {card.isLab ? <p className="lab-page-badges"><Badge variant="warning">{labBadgeLabel}</Badge></p> : <p>{card.text}</p>}
            <Button hierarchy="secondary" href={card.href} aria-describedby={card.headingId}>{childPageCardAction}</Button>
          </Card>
        </li>)}
      </ul>,
    }} />
  </div>
}
