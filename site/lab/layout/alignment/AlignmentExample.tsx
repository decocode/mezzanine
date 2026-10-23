// The example for the Lab's Alignment page, in Inside the box.
import { useState, type CSSProperties } from 'react'
import { CssNotes, ExampleFrame, ExampleHeading, ExampleText, ValuePicker } from '../../../shared/LabParts'
import { Block } from '../../../shared/LabPrimitives'
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

export function AlignmentExample() {
  const [justify, setJustify] = useState<(typeof justifyOptions)[number]['value']>('start')
  const [align, setAlign] = useState<(typeof alignOptions)[number]['value']>('stretch')
  return <>
    <ExampleHeading>Along the row and across it</ExampleHeading>
    <ExampleText>Three boxes in a Flexbox row that’s taller than they need, so they can move along the row and across it.</ExampleText>
    <div className="lab-controls">
      <ValuePicker label="justify-content" options={justifyOptions} value={justify} onChange={setJustify} />
      <ValuePicker label="align-items" options={alignOptions} value={align} onChange={setAlign} />
    </div>
    <ExampleFrame label="Alignment">
        <div className="lab-align-example" style={{ '--lab-justify': justify, '--lab-align': align } as CSSProperties}>
          <Block>Box 1</Block>
          <Block>Box 2 has more to say</Block>
          <Block>Box 3</Block>
        </div>
    </ExampleFrame>
    <CssNotes name="alignment" note={alignmentCssNotes.alignment} />
    <ExampleHeading>Centre anything</ExampleHeading>
    <ExampleText>The famous puzzle, solved in two lines.</ExampleText>
      <div className="lab-centre-anything"><Block>Right in the middle</Block></div>
    <CssNotes name="centring" note={alignmentCssNotes.centreAnything} />
  </>
}
