// The Lab's Scroll-state queries page, in Emerging features: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, FuturePage } from '../../shared/labTypes'

export const scrollStateQueriesPage: FuturePage = {
  key: 'scrollStateQueries', id: 'lab-scroll-state-queries', kind: 'foundation', title: 'Scroll-state queries', href: '/site/lab/emerging-features/scroll-state-queries',
  sections: [{ key: 'howItWorks' }],
  references: [
    { label: 'MDN: Container scroll-state queries', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Conditional_rules/Container_scroll-state_queries' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const scrollStateQueriesCssNotes: Record<string, CssNote> = {
  scrollState: {
    paragraphs: [
      'The header becomes a scroll-state container with `container-type: scroll-state`, so the elements inside it can ask about its scrolling.',
      'The `@container scroll-state(stuck: top)` rule matches only while the header is stuck to the top, and adds the Warning outline. Browsers without it simply never match the rule.',
    ],
    code: `.lab-stuck-aware {
  container-type: scroll-state;
}

@container scroll-state(stuck: top) {
  .lab-stuck-aware > span {
    display: inline-block;
    outline: 2px solid var(--color-warning-600);
    outline-offset: var(--space-1);
  }
}`,
  },
}
