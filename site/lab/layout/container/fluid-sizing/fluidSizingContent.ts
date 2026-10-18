// The Lab's Fluid sizing page, in Container: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, StagePage } from '../../../shared/labTypes'

export const fluidSizingPage: StagePage = {
  key: 'fluidSizing', id: 'lab-fluid-sizing', stage: 'container', title: 'Fluid sizing', href: '/site/lab/layout/container/fluid-sizing',
  relatedPages: [{ label: 'Fluid text', href: '/text/fluid-text' }],
  subtitle: 'When a size grows and shrinks smoothly with the space it has.',
  what: 'Fluid sizing lets a size grow and shrink smoothly with its space, between a smallest and a largest value, instead of jumping from one size to another.',
  why: 'CSS has three functions for it. `min()` uses whichever of its values is smaller, so it sets a ceiling. `max()` uses whichever is larger, so it sets a floor. `clamp()` does both: `clamp(1.5rem, 1rem + 4cqi, 3rem)` means “1rem plus 4% of the container’s width, but never smaller than 1.5rem or larger than 3rem”.',
  details: [
    'The middle value usually mixes a fixed unit with one that follows the space. `vw` follows the browser window, and `cqi` follows the box’s container. The `rem` part keeps text growing when someone enlarges it.',
    'It suits headings and display text, which can be bigger where there’s room; Mezzanine’s own Display and Heading styles work this way. It also suits space around page sections, which can breathe more on a wide screen. It keeps widths within comfortable limits, such as a reading column, and sets minimums that never push past a narrow screen, such as `min(100%, 15rem)`.',
  ],
  references: [
    { label: 'MDN: clamp()', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/clamp' },
    { label: 'MDN: Container size and style queries', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_size_and_style_queries' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const fluidSizingCssNotes: Record<string, CssNote> = {
  fluidSpace: {
    paragraphs: [
      'The padding and the gap are both `clamp(var(--space-2), 4cqi, var(--space-8))`: 4% of the frame’s width, but never less than `--space-2` or more than `--space-8`.',
      'The limits come from Mezzanine’s spacing tokens, so the space still follows the spacing scale at both ends.',
    ],
    code: `.lab-fluid-space {
  display: grid;
  gap: clamp(var(--space-2), 4cqi, var(--space-8));
  padding: clamp(var(--space-2), 4cqi, var(--space-8));
  border: 1px dashed var(--color-border);
}`,
  },
  fluidWidth: {
    paragraphs: [
      'The box’s `inline-size`, its width, is `clamp(12rem, 60%, 28rem)`: 60% of the frame, but never narrower than 12rem or wider than 28rem.',
    ],
    code: `.lab-fluid-width {
  inline-size: clamp(12rem, 60%, 28rem);
}`,
  },
  safeMinimum: {
    paragraphs: [
      'The box’s `inline-size` is `min(100%, 25rem)`. `min()` uses whichever value is smaller: 25rem when the frame has room, or the full width of the frame when it doesn’t.',
      'Without `min()`, a plain `25rem` would stick out of any frame narrower than that.',
    ],
    code: `.lab-safe-minimum {
  inline-size: min(100%, 25rem);
}`,
  },
}
