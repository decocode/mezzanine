import {
  Cell, Checkbox, Column, DemoBlock, Row, Table, TableBody, TableHeader, type SortDescriptor,
} from '@decocode/mezzanine'
import { useState } from 'react'
import { VisuallyHidden } from 'react-aria-components/VisuallyHidden'
import { PanelSelect } from '../../../../components/PanelSelect'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { tableContent, tableExampleCode, tableExampleColumns, tableExampleGroups, tableExampleRows, tableFlags, tableSelectionModes } from './tableContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function TablePage() {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'columnA',
    direction: 'ascending',
  })
  const [selectionMode, setSelectionMode] = useState<(typeof tableSelectionModes)[number]>('none')
  const [flags, setFlags] = useState<Record<(typeof tableFlags)[number], boolean>>({ disabledKeys: false, allowsSorting: true, renderEmptyState: false })
  const canSelect = selectionMode !== 'none'
  const sortColumn = tableExampleColumns.find(column => column.id === sortDescriptor.column) ?? tableExampleColumns[0]
  const rows = flags.allowsSorting
    ? [...tableExampleRows].sort((first, second) => {
      const order = first[sortColumn.id].localeCompare(second[sortColumn.id])
      return sortDescriptor.direction === 'descending' ? -order : order
    })
    : tableExampleRows

  return (
    <ContentPage
      content={tableContent}
      parts={{
        example: (
          <DemoBlock
            align="stretch"
            codeView={tableExampleCode({ selectionMode, flags })}
            endPanel={<>
              <PanelSelect label="selectionMode" options={tableSelectionModes} value={selectionMode} onChange={setSelectionMode} />
              {tableFlags.map((name) => (
                <PanelSwitch key={name} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
              ))}
            </>}
          >
            <div className="documentation-table table-example">
              {/* A new key starts the table again, so a change of selection mode clears its choices. */}
              <Table
                key={selectionMode}
                aria-label="Example table"
                className={canSelect ? 'table-selection-example' : undefined}
                selectionMode={canSelect ? selectionMode : undefined}
                disabledKeys={flags.disabledKeys ? ['row-c'] : undefined}
                sortDescriptor={flags.allowsSorting ? sortDescriptor : undefined}
                onSortChange={flags.allowsSorting ? setSortDescriptor : undefined}
              >
                <TableHeader>
                  {canSelect && (
                    <Column id="selection">
                      {selectionMode === 'multiple' ? <Checkbox slot="selection" /> : <VisuallyHidden>{tableExampleGroups.selectionColumn}</VisuallyHidden>}
                    </Column>
                  )}
                  {tableExampleColumns.map(({ id, label, isRowHeader }) => (
                    <Column key={id} id={id} isRowHeader={isRowHeader} allowsSorting={flags.allowsSorting}>{label}</Column>
                  ))}
                </TableHeader>
                {flags.renderEmptyState
                  ? <TableBody renderEmptyState={() => tableExampleGroups.emptyState}>{[]}</TableBody>
                  : <TableBody items={rows}>
                    {(item) => (
                      <Row id={item.id}>
                        {canSelect && <Cell><Checkbox slot="selection" /></Cell>}
                        <Cell>{item.columnA}</Cell>
                        <Cell>{item.columnB}</Cell>
                        <Cell>{item.columnC}</Cell>
                      </Row>
                    )}
                  </TableBody>}
              </Table>
            </div>
          </DemoBlock>
        ),
      }}
    />
  )
}
