import type { AlertPurpose } from '@decocode/mezzanine'
import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'

// The Example's purpose Select lists the brand purposes first, then the semantic ones.
export const alertPurposeGroups = [
  { key: 'brand', label: 'Brand', purposes: ['accent', 'signature'] },
  { key: 'semantic', label: 'Semantic', purposes: ['neutral', 'info', 'success', 'warning', 'danger'] },
] as const

export const alertContent: DocsPageContent = {
  id: 'alert',
  kind: 'component',
  title: 'Alert',
  description: '`Alert` is a component that makes a short note stand out from the text around it.',
  sections: [
    {
      key: 'whatItsFor',
      title: 'What it’s for',
      intro: ['An Alert sets a short note apart from the text around it, so people don’t read past it. Use it for a sentence or two that people should read in place, and a Badge for a one- or two-word status.'],
    },
    {
      key: 'example',
      intro: [
        '`purpose` sets what a note is for, and its color: a semantic purpose, such as `info` or `warning`, or a brand purpose, such as `accent`. The default is `neutral`.',
      ],
    },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Alert anatomy',
        nameColumn: 'Part',
        namesAreCode: false,
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'Alert', description: 'A box with the `note` role. The purpose sets its wash, its border and the color of its title and icon.' },
          { name: 'Icon', description: 'Optional, from `icon`. A decorative icon before the note, hidden from screen readers.' },
          { name: 'Title', description: 'Optional, from `title`. A short heading for the note.' },
          { name: 'Content', description: 'Optional, from the children: a paragraph or a short list, in the text color.' },
          { name: 'Actions', description: 'Optional, from `actions`. One or two Buttons or Links after the content.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Supply the note as the children of `Alert`; `purpose` defaults to `neutral`. Add a `title`, an `icon` or `actions` when the note needs them.',
        'An alert is part of the page from the start. It doesn’t interrupt anyone or announce changes, so it isn’t for messages that appear after something happens.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Alert has the `note` role, so screen readers present it as an aside to the content around it.',
        'The purpose shows in color, so say it in words too, such as in the title. The icon is decorative and hidden from screen readers.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Alert pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('Alert'),
      },
    },
  ],
  relatedPages: [
    { label: 'Badge', href: '/badge' },
    { label: 'Color roles', href: '/color/roles' },
  ],
  references: [
    { label: 'MDN: ARIA note role', href: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/note_role' },
  ],
}

// The example's starting labels, and the labels of its Properties panel's controls, named after the props; content sets the children.
export const alertExample = {
  title: 'Alert title',
  content: 'This is the main content of the alert component. By changing the purpose property of an Alert, you can change its color to communicate semantic or brand meaning.',
  button: 'Button',
  link: 'Link',
  purposeLabel: 'purpose',
  titleLabel: 'title',
  contentLabel: 'content',
  iconLabel: 'icon',
  actionsLabel: 'actions',
}

// The icon the example shows for each purpose, by its export name.
export const alertIconNames: Record<AlertPurpose, string> = {
  neutral: 'InfoIcon', info: 'InfoIcon', success: 'CheckCircleIcon', warning: 'WarningIcon', danger: 'ErrorIcon', accent: 'PlaceholderIcon', signature: 'PlaceholderIcon',
}

export interface AlertExampleProps {
  purpose: AlertPurpose
  hasTitle: boolean
  hasIcon: boolean
  hasActions: boolean
  hasContent: boolean
}

// The example's JSX for the chosen props, shown in its Code tab. An unticked title, icon, actions or
// content leaves that part out.
export function alertExampleCode({ purpose, hasTitle, hasIcon, hasActions, hasContent }: AlertExampleProps) {
  const lines = [
    `  purpose=${JSON.stringify(purpose)}`,
    ...(hasTitle ? [`  title=${JSON.stringify(alertExample.title)}`] : []),
    ...(hasIcon ? [`  icon={<${alertIconNames[purpose]} />}`] : []),
    ...(hasActions ? [
      '  actions={<>',
      `    <Button size="sm" hierarchy="secondary">${alertExample.button}</Button>`,
      `    <Link href="/alert">${alertExample.link}</Link>`,
      '  </>}',
    ] : []),
  ]
  return hasContent ? `<Alert\n${lines.join('\n')}\n>\n  ${alertExample.content}\n</Alert>` : `<Alert\n${lines.join('\n')}\n/>`
}
