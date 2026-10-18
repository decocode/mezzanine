// The example for the Lab’s Reading order page, outside Layout.
import { useState } from 'react'
import { Button, Checkbox } from '@decocode/mezzanine'
import { CssNotes, ExampleText } from './LabParts'
import { cssNotes } from './layoutLabContent'

export function ReadingOrderExample() {
  const [reversed, setReversed] = useState(false)
  return <>
    <ExampleText>Tab moves focus through the buttons in their HTML order. Reversed on screen, focus jumps backwards across the row, because it still follows the HTML.</ExampleText>
    <Checkbox isSelected={reversed} onChange={setReversed}>Reverse on screen</Checkbox>
      <div className={`lab-order-row${reversed ? ' lab-order-reversed' : ''}`}>
        {[1, 2, 3].map((number) => <Button key={number} size="sm" variant="secondary">Button {number}</Button>)}
      </div>
    <CssNotes name="the reversed row" note={cssNotes.readingOrder} level={3} />
  </>
}
