// Examples for the Box basics group of Lab Layout pages.
import { useRef, useState, type CSSProperties } from 'react'
// Mezzanine's Table parts Column and Row are renamed here, so they aren't confused with the Lab's Column.
import { Cell, CodeBlock, Column as TableColumn, Link, Row as TableRow, Table, TableBody, TableHeader, Text } from '@decocode/mezzanine'
import { CssNotes, ExampleFrame, ExampleHeading, ExampleText, ValuePicker } from './LabParts'
import { Block, Center, Column } from './LabPrimitives'
import { cssNotes } from './layoutLabContent'
import type { StageExamples } from './StagePages'
import { useProbeHeights } from './layoutLabLogic'

function BoxModelExample() {
  return <>
    <ExampleText>The box, with each layer drawn so you can see it.</ExampleText>
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

const displayOptions = [
  { label: 'block', value: 'block' },
  { label: 'inline', value: 'inline' },
  { label: 'inline-block', value: 'inline-block' },
  { label: 'none', value: 'none' },
] as const

function TypesOfBoxExample() {
  const [display, setDisplay] = useState<(typeof displayOptions)[number]['value']>('inline')
  return <>
    <ExampleText>Three boxes in a row of text. Block boxes stack, inline and inline-block boxes line up, and none makes them disappear.</ExampleText>
    <ValuePicker label="display" options={displayOptions} value={display} onChange={setDisplay} />
      <Text elementType="p" className="mz-text-body-md" style={{ '--lab-flow-display': display } as CSSProperties}>
        Here is a sentence with <span className="lab-flow-item">Box 1</span> inside it, then <span className="lab-flow-item">Box 2</span>, and finally <span className="lab-flow-item">Box 3</span> near the end of the line.
      </Text>
    <CssNotes name="the types of box" note={cssNotes.normalFlow} level={3} />
  </>
}

function MeasuringTheBoxExample() {
  return <>
    <ExampleHeading>Four units</ExampleHeading>
    <ExampleText>The % bar follows the frame. The vw bar follows the window, so it ignores the frame. The px and rem bars stay put, but rem grows if you enlarge your text. That’s why Mezzanine’s <Link href="/site/lab/layout/add-space/gap">spacing tokens</Link> are in rem.</ExampleText>
    <ExampleFrame label="Four units">
      <Column>
        <div className="lab-unit-bar lab-unit-px mz-text-body-sm">160px</div>
        <div className="lab-unit-bar lab-unit-rem mz-text-body-sm">10rem</div>
        <div className="lab-unit-bar lab-unit-percent mz-text-body-sm">50% of the frame</div>
        <div className="lab-unit-bar lab-unit-vw mz-text-body-sm">30vw: 30% of the window</div>
      </Column>
    </ExampleFrame>
    <CssNotes name="the units" note={cssNotes.units} />
    <ExampleHeading>Grow, but within limits</ExampleHeading>
    <ExampleText>This box tries to be half the frame, but it stops shrinking at 10rem and stops growing at 30rem.</ExampleText>
    <ExampleFrame label="Grow, but within limits">
      <div className="lab-clamp-box mz-text-body-sm">Half the frame, between 10rem and 30rem</div>
    </ExampleFrame>
    <CssNotes name="clamp()" note={cssNotes.clamp} />
  </>
}

function ViewportExample() {
  const probes = useRef<HTMLDivElement>(null)
  const heights = useProbeHeights(probes)
  return <>
    <ExampleText>Every page needs this tag in its HTML. Without it, phones pretend to be a wide screen and shrink the whole page to fit, so viewport units would measure that pretend screen instead of the real one.</ExampleText>
    <CodeBlock>{'<meta name="viewport" content="width=device-width, initial-scale=1">'}</CodeBlock>
    <ExampleText>On a laptop the four heights match. On a phone they differ once the browser’s toolbar hides: svh and lvh stay apart, and dvh changes.</ExampleText>
    <div ref={probes} className="lab-probes" aria-hidden="true">
      <div data-probe="100vh" className="lab-probe-vh" />
      <div data-probe="100svh (toolbars shown)" className="lab-probe-svh" />
      <div data-probe="100lvh (toolbars hidden)" className="lab-probe-lvh" />
      <div data-probe="100dvh (right now)" className="lab-probe-dvh" />
    </div>
    {heights.length > 0 && <div className="lab-table">
      <Table aria-label="Viewport heights">
        <TableHeader><TableColumn isRowHeader>Measurement</TableColumn><TableColumn>Value</TableColumn></TableHeader>
        <TableBody>
          {heights.map((item) => <TableRow id={item.label} key={item.label}><Cell><code>{item.label}</code></Cell><Cell>{item.pixels}px</Cell></TableRow>)}
        </TableBody>
      </Table>
    </div>}
    <CssNotes name="the measurements" note={cssNotes.viewport} level={3} />
  </>
}

function SizingTheBoxExample() {
  return <>
    <ExampleText>Both boxes are given the same width. The first ends up wider, because its padding and border are added on top.</ExampleText>
    <ExampleFrame label="Where the width is measured">
      <Column>
        <div className="lab-labelled"><Text elementType="p" className="mz-text-label-md">box-sizing: content-box</Text><div className="lab-sizing-box lab-sizing-content-box mz-text-body-sm">12rem of content, plus padding and border</div></div>
        <div className="lab-labelled"><Text elementType="p" className="mz-text-label-md">box-sizing: border-box</Text><div className="lab-sizing-box lab-sizing-border-box mz-text-body-sm">12rem in total</div></div>
      </Column>
    </ExampleFrame>
    <CssNotes name="box-sizing" note={cssNotes.boxSizing} level={3} />
  </>
}

function CenterExample() {
  return <>
    <ExampleText>However wide the frame gets, the block stays in the middle and never grows past 24rem.</ExampleText>
    <ExampleFrame label="Center">
      <Center max="24rem"><Block>Centred, never wider than 24rem</Block></Center>
    </ExampleFrame>
    <CssNotes name="Center" note={cssNotes.center} level={3} />
  </>
}

export const boxBasicsExamples: StageExamples = {
  boxModel: { Example: BoxModelExample },
  typesOfBox: { Example: TypesOfBoxExample },
  measuringTheBox: { Example: MeasuringTheBoxExample },
  viewportUnits: { Example: ViewportExample },
  sizingTheBox: { Example: SizingTheBoxExample },
  center: { Example: CenterExample },
}
