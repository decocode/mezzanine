import { buttonTokens } from '../foundationData'

// Written guidance and reference entries; live examples stay in the page.
export const buttonContent = {
  title: 'Button',
  description: 'A button lets someone do something, such as submit a form, save their work or open a menu. Its label tells them what will happen when they press it.',
  relatedPages: [
    { label: 'Link', href: '/link' },
    { label: 'Toggle button', href: '/toggle-button' },
  ],
  references: [
    { label: 'React Aria Button', href: 'https://react-aria.adobe.com/Button' },
  ],
  referencesId: 'button-references-heading',
  exampleParagraphs: [
    <>
      <code>Button</code> defaults to the primary variant and medium size. Activate this example to
      see its <code>onPress</code> handler update the count.
    </>,
  ],
  anatomyRows: [
    { name: 'Button', description: <>The action control, containing a text label and optional leading or trailing icons.</> },
    { name: 'IconButton', description: <>Composes <code>Button</code> with an icon and a required accessible label. The label can be hidden, above or below the control.</> },
  ],
  anatomyParagraphs: [
    <>
      <code>Button</code> combines a label with optional leading and trailing icons. <code>IconButton</code> composes
      {' '}<code>Button</code> with a required <code>label</code> and an <code>icon</code>.
    </>,
  ],
  hierarchyItems: <>
    <li><strong>Primary:</strong> emphasises the main action.</li>
    <li><strong>Secondary:</strong> supports the main action.</li>
    <li><strong>Tertiary:</strong> gives lower-priority actions less visual emphasis.</li>
    <li><strong>Destructive:</strong> identifies actions that delete or remove something; it communicates purpose rather than another level of importance.</li>
  </>,
  hierarchyParagraphs: [
    <>
      Button hierarchy communicates the relative importance of actions.
    </>,
  ],
  usageParagraphs: [
    <>
      Use <code>Button</code> for an action and <code>Link</code> for navigation. Handle activation with
      {' '}<code>onPress</code>; React Aria supports pointer, touch, Enter and Space activation.
      Keep the visible label clear. <code>IconButton</code> requires a label even when it is hidden.
    </>,
    <>
      Use <code>isPending</code> while an action is in progress: <code>Button</code> displays its progress
      indicator and prevents further presses while remaining focusable. Use
      {' '}<code>isDisabled</code> when the action is unavailable. Keyboard focus has its own
      visible outline, separate from hover and pressed feedback.
    </>,
    <>Button labels wrap when space is limited, allowing the control to grow taller without shrinking the text. Icons retain their size.</>,
  ],
  tokensRows: buttonTokens.map(({ token, description }) => ({ name: token, description })),
  tokensParagraphs: [
    <>
      These component tokens control variant colours, sizes, content spacing, borders, focus
      and progress indicators. <code>Button</code> also uses shared typography, focus colour
      and disabled-opacity tokens.
    </>,
  ],
}
