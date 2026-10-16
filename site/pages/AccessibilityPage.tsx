import type { ReactNode } from 'react'
import { Button, Cell, Column, ExternalLinkIcon, Link, Row, Table, TableBody, TableHeader } from '@decocode/mezzanine'
import { DocsPageTemplate } from '../templates/DocsPageTemplate'
import { DocsTable } from '../components/DocsTable'
import {
  accessibilityCheckingParagraphs, accessibilityDescription, accessibilityFeedbackButton, accessibilityMezzanineRows,
  accessibilityProductRows, accessibilityReactAriaRows, accessibilityReferences, accessibilityRelatedPages,
  accessibilitySpecificsParagraph, accessibilityTargetParagraphs,
} from '../content/accessibilityContent'

function Paragraphs({ paragraphs }: { paragraphs: readonly ReactNode[] }) {
  return <>{paragraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}</>
}

export default function AccessibilityPage() {
  return (
    <DocsPageTemplate
      title="Accessibility"
      description={accessibilityDescription}
      sections={[
        {
          id: 'accessibility-target',
          title: 'Target',
          content: (<>
            <Paragraphs paragraphs={accessibilityTargetParagraphs} />
            <Button
              href={accessibilityFeedbackButton.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${accessibilityFeedbackButton.label} (opens in a new tab)`}
              variant="secondary"
              iconTrailing={<ExternalLinkIcon />}
            >
              {accessibilityFeedbackButton.label}
            </Button>
          </>),
        },
        {
          id: 'accessibility-react-aria',
          title: 'What React Aria provides',
          content: <DocsTable aria-label="Accessibility provided by React Aria" nameColumn="Area" descriptionColumn="What it does" namesAreCode={false} rows={accessibilityReactAriaRows} />,
        },
        {
          id: 'accessibility-mezzanine',
          title: 'What Mezzanine adds',
          content: (
            <div className="documentation-table">
              <Table aria-label="Accessibility added by Mezzanine">
                <TableHeader>
                  <Column id="area" isRowHeader>Area</Column>
                  <Column id="what">What Mezzanine does</Column>
                </TableHeader>
                <TableBody>
                  {accessibilityMezzanineRows.map(({ area, description, label, href }) => (
                    <Row id={area} key={area}>
                      <Cell>{area}</Cell>
                      <Cell>{description}{href && <> See <Link href={href}>{label}</Link>.</>}</Cell>
                    </Row>
                  ))}
                </TableBody>
              </Table>
            </div>
          ),
        },
        {
          id: 'accessibility-product',
          title: 'What your product supplies',
          content: <DocsTable aria-label="Accessibility supplied by products" nameColumn="Area" descriptionColumn="What to do" namesAreCode={false} rows={accessibilityProductRows} />,
        },
        { id: 'accessibility-checking', title: 'How it is checked', content: <Paragraphs paragraphs={accessibilityCheckingParagraphs} /> },
        { id: 'accessibility-page-specifics', title: 'Notes on other pages', content: <Paragraphs paragraphs={[accessibilitySpecificsParagraph]} /> },
      ]}
      relatedPages={accessibilityRelatedPages}
      references={accessibilityReferences}
    />
  )
}
