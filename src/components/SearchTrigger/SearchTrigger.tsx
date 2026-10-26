import type { ReactNode, Ref } from 'react'
import { composeRenderProps } from 'react-aria-components'
import {
  Button as ReactAriaButton,
  type ButtonProps as ReactAriaButtonProps,
} from 'react-aria-components/Button'
import { SearchIcon } from '../../icons/Icons'
import { Badge } from '../Badge/Badge'
import { Tooltip, TooltipTrigger, type TooltipProps } from '../Tooltip/Tooltip'

interface SearchTriggerAppearanceProps extends ReactAriaButtonProps {
  // A keyboard shortcut shown in a Badge at the end, such as "⌘ K". Hidden from screen readers,
  // so pair it with aria-keyshortcuts.
  shortcut?: ReactNode
  // Where a tooltip label appears; React Aria's Tooltip placement.
  tooltipPosition?: TooltipProps['placement']
  ref?: Ref<HTMLButtonElement>
}

// As on Button: iconPosition="only" shows only the icon, with the label in a tooltip. The label is still the
// accessible name, so it must be plain text, and the shortcut Badge is left out.
export type SearchTriggerProps = SearchTriggerAppearanceProps & (
  | { iconPosition: 'only'; children: string }
  | { iconPosition?: 'leading' }
)

// The button that opens search, such as a DialogTrigger's search dialog. It's a React Aria Button
// with its own look, separate from Mezzanine's Button. Its children are its visible label and its
// accessible name; Mezzanine adds the search icon before them and an optional shortcut Badge after.
// With iconPosition="only" it shows only the icon, as an icon Button does.
export function SearchTrigger({ children, className, shortcut, iconPosition, tooltipPosition, ...buttonProps }: SearchTriggerProps) {
  // A tooltip label is the accessible name; the trigger itself shows only its icon.
  const tooltipLabel = iconPosition === 'only' && typeof children === 'string' ? children : undefined
  const trigger = (
    <ReactAriaButton
      {...buttonProps}
      {...(tooltipLabel !== undefined && { 'aria-label': buttonProps['aria-label'] ?? tooltipLabel })}
      data-icon-only={tooltipLabel !== undefined || undefined}
      className={composeRenderProps(className, (resolvedClassName) => (
        ['mz-search-trigger', resolvedClassName].filter(Boolean).join(' ')
      ))}
    >
      {composeRenderProps(children, (resolvedChildren) => (
        <>
          <SearchIcon className="mz-search-trigger-icon" />
          {tooltipLabel === undefined && <span className="mz-search-trigger-label">{resolvedChildren}</span>}
          {tooltipLabel === undefined && shortcut != null && <Badge aria-hidden="true" className="mz-search-trigger-shortcut">{shortcut}</Badge>}
        </>
      ))}
    </ReactAriaButton>
  )
  return tooltipLabel === undefined ? trigger : (
    <TooltipTrigger>
      {trigger}
      <Tooltip placement={tooltipPosition}>{tooltipLabel}</Tooltip>
    </TooltipTrigger>
  )
}
