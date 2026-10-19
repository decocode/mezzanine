// The example for the Lab's RatioPair page, in Side by side.
import { useState } from 'react'
import { RatioPair, type RatioPairProps } from '@decocode/mezzanine'
import { CssNotes, ExampleFrame, ValuePicker } from '../../../shared/LabParts'
import { Block } from '../../../shared/LabPrimitives'
import { ratioPairCssNotes } from './ratioPairContent'

type RatioPairFraction = NonNullable<RatioPairProps['fraction']>

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
    <ExampleFrame label="RatioPair">
      <RatioPair fraction={fraction} gap={3}><Block tall>First area</Block><Block tall>Second area</Block></RatioPair>
    </ExampleFrame>
    <CssNotes name="RatioPair" note={ratioPairCssNotes.split} level={3} />
  </>
}
