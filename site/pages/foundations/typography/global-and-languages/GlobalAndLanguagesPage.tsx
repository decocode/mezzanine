import { useState } from 'react'
import { Card, DemoArea } from '@decocode/mezzanine'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { RichText } from '../../../../components/RichText'
import {
  globalAndLanguagesContent, readingDirectionRightToLeftExamples, readingDirectionVerticalExamples,
  rightToLeftCode, startAndEndCode, startAndEndExample, topToBottomCode,
} from './globalAndLanguagesContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function GlobalAndLanguagesPage() {
  const [isRightToLeft, setRightToLeft] = useState(false)
  return (
    <ContentPage
      content={globalAndLanguagesContent}
      parts={{
        startAndEnd: (
          <DemoArea align="stretch" codeLanguage="css" codeView={startAndEndCode} endPanel={<PanelSwitch isSelected={isRightToLeft} onChange={setRightToLeft}>{startAndEndExample.toggle}</PanelSwitch>}>
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
        ),
        rightToLeft: (
          <DemoArea align="stretch" codeLanguage="html" codeView={rightToLeftCode}>
            <ul className="text-language-examples">
              {readingDirectionRightToLeftExamples.map(({ language, lang, text }) => <li key={lang} dir="rtl" lang={lang}>
                <Card>
                  <p className="mz-text-label-md" lang="en">{language}</p>
                  <p>{text}</p>
                </Card>
              </li>)}
            </ul>
          </DemoArea>
        ),
        topToBottom: (
          <DemoArea align="stretch" codeLanguage="css" codeView={topToBottomCode}>
            <ul className="text-language-examples">
              {readingDirectionVerticalExamples.map(({ language, lang, text }) => <li key={lang}>
                <Card>
                  <p className="mz-text-label-md">{language}</p>
                  <p className="text-vertical-example" lang={lang}>{text}</p>
                </Card>
              </li>)}
            </ul>
          </DemoArea>
        ),
      }}
    />
  )
}
