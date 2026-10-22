import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'

export const selectContent: DocsPageContent = {
  id: 'select',
  kind: 'component',
  title: 'Select',
  description: 'A select picks one option from a list that opens below the field.',
  sections: [
    { key: 'example', intro: ['`Select` shows its `label`, a trigger with the chosen option and a chevron, and opens the options in a popover as wide as the field.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Select anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'Select', description: 'Holds the choice. Mezzanine draws the label, trigger, help and error text, and the list in a Popover.' },
          { name: 'ListBoxItem', description: 'One option, given as the children of `Select`.' },
          { name: 'SelectValue', description: 'Shows the chosen option in the trigger.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Pass `ListBoxItem`s as children, or `items` with a function that renders each one. Use `defaultSelectedKey`, or `selectedKey` with `onSelectionChange`. `placeholder` sets the text before a choice is made.',
        '`description` adds help text and `errorMessage` the message shown when the field is invalid. `selectionMode="multiple"` lets people choose more than one.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'The trigger opens the list with Enter, Space or the arrow keys, and typing a letter chooses the next option starting with it. Screen readers announce the label, the chosen option and the list’s options.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Select pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('Select'),
      },
    },
  ],
  relatedPages: [
    { label: 'Combo box', href: '/combo-box' },
    { label: 'List box', href: '/list-box' },
    { label: 'Radio group', href: '/radio-group' },
  ],
  references: [
    { label: 'React Aria Select', href: 'https://react-aria.adobe.com/Select' },
  ],
}

// The example's label and options.
export const selectExampleLabels = { label: 'Select A', options: ['Option A', 'Option B', 'Option C'] } as const
