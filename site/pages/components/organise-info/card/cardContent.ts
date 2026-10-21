import type { DocsPageContent } from '../../../../templates/docsPageContent'

export const cardContent: DocsPageContent = {
  id: 'card',
  kind: 'component',
  title: 'Card',
  description: 'A card groups related content, such as a heading, some text and an action, on its own surface. On its own the card does nothing when pressed; with `href`, the whole card is a link.',
  sections: [
    { key: 'example', intro: ['`Card` renders a surface with a border, a raised shadow and space around its content. Its content is composed from other components.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Card anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'Card', description: 'Renders a `div` with the card surface, or a React Aria `Link` when given `href`. It adds even space between its direct children.' },
          { name: 'Heading', description: 'Optional. A `Heading` placed directly inside the card uses the Title medium text style.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Place the content inside `Card` as its children: for example a `Heading`, paragraphs and `Button` or `Link` controls. Card adds the spacing between them.',
        'Content flows as it does elsewhere on a page: headings and paragraphs fill the width, while inline content such as `code`, a `Badge` or a `Link` keeps its natural size. To put inline content on its own line, place it in a paragraph.',
        'A card with one destination can be a link: give `Card` an `href`, and the whole card takes people there. An arrow at its end shows that it can be pressed. It accepts React Aria `Link` props, such as `target`. A linked card must not contain other Buttons or Links, so for a card with several actions, leave out `href` and put each action on its own Button or Link.',
        'Pass `className` to position the card in your layout. Card also accepts the other attributes of a `div`.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Card adds no role or accessible name. Give it a `Heading` at the right level so people using a screen reader can find and identify it.',
        'A card with `href` is a link, and its accessible name is all the text inside it, heading first. The arrow is hidden from screen readers, which announce the link instead. Keep that text short so the link’s name stays easy to listen to.',
      ],
    },
    {
      key: 'tokens',
      intro: ['`Card` also uses the shared Body medium typography tokens for its text, and Title medium at the Emphasis weight for a heading placed directly inside it.'],
      table: {
        label: 'Card CSS tokens',
        nameColumn: 'CSS token',
        rows: [
          { name: '--card-padding', description: 'Space between the card edge and its content.' },
          { name: '--card-content-gap', description: 'Space between items inside the card.' },
          { name: '--card-border-width', description: 'Card border thickness.' },
          { name: '--card-border-radius', description: 'Rounding of the card corners.' },
          { name: '--card-background', description: 'Card surface colour.' },
          { name: '--card-foreground', description: 'Text colour inside the card.' },
          { name: '--card-border', description: 'Card border colour.' },
          { name: '--card-elevation', description: 'Card shadow; defaults to --elevation-raised-1.' },
          { name: '--card-arrow-size', description: 'Size of the arrow on a card with `href`.' },
          { name: '--card-arrow-color', description: 'Colour of the arrow on a card with `href`.' },
          { name: '--card-border-hovered', description: 'Border colour of a card with `href` on hover.' },
          { name: '--card-focus-ring-width', description: 'Focus ring thickness of a card with `href`.' },
          { name: '--card-focus-ring-offset', description: 'Gap between a card with `href` and its focus ring.' },
        ],
      },
    },
  ],
  relatedPages: [
    { label: 'Elevation', href: '/elevation' },
    { label: 'Shape', href: '/shape' },
    { label: 'Dialog', href: '/dialog' },
  ],
  references: [
    { label: 'MDN: HTML div element', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/div' },
  ],
}

// The teaching labels inside the live card in the Example section.
export const cardExample = {
  heading: 'Card title',
  body: 'Card content describes the item in a sentence or two.',
  action: 'Action',
} as const
