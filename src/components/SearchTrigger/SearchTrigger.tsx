import type { ReactNode, Ref } from 'react'
import { composeRenderProps } from 'react-aria-components'
import {
  Button as ReactAriaButton,
  type ButtonProps as ReactAriaButtonProps,
} from 'react-aria-components/Button'
import { SearchIcon } from '../../icons/Icons'
import { Badge } from '../Badge/Badge'

export interface SearchTriggerProps extends ReactAriaButtonProps {
  // A keyboard shortcut shown in a Badge at the end, such as "⌘ K". Hidden from screen readers,
  // so pair it with aria-keyshortcuts.
  shortcut?: ReactNode
  ref?: Ref<HTMLButtonElement>
}

// The button that opens search, such as a DialogTrigger's search dialog. It's a React Aria Button
// with its own look, separate from Mezzanine's Button. Its children are its visible label and its
// accessible name; Mezzanine adds the search icon before them and an optional shortcut Badge after.
export function SearchTrigger({ children, className, shortcut, ...buttonProps }: SearchTriggerProps) {
  return (
    <ReactAriaButton
      {...buttonProps}
      className={composeRenderProps(className, (resolvedClassName) => (
        ['mz-search-trigger', resolvedClassName].filter(Boolean).join(' ')
      ))}
    >
      {composeRenderProps(children, (resolvedChildren) => (
        <>
          <SearchIcon className="mz-search-trigger-icon" />
          <span className="mz-search-trigger-label">{resolvedChildren}</span>
          {shortcut != null && <Badge aria-hidden="true" className="mz-search-trigger-shortcut">{shortcut}</Badge>}
        </>
      ))}
    </ReactAriaButton>
  )
}
