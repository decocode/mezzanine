import type { RefAttributes } from 'react'
import { Text as ReactAriaText, type TextProps } from 'react-aria-components/Text'
import { composeClassName } from '../composeClassName'

export function Text(props: TextProps & RefAttributes<HTMLElement>) {
  return <ReactAriaText {...props} className={composeClassName('mz-text', props.className)} />
}

export type {
  TextProps,
} from 'react-aria-components/Text'
