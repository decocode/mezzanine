import { useRef, useState } from 'react'
import { Badge, Button, Card, Cell, Checkbox, Column, Heading, Row, Table, TableBody, TableHeader, Text } from '@decocode/mezzanine'
import { BrowserSupport, CssNotes, DemoFrame, DemoHeading, DemoText, LabSectionIntro } from './LabParts'
import { environmentQueries, layoutLabSections as sections, cssNotes } from './layoutLabContent'
import { measureProbes, measureSafeAreas, useMediaQuery } from './layoutLabLogic'

// The same tile adapts to whichever slot it is placed in.
function ContainerTile() {
  return <div className="lab-cq-slot">
      <Card>
        <div className="lab-cq-tile">
          <div className="lab-block lab-cq-image mz-text-body-sm">Image</div>
          <div className="lab-cq-text">
            <Heading level={4}>Tile title</Heading>
            <Text elementType="p" className="mz-text-body-md">The tile stacks in narrow space and sits side by side when its slot is at least 26rem.</Text>
          </div>
        </div>
      </Card>
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
    <BrowserSupport section={sections.container} />
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
    <LabSectionIntro section={sections.environment} isSingleExample />
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
    <CssNotes name="environment queries" note={cssNotes.environment} level={2} />
    <DemoText>Notice that only the last row is about width, and it’s about the whole window, which is the page frame’s concern. Reduced motion is missing on purpose: in Mezzanine, only the shared motion policy reads that preference.</DemoText>
    <BrowserSupport section={sections.environment} />
  </section>
}

export function NamedLayersDemo() {
  return <section aria-labelledby={sections.namedLayers.id} className="lab-layout-section">
    <LabSectionIntro section={sections.namedLayers} isSingleExample />
    <DemoText>Each box takes its place in the stack from a named token, so the order is decided once, not in each component.</DemoText>
      <div className="lab-layer-stack">
        {['base', 'raised', 'sticky', 'overlay', 'modal', 'toast'].map((name) => <div key={name} className={`lab-layer lab-layer-${name} mz-text-body-sm`}><code>--lab-layer-{name}</code></div>)}
      </div>
    <CssNotes name="named layers" note={cssNotes.layers} level={2} />
    <BrowserSupport section={sections.namedLayers} />
  </section>
}

export function ViewportDemo() {
  const probes = useRef<HTMLDivElement>(null)
  const safe = useRef<HTMLDivElement>(null)
  const [heights, setHeights] = useState<{ label: string; pixels: number }[]>([])
  const [insets, setInsets] = useState<{ label: string; pixels: string }[]>([])
  const standalone = useMediaQuery('(display-mode: standalone)')
  return <section aria-labelledby={sections.viewport.id} className="lab-layout-section">
    <LabSectionIntro section={sections.viewport} isSingleExample />
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
    <CssNotes name="the measurements" note={cssNotes.viewport} level={2} />
    <BrowserSupport section={sections.viewport} />
  </section>
}

export function ScrollPaddingDemo() {
  const [padded, setPadded] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  const jump = (index: number) => box.current?.querySelector<HTMLElement>(`[data-section="${index}"]`)?.scrollIntoView({ block: 'start', inline: 'nearest' })
  return <section aria-labelledby={sections.scrollPadding.id} className="lab-layout-section">
    <LabSectionIntro section={sections.scrollPadding} isSingleExample />
    <DemoText>Jump to a section with scroll padding off, and the heading lands hidden under the sticky header. Turn it on and jump again: the heading lands just below. Mezzanine’s docs site hard-codes a 4rem offset today, which can be wrong when text is enlarged.</DemoText>
    <Checkbox isSelected={padded} onChange={setPadded}>Use scroll padding</Checkbox>
    <div className="lab-controls">
      {[2, 3, 4].map((index) => <Button key={index} size="sm" variant="secondary" onPress={() => jump(index)}>Jump to section {index}</Button>)}
    </div>
      <div ref={box} className={`lab-scroll-box${padded ? ' lab-scroll-padded' : ''}`} role="region" aria-label="Scrolling content with a sticky header" tabIndex={0}>
        <div className="lab-sticky-header mz-text-label-md">Sticky header</div>
        {[1, 2, 3, 4].map((index) => <div key={index} data-section={index} className="lab-scroll-section">
          <Heading level={3}>Section {index}</Heading>
          <Text elementType="p" className="mz-text-body-sm">Content for section {index}. Jumping here should show this heading, not hide it under the header.</Text>
        </div>)}
      </div>
    <CssNotes name="scroll padding" note={cssNotes.scrollPadding} level={2} />
    <BrowserSupport section={sections.scrollPadding} />
  </section>
}

export function LayersDemo() {
  return <section aria-labelledby={sections.layers.id} className="lab-layout-section">
    <LabSectionIntro section={sections.layers} isSingleExample />
    <DemoText>Both chips have the same simple “app” rule. On the left, the library’s rule uses a stronger selector and wins, so the app would need an even stronger one, or !important. On the right, the same library rule sits in a cascade layer, so the app’s simple rule wins.</DemoText>
    <div className="lab-two-slots">
      <div className="lab-labelled"><Text elementType="p" className="mz-text-label-md">Library CSS not in a layer</Text>
        <div className="lab-cascade lab-cascade-unlayered"><span className="lab-chip lab-consumer-override mz-text-label-md" /></div>
      </div>
      <div className="lab-labelled"><Text elementType="p" className="mz-text-label-md">Library CSS in a layer</Text>
        <div className="lab-cascade lab-cascade-layered"><span className="lab-chip lab-consumer-override mz-text-label-md" /></div>
      </div>
    </div>
    <CssNotes name="cascade layers" note={cssNotes.cascadeLayers} level={2} />
    <BrowserSupport section={sections.layers} />
  </section>
}
