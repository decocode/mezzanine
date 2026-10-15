import { useRef, useState } from 'react'
import { Badge, Button, Card, Cell, Checkbox, Column, Heading, Row, Table, TableBody, TableHeader, Text } from '@decocode/mezzanine'
import { CssNotes, DemoFrame, DemoHeading, DemoText, LabOnly, LabSectionIntro } from './LabParts'
import { AutoGrid, Block, Center, Cluster, SidebarLayout, Stack, Switcher } from './LabPrimitives'
import { environmentQueries, layoutLabSections as sections, cssNotes, sampleParagraph } from './layoutLabContent'
import { measureProbes, measureSafeAreas, useMediaQuery } from './layoutLabLogic'

export function IntrinsicDemo() {
  return <section aria-labelledby={sections.intrinsic.id} className="lab-layout-section">
    <LabSectionIntro section={sections.intrinsic} />
    <DemoText>Each example has its own width slider. Drag it and watch that pattern rearrange itself.</DemoText>
    <DemoHeading>Stack</DemoHeading>
    <DemoText>Stack puts items one above another. The space between them is set by the parent, not by each item, so no component needs its own outer margin.</DemoText>
    <DemoFrame label="Stack">
      <LabOnly name="Stack">
        <Stack><Block>Item one</Block><Block>Item two</Block><Block>Item three</Block></Stack>
      </LabOnly>
    </DemoFrame>
    <CssNotes name="Stack" note={cssNotes.stack} />
    <DemoHeading>Cluster</DemoHeading>
    <DemoText>Cluster is a row that wraps onto new lines the way words do. These are real Mezzanine Badges.</DemoText>
    <DemoFrame label="Cluster">
      <LabOnly name="Cluster">
        <Cluster>{['Design', 'Accessibility', 'Layout', 'Tokens', 'React Aria', 'Themes', 'Motion'].map((tag) => <Badge key={tag}>{tag}</Badge>)}</Cluster>
      </LabOnly>
    </DemoFrame>
    <CssNotes name="Cluster" note={cssNotes.cluster} />
    <DemoHeading>Switcher</DemoHeading>
    <DemoText>The three blocks sit in a row while there’s at least 30rem of room. Below that, they all drop into a column together, so you never get an awkward two-and-one split. Drag the slider across 30rem to see it switch.</DemoText>
    <DemoFrame label="Switcher">
      <LabOnly name="Switcher">
        <Switcher threshold="30rem"><Block>One</Block><Block>Two</Block><Block>Three</Block></Switcher>
      </LabOnly>
    </DemoFrame>
    <CssNotes name="Switcher" note={cssNotes.switcher} />
    <DemoHeading>Grid</DemoHeading>
    <DemoText>The grid works out its own column count, from three to two to one, just from how many 10rem tiles fit. You never choose the number of columns.</DemoText>
    <DemoFrame label="Grid">
      <LabOnly name="AutoGrid">
        <AutoGrid min="10rem">{['A', 'B', 'C', 'D', 'E', 'F'].map((letter) => <Block key={letter}>Tile {letter}</Block>)}</AutoGrid>
      </LabOnly>
    </DemoFrame>
    <CssNotes name="Grid" note={cssNotes.grid} />
    <DemoHeading>Sidebar</DemoHeading>
    <DemoText>This is the layout foundation you decided on. The 12rem side column stays next to the main content until the main area would fall below 55% of the width. Then the side column moves above it. Neither number is a screen width.</DemoText>
    <DemoFrame label="Sidebar">
      <LabOnly name="SidebarLayout">
        <SidebarLayout sideWidth="12rem" contentMin="55%" side={<Block tall>Side column</Block>}>
          <Block tall>Main content</Block>
        </SidebarLayout>
      </LabOnly>
    </DemoFrame>
    <CssNotes name="Sidebar" note={cssNotes.sidebar} />
    <DemoHeading>Center</DemoHeading>
    <DemoText>Center keeps content in the middle and stops it growing wider than a set measure, here 24rem.</DemoText>
    <DemoFrame label="Center">
      <LabOnly name="Center">
        <Center max="24rem"><Block>Centred, never wider than 24rem</Block></Center>
      </LabOnly>
    </DemoFrame>
    <CssNotes name="Center" note={cssNotes.center} />
  </section>
}

