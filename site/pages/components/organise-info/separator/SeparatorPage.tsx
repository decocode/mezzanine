import { useState } from 'react'
import { DemoBlock, Separator, Text } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { separatorContent, separatorExampleCode, separatorOrientations } from './separatorContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function SeparatorPage() {
  const [orientation, setOrientation] = useState<(typeof separatorOrientations)[number]>('horizontal')
  return (
    <ContentPage
      content={separatorContent}
      parts={{
        example: (
          <DemoBlock
            align="stretch"
            codeView={separatorExampleCode(orientation)}
            endPanel={<PanelSelect label="orientation" options={separatorOrientations} value={orientation} onChange={setOrientation} />}
          >
            {orientation === 'vertical'
              ? <div className="separator-example separator-example-row">
                <Text className="mz-text-body-md">Item A</Text>
                <Separator orientation="vertical" />
                <Text className="mz-text-body-md">Item B</Text>
              </div>
              : <div className="separator-example">
                <Text elementType="p" className="mz-text-body-md">Group A</Text>
                <Separator />
                <Text elementType="p" className="mz-text-body-md">Group B</Text>
              </div>}
          </DemoBlock>
        ),
      }}
    />
  )
}
