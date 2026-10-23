// The examples for the Grid page, in Foundations › Layout: the technique, then its two common
// recipes. The items are Cards.
import { useState, type CSSProperties } from 'react'
import { CssNotes, ExampleCard, ExampleText, PanelPicker } from '../../../../components/ExampleParts'
import { WidthDemo } from '../../../../components/WidthFrame'
import { gridCssNotes } from './gridContent'

// Plain-English labels for each set of columns; the Code tab shows the CSS each one writes.
const columnOptions = [
  { label: 'Three equal columns', value: '1fr 1fr 1fr' },
  { label: 'One share, then two', value: '1fr 2fr' },
  { label: '8rem, then the rest', value: '8rem 1fr' },
] as const

const columnCountOptions = [
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
] as const

const otherItems = ['Item B', 'Item C', 'Item D', 'Item E', 'Item F']

export function GridExample() {
  const [columns, setColumns] = useState<(typeof columnOptions)[number]['value']>('1fr 1fr 1fr')
  return <>
    <ExampleText>Six items in a grid, with the first spanning two cells. Whatever the columns, it keeps both.</ExampleText>
    <WidthDemo label="Grid" code={gridCssNotes.grid.code} controls={<PanelPicker label="Columns" options={columnOptions} value={columns} onChange={setColumns} />}>
      <div className="example-grid" style={{ '--_grid-columns': columns } as CSSProperties}>
        <ExampleCard className="example-grid-wide" title="Item A" text="This card spans two columns." headingLevel={4} />
        {otherItems.map((item) => <ExampleCard key={item} title={item} headingLevel={4} />)}
      </div>
    </WidthDemo>
    <CssNotes name="column widths" note={gridCssNotes.grid} level={4} showCode={false} />
  </>
}

export function SetNumberOfColumnsExample() {
  const [count, setCount] = useState<(typeof columnCountOptions)[number]['value']>('3')
  return <>
    <ExampleText>The grid always has the same number of columns, each an equal share, however wide or narrow the space.</ExampleText>
    <WidthDemo label="A set number of columns" code={gridCssNotes.setNumberOfColumns.code} controls={<PanelPicker label="Columns" options={columnCountOptions} value={count} onChange={setCount} />}>
      <div className="example-fixed-column-grid" style={{ '--_column-count': count } as CSSProperties}>
        <ExampleCard className="example-grid-wide" title="Item A" text="This card spans two columns." headingLevel={4} />
        {otherItems.map((item) => <ExampleCard key={item} title={item} headingLevel={4} />)}
      </div>
    </WidthDemo>
    <CssNotes name="a set number of columns" note={gridCssNotes.setNumberOfColumns} level={4} showCode={false} />
  </>
}

export function AsManyColumnsAsFitExample() {
  return <>
    <ExampleText>The grid counts how many 12rem items fit across, and makes that many columns. Nobody chooses the number: a wide space gets more columns, and a narrow one gets fewer, down to one.</ExampleText>
    <WidthDemo label="As many columns as fit" code={gridCssNotes.asManyColumnsAsFit.code}>
      <div className="example-auto-fill-grid">
        {['A', 'B', 'C', 'D', 'E', 'F'].map((letter) => <ExampleCard key={letter} title={`Item ${letter}`} headingLevel={4} />)}
      </div>
    </WidthDemo>
    <CssNotes name="as many columns as fit" note={gridCssNotes.asManyColumnsAsFit} level={4} showCode={false} />
  </>
}
