// The example for the Lab's Row wrap page, in Side by side.
import { Badge } from '@decocode/mezzanine'
import { CssNotes, ExampleFrame } from '../../../shared/LabParts'
import { RowWrap } from '../../../shared/LabPrimitives'
import { rowWrapCssNotes } from './rowWrapContent'

export function RowWrapExample() {
  return <>
    <ExampleFrame label="Row wrap">
      <RowWrap>{['Fig', 'Watermelon', 'Kiwi', 'Pomegranate', 'Plum', 'Passion fruit', 'Apple', 'Dragon fruit', 'Pear'].map((tag) => <Badge key={tag}>{tag}</Badge>)}</RowWrap>
    </ExampleFrame>
    <CssNotes name="Row wrap" note={rowWrapCssNotes.rowWrap} level={3} />
  </>
}
