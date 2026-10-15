import type { ReactNode } from 'react'
import { Link } from '@decocode/mezzanine'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'
import {
  foundationsDefinitionParagraphs, foundationsDescription, foundationsPages,
  foundationsTechnicalDetailsParagraphs, foundationsThemeColourParagraphs,
} from '../content/foundationsContent'

function Paragraphs({ paragraphs }: { paragraphs: readonly ReactNode[] }) {
  return <>{paragraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}</>
}

export default function FoundationsPage() {
  return (
    <ComponentPageTemplate
      title="Foundations"
      description={foundationsDescription}
      sections={[
        { id: 'foundations-definition', title: 'What makes a Foundation', content: <Paragraphs paragraphs={foundationsDefinitionParagraphs} /> },
        {
          id: 'foundations-pages',
          title: 'Foundations pages',
          content: (
            <ul className="foundations-page-list">
              {foundationsPages.map(({ label, href, description }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                  <span className="component-section-description">{description}</span>
                </li>
              ))}
            </ul>
          ),
        },
        { id: 'foundations-theme-colour', title: 'Theme colours in Foundations', content: <Paragraphs paragraphs={foundationsThemeColourParagraphs} /> },
        { id: 'foundations-technical-details', title: 'Technical details on each page', content: <Paragraphs paragraphs={foundationsTechnicalDetailsParagraphs} /> },
      ]}
    />
  )
}
