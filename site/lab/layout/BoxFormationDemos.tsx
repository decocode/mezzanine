import { useState } from 'react'
import { Badge, Checkbox } from '@decocode/mezzanine'
import { CssNotes, DemoFrame, DemoText, ValuePicker } from './LabParts'
import { Block, Columns, ColumnsItem, Grid, Inline, InlineCluster, Split, Stack, type SplitFraction } from './LabPrimitives'
import { cssNotes } from './layoutLabContent'
import type { StageDemos } from './StagePages'

function StackDemo() {
  return <>
    <DemoText>Three items, one above another, with the same space between each.</DemoText>
    <DemoFrame label="Stack">
      <Stack><Block>Item one</Block><Block>Item two</Block><Block>Item three</Block></Stack>
    </DemoFrame>
    <CssNotes name="Stack" note={cssNotes.stack} level={3} />
  </>
}

function InlineDemo() {
  const [isSwitching, setIsSwitching] = useState(true)
  return <>
    <DemoText>Drag the slider below about 30rem. With the switch, the row becomes a column. Without it, the row squashes, then sticks out of the frame.</DemoText>
    <Checkbox isSelected={isSwitching} onChange={setIsSwitching}>Switch to a column below 30rem</Checkbox>
    <DemoFrame label="Inline" canOverflow>
      <Inline switchAt={isSwitching ? '30rem' : undefined}><Block>Item one</Block><Block>Item two</Block><Block>Item three</Block></Inline>
    </DemoFrame>
    <CssNotes name="Inline" note={cssNotes.inline} level={3} />
  </>
}

function InlineClusterDemo() {
  return <>
    <DemoText>Badges in a row. Narrow the frame and they wrap onto new lines, like words.</DemoText>
    <DemoFrame label="Inline cluster">
      <InlineCluster>{['Badge A', 'Badge B', 'Badge C', 'Badge D', 'Badge E', 'Badge F', 'Badge G'].map((tag) => <Badge key={tag}>{tag}</Badge>)}</InlineCluster>
    </DemoFrame>
    <CssNotes name="Inline cluster" note={cssNotes.inlineCluster} level={3} />
  </>
}

const fractionOptions: readonly { label: string; value: SplitFraction }[] = [
  { label: '1/4', value: '1/4' },
  { label: '1/3', value: '1/3' },
  { label: '1/2', value: '1/2' },
]

function SplitDemo() {
  const [fraction, setFraction] = useState<SplitFraction>('1/3')
  const [isSwitching, setIsSwitching] = useState(true)
  return <>
    <DemoText>Choose how much of the row the first area gets. Then drag the slider below about 30rem to see the switch.</DemoText>
    <ValuePicker label="Fraction" options={fractionOptions} value={fraction} onChange={setFraction} />
    <Checkbox isSelected={isSwitching} onChange={setIsSwitching}>Switch to a column below 30rem</Checkbox>
    <DemoFrame label="Split">
      <Split fraction={fraction} switchAt={isSwitching ? '30rem' : undefined}><Block tall>First area</Block><Block tall>Second area</Block></Split>
    </DemoFrame>
    <CssNotes name="Split" note={cssNotes.split} level={3} />
  </>
}

const columnCountOptions = [
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
] as const

function ColumnsDemo() {
  const [count, setCount] = useState<(typeof columnCountOptions)[number]['value']>('3')
  return <>
    <DemoText>Choose the number of columns. The first item always spans two of them.</DemoText>
    <ValuePicker label="Columns" options={columnCountOptions} value={count} onChange={setCount} />
    <DemoFrame label="Columns">
      <Columns columns={Number(count)}>
        <ColumnsItem span={2}><Block>Item one spans two columns</Block></ColumnsItem>
        {['two', 'three', 'four', 'five', 'six'].map((word) => <Block key={word}>Item {word}</Block>)}
      </Columns>
    </DemoFrame>
    <CssNotes name="Columns" note={cssNotes.columns} level={3} />
  </>
}

function GridDemo() {
  return <>
    <DemoText>The grid works out its own number of columns, from three to two to one, just from how many 10rem tiles fit. You never choose the number.</DemoText>
    <DemoFrame label="Grid">
      <Grid min="10rem">{['A', 'B', 'C', 'D', 'E', 'F'].map((letter) => <Block key={letter}>Tile {letter}</Block>)}</Grid>
    </DemoFrame>
    <CssNotes name="Grid" note={cssNotes.gridBlock} level={3} />
  </>
}

export const boxFormationDemos: StageDemos = {
  stack: { Demo: StackDemo },
  inline: { Demo: InlineDemo },
  inlineCluster: { Demo: InlineClusterDemo },
  split: { Demo: SplitDemo },
  columns: { Demo: ColumnsDemo },
  grid: { Demo: GridDemo },
}
