import { useState } from 'react'
import { Button, DemoArea, type DemoAreaAlign } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { demoAreaAligns, demoAreaContent, demoAreaExampleCode, demoAreaExampleLabels, demoAreaFlags, demoAreaInnerCode } from './demoAreaContent'
import { ContentPage } from '../../../../templates/ContentPage'

// The example is a demo area showing another one, so its Properties panel can change the inner one's
// props, including whether that one has its own panel.
export default function DemoAreaPage() {
  const [align, setAlign] = useState<DemoAreaAlign>('center')
  const [flags, setFlags] = useState<Record<(typeof demoAreaFlags)[number], boolean>>({ codeView: true, endPanel: true })
  const [isDisabled, setIsDisabled] = useState(false)
  return (
    <ContentPage
      content={demoAreaContent}
      parts={{
        example: (
          <DemoArea
            align="stretch"
            codeView={demoAreaExampleCode({ align, ...flags })}
            endPanel={<>
              <PanelSelect label="align" options={demoAreaAligns} value={align} onChange={setAlign} />
              {demoAreaFlags.map((name) => (
                <PanelSwitch key={name} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
              ))}
            </>}
          >
            <DemoArea
              align={align}
              codeView={flags.codeView ? demoAreaInnerCode : undefined}
              endPanel={flags.endPanel ? <PanelSwitch isSelected={isDisabled} onChange={setIsDisabled}>{demoAreaExampleLabels.switch}</PanelSwitch> : undefined}
            >
              <Button isDisabled={isDisabled}>{demoAreaExampleLabels.button}</Button>
            </DemoArea>
          </DemoArea>
        ),
      }}
    />
  )
}
