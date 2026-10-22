// The Fluid sizing page, in Foundations › Dimension › Size: its explanation and the CSS behind its
// examples, in plain English.
import type { DocsPageContent } from '../../../../templates/docsPageContent'
import type { CssNote } from '../../../../components/ExampleParts'

export const fluidSizingContent: DocsPageContent = {
  id: 'fluid-sizing', kind: 'foundation', title: 'Fluid sizing',
  description: 'When a size grows and shrinks smoothly with the space it has.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Fluid sizing lets a size grow and shrink smoothly with its space, between a smallest and a largest value, instead of jumping from one size to another.',
        'CSS has three functions for it. `min()` uses whichever of its values is smaller, so it sets a ceiling. `max()` uses whichever is larger, so it sets a floor. `clamp()` does both: `clamp(1.5rem, 1rem + 4cqi, 3rem)` means “1rem plus 4% of the container’s width, but never smaller than 1.5rem or larger than 3rem”.',
        'The middle value usually mixes a fixed unit with one that follows the space. `vw` follows the browser window, and `cqi` follows the element’s container. The `rem` part keeps text growing when someone enlarges it.',
        'It suits headings and display text, which can be bigger where there’s room; the Display and Heading text styles work this way. It also suits space around page sections, which can breathe more on a wide screen. It keeps widths within comfortable limits, such as a reading column, and sets minimums that never push past a narrow screen, such as `min(100%, 15rem)`.',
      ],
    },
    { key: 'fluidSpace', title: 'Fluid space' },
    { key: 'fluidWidth', title: 'Fluid width' },
    { key: 'safeMinimum', title: 'Safe minimums' },
  ],
  relatedPages: [{ label: 'Fluid text', href: '/text/fluid-text' }],
  references: [
    { label: 'MDN: clamp()', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp' },
    { label: 'MDN: Container size and style queries', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_size_and_style_queries' },
  ],
}

// What the examples' CSS does. The code is copied from fluidSizing.css, and a browser test checks
// that it still matches.
export const fluidSizingCssNotes: Record<string, CssNote> = {
  fluidSpace: {
    paragraphs: [
      'The padding and the gap are both `clamp(var(--space-2), 4cqi, var(--space-8))`: 4% of the frame’s width, but never less than `--space-2` or more than `--space-8`. The frame is a size container, so `cqi` measures it.',
      'The limits come from the spacing scale, so the space still follows the scale at both ends.',
    ],
    code: `.example-fluid-space {
  display: grid;
  gap: clamp(var(--space-2), 4cqi, var(--space-8));
  padding: clamp(var(--space-2), 4cqi, var(--space-8));
  border: var(--border-width-baseline) dashed var(--color-border);
}`,
  },
  fluidWidth: {
    paragraphs: [
      'The item’s `inline-size`, its width, is `clamp(var(--width-xs), 60%, var(--width-lg))`: 60% of the frame, but never narrower than the xs width, 12rem, or wider than the lg width, 32rem.',
    ],
    code: `.example-fluid-width {
  inline-size: clamp(var(--width-xs), 60%, var(--width-lg));
}`,
  },
  safeMinimum: {
    paragraphs: [
      'The item’s `inline-size` is `min(100%, var(--width-md))`. `min()` uses whichever value is smaller: the md width, 20rem, when the frame has room, or the full width of the frame when it doesn’t.',
      'Without `min()`, a plain 20rem would stick out of any frame narrower than that.',
    ],
    code: `.example-safe-minimum {
  inline-size: min(100%, var(--width-md));
}`,
  },
}
