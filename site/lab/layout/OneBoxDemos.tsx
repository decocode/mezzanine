import { useState } from 'react'
import { Checkbox, Link, Text } from '@decocode/mezzanine'
import { CssNotes, DemoFrame, DemoHeading, DemoText, LabOnly } from './LabParts'
import { Block, Center, Stack } from './LabPrimitives'
import { cssNotes, sampleParagraph } from './layoutLabContent'
import type { StageDemos } from './StagePages'

function BoxModelDemo() {
  return <>
    <DemoHeading>The four layers</DemoHeading>
    <DemoText>One box, with each layer drawn so you can see it.</DemoText>
    <ul className="lab-legend mz-text-body-md">
      <li>Content: the innermost box, holding the word “Content”.</li>
      <li>Padding: the shaded space between the content and the thick line.</li>
      <li>Border: the thick line.</li>
      <li>Margin: the empty space between the thick line and the dashed line.</li>
    </ul>
    <LabOnly name="Box model">
      <div className="lab-box-margin-area">
        <div className="lab-box-anatomy">
          <div className="lab-box-content mz-text-body-md">Content</div>
        </div>
      </div>
    </LabOnly>
    <CssNotes name="the four layers" note={cssNotes.boxAnatomy} />
    <DemoHeading>Where the width is measured</DemoHeading>
    <DemoText>Both boxes are given the same width. The first ends up wider, because its padding and border are added on top.</DemoText>
    <DemoFrame label="Where the width is measured">
      <Stack>
        <LabOnly name="box-sizing: content-box"><div className="lab-sizing-box lab-sizing-content-box mz-text-body-sm">12rem of content, plus padding and border</div></LabOnly>
        <LabOnly name="box-sizing: border-box"><div className="lab-sizing-box lab-sizing-border-box mz-text-body-sm">12rem in total</div></LabOnly>
      </Stack>
    </DemoFrame>
    <CssNotes name="box-sizing" note={cssNotes.boxSizing} />
  </>
}

function SizingAndUnitsDemo() {
  return <>
    <DemoHeading>Four units</DemoHeading>
    <DemoText>Drag the frame’s slider. The % bar follows the frame. The vw bar follows the window, so it ignores the frame. The px and rem bars stay put, but rem grows if you enlarge your text. That’s why Mezzanine’s <Link href="/site/lab/layout/arranging-boxes/spacing">spacing tokens</Link> are in rem.</DemoText>
    <DemoFrame label="Four units">
      <LabOnly name="Unit bars">
        <Stack>
          <div className="lab-unit-bar lab-unit-px mz-text-body-sm">160px</div>
          <div className="lab-unit-bar lab-unit-rem mz-text-body-sm">10rem</div>
          <div className="lab-unit-bar lab-unit-percent mz-text-body-sm">50% of the frame</div>
          <div className="lab-unit-bar lab-unit-vw mz-text-body-sm">30vw: 30% of the window</div>
        </Stack>
      </LabOnly>
    </DemoFrame>
    <CssNotes name="the units" note={cssNotes.units} />
    <DemoHeading>Grow, but within limits</DemoHeading>
    <DemoText>This box tries to be half the frame. Drag the slider to each end: it stops shrinking at 10rem and stops growing at 30rem.</DemoText>
    <DemoFrame label="Grow, but within limits">
      <LabOnly name="clamp()"><div className="lab-clamp-box mz-text-body-sm">Half the frame, between 10rem and 30rem</div></LabOnly>
    </DemoFrame>
    <CssNotes name="clamp()" note={cssNotes.clamp} />
    <DemoHeading>Line length</DemoHeading>
    <DemoText>Comfy reading: the same paragraph twice. Widen the frame and the first one stretches into long, tiring lines. The second stops at about 65 characters. Line length is really a typography decision, so in Mezzanine it would sit with <Link href="/typography">Typography</Link>.</DemoText>
    <DemoFrame label="Line length" initialWidth={1100}>
      <Stack>
        <LabOnly name="No line length"><Text elementType="p" className="mz-text-body-md">{sampleParagraph}</Text></LabOnly>
        <LabOnly name="max-width: 65ch"><div className="lab-line-length"><Text elementType="p" className="mz-text-body-md">{sampleParagraph}</Text></div></LabOnly>
      </Stack>
    </DemoFrame>
    <CssNotes name="line length" note={cssNotes.lineLength} />
  </>
}

function LogicalDemo() {
  const [rtl, setRtl] = useState(false)
  return <>
    <DemoText>Turn on right to left. The logical box moves its border and indent to the right, where Arabic and Hebrew lines start. The physical one stays on the left and looks wrong. Mezzanine’s Sidebar drawer and Modal still use some physical properties.</DemoText>
    <Checkbox isSelected={rtl} onChange={setRtl}>Show right to left</Checkbox>
    <div className="lab-two-slots" dir={rtl ? 'rtl' : 'ltr'}>
      <LabOnly name="Physical (left/right)">
        <div className="lab-direction lab-direction-physical mz-text-body-md">Accent border and indent on the <strong>left</strong>, always.</div>
      </LabOnly>
      <LabOnly name="Logical (start/end)">
        <div className="lab-direction lab-direction-logical mz-text-body-md">Accent border and indent at the <strong>start</strong> of the line.</div>
      </LabOnly>
    </div>
    <CssNotes name="logical properties" note={cssNotes.logical} level={3} />
  </>
}

function TargetSizeDemo() {
  return <>
    <DemoText>Two squares showing the smallest a tap or click target should be. The first is the minimum WCAG 2.2 allows. The second is what Mezzanine’s buttons use today.</DemoText>
    <LabOnly name="Target sizes">
      <div className="lab-targets">
        <div><span className="lab-target lab-target-wcag" aria-hidden="true" /><Text elementType="p" className="mz-text-body-sm">24px: the WCAG 2.2 AA minimum</Text></div>
        <div><span className="lab-target lab-target-comfortable" aria-hidden="true" /><Text elementType="p" className="mz-text-body-sm">44px: what Mezzanine&apos;s buttons use today, as --lab-target-min</Text></div>
      </div>
    </LabOnly>
    <CssNotes name="target size" note={cssNotes.targetSize} level={3} />
  </>
}

function CenterDemo() {
  return <>
    <DemoText>Widen the frame. The block stays in the middle and never grows past 24rem.</DemoText>
    <DemoFrame label="Center"><LabOnly name="Center">
      <Center max="24rem"><Block>Centred, never wider than 24rem</Block></Center>
    </LabOnly></DemoFrame>
    <CssNotes name="Center" note={cssNotes.center} level={3} />
  </>
}

export const oneBoxDemos: StageDemos = {
  boxModel: { Demo: BoxModelDemo },
  sizingAndUnits: { Demo: SizingAndUnitsDemo },
  logicalProperties: { Demo: LogicalDemo },
  targetSize: { Demo: TargetSizeDemo },
  center: { Demo: CenterDemo },
}