// The same tile adapts to whichever slot it is placed in.
function ContainerTile() {
  return <div className="lab-cq-slot">
    <LabOnly name="ContainerTile">
      <Card>
        <div className="lab-cq-tile">
          <div className="lab-block lab-cq-image mz-text-body-sm">Image</div>
          <div className="lab-cq-text">
            <Heading level={4}>Tile title</Heading>
            <Text elementType="p" className="mz-text-body-md">The tile stacks in narrow space and sits side by side when its slot is at least 26rem.</Text>
          </div>
        </div>
      </Card>
    </LabOnly>
  </div>
}

export function ContainerQueryDemo() {
  return <section aria-labelledby={sections.container.id} className="lab-layout-section">
    <LabSectionIntro section={sections.container} />
    <DemoHeading>A narrow slot and a wide slot</DemoHeading>
    <DemoText>Here is the same tile twice, side by side. Each one looks at its own slot, so the narrow one stacks its image above the text and the wide one puts them side by side. Make the frame narrower and the wide slot drops underneath and changes too. Inside, the tile uses a real Mezzanine Card.</DemoText>
    <DemoFrame label="A narrow slot and a wide slot" initialWidth={1100}>
      <div className="lab-two-slots">
        <div><Text elementType="p" className="mz-text-label-md">Narrow slot, like a sidebar</Text><ContainerTile /></div>
        <div><Text elementType="p" className="mz-text-label-md">Wide slot, like the main column</Text><ContainerTile /></div>
      </div>
    </DemoFrame>
    <CssNotes name="the two slots" note={cssNotes.twoSlots} />
    <DemoHeading>In a frame you can resize</DemoHeading>
    <DemoText>Drag the slider past about 26rem and the tile changes layout, while the window stays the same size.</DemoText>
    <DemoFrame label="In a frame you can resize" initialWidth={360}>
      <ContainerTile />
    </DemoFrame>
    <CssNotes name="the tile" note={cssNotes.containerTile} />
  </section>
}

function EnvironmentRow({ label, query }: { label: string; query: string }) {
  const matches = useMediaQuery(query)
  return <Row id={query}>
    <Cell>{label}</Cell>
    <Cell><code>{query}</code></Cell>
    <Cell>{matches ? <Badge variant="success">Yes</Badge> : <Badge>No</Badge>}</Cell>
  </Row>
}

export function EnvironmentDemo() {
  return <section aria-labelledby={sections.environment.id} className="lab-layout-section">
    <LabSectionIntro section={sections.environment} />
    <DemoText>Try switching your system to dark mode, turning on increased contrast, or using DevTools device mode. The answers update as you go.</DemoText>
    <div className="lab-table">
      <Table aria-label="Environment media queries in this browser">
        <TableHeader>
          <Column isRowHeader>Question</Column>
          <Column>Media query</Column>
          <Column>True here?</Column>
        </TableHeader>
        <TableBody>{environmentQueries.map((item) => <EnvironmentRow key={item.query} {...item} />)}</TableBody>
      </Table>
    </div>
    <CssNotes name="environment queries" note={cssNotes.environment} level={3} />
    <DemoText>Notice that only the last row is about width, and it’s about the whole window, which is the page frame’s concern. Reduced motion is missing on purpose: in Mezzanine, only the shared motion policy reads that preference.</DemoText>
  </section>
}

