import type { DocsPageContent } from '../../../../templates/docsPageContent'

export const charactersAndGlyphsContent: DocsPageContent = {
  id: 'characters-and-glyphs',
  kind: 'foundation',
  title: 'Characters and glyphs',
  description: 'Letters keep the case they’re written in, and numbers and special characters come from the typeface.',
  sections: [
    {
      key: 'lettercase',
      title: 'Lettercase',
      body: ['Each text role has its own `--text-transform-*` token, such as `--text-transform-label`. All of them are `none`, so text keeps the case it’s written in. A theme can change one, for example to make every label uppercase, without anyone retyping the labels.'],
    },
    {
      key: 'numerals',
      title: 'Numerals',
      body: ['No numeral style is set, so numbers look the way the typeface draws them. When a column of numbers needs to line up, `font-variant-numeric: tabular-nums` gives every digit the same width.'],
    },
    {
      key: 'openTypeFeatures',
      title: 'OpenType features',
      body: ['Ligatures, fractions and stylistic alternates follow the typeface’s own defaults. None are turned on or off.'],
    },
  ],
  relatedPages: [
    { label: 'Text styles', href: '/typography/text-styles' },
    { label: 'Typeface and fonts', href: '/typography/typeface-and-fonts' },
  ],
  references: [
    { label: 'MDN: font-variant-numeric', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric' },
  ],
}
