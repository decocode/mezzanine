import { composeRenderProps } from 'react-aria-components'
import { composeClassName } from '../composeClassName'
import {
  SearchField as ReactAriaSearchField,
  type SearchFieldProps as ReactAriaSearchFieldProps,
} from 'react-aria-components/SearchField'
import { Button } from '../Button/Button'
import { SearchIcon, CloseIcon } from '../../icons/Icons'

export interface SearchFieldProps extends ReactAriaSearchFieldProps {}

// Apps supply the Label and Input, as with TextField; the field adds its search icon and clear button.
// React Aria names the clear button, keeps it out of the Tab order and clears the field when it or Escape is pressed.
export function SearchField({ children, className, ...searchFieldProps }: SearchFieldProps) {
  return (
    <ReactAriaSearchField
      {...searchFieldProps}
      className={composeClassName('mz-search-field', className)}
    >
      {composeRenderProps(children, (resolvedChildren) => (
        <>
          {resolvedChildren}
          {/* After the Input in source order, so the icon paints above the field's background. */}
          <SearchIcon className="mz-search-field-icon" />
          <Button className="mz-search-field-clear" iconLeading={<CloseIcon />} size="sm" hierarchy="tertiary" />
        </>
      ))}
    </ReactAriaSearchField>
  )
}
