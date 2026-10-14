import { forwardRef, useContext, type ReactNode } from 'react'
import { DisclosurePanel as ReactAriaDisclosurePanel, DisclosureStateContext, type DisclosurePanelProps } from 'react-aria-components/Disclosure'
import { useDisclosurePanelMotion } from './useDisclosurePanelMotion'
import { Button as ReactAriaButton } from 'react-aria-components/Button'
import { Heading, type HeadingProps } from './Heading'
import { ChevronRightIcon } from '../icons/StudioIcons'

export {
  Disclosure,
  DisclosureGroup,
} from 'react-aria-components/DisclosureGroup'

export type {
  DisclosureGroupProps,
  DisclosureGroupRenderProps,
  DisclosurePanelProps,
  DisclosurePanelRenderProps,
  DisclosureProps,
  DisclosureRenderProps,
} from 'react-aria-components/DisclosureGroup'

// Keep React Aria's panel, measured size, semantics and find-in-page handling.
export const DisclosurePanel = forwardRef<HTMLDivElement, DisclosurePanelProps>(function DisclosurePanel(props, ref) {
  const state = useContext(DisclosureStateContext)
  const panelRef = useDisclosurePanelMotion(state?.isExpanded ?? false, ref)
  return <ReactAriaDisclosurePanel {...props} ref={panelRef} />
})

export interface DisclosureHeaderProps extends Omit<HeadingProps, 'children'> {
  children: ReactNode
}

export function DisclosureHeader({ children, level = 3, ...headingProps }: DisclosureHeaderProps) {
  return (
    <Heading {...headingProps} level={level}>
      <ReactAriaButton className="mezzanine-disclosure-trigger mz-text-title-sm mz-text-default" slot="trigger">
        <span>{children}</span>
        <ChevronRightIcon className="mezzanine-disclosure-chevron" />
      </ReactAriaButton>
    </Heading>
  )
}
