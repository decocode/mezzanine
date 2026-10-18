import { useState } from 'react'
import { Badge, Checkbox, Link, Split, type SplitProps } from '@decocode/mezzanine'
import { CssNotes, DemoFrame, DemoText, ValuePicker } from './LabParts'
import { Block, Columns, ColumnsItem, Grid, Hero, Reel, Row, RowWrap, Stack } from './LabPrimitives'
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

const coverHeightOptions = [
  { label: '16rem', value: '16rem' },
  { label: '24rem', value: '24rem' },
  { label: '32rem', value: '32rem' },
] as const

function CoverDemo() {
  const [height, setHeight] = useState<(typeof coverHeightOptions)[number]['value']>('24rem')
  return <>
    <DemoText>The dashed line is the Hero box, set out like the opening section of a homepage. At every height, the headline stays in the middle, and the logo and “Scroll down” stay at the top and bottom edges.</DemoText>
    <ValuePicker label="Minimum height" options={coverHeightOptions} value={height} onChange={setHeight} />
    <DemoFrame label="Hero">
      <div className="lab-hero-demo">
        <Hero
          minHeight={height}
          top={<p className="lab-hero-small mz-text-label-md">Logo</p>}
          bottom={<p className="lab-hero-small lab-hero-end mz-text-label-md">Scroll down</p>}
        >
          <p className="lab-hero-headline mz-text-heading-lg">Big headline</p>
        </Hero>
      </div>
    </DemoFrame>
    <CssNotes name="Hero" note={cssNotes.cover} level={3} />
  </>
}

function InlineDemo() {
  const [isSwitching, setIsSwitching] = useState(true)
  return <>
    <DemoText>Below about 30rem, with the switch, the row becomes a column. Without it, the row squashes, then sticks out of the frame.</DemoText>
    <Checkbox isSelected={isSwitching} onChange={setIsSwitching}>Switch to a column below 30rem</Checkbox>
    <DemoFrame label="Row" canOverflow>
      <Row switchAt={isSwitching ? '30rem' : undefined}><Block>Item one</Block><Block>Item two</Block><Block>Item three</Block></Row>
    </DemoFrame>
    <CssNotes name="Row" note={cssNotes.inline} level={3} />
  </>
}

function InlineClusterDemo() {
  return <>
    <DemoText>Badges in a row. Narrow the frame and they wrap onto new lines, like words.</DemoText>
    <DemoFrame label="Row wrap">
      <RowWrap>{['Badge A', 'Badge B', 'Badge C', 'Badge D', 'Badge E', 'Badge F', 'Badge G'].map((tag) => <Badge key={tag}>{tag}</Badge>)}</RowWrap>
    </DemoFrame>
    <CssNotes name="Row wrap" note={cssNotes.inlineCluster} level={3} />
  </>
}

function ReelDemo() {
  return <>
    <DemoText>The reel scrolls sideways. Keyboard users reach it with Tab and scroll it with the arrow keys. The scrolling comes from overflow: see <Link href="/site/lab/layout/inside-the-box/overflowing-the-box">Overflowing the box</Link>.</DemoText>
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

function SplitDemo() {
  const [fraction, setFraction] = useState<SplitFraction>('1/3')
  return <>
    <ValuePicker label="Fraction" options={fractionOptions} value={fraction} onChange={setFraction} />
    <DemoFrame label="Split">
      <Split fraction={fraction} gap={3}><Block tall>First area</Block><Block tall>Second area</Block></Split>
    </DemoFrame>
    <CssNotes name="Split" note={cssNotes.split} level={3} />
  </>
}

const columnCountOptions = [
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
] as const

// Grid's two common recipes, shown on the Grid page under their own third-level headings.
export function ColumnsDemo() {
  const [count, setCount] = useState<(typeof columnCountOptions)[number]['value']>('3')
  return <>
    <DemoText>Whatever the number of columns, the first item always spans two of them.</DemoText>
    <ValuePicker label="Columns" options={columnCountOptions} value={count} onChange={setCount} />
    <DemoFrame label="Columns">
      <Columns columns={Number(count)}>
        <ColumnsItem span={2}><Block>Item one spans two columns</Block></ColumnsItem>
        {['two', 'three', 'four', 'five', 'six'].map((word) => <Block key={word}>Item {word}</Block>)}
      </Columns>
    </DemoFrame>
    <CssNotes name="a set number of columns" note={cssNotes.columns} level={4} />
  </>
}

export function AutoGridDemo() {
  return <>
    <DemoText>The grid works out its own number of columns, from three to two to one, just from how many 10rem tiles fit. You never choose the number.</DemoText>
    <DemoFrame label="Grid">
      <Grid min="10rem">{['A', 'B', 'C', 'D', 'E', 'F'].map((letter) => <Block key={letter}>Tile {letter}</Block>)}</Grid>
    </DemoFrame>
    <CssNotes name="as many columns as fit" note={cssNotes.gridBlock} level={4} />
  </>
}

export const boxFormationDemos: StageDemos = {
  stack: { Demo: StackDemo },
  cover: { Demo: CoverDemo },
  inline: { Demo: InlineDemo },
  inlineCluster: { Demo: InlineClusterDemo },
  reel: { Demo: ReelDemo },
  split: { Demo: SplitDemo },
}
