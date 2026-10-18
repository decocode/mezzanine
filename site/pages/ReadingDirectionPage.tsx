import { Card, CodeBlock } from '@decocode/mezzanine'
import { DocsPageTemplate } from '../templates/DocsPageTemplate'
import { ExampleZone } from '../components/ExampleZone'
import {
  readingDirectionCode, readingDirectionParagraphs, readingDirectionReferences, readingDirectionRelatedPages,
  readingDirectionRightToLeftExamples, readingDirectionVerticalExamples,
} from '../content/readingDirectionContent'

export default function ReadingDirectionPage() {
  return (
    <DocsPageTemplate
      title="Reading direction"
      sections={[
        {
          id: 'reading-direction-heading',
          title: 'Reading direction',
          content: (<>
            {readingDirectionParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
            <CodeBlock className="docs-code-block">{readingDirectionCode}</CodeBlock>
            <ExampleZone>
              <ul className="text-language-examples">
                {readingDirectionRightToLeftExamples.map(({ language, lang, text }) => <li key={lang} dir="rtl" lang={lang}>
                  <Card>
                    <p className="mz-text-label-md" lang="en">{language}</p>
                    <p>{text}</p>
                  </Card>
                </li>)}
              </ul>
            </ExampleZone>
            <ExampleZone>
              <ul className="text-language-examples">
                {readingDirectionVerticalExamples.map(({ language, lang, text }) => <li key={lang}>
                  <Card>
                    <p className="mz-text-label-md">{language}</p>
                    <p className="text-vertical-example" lang={lang}>{text}</p>
                  </Card>
                </li>)}
              </ul>
            </ExampleZone>
          </>),
        },
      ]}
      relatedPages={readingDirectionRelatedPages}
      references={readingDirectionReferences}
    />
  )
}
