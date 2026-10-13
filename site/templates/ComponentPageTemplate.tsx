import type { ReactNode } from 'react'
import { Heading, TableOfContents, type TableOfContentsSection } from '@decocode/mezzanine'
import { DocumentationHeading } from '../DocumentationHeading'

export interface DocumentationSection {
  id: string
  title: string
  content: ReactNode
  subsections?: readonly TableOfContentsSection[]
}

interface ComponentPageTemplateProps {
  title: string
  description?: ReactNode
  reactAriaPage?: string
  sections: readonly DocumentationSection[]
}

// Each section definition supplies both its visible heading and its Contents link.
// Page-specific copy, tables and interactive examples stay in the page module.
export function ComponentPageTemplate({ title, description, reactAriaPage, sections }: ComponentPageTemplateProps) {
  return (
    <>
      <DocumentationHeading title={title} description={description} reactAriaPage={reactAriaPage} />
      <TableOfContents sections={sections.map(({ id, title: label, subsections }) => ({ id, label, children: subsections }))} />
      {sections.map(({ id, title: sectionTitle, content }) => (
        <section key={id} aria-labelledby={id} className="component-section">
          <Heading id={id} level={2} className="mz-text-heading-md">{sectionTitle}</Heading>
          {content}
        </section>
      ))}
    </>
  )
}
