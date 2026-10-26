import { useState } from 'react'
import { Checkbox, DemoArea, ListBoxItem, Select, Slider } from '@decocode/mezzanine'
import { sliderContent, sliderDefaultValues, sliderExample, sliderExampleCode, sliderFlags, sliderOrientations } from './sliderContent'
import { ContentPage } from '../../../../templates/ContentPage'

type DefaultValueKey = keyof typeof sliderDefaultValues

export default function SliderPage() {
  const [defaultValueKey, setDefaultValueKey] = useState<DefaultValueKey>('40')
  const [orientation, setOrientation] = useState<(typeof sliderOrientations)[number]>('horizontal')
  const [flags, setFlags] = useState<Record<(typeof sliderFlags)[number], boolean>>({ fillOffset: false, formatValue: false, isDisabled: false })
  const chosenValue: number | readonly number[] = sliderDefaultValues[defaultValueKey]
  const defaultValue = typeof chosenValue === 'number' ? chosenValue : [...chosenValue]
  const isRange = Array.isArray(defaultValue)
  const isVertical = orientation === 'vertical'
  return (
    <ContentPage
      content={sliderContent}
      parts={{
        // The Properties panel has a control for each prop that changes what the slider looks like or does.
        example: (
          <DemoArea
            align="stretch"
            codeView={sliderExampleCode({ defaultValue, orientation, ...flags })}
            endPanel={<>
              <Select label={sliderExample.defaultValueLabel} selectedKey={defaultValueKey} onSelectionChange={(key) => { if (key != null) setDefaultValueKey(key as DefaultValueKey) }}>
                {Object.keys(sliderDefaultValues).map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
              </Select>
              <Select label={sliderExample.orientationLabel} selectedKey={orientation} onSelectionChange={(key) => { if (key != null) setOrientation(key as (typeof sliderOrientations)[number]) }}>
                {sliderOrientations.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
              </Select>
              {sliderFlags.map((name) => (
                <Checkbox key={name} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</Checkbox>
              ))}
            </>}
          >
            {/* A new key starts the example again, because a default only applies when it first appears. */}
            <Slider<number | number[]>
              key={defaultValueKey}
              label={isVertical ? undefined : sliderExample.label}
              aria-label={isVertical ? sliderExample.label : undefined}
              defaultValue={defaultValue}
              thumbLabels={isRange ? [...sliderExample.rangeThumbLabels] : undefined}
              orientation={orientation}
              fillOffset={flags.fillOffset ? sliderExample.fillOffset : undefined}
              formatValue={flags.formatValue ? (value) => `${value}%` : undefined}
              isDisabled={flags.isDisabled}
            />
          </DemoArea>
        ),
      }}
    />
  )
}
