// The Split page, in Foundations › Layout: its explanation and the CSS behind its example, in plain English.
import type { DocsPageContent } from '../../../../templates/docsPageContent'
import type { CssNote } from '../../../../components/ExampleParts'

export const splitContent: DocsPageContent = {
  id: 'split', kind: 'foundation', title: 'Split',
  description: 'When two items agree to divvy up their shared space.',
  alsoKnownAs: [
    { where: 'Figma', called: 'Auto layout, horizontal, with Wrap. One child is set to Fill container.' },
    { where: 'CSS', called: 'Flexbox with `flex-wrap`, `flex-grow` and `flex-basis`. CSS has no single name for this pattern.' },
    { where: 'Tailwind CSS', called: '`flex flex-wrap` on the parent, with `grow` and `basis-1/3` (for example) on the two areas. There’s no named pattern.' },
    { where: 'Material Design', called: 'Supporting pane layout, or list-detail when one side lists items.' },
  ],
  sections: [
    {
      key: 'howItWorks',
      title: 'How a Split works',
      body: [
        'When two items need to be placed side by side, like an image next to text or a form next to its preview, Split controls how they share their row.',
        'It can split the row by a fraction, such as 1/3 and 2/3, with each item at least 15rem wide. Or it can use Auto start, where the first item fits its content and the second, at least 15rem wide, fills whatever space is left.',
        'If their container is too narrow for that, they stack, one above the other.',
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

// What the example's CSS does: the library's own mz-split rules, quoted from src/styles/layout.css.
// A browser test checks that they still match.
export const splitCssNotes: Record<string, CssNote> = {
  split: {
    paragraphs: [
      'A Split puts two items side by side using CSS Flexbox:',
      { list: [
        '`display: flex` places them side by side, `gap` adds space between them, and `flex-wrap: wrap` lets them stack, one above the other, when space runs out.',
        '`flex-grow` sets their width ratio. Both items start from no width (`flex-basis: 0`), so a ratio of `1` and `2` gives you a 1/3 and 2/3 split.',
        '`min-inline-size` sets each item’s minimum width, 15rem by default. If both can’t fit side by side, they stack. The minimum wins over the ratio, so a 1/3 split needs room for three minimum widths. (The `min()` function keeps an item from overflowing a container narrower than its minimum.)',
        'Auto start: the first item sizes itself to its content (`flex-basis: auto`, with no minimum width), while the second uses a high `flex-grow: 999` to take the remaining space. The second item keeps its minimum width, so it moves underneath when there isn’t room.',
      ] },
    ],
    code: `.mz-split {
  display: flex;
  flex-wrap: wrap;
  gap: var(--split-gap);
  min-inline-size: 0;
}

.mz-split[data-fraction] > * {
  flex-basis: 0;
  flex-grow: 1;
  min-inline-size: min(100%, var(--split-min-area-width));
}

.mz-split[data-fraction='1/4'] > :last-child { flex-grow: 3; }
.mz-split[data-fraction='1/3'] > :last-child { flex-grow: 2; }
.mz-split[data-fraction='2/3'] > :first-child { flex-grow: 2; }
.mz-split[data-fraction='3/4'] > :first-child { flex-grow: 3; }

.mz-split[data-fraction='auto-start'] > :first-child,
.mz-split[data-fraction='auto-end'] > :last-child {
  flex-basis: auto;
  min-inline-size: 0;
}

.mz-split[data-fraction='auto-start'] > :last-child,
.mz-split[data-fraction='auto-end'] > :first-child {
  flex-grow: 999;
}`,
  },
}
