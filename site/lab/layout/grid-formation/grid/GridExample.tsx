// The example for the Lab's Grid page, in Grid formation.
import { useState, type CSSProperties } from 'react'
import { CssNotes, ExampleFrame, ExampleHeading, ExampleText, ValuePicker } from '../../../shared/LabParts'
import { AutoFillGrid, Block, FixedColumnGrid, FixedColumnGridItem } from '../../../shared/LabPrimitives'
import { gridCssNotes } from './gridContent'

const columnOptions = [
  { label: '1fr 1fr 1fr', value: '1fr 1fr 1fr' },
  { label: '1fr 2fr', value: '1fr 2fr' },
  { label: '8rem 1fr', value: '8rem 1fr' },
] as const

function GridColumnsExample() {
  const [columns, setColumns] = useState<(typeof columnOptions)[number]['value']>('1fr 1fr 1fr')
  return <>
    <ExampleText>Six boxes in a grid. Whatever the columns, the first box keeps spanning two of them.</ExampleText>
    <ValuePicker label="grid-template-columns" options={columnOptions} value={columns} onChange={setColumns} />
    <ExampleFrame label="Grid">
        <div className="lab-grid-example" style={{ '--lab-grid-columns': columns } as CSSProperties}>
          <div className="lab-block lab-grid-wide mz-text-body-sm">Box 1 spans two columns</div>
          {[2, 3, 4, 5, 6].map((number) => <Block key={number}>Box {number}</Block>)}
        </div>
    </ExampleFrame>
    <CssNotes name="Grid" note={gridCssNotes.grid} level={3} />
  </>
}

const columnCountOptions = [
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
] as const

// Grid's two common recipes, shown on the Grid page under their own third-level headings.
function FixedColumnGridExample() {
  const [count, setCount] = useState<(typeof columnCountOptions)[number]['value']>('3')
  return <>
    <ExampleText>Whatever the number of columns, the first item always spans two of them.</ExampleText>
    <ValuePicker label="Columns" options={columnCountOptions} value={count} onChange={setCount} />
    <ExampleFrame label="Columns">
      <FixedColumnGrid columns={Number(count)}>
        <FixedColumnGridItem span={2}><Block>Item one spans two columns</Block></FixedColumnGridItem>
        {['two', 'three', 'four', 'five', 'six'].map((word) => <Block key={word}>Item {word}</Block>)}
      </FixedColumnGrid>
    </ExampleFrame>
    <CssNotes name="a set number of columns" note={gridCssNotes.fixedColumnGrid} level={4} />
  </>
}

function AutoFillGridExample() {
  return <>
    <ExampleText>The grid works out its own number of columns, from three to two to one, just from how many 10rem tiles fit. You never choose the number.</ExampleText>
    <ExampleFrame label="Grid">
      <AutoFillGrid min="10rem">{['A', 'B', 'C', 'D', 'E', 'F'].map((letter) => <Block key={letter}>Tile {letter}</Block>)}</AutoFillGrid>
    </ExampleFrame>
    <CssNotes name="as many columns as fit" note={gridCssNotes.autoFillGrid} level={4} />
  </>
}

// The Grid page: the technique, then its two common recipes.
export function GridExample() {
  return <>
    <GridColumnsExample />
    <ExampleHeading>A set number of columns</ExampleHeading>
    <FixedColumnGridExample />
    <ExampleHeading>As many columns as fit</ExampleHeading>
    <AutoFillGridExample />
  </>
}
