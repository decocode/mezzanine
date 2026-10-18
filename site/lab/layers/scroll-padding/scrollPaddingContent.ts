// The Lab's Scroll padding page, in Layers: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, LabTopLevelPage } from '../../shared/labTypes'

export const scrollPaddingPage: LabTopLevelPage = {
  id: 'lab-scroll-padding',
  href: '/site/lab/layers/scroll-padding',
  title: 'Scroll padding',
  what: 'Scroll padding tells the browser how much room a sticky header takes up, so when you jump to a section, it stops just below the header instead of underneath it.',
  why: 'Without it, the heading you jumped to, or the control you tabbed to, can end up hidden under the header. WCAG 2.2 has a rule about exactly this, called Focus Not Obscured.',
  references: [
    { label: 'MDN: scroll-padding', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding' },
    { label: 'WCAG 2.2: Focus not obscured (minimum)', href: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const scrollPaddingCssNotes: Record<string, CssNote> = {
  scrollPadding: {
    paragraphs: [
      'The header uses `position: sticky` with `inset-block-start: 0`, so it stays at the top of the box as you scroll. Its height comes from a token, `--lab-sticky-height`.',
      'The fix is one line on the scrolling box: `scroll-padding-block-start` set to the same token. The browser then leaves that much room at the top whenever it scrolls something into view.',
    ],
    code: `.lab-scroll-padded {
  scroll-padding-block-start: var(--lab-sticky-height);
}

.lab-sticky-header {
  position: sticky;
  z-index: var(--z-index-sticky);
  inset-block-start: 0;
  box-sizing: border-box;
  min-block-size: var(--lab-sticky-height);
  padding: var(--space-3);
  border-block-end: 1px solid var(--color-border);
  background: var(--color-surface);
}`,
  },
}
