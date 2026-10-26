import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { formatJsxProps } from '../../../../components/formatJsxProps'
import { pointerRows } from '../../../../components/pointerRows'

export const tokenFieldContent: DocsPageContent = {
  id: 'token-field',
  kind: 'component',
  title: 'Token field',
  description: '`TokenField` is a component that works like a text field, but can hold tokens, such as people or tags, among its text.',
  sections: [
    { key: 'example', intro: ['`TokenField` shows its `label` and an editable area with the text field’s look. Each token in its value is drawn as a small tinted chip.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Token field anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'TokenField', description: 'Holds the value, a sequence of text and tokens. Mezzanine draws the label, the editable area and the help text.' },
          { name: 'TokenInput', description: 'The editable area. It renders a `Token` for each token in the value.' },
          { name: 'Token', description: 'One token.' },
          { name: 'TokenFieldValue', description: 'The value object. Extend it to decide how typed text becomes tokens.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Pass a function as children that renders a `Token` for each token segment. Start with a `defaultValue` or control it with `value` and `onChange`; both are `TokenFieldValue`s.',
        'To turn typed text into tokens, extend `TokenFieldValue`, as the React Aria documentation describes.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Screen readers read the field’s text with its tokens. The arrow keys move through the text and select a token as a whole, and Backspace removes it.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Token field pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('TokenField'),
      },
    },
  ],
  relatedPages: [
    { label: 'Tag group', href: '/tag-group' },
    { label: 'Text field', href: '/text-field' },
    { label: 'Combo box', href: '/combo-box' },
  ],
  references: [
    { label: 'React Aria TokenField', href: 'https://react-aria.adobe.com/TokenField' },
  ],
}

// The example's label and tokens.
export const tokenFieldExampleLabels = { label: 'Token field A', tokens: ['Token A', 'Token B'] } as const

// The Properties panel's on/off props, in panel order.
export const tokenFieldExampleText = { description: 'Token field description', placeholder: 'Type a token' } as const
export const tokenFieldFlags = ['description', 'isDisabled', 'isReadOnly'] as const

export function tokenFieldExampleCode(props: Record<string, unknown>) {
  return [
    `<TokenField label="${tokenFieldExampleLabels.label}" defaultValue={value}${formatJsxProps(props)}>`,
    '  {(segment) => <Token>{segment.text}</Token>}',
    '</TokenField>',
  ].join('\n')
}
