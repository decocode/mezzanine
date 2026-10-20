// The example for the Lab's Ratio pair page, in Side by side: the library's mz-ratio-pair class.
import { useState, type CSSProperties } from 'react'
import { CssNotes, ExampleFrame, ValuePicker } from '../../../shared/LabParts'
import { Block } from '../../../shared/LabPrimitives'
import { ratioPairCssNotes } from './ratioPairContent'

type RatioPairFraction = '1/4' | '1/3' | '1/2' | 'auto-start'

const fractionOptions: readonly { label: string; value: RatioPairFraction }[] = [
  { label: '1/4', value: '1/4' },
  { label: '1/3', value: '1/3' },
  { label: '1/2', value: '1/2' },
  { label: 'Auto start', value: 'auto-start' },
]

export function RatioPairExample() {
  const [fraction, setFraction] = useState<RatioPairFraction>('1/3')
  return <>
    <ValuePicker label="Fraction" options={fractionOptions} value={fraction} onChange={setFraction} />
    <ExampleFrame label="Ratio pair">
      <div className="mz-ratio-pair" data-fraction={fraction} style={{ '--ratio-pair-gap': 'var(--space-3)' } as CSSProperties}>
        <Block tall>First area</Block><Block tall>Second area</Block>
      </div>
    </ExampleFrame>
    <CssNotes name="Ratio pair" note={ratioPairCssNotes.ratioPair} level={3} />
  </>
}
