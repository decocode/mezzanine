// The example for the Row page, in Foundations › Layout › Side by side.
import { useState, type CSSProperties } from 'react'
import { Checkbox } from '@decocode/mezzanine'
import { CssNotes, ExampleText, ValuePicker } from '../../../../../components/ExampleParts'
import { frameWidths, type FrameWidth } from '../frameWidths'
import { rowCssNotes } from './rowContent'

export function RowExample() {
  const [isSwitching, setIsSwitching] = useState(true)
  const [width, setWidth] = useState<FrameWidth>('45rem')
  return <>
    <ExampleText>Below the lg width, with the switch, the row becomes a column. Without it, the row squashes, then sticks out of the frame.</ExampleText>
    <Checkbox isSelected={isSwitching} onChange={setIsSwitching}>Switch to a column below the lg width</Checkbox>
    <ValuePicker label="Width" options={frameWidths} value={width} onChange={setWidth} />
    {/* The row can stick out of the frame, so the frame scrolls and keyboard users can reach it. */}
    <div className="side-by-side-frame" role="region" aria-label="Row frame" tabIndex={0} style={{ '--_frame-width': width } as CSSProperties}>
      <div className={`example-row${isSwitching ? ' example-row-switch' : ''}`}>
        {['Item one', 'Item two', 'Item three'].map((item) => <div key={item} className="side-by-side-item mz-text-body-sm">{item}</div>)}
      </div>
    </div>
    <CssNotes name="Row" note={rowCssNotes.row} level={3} />
  </>
}
