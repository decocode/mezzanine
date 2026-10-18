import type { ReactNode } from 'react'

export const fluidTextDescription = 'Display and Heading text grows and shrinks smoothly with the width of the screen, between a smallest and a largest size. Title, Body and Label text stays the same size, so reading text is always comfortable.'

export const fluidTextHowItWorks: ReactNode = <>Each Display and Heading size uses CSS <code>clamp()</code>. It has three parts: a smallest size in <code>rem</code>, a preferred size that adds a share of the screen’s width in <code>vw</code>, and a largest size in <code>rem</code>. Because both limits are in <code>rem</code>, the text still grows when someone enlarges their text.</>

export const fluidTextExample = {
  display: 'Display text',
  heading: 'Heading text',
  body: 'Body text stays the same size at every width.',
}

export const fluidTextCssProperties = [
  { name: 'font-size', description: <>Set to a <code>clamp()</code> value for Display and Heading text, and to a fixed <code>rem</code> size for the others.</> },
  { name: 'clamp()', description: 'Takes a smallest, a preferred and a largest value, and uses the preferred one unless it falls outside the limits.' },
]

// Token names only; their values are read from the token source on the page.
export const fluidTextTokens = [
  { token: '--font-size-display-lg', label: 'Display large' },
  { token: '--font-size-display-md', label: 'Display medium' },
  { token: '--font-size-display-sm', label: 'Display small' },
  { token: '--font-size-heading-lg', label: 'Heading large' },
  { token: '--font-size-heading-md', label: 'Heading medium' },
  { token: '--font-size-heading-sm', label: 'Heading small' },
]

export const fluidTextRelatedPages = [
  { label: 'Text styles', href: '/typography/text-styles' },
  { label: 'Typography', href: '/typography' },
]

export const fluidTextReferences = [
  { label: 'MDN: clamp()', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/clamp' },
]
