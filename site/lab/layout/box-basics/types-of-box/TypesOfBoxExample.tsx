// The example for the Lab's Types of box page, in Box basics.
import { useState, type CSSProperties } from 'react'
import { Text } from '@decocode/mezzanine'
import { CssNotes, ExampleText, ValuePicker } from '../../../shared/LabParts'
import { typesOfBoxCssNotes } from './typesOfBoxContent'

const displayOptions = [
  { label: 'block', value: 'block' },
  { label: 'inline', value: 'inline' },
  { label: 'inline-block', value: 'inline-block' },
  { label: 'none', value: 'none' },
] as const

export function TypesOfBoxExample() {
  const [display, setDisplay] = useState<(typeof displayOptions)[number]['value']>('inline')
  return <>
    <ExampleText>Three boxes in a row of text. Block boxes stack, inline and inline-block boxes line up, and none makes them disappear.</ExampleText>
    <ValuePicker label="display" options={displayOptions} value={display} onChange={setDisplay} />
      <Text elementType="p" className="mz-text-body-md" style={{ '--lab-flow-display': display } as CSSProperties}>
        Here is a sentence with <span className="lab-flow-item">Box 1</span> inside it, then <span className="lab-flow-item">Box 2</span>, and finally <span className="lab-flow-item">Box 3</span> near the end of the line.
      </Text>
    <CssNotes name="the types of box" note={typesOfBoxCssNotes.normalFlow} level={3} />
  </>
}
