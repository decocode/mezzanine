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

// A row can name several props that work together, such as "isOpen / defaultOpen" or "className, style",
// with an optional component in front, such as "Tooltip: offset / crossOffset". Each is shown as its
// own code, on its own line, with the component in front of each.
function splitNames(name: string): string[] {
  const prefixed = name.match(/^([A-Z][A-Za-z]*): (.+)$/)
  const names = (prefixed ? prefixed[2] : name).split(/\s*(?:\/|,)\s+/).filter(Boolean)
  return prefixed ? names.map((each) => `${prefixed[1]}: ${each}`) : names
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
            const names = namesAreCode ? splitNames(name) : [name]
            const label = !namesAreCode ? name
              : names.length === 1 ? <code>{name}</code>
              : <span className="documentation-name-list">{names.map((each) => <code key={each}>{each}</code>)}</span>
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
