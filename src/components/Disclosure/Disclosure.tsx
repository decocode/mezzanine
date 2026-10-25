import type { ReactNode, RefAttributes } from 'react'
import { Button as ReactAriaButton } from 'react-aria-components/Button'
import {
  Disclosure as ReactAriaDisclosure,
  DisclosureGroup as ReactAriaDisclosureGroup,
  DisclosurePanel as ReactAriaDisclosurePanel,
  type DisclosureGroupProps,
  type DisclosurePanelProps,
  type DisclosureProps,
} from 'react-aria-components/DisclosureGroup'
import { composeClassName } from '../composeClassName'
import { Heading, type HeadingProps } from '../Heading/Heading'
import { ChevronRightIcon } from '../../icons/Icons'

export function Disclosure(props: DisclosureProps & RefAttributes<HTMLDivElement>) {
  return <ReactAriaDisclosure {...props} className={composeClassName('mz-disclosure', props.className)} />
}

export function DisclosureGroup(props: DisclosureGroupProps & RefAttributes<HTMLDivElement>) {
  return <ReactAriaDisclosureGroup {...props} className={composeClassName('mz-disclosure-group', props.className)} />
}

export function DisclosurePanel(props: DisclosurePanelProps & RefAttributes<HTMLDivElement>) {
  return <ReactAriaDisclosurePanel {...props} className={composeClassName('mz-disclosure-panel', props.className)} />
}

export type {
  DisclosureGroupProps,
  DisclosureGroupRenderProps,
  DisclosurePanelProps,
  DisclosurePanelRenderProps,
  DisclosureProps,
  DisclosureRenderProps,
} from 'react-aria-components/DisclosureGroup'

export interface DisclosureHeaderProps extends Omit<HeadingProps, 'children'> {
  children: ReactNode
}

export function DisclosureHeader({ children, level = 3, ...headingProps }: DisclosureHeaderProps) {
  return (
    <Heading {...headingProps} level={level}>
      <ReactAriaButton className="mz-disclosure-trigger mz-text-title-sm mz-text-default" slot="trigger">
        <span>{children}</span>
        <ChevronRightIcon className="mz-disclosure-chevron" />
      </ReactAriaButton>
    </Heading>
  )
}
