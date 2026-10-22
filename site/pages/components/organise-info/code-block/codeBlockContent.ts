import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'

export const codeBlockContent: DocsPageContent = {
  id: 'code-block',
  kind: 'component',
  title: 'Code block',
  description: 'A code block shows several lines of code, such as an example or a set of instructions, on its own surface. It keeps the code’s line breaks and indentation, and wraps long lines so nothing is hidden on a narrow screen.',
  sections: [
    { key: 'example', intro: ['`CodeBlock` renders the code you pass as its children in a monospace font, with a border and space around it. Its copy button copies the code to the clipboard.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Code block anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'CodeBlock', description: 'Renders a `pre` element with the code block surface. It keeps line breaks and indentation, and wraps long lines.' },
          { name: 'code', description: 'Added by `CodeBlock` inside the `pre`, so the content is marked up as code.' },
          { name: 'Button', description: 'Added by `CodeBlock` at the top end. An icon button labelled “Copy code” that copies the text of the `code` element. The code wraps beside and below it, so the button never covers it.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Pass the code as text: `<CodeBlock>{exampleCode}</CodeBlock>`. A template literal keeps its line breaks and indentation.',
        'Use `CodeBlock` for code on its own lines. For a short piece of code inside a sentence, use the HTML `code` element instead, which Mezzanine styles as inline code.',
        '`CodeBlock` has no margin of its own. Pass `className` to position it in your layout. It also accepts the other attributes of a `pre`.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Long lines wrap instead of scrolling sideways, so the block never needs keyboard focus to be read, and content still reflows at 320 CSS pixels with text enlarged to 200%.',
        'Screen readers read the code as ordinary text. If the code needs explaining, put the explanation in the text around the block.',
        'The copy button’s label, “Copy code”, shows in a tooltip and is its accessible name. After copying, the label changes to “Copied”, the icon changes to a check mark, and screen readers hear “Copied” through a polite status message. The button returns to “Copy code” after two seconds.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Code block pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('CodeBlock'),
      },
    },
  ],
  relatedPages: [
    { label: 'Prose', href: '/typography/prose' },
    { label: 'Shape', href: '/shape' },
    { label: 'Color', href: '/color' },
  ],
  references: [
    { label: 'MDN: HTML pre element', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/pre' },
    { label: 'MDN: HTML code element', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/code' },
  ],
}

// The code shown in the live example.
export const codeBlockExampleCode = `.example {
  color: var(--color-text);
  padding: var(--space-4);
}`
