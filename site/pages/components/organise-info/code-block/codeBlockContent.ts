import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'

export const codeBlockContent: DocsPageContent = {
  id: 'code-block',
  kind: 'component',
  title: 'Code block',
  description: 'A code block shows several lines of code, such as an example or a set of instructions, on its own dark surface. It keeps the code’s line breaks and indentation, and long lines scroll sideways rather than breaking in the middle of a word.',
  sections: [
    { key: 'example', intro: ['`CodeBlock` renders the code you pass as its children in a monospace font, on a dark surface in every theme. Its copy button, in a strip above the code, copies the code to the clipboard.'] },
    { key: 'language', title: 'Syntax highlighting', intro: ['`language` colours the code’s keywords, strings, comments and other parts, using the syntax colour roles each theme sets. The languages are `bash`, `css`, `html`, `javascript`, `json`, `jsx`, `tsx` and `typescript`. The highlighter loads only when a page first shows highlighted code, so pages without it download nothing extra. Inside Wireframe, the block stays dark but the code is monochrome.'] },
    { key: 'title', title: 'Title', intro: ['`title` adds a heading to the strip, such as a file name. It also names the code for screen readers.'] },
    { key: 'lineNumbers', title: 'Line numbers', intro: ['`showLineNumbers` numbers each line. `startLine` sets the first number, for an excerpt from further down a file.'] },
    { key: 'markedLines', title: 'Marked lines', intro: ['`highlightedLines`, `addedLines` and `removedLines` mark lines by their number. Added lines show +, and removed lines show −, so the meaning doesn’t rely on colour.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Code block anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'CodeBlock', description: 'Renders the code block surface: a strip with the optional title and the copy button, above a `pre` element holding the code. It sets `data-theme="dark"` on itself, so it is dark in every theme. Long lines scroll sideways, and line breaks and indentation are kept.' },
          { name: 'code', description: 'Added by `CodeBlock` inside the `pre`, so the content is marked up as code. With line numbers or marked lines, each line is a row. With `language`, each kind of code is a span coloured by its syntax role.' },
          { name: 'Button', description: 'Added by `CodeBlock` at the end of the strip. An icon button labelled “Copy code” that copies the code as written, without line numbers or markers.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Pass the code as text: `<CodeBlock>{exampleCode}</CodeBlock>`. A template literal keeps its line breaks and indentation.',
        'Use `CodeBlock` for code on its own lines. For a short piece of code inside a sentence, use the HTML `code` element instead, which Mezzanine styles as inline code.',
        'Syntax highlighting, line numbers and marked lines need the code as a single string, which is how most code is passed. Until the highlighter has loaded, the code shows as plain text.',
        '`CodeBlock` has no margin of its own. Pass `className` to position it in your layout. It also accepts the other attributes of a `pre`, which go on the `pre` that holds the code.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Long lines scroll sideways inside the block, so the page itself never scrolls sideways at 320 CSS pixels. The code area can take keyboard focus, so it can be scrolled with the arrow keys, and it shows the focus ring. Screen readers hear it as a region named by the title, or “Code” when there’s no title.',
        'The code always reads left to right, even on a right-to-left page.',
        'Line numbers and the + and − markers are hidden from screen readers. Instead, a marked line starts with a word they hear, such as “Added:”.',
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
    { label: 'Semantic HTML', href: '/typography/semantic-html' },
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

// The code shown in the Title, Line numbers and Marked lines examples.
export const codeBlockFeatureExamples = {
  title: 'example.css',
  lineNumbersStart: 12,
  markedCode: `.example {
  color: var(--color-text);
  padding: var(--space-2);
  padding: var(--space-4);
}`,
} as const