export function TokensDemo() {
  return <section aria-labelledby={sections.tokens.id} className="lab-layout-section">
    <LabSectionIntro section={sections.tokens} />
    <DemoHeading>Reading width</DemoHeading>
    <DemoText>The same paragraph twice. Widen the frame and the first one stretches into long, tiring lines. The second stops at a comfortable 65 characters or so, and stays centred with equal space on both sides. Narrow the frame and both wrap onto more lines.</DemoText>
    <DemoFrame label="Reading width" initialWidth={1100}>
      <Stack>
        <LabOnly name="Without a reading width"><Text elementType="p" className="mz-text-body-md">{sampleParagraph}</Text></LabOnly>
        <LabOnly name="With --lab-measure (65ch)"><div className="lab-measure"><Text elementType="p" className="mz-text-body-md">{sampleParagraph}</Text></div></LabOnly>
      </Stack>
    </DemoFrame>
    <CssNotes name="Reading width" note={cssNotes.measure} />
    <DemoHeading>Target size</DemoHeading>
    <DemoText>Two squares showing the smallest a tap or click target should be. The first is the minimum WCAG 2.2 allows. The second is what Mezzanine’s buttons use today.</DemoText>
    <LabOnly name="Target sizes">
      <div className="lab-targets">
        <div><span className="lab-target lab-target-wcag" aria-hidden="true" /><Text elementType="p" className="mz-text-body-sm">24px: the WCAG 2.2 AA minimum</Text></div>
        <div><span className="lab-target lab-target-comfortable" aria-hidden="true" /><Text elementType="p" className="mz-text-body-sm">44px: what Mezzanine&apos;s buttons use today, as --lab-target-min</Text></div>
      </div>
    </LabOnly>
    <CssNotes name="Target size" note={cssNotes.targetSize} />
    <DemoHeading>Layers</DemoHeading>
    <DemoText>Each box takes its place in the stack from a named token, so a decision like “a modal sits above the sticky header” is made once. Today the Navbar uses 10, Modal 100 and Tooltip 110, each chosen separately.</DemoText>
    <LabOnly name="Named layers">
      <div className="lab-layer-stack">
        {['base', 'raised', 'sticky', 'overlay', 'modal', 'toast'].map((name) => <div key={name} className={`lab-layer lab-layer-${name} mz-text-body-sm`}><code>--lab-layer-{name}</code></div>)}
      </div>
    </LabOnly>
    <CssNotes name="Layers" note={cssNotes.layers} />
  </section>
}

export function LogicalDemo() {
  const [rtl, setRtl] = useState(false)
  return <section aria-labelledby={sections.logical.id} className="lab-layout-section">
    <LabSectionIntro section={sections.logical} />
    <DemoText>Turn on right to left. The logical box moves its border and indent to the right, where Arabic and Hebrew lines start. The physical one stays on the left and looks wrong. Mezzanine’s Sidebar drawer and Modal still use some physical properties.</DemoText>
    <Checkbox isSelected={rtl} onChange={setRtl}>Show right to left</Checkbox>
    <div className="lab-two-slots" dir={rtl ? 'rtl' : 'ltr'}>
      <LabOnly name="Physical (left/right)">
        <div className="lab-direction lab-direction-physical mz-text-body-md">Accent border and indent on the <strong>left</strong>, always.</div>
      </LabOnly>
      <LabOnly name="Logical (start/end)">
        <div className="lab-direction lab-direction-logical mz-text-body-md">Accent border and indent at the <strong>start</strong> of the line.</div>
      </LabOnly>
    </div>
    <CssNotes name="logical properties" note={cssNotes.logical} level={3} />
  </section>
}

