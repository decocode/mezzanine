import { useId, useSyncExternalStore } from 'react'
import { Heading } from '../Heading/Heading'
import { Link } from '../Link/Link'
import { currentSectionId, sectionIds, subscribeToReading } from './tableOfContentsLogic'

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

function TableOfContentsList({ sections, currentId }: { sections: readonly TableOfContentsSection[]; currentId?: string }) {
  return (
    <ul>
      {sections.map(({ id, label, children }) => (
        <li key={id}>
          <Link href={`#${id}`} aria-current={id === currentId ? 'location' : undefined}>{label}</Link>
          {children && children.length > 0 && <TableOfContentsList sections={children} currentId={currentId} />}
        </li>
      ))}
    </ul>
  )
}

// Composes Mezzanine's React Aria Heading and Link in a navigation landmark. As the page scrolls, the
// link to the section being read gets aria-current="location" and the nav item's current-page bar.
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
  const ids = sectionIds(sections)
  const currentId = useSyncExternalStore(subscribeToReading, () => currentSectionId(ids), () => undefined)

  if (sections.length === 0) return null

  return (
    <nav
      aria-label={label}
      aria-labelledby={isNamedElsewhere ? labelledBy : headingId}
      className={['mz-table-of-contents', className].filter(Boolean).join(' ')}
    >
      {!isNamedElsewhere && <Heading className="mz-text-heading-sm" id={headingId} level={headingLevel}>{heading}</Heading>}
      <TableOfContentsList sections={sections} currentId={currentId} />
    </nav>
  )
}
