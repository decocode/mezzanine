import type { ReactNode } from 'react'
import { Table, TableHeader, Column, TableBody, Row, Cell } from '@decocode/mezzanine'

interface DocsTableProps {
  'aria-label': string
  nameColumn: string
  rows: readonly { name: string; description: ReactNode }[]
  className?: string
  descriptionColumn?: string
  // Part names such as "Section header" are plain text; API names default to code.
  namesAreCode?: boolean
}

// Shared presentation for Anatomy, Props and CSS token reference data.
export function DocsTable({ 'aria-label': label, nameColumn, rows, className, descriptionColumn = 'Purpose', namesAreCode = true }: DocsTableProps) {
  return (
    <div className={['documentation-table', 'documentation-reference-table', className].filter(Boolean).join(' ')}>
      <Table aria-label={label}>
        <TableHeader>
          <Column isRowHeader>{nameColumn}</Column>
          <Column>{descriptionColumn}</Column>
        </TableHeader>
        <TableBody>
          {rows.map(({ name, description }) => (
            <Row id={name} key={name}>
              <Cell>{namesAreCode ? <code>{name}</code> : name}</Cell>
              <Cell>{description}</Cell>
            </Row>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
