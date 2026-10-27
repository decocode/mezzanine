// The example for the Positioning page, in Foundations › Layers.
import { useState, type CSSProperties } from 'react'
import { DemoBlock } from '@decocode/mezzanine'
import { CssNotes, ExampleText, PanelPicker } from '../../../../components/ExampleParts'
import { positioningCssNotes } from './positioningContent'

const positionOptions = [
  { label: 'static', value: 'static' },
  { label: 'relative', value: 'relative' },
  { label: 'absolute', value: 'absolute' },
  { label: 'sticky', value: 'sticky' },
] as const

export function PositioningExample() {
  const [position, setPosition] = useState<(typeof positionOptions)[number]['value']>('static')
  return <>
    <ExampleText>The second box behaves differently with each position setting, most clearly when the dashed box scrolls.</ExampleText>
    <DemoBlock align="stretch" codeLanguage="css" codeView={positioningCssNotes.positioning.code} endPanel={<PanelPicker label="position" options={positionOptions} value={position} onChange={setPosition} />}>
      <div className="layers-position-stage" role="region" aria-label="Scrolling boxes, one of them positioned" tabIndex={0}>
        {[1, 2, 3, 4, 5, 6].map((number) => number === 2
          ? <div key={number} className="layers-block layers-position-item mz-text-body-sm" style={{ '--_position': position } as CSSProperties}>Box 2 is {position}</div>
          : <div key={number} className="layers-block mz-text-body-sm">Box {number}</div>)}
      </div>
    </DemoBlock>
    <CssNotes name="the second box" note={positioningCssNotes.positioning} level={3} showCode={false} />
  </>
}
