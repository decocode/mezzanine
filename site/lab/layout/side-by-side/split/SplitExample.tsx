// The example for the Lab's Split page, in Side by side.
import { useState } from 'react'
import { Split, type SplitProps } from '@decocode/mezzanine'
import { CssNotes, ExampleFrame, ValuePicker } from '../../../shared/LabParts'
import { Block } from '../../../shared/LabPrimitives'
import { splitCssNotes } from './splitContent'

type SplitFraction = NonNullable<SplitProps['fraction']>

const fractionOptions: readonly { label: string; value: SplitFraction }[] = [
  { label: '1/4', value: '1/4' },
  { label: '1/3', value: '1/3' },
  { label: '1/2', value: '1/2' },
  { label: 'Auto start', value: 'auto-start' },
]

export function SplitExample() {
  const [fraction, setFraction] = useState<SplitFraction>('1/3')
  return <>
    <ValuePicker label="Fraction" options={fractionOptions} value={fraction} onChange={setFraction} />
    <ExampleFrame label="Split">
      <Split fraction={fraction} gap={3}><Block tall>First area</Block><Block tall>Second area</Block></Split>
    </ExampleFrame>
    <CssNotes name="Split" note={splitCssNotes.split} level={3} />
  </>
}
