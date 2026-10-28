// The example for the Row page, in Foundations › Layout. The items are Buttons.
import { Button } from '@decocode/mezzanine'
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
  return <>
    <ExampleText>Three items side by side, with the same space between each.</ExampleText>
    {/* In narrow space the row sticks out of the frame, so the frame scrolls. */}
    <WidthDemo label="Row" canOverflow code={rowCssNotes.row.code}>
      <div className="row">
        {buttons.map((button) => <Button key={button.hierarchy} hierarchy={button.hierarchy}>{button.label}</Button>)}
      </div>
    </WidthDemo>
    <CssNotes name="Row" note={rowCssNotes.row} level={3} showCode={false} />
  </>
}
