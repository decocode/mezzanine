import type { RefAttributes } from 'react'
import { Separator as ReactAriaSeparator, type SeparatorProps } from 'react-aria-components/Separator'
import { composeClassName } from '../composeClassName'

export function Separator(props: SeparatorProps & RefAttributes<HTMLElement>) {
  return <ReactAriaSeparator {...props} className={composeClassName('mz-separator', props.className)} />
}

export type {
  SeparatorProps,
} from 'react-aria-components/Separator'
