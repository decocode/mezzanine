import { DocsTableOfContents } from '../components/DocsTableOfContents'
import type { ReactNode } from 'react'
import { Heading, Link, ExternalLinkIcon, type TableOfContentsSection } from '@decocode/mezzanine'
import { DocsDisclosureGroup } from '../components/DocsDisclosureGroup'

export interface DocumentationSection {
  id: string
  title: string
  content: ReactNode
  subsections?: readonly TableOfContentsSection[]
  // Shown as a closed Disclosure whose header is the section heading; its On this page link opens it.
  isCollapsible?: boolean
}

export interface DocumentationSectionGroup {
  id: string
  title: string
  sections: readonly DocumentationSection[]
}

interface DocsPageTemplateProps {
  title: string
  description?: ReactNode
  sections: readonly (DocumentationSection | DocumentationSectionGroup)[]
  relatedPages?: readonly { label: string; href: string }[]
  referencesId?: string
  references?: readonly { label: string; href: string }[]
  // False for a short index page, where an On this page list would only repeat its one heading.
  showContents?: boolean
}

// Each section definition supplies both its visible heading and its On this page link.
// Pages compose their content and live examples before passing sections here.
export function DocsPageTemplate({ title, description, sections, relatedPages = [], references = [], referencesId = 'references', showContents = true }: DocsPageTemplateProps) {
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
              <Link href={href}>
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
      <PageHeading title={title} description={description} />
      {showContents && <DocsTableOfContents heading="On this page" sections={pageSections.map(section => ({
        id: section.id,
        label: section.title,
        children: 'sections' in section
          ? section.sections.map(({ id, title: label, subsections }) => ({ id, label, children: subsections }))
          : section.subsections,
      }))} />}
      {pageSections.map(section => !('sections' in section) && section.isCollapsible ? (
        <section key={section.id} aria-labelledby={section.id} className="component-section component-section-collapsible">
          <DocsDisclosureGroup labelledBy={section.id} sections={[section]} headingLevel={2} />
        </section>
      ) : (
        <section key={section.id} aria-labelledby={section.id} className="component-section mz-prose">
          <Heading id={section.id} level={2} className="mz-text-heading-md">{section.title}</Heading>
          {'sections' in section
            ? <DocsDisclosureGroup labelledBy={section.id} sections={section.sections} />
            : section.content}
        </section>
      ))}
    </>
  )
}

export interface PageHeadingProps {
  title: string
  description?: ReactNode
  children?: ReactNode
  className?: string
}

// Composes React Aria Heading with introductory paragraphs and optional content.
export function PageHeading({ title, description, children, className }: PageHeadingProps) {
  const paragraphs = Array.isArray(description) ? description : [description]

  return (
    <div className={['page-heading-group mz-prose', className].filter(Boolean).join(' ')}>
      <Heading className="mz-text-display-md mz-text-emphasis" level={1}>
        {title}
      </Heading>
      {description != null && (
        <div className="page-description mz-prose">
          {paragraphs.map((paragraph, index) => (
            <p className="mz-text-body-lg" key={index}>{paragraph}</p>
          ))}
        </div>
      )}
      {children}
    </div>
  )
}
