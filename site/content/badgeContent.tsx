// Written guidance and reference entries; live examples stay in the page.
export const badgeContent = {
  title: 'Badge',
  description: 'A badge is a small label that highlights a status or category, such as New, Draft or Complete. It gives extra information about an item rather than acting as a button.',
  relatedPages: [
    { label: 'Color', href: '/color' },
    { label: 'Button', href: '/button' },
    { label: 'Link', href: '/link' },
  ],
  references: [
    { label: 'MDN: HTML span element', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/span' },
  ],
  exampleParagraphs: [
    <>
      <code>Badge</code> defaults to the neutral variant and renders a non-interactive text label.
    </>,
  ],
  anatomyRows: [
    { name: 'Badge', description: <>Renders a non-interactive span containing the status label. The variant controls its colour treatment.</> },
  ],
  variantsParagraphs: [
    <>
      The <code>variant</code> prop selects a core or semantic colour treatment.
    </>,
  ],
  usageParagraphs: [
    <>Use a short text label that communicates the status without relying on colour. Supply it as the children of <code>Badge</code>; <code>variant</code> defaults to <code>neutral</code>. The available variants are shown above.</>,
    <>Badge renders a <code>span</code>, not an action control. Use <code>Button</code> or <code>Link</code> for an action or destination. It does not add keyboard interaction or automatically announce changes.</>,
  ],
}
