// The example for the Row page, in Foundations › Layout › Side by side.
import { useState } from 'react'
import { Checkbox } from '@decocode/mezzanine'
import { CssNotes, ExampleText } from '../../../../../components/ExampleParts'
import { WidthDemo } from '../../../../../components/WidthFrame'
import { rowCssNotes } from './rowContent'

export function RowExample() {
  const [isSwitching, setIsSwitching] = useState(true)
  return <>
    <ExampleText>Below the lg width, with the switch, the row becomes a column. Without it, the row squashes, then sticks out of the frame.</ExampleText>
    <Checkbox isSelected={isSwitching} onChange={setIsSwitching}>Switch to a column below the lg width</Checkbox>
    {/* The row can stick out of the frame, so the frame scrolls. */}
    <WidthDemo label="Row" canOverflow code={rowCssNotes.row.code}>
      <div className={`example-row${isSwitching ? ' example-row-switch' : ''}`}>
        {['Item one', 'Item two', 'Item three'].map((item) => <div key={item} className="example-item mz-text-body-sm">{item}</div>)}
      </div>
    </WidthDemo>
    <CssNotes name="Row" note={rowCssNotes.row} level={3} showCode={false} />
  </>
}
