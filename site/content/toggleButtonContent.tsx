// Written guidance and reference entries; live examples stay in the page.
export const toggleButtonContent = {
  title: 'ToggleButton',
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
    <>For an independent toggle, use <code>defaultSelected</code> for initial state or <code>isSelected</code> with <code>onChange</code> for controlled state. Use a stable visible label, or <code>aria-label</code> for an icon-only control. The selected state is communicated separately from the name.</>,
    <>For a group, supply an accessible label and stable button <code>id</code> values. Choose <code>selectionMode="single"</code> or <code>selectionMode="multiple"</code>; use <code>defaultSelectedKeys</code> or controlled <code>selectedKeys</code> with <code>onSelectionChange</code>. Set <code>disallowEmptySelection</code> when a selection must remain.</>,
    <>Enter or Space activates a focused toggle. Within a group, arrow keys move between buttons according to its orientation. Disabled buttons cannot be activated.</>,
  ],
}
