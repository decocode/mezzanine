import { useState } from 'react'
import { Button, DemoBlock, type DemoBlockAlign } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { demoBlockAligns, demoBlockContent, demoBlockExampleCode, demoBlockExampleLabels, demoBlockFlags, demoBlockInnerCode } from './demoBlockContent'
import { ContentPage } from '../../../../templates/ContentPage'

// The example is a demo block showing another one, so its Properties panel can change the inner one's
// props, including whether that one has its own panel.
export default function DemoBlockPage() {
  const [align, setAlign] = useState<DemoBlockAlign>('center')
  const [flags, setFlags] = useState<Record<(typeof demoBlockFlags)[number], boolean>>({ codeView: true, endPanel: true })
  const [isDisabled, setIsDisabled] = useState(false)
  return (
    <ContentPage
      content={demoBlockContent}
      parts={{
        example: (
          <DemoBlock
            align="stretch"
            codeView={demoBlockExampleCode({ align, ...flags })}
            endPanel={<>
              <PanelSelect label="align" options={demoBlockAligns} value={align} onChange={setAlign} />
              {demoBlockFlags.map((name) => (
                <PanelSwitch key={name} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
              ))}
            </>}
          >
            <DemoBlock
              align={align}
              codeView={flags.codeView ? demoBlockInnerCode : undefined}
              endPanel={flags.endPanel ? <PanelSwitch isSelected={isDisabled} onChange={setIsDisabled}>{demoBlockExampleLabels.switch}</PanelSwitch> : undefined}
            >
              <Button isDisabled={isDisabled}>{demoBlockExampleLabels.button}</Button>
            </DemoBlock>
          </DemoBlock>
        ),
      }}
    />
  )
}
