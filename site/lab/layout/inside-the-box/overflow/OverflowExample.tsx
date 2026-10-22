// The example for the Lab's Overflow page, in Inside the box.
import { useState, type CSSProperties } from 'react'
import { CssNotes, ExampleText, ValuePicker } from '../../../shared/LabParts'
import { overflowCssNotes } from './overflowContent'

const overflowOptions = [
  { label: 'visible', value: 'visible' },
  { label: 'hidden', value: 'hidden' },
  { label: 'scroll', value: 'scroll' },
  { label: 'auto', value: 'auto' },
] as const

export function OverflowExample() {
  const [overflow, setOverflow] = useState<(typeof overflowOptions)[number]['value']>('visible')
  const canScroll = overflow === 'scroll' || overflow === 'auto'
  return <>
    <ExampleText>The box is 6rem tall, which isn’t enough for its text. The overflow setting decides what happens to the rest.</ExampleText>
    <ValuePicker label="overflow" options={overflowOptions} value={overflow} onChange={setOverflow} />
    <div className="lab-overflow-stage">
      <div
        className="lab-overflow-box mz-text-body-md"
        style={{ '--lab-overflow': overflow } as CSSProperties}
        {...(canScroll ? { role: 'region', 'aria-label': 'Box with too much text', tabIndex: 0 } : {})}
      >
        This box is only 6rem tall, but this text needs more room than that. With visible, the rest spills out over whatever comes next. With hidden, it’s cut off and nobody can reach it. With scroll or auto, you can scroll to read it.
      </div>
    </div>
    <CssNotes name="the box" note={overflowCssNotes.overflow} level={3} />
  </>
}
