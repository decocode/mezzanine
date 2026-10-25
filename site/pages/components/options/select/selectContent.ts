import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'

export const selectContent: DocsPageContent = {
  id: 'select',
  kind: 'component',
  title: 'Select',
  description: 'A select picks one option from a list that opens below the field.',
  alsoKnownAs: [
    { where: 'Material Design', called: 'Exposed dropdown menu.' },
    { where: 'Microsoft Fluent', called: 'Dropdown.' },
    { where: 'IBM Carbon', called: 'Dropdown. Carbon also has a component called Select, which uses the browser’s built-in control.' },
    { where: 'Apple', called: 'Pop-up button.' },
    { where: 'Salesforce Lightning', called: 'Picklist.' },
  ],
  sections: [
    { key: 'example', intro: ['`Select` shows its `label`, a trigger with the chosen option and a chevron, and opens the options in a popover as wide as the field.', '`hierarchy` sets how much the chevron area stands out: `primary` fills it with the accent color, and `secondary` keeps it quiet. The default is `secondary`.'] },
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
export const selectExampleLabels = { label: 'Select label', options: ['Item A', 'Item B', 'Item C'] } as const

// The Properties panel's controls, and the example's code for the chosen props.
export const selectHierarchies = ['primary', 'secondary'] as const
export const selectHierarchyLabel = 'hierarchy'
export const selectDefaultKeyLabel = 'defaultSelectedKey'

// Without a default key, the prop is left out and the example shows its placeholder.
export function selectExampleCode(hierarchy: (typeof selectHierarchies)[number], defaultKey: string | null) {
  const defaultKeyProp = defaultKey == null ? '' : ` defaultSelectedKey="${defaultKey}"`
  return [
    `<Select label="${selectExampleLabels.label}" hierarchy=${JSON.stringify(hierarchy)}${defaultKeyProp}>`,
    ...selectExampleLabels.options.map((option) => `  <ListBoxItem id="${option}">${option}</ListBoxItem>`),
    '</Select>',
  ].join('\n')
}
