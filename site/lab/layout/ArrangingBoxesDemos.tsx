import { useState, type CSSProperties } from 'react'
import { Button, Checkbox, Heading, Link, Text } from '@decocode/mezzanine'
import { CssNotes, DemoFrame, DemoHeading, DemoText, LabOnly, ValuePicker } from './LabParts'
import { SpacingScale } from '../../components/SpacingScale'
import { Block } from './LabPrimitives'
import { cssNotes } from './layoutLabContent'
import type { StageDemos } from './StagePages'

const displayOptions = [
  { label: 'block', value: 'block' },
  { label: 'inline', value: 'inline' },
  { label: 'inline-block', value: 'inline-block' },
] as const

function NormalFlowDemo() {
  const [display, setDisplay] = useState<(typeof displayOptions)[number]['value']>('inline')
  return <>
    <DemoText>Three boxes inside a sentence. Choose how they join the flow.</DemoText>
    <ValuePicker label="display" options={displayOptions} value={display} onChange={setDisplay} />
    <LabOnly name="Boxes in a sentence">
      <Text elementType="p" className="mz-text-body-md" style={{ '--lab-flow-display': display } as CSSProperties}>
        Here is a sentence with <span className="lab-flow-item">Box 1</span> inside it, then <span className="lab-flow-item">Box 2</span>, and finally <span className="lab-flow-item">Box 3</span> near the end of the line.
      </Text>
    </LabOnly>
    <CssNotes name="normal flow" note={cssNotes.normalFlow} level={3} />
  </>
}

const directionOptions = [
  { label: 'row', value: 'row' },
  { label: 'column', value: 'column' },
] as const

const wrapOptions = [
  { label: 'nowrap', value: 'nowrap' },
  { label: 'wrap', value: 'wrap' },
] as const

const growOptions = [
  { label: '0', value: '0' },
  { label: '1', value: '1' },
] as const

function FlexboxDemo() {
  const [direction, setDirection] = useState<(typeof directionOptions)[number]['value']>('row')
  const [wrap, setWrap] = useState<(typeof wrapOptions)[number]['value']>('nowrap')
  const [grow, setGrow] = useState<(typeof growOptions)[number]['value']>('0')
  return <>
    <DemoText>Five boxes in a Flexbox. Try a narrow frame with nowrap: the boxes can’t fit, so they stick out. Then switch to wrap.</DemoText>
    <div className="lab-controls">
      <ValuePicker label="flex-direction" options={directionOptions} value={direction} onChange={setDirection} />
      <ValuePicker label="flex-wrap" options={wrapOptions} value={wrap} onChange={setWrap} />
      <ValuePicker label="flex-grow" options={growOptions} value={grow} onChange={setGrow} />
    </div>
    <DemoFrame label="Flexbox" canOverflow>
      <LabOnly name="Flexbox">
        <div className="lab-flex-demo" style={{ '--lab-flex-direction': direction, '--lab-flex-wrap': wrap, '--lab-flex-grow': grow } as CSSProperties}>
          {[1, 2, 3, 4, 5].map((number) => <Block key={number}>Box {number}</Block>)}
        </div>
      </LabOnly>
    </DemoFrame>
    <CssNotes name="Flexbox" note={cssNotes.flexbox} level={3} />
  </>
}

const columnOptions = [
  { label: '1fr 1fr 1fr', value: '1fr 1fr 1fr' },
  { label: '1fr 2fr', value: '1fr 2fr' },
  { label: '8rem 1fr', value: '8rem 1fr' },
] as const

function GridDemo() {
  const [columns, setColumns] = useState<(typeof columnOptions)[number]['value']>('1fr 1fr 1fr')
  return <>
    <DemoText>Six boxes in a grid. Choose the columns, and watch the first box keep spanning two of them.</DemoText>
    <ValuePicker label="grid-template-columns" options={columnOptions} value={columns} onChange={setColumns} />
    <DemoFrame label="Grid">
      <LabOnly name="Grid">
        <div className="lab-grid-demo" style={{ '--lab-grid-columns': columns } as CSSProperties}>
          <div className="lab-block lab-grid-wide mz-text-body-sm">Box 1 spans two columns</div>
          {[2, 3, 4, 5, 6].map((number) => <Block key={number}>Box {number}</Block>)}
        </div>
      </LabOnly>
    </DemoFrame>
    <CssNotes name="Grid" note={cssNotes.grid} level={3} />
  </>
}

function SubgridDemo() {
  const [aligned, setAligned] = useState(true)
  const cards = [
    { title: 'Short', text: 'One line.' },
    { title: 'A much longer title that wraps onto two lines', text: 'Some text that is longer than the others, so it takes up more lines than the cards beside it.' },
    { title: 'Medium title', text: 'A little more text.' },
  ]
  return <>
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
  </>
}

const justifyOptions = [
  { label: 'start', value: 'start' },
  { label: 'center', value: 'center' },
  { label: 'end', value: 'end' },
  { label: 'space-between', value: 'space-between' },
] as const

const alignOptions = [
  { label: 'stretch', value: 'stretch' },
  { label: 'start', value: 'start' },
  { label: 'center', value: 'center' },
  { label: 'end', value: 'end' },
] as const

