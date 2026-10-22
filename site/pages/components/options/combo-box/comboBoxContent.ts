import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'

export const comboBoxContent: DocsPageContent = {
  id: 'combo-box',
  kind: 'component',
  title: 'Combo box',
  description: 'A combo box is a text field that suggests options as you type, and opens the full list from its chevron.',
  sections: [
    { key: 'example', intro: ['`ComboBox` shows its `label`, a text field with a chevron button, and the matching options in a popover as wide as the field.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Combo box anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'ComboBox', description: 'Holds the text and the choice. Mezzanine draws the label, input, chevron button, help and error text, and the list in a Popover.' },
          { name: 'ListBoxItem', description: 'One option, given as the children of `ComboBox`.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Pass `ListBoxItem`s as children, or `defaultItems` with a function that renders each one; the list filters as people type. Use `onSelectionChange` for the choice and `onInputChange` for the text.',
        '`allowsCustomValue` keeps text that matches no option. `description` adds help text and `errorMessage` the message shown when the field is invalid.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Typing opens the list of matches, the arrow keys move through it and Enter chooses one. Escape closes the list. The chevron button is skipped by Tab, because the arrow keys open the list from the input.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Combo box pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('ComboBox'),
      },
    },
  ],
  relatedPages: [
    { label: 'Select', href: '/select' },
    { label: 'Autocomplete', href: '/autocomplete' },
    { label: 'Text field', href: '/text-field' },
  ],
  references: [
    { label: 'React Aria ComboBox', href: 'https://react-aria.adobe.com/ComboBox' },
  ],
}

// The example's label and options.
export const comboBoxExampleLabels = { label: 'Combo box A', options: ['Option A', 'Option B', 'Option C'] } as const
