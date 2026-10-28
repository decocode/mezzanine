// The example for the Reading order page, in Foundations › Layout.
import { useState } from 'react'
import { Button } from '@decocode/mezzanine'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { CssNotes, ExampleText } from '../../../../components/ExampleParts'
import { WidthDemo } from '../../../../components/WidthFrame'
import { readingOrderCssNotes } from './readingOrderContent'

export function ReadingOrderExample() {
  const [reversed, setReversed] = useState(false)
  return <>
    <ExampleText>Tab moves focus through the buttons in their HTML order. Reversed on screen, focus jumps backwards across the row, because it still follows the HTML.</ExampleText>
    <WidthDemo label="Reading order" code={readingOrderCssNotes.readingOrder.code} controls={<PanelSwitch isSelected={reversed} onChange={setReversed}>Reverse on screen</PanelSwitch>}>
      <div className={`row${reversed ? ' row-reverse' : ''}`}>
        {[1, 2, 3].map((number) => <Button key={number} size="sm" hierarchy="secondary">Button {number}</Button>)}
      </div>
    </WidthDemo>
    <CssNotes name="the reversed row" note={readingOrderCssNotes.readingOrder} level={3} showCode={false} />
  </>
}
