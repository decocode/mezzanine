import type { DocsPageContent } from '../../../../templates/docsPageContent'

// Shown in the Example intro and again after the live example.
export const tableOfContentsImportParagraph = 'Import `TableOfContents` from `@decocode/mezzanine`. It composes Mezzanine’s React Aria `Heading` and `Link`with a navigation landmark and nested lists.'

export const tableOfContentsContent: DocsPageContent = {
  id: 'table-of-contents',
  kind: 'component',
  title: 'Table of contents',
  description: 'A table of contents lists the sections of a page as links. It helps people see what the page covers and jump straight to the part they need.',
  sections: [
    {
      key: 'example',
      intro: [
        'Parent links lead to sections; indented child links lead to their subsections. All links stay visible. Try a child link in the example to jump to its heading.',
        tableOfContentsImportParagraph,
      ],
    },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'TableOfContents anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'TableOfContents', description: 'Renders a named navigation landmark and nested lists of section links.' },
          { name: 'Heading', description: 'Provides the visible Contents label and accessible navigation name.' },
          { name: 'Link', description: 'Points to the id supplied for each section.' },
        ],
      },
    },
    {
      key: 'usage',
      intro: [
        'Place the component after the page introduction. Match link labels to the section headings and give each destination a unique ID. Nest children to match the heading hierarchy.',
        'As the page scrolls, the link to the section being read shows Nav Tree’s current-page bar. It’s the last section to pass a line a third of the way down the window, or the last section once the page reaches its end.',
      ],
    },
    {
      key: 'accessibility',
      intro: [
        'The visible heading names the navigation landmark; use a distinct heading when more than one Table of Contents appears on a page.',
        'The link to the section being read has `aria-current="location"`, so screen readers announce it as the current location.',
        'Tab moves between links and Enter follows a link. Following a link updates the URL fragment to identify the section. The showcase keeps target headings below its sticky header.',
      ],
    },
    {
      key: 'props',
      table: {
        label: 'Table of Contents props',
        nameColumn: 'Prop',
        className: 'documentation-props-table',
        rows: [
          { name: 'sections', description: 'Required list of sections, each with an `id` matching a destination heading and a `label` for its link. Optional `children` contain sections with the same structure, rendered as a nested list. List order is preserved. An empty list renders nothing.' },
          { name: 'heading', description: 'Visible heading and navigation landmark name. Defaults to Contents.' },
          { name: 'headingLevel', description: 'Heading level: 2 by default, or 3 when nested within a page section.' },
          { name: 'aria-label / aria-labelledby', description: 'Names the navigation from something already on screen, such as the Panel it sits in. Either one leaves out the visible heading, so the name isn’t shown twice.' },
          { name: 'className', description: 'Optional CSS class added alongside the component’s default class.' },
        ],
      },
    },
  ],
  relatedPages: [
    { label: 'Link', href: '/link' },
    { label: 'Button', href: '/button' },
    { label: 'Radio group', href: '/radio-group' },
    { label: 'Target size', href: '/interaction/target-size' },
  ],
  references: [
    { label: 'React Aria Link', href: 'https://react-aria.adobe.com/Link' },
  ],
}
