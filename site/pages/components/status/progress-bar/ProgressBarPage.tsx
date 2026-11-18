import { useState } from 'react'
import { DemoBlock, ProgressBar, Switch } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
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
          <DemoBlock
            align="stretch"
            codeView={progressBarExampleCode({ value: Number(value), isIndeterminate, hasLabel })}
            endPanel={<>
              {!isIndeterminate && <PanelSelect label="value" options={progressBarValues} value={value} onChange={setValue} />}
              <Switch isSelected={isIndeterminate} onChange={setIsIndeterminate}>isIndeterminate</Switch>
              <Switch isSelected={hasLabel} onChange={setHasLabel}>label</Switch>
            </>}
          >
            <ProgressBar
              label={hasLabel ? progressBarExampleLabel : undefined}
              aria-label={hasLabel ? undefined : progressBarExampleLabel}
              value={Number(value)}
              isIndeterminate={isIndeterminate}
            />
          </DemoBlock>
        ),
      }}
    />
  )
}
