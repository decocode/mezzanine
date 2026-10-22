import type { ReactNode } from 'react'
import {
  Select as ReactAriaSelect,
  SelectValue,
  type SelectProps as ReactAriaSelectProps,
} from 'react-aria-components/Select'
import { Button } from 'react-aria-components/Button'
import { FieldError } from 'react-aria-components/FieldError'
import { Label } from 'react-aria-components/Label'
import { ListBox } from 'react-aria-components/ListBox'
import { Popover } from 'react-aria-components/Popover'
import { Text } from 'react-aria-components/Text'
import type { ValidationResult } from 'react-aria-components'
import { ChevronDownIcon } from '../../icons/Icons'

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
}

// A field that picks from a list. Mezzanine draws the label, the trigger with its value and chevron, the
// help and error text, and the list in a Popover, following React Aria's vanilla starter.
export function Select<T extends object = object, M extends 'single' | 'multiple' = 'single'>({ label, description, errorMessage, items, children, ...props }: SelectProps<T, M>) {
  return (
    <ReactAriaSelect<T, M> {...props}>
      {label != null && <Label>{label}</Label>}
      <Button className="mz-select-trigger">
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

export { SelectValue }

export type {
  SelectRenderProps,
  SelectValueProps,
  SelectValueRenderProps,
} from 'react-aria-components/Select'
