import type { RefAttributes } from 'react'
import { Heading as ReactAriaHeading, type HeadingProps } from 'react-aria-components/Heading'
import { composeClassName } from '../composeClassName'

export function Heading(props: HeadingProps & RefAttributes<HTMLHeadingElement>) {
  return <ReactAriaHeading {...props} className={composeClassName('mz-heading', props.className)} />
}

export type {
  HeadingProps,
} from 'react-aria-components/Heading'
