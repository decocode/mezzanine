import { useState, type CSSProperties } from 'react'
import { Link, Text } from '@decocode/mezzanine'
import { CssNotes, DemoFrame, DemoHeading, DemoText, ValuePicker } from './LabParts'
import exampleImage from '../../assets/sidebar-example.svg'
import { Block, Center, Frame, Stack } from './LabPrimitives'
import { cssNotes, exampleImageAlt } from './layoutLabContent'
import type { StageDemos } from './StagePages'

function BoxModelDemo() {
  return <>
    <DemoText>The box, with each layer drawn so you can see it.</DemoText>
    <ul className="lab-legend mz-text-body-md">
      <li>Content: the innermost box, holding the word “Content”.</li>
      <li>Padding: the shaded space between the content and the thick line.</li>
      <li>Border: the thick line.</li>
      <li>Margin: the empty space between the thick line and the dashed line.</li>
    </ul>
    <div className="lab-box-margin-area">
      <div className="lab-box-anatomy">
        <div className="lab-box-content mz-text-body-md">Content</div>
      </div>
    </div>
    <CssNotes name="the four layers" note={cssNotes.boxAnatomy} level={3} />
  </>
}

function MarginDemo() {
  return <>
    <DemoText>Three boxes, each with a margin. Each box keeps its distance on every side, so there’s space against the dashed edge too.</DemoText>
    <div className="lab-spacing-demo lab-spacing-margin">{[1, 2, 3].map((number) => <Block key={number}>Box {number}</Block>)}</div>
    <CssNotes name="margin" note={cssNotes.margin} level={3} />
  </>
}

const paddingOptions = [
  { label: '--space-2', value: '--space-2' },
  { label: '--space-4', value: '--space-4' },
  { label: '--space-8', value: '--space-8' },
] as const

function PaddingDemo() {
  const [padding, setPadding] = useState<(typeof paddingOptions)[number]['value']>('--space-4')
  return <>
    <DemoText>The box with its content in a different shade. More padding moves the content in and makes the box grow.</DemoText>
    <ValuePicker label="padding" options={paddingOptions} value={padding} onChange={setPadding} />
    <div className="lab-padding-box" style={{ '--lab-padding': `var(${padding})` } as CSSProperties}>
      <div className="lab-box-content mz-text-body-md">Content</div>
    </div>
    <CssNotes name="padding" note={cssNotes.padding} level={3} />
  </>
}

const displayOptions = [
  { label: 'block', value: 'block' },
  { label: 'inline', value: 'inline' },
  { label: 'inline-block', value: 'inline-block' },
  { label: 'none', value: 'none' },
] as const

function TypesOfBoxDemo() {
  const [display, setDisplay] = useState<(typeof displayOptions)[number]['value']>('inline')
  return <>
    <DemoText>Three boxes in a row of text. Block boxes stack, inline and inline-block boxes line up, and none makes them disappear.</DemoText>
    <ValuePicker label="display" options={displayOptions} value={display} onChange={setDisplay} />
      <Text elementType="p" className="mz-text-body-md" style={{ '--lab-flow-display': display } as CSSProperties}>
        Here is a sentence with <span className="lab-flow-item">Box 1</span> inside it, then <span className="lab-flow-item">Box 2</span>, and finally <span className="lab-flow-item">Box 3</span> near the end of the line.
      </Text>
    <CssNotes name="the types of box" note={cssNotes.normalFlow} level={3} />
  </>
}

function SizingTheBoxDemo() {
  return <>
    <DemoText>Both boxes are given the same width. The first ends up wider, because its padding and border are added on top.</DemoText>
    <DemoFrame label="Where the width is measured">
      <Stack>
        <div className="lab-labelled"><Text elementType="p" className="mz-text-label-md">box-sizing: content-box</Text><div className="lab-sizing-box lab-sizing-content-box mz-text-body-sm">12rem of content, plus padding and border</div></div>
        <div className="lab-labelled"><Text elementType="p" className="mz-text-label-md">box-sizing: border-box</Text><div className="lab-sizing-box lab-sizing-border-box mz-text-body-sm">12rem in total</div></div>
      </Stack>
    </DemoFrame>
    <CssNotes name="box-sizing" note={cssNotes.boxSizing} level={3} />
  </>
}

function MeasuringTheBoxDemo() {
  return <>
    <DemoHeading>Four units</DemoHeading>
    <DemoText>The % bar follows the frame. The vw bar follows the window, so it ignores the frame. The px and rem bars stay put, but rem grows if you enlarge your text. That’s why Mezzanine’s <Link href="/site/lab/layout/add-space/gap">spacing tokens</Link> are in rem.</DemoText>
    <DemoFrame label="Four units">
      <Stack>
        <div className="lab-unit-bar lab-unit-px mz-text-body-sm">160px</div>
        <div className="lab-unit-bar lab-unit-rem mz-text-body-sm">10rem</div>
        <div className="lab-unit-bar lab-unit-percent mz-text-body-sm">50% of the frame</div>
        <div className="lab-unit-bar lab-unit-vw mz-text-body-sm">30vw: 30% of the window</div>
      </Stack>
    </DemoFrame>
    <CssNotes name="the units" note={cssNotes.units} />
    <DemoHeading>Grow, but within limits</DemoHeading>
    <DemoText>This box tries to be half the frame, but it stops shrinking at 10rem and stops growing at 30rem.</DemoText>
    <DemoFrame label="Grow, but within limits">
      <div className="lab-clamp-box mz-text-body-sm">Half the frame, between 10rem and 30rem</div>
    </DemoFrame>
    <CssNotes name="clamp()" note={cssNotes.clamp} />
  </>
}

const ratioOptions = [
  { label: '16:9', value: '16 / 9' },
  { label: '4:3', value: '4 / 3' },
  { label: '1:1', value: '1 / 1' },
] as const

function FrameDemo() {
  const [ratio, setRatio] = useState<(typeof ratioOptions)[number]['value']>('16 / 9')
  return <>
    <DemoText>Whatever the shape, the picture is cropped to fill it, never squashed.</DemoText>
    <ValuePicker label="Shape" options={ratioOptions} value={ratio} onChange={setRatio} />
      <Center max="24rem">
        <Frame ratio={ratio}><img src={exampleImage} alt={exampleImageAlt} width={480} height={240} /></Frame>
      </Center>
    <CssNotes name="Frame" note={cssNotes.frame} level={3} />
  </>
}

function CenterDemo() {
  return <>
    <DemoText>However wide the frame gets, the block stays in the middle and never grows past 24rem.</DemoText>
    <DemoFrame label="Center">
      <Center max="24rem"><Block>Centred, never wider than 24rem</Block></Center>
    </DemoFrame>
    <CssNotes name="Center" note={cssNotes.center} level={3} />
  </>
}

export const theBoxDemos: StageDemos = {
  boxModel: { Demo: BoxModelDemo },
  margin: { Demo: MarginDemo },
  padding: { Demo: PaddingDemo },
  typesOfBox: { Demo: TypesOfBoxDemo },
  measuringTheBox: { Demo: MeasuringTheBoxDemo },
  sizingTheBox: { Demo: SizingTheBoxDemo },
  frame: { Demo: FrameDemo },
  center: { Demo: CenterDemo },
}
