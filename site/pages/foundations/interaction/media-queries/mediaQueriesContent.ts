// The Media queries page, in Foundations › Interaction: its explanation and the CSS behind its example, in plain English.
import type { DocsPageContent } from '../../../../templates/docsPageContent'
import type { CssNote } from '../../../../components/ExampleParts'

export const mediaQueriesContent: DocsPageContent = {
  id: 'media-queries', kind: 'foundation', title: 'Media queries',
  description: 'Respect the person’s settings and device.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Media queries were once used to tell layouts when to rearrange themselves based on browser window sizes that were typical for different devices such as mobile, tablet and desktop. This approach to responsive layouts is being phased out.',
        'Media queries now answer a different question: how is this person using the site? Have they asked for less motion? Are they using a finger or a mouse? Have they installed the site as an app? Questions about space belong to each component, which asks its container how much room it has. Keeping the two apart stops screen sizes creeping into every component.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'MDN: Using media queries', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// mediaQueries.css, and a browser test checks that it still matches.
export const mediaQueriesCssNotes: Record<string, CssNote> = {
  environment: {
    isExample: true,
    paragraphs: [
      'In CSS, each question in the table becomes an `@media` rule that adjusts things for the person’s setup, such as stronger borders when they ask for more contrast, or bigger targets when they use touch.',
      'Notice that neither example mentions a screen width. The live answers on this page come from JavaScript, which reads these queries through `matchMedia`.',
    ],
    code: `@media (prefers-contrast: more) {
  .example {
    border-color: var(--color-text);
  }
}

@media (pointer: coarse) {
  .example {
    min-block-size: var(--target-size-md);
  }
}`,
  },
}

export const environmentQueries = [
  { label: 'Prefers dark colour scheme', query: '(prefers-color-scheme: dark)' },
  { label: 'Prefers more contrast', query: '(prefers-contrast: more)' },
  { label: 'Prefers reduced transparency', query: '(prefers-reduced-transparency: reduce)' },
  { label: 'Forced colours (high contrast mode)', query: '(forced-colors: active)' },
  { label: 'Main pointer is coarse (touch)', query: '(pointer: coarse)' },
  { label: 'Main pointer can hover', query: '(hover: hover)' },
  { label: 'Any pointer is coarse (touch)', query: '(any-pointer: coarse)' },
  { label: 'Any pointer can hover', query: '(any-hover: hover)' },
  { label: 'Installed as an app (standalone)', query: '(display-mode: standalone)' },
  { label: 'Portrait orientation', query: '(orientation: portrait)' },
  { label: 'Being printed', query: 'print' },
  { label: 'Window is at least 48rem wide', query: '(width >= 48rem)' },
]
