// The example for the Reading order page, in Foundations › Layout.
import { useState } from 'react'
import { Button } from '@decocode/mezzanine'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { CssNotes, ExampleText } from '../../../../components/ExampleParts'
import { readingOrderCssNotes } from './readingOrderContent'

export function ReadingOrderExample() {
  const [reversed, setReversed] = useState(false)
  return <>
    <ExampleText>Tab moves focus through the buttons in their HTML order. Reversed on screen, focus jumps backwards across the row, because it still follows the HTML.</ExampleText>
    <PanelSwitch isSelected={reversed} onChange={setReversed}>Reverse on screen</PanelSwitch>
      <div className={`reading-order-row${reversed ? ' reading-order-reversed' : ''}`}>
        {[1, 2, 3].map((number) => <Button key={number} size="sm" hierarchy="secondary">Button {number}</Button>)}
      </div>
    <CssNotes name="the reversed row" note={readingOrderCssNotes.readingOrder} level={3} />
  </>
}
