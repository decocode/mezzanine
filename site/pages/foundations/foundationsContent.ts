import type { DocsPageContent } from '../../templates/docsPageContent'

export const foundationsPages: { label: string; href: string; description: string }[] = [
  { label: 'Accessibility', href: '/accessibility', description: 'What applies to every component: the WCAG target, what React Aria provides, what Mezzanine adds and how it is checked.' },
  { label: 'Interaction', href: '/interaction', description: 'How components respond to pointer, touch, keyboard and focus, and the states they show.' },
  { label: 'Text', href: '/text', description: 'How text behaves in every theme: line length, long words and reading direction.' },
]

export const foundationsContent: DocsPageContent = {
  id: 'foundations',
  kind: 'foundation',
  title: 'Foundations',
  description: 'Foundations are the parts of Mezzanine that stay the same in every theme: how far apart things are, and how components respond to people.',
  sections: [
    {
      key: 'definition',
      title: 'What makes a Foundation',
      intro: [
        'A Foundation stays the same whichever theme is active. If a theme should be able to change something, such as a colour, a typeface or a corner radius, it is a Style instead.',
        'Foundation tokens are defined once, in `src/tokens/`, and every theme uses the same values. Lengths are stored in `rem`, so they follow the root text size.',
      ],
    },
    { key: 'pages', title: 'Foundations pages' },
    {
      key: 'themeColour',
      title: 'Theme colours in Foundations',
      intro: ['Some Foundations use colour. Interaction, for example, draws focus rings in `--color-focus`. The colour comes from the active theme and is documented on the Color page. When and how it appears does not change.'],
    },
    {
      // Keeps the old foundations-technical-details id. This page has no Technical details group of its own.
      key: 'technicalDetails',
      title: 'Technical details on each page',
      intro: ['Each Foundations page ends with Technical details, in this order: CSS properties, Tokens, Accessibility and Localisation. Sections that do not apply to a page are left out. Accessibility appears only when a page has something specific to add; what applies everywhere is on the Accessibility page.'],
    },
  ],
}
