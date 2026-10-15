import type { ReactNode } from 'react'
import { Badge, Button, Card, Heading } from '@decocode/mezzanine'
import { CssNotesBody, DemoFrame, DemoText, LabOnly, LabSectionIntro } from './LabParts'
import { AutoGrid, Block, Center, Cluster, SidebarLayout, Stack, Switcher } from './LabPrimitives'
import { childPageCardAction, cssNotes, layoutLabSections as sections, primitivePages, type ChildPage } from './layoutLabContent'

// Each child page's live example. Lab-only components carry the Warning outline and Lab badge.
const childPageExamples: Record<ChildPage['key'], ReactNode> = {
  stack: <DemoFrame label="Stack"><LabOnly name="Stack">
    <Stack><Block>Item one</Block><Block>Item two</Block><Block>Item three</Block></Stack>
  </LabOnly></DemoFrame>,
  cluster: <DemoFrame label="Cluster"><LabOnly name="Cluster">
    <Cluster>{['Design', 'Accessibility', 'Layout', 'Tokens', 'React Aria', 'Themes', 'Motion'].map((tag) => <Badge key={tag}>{tag}</Badge>)}</Cluster>
  </LabOnly></DemoFrame>,
  switcher: <DemoFrame label="Switcher"><LabOnly name="Switcher">
    <Switcher threshold="30rem"><Block>One</Block><Block>Two</Block><Block>Three</Block></Switcher>
  </LabOnly></DemoFrame>,
  grid: <DemoFrame label="Grid"><LabOnly name="AutoGrid">
    <AutoGrid min="10rem">{['A', 'B', 'C', 'D', 'E', 'F'].map((letter) => <Block key={letter}>Tile {letter}</Block>)}</AutoGrid>
  </LabOnly></DemoFrame>,
  sidebar: <DemoFrame label="Sidebar"><LabOnly name="SidebarLayout">
    <SidebarLayout sideWidth="12rem" contentMin="55%" side={<Block tall>Side column</Block>}>
      <Block tall>Main content</Block>
    </SidebarLayout>
  </LabOnly></DemoFrame>,
  center: <DemoFrame label="Center"><LabOnly name="Center">
    <Center max="24rem"><Block>Centred, never wider than 24rem</Block></Center>
  </LabOnly></DemoFrame>,
}

// A Card for each child page: its name, what it is, and a Button to its page. The Button is
// described by the Card's heading, so each "Read docs" is distinguishable to screen reader users.
function ChildPageCards({ pages }: { pages: ChildPage[] }) {
  return <ul className="lab-child-page-cards">
    {pages.map((page) => <li key={page.key}>
      <Card>
        <Heading level={2} id={`lab-child-page-card-${page.key}`}>{page.title}</Heading>
        <p>{page.summary}</p>
        <Button variant="secondary" href={page.href} aria-describedby={`lab-child-page-card-${page.key}`}>{childPageCardAction}</Button>
      </Card>
    </li>)}
  </ul>
}

// Intrinsic primitives: the introduction, then a Card for each primitive.
export function IntrinsicOverview() {
  return <section aria-labelledby={sections.intrinsic.id} className="lab-layout-section">
    <LabSectionIntro section={sections.intrinsic} hasExamples={false} />
    <ChildPageCards pages={primitivePages} />
  </section>
}

// One child page: what it does, a live example, then the CSS behind it.
export function ChildPageContent({ page }: { page: ChildPage }) {
  const headingId = `lab-child-page-${page.key}`
  return <section aria-labelledby={headingId} className="lab-layout-section">
    <Heading id={headingId} level={1} className="mz-text-heading-lg">{page.title}</Heading>
    <DemoText>{page.summary}</DemoText>
    <Heading level={2} className="lab-section-heading mz-text-heading-md">Example</Heading>
    {childPageExamples[page.key]}
    <Heading level={2} className="lab-section-heading mz-text-heading-md">The CSS behind {page.title}</Heading>
    <CssNotesBody note={cssNotes[page.key]} />
  </section>
}
