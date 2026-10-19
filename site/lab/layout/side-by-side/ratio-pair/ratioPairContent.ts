// The Lab's Ratio pair page, in Side by side: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, StagePage } from '../../../shared/labTypes'
import { everyLayout, bedrock } from '../../../shared/labValues'

export const ratioPairPage: StagePage = {
  key: 'ratioPair', id: 'lab-ratio-pair', kind: 'foundation', stage: 'sideBySide', title: 'Ratio pair', href: '/site/lab/layout/side-by-side/ratio-pair',
  description: 'When two boxes agree to divvy up their shared space.',
  alsoKnownAs: [
    { where: 'Figma', called: 'Auto layout, horizontal, with Wrap. One child is set to Fill container.' },
    { where: 'CSS', called: 'Flexbox with `flex-wrap`, `flex-grow` and `flex-basis`. CSS has no single name for this pattern.' },
    { where: 'Tailwind CSS', called: '`flex flex-wrap` on the parent, with `grow` and `basis-1/3` (for example) on the two areas. There’s no named pattern.' },
    { where: 'Bootstrap', called: 'A `row` with two columns, such as `col-md-4` and `col-md-8`. These stack below a set screen width.' },
    { where: 'Material Design', called: 'Supporting pane layout, or list-detail when one side lists items.' },
  ],
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Ratio pair is used to decide how space should be shared between two items placed side by side. For example, a picture beside its description, or a form beside its live preview.',
        'You can choose how the two areas share that space by using either fractions, such as one third and two thirds, or Auto Start, where the width of the first area is based on the content inside it.',
        'If using fractions each area has a default minimum width of 15rem. If using Auto Start, the width of the first area is based on the content inside it, and the width of the second area fills the remaining space, down to 15rem. When there isn’t enough room for both areas to be side by side, the second area moves underneath the first, and both become full width.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    everyLayout('Sidebar', 'sidebar'),
    bedrock('Split', 'split'),
    { label: 'Figma: Guide to auto layout', href: 'https://help.figma.com/hc/en-us/articles/360040451373-Guide-to-auto-layout' },
    { label: 'Tailwind CSS: flex-wrap', href: 'https://tailwindcss.com/docs/flex-wrap' },
    { label: 'Bootstrap: Grid system', href: 'https://getbootstrap.com/docs/5.3/layout/grid/' },
    { label: 'Material Design: Canonical layouts', href: 'https://m3.material.io/foundations/adaptive-design/canonical-layouts' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const ratioPairCssNotes: Record<string, CssNote> = {
  split: {
    paragraphs: [
      'Ratio pair is a Flexbox row: `display: flex` places the two areas next to each other. `flex-wrap: wrap` allows an area to move onto a new line when the row is full, and `gap` sets the space between them, whether they’re side by side or one above the other.',
      'Each area has a `flex-basis` of zero, so it starts with no width of its own. `flex-grow` then shares out the space: for one third and two thirds, the first area gets a `flex-grow` of 1 and the second gets 2, so the second takes twice as much.',
      '`min-inline-size` is the minimum width. Flexbox checks it before placing an area on the row; when two minimums plus the gap are more than the row’s width, the second area goes onto the next line. Alone on its line, `flex-grow` makes it fill the full width. The `min()` function stops the minimum from ever being wider than the Ratio pair itself.',
      'With Auto Start, the first area has a `flex-basis` of `auto`, which means its width comes from its content. The second area has a `flex-grow` of 999, so it takes almost all of the space that’s left, and keeps the minimum width.',
    ],
    code: `.mz-ratio-pair {
  display: flex;
  flex-wrap: wrap;
  gap: var(--_ratio-pair-gap, var(--ratio-pair-gap));
  min-inline-size: 0;
}

.mz-ratio-pair[data-fraction] > * {
  flex-basis: 0;
  flex-grow: 1;
  min-inline-size: min(100%, var(--_ratio-pair-min-area-width, var(--ratio-pair-min-area-width)));
}

.mz-ratio-pair[data-fraction='1/4'] > :last-child { flex-grow: 3; }
.mz-ratio-pair[data-fraction='1/3'] > :last-child { flex-grow: 2; }
.mz-ratio-pair[data-fraction='2/3'] > :first-child { flex-grow: 2; }
.mz-ratio-pair[data-fraction='3/4'] > :first-child { flex-grow: 3; }

.mz-ratio-pair[data-fraction='auto-start'] > :first-child,
.mz-ratio-pair[data-fraction='auto-end'] > :last-child {
  flex-basis: auto;
  min-inline-size: 0;
}

.mz-ratio-pair[data-fraction='auto-start'] > :last-child,
.mz-ratio-pair[data-fraction='auto-end'] > :first-child {
  flex-grow: 999;
}`,
  },
}
