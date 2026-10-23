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
    { key: 'twoContainers', title: 'A narrow container and a wide container' },
    { key: 'oneContainer', title: 'One container in a frame' },
  ],
  references: [
    { label: 'MDN: Container queries', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries' },
  ],
}

// What the examples' CSS does. The code is copied from containerQueries.css, and a browser test
// checks that it still matches.
export const containerQueriesCssNotes: Record<string, CssNote> = {
  twoContainers: {
    paragraphs: [
      'The two containers share a row. The narrow one asks for the sm width, 15rem, and the wide one has a `flex-grow` of 999, so it takes the rest. It never goes below 55%, so when there isn’t room it drops underneath.',
      'The `container` property makes each one a container. It gives it a name, `example-container`, and says the item inside may ask about its `inline-size`, which means its width.',
    ],
    code: `.example-two-containers {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-6);
}

.example-two-containers > :first-child {
  flex: 1 1 var(--width-sm);
}

.example-two-containers > :last-child {
  flex: 999 1 0;
  min-inline-size: 55%;
}

.example-container {
  container: example-container / inline-size;
  min-inline-size: 0;
}`,
  },
  oneContainer: {
    paragraphs: [
      'The item starts as a single column, with the image above the text. The `@container` rule then asks the nearest container called `example-container` how wide it is.',
      'When the container is at least 26rem wide, the item switches to two columns: 6rem for the image and the rest for the text. The window size plays no part.',
      'A container query’s condition can’t read a custom property, so its size is written out instead of coming from a token.',
    ],
    code: `.example-item-layout {
  display: grid;
  gap: var(--space-4);
}

@container example-container (width >= 26rem) {
  .example-item-layout {
    grid-template-columns: var(--space-24) minmax(0, 1fr);
    align-items: start;
  }
}`,
  },
}
