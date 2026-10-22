import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'

// Column headings for the Sizes table; its rows come from Button's sizes.
export const toggleButtonSizesTable = {
  label: 'ToggleButton sizes',
  columns: { size: 'Size', text: 'Text', icon: 'Icon buttons, label in a tooltip' },
}

// Headings and row labels for the States table; each row shows live buttons.
export const toggleButtonStatesTable = {
  label: 'ToggleButton states',
  columns: { state: 'State', primary: 'Primary', secondary: 'Secondary' },
  rows: { unselected: 'Unselected', selected: 'Selected', disabled: 'Disabled' },
}

// The documentation link and tab panel text in the Toggle button group example.
export const toggleButtonGroupExample = {
  documentationLink: { label: 'View ToggleButtonGroup on React Aria', href: 'https://react-aria.adobe.com/ToggleButtonGroup' },
  singleSelectionInstruction: 'Choose one option; selecting another replaces the current selection.',
  multipleSelectionInstruction: 'Choose any number of options; press a selected option again to clear it.',
}

export const toggleButtonContent: DocsPageContent = {
  id: 'toggle-button',
  kind: 'component',
  title: 'Toggle button',
  description: 'A toggle button turns a choice on or off and changes its appearance to show whether it is selected. For example, a Bold button stays selected while bold formatting is switched on.',
  sections: [
    {
      key: 'example',
      intro: ['Press the `ToggleButton` to select it, then press it again to clear the selection.'],
    },
    { key: 'sizes', title: 'Sizes' },
    { key: 'states' },
    {
      key: 'toggleButtonGroup',
      title: 'Toggle button group',
      intro: ['A `ToggleButtonGroup` brings related `ToggleButton` components together and supports either single or multiple selection.'],
    },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'ToggleButton anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'ToggleButton', description: 'A button with a selected state and an accessible pressed state.' },
          { name: 'ToggleButtonGroup', description: 'Optionally coordinates single or multiple selection among buttons identified by id.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        "Mezzanine's `size` appearance prop supports `xs`, `sm`, `md`, `lg` and `xl`, using the same size tokens as Button. Both default to `md`. Set a group size on ToggleButtonGroup or an individual size on ToggleButton. Use `iconLeading` or `iconTrailing` without children for a square icon-only button, with an accessible name and Tooltip. These appearance props extend React Aria without changing selection or keyboard behaviour.",
        'For an independent toggle, use `defaultSelected` for initial state or `isSelected` with `onChange` for controlled state.',
        'For a group, supply an accessible label and stable button `id` values. Choose `selectionMode="single"` or `selectionMode="multiple"`; use `defaultSelectedKeys` or controlled `selectedKeys` with `onSelectionChange`. Set `disallowEmptySelection` when a selection must remain.',
        'Set `variant="secondary"` on a ToggleButtonGroup or an individual ToggleButton. This Mezzanine appearance extension preserves React Aria behaviour. The group applies the appearance to its children. Unselected buttons use standard secondary Button colours; selected buttons keep an inset line and a soft fill. Hover deepens the fill, and pressing a selected button strengthens the bottom line. Omitting the variant preserves the existing appearance. Disabled selection stays visible, and forced-colour mode underlines selected labels.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Use a stable label. For an icon button, `labelPlacement` shows it in a tooltip, below the icon or above it, and it stays the accessible name. The selected state is communicated separately from the name.',
        'Enter or Space activates a focused toggle. Within a group, arrow keys move between buttons according to its orientation. Disabled buttons cannot be activated.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Toggle button pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('ToggleButton'),
      },
    },
  ],
  relatedPages: [
    { label: 'Button', href: '/button' },
    { label: 'Checkbox', href: '/checkbox' },
    { label: 'Radio group', href: '/radio-group' },
    { label: 'Target size', href: '/interaction/target-size' },
  ],
  references: [
    { label: 'React Aria ToggleButton', href: 'https://react-aria.adobe.com/ToggleButton' },
    { label: 'React Aria ToggleButtonGroup', href: 'https://react-aria.adobe.com/ToggleButtonGroup' },
  ],
}
