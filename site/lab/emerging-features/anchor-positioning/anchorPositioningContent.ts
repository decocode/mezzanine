// The Lab's Anchor positioning page, in Emerging features: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, FuturePage } from '../../shared/labTypes'

export const anchorPositioningPage: FuturePage = { key: 'anchorPositioning', id: 'lab-anchor-positioning', title: 'Anchor positioning', href: '/site/lab/emerging-features/anchor-positioning', references: [{ label: 'MDN: Using anchor positioning', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning/Using' }] }

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const anchorPositioningCssNotes: Record<string, CssNote> = {
  anchor: {
    paragraphs: [
      'The anchor gets a name with `anchor-name: --lab-anchor`. The label then refers to that name with `position-anchor`, and `position-area: inline-end` places it after the anchor along the line.',
      'If there isn’t room, `position-try-fallbacks` tries flipping it to the other side, then below. Inside `@supports`, so other browsers keep the label in normal flow.',
    ],
    code: `.lab-anchor-target {
  inline-size: 8rem;
  anchor-name: --lab-anchor;
}

@supports (anchor-name: --lab-anchor) {
  .lab-anchor-label {
    position: absolute;
    position-anchor: --lab-anchor;
    position-area: inline-end;
    position-try-fallbacks: flip-inline, block-end;
    max-inline-size: min(12rem, 90%);
    margin-inline-start: var(--space-2);
  }
}`,
  },
}
