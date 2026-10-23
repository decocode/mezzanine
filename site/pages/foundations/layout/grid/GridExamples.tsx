// The examples for the Grid page, in Foundations › Layout: the technique, then its two common
// recipes.
import { useState, type CSSProperties } from 'react'
import { CssNotes, ExampleText, PanelPicker } from '../../../../components/ExampleParts'
import { WidthDemo } from '../../../../components/WidthFrame'
import { gridCssNotes } from './gridContent'

const columnOptions = [
  { label: '1fr 1fr 1fr', value: '1fr 1fr 1fr' },
  { label: '1fr 2fr', value: '1fr 2fr' },
  { label: '8rem 1fr', value: '8rem 1fr' },
] as const

const columnCountOptions = [
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
] as const

const otherItems = ['Item two', 'Item three', 'Item four', 'Item five', 'Item six']

export function GridExample() {
  const [columns, setColumns] = useState<(typeof columnOptions)[number]['value']>('1fr 1fr 1fr')
  return <>
    <ExampleText>Six items in a grid. Whatever the columns, the first item keeps spanning two of them.</ExampleText>
    <WidthDemo label="Grid" code={gridCssNotes.grid.code} controls={<PanelPicker label="grid-template-columns" options={columnOptions} value={columns} onChange={setColumns} />}>
      <div className="example-grid" style={{ '--_grid-columns': columns } as CSSProperties}>
        <div className="example-item example-grid-wide mz-text-body-sm">Item one spans two columns</div>
        {otherItems.map((item) => <div key={item} className="example-item mz-text-body-sm">{item}</div>)}
      </div>
    </WidthDemo>
    <CssNotes name="Grid" note={gridCssNotes.grid} level={3} showCode={false} />
  </>
}

export function SetNumberOfColumnsExample() {
  const [count, setCount] = useState<(typeof columnCountOptions)[number]['value']>('3')
  return <>
    <ExampleText>Whatever the number of columns, the first item always spans two of them.</ExampleText>
    <WidthDemo label="A set number of columns" code={gridCssNotes.setNumberOfColumns.code} controls={<PanelPicker label="Columns" options={columnCountOptions} value={count} onChange={setCount} />}>
      <div className="example-fixed-column-grid" style={{ '--_column-count': count } as CSSProperties}>
        <div className="example-item example-grid-wide mz-text-body-sm">Item one spans two columns</div>
        {otherItems.map((item) => <div key={item} className="example-item mz-text-body-sm">{item}</div>)}
      </div>
    </WidthDemo>
    <CssNotes name="a set number of columns" note={gridCssNotes.setNumberOfColumns} level={3} showCode={false} />
  </>
}

export function AsManyColumnsAsFitExample() {
  return <>
    <ExampleText>The grid works out its own number of columns, just from how many 12rem tiles fit. Nobody chooses the number.</ExampleText>
    <WidthDemo label="As many columns as fit" code={gridCssNotes.asManyColumnsAsFit.code}>
      <div className="example-auto-fill-grid">
        {['A', 'B', 'C', 'D', 'E', 'F'].map((letter) => <div key={letter} className="example-item mz-text-body-sm">Tile {letter}</div>)}
      </div>
    </WidthDemo>
    <CssNotes name="as many columns as fit" note={gridCssNotes.asManyColumnsAsFit} level={3} showCode={false} />
  </>
}
