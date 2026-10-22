import { useState } from 'react'
import { Card, Checkbox, CodeBlock, DemoArea } from '@decocode/mezzanine'
import { RichText } from '../../../../components/RichText'
import {
  readingDirectionContent, readingDirectionRightToLeftExamples, readingDirectionVerticalExamples,
  rightToLeftCode, startAndEndCode, startAndEndExample, topToBottomCode,
} from './readingDirectionContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function ReadingDirectionPage() {
  const [isRightToLeft, setRightToLeft] = useState(false)
  return (
    <ContentPage
      content={readingDirectionContent}
      parts={{
        startAndEnd: (<>
          <DemoArea>
            <Checkbox isSelected={isRightToLeft} onChange={setRightToLeft}>{startAndEndExample.toggle}</Checkbox>
            <div dir={isRightToLeft ? 'rtl' : 'ltr'} className="mz-ratio-pair text-direction-example" data-fraction="1/2">
              <div>
                <p className="mz-text-label-md">{startAndEndExample.physicalLabel}</p>
                <p className="text-direction-physical mz-text-body-md"><RichText text={startAndEndExample.physicalText} /></p>
              </div>
              <div>
                <p className="mz-text-label-md">{startAndEndExample.logicalLabel}</p>
                <p className="text-direction-logical mz-text-body-md"><RichText text={startAndEndExample.logicalText} /></p>
              </div>
            </div>
          </DemoArea>
          <CodeBlock className="docs-code-block">{startAndEndCode}</CodeBlock>
        </>),
        rightToLeft: (<>
          <CodeBlock className="docs-code-block">{rightToLeftCode}</CodeBlock>
          <DemoArea>
            <ul className="text-language-examples">
              {readingDirectionRightToLeftExamples.map(({ language, lang, text }) => <li key={lang} dir="rtl" lang={lang}>
                <Card>
                  <p className="mz-text-label-md" lang="en">{language}</p>
                  <p>{text}</p>
                </Card>
              </li>)}
            </ul>
          </DemoArea>
        </>),
        topToBottom: (<>
          <CodeBlock className="docs-code-block">{topToBottomCode}</CodeBlock>
          <DemoArea>
            <ul className="text-language-examples">
              {readingDirectionVerticalExamples.map(({ language, lang, text }) => <li key={lang}>
                <Card>
                  <p className="mz-text-label-md">{language}</p>
                  <p className="text-vertical-example" lang={lang}>{text}</p>
                </Card>
              </li>)}
            </ul>
          </DemoArea>
        </>),
      }}
    />
  )
}
