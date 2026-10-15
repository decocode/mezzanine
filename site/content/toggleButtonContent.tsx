// Written guidance and reference entries; live examples stay in the page.
export const toggleButtonContent = {
  title: 'Toggle button',
  singleSelectionInstruction: 'Choose one option; selecting another replaces the current selection.',
  multipleSelectionInstruction: 'Choose any number of options; press a selected option again to clear it.',
  secondaryDescription: <>Set <code>variant="secondary"</code> on a ToggleButtonGroup or an individual ToggleButton. This Mezzanine appearance extension preserves React Aria behaviour. The group applies the appearance to its children. Unselected buttons use standard secondary Button colours; selected buttons keep an inset line and a soft fill. Hover deepens the fill, and pressing a selected button strengthens the bottom line. Omitting the variant preserves the existing appearance. Disabled selection stays visible, and forced-colour mode underlines selected labels.</>,
  description: 'A toggle button turns a choice on or off and changes its appearance to show whether it is selected. For example, a Bold button stays selected while bold formatting is switched on.',
  relatedPages: [
    { label: 'Button', href: '/button' },
    { label: 'Checkbox', href: '/checkbox' },
    { label: 'Radio group', href: '/radio-group' },
  ],
  references: [
    { label: 'React Aria ToggleButton', href: 'https://react-aria.adobe.com/ToggleButton' },
    { label: 'React Aria ToggleButtonGroup', href: 'https://react-aria.adobe.com/ToggleButtonGroup' },
  ],
  exampleParagraphs: [
    <>
      Press the <code>ToggleButton</code> to select it, then press it again to clear the selection.
    </>,
  ],
  anatomyRows: [
    { name: 'ToggleButton', description: <>A button with a selected state and an accessible pressed state.</> },
    { name: 'ToggleButtonGroup', description: <>Optionally coordinates single or multiple selection among buttons identified by id.</> },
  ],
  toggleButtonGroupParagraphs: [
    <>
      A <code>ToggleButtonGroup</code> brings related <code>ToggleButton</code> components together and supports either single or
      multiple selection.
    </>,
  ],
  usageParagraphs: [
    <>Mezzanine's <code>size</code> appearance prop supports <code>sm</code>, <code>md</code>, <code>lg</code> and <code>xl</code>, using the same size tokens as Button. Both default to <code>md</code>. Set a group size on ToggleButtonGroup or an individual size on ToggleButton. Use <code>iconLeading</code> or <code>iconTrailing</code> without children for a square icon-only button, with an accessible name and Tooltip. These appearance props extend React Aria without changing selection or keyboard behaviour.</>,
    <>For an independent toggle, use <code>defaultSelected</code> for initial state or <code>isSelected</code> with <code>onChange</code> for controlled state.</>,
    <>For a group, supply an accessible label and stable button <code>id</code> values. Choose <code>selectionMode="single"</code> or <code>selectionMode="multiple"</code>; use <code>defaultSelectedKeys</code> or controlled <code>selectedKeys</code> with <code>onSelectionChange</code>. Set <code>disallowEmptySelection</code> when a selection must remain.</>,
  ],
  accessibilityParagraphs: [
    <>Use a stable visible label, or <code>aria-label</code> for an icon-only control. The selected state is communicated separately from the name.</>,
    <>Enter or Space activates a focused toggle. Within a group, arrow keys move between buttons according to its orientation. Disabled buttons cannot be activated.</>,
  ],
  tokensRows: [
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
    { name: '--toggle-button-group-gap', description: <>Space between buttons in a <code>ToggleButtonGroup</code>.</> },
    { name: '--toggle-button-selection-indicator-width', description: 'Thickness of the underline that marks a selected secondary button; it doubles while pressed. In forced-colour mode it sets the selected label underline.' },
  ],
  tokensParagraphs: [
    <><code>ToggleButton</code> shares <code>Button</code>&apos;s size tokens. The secondary appearance takes its colours from the secondary <code>Button</code> tokens. It also uses shared typography, focus colour and disabled-opacity tokens.</>,
  ],
}
