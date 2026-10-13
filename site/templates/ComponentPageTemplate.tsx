import type { ReactNode } from 'react'
import { Heading, Link, ExternalLinkIcon, TableOfContents, type TableOfContentsSection } from '@decocode/mezzanine'
import { DocumentationHeading } from '../DocumentationHeading'
import { DocumentationDisclosureGroup } from '../components/DocumentationDisclosureGroup'

export interface DocumentationSection {
  id: string
  title: string
  content: ReactNode
  subsections?: readonly TableOfContentsSection[]
}

interface DocumentationSectionGroup {
  id: string
  title: string
  sections: readonly DocumentationSection[]
}

interface ComponentPageTemplateProps {
  title: string
  description?: ReactNode
  reactAriaPage?: string
  sections: readonly (DocumentationSection | DocumentationSectionGroup)[]
  relatedPages?: readonly { label: string; href: string }[]
  referencesId?: string
  references?: readonly { label: string; href: string }[]
}

// Each section definition supplies both its visible heading and its On this page link.
// Pages compose their content and live examples before passing sections here.
export function ComponentPageTemplate({ title, description, reactAriaPage, sections, relatedPages = [], references = [], referencesId = 'references' }: ComponentPageTemplateProps) {
  const pageSections: readonly (DocumentationSection | DocumentationSectionGroup)[] = [
    ...sections,
    ...[
      { id: 'related-pages', title: 'Related pages', links: relatedPages, external: false },
      { id: referencesId, title: 'References', links: references, external: true },
    ].filter(({ links }) => links.length > 0).map(({ id, title: sectionTitle, links, external }) => ({
      id,
      title: sectionTitle,
      content: (
        <ul className="component-reference-links">
          {links.map(({ label, href }) => (
            <li key={href}>
              <Link href={href} aria-label={external ? `${label} (opens in a new tab)` : undefined} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
                <span>{label}</span>{external && <ExternalLinkIcon />}
              </Link>
            </li>
          ))}
        </ul>
      ),
    })),
  ]
  return (
    <>
      <DocumentationHeading title={title} description={description} reactAriaPage={reactAriaPage} />
      <TableOfContents heading="On this page" sections={pageSections.map(section => ({
        id: section.id,
        label: section.title,
        children: 'sections' in section
          ? section.sections.map(({ id, title: label, subsections }) => ({ id, label, children: subsections }))
          : section.subsections,
      }))} />
      {pageSections.map(section => (
        <section key={section.id} aria-labelledby={section.id} className="component-section">
          <Heading id={section.id} level={2} className="mz-text-heading-md">{section.title}</Heading>
          {'sections' in section
            ? <DocumentationDisclosureGroup labelledBy={section.id} sections={section.sections} />
            : section.content}
        </section>
      ))}
    </>
  )
}
