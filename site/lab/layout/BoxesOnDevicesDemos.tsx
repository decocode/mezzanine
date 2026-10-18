import { useRef } from 'react'
import { Badge, Cell, Column, Row, Table, TableBody, TableHeader, Text } from '@decocode/mezzanine'
import { CssNotes, DemoText } from './LabParts'
import { cssNotes, environmentQueries } from './layoutLabContent'
import { useMediaQuery, useSafeAreas } from './layoutLabLogic'

function EnvironmentRow({ label, query }: { label: string; query: string }) {
  const matches = useMediaQuery(query)
  return <Row id={query}>
    <Cell>{label}</Cell>
    <Cell><code>{query}</code></Cell>
    <Cell>{matches ? <Badge variant="success">Yes</Badge> : <Badge>No</Badge>}</Cell>
  </Row>
}

export function MediaQueriesDemo() {
  return <>
    <DemoText>The answers come from this browser, and change as soon as a setting does, such as dark mode or increased contrast.</DemoText>
    <div className="lab-table">
      <Table aria-label="Environment media queries in this browser">
        <TableHeader>
          <Column isRowHeader>Question</Column>
          <Column>Media query</Column>
          <Column>True here?</Column>
        </TableHeader>
        <TableBody>{environmentQueries.map((item) => <EnvironmentRow key={item.query} {...item} />)}</TableBody>
      </Table>
    </div>
    <CssNotes name="environment queries" note={cssNotes.environment} level={3} />
    <DemoText>Only the last row is about width, and it’s about the whole window, which is the page frame’s concern. Reduced motion is missing on purpose: in Mezzanine, only the shared motion policy reads that preference.</DemoText>
  </>
}

export function SafeAreasDemo() {
  const safe = useRef<HTMLDivElement>(null)
  const insets = useSafeAreas(safe)
  const standalone = useMediaQuery('(display-mode: standalone)')
  return <>
    <DemoText>On a laptop the safe areas are zero. Installed as an app here: {standalone ? 'yes' : 'no'}.</DemoText>
    <div ref={safe} className="lab-safe-probe" aria-hidden="true" />
    <div className="lab-table">
      <Table aria-label="Safe areas">
        <TableHeader><Column isRowHeader>Measurement</Column><Column>Value</Column></TableHeader>
        <TableBody>
          {insets.map((item) => <Row id={item.label} key={item.label}><Cell>Safe area: {item.label}</Cell><Cell>{item.pixels}</Cell></Row>)}
        </TableBody>
      </Table>
    </div>
    <DemoText>To clear a notch without losing its normal space, content can take whichever is larger: its usual padding, or the safe area. In CSS that’s <code>max(your spacing, env(safe-area-inset-left))</code>.</DemoText>
    <CssNotes name="the measurements" note={cssNotes.safeAreas} level={3} />
  </>
}

export function TargetSizeDemo() {
  return <>
    <DemoText>Two squares showing the smallest a tap or click target should be. The first is the minimum WCAG 2.2 allows. The second is what Mezzanine’s controls use.</DemoText>
      <div className="lab-targets">
        <div><span className="lab-target lab-target-wcag" aria-hidden="true" /><Text elementType="p" className="mz-text-body-sm">24px: the WCAG 2.2 AA minimum</Text></div>
        <div><span className="lab-target lab-target-comfortable" aria-hidden="true" /><Text elementType="p" className="mz-text-body-sm">44px: what Mezzanine&apos;s controls use, as --target-size</Text></div>
      </div>
    <CssNotes name="target size" note={cssNotes.targetSize} level={3} />
  </>
}

