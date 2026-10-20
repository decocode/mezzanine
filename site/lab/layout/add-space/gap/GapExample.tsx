// The example for the Lab's Gap page, in Add space.
import { CssNotes, ExampleText } from '../../../shared/LabParts'
import { Block } from '../../../shared/LabPrimitives'
import { gapCssNotes } from './gapContent'

export function GapExample() {
  return <>
    <ExampleText>Three boxes with a gap. The space only goes between them, never against the dashed edge.</ExampleText>
    <div className="lab-spacing-example lab-spacing-gap">{[1, 2, 3].map((number) => <Block key={number}>Box {number}</Block>)}</div>
    <CssNotes name="gap" note={gapCssNotes.gap} level={3} />
  </>
}
