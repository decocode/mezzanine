// The example for the Lab's Box has content page, in Layout. The list's items are Cards; the
// picture's place is a plain item, as on an example Card.
import { useState } from 'react'
import { Button, Card, Checkbox, DemoArea, Text } from '@decocode/mezzanine'
import { CssNotes, ExampleHeading, ExampleText } from '../../shared/LabParts'
import { boxHasContentCssNotes } from './boxHasContentContent'

// Items are lettered A to Z, so the list stops at 26.
const maxItems = 26

export function BoxHasContentExample() {
  const [count, setCount] = useState(3)
  const [image, setImage] = useState(true)
  return <>
    <ExampleHeading>A list that counts its items</ExampleHeading>
    <ExampleText>Like the restaurant tables: up to four items, and the list is a single column. With a fifth, the same list spreads out into a grid, and with four again it goes back. It has {count} items now.</ExampleText>
    <DemoArea align="stretch" codeLanguage="css" codeView={boxHasContentCssNotes.quantityList.code} endPanel={<>
      <Button size="sm" hierarchy="secondary" isDisabled={count >= maxItems} onPress={() => setCount((value) => Math.min(maxItems, value + 1))}>Add an item</Button>
      <Button size="sm" hierarchy="secondary" isDisabled={count <= 1} onPress={() => setCount((value) => Math.max(1, value - 1))}>Remove an item</Button>
    </>}>
      <ul className="lab-has-list">
        {Array.from({ length: count }, (_, index) => <li key={index}><Card>{`Item ${String.fromCharCode(65 + index)}`}</Card></li>)}
      </ul>
    </DemoArea>
    <CssNotes name="the list" note={boxHasContentCssNotes.quantityList} showCode={false} />
    <ExampleHeading>A box that notices a picture</ExampleHeading>
    <ExampleText>With a picture, the box makes room for it, with the picture beside the text. Without one, the text simply takes the full width. It’s one box, not a separate “with picture” version.</ExampleText>
    <DemoArea align="stretch" codeLanguage="css" codeView={boxHasContentCssNotes.mediaObject.code} endPanel={<Checkbox isSelected={image} onChange={setImage}>Include a picture</Checkbox>}>
      <div className="lab-media">
        {image && <div className="example-item lab-media-image mz-text-body-sm">Picture</div>}
        <Text elementType="p" className="mz-text-body-md">Text beside the picture when there is one, and across the full width when there isn&apos;t.</Text>
      </div>
    </DemoArea>
    <CssNotes name="the image layout" note={boxHasContentCssNotes.mediaObject} showCode={false} />
  </>
}
