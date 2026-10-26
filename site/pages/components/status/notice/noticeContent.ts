import type { NoticePurpose } from '@decocode/mezzanine'
import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'

// The Example's purpose Select lists the brand purposes first, then the semantic ones.
export const noticePurposeGroups = [
  { key: 'brand', label: 'Brand', purposes: ['accent', 'signature'] },
  { key: 'semantic', label: 'Semantic', purposes: ['neutral', 'info', 'success', 'warning', 'danger'] },
] as const

export const noticeContent: DocsPageContent = {
  id: 'notice',
  kind: 'component',
  title: 'Notice',
  description: '`Notice` is a component that makes a short note stand out from the text around it.',
  sections: [
    {
      key: 'whatItsFor',
      title: 'What it’s for',
      intro: ['A Notice sets a short note apart from the text around it, so people don’t read past it. Use it for a sentence or two that people should read in place, and a Badge for a one- or two-word status.'],
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
        label: 'Notice anatomy',
        nameColumn: 'Part',
        namesAreCode: false,
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'Notice', description: 'A box with the `note` role. The purpose sets its wash, its border and the color of its title and icon.' },
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
        'Supply the note as the children of `Notice`; `purpose` defaults to `neutral`. Add a `title`, an `icon` or `actions` when the note needs them.',
        'A notice is part of the page from the start. It doesn’t interrupt anyone or announce changes, so it isn’t for messages that appear after something happens.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Notice has the `note` role, so screen readers present it as an aside to the content around it.',
        'The purpose shows in color, so say it in words too, such as in the title. The icon is decorative and hidden from screen readers.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Notice pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('Notice'),
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
export const noticeExample = {
  title: 'Notice title',
  content: 'This is the main content of the notice component. By changing the purpose property of a Notice, you can change its color to communicate semantic or brand meaning.',
  button: 'Button',
  link: 'Link',
  purposeLabel: 'purpose',
  titleLabel: 'title',
  contentLabel: 'content',
  iconLabel: 'icon',
  actionsLabel: 'actions',
}

// The icon the example shows for each purpose, by its export name.
export const noticeIconNames: Record<NoticePurpose, string> = {
  neutral: 'InfoIcon', info: 'InfoIcon', success: 'CheckCircleIcon', warning: 'WarningIcon', danger: 'ErrorIcon', accent: 'PlaceholderIcon', signature: 'PlaceholderIcon',
}

export interface NoticeExampleProps {
  purpose: NoticePurpose
  hasTitle: boolean
  hasIcon: boolean
  hasActions: boolean
  hasContent: boolean
}

// The example's JSX for the chosen props, shown in its Code tab. An unticked title, icon, actions or
// content leaves that part out.
export function noticeExampleCode({ purpose, hasTitle, hasIcon, hasActions, hasContent }: NoticeExampleProps) {
  const lines = [
    `  purpose=${JSON.stringify(purpose)}`,
    ...(hasTitle ? [`  title=${JSON.stringify(noticeExample.title)}`] : []),
    ...(hasIcon ? [`  icon={<${noticeIconNames[purpose]} />}`] : []),
    ...(hasActions ? [
      '  actions={<>',
      `    <Button size="sm" hierarchy="secondary">${noticeExample.button}</Button>`,
      `    <Link href="/notice">${noticeExample.link}</Link>`,
      '  </>}',
    ] : []),
  ]
  return hasContent ? `<Notice\n${lines.join('\n')}\n>\n  ${noticeExample.content}\n</Notice>` : `<Notice\n${lines.join('\n')}\n/>`
}
