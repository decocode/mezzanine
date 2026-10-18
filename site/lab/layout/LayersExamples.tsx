// Examples for the Layers experiment, outside Layout.
import { useRef, useState, type CSSProperties } from 'react'
import { Button, Checkbox, Heading, Text } from '@decocode/mezzanine'
import { CssNotes, ExampleHeading, ExampleText, ValuePicker } from './LabParts'
import { Block } from './LabPrimitives'
import { cssNotes } from './layoutLabContent'

const positionOptions = [
  { label: 'static', value: 'static' },
  { label: 'relative', value: 'relative' },
  { label: 'absolute', value: 'absolute' },
  { label: 'sticky', value: 'sticky' },
] as const

export function PositioningExample() {
  const [position, setPosition] = useState<(typeof positionOptions)[number]['value']>('static')
  return <>
    <ExampleText>The second box behaves differently with each position setting, most clearly when the dashed box scrolls.</ExampleText>
    <ValuePicker label="position" options={positionOptions} value={position} onChange={setPosition} />
    <div className="lab-position-stage" role="region" aria-label="Scrolling boxes, one of them positioned" tabIndex={0}>
      {[1, 2, 3, 4, 5, 6].map((number) => number === 2
        ? <div key={number} className="lab-block lab-position-item mz-text-body-sm" style={{ '--lab-position': position } as CSSProperties}>Box 2 is {position}</div>
        : <Block key={number}>Box {number}</Block>)}
    </div>
    <CssNotes name="the second box" note={cssNotes.positioning} level={3} />
  </>
}

export function NamedLayersExample() {
  return <>
    <ExampleText>Each box takes its place in the stack from a named token, so the order is decided once, not in each component.</ExampleText>
      <div className="lab-layer-stack">
        {['base', 'raised', 'sticky', 'overlay', 'toast'].map((name) => <div key={name} className={`lab-layer lab-layer-${name} mz-text-body-sm`}><code>--z-index-{name}</code></div>)}
      </div>
    <CssNotes name="layer order" note={cssNotes.layers} level={3} />
  </>
}

// A layer inside a bundle, showing its own z-index.
function BundleLayer({ z, step }: { z: number; step: number }) {
  return <div className="lab-bundle-layer mz-text-body-sm" style={{ '--lab-layer-z': z, '--lab-layer-step': step } as CSSProperties}>Layer, z-index: {z}</div>
}

export function StackingContextsExample() {
  const [grouped, setGrouped] = useState(true)
  return <>
    <ExampleHeading>Example</ExampleHeading>
    <ExampleText>Bundle A consists of three layers. Bundle B is two layers. Because the z-index of Bundle B is higher, it’s placed on top of Bundle A. Inside each bundle the layers are ordered amongst themselves. But if you remove the bundles, all five layers end up jumbled together, because some share the same z-index values.</ExampleText>
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

export function ScrollPaddingExample() {
  const [padded, setPadded] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  const jump = (index: number) => box.current?.querySelector<HTMLElement>(`[data-section="${index}"]`)?.scrollIntoView({ block: 'start', inline: 'nearest' })
  return <>
    <ExampleText>Without scroll padding, a heading you jump to lands hidden under the sticky header. With it, the heading lands just below. Mezzanine’s docs site hard-codes a 4rem offset today, which can be wrong when text is enlarged.</ExampleText>
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
