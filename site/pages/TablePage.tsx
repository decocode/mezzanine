import { ExampleZone } from '../components/ExampleZone'
import {
  Cell,
  Checkbox,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
  sortTableRows,
  type SortDescriptor,
} from '@decocode/mezzanine'
import { useState } from 'react'
import { tableContent, tableExampleColumns, tableExampleRows } from '../content/tableContent'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'
import { DocsTable } from '../components/DocsTable'

export default function TablePage() {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'columnA',
    direction: 'ascending',
  })
  const sortedRows = sortTableRows(tableExampleRows, sortDescriptor)

  return (
    <ComponentPageTemplate
      description={tableContent.description}
      title={tableContent.title}
      relatedPages={tableContent.relatedPages}
      references={tableContent.references}
      sections={[
        {
          id: 'table-selection-heading',
          title: 'Example',
          subsections: [
            { id: 'table-single-selection-heading', label: 'Single selection' },
            { id: 'table-multiple-selection-heading', label: 'Multiple selection' },
          ],
          content: (<>
            {tableContent.exampleParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
            <div className="table-example-group">
              <div>
                <h3 id="table-single-selection-heading" className="mz-text-heading-sm">Single selection</h3>
                <p className="component-section-description">{tableContent.exampleParagraphs[1]}</p>
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
                <h3 id="table-multiple-selection-heading" className="mz-text-heading-sm">Multiple selection</h3>
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
          </>),
        },
        {
          id: 'table-sorting-heading',
          title: 'Sorting',
          content: (<>
            {tableContent.sortingParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
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
          </>),
        },
        {
          id: 'table-empty-heading',
          title: 'Empty state',
          content: (<>
            {tableContent.emptyStateParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
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
          </>),
        },
        {
          id: 'table-technical-details',
          title: 'Technical details',
          sections: [
            {
              id: 'table-anatomy-heading',
              title: 'Anatomy',
              content: (<>
                {tableContent.anatomyParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
                <DocsTable aria-label="Table anatomy" nameColumn="Component" rows={tableContent.anatomyRows} />
              </>),
            },
            {
              id: 'table-responsive-heading',
              title: 'Responsive behaviour',
              content: (<>
                {tableContent.responsiveBehaviourParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
              </>),
            },
            {
              id: 'table-usage-heading',
              title: 'Usage and accessibility',
              content: (<>
                {tableContent.usageParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </>),
            },
          ],
        },
      ]}
    />
  )
}
