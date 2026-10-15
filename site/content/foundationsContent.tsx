import type { ReactNode } from 'react'

export const foundationsDescription = 'Foundations are the parts of Mezzanine that stay the same in every theme: how far apart things are, and how components respond to people.'

export const foundationsDefinitionParagraphs: ReactNode[] = [
  'A Foundation stays the same whichever theme is active. If a theme should be able to change something, such as a colour, a typeface or a corner radius, it is a Style instead.',
  <>Foundation tokens are defined once, in <code>src/tokens/</code>, and every theme uses the same values. Lengths are stored in <code>rem</code>, so they follow the root text size.</>,
]

export const foundationsPages: { label: string; href: string; description: string }[] = [
  { label: 'Accessibility', href: '/accessibility', description: 'What applies to every component: the WCAG target, what React Aria provides, what Mezzanine adds and how it is checked.' },
  { label: 'Interaction', href: '/interaction', description: 'How components respond to pointer, touch, keyboard and focus, and the states they show.' },
  { label: 'Spacing', href: '/spacing', description: 'The spacing scale used for distance inside components and between elements.' },
]

export const foundationsThemeColourParagraphs: ReactNode[] = [
  <>Some Foundations use colour. Interaction, for example, draws focus rings in <code>--color-focus</code>. The colour comes from the active theme and is documented on the Color page. When and how it appears does not change.</>,
]

export const foundationsTechnicalDetailsParagraphs: ReactNode[] = [
  'Each Foundations page ends with Technical details, in this order: CSS properties, Tokens, Accessibility and Localisation. Sections that do not apply to a page are left out. Accessibility appears only when a page has something specific to add; what applies everywhere is on the Accessibility page.',
]
