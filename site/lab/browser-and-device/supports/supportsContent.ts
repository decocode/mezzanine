// The Lab's Supports page, in Browser and device: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, LabTopLevelPage } from '../../shared/labTypes'

export const supportsPage: LabTopLevelPage = {
  id: 'lab-supports',
  href: '/site/lab/browser-and-device/supports',
  title: 'Supports',
  what: '@supports asks the browser whether it understands a feature, and uses some CSS only if it does.',
  why: 'It lets you use a new feature as an extra, while every other browser keeps something that works. It has worked in every major browser for about ten years.',
  references: [
    { label: 'MDN: @supports', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@supports' },
    { label: 'MDN: Using feature queries', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Conditional_rules/Using_feature_queries' },
  ],
}

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
