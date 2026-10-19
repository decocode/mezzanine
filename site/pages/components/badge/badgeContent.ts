import type { DocsPageContent } from '../../../templates/docsPageContent'

export const badgeContent: DocsPageContent = {
  id: 'badge',
  kind: 'component',
  title: 'Badge',
  description: 'A badge is a small label that highlights a status or category, such as New, Draft or Complete. It gives extra information about an item rather than acting as a button.',
  sections: [
    { key: 'example', intro: ['`Badge` defaults to the neutral variant and renders a non-interactive text label.'] },
    { key: 'variants', intro: ['The `variant` prop selects a core or semantic colour treatment.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Badge anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'Badge', description: 'Renders a non-interactive span containing the status label. The variant controls its colour treatment.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Supply the label as the children of `Badge`; `variant` defaults to `neutral`. The available variants are shown above.',
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
      key: 'tokens',
      intro: ['`Badge` also uses the shared Label medium typography tokens, at the Default weight.'],
      table: {
        label: 'Badge CSS tokens',
        nameColumn: 'CSS token',
        rows: [
          { name: '--badge-padding-block', description: 'Vertical padding inside the badge.' },
          { name: '--badge-padding-inline', description: 'Horizontal padding inside the badge.' },
          { name: '--badge-border-width', description: 'Badge border thickness.' },
          { name: '--badge-border-radius', description: 'Rounding of the badge corners.' },
          { name: '--badge-neutral-background', description: 'Neutral variant background.' },
          { name: '--badge-neutral-content', description: 'Neutral variant label colour.' },
          { name: '--badge-neutral-border', description: 'Neutral variant border colour.' },
          { name: '--badge-violet-background', description: 'Violet variant background.' },
          { name: '--badge-violet-content', description: 'Violet variant label colour.' },
          { name: '--badge-violet-border', description: 'Violet variant border colour.' },
          { name: '--badge-info-background', description: 'Info variant background.' },
          { name: '--badge-info-content', description: 'Info variant label colour.' },
          { name: '--badge-info-border', description: 'Info variant border colour.' },
          { name: '--badge-success-background', description: 'Success variant background.' },
          { name: '--badge-success-content', description: 'Success variant label colour.' },
          { name: '--badge-success-border', description: 'Success variant border colour.' },
          { name: '--badge-warning-background', description: 'Warning variant background.' },
          { name: '--badge-warning-content', description: 'Warning variant label colour.' },
          { name: '--badge-warning-border', description: 'Warning variant border colour.' },
          { name: '--badge-danger-background', description: 'Danger variant background.' },
          { name: '--badge-danger-content', description: 'Danger variant label colour.' },
          { name: '--badge-danger-border', description: 'Danger variant border colour.' },
        ],
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
