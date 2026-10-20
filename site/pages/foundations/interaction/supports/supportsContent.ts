// The Supports page, in Foundations › Interaction: its explanation and the CSS behind its example, in plain English.
import type { DocsPageContent } from '../../../../templates/docsPageContent'
import type { CssNote } from '../../../../components/ExampleParts'

export const supportsContent: DocsPageContent = {
  id: 'supports', kind: 'foundation', title: 'Supports',
  sections: [
    {
      key: 'howItWorks',
      body: [
        '@supports asks the browser whether it understands a feature, and uses some CSS only if it does.',
        'It lets you use a new feature as an extra, while every other browser keeps something that works. It has worked in every major browser for about ten years.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'MDN: @supports', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@supports' },
    { label: 'MDN: Using feature queries', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Conditional_rules/Using_feature_queries' },
  ],
}

// Example copy.
export const supportsExampleText = 'The same question, asked live in your browser. The last three are newer features that not every browser has yet.'

// What the example's CSS does. Unless marked as an example, the code is copied from
// supports.css, and a browser test checks that it still matches.
export const supportsCssNotes: Record<string, CssNote> = {
  supports: {
    isExample: true,
    paragraphs: [
      'Every browser first gets an ordinary rule. Then `@supports` checks whether the browser understands `display: grid-lanes`, a newer way to build masonry layouts, and only then uses it.',
    ],
    code: `@supports (display: grid-lanes) {
  .masonry {
    display: grid-lanes;
  }
}`,
  },
}
