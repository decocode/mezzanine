// The example for the Ratio pair page, in Foundations › Layout: the library's mz-ratio-pair class,
// in a dashed box that fills its demo, so resizing the window shows the second area wrapping underneath.
import { useState, type CSSProperties } from 'react'
import { DemoArea } from '@decocode/mezzanine'
import { CssNotes, PanelPicker } from '../../../../components/ExampleParts'
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
    <DemoArea align="stretch" className="ratio-pair-demo" codeLanguage="css" codeView={ratioPairCssNotes.ratioPair.code} endPanel={<PanelPicker label="Fraction" options={fractionOptions} value={fraction} onChange={setFraction} />}>
      <div className="ratio-pair-frame">
        <div className="mz-ratio-pair" data-fraction={fraction} style={{ '--ratio-pair-gap': 'var(--space-3)' } as CSSProperties}>
          <div className="ratio-pair-area mz-text-body-sm">First area</div>
          <div className="ratio-pair-area mz-text-body-sm">Second area</div>
        </div>
      </div>
    </DemoArea>
    <CssNotes name="Ratio pair" note={ratioPairCssNotes.ratioPair} level={3} showCode={false} />
  </>
}
