// The Scroll padding page, in Foundations › Layers: its explanation and the CSS behind its example, in plain English.
import type { DocsPageContent } from '../../../../templates/docsPageContent'
import type { CssNote } from '../../../../components/ExampleParts'

export const scrollPaddingContent: DocsPageContent = {
  id: 'scroll-padding', kind: 'foundation', title: 'Scroll padding',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Scroll padding tells the browser how much room a sticky header takes up, so when you jump to a section, it stops just below the header instead of underneath it.',
        'Without it, the heading you jumped to, or the control you tabbed to, can end up hidden under the header. WCAG 2.2 has a rule about exactly this, called Focus Not Obscured.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'MDN: scroll-padding', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-padding' },
    { label: 'WCAG 2.2: Focus not obscured (minimum)', href: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layers.css, and a browser test checks that it still matches.
export const scrollPaddingCssNotes: Record<string, CssNote> = {
  scrollPadding: {
    paragraphs: [
      'The header uses `position: sticky` with `inset-block-start: 0`, so it stays at the top of the box as you scroll. Its height comes from a custom property, `--layers-sticky-height`.',
      'The fix is one line on the scrolling box: `scroll-padding-block-start` set to the same token. The browser then leaves that much room at the top whenever it scrolls something into view.',
    ],
    code: `.layers-scroll-padded {
  scroll-padding-block-start: var(--layers-sticky-height);
}

.layers-sticky-header {
  position: sticky;
  z-index: var(--z-index-sticky);
  inset-block-start: 0;
  box-sizing: border-box;
  min-block-size: var(--layers-sticky-height);
  padding: var(--space-3);
  border-block-end: var(--border-width-baseline) solid var(--color-border);
  background: var(--color-surface);
}`,
  },
}
