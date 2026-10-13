import { ComponentExample } from '../components/ComponentExample'
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
import { tableContent } from '../content/tableContent'
import { sortTableExampleRows, tableExampleRows } from '../tableExampleData'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'
import { ComponentReferenceTable } from '../components/ComponentReferenceTable'

export default function TablePage() {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'columnA',
    direction: 'ascending',
  })
  const sortedRows = sortTableExampleRows(tableExampleRows, sortDescriptor)

  return (
    <ComponentPageTemplate
      description={tableContent.description}
      reactAriaPage="Table"
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
                <ComponentExample className="documentation-table">
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
                </ComponentExample>
              </div>
              <div>
                <h3 id="table-multiple-selection-heading" className="mz-text-heading-sm">Multiple selection</h3>
                <ComponentExample className="documentation-table">
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
                </ComponentExample>
              </div>
            </div>
          </>),
        },
        {
          id: 'table-sorting-heading',
          title: 'Sorting',
          content: (<>
            {tableContent.sortingParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
            <ComponentExample className="documentation-table">
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
            </ComponentExample>
          </>),
        },
        {
          id: 'table-empty-heading',
          title: 'Empty state',
          content: (<>
            {tableContent.emptyStateParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
            <ComponentExample className="documentation-table">
              <Table aria-label="Empty table">
                <TableHeader>
                  <Column id="columnA" isRowHeader>Column A</Column>
                  <Column id="columnB">Column B</Column>
                  <Column id="columnC">Column C</Column>
                </TableHeader>
                <TableBody renderEmptyState={() => 'No rows to display.'}>{[]}</TableBody>
              </Table>
            </ComponentExample>
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
                <ComponentReferenceTable aria-label="Table anatomy" nameColumn="Component" rows={tableContent.anatomyRows} />
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
