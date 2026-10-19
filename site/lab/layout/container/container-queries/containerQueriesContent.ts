// The Lab's Container queries page, in Container: its explanation and the CSS behind its example, in plain English. Illustrative and unapproved.
import type { CssNote, StagePage } from '../../../shared/labTypes'

export const containerQueriesPage: StagePage = {
  key: 'containerQueries', id: 'lab-container-queries', kind: 'foundation', stage: 'container', title: 'Container queries', href: '/site/lab/layout/container/container-queries',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'A container query lets a component change its layout depending on how much space its container gives it, rather than how wide the whole screen is.',
        'The same component can sit in a narrow sidebar and a wide main column on the same screen, and suit both. A screen breakpoint would give both copies the same layout, because the screen is the same width for each.',
      ],
    },
    { key: 'example' },
  ],
  references: [
    { label: 'MDN: Container queries', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries' },
  ],
}

// What the example's CSS does. Unless marked as an example, the code is copied from
// layout-lab.css, and a browser test checks that it still matches.
export const containerQueriesCssNotes: Record<string, CssNote> = {
  twoSlots: {
    paragraphs: [
      'The two slots are themselves the Sidebar pattern: the narrow slot asks for 16rem, and the wide slot has a `flex-grow` of 999 and never goes below 55%.',
      'Each slot is also a container. The `container` property gives it a name, `lab-slot`, and says the tile inside may ask about its `inline-size`, which means its width.',
    ],
    code: `.lab-two-slots {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-6);
}

.lab-two-slots > :first-child {
  flex: 1 1 16rem;
}

.lab-two-slots > :last-child {
  flex: 999 1 0;
  min-inline-size: 55%;
}

.lab-cq-slot {
  container: lab-slot / inline-size;
  min-width: 0;
  overflow-x: auto;
}`,
  },
  containerTile: {
    paragraphs: [
      'The tile starts as a single column, with the image above the text. The `@container` rule then asks the nearest container called `lab-slot` how wide it is.',
      'When the slot is at least 26rem wide, the tile switches to two columns: 8rem for the image and the rest for the text. The window size plays no part.',
    ],
    code: `.lab-cq-tile {
  display: grid;
  gap: var(--space-4);
}

@container lab-slot (width >= 26rem) {
  .lab-cq-tile {
    grid-template-columns: 8rem minmax(0, 1fr);
    align-items: start;
  }
}`,
  },
}
