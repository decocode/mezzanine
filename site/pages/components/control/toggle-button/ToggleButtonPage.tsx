import { useState } from 'react'
import { BulbIcon, Checkbox, DemoArea, ListBoxItem, Select, Separator, ToggleButton, type ButtonSize } from '@decocode/mezzanine'
import { buttonSizes } from '../button/buttonContent'
import {
  toggleButtonContent, toggleButtonExample, toggleButtonExampleCode, toggleButtonFlags, toggleButtonHierarchies, toggleButtonIconPositions,
  toggleButtonLabelPositions, toggleButtonTooltipPositions,
} from './toggleButtonContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function ToggleButtonPage() {
  const [hierarchy, setHierarchy] = useState<(typeof toggleButtonHierarchies)[number]>('primary')
  const [size, setSize] = useState<ButtonSize>('md')
  const [iconPosition, setIconPosition] = useState<(typeof toggleButtonIconPositions)[number]>('leading')
  const [labelPosition, setLabelPosition] = useState<(typeof toggleButtonLabelPositions)[number]>('tooltip')
  const [tooltipPosition, setTooltipPosition] = useState<(typeof toggleButtonTooltipPositions)[number]>('top')
  const [flags, setFlags] = useState<Record<(typeof toggleButtonFlags)[number], boolean>>({ icon: false, defaultSelected: false, isDisabled: false })
  const flagCheckbox = (name: (typeof toggleButtonFlags)[number]) => (
    <Checkbox key={name} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</Checkbox>
  )
  // iconPosition needs an icon; labelPosition only applies to an icon on its own, and tooltipPosition
  // to a label in a tooltip.
  const isIconButton = flags.icon && iconPosition === 'only'
  const hasTooltip = isIconButton && labelPosition === 'tooltip'
  const props = {
    hierarchy: hierarchy === 'primary' ? undefined : hierarchy, size: size === 'md' ? undefined : size,
    defaultSelected: flags.defaultSelected, isDisabled: flags.isDisabled,
  }
  const iconProps = flags.icon ? { iconPosition: iconPosition === 'leading' ? undefined : iconPosition } : {}
  const labelProps = isIconButton ? { labelPosition: hasTooltip ? undefined : labelPosition } : {}
  const tooltipProps = hasTooltip ? { tooltipPosition: tooltipPosition === 'top' ? undefined : tooltipPosition } : {}
  return (
    <ContentPage
      content={toggleButtonContent}
      parts={{
        // The Properties panel has a control for each prop that changes what the toggle looks like or does.
        example: (
          <DemoArea
            codeView={toggleButtonExampleCode({ icon: flags.icon, ...iconProps, ...labelProps, ...tooltipProps, ...props })}
            endPanel={<>
              <Select label="hierarchy" selectedKey={hierarchy} onSelectionChange={(key) => { if (key != null) setHierarchy(key as (typeof toggleButtonHierarchies)[number]) }}>
                {toggleButtonHierarchies.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
              </Select>
              <Select label="size" selectedKey={size} onSelectionChange={(key) => { if (key != null) setSize(key as ButtonSize) }}>
                {buttonSizes.map((option) => <ListBoxItem key={option.size} id={option.size}>{option.size}</ListBoxItem>)}
              </Select>
              <Separator />
              {flagCheckbox('defaultSelected')}
              {flagCheckbox('isDisabled')}
              <Separator />
              {flagCheckbox('icon')}
              {/* Each setting appears once it applies: iconPosition with an icon, labelPosition for an icon
                  on its own, and tooltipPosition for a label in a tooltip. */}
              {flags.icon && (
                <Select
                  className="demo-panel-new-row"
                  label="iconPosition"
                  selectedKey={iconPosition}
                  onSelectionChange={(key) => { if (key != null) setIconPosition(key as (typeof toggleButtonIconPositions)[number]) }}
                >
                  {toggleButtonIconPositions.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
                </Select>
              )}
              {isIconButton && (
                <Select
                  label="labelPosition"
                  selectedKey={labelPosition}
                  onSelectionChange={(key) => { if (key != null) setLabelPosition(key as (typeof toggleButtonLabelPositions)[number]) }}
                >
                  {toggleButtonLabelPositions.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
                </Select>
              )}
              {hasTooltip && (
                <Select
                  label="tooltipPosition"
                  selectedKey={tooltipPosition}
                  onSelectionChange={(key) => { if (key != null) setTooltipPosition(key as (typeof toggleButtonTooltipPositions)[number]) }}
                >
                  {toggleButtonTooltipPositions.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
                </Select>
              )}
            </>}
          >
            {/* A new key starts the example again, because a default only applies when it first appears. */}
            {isIconButton && !hasTooltip
              ? <ToggleButton key={String(flags.defaultSelected)} {...props} icon={<BulbIcon />} iconPosition="only" labelPosition={labelPosition as 'top' | 'bottom'}>{toggleButtonExample.label}</ToggleButton>
              : isIconButton
                ? <ToggleButton key={String(flags.defaultSelected)} {...props} icon={<BulbIcon />} iconPosition="only" tooltipPosition={tooltipPosition}>{toggleButtonExample.label}</ToggleButton>
                : <ToggleButton key={String(flags.defaultSelected)} {...props} icon={flags.icon ? <BulbIcon /> : undefined} iconPosition={iconPosition === 'trailing' ? 'trailing' : 'leading'}>{toggleButtonExample.label}</ToggleButton>}
          </DemoArea>
        ),
      }}
    />
  )
}
