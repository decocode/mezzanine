// Written guidance and reference entries; live examples stay in the page.
export const codeBlockContent = {
  title: 'Code block',
  description: 'A code block shows several lines of code, such as an example or a set of instructions, on its own surface. It keeps the code’s line breaks and indentation, and wraps long lines so nothing is hidden on a narrow screen.',
  relatedPages: [
    { label: 'Prose', href: '/typography/prose' },
    { label: 'Shape', href: '/shape' },
    { label: 'Color', href: '/color' },
  ],
  references: [
    { label: 'MDN: HTML pre element', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/pre' },
    { label: 'MDN: HTML code element', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/code' },
  ],
  exampleParagraphs: [
    <>
      <code>CodeBlock</code> renders the code you pass as its children in a monospace font, with a border and space around it.
    </>,
  ],
  exampleCode: `.example {
  color: var(--color-text);
  padding: var(--space-4);
}`,
  anatomyRows: [
    { name: 'CodeBlock', description: <>Renders a <code>pre</code> element with the code block surface. It keeps line breaks and indentation, and wraps long lines.</> },
    { name: 'code', description: <>Added by <code>CodeBlock</code> inside the <code>pre</code>, so the content is marked up as code.</> },
  ],
  usageParagraphs: [
    <>Pass the code as text: <code>{'<CodeBlock>{exampleCode}</CodeBlock>'}</code>. A template literal keeps its line breaks and indentation.</>,
    <>Use <code>CodeBlock</code> for code on its own lines. For a short piece of code inside a sentence, use the HTML <code>code</code> element instead, which Mezzanine styles as inline code.</>,
    <><code>CodeBlock</code> has no margin of its own. Pass <code>className</code> to position it in your layout. It also accepts the other attributes of a <code>pre</code>.</>,
  ],
  accessibilityParagraphs: [
    <>Long lines wrap instead of scrolling sideways, so the block never needs keyboard focus to be read, and content still reflows at 320 CSS pixels with text enlarged to 200%.</>,
    <>Screen readers read the code as ordinary text. If the code needs explaining, put the explanation in the text around the block.</>,
  ],
  tokensRows: [
    { name: '--code-block-padding', description: 'Space between the block edge and the code.' },
    { name: '--code-block-border-width', description: 'Block border thickness.' },
    { name: '--code-block-border-radius', description: 'Rounding of the block corners.' },
    { name: '--code-block-background', description: 'Block surface colour.' },
    { name: '--code-block-content', description: 'Code text colour.' },
    { name: '--code-block-border', description: 'Block border colour.' },
  ],
  tokensParagraphs: [
    <><code>CodeBlock</code> also uses the shared Body small typography tokens for its text. The code inside takes the shared monospace font family, which Mezzanine sets on every <code>code</code> element.</>,
  ],
}
