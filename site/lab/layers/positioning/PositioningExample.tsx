// The example for the Lab's Positioning page, in Layers.
import { useState, type CSSProperties } from 'react'
import { CssNotes, ExampleText, ValuePicker } from '../../shared/LabParts'
import { Block } from '../../shared/LabPrimitives'
import { positioningCssNotes } from './positioningContent'

const positionOptions = [
  { label: 'static', value: 'static' },
  { label: 'relative', value: 'relative' },
  { label: 'absolute', value: 'absolute' },
  { label: 'sticky', value: 'sticky' },
] as const

export function PositioningExample() {
  const [position, setPosition] = useState<(typeof positionOptions)[number]['value']>('static')
  return <>
    <ExampleText>The second box behaves differently with each position setting, most clearly when the dashed box scrolls.</ExampleText>
    <ValuePicker label="position" options={positionOptions} value={position} onChange={setPosition} />
    <div className="lab-position-stage" role="region" aria-label="Scrolling boxes, one of them positioned" tabIndex={0}>
      {[1, 2, 3, 4, 5, 6].map((number) => number === 2
        ? <div key={number} className="lab-block lab-position-item mz-text-body-sm" style={{ '--lab-position': position } as CSSProperties}>Box 2 is {position}</div>
        : <Block key={number}>Box {number}</Block>)}
    </div>
    <CssNotes name="the second box" note={positioningCssNotes.positioning} level={3} />
  </>
}
