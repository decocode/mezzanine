import type { ReactNode } from 'react'
import { Table, TableHeader, Column, TableBody, Row, Cell } from '@decocode/mezzanine'

interface ComponentReferenceTableProps {
  'aria-label': string
  nameColumn: string
  rows: readonly { name: string; description: ReactNode }[]
  className?: string
}

// Shared presentation for Anatomy, Props and CSS token reference data.
export function ComponentReferenceTable({ 'aria-label': label, nameColumn, rows, className }: ComponentReferenceTableProps) {
  return (
    <div className={['documentation-table', className].filter(Boolean).join(' ')}>
      <Table aria-label={label}>
        <TableHeader>
          <Column isRowHeader>{nameColumn}</Column>
          <Column>Purpose</Column>
        </TableHeader>
        <TableBody>
          {rows.map(({ name, description }) => (
            <Row id={name} key={name}>
              <Cell><code>{name}</code></Cell>
              <Cell>{description}</Cell>
            </Row>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