function AlignmentDemo() {
  const [justify, setJustify] = useState<(typeof justifyOptions)[number]['value']>('start')
  const [align, setAlign] = useState<(typeof alignOptions)[number]['value']>('stretch')
  return <>
    <DemoHeading>Along the row and across it</DemoHeading>
    <DemoText>Three boxes in a Flexbox row that’s taller than they need. Move them along the row, then across it.</DemoText>
    <div className="lab-controls">
      <ValuePicker label="justify-content" options={justifyOptions} value={justify} onChange={setJustify} />
      <ValuePicker label="align-items" options={alignOptions} value={align} onChange={setAlign} />
    </div>
    <DemoFrame label="Alignment">
      <LabOnly name="Alignment">
        <div className="lab-align-demo" style={{ '--lab-justify': justify, '--lab-align': align } as CSSProperties}>
          <Block>Box 1</Block>
          <Block>Box 2 has more to say</Block>
          <Block>Box 3</Block>
        </div>
      </LabOnly>
    </DemoFrame>
    <CssNotes name="alignment" note={cssNotes.alignment} />
    <DemoHeading>Centre anything</DemoHeading>
    <DemoText>The famous puzzle, solved in two lines.</DemoText>
    <LabOnly name="Centred">
      <div className="lab-centre-anything"><Block>Right in the middle</Block></div>
    </LabOnly>
    <CssNotes name="centring" note={cssNotes.centreAnything} />
  </>
}

const gapOptions = [
  { label: '--space-2', value: '--space-2' },
  { label: '--space-4', value: '--space-4' },
  { label: '--space-8', value: '--space-8' },
] as const

function SpacingDemo() {
  return <>
    <DemoHeading>Margin or gap</DemoHeading>
    <DemoText>The same three boxes twice. With margin, each box keeps its distance on every side, so there’s space against the dashed edge too. With gap, the space only goes between them.</DemoText>
    <div className="lab-two-slots">
      <LabOnly name="Margin on each box">
        <div className="lab-spacing-demo lab-spacing-margin">{[1, 2, 3].map((number) => <Block key={number}>Box {number}</Block>)}</div>
      </LabOnly>
      <LabOnly name="Gap on the parent">
        <div className="lab-spacing-demo lab-spacing-gap">{[1, 2, 3].map((number) => <Block key={number}>Box {number}</Block>)}</div>
      </LabOnly>
    </div>
    <CssNotes name="margin and gap" note={cssNotes.marginAndGap} />
  </>
}

// The spacing scale is how Mezzanine uses spacing, so it sits in that half of the page.
function SpacingTokens() {
  const [gap, setGap] = useState<(typeof gapOptions)[number]['value']>('--space-4')
  return <>
    <DemoHeading>Spacing tokens</DemoHeading>
    <DemoText>Mezzanine’s spaces come from a scale of tokens built on a 4px step. The number in each name counts the steps, so <code>--space-4</code> is four steps: <code>1rem</code>, normally 16px. The tokens are in <code>rem</code>, so space grows when someone enlarges their text. <Link href="/site/lab/layout/one-box/sizing-and-units">Sizing and units</Link> explains <code>rem</code>.</DemoText>
    <DemoText>These are the real tokens, with their values read live, as on the <Link href="/spacing">Spacing</Link> page in the docs.</DemoText>
    <SpacingScale />
    <DemoHeading>Sizes from the spacing scale</DemoHeading>
    <DemoText>Choose a spacing token for the gap.</DemoText>
    <ValuePicker label="gap" options={gapOptions} value={gap} onChange={setGap} />
    <LabOnly name="Spacing scale">
      <div className="lab-spacing-scale" style={{ '--lab-gap': `var(${gap})` } as CSSProperties}>
        {[1, 2, 3, 4, 5, 6].map((number) => <Block key={number}>Box {number}</Block>)}
      </div>
    </LabOnly>
    <CssNotes name="the spacing scale" note={cssNotes.spacingScale} />
  </>
}

function ReadingOrderDemo() {
  const [reversed, setReversed] = useState(false)
  return <>
    <DemoText>Press Tab to move through the buttons. Then reverse them on screen and try again: focus jumps backwards across the row, because it still follows the HTML.</DemoText>
    <Checkbox isSelected={reversed} onChange={setReversed}>Reverse on screen</Checkbox>
    <LabOnly name="Three buttons">
      <div className={`lab-order-row${reversed ? ' lab-order-reversed' : ''}`}>
        {[1, 2, 3].map((number) => <Button key={number} size="sm" variant="secondary">Button {number}</Button>)}
      </div>
    </LabOnly>
    <CssNotes name="the reversed row" note={cssNotes.readingOrder} level={3} />
  </>
}

export const arrangingBoxesDemos: StageDemos = {
  normalFlow: { Demo: NormalFlowDemo },
  cssFlexbox: { Demo: FlexboxDemo },
  cssGrid: { Demo: GridDemo },
  subgrid: { Demo: SubgridDemo },
  alignment: { Demo: AlignmentDemo },
  spacing: { Demo: SpacingDemo, MezzanineDetail: SpacingTokens },
  readingOrder: { Demo: ReadingOrderDemo },
}
