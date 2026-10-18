// Examples for the Container group of Lab Layout pages.
import { Card, Heading, Text } from '@decocode/mezzanine'
import { CssNotes, ExampleFrame, ExampleHeading, ExampleText } from './LabParts'
import { Block } from './LabPrimitives'
import { cssNotes } from './layoutLabContent'
import type { StageExamples } from './StagePages'

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

function ContainerQueryExample() {
  return <>
    <ExampleHeading>A narrow slot and a wide slot</ExampleHeading>
    <ExampleText>Here is the same tile twice, side by side. Each one looks at its own slot, so the narrow one stacks its image above the text and the wide one puts them side by side. Make the frame narrower and the wide slot drops underneath and changes too. Inside, the tile uses a real Mezzanine Card.</ExampleText>
    <ExampleFrame label="A narrow slot and a wide slot" initialWidth={1100}>
      <div className="lab-two-slots">
        <div><Text elementType="p" className="mz-text-label-md">Narrow slot, like a sidebar</Text><ContainerTile /></div>
        <div><Text elementType="p" className="mz-text-label-md">Wide slot, like the main column</Text><ContainerTile /></div>
      </div>
    </ExampleFrame>
    <CssNotes name="the two slots" note={cssNotes.twoSlots} />
    <ExampleHeading>In a frame you can resize</ExampleHeading>
    <ExampleText>Above about 26rem, the tile changes layout, while the window stays the same size.</ExampleText>
    <ExampleFrame label="In a frame you can resize" initialWidth={360}>
      <ContainerTile />
    </ExampleFrame>
    <CssNotes name="the tile" note={cssNotes.containerTile} />
  </>
}

function FluidSizingExample() {
  return <>
    <ExampleHeading>Fluid space</ExampleHeading>
    <ExampleText>The space inside the box, and between the items in it, grows with the frame, between two limits.</ExampleText>
    <ExampleFrame label="Fluid space">
      <div className="lab-fluid-space"><Block>Item one</Block><Block>Item two</Block><Block>Item three</Block></div>
    </ExampleFrame>
    <CssNotes name="the fluid space" note={cssNotes.fluidSpace} level={4} />
    <ExampleHeading>Fluid width</ExampleHeading>
    <ExampleText>The box is 60% of the frame’s width, but never narrower than 12rem or wider than 28rem.</ExampleText>
    <ExampleFrame label="Fluid width">
      <div className="lab-fluid-width"><Block>A box between 12rem and 28rem wide</Block></div>
    </ExampleFrame>
    <CssNotes name="the fluid width" note={cssNotes.fluidWidth} level={4} />
    <ExampleHeading>Safe minimums</ExampleHeading>
    <ExampleText>The box asks for 25rem. In a frame narrower than that, it takes the full width instead of spilling out.</ExampleText>
    <ExampleFrame label="Safe minimum">
      <div className="lab-safe-minimum"><Block>A box that asks for 25rem</Block></div>
    </ExampleFrame>
    <CssNotes name="the safe minimum" note={cssNotes.safeMinimum} level={4} />
  </>
}

export const containerExamples: StageExamples = {
  containerQueries: { Example: ContainerQueryExample },
  fluidSizing: { Example: FluidSizingExample },
}
