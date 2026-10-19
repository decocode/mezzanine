// The example for the Lab's Column page, in Grids and columns.
import { CssNotes, ExampleFrame, ExampleText } from '../../../shared/LabParts'
import { Block, Column } from '../../../shared/LabPrimitives'
import { columnCssNotes } from './columnContent'

export function ColumnExample() {
  return <>
    <ExampleText>Three items, one above another, with the same space between each.</ExampleText>
    <ExampleFrame label="Column">
      <Column><Block>Item one</Block><Block>Item two</Block><Block>Item three</Block></Column>
    </ExampleFrame>
    <CssNotes name="Column" note={columnCssNotes.column} level={3} />
  </>
}
