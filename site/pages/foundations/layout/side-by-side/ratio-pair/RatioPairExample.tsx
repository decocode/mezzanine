// The example for the Ratio pair page, in Foundations › Layout: the library's mz-ratio-pair class,
// in a box whose width can be chosen, so the second area can be seen wrapping underneath.
import { useState, type CSSProperties } from 'react'
import { CssNotes, ValuePicker } from '../../../../../components/ExampleParts'
import { ratioPairCssNotes } from './ratioPairContent'

type RatioPairFraction = '1/4' | '1/3' | '1/2' | 'auto-start'

const fractionOptions: readonly { label: string; value: RatioPairFraction }[] = [
  { label: '1/4', value: '1/4' },
  { label: '1/3', value: '1/3' },
  { label: '1/2', value: '1/2' },
  { label: 'Auto start', value: 'auto-start' },
]

const widthOptions = [
  { label: '320px', value: '20rem' },
  { label: '480px', value: '30rem' },
  { label: '720px', value: '45rem' },
] as const

export function RatioPairExample() {
  const [fraction, setFraction] = useState<RatioPairFraction>('1/3')
  const [width, setWidth] = useState<(typeof widthOptions)[number]['value']>('45rem')
  return <>
    <ValuePicker label="Fraction" options={fractionOptions} value={fraction} onChange={setFraction} />
    <ValuePicker label="Width" options={widthOptions} value={width} onChange={setWidth} />
    <div className="ratio-pair-frame" style={{ '--_frame-width': width } as CSSProperties}>
      <div className="mz-ratio-pair" data-fraction={fraction} style={{ '--ratio-pair-gap': 'var(--space-3)' } as CSSProperties}>
        <div className="ratio-pair-area mz-text-body-sm">First area</div>
        <div className="ratio-pair-area mz-text-body-sm">Second area</div>
      </div>
    </div>
    <CssNotes name="Ratio pair" note={ratioPairCssNotes.ratioPair} level={3} />
  </>
}
