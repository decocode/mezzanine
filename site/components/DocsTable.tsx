import type { ReactNode } from 'react'
import { Cell, Column, Link, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'

interface DocsTableProps {
  'aria-label': string
  nameColumn: string
  // A row with an href links its name, such as a part that has its own docs page.
  rows: readonly { name: string; description: ReactNode; href?: string }[]
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
          {rows.map(({ name, description, href }) => {
            const label = namesAreCode ? <code>{name}</code> : name
            return <Row id={name} key={name}>
              <Cell>{href ? <Link href={href}>{label}</Link> : label}</Cell>
              <Cell>{description}</Cell>
            </Row>
          })}
        </TableBody>
      </Table>
    </div>
  )
}
