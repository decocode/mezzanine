import type { RefAttributes } from 'react'
import { TextArea as ReactAriaTextArea, type TextAreaProps } from 'react-aria-components/TextField'
import { composeClassName } from '../composeClassName'

export function TextArea(props: TextAreaProps & RefAttributes<HTMLTextAreaElement>) {
  return <ReactAriaTextArea {...props} className={composeClassName('mz-text-area', props.className)} />
}

export type { TextAreaProps } from 'react-aria-components/TextField'
