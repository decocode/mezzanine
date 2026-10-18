import type { DocsPageContent } from '../../../../templates/docsPageContent'

// Column headings for the Sizes table; its rows come from Button's sizes.
export const toggleButtonSizesTable = {
  label: 'ToggleButton sizes',
  columns: { size: 'Size', text: 'Text', icon: 'Icon only buttons' },
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
        "Mezzanine's `size` appearance prop supports `sm`, `md`, `lg` and `xl`, using the same size tokens as Button. Both default to `md`. Set a group size on ToggleButtonGroup or an individual size on ToggleButton. Use `iconLeading` or `iconTrailing` without children for a square icon-only button, with an accessible name and Tooltip. These appearance props extend React Aria without changing selection or keyboard behaviour.",
        'For an independent toggle, use `defaultSelected` for initial state or `isSelected` with `onChange` for controlled state.',
        'For a group, supply an accessible label and stable button `id` values. Choose `selectionMode="single"` or `selectionMode="multiple"`; use `defaultSelectedKeys` or controlled `selectedKeys` with `onSelectionChange`. Set `disallowEmptySelection` when a selection must remain.',
        'Set `variant="secondary"` on a ToggleButtonGroup or an individual ToggleButton. This Mezzanine appearance extension preserves React Aria behaviour. The group applies the appearance to its children. Unselected buttons use standard secondary Button colours; selected buttons keep an inset line and a soft fill. Hover deepens the fill, and pressing a selected button strengthens the bottom line. Omitting the variant preserves the existing appearance. Disabled selection stays visible, and forced-colour mode underlines selected labels.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Use a stable visible label, or `aria-label` for an icon-only control. The selected state is communicated separately from the name.',
        'Enter or Space activates a focused toggle. Within a group, arrow keys move between buttons according to its orientation. Disabled buttons cannot be activated.',
      ],
    },
    {
      key: 'tokens',
      intro: ["`ToggleButton` shares `Button`'s size tokens. The secondary appearance takes its colours from the secondary `Button` tokens. It also uses shared typography, focus colour and disabled-opacity tokens."],
      table: {
        label: 'ToggleButton CSS tokens',
        nameColumn: 'CSS token',
        rows: [
          { name: '--toggle-button-background', description: 'Background when not selected.' },
          { name: '--toggle-button-background-hovered', description: 'Background when not selected and hovered.' },
          { name: '--toggle-button-background-pressed', description: 'Background when not selected and pressed.' },
          { name: '--toggle-button-content', description: 'Label and icon colour when not selected.' },
          { name: '--toggle-button-border', description: 'Border colour when not selected.' },
          { name: '--toggle-button-background-selected', description: 'Background when selected.' },
          { name: '--toggle-button-background-selected-hovered', description: 'Background when selected and hovered.' },
          { name: '--toggle-button-background-selected-pressed', description: 'Background when selected and pressed.' },
          { name: '--toggle-button-content-selected', description: 'Label and icon colour when selected.' },
          { name: '--toggle-button-border-selected', description: 'Border colour when selected.' },
          { name: '--toggle-button-border-width', description: 'Border thickness. Adjacent secondary buttons in a group overlap by this amount so they share one border.' },
          { name: '--toggle-button-border-radius', description: 'Rounding of the button corners.' },
          { name: '--toggle-button-focus-ring-width', description: 'Keyboard-focus outline thickness.' },
          { name: '--toggle-button-focus-ring-offset', description: 'Distance between the button and its keyboard-focus outline.' },
          { name: '--toggle-button-group-gap', description: 'Space between buttons in a `ToggleButtonGroup`.' },
          { name: '--toggle-button-selection-indicator-width', description: 'Thickness of the underline that marks a selected secondary button; it doubles while pressed. In forced-colour mode it sets the selected label underline.' },
        ],
      },
    },
  ],
  relatedPages: [
    { label: 'Button', href: '/button' },
    { label: 'Checkbox', href: '/checkbox' },
    { label: 'Radio group', href: '/radio-group' },
  ],
  references: [
    { label: 'React Aria ToggleButton', href: 'https://react-aria.adobe.com/ToggleButton' },
    { label: 'React Aria ToggleButtonGroup', href: 'https://react-aria.adobe.com/ToggleButtonGroup' },
  ],
}
