import { TooltipTrigger as ReactAriaTooltipTrigger, type TooltipTriggerComponentProps } from 'react-aria-components/Tooltip'

export { Tooltip } from 'react-aria-components/Tooltip'
export type { TooltipProps, TooltipRenderProps, TooltipTriggerComponentProps } from 'react-aria-components/Tooltip'

// Keep React Aria's interaction behaviour, with a shorter default hover delay.
export function TooltipTrigger({ delay = 300, ...props }: TooltipTriggerComponentProps) {
  return <ReactAriaTooltipTrigger {...props} delay={delay} />
}
