// The Lab's Supports page, in Browser and device: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, LabPage } from '../../shared/labTypes'

export const supportsPage: LabPage = {
  id: 'lab-supports', kind: 'foundation', title: 'Supports', href: '/site/lab/browser-and-device/supports',
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

// Example copy with a link to another Lab page.
export const supportsExampleLinkText = 'The same question, asked live in your browser. The last three are in [Emerging features](/site/lab/emerging-features).'

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const supportsCssNotes: Record<string, CssNote> = {
  supports: {
    paragraphs: [
      'Every browser first gets an ordinary rule. Then `@supports` checks whether the browser understands `display: grid-lanes`, and only then uses it. This is the masonry rule from Emerging features.',
    ],
    code: `@supports (display: grid-lanes) {
  .lab-masonry {
    display: grid-lanes;
  }
}`,
  },
}
