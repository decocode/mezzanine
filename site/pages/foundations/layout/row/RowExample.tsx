// The example for the Row page, in Foundations › Layout. The items are Buttons.
import { useState } from 'react'
import { Button, Checkbox } from '@decocode/mezzanine'
import { CssNotes, ExampleText } from '../../../../components/ExampleParts'
import { WidthDemo } from '../../../../components/WidthFrame'
import { rowCssNotes } from './rowContent'

// One button at each level of the hierarchy, as a row of actions often has.
const buttons = [
  { label: 'Button A', hierarchy: 'primary' },
  { label: 'Button B', hierarchy: 'secondary' },
  { label: 'Button C', hierarchy: 'tertiary' },
] as const

export function RowExample() {
  const [isSwitching, setIsSwitching] = useState(true)
  return <>
    <ExampleText>Below the lg width, with the switch, the row becomes a column. Without it, the row squashes, then sticks out of the frame.</ExampleText>
    {/* The row can stick out of the frame, so the frame scrolls. */}
    <WidthDemo label="Row" className="row-demo" canOverflow code={rowCssNotes.row.code} controls={
      <Checkbox isSelected={isSwitching} onChange={setIsSwitching}>Switch to a column below the lg width</Checkbox>
    }>
      <div className={`example-row${isSwitching ? ' example-row-switch' : ''}`}>
        {buttons.map((button) => <Button key={button.hierarchy} hierarchy={button.hierarchy}>{button.label}</Button>)}
      </div>
    </WidthDemo>
    <CssNotes name="Row" note={rowCssNotes.row} level={3} showCode={false} />
  </>
}
