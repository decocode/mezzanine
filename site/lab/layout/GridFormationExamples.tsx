// Examples for the Grid formation group of Lab Layout pages.
import { useState, type CSSProperties } from 'react'
import { Button, Checkbox, Heading, Text } from '@decocode/mezzanine'
import { CssNotes, ExampleFrame, ExampleHeading, ExampleText, ValuePicker } from './LabParts'
import { AutoFillGrid, Block, FixedColumnGrid, FixedColumnGridItem } from './LabPrimitives'
import { cssNotes } from './layoutLabContent'
import type { StageExamples } from './StagePages'

const columnOptions = [
  { label: '1fr 1fr 1fr', value: '1fr 1fr 1fr' },
  { label: '1fr 2fr', value: '1fr 2fr' },
  { label: '8rem 1fr', value: '8rem 1fr' },
] as const

function GridExample() {
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
    <CssNotes name="Grid" note={cssNotes.grid} level={3} />
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
    <CssNotes name="a set number of columns" note={cssNotes.fixedColumnGrid} level={4} />
  </>
}

function AutoFillGridExample() {
  return <>
    <ExampleText>The grid works out its own number of columns, from three to two to one, just from how many 10rem tiles fit. You never choose the number.</ExampleText>
    <ExampleFrame label="Grid">
      <AutoFillGrid min="10rem">{['A', 'B', 'C', 'D', 'E', 'F'].map((letter) => <Block key={letter}>Tile {letter}</Block>)}</AutoFillGrid>
    </ExampleFrame>
    <CssNotes name="as many columns as fit" note={cssNotes.autoFillGrid} level={4} />
  </>
}

// The Grid page: the technique, then its two common recipes.
function GridPageExample() {
  return <>
    <GridExample />
    <ExampleHeading>A set number of columns</ExampleHeading>
    <FixedColumnGridExample />
    <ExampleHeading>As many columns as fit</ExampleHeading>
    <AutoFillGridExample />
  </>
}

function SubgridExample() {
  const [aligned, setAligned] = useState(true)
  const boxes = [
    { title: 'Short', text: 'One line.' },
    { title: 'A much longer title that wraps onto two lines', text: 'Some text that is longer than the others, so it takes up more lines than the boxes beside it.' },
    { title: 'Medium title', text: 'A little more text.' },
  ]
  return <>
    <ExampleText>With subgrid on, the text in each box starts at the same height and the buttons line up along the bottom, however long each heading is. Without it, they drift apart. These boxes are Lab-only, because Mezzanine’s Card component doesn’t use subgrid.</ExampleText>
    <Checkbox isSelected={aligned} onChange={setAligned}>Use subgrid</Checkbox>
    <ExampleFrame label="Subgrid boxes" initialWidth={900}>
        <div className={`lab-subgrid-list${aligned ? ' lab-subgrid-on' : ''}`}>
          {boxes.map((box) => <div key={box.title} className="lab-subgrid-box">
            <Heading level={3}>{box.title}</Heading>
            <Text elementType="p" className="mz-text-body-sm">{box.text}</Text>
            <div><Button size="sm" variant="secondary">Action</Button></div>
          </div>)}
        </div>
    </ExampleFrame>
    <CssNotes name="subgrid" note={cssNotes.subgrid} level={3} />
  </>
}

export const gridFormationExamples: StageExamples = {
  grid: { Example: GridPageExample },
  subgrid: { Example: SubgridExample },
}
