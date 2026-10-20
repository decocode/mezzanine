import { ExampleZone } from '../../../../components/ExampleZone'
import {
  Cell,
  Checkbox,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
  type SortDescriptor,
} from '@decocode/mezzanine'
import { useState } from 'react'
import { tableContent, tableExampleColumns, tableExampleGroups, tableExampleRows } from './tableContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function TablePage() {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'columnA',
    direction: 'ascending',
  })
  const sortColumn = tableExampleColumns.find(column => column.id === sortDescriptor.column) ?? tableExampleColumns[0]
  const sortedRows = [...tableExampleRows].sort((first, second) => {
    const order = first[sortColumn.id].localeCompare(second[sortColumn.id])
    return sortDescriptor.direction === 'descending' ? -order : order
  })

  return (
    <ContentPage
      content={tableContent}
      parts={{
        example: (
          <div className="table-example-group">
            <div>
              <h3 id="table-single-selection-heading" className="mz-text-heading-sm">{tableExampleGroups.singleSelection}</h3>
              <p className="component-section-description">{tableExampleGroups.disabledRowNote}</p>
              <ExampleZone className="documentation-table">
                <Table
                  aria-label="Table with single row selection"
                  className="react-aria-Table table-selection-example"
                  disabledKeys={['row-c']}
                  selectionMode="single"
                >
                  <TableHeader>
                    <Column aria-label="Select row" id="selection" />
                    {tableExampleColumns.map(({ id, label, isRowHeader }) => (
                      <Column key={id} id={id} isRowHeader={isRowHeader}>{label}</Column>
                    ))}
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
              </ExampleZone>
            </div>
            <div>
              <h3 id="table-multiple-selection-heading" className="mz-text-heading-sm">{tableExampleGroups.multipleSelection}</h3>
              <ExampleZone className="documentation-table">
                <Table
                  aria-label="Table with multiple row selection"
                  className="react-aria-Table table-selection-example"
                  selectionMode="multiple"
                >
                  <TableHeader>
                    <Column id="selection"><Checkbox slot="selection" /></Column>
                    {tableExampleColumns.map(({ id, label, isRowHeader }) => (
                      <Column key={id} id={id} isRowHeader={isRowHeader}>{label}</Column>
                    ))}
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
              </ExampleZone>
            </div>
          </div>
        ),
        sorting: (
          <ExampleZone className="documentation-table">
            <Table
              aria-label="Sortable table"
              onSortChange={setSortDescriptor}
              sortDescriptor={sortDescriptor}
            >
              <TableHeader>
                {tableExampleColumns.map(({ id, label, isRowHeader }) => (
                  <Column key={id} id={id} isRowHeader={isRowHeader} allowsSorting>{label}</Column>
                ))}
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
          </ExampleZone>
        ),
        emptyState: (
          <ExampleZone className="documentation-table">
            <Table aria-label="Empty table">
              <TableHeader>
                {tableExampleColumns.map(({ id, label, isRowHeader }) => (
                  <Column key={id} id={id} isRowHeader={isRowHeader}>{label}</Column>
                ))}
              </TableHeader>
              <TableBody renderEmptyState={() => 'No rows to display.'}>{[]}</TableBody>
            </Table>
          </ExampleZone>
        ),
      }}
    />
  )
}
