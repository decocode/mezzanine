// The example for the Lab's Row page, in Side by side.
import { useState } from 'react'
import { Checkbox } from '@decocode/mezzanine'
import { CssNotes, ExampleFrame, ExampleText } from '../../../shared/LabParts'
import { Block, Row } from '../../../shared/LabPrimitives'
import { rowCssNotes } from './rowContent'

export function RowExample() {
  const [isSwitching, setIsSwitching] = useState(true)
  return <>
    <ExampleText>Below about 30rem, with the switch, the row becomes a column. Without it, the row squashes, then sticks out of the frame.</ExampleText>
    <Checkbox isSelected={isSwitching} onChange={setIsSwitching}>Switch to a column below 30rem</Checkbox>
    <ExampleFrame label="Row" canOverflow>
      <Row switchAt={isSwitching ? '30rem' : undefined}><Block>Item one</Block><Block>Item two</Block><Block>Item three</Block></Row>
    </ExampleFrame>
    <CssNotes name="Row" note={rowCssNotes.row} level={3} />
  </>
}