export function SubgridDemo() {
  const [aligned, setAligned] = useState(true)
  const cards = [
    { title: 'Short', text: 'One line.' },
    { title: 'A much longer title that wraps onto two lines', text: 'Some text that is longer than the others, so it takes up more lines than the cards beside it.' },
    { title: 'Medium title', text: 'A little more text.' },
  ]
  return <section aria-labelledby={sections.subgrid.id} className="lab-layout-section">
    <LabSectionIntro section={sections.subgrid} />
    <DemoText>With subgrid on, the text in each card starts at the same height and the actions line up along the bottom, however long each title is. Turn it off and they drift apart. These cards are Lab-only because Mezzanine’s Card doesn’t use subgrid.</DemoText>
    <Checkbox isSelected={aligned} onChange={setAligned}>Use subgrid</Checkbox>
    <DemoFrame label="Subgrid cards" initialWidth={900}>
      <LabOnly name="SubgridCards">
        <div className={`lab-subgrid-list${aligned ? ' lab-subgrid-on' : ''}`}>
          {cards.map((card) => <div key={card.title} className="lab-subgrid-card">
            <Heading level={3}>{card.title}</Heading>
            <Text elementType="p" className="mz-text-body-sm">{card.text}</Text>
            <div><Button size="sm" variant="secondary">Action</Button></div>
          </div>)}
        </div>
      </LabOnly>
    </DemoFrame>
    <CssNotes name="subgrid" note={cssNotes.subgrid} level={3} />
  </section>
}

export function HasDemo() {
  const [count, setCount] = useState(3)
  const [image, setImage] = useState(true)
  return <section aria-labelledby={sections.has.id} className="lab-layout-section">
    <LabSectionIntro section={sections.has} />
    <DemoHeading>A list that counts its items</DemoHeading>
    <DemoText>Up to four items stack in a list. Add a fifth and the same list becomes a grid, because its CSS asks “do I have a fifth child?”. It has {count} items now.</DemoText>
    <div className="lab-controls">
      <Button size="sm" variant="secondary" onPress={() => setCount((value) => value + 1)}>Add an item</Button>
      <Button size="sm" variant="secondary" isDisabled={count <= 1} onPress={() => setCount((value) => Math.max(1, value - 1))}>Remove an item</Button>
    </div>
    <LabOnly name="QuantityList">
      <ul className="lab-has-list">
        {Array.from({ length: count }, (_, index) => <li key={index}><div className="lab-block mz-text-body-sm">Item {index + 1}</div></li>)}
      </ul>
    </LabOnly>
    <CssNotes name="the list" note={cssNotes.quantityList} />
    <DemoHeading>A layout that notices an image</DemoHeading>
    <DemoText>With an image, this becomes two columns. Without one, the text simply takes the full width. There’s no separate “with image” variant.</DemoText>
    <Checkbox isSelected={image} onChange={setImage}>Include an image</Checkbox>
    <LabOnly name="MediaObject">
      <div className="lab-media">
        {image && <div className="lab-block lab-media-image mz-text-body-sm">Image</div>}
        <Text elementType="p" className="mz-text-body-md">Text beside the image when there is one, and across the full width when there isn&apos;t.</Text>
      </div>
    </LabOnly>
    <CssNotes name="the image layout" note={cssNotes.mediaObject} />
  </section>
}

