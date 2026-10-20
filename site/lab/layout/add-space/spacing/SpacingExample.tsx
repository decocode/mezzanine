// The example for the Lab's Spacing page, in Add space.
import { useState, type CSSProperties } from 'react'
import { CssNotes, ExampleHeading, ExampleText, ValuePicker } from '../../../shared/LabParts'
import { Block } from '../../../shared/LabPrimitives'
import { SpacingScale } from './SpacingScale'
import { spacingCssNotes } from './spacingPageContent'

const gapOptions = [
  { label: '--space-2', value: '--space-2' },
  { label: '--space-4', value: '--space-4' },
  { label: '--space-8', value: '--space-8' },
] as const

export function SpacingExample() {
  const [gap, setGap] = useState<(typeof gapOptions)[number]['value']>('--space-4')
  return <>
    <ExampleHeading>Spacing tokens</ExampleHeading>
    <ExampleText>These are the real tokens, with their values read live.</ExampleText>
    <SpacingScale />
    <ExampleHeading>Sizes from the spacing scale</ExampleHeading>
    <ExampleText>The gap comes from one of Mezzanine’s spacing tokens.</ExampleText>
    <ValuePicker label="gap" options={gapOptions} value={gap} onChange={setGap} />
    <div className="lab-spacing-scale" style={{ '--lab-gap': `var(${gap})` } as CSSProperties}>
      {[1, 2, 3, 4, 5, 6].map((number) => <Block key={number}>Box {number}</Block>)}
    </div>
    <CssNotes name="the spacing scale" note={spacingCssNotes.spacingScale} />
  </>
}
