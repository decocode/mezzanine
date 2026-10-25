import { useState } from 'react'
import { Button, DemoArea, Heading, SwitchButton, SwitchField, Text } from '@decocode/mezzanine'
import { RichText } from '../../../../components/RichText'
import { demoAreaContent, demoAreaExampleCode, demoAreaExampleLabels } from './demoAreaContent'
import { ContentPage } from '../../../../templates/ContentPage'

function DemoWithEndPanel() {
  const [isDisabled, setIsDisabled] = useState(false)
  return (
    <DemoArea endPanel={<SwitchField isSelected={isDisabled} onChange={setIsDisabled}><SwitchButton>{demoAreaExampleLabels.switch}</SwitchButton></SwitchField>}>
      <Button isDisabled={isDisabled}>{demoAreaExampleLabels.button}</Button>
    </DemoArea>
  )
}

export default function DemoAreaPage() {
  return (
    <ContentPage
      content={demoAreaContent}
      parts={{
        example: <DemoArea><Button>{demoAreaExampleLabels.button}</Button></DemoArea>,
        variants: <div className="demo-headed-list">
          <div className="demo-headed mz-prose">
            <Heading level={3} className="mz-text-heading-sm">{demoAreaExampleLabels.panelHeading}</Heading>
            <Text elementType="p" className="mz-text-body-md"><RichText text={demoAreaExampleLabels.panelDescription} /></Text>
            <DemoWithEndPanel />
          </div>
          <div className="demo-headed mz-prose">
            <Heading level={3} className="mz-text-heading-sm">{demoAreaExampleLabels.codeHeading}</Heading>
            <Text elementType="p" className="mz-text-body-md"><RichText text={demoAreaExampleLabels.codeDescription} /></Text>
            <DemoArea codeView={demoAreaExampleCode}><Button>{demoAreaExampleLabels.button}</Button></DemoArea>
          </div>
        </div>,
      }}
    />
  )
}
