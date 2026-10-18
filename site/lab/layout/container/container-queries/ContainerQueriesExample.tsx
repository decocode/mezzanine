// The example for the Lab's Container queries page, in Container.
import { Card, Heading, Text } from '@decocode/mezzanine'
import { CssNotes, ExampleFrame, ExampleHeading, ExampleText } from '../../../shared/LabParts'
import { containerQueriesCssNotes } from './containerQueriesContent'

// The same tile adapts to whichever slot it is placed in.
function ContainerTile() {
  return <div className="lab-cq-slot">
      <Card>
        <div className="lab-cq-tile">
          <div className="lab-block lab-cq-image mz-text-body-sm">Image</div>
          <div className="lab-cq-text">
            <Heading level={4}>Tile title</Heading>
            <Text elementType="p" className="mz-text-body-md">The tile stacks in narrow space and sits side by side when its slot is at least 26rem.</Text>
          </div>
        </div>
      </Card>
  </div>
}

export function ContainerQueriesExample() {
  return <>
    <ExampleHeading>A narrow slot and a wide slot</ExampleHeading>
    <ExampleText>Here is the same tile twice, side by side. Each one looks at its own slot, so the narrow one stacks its image above the text and the wide one puts them side by side. Make the frame narrower and the wide slot drops underneath and changes too. Inside, the tile uses a real Mezzanine Card.</ExampleText>
    <ExampleFrame label="A narrow slot and a wide slot" initialWidth={1100}>
      <div className="lab-two-slots">
        <div><Text elementType="p" className="mz-text-label-md">Narrow slot, like a sidebar</Text><ContainerTile /></div>
        <div><Text elementType="p" className="mz-text-label-md">Wide slot, like the main column</Text><ContainerTile /></div>
      </div>
    </ExampleFrame>
    <CssNotes name="the two slots" note={containerQueriesCssNotes.twoSlots} />
    <ExampleHeading>In a frame you can resize</ExampleHeading>
    <ExampleText>Above about 26rem, the tile changes layout, while the window stays the same size.</ExampleText>
    <ExampleFrame label="In a frame you can resize" initialWidth={360}>
      <ContainerTile />
    </ExampleFrame>
    <CssNotes name="the tile" note={containerQueriesCssNotes.containerTile} />
  </>
}
