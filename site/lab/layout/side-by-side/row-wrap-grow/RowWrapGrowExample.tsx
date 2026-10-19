// The example for the Lab's Row wrap grow page, in Side by side.
import { CssNotes, ExampleFrame } from '../../../shared/LabParts'
import { Block, RowWrapGrow } from '../../../shared/LabPrimitives'
import { rowWrapGrowCssNotes } from './rowWrapGrowContent'

export function RowWrapGrowExample() {
  return <>
    <ExampleFrame label="Row wrap grow" initialWidth={1100}>
      <RowWrapGrow>{['A', 'B', 'C', 'D'].map((letter) => <Block key={letter} tall>Box {letter}</Block>)}</RowWrapGrow>
    </ExampleFrame>
    <CssNotes name="Row wrap grow" note={rowWrapGrowCssNotes.rowWrapGrow} level={3} />
  </>
}
