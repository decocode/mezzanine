// The example for the Row switch page, in Foundations › Layout. The items are Buttons.
import { useState } from 'react'
import { Button, Switch } from '@decocode/mezzanine'
import { CssNotes, ExampleText } from '../../../../components/ExampleParts'
import { WidthDemo } from '../../../../components/WidthFrame'
import { rowSwitchCssNotes } from './rowSwitchContent'

// One button at each level of the hierarchy, as a row of actions often has.
const buttons = [
  { label: 'Button A', hierarchy: 'primary' },
  { label: 'Button B', hierarchy: 'secondary' },
  { label: 'Button C', hierarchy: 'tertiary' },
] as const

export function RowSwitchExample() {
  const [isSwitching, setIsSwitching] = useState(true)
  return <>
    <ExampleText>Below the lg width, with the switch, the row becomes a column. Without it, the row squashes, then sticks out of the frame.</ExampleText>
    {/* Without the switch, the row can stick out of the frame, so the frame scrolls. */}
    <WidthDemo label="Row switch" className="row-switch-demo" canOverflow code={rowSwitchCssNotes.rowSwitch.code} controls={
      <Switch isSelected={isSwitching} onChange={setIsSwitching}>Switch to a column below the lg width</Switch>
    }>
      <div className={isSwitching ? 'row-switch' : 'row'}>
        {buttons.map((button) => <Button key={button.hierarchy} hierarchy={button.hierarchy}>{button.label}</Button>)}
      </div>
    </WidthDemo>
    <CssNotes name="Row switch" note={rowSwitchCssNotes.rowSwitch} level={3} showCode={false} />
  </>
}
