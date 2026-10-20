// The example for the Lab's Gap page, in Add space.
import { useState, type CSSProperties } from 'react'
import { CssNotes, ExampleText, ValuePicker } from '../../../shared/LabParts'
import { Block } from '../../../shared/LabPrimitives'
import { gapCssNotes } from './gapContent'

const gapOptions = [
  { label: '--space-2', value: '--space-2' },
  { label: '--space-4', value: '--space-4' },
  { label: '--space-8', value: '--space-8' },
] as const

export function GapExample() {
  const [gap, setGap] = useState<(typeof gapOptions)[number]['value']>('--space-4')
  return <>
    <ExampleText>Six boxes with a gap from one of Mezzanine’s spacing tokens. The space only goes between them, never against the dashed edge.</ExampleText>
    <ValuePicker label="gap" options={gapOptions} value={gap} onChange={setGap} />
    <div className="lab-spacing-example lab-spacing-gap" style={{ '--lab-gap': `var(${gap})` } as CSSProperties}>
      {[1, 2, 3, 4, 5, 6].map((number) => <Block key={number}>Box {number}</Block>)}
    </div>
    <CssNotes name="gap" note={gapCssNotes.gap} level={3} />
  </>
}
