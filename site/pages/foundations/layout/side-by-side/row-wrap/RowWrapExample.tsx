// The example for the Row wrap page, in Foundations › Layout › Side by side.
import { Badge } from '@decocode/mezzanine'
import { CssNotes } from '../../../../../components/ExampleParts'
import { WidthFrame } from '../../../../../components/WidthFrame'
import { rowWrapCssNotes } from './rowWrapContent'

// Tags of different lengths, so the rows end at different places.
const tags = ['Fig', 'Watermelon', 'Kiwi', 'Pomegranate', 'Plum', 'Passion fruit', 'Apple', 'Dragon fruit', 'Pear']

export function RowWrapExample() {
  return <>
    <WidthFrame label="Row wrap">
      <div className="example-row-wrap">{tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div>
    </WidthFrame>
    <CssNotes name="Row wrap" note={rowWrapCssNotes.rowWrap} level={3} />
  </>
}
