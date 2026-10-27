import type { DocsPageContent } from '../../../../templates/docsPageContent'

export const linksAndDecorationContent: DocsPageContent = {
  id: 'links-and-decoration',
  kind: 'foundation',
  title: 'Links and decoration',
  description: 'Links are underlined and in the link color, so they stand out without relying on color alone.',
  sections: [
    {
      key: 'links',
      title: 'Links',
      body: [
        'A link uses the link color, `--color-link`, and an underline. The underline is the baseline border width thick, and sits `--underline-offset` below the text, so it clears the letters that hang below the line. A hovered link darkens to `--color-link-hovered`, and a pressed one to `--color-link-pressed`. A link to the current page drops its underline and turns semibold, so it reads as “you are here”. Visited links look the same as unvisited ones.',
        'In Wireframe, every text link is underlined, and the underline thickens on hover and keyboard focus, so links stay clear without color.',
      ],
    },
    {
      key: 'otherLines',
      title: 'Other lines',
      body: ['No other text decoration is set. Strikethrough (`text-decoration-line: line-through`), overlines, and line styles such as dashed or wavy (`text-decoration-style`) use the browser’s defaults.'],
    },
  ],
  relatedPages: [
    { label: 'Link', href: '/link' },
    { label: 'Color and contrast', href: '/typography/color-and-contrast' },
  ],
  references: [
    { label: 'MDN: text-decoration', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration' },
  ],
}
