import { useState } from 'react'
import { DemoBlock, NumberField, Switch } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import {
  numberFieldContent, numberFieldExampleCode, numberFieldExampleLabel, numberFieldExampleText, numberFieldFlags, numberFieldFormatOptions, numberFieldFormats,
  numberFieldSteps,
} from './numberFieldContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function NumberFieldPage() {
  const [step, setStep] = useState<(typeof numberFieldSteps)[number]>('1')
  const [format, setFormat] = useState<(typeof numberFieldFormats)[number]>('number')
  const [flags, setFlags] = useState<Record<(typeof numberFieldFlags)[number], boolean>>({ description: false, isInvalid: false, isReadOnly: false, isDisabled: false })
  const props = {
    description: flags.description ? numberFieldExampleText.description : undefined,
    isInvalid: flags.isInvalid,
    errorMessage: flags.isInvalid ? numberFieldExampleText.errorMessage : undefined,
    isReadOnly: flags.isReadOnly,
    isDisabled: flags.isDisabled,
  }
  const panelSwitch = (name: (typeof numberFieldFlags)[number]) => (
    <Switch isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</Switch>
  )
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
              {/* The field's parts in their own order, then the states that affect the whole field. A
                  field is either disabled or invalid, so each of those switches hides while the other is on. */}
              {panelSwitch('description')}
              {!flags.isDisabled && panelSwitch('isInvalid')}
              {panelSwitch('isReadOnly')}
              {!flags.isInvalid && panelSwitch('isDisabled')}
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
