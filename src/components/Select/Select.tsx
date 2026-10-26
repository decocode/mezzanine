import type { ReactNode, RefAttributes } from 'react'
import type { TooltipProps } from 'react-aria-components/Tooltip'
import type { ButtonSize } from '../Button/Button'
import {
  Select as ReactAriaSelect,
  SelectValue as ReactAriaSelectValue,
  type SelectProps as ReactAriaSelectProps,
  type SelectValueProps,
} from 'react-aria-components/Select'
import { Button } from 'react-aria-components/Button'
import type { ValidationResult } from 'react-aria-components'
import { composeClassName } from '../composeClassName'
import { FieldError } from '../FieldError/FieldError'
import { Label } from '../Label/Label'
import { ListBox } from '../ListBox/ListBox'
import { Popover } from '../Popover/Popover'
import { Text } from '../Text/Text'
import { Tooltip, TooltipTrigger } from '../Tooltip/Tooltip'
import { ChevronDownIcon } from '../../icons/Icons'

// How much the chevron area stands out: primary fills it like a primary Button, secondary keeps it
// quiet, divided from the value by a line.
export type SelectHierarchy = 'primary' | 'secondary'

export interface SelectProps<T extends object = object, M extends 'single' | 'multiple' = 'single'> extends Omit<ReactAriaSelectProps<T, M>, 'children'> {
  // The visible label. Without one, give the Select an aria-label.
  label?: ReactNode
  // Help text under the field.
  description?: ReactNode
  // The message shown when the field is invalid.
  errorMessage?: string | ((validation: ValidationResult) => string)
  // The options, when they come from data.
  items?: Iterable<T>
  // ListBoxItems, or a function that renders one for each item.
  children: ReactNode | ((item: T) => ReactNode)
  hierarchy?: SelectHierarchy
  // Button's five sizes, since the chevron area works like a button. md is the default.
  size?: ButtonSize
  // iconOnly shows only the chosen option's icon in the trigger, from ListBoxItem's icon. Screen readers
  // still hear the option's text. Without a visible label, the aria-label shows in a tooltip.
  valuePosition?: 'iconOnly'
  tooltipPosition?: TooltipProps['placement']
}

// A field that picks from a list. Mezzanine draws the label, the trigger with its value and chevron, the
// help and error text, and the list in a Popover, following React Aria's vanilla starter.
export function Select<T extends object = object, M extends 'single' | 'multiple' = 'single'>({ label, description, errorMessage, items, children, hierarchy = 'secondary', size = 'md', valuePosition, tooltipPosition, ...props }: SelectProps<T, M>) {
  const trigger = (
    <Button className="mz-select-trigger" data-hierarchy={hierarchy} data-size={size}>
      <SelectValue />
      <ChevronDownIcon className="mz-select-chevron" />
    </Button>
  )
  const tooltipLabel = valuePosition === 'iconOnly' && label == null ? props['aria-label'] : undefined
  return (
    <ReactAriaSelect<T, M> {...props} className={composeClassName('mz-select', props.className)} data-value-position={valuePosition}>
      {label != null && <Label>{label}</Label>}
      {tooltipLabel === undefined ? trigger : (
        <TooltipTrigger>
          {trigger}
          <Tooltip placement={tooltipPosition}>{tooltipLabel}</Tooltip>
        </TooltipTrigger>
      )}
      {description != null && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <Popover>
        <ListBox items={items}>{children}</ListBox>
      </Popover>
    </ReactAriaSelect>
  )
}

export function SelectValue<T>(props: SelectValueProps<T> & RefAttributes<HTMLSpanElement>) {
  return <ReactAriaSelectValue<T> {...props} className={composeClassName('mz-select-value', props.className)} />
}

export type {
  SelectRenderProps,
  SelectValueProps,
  SelectValueRenderProps,
} from 'react-aria-components/Select'
