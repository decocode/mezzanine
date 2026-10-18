import type { ReactNode } from 'react'
import { DocsTable } from '../components/DocsTable'
import { RichText } from '../components/RichText'
import { DocsPageTemplate, type DocumentationSection } from './DocsPageTemplate'
import { sectionId, sectionTitle, technicalDetailsTitle, type Block, type ContentSection, type DocsPageContent } from './docsPageContent'

// Lists in body text use the body text style; intro lists share the muted description style.
function Blocks({ blocks, className }: { blocks: readonly Block[]; className?: string }) {
  return blocks.map((block, index) => typeof block === 'string'
    ? <p className={className} key={index}><RichText text={block} /></p>
    : <ul className={className ?? 'mz-text-body-md'} key={index}>{block.list.map((item) => <li key={item}><RichText text={item} /></li>)}</ul>)
}

interface ContentPageProps {
  content: DocsPageContent
  // Live examples and other parts only the page can build, keyed by section key. Each appears after
  // its section's paragraphs and before its table. Every heading comes from the content file, so a
  // part whose key the content doesn't list is never shown.
  parts?: Partial<Record<string, ReactNode>>
  // False for a short index page, where an On this page list would only repeat its one heading.
  showContents?: boolean
}

// Builds a documentation page from its content file: the sections in order, then the Technical
// details group, Related pages and References, through DocsPageTemplate.
export function ContentPage({ content, parts = {}, showContents }: ContentPageProps) {
  const toSection = (section: ContentSection): DocumentationSection => ({
    id: sectionId(content.id, section.key),
    title: sectionTitle(section, content.kind),
    subsections: section.subsections,
    content: <>
      {section.intro && <Blocks blocks={section.intro} className="component-section-description" />}
      {section.body && <Blocks blocks={section.body} />}
      {parts[section.key]}
      {section.table && <DocsTable
        aria-label={section.table.label}
        nameColumn={section.table.nameColumn}
        descriptionColumn={section.table.descriptionColumn}
        namesAreCode={section.table.namesAreCode}
        className={section.table.className}
        rows={section.table.rows.map(({ name, description }) => ({ name, description: <RichText text={description} /> }))}
      />}
    </>,
  })
  const technicalDetails = content.technicalDetails ?? []
  const description = content.description === undefined
    ? undefined
    : (typeof content.description === 'string' ? [content.description] : content.description).map((paragraph, index) => <RichText key={index} text={paragraph} />)
  return (
    <DocsPageTemplate
      title={content.title}
      description={description}
      showContents={showContents}
      relatedPages={content.relatedPages}
      references={content.references}
      sections={[
        ...(content.sections ?? []).map(toSection),
        ...(technicalDetails.length ? [{ id: sectionId(content.id, 'technicalDetails'), title: technicalDetailsTitle, sections: technicalDetails.map(toSection) }] : []),
      ]}
    />
  )
}
