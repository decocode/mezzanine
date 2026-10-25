import type { RefAttributes } from 'react'
import {
  Tooltip as ReactAriaTooltip,
  TooltipTrigger as ReactAriaTooltipTrigger,
  type TooltipProps,
  type TooltipTriggerComponentProps,
} from 'react-aria-components/Tooltip'
import { composeClassName } from '../composeClassName'

export type { TooltipProps, TooltipRenderProps, TooltipTriggerComponentProps } from 'react-aria-components/Tooltip'

export function Tooltip(props: TooltipProps & RefAttributes<HTMLDivElement>) {
  return <ReactAriaTooltip {...props} className={composeClassName('mz-tooltip', props.className)} />
}

// Keep React Aria's interaction behaviour, with a shorter default hover delay.
export function TooltipTrigger({ delay = 500, ...props }: TooltipTriggerComponentProps) {
  return <ReactAriaTooltipTrigger {...props} delay={delay} />
}
