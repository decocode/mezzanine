import type { ReactNode } from 'react'
import { Button as ReactAriaButton } from 'react-aria-components/Button'
import { Heading, type HeadingProps } from 'react-aria-components/Heading'
import { ChevronDownIcon } from '../icons/StudioIcons'

export {
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
} from 'react-aria-components/DisclosureGroup'

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
      <ReactAriaButton className="mezzanine-disclosure-trigger" slot="trigger">
        <span>{children}</span>
        <ChevronDownIcon className="mezzanine-disclosure-chevron" />
      </ReactAriaButton>
    </Heading>
  )
}
