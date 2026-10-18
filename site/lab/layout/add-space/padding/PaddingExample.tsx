// The example for the Lab's Padding page, in Add space.
import { useState, type CSSProperties } from 'react'
import { CssNotes, ExampleText, ValuePicker } from '../../../shared/LabParts'
import { paddingCssNotes } from './paddingContent'

const paddingOptions = [
  { label: '--space-2', value: '--space-2' },
  { label: '--space-4', value: '--space-4' },
  { label: '--space-8', value: '--space-8' },
] as const

export function PaddingExample() {
  const [padding, setPadding] = useState<(typeof paddingOptions)[number]['value']>('--space-4')
  return <>
    <ExampleText>The box with its content in a different shade. More padding moves the content in and makes the box grow.</ExampleText>
    <ValuePicker label="padding" options={paddingOptions} value={padding} onChange={setPadding} />
    <div className="lab-padding-box" style={{ '--lab-padding': `var(${padding})` } as CSSProperties}>
      <div className="lab-box-content mz-text-body-md">Content</div>
    </div>
    <CssNotes name="padding" note={paddingCssNotes.padding} level={3} />
  </>
}
