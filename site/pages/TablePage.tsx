import { useState } from 'react'
import {
  TableOfContents,
  Checkbox,
  type SortDescriptor,
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from '@decocode/mezzanine'
import { sortTableExampleRows, tableAnatomy, tableExampleRows } from '../tableExampleData'
import { PageHeading } from '../PageHeading'

export default function TablePage() {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'columnA',
    direction: 'ascending',
  })
  const sortedRows = sortTableExampleRows(tableExampleRows, sortDescriptor)

  return (
    <>
      <PageHeading
        description="Tables organise related information into rows and columns so it can be compared and understood. Mezzanine uses React Aria's table structure and interaction behaviour."
        reactAriaPage="Table"
        title="Table"
      />
      <TableOfContents sections={[
        { id: 'table-selection-heading', label: 'Example', children: [
          { id: 'table-single-selection-heading', label: 'Single selection' },
          { id: 'table-multiple-selection-heading', label: 'Multiple selection' },
        ] },
        { id: 'table-anatomy-heading', label: 'Anatomy' },
        { id: 'table-sorting-heading', label: 'Sorting' },
        { id: 'table-empty-heading', label: 'Empty state' },
        { id: 'table-responsive-heading', label: 'Responsive behaviour' },
      ]} />
      <section aria-labelledby="table-selection-heading" className="component-section">
        <h2 id="table-selection-heading" className="mz-text-heading-md">
          Example
        </h2>
        <p className="component-section-description">
          Tables have no selectable rows by default. Use single selection when one row can be
          chosen, or multiple selection when several rows can be chosen.
        </p>
        <div className="table-example-group">
          <div>
            <h3 id="table-single-selection-heading" className="mz-text-heading-sm">Single selection</h3>
            <p className="component-section-description">Row C is disabled in this example.</p>
            <div className="component-example documentation-table">
              <Table
                aria-label="Table with single row selection"
                className="react-aria-Table table-selection-example"
                disabledKeys={['row-c']}
                selectionMode="single"
              >
                <TableHeader>
                  <Column aria-label="Select row" id="selection" />
                  <Column id="columnA" isRowHeader>Column A</Column>
                  <Column id="columnB">Column B</Column>
                  <Column id="columnC">Column C</Column>
                </TableHeader>
                <TableBody items={tableExampleRows}>
                  {(item) => (
                    <Row id={item.id}>
                      <Cell><Checkbox slot="selection" /></Cell>
                      <Cell>{item.columnA}</Cell>
                      <Cell>{item.columnB}</Cell>
                      <Cell>{item.columnC}</Cell>
                    </Row>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          <div>
            <h3 id="table-multiple-selection-heading" className="mz-text-heading-sm">Multiple selection</h3>
            <div className="component-example documentation-table">
              <Table
                aria-label="Table with multiple row selection"
                className="react-aria-Table table-selection-example"
                selectionMode="multiple"
              >
                <TableHeader>
                  <Column id="selection"><Checkbox slot="selection" /></Column>
                  <Column id="columnA" isRowHeader>Column A</Column>
                  <Column id="columnB">Column B</Column>
                  <Column id="columnC">Column C</Column>
                </TableHeader>
                <TableBody items={tableExampleRows}>
                  {(item) => (
                    <Row id={item.id}>
                      <Cell><Checkbox slot="selection" /></Cell>
                      <Cell>{item.columnA}</Cell>
                      <Cell>{item.columnB}</Cell>
                      <Cell>{item.columnC}</Cell>
                    </Row>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </section>
      <section aria-labelledby="table-anatomy-heading" className="component-section">
        <h2 id="table-anatomy-heading" className="mz-text-heading-md">Anatomy</h2>
        <p className="component-section-description">
          A table is assembled from six React Aria components. Selection and sorting are optional.
        </p>
        <div className="documentation-table">
          <Table aria-label="Table anatomy">
            <TableHeader>
              <Column id="component" isRowHeader>Component</Column>
              <Column id="purpose">Purpose</Column>
            </TableHeader>
            <TableBody>
              {tableAnatomy.map((part) => (
                <Row id={part.name} key={part.name}>
                  <Cell><code>{part.name}</code></Cell>
                  <Cell>{part.purpose}</Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="table-sorting-heading" className="component-section">
        <h2 id="table-sorting-heading" className="mz-text-heading-md">
          Sorting
        </h2>
        <p className="component-section-description">Select a column heading to change the order of its rows.</p>
        <div className="component-example documentation-table">
          <Table
            aria-label="Sortable table"
            onSortChange={setSortDescriptor}
            sortDescriptor={sortDescriptor}
          >
            <TableHeader>
              <Column id="columnA" isRowHeader allowsSorting>
                {({ sortDirection }) => (
                  <>Column A {sortDirection && <span aria-hidden="true">{sortDirection === 'ascending' ? '▲' : '▼'}</span>}</>
                )}
              </Column>
              <Column id="columnB" allowsSorting>
                {({ sortDirection }) => (
                  <>Column B {sortDirection && <span aria-hidden="true">{sortDirection === 'ascending' ? '▲' : '▼'}</span>}</>
                )}
              </Column>
              <Column id="columnC" allowsSorting>
                {({ sortDirection }) => (
                  <>Column C {sortDirection && <span aria-hidden="true">{sortDirection === 'ascending' ? '▲' : '▼'}</span>}</>
                )}
              </Column>
            </TableHeader>
            <TableBody items={sortedRows}>
              {(item) => (
                <Row id={item.id}>
                  <Cell>{item.columnA}</Cell>
                  <Cell>{item.columnB}</Cell>
                  <Cell>{item.columnC}</Cell>
                </Row>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="table-empty-heading" className="component-section">
        <h2 id="table-empty-heading" className="mz-text-heading-md">
          Empty state
        </h2>
        <p className="component-section-description">Use an empty state to explain clearly when the table has no rows to display.</p>
        <div className="component-example documentation-table">
          <Table aria-label="Empty table">
            <TableHeader>
              <Column id="columnA" isRowHeader>Column A</Column>
              <Column id="columnB">Column B</Column>
              <Column id="columnC">Column C</Column>
            </TableHeader>
            <TableBody renderEmptyState={() => 'No rows to display.'}>{[]}</TableBody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="table-responsive-heading" className="component-section">
        <h2 id="table-responsive-heading" className="mz-text-heading-md">
          Responsive behaviour
        </h2>
        <p className="component-section-description">
          When a table is wider than the available space, it scrolls horizontally without causing
          the whole page to overflow.
        </p>
      </section>
    </>
  )
}
