// Examples for the Add space group of Lab Layout pages.
import { useState, type CSSProperties } from 'react'
import { Link } from '@decocode/mezzanine'
import { CssNotes, ExampleHeading, ExampleText, ValuePicker } from './LabParts'
import { Block } from './LabPrimitives'
import { cssNotes } from './layoutLabContent'
import type { StageExamples } from './StagePages'
import { SpacingScale } from '../../components/SpacingScale'

function MarginExample() {
  return <>
    <ExampleText>Three boxes, each with a margin. Each box keeps its distance on every side, so there’s space against the dashed edge too.</ExampleText>
    <div className="lab-spacing-example lab-spacing-margin">{[1, 2, 3].map((number) => <Block key={number}>Box {number}</Block>)}</div>
    <CssNotes name="margin" note={cssNotes.margin} level={3} />
  </>
}

const paddingOptions = [
  { label: '--space-2', value: '--space-2' },
  { label: '--space-4', value: '--space-4' },
  { label: '--space-8', value: '--space-8' },
] as const

function PaddingExample() {
  const [padding, setPadding] = useState<(typeof paddingOptions)[number]['value']>('--space-4')
  return <>
    <ExampleText>The box with its content in a different shade. More padding moves the content in and makes the box grow.</ExampleText>
    <ValuePicker label="padding" options={paddingOptions} value={padding} onChange={setPadding} />
    <div className="lab-padding-box" style={{ '--lab-padding': `var(${padding})` } as CSSProperties}>
      <div className="lab-box-content mz-text-body-md">Content</div>
    </div>
    <CssNotes name="padding" note={cssNotes.padding} level={3} />
  </>
}

const gapOptions = [
  { label: '--space-2', value: '--space-2' },
  { label: '--space-4', value: '--space-4' },
  { label: '--space-8', value: '--space-8' },
] as const

function SpacingExample() {
  return <>
    <ExampleHeading>Gap on the parent</ExampleHeading>
    <ExampleText>Three boxes with a gap. The space only goes between them, never against the dashed edge.</ExampleText>
    <div className="lab-spacing-example lab-spacing-gap">{[1, 2, 3].map((number) => <Block key={number}>Box {number}</Block>)}</div>
    <CssNotes name="gap" note={cssNotes.gap} />
  </>
}

// The spacing scale is how Mezzanine uses spacing, so it sits in that half of the page.
function SpacingTokens() {
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
    <CssNotes name="the spacing scale" note={cssNotes.spacingScale} />
  </>
}

export const addSpaceExamples: StageExamples = {
  margin: { Example: MarginExample },
  padding: { Example: PaddingExample },
  gap: { Example: SpacingExample, Detail: SpacingTokens },
}
