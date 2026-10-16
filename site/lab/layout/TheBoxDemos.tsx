import { useState, type CSSProperties } from 'react'
import { Checkbox, Link, Text } from '@decocode/mezzanine'
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
    <DemoText>The box with its content in a different shade. Choose the padding and watch the content move in while the box grows.</DemoText>
    <ValuePicker label="padding" options={paddingOptions} value={padding} onChange={setPadding} />
    <div className="lab-padding-box" style={{ '--lab-padding': `var(${padding})` } as CSSProperties}>
      <div className="lab-box-content mz-text-body-md">Content</div>
    </div>
    <CssNotes name="padding" note={cssNotes.padding} level={3} />
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
    <DemoText>Drag the frame’s slider. The % bar follows the frame. The vw bar follows the window, so it ignores the frame. The px and rem bars stay put, but rem grows if you enlarge your text. That’s why Mezzanine’s <Link href="/site/lab/layout/arranging-boxes/gap">spacing tokens</Link> are in rem.</DemoText>
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
    <DemoText>This box tries to be half the frame. Drag the slider to each end: it stops shrinking at 10rem and stops growing at 30rem.</DemoText>
    <DemoFrame label="Grow, but within limits">
      <div className="lab-clamp-box mz-text-body-sm">Half the frame, between 10rem and 30rem</div>
    </DemoFrame>
    <CssNotes name="clamp()" note={cssNotes.clamp} />
  </>
}

function LogicalDemo() {
  const [rtl, setRtl] = useState(false)
  return <>
    <DemoText>Turn on right to left. The logical box moves its border and indent to the right, where Arabic and Hebrew lines start. The physical one stays on the left and looks wrong. Reading direction itself is explained in <Link href="/site/lab/layout/inside-the-box/text-in-boxes">Text in boxes</Link>.</DemoText>
    <Checkbox isSelected={rtl} onChange={setRtl}>Show right to left</Checkbox>
    <div className="lab-two-slots" dir={rtl ? 'rtl' : 'ltr'}>
      <div className="lab-labelled"><Text elementType="p" className="mz-text-label-md">Physical (left/right)</Text>
        <div className="lab-direction lab-direction-physical mz-text-body-md">Accent border and indent on the <strong>left</strong>, always.</div>
      </div>
      <div className="lab-labelled"><Text elementType="p" className="mz-text-label-md">Logical (start/end)</Text>
        <div className="lab-direction lab-direction-logical mz-text-body-md">Accent border and indent at the <strong>start</strong> of the line.</div>
      </div>
    </div>
    <CssNotes name="logical properties" note={cssNotes.logical} level={3} />
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
    <DemoText>Choose a shape. The picture is cropped to fill it, never squashed.</DemoText>
    <ValuePicker label="Shape" options={ratioOptions} value={ratio} onChange={setRatio} />
      <Center max="24rem">
        <Frame ratio={ratio}><img src={exampleImage} alt={exampleImageAlt} width={480} height={240} /></Frame>
      </Center>
    <CssNotes name="Frame" note={cssNotes.frame} level={3} />
  </>
}

function CenterDemo() {
  return <>
    <DemoText>Widen the frame. The block stays in the middle and never grows past 24rem.</DemoText>
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
  measuringTheBox: { Demo: MeasuringTheBoxDemo },
  sizingTheBox: { Demo: SizingTheBoxDemo },
  frame: { Demo: FrameDemo },
  sides: { Demo: LogicalDemo },
  center: { Demo: CenterDemo },
}
