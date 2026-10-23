// The examples for the Fluid sizing page, in Foundations › Dimension › Size. The items are Cards.
import { Card } from '@decocode/mezzanine'
import { CssNotes, ExampleText } from '../../../../components/ExampleParts'
import { WidthDemo } from '../../../../components/WidthFrame'
import { fluidSizingCssNotes } from './fluidSizingContent'

export function FluidSpaceExample() {
  return <>
    <ExampleText>The space around the items, and between them, grows with the frame, between two limits.</ExampleText>
    <WidthDemo label="Fluid space" code={fluidSizingCssNotes.fluidSpace.code}>
      <div className="example-fluid-space">
        {['Item one', 'Item two', 'Item three'].map((item) => <Card key={item}>{item}</Card>)}
      </div>
    </WidthDemo>
    <CssNotes name="the fluid space" note={fluidSizingCssNotes.fluidSpace} level={3} showCode={false} />
  </>
}

export function FluidWidthExample() {
  return <>
    <ExampleText>The item is 60% of the frame’s width, but never narrower than 12rem or wider than 32rem.</ExampleText>
    <WidthDemo label="Fluid width" code={fluidSizingCssNotes.fluidWidth.code}>
      <Card className="example-fluid-width">An item between 12rem and 32rem wide</Card>
    </WidthDemo>
    <CssNotes name="the fluid width" note={fluidSizingCssNotes.fluidWidth} level={3} showCode={false} />
  </>
}

export function SafeMinimumExample() {
  return <>
    <ExampleText>The item asks for 20rem. In a frame narrower than that, it takes the full width instead of spilling out.</ExampleText>
    <WidthDemo label="Safe minimum" code={fluidSizingCssNotes.safeMinimum.code}>
      <Card className="example-safe-minimum">An item that asks for 20rem</Card>
    </WidthDemo>
    <CssNotes name="the safe minimum" note={fluidSizingCssNotes.safeMinimum} level={3} showCode={false} />
  </>
}
