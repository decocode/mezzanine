// Examples for the Side by side group of Lab Layout pages.
import { useState } from 'react'
import { Badge, Checkbox, Link, Split, type SplitProps } from '@decocode/mezzanine'
import { CssNotes, ExampleFrame, ExampleText, ValuePicker } from './LabParts'
import { Block, Reel, Row, RowWrap, RowWrapAndGrow } from './LabPrimitives'
import { cssNotes } from './layoutLabContent'
import type { StageExamples } from './StagePages'

function RowExample() {
  const [isSwitching, setIsSwitching] = useState(true)
  return <>
    <ExampleText>Below about 30rem, with the switch, the row becomes a column. Without it, the row squashes, then sticks out of the frame.</ExampleText>
    <Checkbox isSelected={isSwitching} onChange={setIsSwitching}>Switch to a column below 30rem</Checkbox>
    <ExampleFrame label="Row" canOverflow>
      <Row switchAt={isSwitching ? '30rem' : undefined}><Block>Item one</Block><Block>Item two</Block><Block>Item three</Block></Row>
    </ExampleFrame>
    <CssNotes name="Row" note={cssNotes.row} level={3} />
  </>
}

function RowWrapExample() {
  return <>
    <ExampleFrame label="Row wrap">
      <RowWrap>{['Fig', 'Watermelon', 'Kiwi', 'Pomegranate', 'Plum', 'Passion fruit', 'Apple', 'Dragon fruit', 'Pear'].map((tag) => <Badge key={tag}>{tag}</Badge>)}</RowWrap>
    </ExampleFrame>
    <CssNotes name="Row wrap" note={cssNotes.rowWrap} level={3} />
  </>
}

function RowWrapAndGrowExample() {
  return <>
    <ExampleFrame label="Row wrap and grow" initialWidth={1100}>
      <RowWrapAndGrow>{['A', 'B', 'C', 'D'].map((letter) => <Block key={letter} tall>Box {letter}</Block>)}</RowWrapAndGrow>
    </ExampleFrame>
    <CssNotes name="Row wrap and grow" note={cssNotes.rowWrapAndGrow} level={3} />
  </>
}

function ReelExample() {
  return <>
    <ExampleText>The reel scrolls sideways. Keyboard users reach it with Tab and scroll it with the arrow keys. The scrolling comes from overflow: see <Link href="/site/lab/layout/inside-the-box/overflowing-the-box">Overflowing the box</Link>.</ExampleText>
      <Reel label="Example reel">
        {Array.from({ length: 8 }, (_, index) => <Block key={index}>Item {index + 1}</Block>)}
      </Reel>
    <CssNotes name="Reel" note={cssNotes.reel} level={3} />
  </>
}

type SplitFraction = NonNullable<SplitProps['fraction']>

const fractionOptions: readonly { label: string; value: SplitFraction }[] = [
  { label: '1/4', value: '1/4' },
  { label: '1/3', value: '1/3' },
  { label: '1/2', value: '1/2' },
  { label: 'Auto start', value: 'auto-start' },
]

function SplitExample() {
  const [fraction, setFraction] = useState<SplitFraction>('1/3')
  return <>
    <ValuePicker label="Fraction" options={fractionOptions} value={fraction} onChange={setFraction} />
    <ExampleFrame label="Split">
      <Split fraction={fraction} gap={3}><Block tall>First area</Block><Block tall>Second area</Block></Split>
    </ExampleFrame>
    <CssNotes name="Split" note={cssNotes.split} level={3} />
  </>
}

export const sideBySideExamples: StageExamples = {
  row: { Example: RowExample },
  rowWrap: { Example: RowWrapExample },
  rowWrapAndGrow: { Example: RowWrapAndGrowExample },
  reel: { Example: ReelExample },
  split: { Example: SplitExample },
}
