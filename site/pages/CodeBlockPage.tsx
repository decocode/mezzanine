import { ExampleZone } from '../components/ExampleZone'
import { CodeBlock } from '@decocode/mezzanine'
import { codeBlockContent } from '../content/codeBlockContent'
import { DocsPageTemplate } from '../templates/DocsPageTemplate'
import { DocsTable } from '../components/DocsTable'

export default function CodeBlockPage() {
  return (
    <DocsPageTemplate
      description={codeBlockContent.description}
      title={codeBlockContent.title}
      relatedPages={codeBlockContent.relatedPages}
      references={codeBlockContent.references}
      sections={[
        {
          id: 'code-block-examples-heading',
          title: 'Example',
          content: (<>
            {codeBlockContent.exampleParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
            <ExampleZone>
              <CodeBlock>{codeBlockContent.exampleCode}</CodeBlock>
            </ExampleZone>
          </>),
        },
        {
          id: 'code-block-technical-details',
          title: 'Technical details',
          sections: [
            {
              id: 'code-block-anatomy-heading',
              title: 'Anatomy',
              content: <DocsTable aria-label="Code block anatomy" nameColumn="Component" rows={codeBlockContent.anatomyRows} className="documentation-anatomy-table" />,
            },
            {
              id: 'code-block-usage-heading',
              title: 'Usage',
              content: (<>{codeBlockContent.usageParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</>),
            },
            {
              id: 'code-block-accessibility-heading',
              title: 'Accessibility',
              content: (<>{codeBlockContent.accessibilityParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</>),
            },
            {
              id: 'code-block-tokens-heading',
              title: 'CSS tokens',
              content: (<>
                {codeBlockContent.tokensParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
                <DocsTable aria-label="Code block CSS tokens" nameColumn="CSS token" rows={codeBlockContent.tokensRows} />
              </>),
            },
          ],
        },
      ]}
    />
  )
}
