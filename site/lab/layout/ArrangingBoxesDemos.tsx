import { useState, type CSSProperties } from 'react'
import { Button, Checkbox, Heading, Link, Text } from '@decocode/mezzanine'
import { CssNotes, DemoFrame, DemoHeading, DemoText, ValuePicker } from './LabParts'
import { SpacingScale } from '../../components/SpacingScale'
import { Block } from './LabPrimitives'
import { cssNotes } from './layoutLabContent'
import type { StageDemos } from './StagePages'
import { AutoGridDemo, ColumnsDemo } from './BoxFormationDemos'

const columnOptions = [
  { label: '1fr 1fr 1fr', value: '1fr 1fr 1fr' },
  { label: '1fr 2fr', value: '1fr 2fr' },
  { label: '8rem 1fr', value: '8rem 1fr' },
] as const

function GridDemo() {
  const [columns, setColumns] = useState<(typeof columnOptions)[number]['value']>('1fr 1fr 1fr')
  return <>
    <DemoText>Six boxes in a grid. Whatever the columns, the first box keeps spanning two of them.</DemoText>
    <ValuePicker label="grid-template-columns" options={columnOptions} value={columns} onChange={setColumns} />
    <DemoFrame label="Grid">
        <div className="lab-grid-demo" style={{ '--lab-grid-columns': columns } as CSSProperties}>
          <div className="lab-block lab-grid-wide mz-text-body-sm">Box 1 spans two columns</div>
          {[2, 3, 4, 5, 6].map((number) => <Block key={number}>Box {number}</Block>)}
        </div>
    </DemoFrame>
    <CssNotes name="Grid" note={cssNotes.grid} level={3} />
  </>
}

function SubgridDemo() {
  const [aligned, setAligned] = useState(true)
  const boxes = [
    { title: 'Short', text: 'One line.' },
    { title: 'A much longer title that wraps onto two lines', text: 'Some text that is longer than the others, so it takes up more lines than the boxes beside it.' },
    { title: 'Medium title', text: 'A little more text.' },
  ]
  return <>
    <DemoText>With subgrid on, the text in each box starts at the same height and the buttons line up along the bottom, however long each heading is. Without it, they drift apart. These boxes are Lab-only, because Mezzanine’s Card component doesn’t use subgrid.</DemoText>
    <Checkbox isSelected={aligned} onChange={setAligned}>Use subgrid</Checkbox>
    <DemoFrame label="Subgrid boxes" initialWidth={900}>
        <div className={`lab-subgrid-list${aligned ? ' lab-subgrid-on' : ''}`}>
          {boxes.map((box) => <div key={box.title} className="lab-subgrid-box">
            <Heading level={3}>{box.title}</Heading>
            <Text elementType="p" className="mz-text-body-sm">{box.text}</Text>
            <div><Button size="sm" variant="secondary">Action</Button></div>
          </div>)}
        </div>
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
  { label: 'start', value: 'start' },
  { label: 'center', value: 'center' },
  { label: 'end', value: 'end' },
  { label: 'stretch', value: 'stretch' },
] as const

function AlignmentDemo() {
  const [justify, setJustify] = useState<(typeof justifyOptions)[number]['value']>('start')
  const [align, setAlign] = useState<(typeof alignOptions)[number]['value']>('stretch')
  return <>
    <DemoHeading>Along the row and across it</DemoHeading>
    <DemoText>Three boxes in a Flexbox row that’s taller than they need, so they can move along the row and across it.</DemoText>
    <div className="lab-controls">
      <ValuePicker label="justify-content" options={justifyOptions} value={justify} onChange={setJustify} />
      <ValuePicker label="align-items" options={alignOptions} value={align} onChange={setAlign} />
    </div>
    <DemoFrame label="Alignment">
        <div className="lab-align-demo" style={{ '--lab-justify': justify, '--lab-align': align } as CSSProperties}>
          <Block>Box 1</Block>
          <Block>Box 2 has more to say</Block>
          <Block>Box 3</Block>
        </div>
    </DemoFrame>
    <CssNotes name="alignment" note={cssNotes.alignment} />
    <DemoHeading>Centre anything</DemoHeading>
    <DemoText>The famous puzzle, solved in two lines.</DemoText>
      <div className="lab-centre-anything"><Block>Right in the middle</Block></div>
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
    <DemoHeading>Gap on the parent</DemoHeading>
    <DemoText>Three boxes with a gap. The space only goes between them, never against the dashed edge.</DemoText>
    <div className="lab-spacing-demo lab-spacing-gap">{[1, 2, 3].map((number) => <Block key={number}>Box {number}</Block>)}</div>
    <CssNotes name="gap" note={cssNotes.gap} />
  </>
}

// The spacing scale is how Mezzanine uses spacing, so it sits in that half of the page.
function SpacingTokens() {
  const [gap, setGap] = useState<(typeof gapOptions)[number]['value']>('--space-4')
  return <>
    <DemoHeading>Spacing tokens</DemoHeading>
    <DemoText>Mezzanine’s spaces come from a scale of tokens built on a 4px step. The number in each name counts the steps, so <code>--space-4</code> is four steps: <code>1rem</code>, normally 16px. The tokens are in <code>rem</code>, so space grows when someone enlarges their text. <Link href="/site/lab/layout/box-basics/measuring-the-box">Measuring the box</Link> explains <code>rem</code>.</DemoText>
    <DemoText>These are the real tokens, with their values read live.</DemoText>
    <SpacingScale />
    <DemoHeading>Sizes from the spacing scale</DemoHeading>
    <DemoText>The gap comes from one of Mezzanine’s spacing tokens.</DemoText>
    <ValuePicker label="gap" options={gapOptions} value={gap} onChange={setGap} />
      <div className="lab-spacing-scale" style={{ '--lab-gap': `var(${gap})` } as CSSProperties}>
        {[1, 2, 3, 4, 5, 6].map((number) => <Block key={number}>Box {number}</Block>)}
      </div>
    <CssNotes name="the spacing scale" note={cssNotes.spacingScale} />
  </>
}

// Shown on the Lab's Reading order page, outside Layout.
export function ReadingOrderDemo() {
  const [reversed, setReversed] = useState(false)
  return <>
    <DemoText>Tab moves focus through the buttons in their HTML order. Reversed on screen, focus jumps backwards across the row, because it still follows the HTML.</DemoText>
    <Checkbox isSelected={reversed} onChange={setReversed}>Reverse on screen</Checkbox>
      <div className={`lab-order-row${reversed ? ' lab-order-reversed' : ''}`}>
        {[1, 2, 3].map((number) => <Button key={number} size="sm" variant="secondary">Button {number}</Button>)}
      </div>
    <CssNotes name="the reversed row" note={cssNotes.readingOrder} level={3} />
  </>
}

// The Grid page: the technique, then its two common recipes.
function GridPageDemo() {
  return <>
    <GridDemo />
    <DemoHeading>A set number of columns</DemoHeading>
    <ColumnsDemo />
    <DemoHeading>As many columns as fit</DemoHeading>
    <AutoGridDemo />
  </>
}

export const arrangingBoxesDemos: StageDemos = {
  grid: { Demo: GridPageDemo },
  subgrid: { Demo: SubgridDemo },
  alignment: { Demo: AlignmentDemo },
  gap: { Demo: SpacingDemo, Detail: SpacingTokens },
}
