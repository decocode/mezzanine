import type { RefAttributes } from 'react'
import { Link as ReactAriaLink, type LinkProps } from 'react-aria-components/Link'
import { composeClassName } from '../composeClassName'

export function Link(props: LinkProps & RefAttributes<HTMLAnchorElement>) {
  return <ReactAriaLink {...props} className={composeClassName('mz-link', props.className)} />
}

export type {
  LinkProps,
  LinkRenderProps,
} from 'react-aria-components/Link'
