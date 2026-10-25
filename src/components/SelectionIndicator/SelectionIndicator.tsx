import type { RefAttributes } from 'react'
import {
  SelectionIndicator as ReactAriaSelectionIndicator,
  type SelectionIndicatorProps,
} from 'react-aria-components/SelectionIndicator'
import { composeClassName } from '../composeClassName'

export function SelectionIndicator(props: SelectionIndicatorProps & RefAttributes<HTMLDivElement>) {
  return <ReactAriaSelectionIndicator {...props} className={composeClassName('mz-selection-indicator', props.className)} />
}

export type {
  SelectionIndicatorProps,
} from 'react-aria-components/SelectionIndicator'
