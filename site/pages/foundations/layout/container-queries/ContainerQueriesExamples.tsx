// The examples for the Container queries page, in Foundations › Layout.
import { Card, Heading, Text } from '@decocode/mezzanine'
import { CssNotes, ExampleText } from '../../../../components/ExampleParts'
import { WidthDemo } from '../../../../components/WidthFrame'
import { containerQueriesCssNotes } from './containerQueriesContent'

// The same tile adapts to whichever slot it is placed in.
function Tile() {
  return <div className="example-slot">
    <Card>
      <div className="example-tile">
        <div className="example-item example-tile-image mz-text-body-sm">Image</div>
        <div className="example-tile-text">
          <Heading level={4}>Tile title</Heading>
          <Text elementType="p" className="mz-text-body-md">The tile stacks in narrow space and sits side by side when its slot is at least 26rem.</Text>
        </div>
      </div>
    </Card>
  </div>
}

export function TwoSlotsExample() {
  return <>
    <ExampleText>The same tile twice, side by side. Each one looks at its own slot, so the narrow one stacks its image above the text and the wide one puts them side by side. In a narrower frame, the wide slot drops underneath and changes too. The tile is a Card.</ExampleText>
    <WidthDemo label="A narrow slot and a wide slot" code={containerQueriesCssNotes.twoSlots.code}>
      <div className="example-two-slots">
        <div><Text elementType="p" className="mz-text-label-md">Narrow slot, like a side panel</Text><Tile /></div>
        <div><Text elementType="p" className="mz-text-label-md">Wide slot, like the main column</Text><Tile /></div>
      </div>
    </WidthDemo>
    <CssNotes name="the two slots" note={containerQueriesCssNotes.twoSlots} level={3} showCode={false} />
  </>
}

export function OneSlotExample() {
  return <>
    <ExampleText>Above about 26rem, the tile changes layout, while the window stays the same size.</ExampleText>
    <WidthDemo label="One slot" width="20rem" code={containerQueriesCssNotes.oneSlot.code}>
      <Tile />
    </WidthDemo>
    <CssNotes name="the tile" note={containerQueriesCssNotes.oneSlot} level={3} showCode={false} />
  </>
}
