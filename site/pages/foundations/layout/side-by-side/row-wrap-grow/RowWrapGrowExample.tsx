// The example for the Row wrap grow page, in Foundations › Layout › Side by side.
import { useState, type CSSProperties } from 'react'
import { CssNotes, ValuePicker } from '../../../../../components/ExampleParts'
import { frameWidths, type FrameWidth } from '../frameWidths'
import { rowWrapGrowCssNotes } from './rowWrapGrowContent'

export function RowWrapGrowExample() {
  const [width, setWidth] = useState<FrameWidth>('45rem')
  return <>
    <ValuePicker label="Width" options={frameWidths} value={width} onChange={setWidth} />
    <div className="side-by-side-frame" style={{ '--_frame-width': width } as CSSProperties}>
      <div className="example-row-wrap-grow">
        {['A', 'B', 'C', 'D'].map((letter) => <div key={letter} className="side-by-side-item side-by-side-item-tall mz-text-body-sm">{`Item ${letter}`}</div>)}
      </div>
    </div>
    <CssNotes name="Row wrap grow" note={rowWrapGrowCssNotes.rowWrapGrow} level={3} />
  </>
}
