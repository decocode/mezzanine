// The example for the Lab's Gap page, in Add space.
import { useState, type CSSProperties } from 'react'
import { Link } from '@decocode/mezzanine'
import { CssNotes, ExampleHeading, ExampleText, ValuePicker } from '../../../shared/LabParts'
import { Block } from '../../../shared/LabPrimitives'
import { SpacingScale } from './SpacingScale'
import { gapCssNotes } from './gapContent'

const gapOptions = [
  { label: '--space-2', value: '--space-2' },
  { label: '--space-4', value: '--space-4' },
  { label: '--space-8', value: '--space-8' },
] as const

export function GapExample() {
  return <>
    <ExampleHeading>Gap on the parent</ExampleHeading>
    <ExampleText>Three boxes with a gap. The space only goes between them, never against the dashed edge.</ExampleText>
    <div className="lab-spacing-example lab-spacing-gap">{[1, 2, 3].map((number) => <Block key={number}>Box {number}</Block>)}</div>
    <CssNotes name="gap" note={gapCssNotes.gap} />
  </>
}

// The spacing scale is how Mezzanine uses spacing, so it sits in that half of the page.
export function SpacingTokens() {
  const [gap, setGap] = useState<(typeof gapOptions)[number]['value']>('--space-4')
  return <>
    <ExampleHeading>Spacing tokens</ExampleHeading>
    <ExampleText>Mezzanine’s spaces come from a scale of tokens built on a 4px step. The number in each name counts the steps, so <code>--space-4</code> is four steps: <code>1rem</code>, normally 16px. The tokens are in <code>rem</code>, so space grows when someone enlarges their text. <Link href="/site/lab/layout/box-basics/measuring-the-box">Measuring the box</Link> explains <code>rem</code>.</ExampleText>
    <ExampleText>These are the real tokens, with their values read live.</ExampleText>
    <SpacingScale />
    <ExampleHeading>Sizes from the spacing scale</ExampleHeading>
    <ExampleText>The gap comes from one of Mezzanine’s spacing tokens.</ExampleText>
    <ValuePicker label="gap" options={gapOptions} value={gap} onChange={setGap} />
      <div className="lab-spacing-scale" style={{ '--lab-gap': `var(${gap})` } as CSSProperties}>
        {[1, 2, 3, 4, 5, 6].map((number) => <Block key={number}>Box {number}</Block>)}
      </div>
    <CssNotes name="the spacing scale" note={gapCssNotes.spacingScale} />
  </>
}
