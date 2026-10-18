import { useRef, useState, type CSSProperties } from 'react'
import { Badge, Button, Card, Cell, Checkbox, CodeBlock, Column, Heading, Link, Row, Table, TableBody, TableHeader, Text } from '@decocode/mezzanine'
import { CssNotes, DemoFrame, DemoHeading, DemoText, ValuePicker } from './LabParts'
import { Block, RowWrapAndGrow } from './LabPrimitives'
import { cssNotes } from './layoutLabContent'
import { supportsCondition, supportsCss, useProbeHeights } from './layoutLabLogic'

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
  return <>
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
    <DemoText>Above about 26rem, the tile changes layout, while the window stays the same size.</DemoText>
    <DemoFrame label="In a frame you can resize" initialWidth={360}>
      <ContainerTile />
    </DemoFrame>
    <CssNotes name="the tile" note={cssNotes.containerTile} />
  </>
}

export function NamedLayersDemo() {
  return <>
    <DemoText>Each box takes its place in the stack from a named token, so the order is decided once, not in each component.</DemoText>
      <div className="lab-layer-stack">
        {['base', 'raised', 'sticky', 'overlay', 'toast'].map((name) => <div key={name} className={`lab-layer lab-layer-${name} mz-text-body-sm`}><code>--z-index-{name}</code></div>)}
      </div>
    <CssNotes name="layer order" note={cssNotes.layers} level={3} />
  </>
}

export function ViewportDemo() {
  const probes = useRef<HTMLDivElement>(null)
  const heights = useProbeHeights(probes)
  return <>
    <DemoText>Every page needs this tag in its HTML. Without it, phones pretend to be a wide screen and shrink the whole page to fit, so viewport units would measure that pretend screen instead of the real one.</DemoText>
    <CodeBlock>{'<meta name="viewport" content="width=device-width, initial-scale=1">'}</CodeBlock>
    <DemoText>On a laptop the four heights match. On a phone they differ once the browser’s toolbar hides: svh and lvh stay apart, and dvh changes.</DemoText>
    <div ref={probes} className="lab-probes" aria-hidden="true">
      <div data-probe="100vh" className="lab-probe-vh" />
      <div data-probe="100svh (toolbars shown)" className="lab-probe-svh" />
      <div data-probe="100lvh (toolbars hidden)" className="lab-probe-lvh" />
      <div data-probe="100dvh (right now)" className="lab-probe-dvh" />
    </div>
    {heights.length > 0 && <div className="lab-table">
      <Table aria-label="Viewport heights">
        <TableHeader><Column isRowHeader>Measurement</Column><Column>Value</Column></TableHeader>
        <TableBody>
          {heights.map((item) => <Row id={item.label} key={item.label}><Cell><code>{item.label}</code></Cell><Cell>{item.pixels}px</Cell></Row>)}
        </TableBody>
      </Table>
    </div>}
    <CssNotes name="the measurements" note={cssNotes.viewport} level={3} />
  </>
}

export function ScrollPaddingDemo() {
  const [padded, setPadded] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  const jump = (index: number) => box.current?.querySelector<HTMLElement>(`[data-section="${index}"]`)?.scrollIntoView({ block: 'start', inline: 'nearest' })
  return <>
    <DemoText>Without scroll padding, a heading you jump to lands hidden under the sticky header. With it, the heading lands just below. Mezzanine’s docs site hard-codes a 4rem offset today, which can be wrong when text is enlarged.</DemoText>
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
    <CssNotes name="scroll padding" note={cssNotes.scrollPadding} level={3} />
  </>
}

export function LayersDemo() {
  return <>
    <DemoText>Both chips have the same simple “app” rule. On the left, the library’s rule uses a stronger selector and wins, so the app would need an even stronger one, or !important. On the right, the same library rule sits in a cascade layer, so the app’s simple rule wins.</DemoText>
    <div className="lab-two-slots">
      <div className="lab-labelled"><Text elementType="p" className="mz-text-label-md">Library CSS not in a layer</Text>
        <div className="lab-cascade lab-cascade-unlayered"><span className="lab-chip lab-consumer-override mz-text-label-md" /></div>
      </div>
      <div className="lab-labelled"><Text elementType="p" className="mz-text-label-md">Library CSS in a layer</Text>
        <div className="lab-cascade lab-cascade-layered"><span className="lab-chip lab-consumer-override mz-text-label-md" /></div>
      </div>
    </div>
    <CssNotes name="cascade layers" note={cssNotes.cascadeLayers} level={3} />
  </>
}

const positionOptions = [
  { label: 'static', value: 'static' },
  { label: 'relative', value: 'relative' },
  { label: 'absolute', value: 'absolute' },
  { label: 'sticky', value: 'sticky' },
] as const

export function PositioningDemo() {
  const [position, setPosition] = useState<(typeof positionOptions)[number]['value']>('static')
  return <>
    <DemoText>The second box behaves differently with each position setting, most clearly when the dashed box scrolls.</DemoText>
    <ValuePicker label="position" options={positionOptions} value={position} onChange={setPosition} />
    <div className="lab-position-stage" role="region" aria-label="Scrolling boxes, one of them positioned" tabIndex={0}>
      {[1, 2, 3, 4, 5, 6].map((number) => number === 2
        ? <div key={number} className="lab-block lab-position-item mz-text-body-sm" style={{ '--lab-position': position } as CSSProperties}>Box 2 is {position}</div>
        : <Block key={number}>Box {number}</Block>)}
    </div>
    <CssNotes name="the second box" note={cssNotes.positioning} level={3} />
  </>
}

