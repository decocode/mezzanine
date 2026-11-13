// The example for the Row wrap page, in Foundations › Layout.
import { Badge } from '@decocode/mezzanine'
import { CssNotes } from '../../../../components/ExampleParts'
import { WidthDemo } from '../../../../components/WidthFrame'
import { rowWrapCssNotes } from './rowWrapContent'

// Tags of different lengths, so the rows end at different places.
const tags = ['Fig', 'Watermelon', 'Kiwi', 'Pomegranate', 'Plum', 'Passion fruit', 'Apple', 'Dragon fruit', 'Pear']

export function RowWrapExample() {
  return <>
    <WidthDemo label="Row wrap" code={rowWrapCssNotes.rowWrap.code}>
      <div className="row-wrap">{tags.map((tag) => <Badge key={tag} purpose="accent">{tag}</Badge>)}</div>
    </WidthDemo>
    <CssNotes name="Row wrap" note={rowWrapCssNotes.rowWrap} level={3} showCode={false} />
  </>
}
