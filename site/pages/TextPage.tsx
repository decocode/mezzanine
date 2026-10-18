import { Card, CodeBlock } from '@decocode/mezzanine'
import { DocsPageTemplate } from '../templates/DocsPageTemplate'
import { DocsTable } from '../components/DocsTable'
import { ExampleZone } from '../components/ExampleZone'
import { TokenValue } from '../components/TokenValue'
import {
  textCssProperties, textDescription, textLineLengthCode, textLineLengthExample, textLineLengthLabels, textLineLengthParagraphs,
  textLongWordsExample, textReadingDirectionCode,
  textLongWordsParagraphs, textReadingDirectionParagraphs, textRightToLeftExamples, textReferences, textRelatedPages, textVerticalExamples,
} from '../content/textContent'

export default function TextPage() {
  return (
    <DocsPageTemplate
      title="Text"
      description={textDescription}
      sections={[
        {
          id: 'text-line-length-heading',
          title: 'Line length',
          content: (<>
            {textLineLengthParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
            <CodeBlock className="docs-code-block">{textLineLengthCode}</CodeBlock>
            <ExampleZone className="text-comparison">
              <p className="mz-text-label-md">{textLineLengthLabels.without}</p>
              <p className="mz-text-body-md">{textLineLengthExample}</p>
              <p className="mz-text-label-md">{textLineLengthLabels.with}</p>
              <p className="mz-text-body-md text-line-length-example">{textLineLengthExample}</p>
            </ExampleZone>
          </>),
        },
        {
          id: 'text-long-words-heading',
          title: 'Long words',
          content: (<>
            {textLongWordsParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
            <ExampleZone className="text-narrow-example">
              <Card><p lang="de">{textLongWordsExample}</p></Card>
            </ExampleZone>
          </>),
        },
        {
          id: 'text-reading-direction-heading',
          title: 'Reading direction',
          content: (<>
            {textReadingDirectionParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
            <CodeBlock className="docs-code-block">{textReadingDirectionCode}</CodeBlock>
            <ExampleZone>
              <ul className="text-language-examples">
                {textRightToLeftExamples.map(({ language, lang, text }) => <li key={lang} dir="rtl" lang={lang}>
                  <Card>
                    <p className="mz-text-label-md" lang="en">{language}</p>
                    <p>{text}</p>
                  </Card>
                </li>)}
              </ul>
            </ExampleZone>
            <ExampleZone>
              <ul className="text-language-examples">
                {textVerticalExamples.map(({ language, lang, text }) => <li key={lang}>
                  <Card>
                    <p className="mz-text-label-md">{language}</p>
                    <p className="text-vertical-example" lang={lang}>{text}</p>
                  </Card>
                </li>)}
              </ul>
            </ExampleZone>
          </>),
        },
        {
          id: 'text-technical-details',
          title: 'Technical details',
          sections: [
            {
              id: 'text-css-properties',
              title: 'CSS properties',
              content: <DocsTable aria-label="Text CSS properties" nameColumn="Property" rows={textCssProperties} />,
            },
            {
              id: 'text-tokens',
              title: 'Tokens',
              content: <DocsTable aria-label="Text tokens" nameColumn="Token" rows={[{ name: '--line-length', description: <>The longest a line of reading text should get. Currently <TokenValue token="--line-length" />.</> }]} />,
            },
          ],
        },
      ]}
      relatedPages={textRelatedPages}
      references={textReferences}
    />
  )
}
