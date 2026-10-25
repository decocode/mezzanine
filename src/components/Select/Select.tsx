import type { ReactNode, RefAttributes } from 'react'
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
}

// A field that picks from a list. Mezzanine draws the label, the trigger with its value and chevron, the
// help and error text, and the list in a Popover, following React Aria's vanilla starter.
export function Select<T extends object = object, M extends 'single' | 'multiple' = 'single'>({ label, description, errorMessage, items, children, hierarchy = 'secondary', ...props }: SelectProps<T, M>) {
  return (
    <ReactAriaSelect<T, M> {...props} className={composeClassName('mz-select', props.className)}>
      {label != null && <Label>{label}</Label>}
      <Button className="mz-select-trigger" data-hierarchy={hierarchy}>
        <SelectValue />
        <ChevronDownIcon className="mz-select-chevron" />
      </Button>
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
