// The examples for the Lab's Margin and padding page, in Add space.
import { useState, type CSSProperties } from 'react'
import { CssNotes, ExampleHeading, ExampleText, ValuePicker } from '../../../shared/LabParts'
import { Block } from '../../../shared/LabPrimitives'
import { marginAndPaddingCssNotes } from './marginAndPaddingContent'

const paddingOptions = [
  { label: '--space-2', value: '--space-2' },
  { label: '--space-4', value: '--space-4' },
  { label: '--space-8', value: '--space-8' },
] as const

export function MarginAndPaddingExample() {
  const [padding, setPadding] = useState<(typeof paddingOptions)[number]['value']>('--space-4')
  return <>
    <ExampleHeading>Margin</ExampleHeading>
    <ExampleText>Three boxes, each with a margin. Each box keeps its distance on every side, so there’s space against the dashed edge too.</ExampleText>
    <div className="lab-spacing-example lab-spacing-margin">{[1, 2, 3].map((number) => <Block key={number}>Box {number}</Block>)}</div>
    <CssNotes name="margin" note={marginAndPaddingCssNotes.margin} />
    <ExampleHeading>Padding</ExampleHeading>
    <ExampleText>The box with its content in a different shade. More padding moves the content in and makes the box grow.</ExampleText>
    <ValuePicker label="padding" options={paddingOptions} value={padding} onChange={setPadding} />
    <div className="lab-padding-box" style={{ '--lab-padding': `var(${padding})` } as CSSProperties}>
      <div className="lab-box-content mz-text-body-md">Content</div>
    </div>
    <CssNotes name="padding" note={marginAndPaddingCssNotes.padding} />
  </>
}
