import { useState } from 'react'
import { DemoArea, Meter } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { meterContent, meterExampleCode, meterExampleLabel, meterValues } from './meterContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function MeterPage() {
  const [value, setValue] = useState<(typeof meterValues)[number]>('35')
  const [hasLabel, setHasLabel] = useState(true)
  return (
    <ContentPage
      content={meterContent}
      parts={{
        example: (
          <DemoArea
            align="stretch"
            codeView={meterExampleCode(Number(value), hasLabel)}
            endPanel={<>
              <PanelSelect label="value" options={meterValues} value={value} onChange={setValue} />
              <PanelSwitch isSelected={hasLabel} onChange={setHasLabel}>label</PanelSwitch>
            </>}
          >
            <Meter label={hasLabel ? meterExampleLabel : undefined} aria-label={hasLabel ? undefined : meterExampleLabel} value={Number(value)} />
          </DemoArea>
        ),
      }}
    />
  )
}
