import { useId } from 'react'
import { Heading } from './Heading'
import { Link } from './Link'

export interface TableOfContentsSection {
  id: string
  label: string
  children?: readonly TableOfContentsSection[]
}

export interface TableOfContentsProps {
  sections: readonly TableOfContentsSection[]
  className?: string
  heading?: string
  headingLevel?: 2 | 3
}

function TableOfContentsList({ sections }: { sections: readonly TableOfContentsSection[] }) {
  return (
    <ul>
      {sections.map(({ id, label, children }) => (
        <li key={id}>
          <Link href={`#${id}`}>{label}</Link>
          {children && children.length > 0 && <TableOfContentsList sections={children} />}
        </li>
      ))}
    </ul>
  )
}

// Composes Mezzanine's React Aria Heading and Link in a navigation landmark.
export function TableOfContents({
  sections,
  className,
  heading = 'Contents',
  headingLevel = 2,
}: TableOfContentsProps) {
  const headingId = useId()

  if (sections.length === 0) return null

  return (
    <nav
      aria-labelledby={headingId}
      className={['mezzanine-table-of-contents', className].filter(Boolean).join(' ')}
    >
      <Heading className="mz-text-heading-sm" id={headingId} level={headingLevel}>{heading}</Heading>
      <TableOfContentsList sections={sections} />
    </nav>
  )
}
