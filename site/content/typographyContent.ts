import type { Copy, DocsPageContent } from '../templates/docsPageContent'

export const typographyContent: DocsPageContent = {
  id: 'typography',
  kind: 'foundation',
  title: 'Typography',
  description: [
    'Typography helps people understand what matters, scan a page and read its content. Mezzanine provides consistent text styles for everything from prominent headings to body copy and compact interface labels.',
    'Each style combines a font, size, weight, letter spacing, line height and capitalisation. Use these styles together to create a clear hierarchy; product themes can customise their appearance without changing how they are applied.',
  ],
  sections: [
    {
      key: 'howTypographyWorks',
      title: 'How typography works',
      intro: ['Typography in Mezzanine is built in layers. Each layer uses the one before it.'],
    },
    {
      key: 'textStyles',
      title: 'Text styles',
      intro: ['The individual styles for display text, headings, titles, body copy and labels, with their paired line heights.'],
      body: ['[Explore text styles](/typography/text-styles)'],
    },
    {
      key: 'prose',
      title: 'Prose',
      intro: ['How typography works within longer-form content, including list spacing and inline code.'],
      body: ['[Explore prose](/typography/prose)'],
    },
  ],
}

export const typographyLayers: readonly { title: string; description: Copy }[] = [
  { title: 'Tokens hold the values', description: 'Named CSS values, such as `--font-size-body-md`, store every font, size, weight, letter spacing, line height and capitalisation setting.' },
  { title: 'Text styles bundle them', description: 'Each of the fifteen text styles, such as Body medium, combines one complete set of those tokens.' },
  { title: 'Three routes reach the page', description: "The same sets are used by the `mz-text-*` classes you add to markup, by the base styles for plain body text and `h1`–`h6` headings, and by every component's own CSS." },
  { title: 'Themes change the tokens', description: 'A theme gives tokens new values. Everything that uses a token updates together, with no change to classes, markup or components.' },
  { title: 'Checks keep components in line', description: '`npm run check:rules` fails if a component sets text without a complete text style, so components cannot drift away from the scale.' },
]

// The "See it work" part of How typography works: copy before and after the theme code.
export const typographyThemeExample = {
  title: 'See it work',
  beforeCode: 'This theme change makes every Label style uppercase with wider letter spacing. A product theme puts these lines on `:root`, so they apply everywhere:',
  afterCode: 'Here the same two tokens are set on the second box only, so you can compare. The Button, the Badge and the `mz-text-label-lg` class all change together, because they all read the Label tokens. Nothing else was edited.',
  code: `:root {
  --text-transform-label: uppercase;
  --letter-spacing-label: 0.08em;
}`,
} as const
