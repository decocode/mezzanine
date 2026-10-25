import type { RefAttributes } from 'react'
import { Group as ReactAriaGroup, type GroupProps } from 'react-aria-components/Group'
import { composeClassName } from '../composeClassName'

export function Group(props: GroupProps & RefAttributes<HTMLDivElement>) {
  return <ReactAriaGroup {...props} className={composeClassName('mz-group', props.className)} />
}

export type {
  GroupProps,
  GroupRenderProps,
} from 'react-aria-components/Group'
