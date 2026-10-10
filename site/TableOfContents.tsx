import { useId } from 'react'
import { Link } from '@decocode/mezzanine'

export interface TableOfContentsSection {
  id: string
  label: string
  children?: readonly TableOfContentsSection[]
}

interface TableOfContentsProps {
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

// Composes Mezzanine's React Aria Link with a semantic navigation landmark.
export function TableOfContents({
  sections,
  className,
  heading = 'Contents',
  headingLevel = 2,
}: TableOfContentsProps) {
  const headingId = useId()
  const Heading = headingLevel === 3 ? 'h3' : 'h2'

  if (sections.length === 0) return null

  return (
    <nav
      aria-labelledby={headingId}
      className={['table-of-contents', className].filter(Boolean).join(' ')}
    >
      <Heading className="mz-text-heading-small" id={headingId}>{heading}</Heading>
      <TableOfContentsList sections={sections} />
    </nav>
  )
}
