import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { formatJsxProps } from '../../../../components/formatJsxProps'
import { pointerRows } from '../../../../components/pointerRows'

export const groupContent: DocsPageContent = {
  id: 'group',
  kind: 'component',
  title: 'Group',
  description: 'A group joins related controls, such as an input and a button, into one box.',
  sections: [
    { key: 'example', intro: ['`Group` joins its parts where they meet and puts one focus ring round them all.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Group anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'Group', description: 'Joins its parts into one box, and shows the focus ring when its input is focused.' },
          { name: 'Input', description: 'The text entry, which fills the space the other parts leave.' },
          { name: 'Button', description: 'An action that goes with the input.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Put an `Input` and a `Button` inside `Group`, and label the input. Inside a `Toolbar`, a `Group` only names related controls, so they aren’t joined.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Each part keeps its own name and its place in the Tab order. Give the group an `aria-label` when its parts need a shared name.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Group pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('Group'),
      },
    },
  ],
  relatedPages: [
    { label: 'Text field', href: '/text-field' },
    { label: 'Number field', href: '/number-field' },
    { label: 'Toolbar', href: '/toolbar' },
  ],
  references: [
    { label: 'React Aria Group', href: 'https://react-aria.adobe.com/Group' },
  ],
}

// The example's labels.
export const groupExampleLabels = { input: 'Input A', button: 'Button A' } as const

// The Properties panel's on/off props.
export const groupFlags = ['isDisabled', 'isInvalid'] as const

export function groupExampleCode(props: Record<string, unknown>) {
  return [
    `<Label htmlFor="input-a">${groupExampleLabels.input}</Label>`,
    `<Group${formatJsxProps(props)}>`,
    `  <Input id="input-a"${formatJsxProps({ disabled: props.isDisabled })} />`,
    `  <Button hierarchy="secondary"${formatJsxProps({ isDisabled: props.isDisabled })}>${groupExampleLabels.button}</Button>`,
    '</Group>',
  ].join('\n')
}
