// The examples for the Fluid sizing page, in Foundations › Dimension › Size.
import { CssNotes, ExampleText } from '../../../../components/ExampleParts'
import { WidthFrame } from '../../../../components/WidthFrame'
import { fluidSizingCssNotes } from './fluidSizingContent'

export function FluidSpaceExample() {
  return <>
    <ExampleText>The space around the items, and between them, grows with the frame, between two limits.</ExampleText>
    <WidthFrame label="Fluid space">
      <div className="example-fluid-space">
        {['Item one', 'Item two', 'Item three'].map((item) => <div key={item} className="example-item mz-text-body-sm">{item}</div>)}
      </div>
    </WidthFrame>
    <CssNotes name="the fluid space" note={fluidSizingCssNotes.fluidSpace} level={3} />
  </>
}

export function FluidWidthExample() {
  return <>
    <ExampleText>The item is 60% of the frame’s width, but never narrower than 12rem or wider than 32rem.</ExampleText>
    <WidthFrame label="Fluid width">
      <div className="example-item example-fluid-width mz-text-body-sm">An item between 12rem and 32rem wide</div>
    </WidthFrame>
    <CssNotes name="the fluid width" note={fluidSizingCssNotes.fluidWidth} level={3} />
  </>
}

export function SafeMinimumExample() {
  return <>
    <ExampleText>The item asks for 20rem. In a frame narrower than that, it takes the full width instead of spilling out.</ExampleText>
    <WidthFrame label="Safe minimum" initialWidth="20rem">
      <div className="example-item example-safe-minimum mz-text-body-sm">An item that asks for 20rem</div>
    </WidthFrame>
    <CssNotes name="the safe minimum" note={fluidSizingCssNotes.safeMinimum} level={3} />
  </>
}
