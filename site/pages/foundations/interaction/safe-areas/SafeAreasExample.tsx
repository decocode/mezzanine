// The example for the Safe areas page, in Foundations › Interaction.
import { useRef } from 'react'
import { Cell, Column, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { CssNotes, ExampleText } from '../../../../components/ExampleParts'
import { useMediaQuery, useSafeAreas } from '../../../../components/browserLogic'
import { safeAreasCssNotes } from './safeAreasContent'

export function SafeAreasExample() {
  const safe = useRef<HTMLDivElement>(null)
  const insets = useSafeAreas(safe)
  const standalone = useMediaQuery('(display-mode: standalone)')
  return <>
    <ExampleText>On a laptop the safe areas are zero. Installed as an app here: {standalone ? 'yes' : 'no'}.</ExampleText>
    <div ref={safe} className="safe-areas-probe" aria-hidden="true" />
    <div className="documentation-table">
      <Table aria-label="Safe areas">
        <TableHeader><Column isRowHeader>Measurement</Column><Column>Value</Column></TableHeader>
        <TableBody>
          {insets.map((item) => <Row id={item.label} key={item.label}><Cell>Safe area: {item.label}</Cell><Cell>{item.pixels}</Cell></Row>)}
        </TableBody>
      </Table>
    </div>
    <ExampleText>To clear a notch without losing its normal space, content can take whichever is larger: its usual padding, or the safe area. In CSS that’s <code>max(your spacing, env(safe-area-inset-left))</code>.</ExampleText>
    <CssNotes name="the measurements" note={safeAreasCssNotes.safeAreas} level={3} />
  </>
}
