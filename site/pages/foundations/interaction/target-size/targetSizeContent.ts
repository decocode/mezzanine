import type { DocsPageContent } from '../../../../templates/docsPageContent'

// Token names only; their values are read from the token source on the page.
export const targetSizeTokens = [
  { token: '--target-size-min', label: 'The WCAG 2.2 AA minimum' },
  { token: '--target-size-xs', label: 'Extra small: dense lists, such as NavTree, Table of contents and ListBox' },
  { token: '--target-size-sm', label: 'Small: Checkbox, Radio and SearchField’s clear button' },
  { token: '--target-size-md', label: 'Medium: the default for Button, text fields, Tabs and Disclosure' },
  { token: '--target-size-lg', label: 'Large' },
  { token: '--target-size-xl', label: 'Extra large' },
]

export const targetSizeContent: DocsPageContent = {
  id: 'target-size',
  kind: 'foundation',
  title: 'Target size',
  description: 'Controls such as buttons and form fields all take their size from one scale, called Target size.',
  sections: [
    {
      key: 'howItWorks',
      title: 'How it works',
      intro: [
        'Target size makes sure people using touchscreens can tap controls with ease. Every size on the scale meets WCAG 2.2 AA. If your app aims to meet WCAG 2.2 AAA, use the medium target size as your minimum.',
        'Target sizes are measured in `rem`, rather than pixels. That way, controls will increase in size for people who opt for larger text sizes in their browser or device settings.',
        'The exception is links within a line of text, as WCAG allows.',
      ],
    },
  ],
  technicalDetails: [
    { key: 'tokens' },
    {
      key: 'components',
      title: 'Components',
      intro: ['Button, ToggleButton, text fields, Checkbox, Radio, Tabs, Disclosure, TopBar menu items, NavTree, ListBox, SearchField’s clear button, Breadcrumbs, Table of contents links, links in a Footer list, and sortable Table headers and selectable Table rows.'],
    },
  ],
  relatedPages: [
    { label: 'Interaction', href: '/interaction' },
    { label: 'Accessibility', href: '/accessibility' },
  ],
  references: [
    { label: 'WCAG 2.2: Target size (minimum)', href: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html' },
  ],
}
