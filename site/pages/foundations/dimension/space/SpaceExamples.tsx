// The examples for the Space page, in Foundations › Dimension. The margin example's items are Cards, and the gap example's are Badges.
import { useState, type CSSProperties } from 'react'
import { Badge, Card, DemoBlock } from '@decocode/mezzanine'
import { CssNotes, ExampleText, PanelPicker } from '../../../../components/ExampleParts'
import { spaceCssNotes } from './spaceContent'

const paddingOptions = [
  { label: '--space-2', value: '--space-2' },
  { label: '--space-4', value: '--space-4' },
  { label: '--space-8', value: '--space-8' },
] as const

const gapOptions = [
  { label: '--space-0', value: '--space-0' },
  { label: '--space-4', value: '--space-4' },
  { label: '--space-8', value: '--space-8' },
] as const

export function MarginExample() {
  return <>
    <ExampleText>Three items, each with a margin. Each item keeps its distance on every side, so there’s space against the dashed edge too.</ExampleText>
    <DemoBlock align="stretch" codeLanguage="css" codeView={spaceCssNotes.margin.code}>
      <div className="space-area space-margin">{[1, 2, 3].map((number) => <Card key={number}>{`Item ${number}`}</Card>)}</div>
    </DemoBlock>
    <CssNotes name="margin" note={spaceCssNotes.margin} level={3} showCode={false} />
  </>
}

export function PaddingExample() {
  const [padding, setPadding] = useState<(typeof paddingOptions)[number]['value']>('--space-4')
  return <>
    <ExampleText>An element with its content in a different shade. More padding moves the content in and makes the element grow.</ExampleText>
    <DemoBlock align="stretch" codeLanguage="css" codeView={spaceCssNotes.padding.code} endPanel={<PanelPicker label="padding" options={paddingOptions} value={padding} onChange={setPadding} />}>
      <div className="space-padding" style={{ '--_padding': `var(${padding})` } as CSSProperties}>
        <div className="space-content mz-text-body-md">Content</div>
      </div>
    </DemoBlock>
    <CssNotes name="padding" note={spaceCssNotes.padding} level={3} showCode={false} />
  </>
}

export function GapExample() {
  const [gap, setGap] = useState<(typeof gapOptions)[number]['value']>('--space-4')
  return <>
    <ExampleText>Six items with a gap from one of Mezzanine’s spacing tokens. The space only goes between them, never around the outside.</ExampleText>
    <DemoBlock align="stretch" codeLanguage="css" codeView={spaceCssNotes.gap.code} endPanel={<PanelPicker label="gap" options={gapOptions} value={gap} onChange={setGap} />}>
      <div className="space-gap" style={{ '--_gap': `var(${gap})` } as CSSProperties}>
        {[1, 2, 3, 4, 5, 6].map((number) => <Badge key={number}>{`Item ${number}`}</Badge>)}
      </div>
    </DemoBlock>
    <CssNotes name="gap" note={spaceCssNotes.gap} level={3} showCode={false} />
  </>
}
