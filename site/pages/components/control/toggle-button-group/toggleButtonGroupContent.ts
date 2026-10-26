import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'
import { formatJsxProps } from '../../../../components/formatJsxProps'

// The example's label and toggles, and the Properties panel's choices. A default choice is left out of
// the code.
export const toggleButtonGroupExample = { label: 'Group A', toggles: ['Toggle A', 'Toggle B', 'Toggle C'] } as const
export const toggleButtonGroupSelectionModes = ['single', 'multiple'] as const
export const toggleButtonGroupOrientations = ['horizontal', 'vertical'] as const
export const toggleButtonGroupHierarchies = ['primary', 'secondary', 'tertiary'] as const
export const toggleButtonGroupFlags = ['disallowEmptySelection', 'isDisabled'] as const

export function toggleButtonGroupExampleCode(props: Record<string, unknown>) {
  return [
    `<ToggleButtonGroup aria-label="${toggleButtonGroupExample.label}"${formatJsxProps(props)}>`,
    ...toggleButtonGroupExample.toggles.map((toggle) => `  <ToggleButton id="${toggle}">${toggle}</ToggleButton>`),
    '</ToggleButtonGroup>',
  ].join('\n')
}

export const toggleButtonGroupContent: DocsPageContent = {
  id: 'toggle-button-group',
  kind: 'component',
  title: 'Toggle button group',
  description: 'A toggle button group brings related toggle buttons together, with either one or several selected at a time.',
  sections: [
    { key: 'example', intro: ['A `ToggleButtonGroup` holds `ToggleButton`s, and `selectionMode` sets whether one or several can be selected.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'ToggleButtonGroup anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'ToggleButtonGroup', description: 'Coordinates single or multiple selection among buttons identified by id.' },
          { name: 'ToggleButton', description: 'One toggle in the group.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Supply an accessible label and stable button `id` values. Choose `selectionMode="single"` or `selectionMode="multiple"`; use `defaultSelectedKeys` or controlled `selectedKeys` with `onSelectionChange`. Set `disallowEmptySelection` when a selection must remain.',
        '`hierarchy` and `size` on the group apply to every toggle in it. `hierarchy` takes `primary`, the default, `secondary` or `tertiary`, and `size` takes `xs` to `xl`, defaulting to `md`.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Tab moves into the group, and the arrow keys move between its toggles according to its orientation. Enter or Space activates the focused toggle. A single-selection group is announced as a radio group.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Toggle button group pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        // The group's pointers live with ToggleButton's, and start with its name.
        rows: pointerRows('ToggleButton').filter((row) => row.name.startsWith('--toggle-button-group')),
      },
    },
  ],
  relatedPages: [
    { label: 'Toggle button', href: '/toggle-button' },
    { label: 'Radio group', href: '/radio-group' },
    { label: 'Toolbar', href: '/toolbar' },
  ],
  references: [
    { label: 'React Aria ToggleButtonGroup', href: 'https://react-aria.adobe.com/ToggleButtonGroup' },
  ],
}
