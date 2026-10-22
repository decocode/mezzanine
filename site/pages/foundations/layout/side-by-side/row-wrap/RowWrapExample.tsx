// The example for the Row wrap page, in Foundations › Layout › Side by side.
import { useState, type CSSProperties } from 'react'
import { Badge } from '@decocode/mezzanine'
import { CssNotes, ValuePicker } from '../../../../../components/ExampleParts'
import { frameWidths, type FrameWidth } from '../frameWidths'
import { rowWrapCssNotes } from './rowWrapContent'

// Tags of different lengths, so the rows end at different places.
const tags = ['Fig', 'Watermelon', 'Kiwi', 'Pomegranate', 'Plum', 'Passion fruit', 'Apple', 'Dragon fruit', 'Pear']

export function RowWrapExample() {
  const [width, setWidth] = useState<FrameWidth>('45rem')
  return <>
    <ValuePicker label="Width" options={frameWidths} value={width} onChange={setWidth} />
    <div className="side-by-side-frame" style={{ '--_frame-width': width } as CSSProperties}>
      <div className="example-row-wrap">{tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div>
    </div>
    <CssNotes name="Row wrap" note={rowWrapCssNotes.rowWrap} level={3} />
  </>
}
