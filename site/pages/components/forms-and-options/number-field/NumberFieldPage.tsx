import { useState } from 'react'
import { DemoBlock, NumberField } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import {
  numberFieldContent, numberFieldExampleCode, numberFieldExampleLabel, numberFieldExampleText, numberFieldFlags, numberFieldFormatOptions, numberFieldFormats,
  numberFieldSteps,
} from './numberFieldContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function NumberFieldPage() {
  const [step, setStep] = useState<(typeof numberFieldSteps)[number]>('1')
  const [format, setFormat] = useState<(typeof numberFieldFormats)[number]>('number')
  const [flags, setFlags] = useState<Record<(typeof numberFieldFlags)[number], boolean>>({ description: false, isDisabled: false, isReadOnly: false, isInvalid: false })
  const [hasErrorMessage, setHasErrorMessage] = useState(false)
  const props = {
    description: flags.description ? numberFieldExampleText.description : undefined,
    isDisabled: flags.isDisabled,
    isReadOnly: flags.isReadOnly,
    isInvalid: flags.isInvalid,
    errorMessage: flags.isInvalid && hasErrorMessage ? numberFieldExampleText.errorMessage : undefined,
  }
  return (
    <ContentPage
      content={numberFieldContent}
      parts={{
        example: (
          <DemoBlock
            codeView={numberFieldExampleCode({ step: Number(step), format, ...props })}
            endPanel={<>
              <PanelSelect label="step" options={numberFieldSteps} value={step} onChange={setStep} />
              <PanelSelect label="formatOptions" options={numberFieldFormats} value={format} onChange={setFormat} />
              {numberFieldFlags.map((name) => (
                <PanelSwitch key={name} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
              ))}
              {flags.isInvalid && <PanelSwitch isSelected={hasErrorMessage} onChange={setHasErrorMessage}>errorMessage</PanelSwitch>}
            </>}
          >
            {/* A new key starts the field again, so a change of format shows its default value afresh. */}
            <NumberField
              key={format}
              label={numberFieldExampleLabel}
              defaultValue={format === 'percent' ? 0.04 : 4}
              minValue={0}
              step={format === 'percent' ? Number(step) / 100 : Number(step)}
              formatOptions={numberFieldFormatOptions[format]}
              {...props}
            />
          </DemoBlock>
        ),
      }}
    />
  )
}
