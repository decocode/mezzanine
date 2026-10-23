// The Reel page, in Foundations › Layout: its explanation and the CSS behind its
// example, in plain English.
import type { DocsPageContent } from '../../../../templates/docsPageContent'
import type { CssNote } from '../../../../components/ExampleParts'

export const reelContent: DocsPageContent = {
  id: 'reel', kind: 'foundation', title: 'Reel',
  description: 'When a row scrolls sideways.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Reel is a row of items that scrolls sideways, like a conga line going off the edge of the screen.',
        'It shows lots of items without wrapping them onto new rows. Keyboard users need to reach it too, so the scrolling area can take focus and has a name.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'Every Layout: Reel', href: 'https://every-layout.dev/layouts/reel/' },
    { label: 'Bedrock: Reel', href: 'https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/reel' },
  ],
}

export const reelExampleText = 'The reel scrolls sideways. Keyboard users reach it with Tab and scroll it with the arrow keys.'

// What the example's CSS does. The code is copied from sideBySide.css, and a browser test checks
// that it still matches.
export const reelCssNotes: Record<string, CssNote> = {
  reel: {
    paragraphs: [
      'The rule `display: flex` makes the reel a Flexbox row. A Flexbox doesn’t wrap unless `flex-wrap` says so, so the items stay on one line, and `overflow-x: auto` lets it scroll sideways when they don’t fit.',
      'Each item has `flex: 0 0 var(--width-xs)`. The `flex` property sets three things at once: `flex-grow`, `flex-shrink` and `flex-basis`. Here that means: don’t grow, don’t shrink, and start at the xs width. That keeps every item the same width, however many there are.',
    ],
    code: `.example-reel {
  display: flex;
  gap: var(--space-3);
  overflow-x: auto;
  padding-block-end: var(--space-2);
}

.example-reel > * {
  flex: 0 0 var(--width-xs);
}`,
  },
}
