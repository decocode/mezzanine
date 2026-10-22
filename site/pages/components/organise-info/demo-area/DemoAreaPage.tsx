import { useState } from 'react'
import { Button, DemoArea, Heading, SwitchButton, SwitchField } from '@decocode/mezzanine'
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
        variants: <div className="example-stack">
          <Heading level={3} className="mz-text-heading-sm">{demoAreaExampleLabels.panelHeading}</Heading>
          <DemoWithEndPanel />
          <Heading level={3} className="mz-text-heading-sm">{demoAreaExampleLabels.codeHeading}</Heading>
          <DemoArea code={demoAreaExampleCode}><Button>{demoAreaExampleLabels.button}</Button></DemoArea>
        </div>,
      }}
    />
  )
}
