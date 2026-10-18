// The example for the Lab's Row wrap and grow page, in Side by side.
import { CssNotes, ExampleFrame } from '../../../shared/LabParts'
import { Block, RowWrapAndGrow } from '../../../shared/LabPrimitives'
import { rowWrapAndGrowCssNotes } from './rowWrapAndGrowContent'

export function RowWrapAndGrowExample() {
  return <>
    <ExampleFrame label="Row wrap and grow" initialWidth={1100}>
      <RowWrapAndGrow>{['A', 'B', 'C', 'D'].map((letter) => <Block key={letter} tall>Box {letter}</Block>)}</RowWrapAndGrow>
    </ExampleFrame>
    <CssNotes name="Row wrap and grow" note={rowWrapAndGrowCssNotes.rowWrapAndGrow} level={3} />
  </>
}
