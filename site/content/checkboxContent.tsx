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
    <>Tab focuses the checkbox and Space changes its selection. <code>isDisabled</code> prevents interaction; <code>isReadOnly</code> prevents value changes. <code>isIndeterminate</code> controls the mixed-state appearance independently of selection; the application must clear it when appropriate.</>,
    <>For form submission, provide <code>name</code> and <code>value</code>. Use <code>isRequired</code> with native validation to require selection, or <code>isInvalid</code> to communicate an application validation result. Provide visible error guidance and associate it using <code>aria-describedby</code>; this wrapper does not insert error text automatically.</>,
  ],
}
