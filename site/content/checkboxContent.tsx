// Written guidance and reference entries; live examples stay in the page.
export const checkboxContent = {
  title: 'Checkbox',
  description: 'A checkbox is a small box that can be ticked or unticked to turn a choice on or off. Use checkboxes when people can choose several options, or confirm something such as accepting terms.',
  relatedPages: [
    { label: 'Radio group', href: '/radio-group' },
    { label: 'Toggle button', href: '/toggle-button' },
    { label: 'Text field', href: '/text-field' },
  ],
  references: [
    { label: 'React Aria Checkbox', href: 'https://react-aria.adobe.com/Checkbox' },
  ],
  exampleParagraphs: [
    <>
      Select or clear the <code>Checkbox</code> using its label or the Space key when focused.
    </>,
  ],
  anatomyRows: [
    { name: 'Checkbox', description: <>Provides the interactive checkbox, native input and visible label. Mezzanine adds a decorative check or indeterminate indicator internally.</> },
  ],
  usageParagraphs: [
    <>Place the visible label inside <code>Checkbox</code>. Use <code>defaultSelected</code> for initial state, or <code>isSelected</code> with <code>onChange</code> for controlled state. The callback receives a boolean.</>,
    <><code>isDisabled</code> prevents interaction; <code>isReadOnly</code> prevents value changes. <code>isIndeterminate</code> controls the mixed-state appearance independently of selection; the application must clear it when appropriate.</>,
    <>For form submission, provide <code>name</code> and <code>value</code>. Use <code>isRequired</code> with native validation to require selection, or <code>isInvalid</code> to communicate an application validation result.</>,
  ],
  accessibilityParagraphs: [
    <>Tab focuses the checkbox and Space changes its selection.</>,
    <>Provide visible error guidance and associate it using <code>aria-describedby</code>; this wrapper does not insert error text automatically.</>,
  ],
  tokensRows: [
    { name: '--checkbox-size', description: 'Width and height of the checkbox box.' },
    { name: '--checkbox-icon-size', description: 'Size of the check and indeterminate icons.' },
    { name: '--checkbox-content-gap', description: 'Space between the box and its label.' },
    { name: '--checkbox-border-width', description: 'Box border thickness.' },
    { name: '--checkbox-border-radius', description: 'Rounding of the box corners.' },
    { name: '--checkbox-border', description: 'Box border colour when not selected.' },
    { name: '--checkbox-border-invalid', description: 'Box border colour when invalid.' },
    { name: '--checkbox-background', description: 'Box background when not selected.' },
    { name: '--checkbox-background-hovered', description: 'Box background when not selected and hovered.' },
    { name: '--checkbox-background-selected', description: 'Box background and border colour when selected or indeterminate.' },
    { name: '--checkbox-background-selected-hovered', description: 'Box background and border colour when selected or indeterminate and hovered.' },
    { name: '--checkbox-content-selected', description: 'Icon colour when selected or indeterminate.' },
    { name: '--checkbox-focus-ring-width', description: 'Keyboard-focus outline thickness.' },
    { name: '--checkbox-focus-ring-offset', description: 'Distance between the box and its keyboard-focus outline.' },
  ],
  tokensParagraphs: [
    <><code>Checkbox</code> also uses shared typography, text colour, focus colour and disabled-opacity tokens.</>,
  ],
}
