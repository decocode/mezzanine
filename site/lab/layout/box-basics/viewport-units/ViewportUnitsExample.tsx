// The example for the Lab's Viewport units page, in Box basics.
import { useRef } from 'react'
// Mezzanine's Table parts Column and Row are renamed here, so they aren't confused with the Lab's Column.
import { Cell, CodeBlock, Column as TableColumn, Row as TableRow, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { CssNotes, ExampleText } from '../../../shared/LabParts'
import { useProbeHeights } from '../../../shared/labLogic'
import { viewportUnitsCssNotes } from './viewportUnitsContent'

export function ViewportUnitsExample() {
  const probes = useRef<HTMLDivElement>(null)
  const heights = useProbeHeights(probes)
  return <>
    <ExampleText>Every page needs this tag in its HTML. Without it, phones pretend to be a wide screen and shrink the whole page to fit, so viewport units would measure that pretend screen instead of the real one.</ExampleText>
    <CodeBlock>{'<meta name="viewport" content="width=device-width, initial-scale=1">'}</CodeBlock>
    <ExampleText>On a laptop the four heights match. On a phone they differ once the browser’s toolbar hides: svh and lvh stay apart, and dvh changes.</ExampleText>
    <div ref={probes} className="lab-probes" aria-hidden="true">
      <div data-probe="100vh" className="lab-probe-vh" />
      <div data-probe="100svh (toolbars shown)" className="lab-probe-svh" />
      <div data-probe="100lvh (toolbars hidden)" className="lab-probe-lvh" />
      <div data-probe="100dvh (right now)" className="lab-probe-dvh" />
    </div>
    {heights.length > 0 && <div className="lab-table">
      <Table aria-label="Viewport heights">
        <TableHeader><TableColumn isRowHeader>Measurement</TableColumn><TableColumn>Value</TableColumn></TableHeader>
        <TableBody>
          {heights.map((item) => <TableRow id={item.label} key={item.label}><Cell><code>{item.label}</code></Cell><Cell>{item.pixels}px</Cell></TableRow>)}
        </TableBody>
      </Table>
    </div>}
    <CssNotes name="the measurements" note={viewportUnitsCssNotes.viewport} level={3} />
  </>
}
