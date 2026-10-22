// The Container queries page, in Foundations › Layout: its explanation and the CSS behind its
// examples, in plain English.
import type { DocsPageContent } from '../../../../templates/docsPageContent'
import type { CssNote } from '../../../../components/ExampleParts'

export const containerQueriesContent: DocsPageContent = {
  id: 'container-queries', kind: 'foundation', title: 'Container queries',
  description: 'When a component fits the space its container gives it.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'A container query lets a component change its layout depending on how much space its container gives it, rather than how wide the whole screen is.',
        'The same component can sit in a narrow side panel and a wide main column on the same screen, and suit both. A screen breakpoint would give both copies the same layout, because the screen is the same width for each.',
      ],
    },
    { key: 'twoSlots', title: 'A narrow slot and a wide slot' },
    { key: 'oneSlot', title: 'One slot in a frame' },
  ],
  references: [
    { label: 'MDN: Container queries', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries' },
  ],
}

// What the examples' CSS does. The code is copied from containerQueries.css, and a browser test
// checks that it still matches.
export const containerQueriesCssNotes: Record<string, CssNote> = {
  twoSlots: {
    paragraphs: [
      'The two slots share a row. The narrow slot asks for the sm width, 15rem, and the wide slot has a `flex-grow` of 999, so it takes the rest. It never goes below 55%, so when there isn’t room it drops underneath.',
      'Each slot is also a container. The `container` property gives it a name, `example-slot`, and says the tile inside may ask about its `inline-size`, which means its width.',
    ],
    code: `.example-two-slots {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-6);
}

.example-two-slots > :first-child {
  flex: 1 1 var(--width-sm);
}

.example-two-slots > :last-child {
  flex: 999 1 0;
  min-inline-size: 55%;
}

.example-slot {
  container: example-slot / inline-size;
  min-inline-size: 0;
}`,
  },
  oneSlot: {
    paragraphs: [
      'The tile starts as a single column, with the image above the text. The `@container` rule then asks the nearest container called `example-slot` how wide it is.',
      'When the slot is at least 26rem wide, the tile switches to two columns: 6rem for the image and the rest for the text. The window size plays no part.',
      'A container query’s condition can’t read a custom property, so its size is written out instead of coming from a token.',
    ],
    code: `.example-tile {
  display: grid;
  gap: var(--space-4);
}

@container example-slot (width >= 26rem) {
  .example-tile {
    grid-template-columns: var(--space-24) minmax(0, 1fr);
    align-items: start;
  }
}`,
  },
}
