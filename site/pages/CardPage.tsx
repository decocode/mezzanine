import { ExampleZone } from '../components/ExampleZone'
import { Button, Card, Heading } from '@decocode/mezzanine'
import { cardContent } from '../content/cardContent'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'
import { DocsTable } from '../components/DocsTable'

export default function CardPage() {
  return (
    <ComponentPageTemplate
      description={cardContent.description}
      title={cardContent.title}
      relatedPages={cardContent.relatedPages}
      references={cardContent.references}
      sections={[
        {
          id: 'card-examples-heading',
          title: 'Example',
          content: (<>
            {cardContent.exampleParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
            <ExampleZone>
              <Card>
                <Heading level={3}>{cardContent.example.heading}</Heading>
                <p>{cardContent.example.body}</p>
                <Button variant="secondary">{cardContent.example.action}</Button>
              </Card>
            </ExampleZone>
          </>),
        },
        {
          id: 'card-technical-details',
          title: 'Technical details',
          sections: [
            {
              id: 'card-anatomy-heading',
              title: 'Anatomy',
              content: <DocsTable aria-label="Card anatomy" nameColumn="Component" rows={cardContent.anatomyRows} className="documentation-anatomy-table" />,
            },
            {
              id: 'card-usage-heading',
              title: 'Usage',
              content: (<>{cardContent.usageParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</>),
            },
            {
              id: 'card-accessibility-heading',
              title: 'Accessibility',
              content: (<>{cardContent.accessibilityParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</>),
            },
            {
              id: 'card-tokens-heading',
              title: 'CSS tokens',
              content: (<>
                {cardContent.tokensParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
                <DocsTable aria-label="Card CSS tokens" nameColumn="CSS token" rows={cardContent.tokensRows} />
              </>),
            },
          ],
        },
      ]}
    />
  )
}