export function ViewportDemo() {
  const probes = useRef<HTMLDivElement>(null)
  const safe = useRef<HTMLDivElement>(null)
  const [heights, setHeights] = useState<{ label: string; pixels: number }[]>([])
  const [insets, setInsets] = useState<{ label: string; pixels: string }[]>([])
  const standalone = useMediaQuery('(display-mode: standalone)')
  return <section aria-labelledby={sections.viewport.id} className="lab-layout-section">
    <LabSectionIntro section={sections.viewport} />
    <DemoText>Press the button to measure your screen. On a laptop the four heights match and the safe areas are zero. On a phone, scroll until the toolbar hides and measure again: svh and lvh differ, and dvh changes. Installed as an app here: {standalone ? 'yes' : 'no'}.</DemoText>
    <div ref={probes} className="lab-probes" aria-hidden="true">
      <div data-probe="100vh" className="lab-probe-vh" />
      <div data-probe="100svh (toolbars shown)" className="lab-probe-svh" />
      <div data-probe="100lvh (toolbars hidden)" className="lab-probe-lvh" />
      <div data-probe="100dvh (right now)" className="lab-probe-dvh" />
    </div>
    <div ref={safe} className="lab-safe-probe" aria-hidden="true" />
    <div><Button size="sm" variant="secondary" onPress={() => { setHeights(measureProbes(probes.current)); setInsets(measureSafeAreas(safe.current)) }}>Measure this screen</Button></div>
    {heights.length > 0 && <div className="lab-table">
      <Table aria-label="Viewport heights and safe areas">
        <TableHeader><Column isRowHeader>Measurement</Column><Column>Value</Column></TableHeader>
        <TableBody>
          {heights.map((item) => <Row id={item.label} key={item.label}><Cell><code>{item.label}</code></Cell><Cell>{item.pixels}px</Cell></Row>)}
          {insets.map((item) => <Row id={item.label} key={item.label}><Cell>Safe area: {item.label}</Cell><Cell>{item.pixels}</Cell></Row>)}
        </TableBody>
      </Table>
    </div>}
    <DemoText>To clear a notch without losing its normal space, content can take whichever is larger: its usual padding, or the safe area. In CSS that’s <code>max(your spacing, env(safe-area-inset-left))</code>.</DemoText>
    <CssNotes name="the measurements" note={cssNotes.viewport} level={3} />
  </section>
}

export function ScrollPaddingDemo() {
  const [padded, setPadded] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  const jump = (index: number) => box.current?.querySelector<HTMLElement>(`[data-section="${index}"]`)?.scrollIntoView({ block: 'start', inline: 'nearest' })
  return <section aria-labelledby={sections.scrollPadding.id} className="lab-layout-section">
    <LabSectionIntro section={sections.scrollPadding} />
    <DemoText>Jump to a section with scroll padding off, and the heading lands hidden under the sticky header. Turn it on and jump again: the heading lands just below. Mezzanine’s docs site hard-codes a 4rem offset today, which can be wrong when text is enlarged.</DemoText>
    <Checkbox isSelected={padded} onChange={setPadded}>Use scroll padding</Checkbox>
    <div className="lab-controls">
      {[2, 3, 4].map((index) => <Button key={index} size="sm" variant="secondary" onPress={() => jump(index)}>Jump to section {index}</Button>)}
    </div>
    <LabOnly name="ScrollBox with sticky header">
      <div ref={box} className={`lab-scroll-box${padded ? ' lab-scroll-padded' : ''}`} role="region" aria-label="Scrolling content with a sticky header" tabIndex={0}>
        <div className="lab-sticky-header mz-text-label-md">Sticky header</div>
        {[1, 2, 3, 4].map((index) => <div key={index} data-section={index} className="lab-scroll-section">
          <Heading level={3}>Section {index}</Heading>
          <Text elementType="p" className="mz-text-body-sm">Content for section {index}. Jumping here should show this heading, not hide it under the header.</Text>
        </div>)}
      </div>
    </LabOnly>
    <CssNotes name="scroll padding" note={cssNotes.scrollPadding} level={3} />
  </section>
}

export function LayersDemo() {
  return <section aria-labelledby={sections.layers.id} className="lab-layout-section">
    <LabSectionIntro section={sections.layers} />
    <DemoText>Both chips have the same simple “app” rule. On the left, the library’s rule uses a stronger selector and wins, so the app would need an even stronger one, or !important. On the right, the same library rule sits in a cascade layer, so the app’s simple rule wins.</DemoText>
    <div className="lab-two-slots">
      <LabOnly name="Library CSS not in a layer">
        <div className="lab-cascade lab-cascade-unlayered"><span className="lab-chip lab-consumer-override mz-text-label-md" /></div>
      </LabOnly>
      <LabOnly name="Library CSS in a layer">
        <div className="lab-cascade lab-cascade-layered"><span className="lab-chip lab-consumer-override mz-text-label-md" /></div>
      </LabOnly>
    </div>
    <CssNotes name="cascade layers" note={cssNotes.cascadeLayers} level={3} />
  </section>
}
