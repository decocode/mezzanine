import type { ReactNode } from 'react'
import {
  SearchField as ReactAriaSearchField,
  type SearchFieldProps as ReactAriaSearchFieldProps,
} from 'react-aria-components/SearchField'
import type { ValidationResult } from 'react-aria-components'
import { composeClassName } from '../composeClassName'
import { Button } from '../Button/Button'
import { FieldError } from '../FieldError/FieldError'
import { Label } from '../Label/Label'
import { Text } from '../Text/Text'
import { Input } from '../TextField/TextField'
import { SearchIcon, CloseIcon } from '../../icons/Icons'

export interface SearchFieldProps extends Omit<ReactAriaSearchFieldProps, 'children'> {
  // The visible label. Without one, give the SearchField an aria-label.
  label?: ReactNode
  // Help text, under the label.
  description?: ReactNode
  // The message shown when the field is invalid. Without one, the browser's own message shows.
  errorMessage?: string | ((validation: ValidationResult) => string)
  // Placeholder text in the input. It doesn't replace a label.
  placeholder?: string
}

// A field for a search, following React Aria's starter SearchField. Mezzanine draws the label, help text,
// error, then the input with its search icon and clear button. React Aria names the clear button, keeps
// it out of the Tab order and clears the field when it or Escape is pressed.
export function SearchField({ label, description, errorMessage, placeholder, ...props }: SearchFieldProps) {
  return (
    <ReactAriaSearchField {...props} className={composeClassName('mz-search-field', props.className)}>
      {label != null && <Label>{label}</Label>}
      {description != null && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <div className="mz-search-field-box">
        <Input placeholder={placeholder} />
        {/* After the Input in source order, so the icon paints above the field's background. */}
        <SearchIcon className="mz-search-field-icon" />
        <Button className="mz-search-field-clear" icon={<CloseIcon />} size="sm" hierarchy="tertiary" />
      </div>
    </ReactAriaSearchField>
  )
}
