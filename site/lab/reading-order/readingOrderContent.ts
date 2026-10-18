// The Lab's Reading order page: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, LabTopLevelPage } from '../shared/labTypes'

export const readingOrderPage: LabTopLevelPage = {
  id: 'lab-reading-order',
  href: '/site/lab/reading-order',
  title: 'Reading order',
  subtitle: 'When the order still makes sense to keyboard and screen reader users.',
  what: 'Reading order is the order people meet things when they use a keyboard or a screen reader. It always follows the HTML, even when CSS moves things around on screen.',
  why: 'Flexbox and Grid can show things in a different order from the HTML. Then what people see and what they hear or tab through no longer match, and WCAG counts that as a failure. To change the order, change the HTML.',
  support: 'A newer property, reading-flow, may one day let CSS change the reading order too, but only some browsers have it.',
  references: [
    { label: 'MDN: Grid layout and accessibility', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Accessibility' },
    { label: 'WCAG 2.2: Meaningful sequence', href: 'https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const readingOrderCssNotes: Record<string, CssNote> = {
  readingOrder: {
    paragraphs: [
      'The rule `flex-direction: row-reverse` lays the row out from the other end, so the last button in the HTML appears first on screen.',
      'Only the picture changes. The keyboard and screen readers still follow the HTML.',
    ],
    code: `.lab-order-row {
  display: flex;
  gap: var(--space-2);
}

.lab-order-reversed {
  flex-direction: row-reverse;
  justify-content: flex-end;
}`,
  },
}
