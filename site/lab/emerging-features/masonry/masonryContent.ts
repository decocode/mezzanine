// The Lab's Masonry page, in Emerging features: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, FuturePage } from '../../shared/labTypes'

export const masonryPage: FuturePage = {
  key: 'masonry', id: 'lab-masonry', kind: 'foundation', title: 'Masonry', href: '/site/lab/emerging-features/masonry',
  sections: [{ key: 'howItWorks' }],
  references: [
    { label: 'MDN: Grid lanes layout', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Grid_lanes' },
    { label: 'WebKit: Introducing CSS Grid Lanes', href: 'https://webkit.org/blog/17660/introducing-css-grid-lanes/' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const masonryCssNotes: Record<string, CssNote> = {
  masonry: {
    paragraphs: [
      'Every browser gets an ordinary auto-fill grid first. Then `@supports` checks whether the browser understands `display: grid-lanes`.',
      'Where it does, the grid becomes masonry, and each item moves up into the shortest column. Where it doesn’t, the first rule still works, just with gaps.',
    ],
    code: `.lab-masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 8rem), 1fr));
  gap: var(--space-3);
  align-items: start;
}

@supports (display: grid-lanes) {
  .lab-masonry {
    display: grid-lanes;
  }
}`,
  },
}
