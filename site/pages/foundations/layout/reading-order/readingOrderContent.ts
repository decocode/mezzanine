// The Reading order page, in Foundations › Layout: its explanation and the CSS behind its example, in plain English.
import type { DocsPageContent } from '../../../../templates/docsPageContent'
import type { CssNote } from '../../../../components/ExampleParts'

export const readingOrderContent: DocsPageContent = {
  id: 'reading-order', kind: 'foundation', title: 'Reading order',
  description: 'When the order still makes sense to keyboard and screen reader users.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Reading order is the order people meet things when they use a keyboard or a screen reader. It always follows the HTML, even when CSS moves things around on screen.',
        'Flexbox and Grid can show things in a different order from the HTML. Then what people see and what they hear or tab through no longer match, and WCAG counts that as a failure. To change the order, change the HTML.',
      ],
      subheadings: [{ key: 'browserSupport', title: 'Browser support', body: ['A newer property, reading-flow, may one day let CSS change the reading order too, but only some browsers have it.'] }],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'MDN: Grid layout and accessibility', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Accessibility' },
    { label: 'WCAG 2.2: Meaningful sequence', href: 'https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// sideBySide.css, and a browser test checks that it still matches.
export const readingOrderCssNotes: Record<string, CssNote> = {
  readingOrder: {
    paragraphs: [
      'The rule `flex-direction: row-reverse` lays the row out from the other end, so the last button in the HTML appears first on screen.',
      'Only the picture changes. The keyboard and screen readers still follow the HTML.',
    ],
    code: `.row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.row-reverse {
  flex-direction: row-reverse;
  justify-content: flex-end;
}`,
  },
}
