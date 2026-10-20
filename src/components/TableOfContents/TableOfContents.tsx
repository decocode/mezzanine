import { useId } from 'react'
import { Heading } from '../Heading/Heading'
import { Link } from '../Link/Link'

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
  // Name the navigation from something already on screen, such as the Panel it sits in, instead of
  // its own heading. Either one leaves out the visible heading.
  'aria-label'?: string
  'aria-labelledby'?: string
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
  'aria-label': label,
  'aria-labelledby': labelledBy,
}: TableOfContentsProps) {
  const headingId = useId()
  const isNamedElsewhere = label != null || labelledBy != null

  if (sections.length === 0) return null

  return (
    <nav
      aria-label={label}
      aria-labelledby={isNamedElsewhere ? labelledBy : headingId}
      className={['mz-table-of-contents', className].filter(Boolean).join(' ')}
    >
      {!isNamedElsewhere && <Heading className="mz-text-heading-sm" id={headingId} level={headingLevel}>{heading}</Heading>}
      <TableOfContentsList sections={sections} />
    </nav>
  )
}
