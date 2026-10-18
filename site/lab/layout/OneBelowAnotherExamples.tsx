// Examples for the One below another group of Lab Layout pages.
import { useState } from 'react'
import { CssNotes, ExampleFrame, ExampleText, ValuePicker } from './LabParts'
import { Block, Column, Hero } from './LabPrimitives'
import { cssNotes } from './layoutLabContent'
import type { StageExamples } from './StagePages'

function ColumnExample() {
  return <>
    <ExampleText>Three items, one above another, with the same space between each.</ExampleText>
    <ExampleFrame label="Column">
      <Column><Block>Item one</Block><Block>Item two</Block><Block>Item three</Block></Column>
    </ExampleFrame>
    <CssNotes name="Column" note={cssNotes.column} level={3} />
  </>
}

const coverHeightOptions = [
  { label: '16rem', value: '16rem' },
  { label: '24rem', value: '24rem' },
  { label: '32rem', value: '32rem' },
] as const

function HeroExample() {
  const [height, setHeight] = useState<(typeof coverHeightOptions)[number]['value']>('24rem')
  return <>
    <ExampleText>The dashed line is the Hero box, set out like the opening section of a homepage. At every height, the headline stays in the middle, and the logo and “Scroll down” stay at the top and bottom edges.</ExampleText>
    <ValuePicker label="Minimum height" options={coverHeightOptions} value={height} onChange={setHeight} />
    <ExampleFrame label="Hero">
      <div className="lab-hero-example">
        <Hero
          minHeight={height}
          top={<p className="lab-hero-small mz-text-label-md">Logo</p>}
          bottom={<p className="lab-hero-small lab-hero-end mz-text-label-md">Scroll down</p>}
        >
          <p className="lab-hero-headline mz-text-heading-lg">Big headline</p>
        </Hero>
      </div>
    </ExampleFrame>
    <CssNotes name="Hero" note={cssNotes.hero} level={3} />
  </>
}

export const oneBelowAnotherExamples: StageExamples = {
  column: { Example: ColumnExample },
  hero: { Example: HeroExample },
}
