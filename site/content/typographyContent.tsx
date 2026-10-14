import type { ReactNode } from 'react'

export const typographyIntro = [
  'Typography helps people understand what matters, scan a page and read its content. Mezzanine provides consistent text styles for everything from prominent headings to body copy and compact interface labels.',
  'Each style combines a font, size, weight, letter spacing, line height and capitalisation. Use these styles together to create a clear hierarchy; product themes can customise their appearance without changing how they are applied.',
]

export const typographyLayers: { title: string; description: ReactNode }[] = [
  { title: 'Tokens hold the values', description: <>Named CSS values, such as <code>--font-size-body-md</code>, store every font, size, weight, letter spacing, line height and capitalisation setting.</> },
  { title: 'Text styles bundle them', description: <>Each of the fifteen text styles, such as Body medium, combines one complete set of those tokens.</> },
  { title: 'Three routes reach the page', description: <>The same sets are used by the <code>mz-text-*</code> classes you add to markup, by the base styles for plain body text and <code>h1</code>–<code>h6</code> headings, and by every component&apos;s own CSS.</> },
  { title: 'Themes change the tokens', description: <>A theme gives tokens new values. Everything that uses a token updates together, with no change to classes, markup or components.</> },
  { title: 'Checks keep components in line', description: <><code>npm run check:rules</code> fails if a component sets text without a complete text style, so components cannot drift away from the scale.</> },
]

export const themeExampleCode = `:root {
  --text-transform-label: uppercase;
  --letter-spacing-label: 0.08em;
}`
