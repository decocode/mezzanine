import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'

export const badgeContent: DocsPageContent = {
  id: 'badge',
  kind: 'component',
  title: 'Badge',
  description: 'A badge is a small label that highlights a status or category, such as New, Draft or Complete. It gives extra information about an item rather than acting as a button.',
  sections: [
    { key: 'example', intro: ['`Badge` defaults to the neutral purpose and renders a non-interactive text label.'] },
    { key: 'purposes', title: 'Purposes', intro: ['The `purpose` prop selects a core or semantic colour treatment.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Badge anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'Badge', description: 'Renders a non-interactive span containing the status label. The purpose controls its colour treatment.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Supply the label as the children of `Badge`; `purpose` defaults to `neutral`. The available purposes are shown above.',
        'Badge renders a `span`, not an action control. Use `Button` or `Link` for an action or destination.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Use a short text label that communicates the status without relying on colour.',
        'Badge does not add keyboard interaction or automatically announce changes.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Badge pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('Badge'),
      },
    },
  ],
  relatedPages: [
    { label: 'Color', href: '/color' },
    { label: 'Button', href: '/button' },
    { label: 'Link', href: '/link' },
  ],
  references: [
    { label: 'MDN: HTML span element', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/span' },
  ],
}
