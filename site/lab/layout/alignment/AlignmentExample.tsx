// The example for the Lab's Alignment page, in Layout. The items are Buttons.
import { useState, type CSSProperties } from 'react'
import { Button, DemoArea } from '@decocode/mezzanine'
import { CssNotes, ExampleHeading, ExampleText, PanelPicker } from '../../shared/LabParts'
import { alignmentCssNotes } from './alignmentContent'

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

// One button at each level of the hierarchy, as a row of actions often has.
const buttons = [
  { label: 'Button A', hierarchy: 'primary' },
  { label: 'Button B', hierarchy: 'secondary' },
  { label: 'Button C', hierarchy: 'tertiary' },
] as const

export function AlignmentExample() {
  const [justify, setJustify] = useState<(typeof justifyOptions)[number]['value']>('start')
  const [align, setAlign] = useState<(typeof alignOptions)[number]['value']>('stretch')
  return <>
    <ExampleHeading>Along the row and across it</ExampleHeading>
    <ExampleText>Three boxes in a Flexbox row that’s taller than they need, so they can move along the row and across it.</ExampleText>
    <DemoArea codeView={alignmentCssNotes.alignment.code} endPanel={<>
      <PanelPicker label="justify-content" options={justifyOptions} value={justify} onChange={setJustify} />
      <PanelPicker label="align-items" options={alignOptions} value={align} onChange={setAlign} />
    </>}>
      <div className="lab-align-example" style={{ '--lab-justify': justify, '--lab-align': align } as CSSProperties}>
        {buttons.map((button) => <Button key={button.hierarchy} hierarchy={button.hierarchy}>{button.label}</Button>)}
      </div>
    </DemoArea>
    <CssNotes name="alignment" note={alignmentCssNotes.alignment} showCode={false} />
    <ExampleHeading>Centre anything</ExampleHeading>
    <ExampleText>The famous puzzle, solved in two lines.</ExampleText>
    <DemoArea codeView={alignmentCssNotes.centreAnything.code}>
      <div className="lab-centre-anything"><Button>Button A</Button></div>
    </DemoArea>
    <CssNotes name="centring" note={alignmentCssNotes.centreAnything} showCode={false} />
  </>
}
