// The example for the Lab's Fluid sizing page, in Container.
import { CssNotes, ExampleFrame, ExampleHeading, ExampleText } from '../../../shared/LabParts'
import { Block } from '../../../shared/LabPrimitives'
import { fluidSizingCssNotes } from './fluidSizingContent'

export function FluidSizingExample() {
  return <>
    <ExampleHeading>Fluid space</ExampleHeading>
    <ExampleText>The space inside the box, and between the items in it, grows with the frame, between two limits.</ExampleText>
    <ExampleFrame label="Fluid space">
      <div className="lab-fluid-space"><Block>Item one</Block><Block>Item two</Block><Block>Item three</Block></div>
    </ExampleFrame>
    <CssNotes name="the fluid space" note={fluidSizingCssNotes.fluidSpace} level={4} />
    <ExampleHeading>Fluid width</ExampleHeading>
    <ExampleText>The box is 60% of the frame’s width, but never narrower than 12rem or wider than 28rem.</ExampleText>
    <ExampleFrame label="Fluid width">
      <div className="lab-fluid-width"><Block>A box between 12rem and 28rem wide</Block></div>
    </ExampleFrame>
    <CssNotes name="the fluid width" note={fluidSizingCssNotes.fluidWidth} level={4} />
    <ExampleHeading>Safe minimums</ExampleHeading>
    <ExampleText>The box asks for 25rem. In a frame narrower than that, it takes the full width instead of spilling out.</ExampleText>
    <ExampleFrame label="Safe minimum">
      <div className="lab-safe-minimum"><Block>A box that asks for 25rem</Block></div>
    </ExampleFrame>
    <CssNotes name="the safe minimum" note={fluidSizingCssNotes.safeMinimum} level={4} />
  </>
}
