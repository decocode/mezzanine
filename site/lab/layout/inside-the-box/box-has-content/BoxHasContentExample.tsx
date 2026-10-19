// The example for the Lab's Box has content page, in Inside the box.
import { useState } from 'react'
import { Button, Checkbox, Text } from '@decocode/mezzanine'
import { CssNotes, ExampleHeading, ExampleText } from '../../../shared/LabParts'
import { boxHasContentCssNotes } from './boxHasContentContent'

export function BoxHasContentExample() {
  const [count, setCount] = useState(3)
  const [image, setImage] = useState(true)
  return <>
    <ExampleHeading>A list that counts its items</ExampleHeading>
    <ExampleText>Like the restaurant tables: up to four items, and the list is a single column. With a fifth, the same list spreads out into a grid, and with four again it goes back. It has {count} items now.</ExampleText>
    <div className="lab-controls">
      <Button size="sm" variant="secondary" onPress={() => setCount((value) => value + 1)}>Add an item</Button>
      <Button size="sm" variant="secondary" isDisabled={count <= 1} onPress={() => setCount((value) => Math.max(1, value - 1))}>Remove an item</Button>
    </div>
      <ul className="lab-has-list">
        {Array.from({ length: count }, (_, index) => <li key={index}><div className="lab-block mz-text-body-sm">Item {index + 1}</div></li>)}
      </ul>
    <CssNotes name="the list" note={boxHasContentCssNotes.quantityList} />
    <ExampleHeading>A box that notices a picture</ExampleHeading>
    <ExampleText>With a picture, the box makes room for it, with the picture beside the text. Without one, the text simply takes the full width. It’s one box, not a separate “with picture” version.</ExampleText>
    <Checkbox isSelected={image} onChange={setImage}>Include a picture</Checkbox>
      <div className="lab-media">
        {image && <div className="lab-block lab-media-image mz-text-body-sm">Picture</div>}
        <Text elementType="p" className="mz-text-body-md">Text beside the picture when there is one, and across the full width when there isn&apos;t.</Text>
      </div>
    <CssNotes name="the image layout" note={boxHasContentCssNotes.mediaObject} />
  </>
}
