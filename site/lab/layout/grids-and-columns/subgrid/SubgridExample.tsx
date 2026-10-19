// The example for the Lab's Subgrid page, in Grids and columns.
import { useState } from 'react'
import { Button, Checkbox, Heading, Text } from '@decocode/mezzanine'
import { CssNotes, ExampleFrame, ExampleText } from '../../../shared/LabParts'
import { subgridCssNotes } from './subgridContent'

export function SubgridExample() {
  const [aligned, setAligned] = useState(true)
  const boxes = [
    { title: 'Short', text: 'One line.' },
    { title: 'A much longer title that wraps onto two lines', text: 'Some text that is longer than the others, so it takes up more lines than the boxes beside it.' },
    { title: 'Medium title', text: 'A little more text.' },
  ]
  return <>
    <ExampleText>With subgrid on, the text in each box starts at the same height and the buttons line up along the bottom, however long each heading is. Without it, they drift apart. These boxes are Lab-only, because Mezzanine’s Card component doesn’t use subgrid.</ExampleText>
    <Checkbox isSelected={aligned} onChange={setAligned}>Use subgrid</Checkbox>
    <ExampleFrame label="Subgrid boxes" initialWidth={900}>
        <div className={`lab-subgrid-list${aligned ? ' lab-subgrid-on' : ''}`}>
          {boxes.map((box) => <div key={box.title} className="lab-subgrid-box">
            <Heading level={3}>{box.title}</Heading>
            <Text elementType="p" className="mz-text-body-sm">{box.text}</Text>
            <div><Button size="sm" variant="secondary">Action</Button></div>
          </div>)}
        </div>
    </ExampleFrame>
    <CssNotes name="subgrid" note={subgridCssNotes.subgrid} level={3} />
  </>
}
