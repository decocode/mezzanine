import type { DocsPageContent } from '../../../templates/docsPageContent'

// The Color page: why color matters, with a card linking to each child page.
export const colorContent: DocsPageContent = {
  id: 'color',
  kind: 'foundation',
  title: 'Color',
  description: 'When color does more than decorate.',
  sections: [
    {
      key: 'whyColorMatters',
      title: 'Why color matters',
      body: ["In user interfaces, colors are not merely decorative. They help to establish visual hierarchy, convey meaning, and distinguish states. Mezzanine keeps colors that express a brand's unique visual identity separate from semantic colors that communicate specific meaning—that way, different brands can be expressive without impacting usability."],
    },
    { key: 'pages', title: 'Using color' },
  ],
}

export const colorPages = [
  { label: 'Color palettes', href: '/color/palettes', description: 'The shades every color comes from.' },
  { label: 'Color roles', href: '/color/roles', description: 'The colors components share.' },
]
