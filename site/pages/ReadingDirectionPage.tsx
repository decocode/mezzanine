import { useState } from 'react'
import { Card, Checkbox, CodeBlock, Split } from '@decocode/mezzanine'
import { DocsPageTemplate } from '../templates/DocsPageTemplate'
import { ExampleZone } from '../components/ExampleZone'
import {
  readingDirectionReferences, readingDirectionRelatedPages, readingDirectionRightToLeftExamples, readingDirectionVerticalExamples,
  rightToLeftCode, rightToLeftParagraph, startAndEndCode, startAndEndExample, startAndEndParagraphs, topToBottomCode, topToBottomParagraph,
} from '../content/readingDirectionContent'

export default function ReadingDirectionPage() {
  const [isRightToLeft, setRightToLeft] = useState(false)
  return (
    <DocsPageTemplate
      title="Reading direction"
      sections={[
        {
          id: 'reading-direction-start-and-end-heading',
          title: 'Start and end',
          content: (<>
            {startAndEndParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
            <ExampleZone>
              <Checkbox isSelected={isRightToLeft} onChange={setRightToLeft}>{startAndEndExample.toggle}</Checkbox>
              <Split dir={isRightToLeft ? 'rtl' : 'ltr'} className="text-direction-example">
                <div>
                  <p className="mz-text-label-md">{startAndEndExample.physicalLabel}</p>
                  <p className="text-direction-physical mz-text-body-md">{startAndEndExample.physicalText}</p>
                </div>
                <div>
                  <p className="mz-text-label-md">{startAndEndExample.logicalLabel}</p>
                  <p className="text-direction-logical mz-text-body-md">{startAndEndExample.logicalText}</p>
                </div>
              </Split>
            </ExampleZone>
            <CodeBlock className="docs-code-block">{startAndEndCode}</CodeBlock>
          </>),
        },
        {
          id: 'reading-direction-right-to-left-heading',
          title: 'Right to left',
          content: (<>
            <p className="component-section-description">{rightToLeftParagraph}</p>
            <CodeBlock className="docs-code-block">{rightToLeftCode}</CodeBlock>
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
          </>),
        },
        {
          id: 'reading-direction-top-to-bottom-heading',
          title: 'Top to bottom',
          content: (<>
            <p className="component-section-description">{topToBottomParagraph}</p>
            <CodeBlock className="docs-code-block">{topToBottomCode}</CodeBlock>
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
