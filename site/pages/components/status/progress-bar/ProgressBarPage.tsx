import { useState } from 'react'
import { DemoArea, ProgressBar } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { progressBarContent, progressBarExampleCode, progressBarExampleLabel, progressBarValues } from './progressBarContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function ProgressBarPage() {
  const [value, setValue] = useState<(typeof progressBarValues)[number]>('60')
  const [isIndeterminate, setIsIndeterminate] = useState(false)
  const [hasLabel, setHasLabel] = useState(true)
  return (
    <ContentPage
      content={progressBarContent}
      parts={{
        example: (
          <DemoArea
            align="stretch"
            codeView={progressBarExampleCode({ value: Number(value), isIndeterminate, hasLabel })}
            endPanel={<>
              {!isIndeterminate && <PanelSelect label="value" options={progressBarValues} value={value} onChange={setValue} />}
              <PanelSwitch isSelected={isIndeterminate} onChange={setIsIndeterminate}>isIndeterminate</PanelSwitch>
              <PanelSwitch isSelected={hasLabel} onChange={setHasLabel}>label</PanelSwitch>
            </>}
          >
            <ProgressBar
              label={hasLabel ? progressBarExampleLabel : undefined}
              aria-label={hasLabel ? undefined : progressBarExampleLabel}
              value={Number(value)}
              isIndeterminate={isIndeterminate}
            />
          </DemoArea>
        ),
      }}
    />
  )
}
