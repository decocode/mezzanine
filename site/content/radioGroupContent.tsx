import { radioGroupAnatomy, radioGroupTokens } from './radioGroupReferenceData'

// Written guidance and reference entries; live examples stay in the page.
export const radioGroupContent = {
  title: 'Radio group',
  description: 'A radio group is a set of choices where only one option can be selected at a time, such as a delivery method. Choosing a different option replaces the previous selection.',
  relatedPages: [
    { label: 'Checkbox', href: '/checkbox' },
    { label: 'Toggle button', href: '/toggle-button' },
    { label: 'Color', href: '/color' },
  ],
  references: [
    { label: 'React Aria RadioGroup', href: 'https://react-aria.adobe.com/RadioGroup' },
  ],
  referencesId: 'radio-group-references-heading',
  exampleParagraphs: [
    <>
      Option A starts selected. Choose Option B to change the selection; Option C is disabled.
    </>,
  ],
  anatomyRows: radioGroupAnatomy.map(({ name, purpose }) => ({ name, description: purpose })),
  anatomyParagraphs: [
    <>
      Compose these exported parts inside a <code>RadioGroup</code>. Each <code>RadioField</code> supplies the value
      for its <code>RadioButton</code>; descriptions and validation feedback are optional.
    </>,
  ],
  statesParagraphs: [
    <>
      Selection belongs to the group. Pointer and keyboard states follow the <code>RadioButton</code>
      being used. Try selection, hover and keyboard focus in the Example above; read-only
      and invalid states have working examples below.
    </>,
    <>The selected option can receive focus, but the selection cannot change.</>,
    <>This required group starts invalid. Select an option to clear the validation feedback.</>,
  ],
  usageParagraphs: [
    <>
      Use a visible <code>Label</code> for the group and a clear label inside each <code>RadioButton</code>. Give each
      <code>RadioField</code> a unique <code>value</code>. Use <code>defaultValue</code> for an initial
      selection, or <code>value</code> with <code>onChange</code> to control it from your app.
    </>,
    <>
      Tab moves into the group and arrow keys move between available options. React Aria
      handles selection and focus; disabled options cannot be selected. Use a description
      or <code>FieldError</code> to explain an option or validation problem in text.
    </>,
  ],
  tokensRows: radioGroupTokens.map(({ token, description }) => ({ name: token, description })),
  tokensParagraphs: [
    <>
      These component tokens control layout and indicator appearance. <code>RadioGroup</code> also uses
      shared typography, text, focus colour and disabled-opacity tokens.
    </>,
  ],
}
