// The example for the Lab's Margin page, in Add space.
import { CssNotes, ExampleText } from '../../../shared/LabParts'
import { Block } from '../../../shared/LabPrimitives'
import { marginCssNotes } from './marginContent'

export function MarginExample() {
  return <>
    <ExampleText>Three boxes, each with a margin. Each box keeps its distance on every side, so there’s space against the dashed edge too.</ExampleText>
    <div className="lab-spacing-example lab-spacing-margin">{[1, 2, 3].map((number) => <Block key={number}>Box {number}</Block>)}</div>
    <CssNotes name="margin" note={marginCssNotes.margin} level={3} />
  </>
}
