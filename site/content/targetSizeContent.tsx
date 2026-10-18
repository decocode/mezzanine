import type { ReactNode } from 'react'

export const targetSizeDescription = 'Everything you can tap or click in Mezzanine is at least 44 pixels tall, so it’s easy to hit with a finger, a stylus or an unsteady hand.'

export const targetSizeParagraphs: ReactNode[] = [
  <>WCAG 2.2 asks for targets of at least 24 by 24 pixels. Mezzanine’s controls go further, to 44 pixels (2.75rem), from the shared <code>--target-size</code> token. Because the size is in <code>rem</code>, it grows when someone enlarges their text.</>,
  'Links inside a sentence are the exception. They follow the line of text, as WCAG allows.',
]

export const targetSizeTokens = [
  { token: '--target-size-min', label: 'The WCAG 2.2 AA minimum' },
  { token: '--target-size', label: 'The size Mezzanine’s controls use' },
]

export const targetSizeComponents = 'Button, ToggleButton, Checkbox, Radio, Tabs, TabBar, Disclosure, Navbar menu items, NavTree, ListBox, SearchField’s clear button, Breadcrumbs and Table of contents links.'

export const targetSizeRelatedPages = [
  { label: 'Interaction', href: '/interaction' },
  { label: 'Accessibility', href: '/accessibility' },
]

export const targetSizeReferences = [
  { label: 'WCAG 2.2: Target size (minimum)', href: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html' },
]
