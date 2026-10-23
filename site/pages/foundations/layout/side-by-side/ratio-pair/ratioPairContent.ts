// The Ratio pair page, in Foundations › Layout: its explanation and the CSS behind its example, in plain English.
import type { DocsPageContent } from '../../../../../templates/docsPageContent'
import type { CssNote } from '../../../../../components/ExampleParts'

export const ratioPairContent: DocsPageContent = {
  id: 'ratio-pair', kind: 'foundation', title: 'Ratio pair',
  description: 'When two boxes agree to divvy up their shared space.',
  alsoKnownAs: [
    { where: 'Figma', called: 'Auto layout, horizontal, with Wrap. One child is set to Fill container.' },
    { where: 'CSS', called: 'Flexbox with `flex-wrap`, `flex-grow` and `flex-basis`. CSS has no single name for this pattern.' },
    { where: 'Tailwind CSS', called: '`flex flex-wrap` on the parent, with `grow` and `basis-1/3` (for example) on the two areas. There’s no named pattern.' },
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
    { label: 'Every Layout: Sidebar', href: 'https://every-layout.dev/layouts/sidebar/' },
    { label: 'Bedrock: Split', href: 'https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/split' },
    { label: 'Figma: Guide to auto layout', href: 'https://help.figma.com/hc/en-us/articles/360040451373-Guide-to-auto-layout' },
    { label: 'Tailwind CSS: flex-wrap', href: 'https://tailwindcss.com/docs/flex-wrap' },
    { label: 'Material Design: Canonical layouts', href: 'https://m3.material.io/foundations/adaptive-design/canonical-layouts' },
  ],
}

// What the example's CSS does: the library's own mz-ratio-pair rules, quoted from src/styles/layout.css.
// A browser test checks that they still match.
export const ratioPairCssNotes: Record<string, CssNote> = {
  ratioPair: {
    paragraphs: [
      'A Ratio pair puts two items side by side using CSS Flexbox:',
      { list: [
        '`display: flex` places them side by side, `gap` adds space between them, and `flex-wrap: wrap` lets them stack, one above the other, when space runs out.',
        '`flex-grow` sets their width ratio. Both items start from no width (`flex-basis: 0`), so a ratio of `1` and `2` gives you a 1/3 and 2/3 split.',
        '`min-inline-size` sets each item’s minimum width, 15rem by default. If both can’t fit side by side, they stack. The minimum wins over the ratio, so a 1/3 split needs room for three minimum widths. (The `min()` function keeps an item from overflowing a container narrower than its minimum.)',
        'Auto start: the first item sizes itself to its content (`flex-basis: auto`, with no minimum width), while the second uses a high `flex-grow: 999` to take the remaining space. The second item keeps its minimum width, so it moves underneath when there isn’t room.',
      ] },
    ],
    code: `.mz-ratio-pair {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ratio-pair-gap);
  min-inline-size: 0;
}

.mz-ratio-pair[data-fraction] > * {
  flex-basis: 0;
  flex-grow: 1;
  min-inline-size: min(100%, var(--ratio-pair-min-area-width));
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
