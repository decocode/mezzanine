// Written guidance and reference entries; live examples stay in the page.
export const cardContent = {
  title: 'Card',
  description: 'A card groups related content, such as a heading, some text and an action, on its own surface. It is a static container: the card itself does nothing when pressed.',
  relatedPages: [
    { label: 'Elevation', href: '/elevation' },
    { label: 'Shape', href: '/shape' },
    { label: 'Dialog', href: '/dialog' },
  ],
  references: [
    { label: 'MDN: HTML div element', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/div' },
  ],
  exampleParagraphs: [
    <>
      <code>Card</code> renders a surface with a border, a raised shadow and space around its content. Its content is composed from other components.
    </>,
  ],
  example: {
    heading: 'Card title',
    body: 'Card content describes the item in a sentence or two.',
    action: 'Action',
  },
  anatomyRows: [
    { name: 'Card', description: <>Renders a <code>div</code> with the card surface. It adds even space between its direct children.</> },
    { name: 'Heading', description: <>Optional. A <code>Heading</code> placed directly inside the card uses the Title medium text style.</> },
  ],
  usageParagraphs: [
    <>Place the content inside <code>Card</code> as its children: for example a <code>Heading</code>, paragraphs and <code>Button</code> or <code>Link</code> controls. Card adds the spacing between them.</>,
    <>Content flows as it does elsewhere on a page: headings and paragraphs fill the width, while inline content such as <code>code</code>, a <code>Badge</code> or a <code>Link</code> keeps its natural size. To put inline content on its own line, place it in a paragraph.</>,
    <>Card has no interaction of its own. Put actions on Buttons or Links inside it rather than making the whole card clickable.</>,
    <>Pass <code>className</code> to position the card in your layout. Card also accepts the other attributes of a <code>div</code>.</>,
  ],
  accessibilityParagraphs: [
    <>Card adds no role or accessible name. Give it a <code>Heading</code> at the right level so people using a screen reader can find and identify it.</>,
  ],
  tokensRows: [
    { name: '--card-padding', description: 'Space between the card edge and its content.' },
    { name: '--card-content-gap', description: 'Space between items inside the card.' },
    { name: '--card-border-width', description: 'Card border thickness.' },
    { name: '--card-border-radius', description: 'Rounding of the card corners.' },
    { name: '--card-background', description: 'Card surface colour.' },
    { name: '--card-content', description: 'Text colour inside the card.' },
    { name: '--card-border', description: 'Card border colour.' },
    { name: '--card-elevation', description: 'Card shadow; defaults to --elevation-raised-1.' },
  ],
  tokensParagraphs: [
    <><code>Card</code> also uses the shared Body medium typography tokens for its text, and Title medium at the Emphasis weight for a heading placed directly inside it.</>,
  ],
}
