import type { RefAttributes } from 'react'
import {
  CheckboxGroup as ReactAriaCheckboxGroup,
  type CheckboxGroupProps,
} from 'react-aria-components/CheckboxGroup'
import { composeClassName } from '../composeClassName'

export function CheckboxGroup(props: CheckboxGroupProps & RefAttributes<HTMLDivElement>) {
  return <ReactAriaCheckboxGroup {...props} className={composeClassName('mz-checkbox-group', props.className)} />
}

export type {
  CheckboxGroupProps,
  CheckboxGroupRenderProps,
} from 'react-aria-components/CheckboxGroup'
