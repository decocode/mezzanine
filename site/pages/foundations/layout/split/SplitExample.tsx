// The example for the Split page, in Foundations › Layout: the library's mz-split class,
// in a dashed box that fills its demo, so resizing the window shows the second area wrapping underneath.
import { useState, type CSSProperties } from 'react'
import { DemoBlock } from '@decocode/mezzanine'
import { CssNotes, PanelPicker } from '../../../../components/ExampleParts'
import { splitCssNotes } from './splitContent'

type SplitFraction = '1/4' | '1/3' | '1/2' | 'auto-start'

const fractionOptions: readonly { label: string; value: SplitFraction }[] = [
  { label: '1/4', value: '1/4' },
  { label: '1/3', value: '1/3' },
  { label: '1/2', value: '1/2' },
  { label: 'Auto start', value: 'auto-start' },
]


export function SplitExample() {
  const [fraction, setFraction] = useState<SplitFraction>('1/3')
  return <>
    <DemoBlock align="stretch" className="split-demo" codeLanguage="css" codeView={splitCssNotes.split.code} endPanel={<PanelPicker label="Fraction" options={fractionOptions} value={fraction} onChange={setFraction} />}>
      <div className="split-frame">
        <div className="mz-split" data-fraction={fraction} style={{ '--split-gap': 'var(--space-3)' } as CSSProperties}>
          <div className="split-area mz-text-body-sm">First area</div>
          <div className="split-area mz-text-body-sm">Second area</div>
        </div>
      </div>
    </DemoBlock>
    <CssNotes name="Split" note={splitCssNotes.split} level={3} showCode={false} />
  </>
}
