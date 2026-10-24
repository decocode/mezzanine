import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'

export const avatarContent: DocsPageContent = {
  id: 'avatar',
  kind: 'component',
  title: 'Avatar',
  description: 'An avatar is a small round picture of who something is from: a person, a sub-brand or an outside source. With a name, it shows the name beside the picture.',
  sections: [
    { key: 'example', intro: ['`Avatar` shows a picture, or initials when there’s no picture, with an optional name beside it.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Avatar anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'Avatar', description: 'Renders a `span` holding the round picture and, when given children, the name beside it. Without `src`, the picture shows the initials of the first and last words of the name.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Pass the name as the children of `Avatar`, and the picture as `src`. `size` is `md` by default, from the `--picture-size-md` token, or `sm`, from `--picture-size-sm`.',
        'An Avatar with no visible name needs `alt`, its text alternative, such as the person’s or brand’s name. Its initials come from `alt` when there’s no picture.',
        'Avatar isn’t interactive. To link to a person or source, put the Avatar inside a `Link`.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'With a name beside it, the picture is decorative and hidden from screen readers, which read the name instead.',
        'Without a visible name, the picture is an image named by `alt`.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Avatar pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('Avatar'),
      },
    },
  ],
  relatedPages: [
    { label: 'Card', href: '/card' },
    { label: 'Badge', href: '/badge' },
  ],
  references: [
    { label: 'MDN: HTML img element', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img' },
  ],
}

// The teaching labels inside the live Avatars in the Example section.
export const avatarExample = {
  named: 'Avatar name',
  initials: 'Avatar Initials',
  small: 'Small avatar',
  unnamed: 'Avatar without a visible name',
} as const
