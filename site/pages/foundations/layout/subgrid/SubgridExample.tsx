// The example for the Subgrid page, in Foundations › Layout.
import { useState } from 'react'
import { Button, Card, Heading, Text } from '@decocode/mezzanine'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { CssNotes, ExampleText } from '../../../../components/ExampleParts'
import { WidthDemo } from '../../../../components/WidthFrame'
import { subgridCssNotes } from './subgridContent'

const items = [
  { title: 'Short', text: 'One line.' },
  { title: 'A much longer title that wraps onto two lines', text: 'Some text that is longer than the others, so it takes up more lines than the items beside it.' },
  { title: 'Medium title', text: 'A little more text.' },
]

export function SubgridExample() {
  const [isAligned, setIsAligned] = useState(true)
  return <>
    <ExampleText>With subgrid, the text in each item starts at the same height and the buttons line up along the bottom, however long each heading is. Without it, they drift apart.</ExampleText>
    <WidthDemo label="Subgrid" code={subgridCssNotes.subgrid.code} controls={<PanelSwitch isSelected={isAligned} onChange={setIsAligned}>Use subgrid</PanelSwitch>}>
      <div className={`example-subgrid-list${isAligned ? ' example-subgrid-on' : ''}`}>
        {items.map((item) => <Card key={item.title} className="example-subgrid-item">
          <Heading level={3}>{item.title}</Heading>
          <Text elementType="p" className="mz-text-body-sm">{item.text}</Text>
          <div><Button size="sm" hierarchy="secondary">Action</Button></div>
        </Card>)}
      </div>
    </WidthDemo>
    <CssNotes name="subgrid" note={subgridCssNotes.subgrid} level={3} showCode={false} />
  </>
}