export function RowWrapAndGrowDemo() {
  return <>
    <DemoFrame label="Row wrap and grow" initialWidth={1100}>
      <RowWrapAndGrow>{['A', 'B', 'C', 'D'].map((letter) => <Block key={letter} tall>Box {letter}</Block>)}</RowWrapAndGrow>
    </DemoFrame>
    <CssNotes name="Row wrap and grow" note={cssNotes.columnDrop} level={3} />
  </>
}

export function FluidSizingDemo() {
  return <>
    <DemoHeading>Fluid space</DemoHeading>
    <DemoText>The space inside the box, and between the items in it, grows with the frame, between two limits.</DemoText>
    <DemoFrame label="Fluid space">
      <div className="lab-fluid-space"><Block>Item one</Block><Block>Item two</Block><Block>Item three</Block></div>
    </DemoFrame>
    <CssNotes name="the fluid space" note={cssNotes.fluidSpace} level={4} />
    <DemoHeading>Fluid width</DemoHeading>
    <DemoText>The box is 60% of the frame’s width, but never narrower than 12rem or wider than 28rem.</DemoText>
    <DemoFrame label="Fluid width">
      <div className="lab-fluid-width"><Block>A box between 12rem and 28rem wide</Block></div>
    </DemoFrame>
    <CssNotes name="the fluid width" note={cssNotes.fluidWidth} level={4} />
    <DemoHeading>Safe minimums</DemoHeading>
    <DemoText>The box asks for 25rem. In a frame narrower than that, it takes the full width instead of spilling out.</DemoText>
    <DemoFrame label="Safe minimum">
      <div className="lab-safe-minimum"><Block>A box that asks for 25rem</Block></div>
    </DemoFrame>
    <CssNotes name="the safe minimum" note={cssNotes.safeMinimum} level={4} />
  </>
}

const supportChecks = [
  { label: 'Subgrid', check: () => supportsCss('grid-template-rows', 'subgrid') },
  { label: ':has()', check: () => supportsCondition('selector(:has(a))') },
  { label: 'Masonry with grid-lanes', check: () => supportsCss('display', 'grid-lanes') },
  { label: 'Anchor positioning', check: () => supportsCss('anchor-name', '--lab-anchor') },
  { label: 'Field sizing', check: () => supportsCss('field-sizing', 'content') },
]

export function SupportsDemo() {
  return <>
    <DemoText>The same question, asked live in your browser. The last three are in <Link href="/site/lab/emerging-features">Emerging features</Link>.</DemoText>
    <div className="lab-table">
      <Table aria-label="Features this browser supports">
        <TableHeader>
          <Column isRowHeader>Feature</Column>
          <Column>Supported here?</Column>
        </TableHeader>
        <TableBody>{supportChecks.map(({ label, check }) => <Row id={label} key={label}>
          <Cell>{label}</Cell>
          <Cell>{check() ? <Badge variant="success">Yes</Badge> : <Badge>No</Badge>}</Cell>
        </Row>)}</TableBody>
      </Table>
    </div>
    <CssNotes name="the masonry rule" note={cssNotes.supports} level={3} />
  </>
}

// A layer inside a bundle, showing its own z-index.
function BundleLayer({ z, step }: { z: number; step: number }) {
  return <div className="lab-bundle-layer mz-text-body-sm" style={{ '--lab-layer-z': z, '--lab-layer-step': step } as CSSProperties}>Layer, z-index: {z}</div>
}

export function StackingContextsDemo() {
  const [grouped, setGrouped] = useState(true)
  return <>
    <DemoHeading>Example</DemoHeading>
    <DemoText>Bundle A consists of three layers. Bundle B is two layers. Because the z-index of Bundle B is higher, it’s placed on top of Bundle A. Inside each bundle the layers are ordered amongst themselves. But if you remove the bundles, all five layers end up jumbled together, because some share the same z-index values.</DemoText>
    <Checkbox isSelected={grouped} onChange={setGrouped}>Bundle the layers</Checkbox>
    <div className="lab-bundles">
      <div className={`lab-bundle ${grouped ? 'lab-bundle-a-grouped' : 'lab-bundle-loose'}`}>
        {grouped ? <p className="mz-text-label-md">Bundle A, z-index: 1</p> : <p className="mz-text-label-md" aria-hidden="true">&nbsp;</p>}
        <BundleLayer z={1} step={0} />
        <BundleLayer z={2} step={1} />
        <BundleLayer z={3} step={2} />
      </div>
      <div className={`lab-bundle lab-bundle-b ${grouped ? 'lab-bundle-b-grouped' : 'lab-bundle-loose'}`}>
        {grouped ? <p className="mz-text-label-md">Bundle B, z-index: 2</p> : <p className="mz-text-label-md" aria-hidden="true">&nbsp;</p>}
        <BundleLayer z={1} step={0} />
        <BundleLayer z={2} step={1} />
      </div>
    </div>
    <CssNotes name="the bundles" note={cssNotes.stackingContexts} level={3} />
  </>
}
