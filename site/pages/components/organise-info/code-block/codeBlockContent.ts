import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { formatJsxProps } from '../../../../components/formatJsxProps'
import { pointerRows } from '../../../../components/pointerRows'

export const codeBlockContent: DocsPageContent = {
  id: 'code-block',
  kind: 'component',
  title: 'Code block',
  description: '`CodeBlock` is a component that shows several lines of code, such as an example or a set of instructions, on its own dark surface. It keeps the code’s line breaks and indentation, and long lines scroll sideways rather than breaking in the middle of a word.',
  sections: [
    { key: 'example', intro: ['`CodeBlock` renders the code you pass as its children in a monospace font, on a dark surface in every theme. A toolbar in a strip above the code holds a wrap toggle, which wraps long lines so they can be read without scrolling sideways, and a copy button, which copies the code to the clipboard.', '`language` colours the code’s keywords, strings, comments and other parts, using the syntax colour roles each theme sets. The languages are `bash`, `css`, `html`, `javascript`, `json`, `jsx`, `tsx` and `typescript`. Inside Wireframe, the block stays dark but the code is monochrome.', '[Shiki](https://shiki.style/) is the open-source syntax highlighter used by Mezzanine, which loads only when a page contains a highlighted Code block.', '`title` adds a heading to the strip, such as a file name. It also names the code for screen readers.', '`showLineNumbers` numbers each line, and is on by default. `startLine` sets the first number, for an excerpt from further down a file.', '`highlightedLines`, `addedLines` and `removedLines` mark lines by their number. Added lines show +, and removed lines show −, so the meaning doesn’t rely on colour.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Code block anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'CodeBlock', description: 'Renders the code block surface: a strip with the optional title and a toolbar, above a `pre` element holding the code. It sets `data-theme="dark"` on itself, so it is dark in every theme. Long lines scroll sideways unless wrapped, and line breaks and indentation are kept.' },
          { name: 'code', description: 'Added by `CodeBlock` inside the `pre`, so the content is marked up as code. With line numbers or marked lines, each line is a row. With `language`, each kind of code is a span coloured by its syntax role.' },
          { name: 'Toolbar', description: 'Added by `CodeBlock` at the end of the strip, named “Code tools”. It holds the wrap toggle and the copy button.' },
          { name: 'ToggleButton', description: 'Added by `CodeBlock` in the toolbar. An icon button labelled “Wrap lines” that wraps long lines while it’s on. Lines start unwrapped.' },
          { name: 'Button', description: 'Added by `CodeBlock` in the toolbar, after the wrap toggle. An icon button labelled “Copy code” that copies the code as written, without line numbers or markers.' },
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
        'The toolbar is one Tab stop, and the arrow keys move between the wrap toggle and the copy button. The wrap toggle’s label, “Wrap lines”, shows in a tooltip and is its accessible name, and screen readers hear whether it’s on.',
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
    { label: 'Shiki: syntax highlighter', href: 'https://shiki.style/' },
  ],
}

// The code shown in the live example.
export const codeBlockExampleCode = `.example {
  color: var(--color-text);
  padding: var(--space-4);
}`

// The Example's title and first line number, and the code it shows once lines are added or removed.
export const codeBlockFeatureExamples = {
  title: 'example.css',
  lineNumbersStart: 12,
  markedCode: `.example {
  color: var(--color-text);
  padding: var(--space-2);
  padding: var(--space-4);
}`,
} as const

// The Properties panel's choices, in panel order. startLine appears with showLineNumbers. Adding or
// removing a line shows the longer sample, which has a line to mark each way.
export const codeBlockLanguages = ['bash', 'css', 'html', 'javascript', 'json', 'jsx', 'tsx', 'typescript'] as const
export const codeBlockStartLines = ['1', '12'] as const
export const codeBlockFlags = ['title', 'showLineNumbers', 'highlightedLines', 'addedLines', 'removedLines'] as const

// Marks count from the first line number shown, so they follow startLine and stay on the same lines.
export function codeBlockExample(flags: Record<(typeof codeBlockFlags)[number], boolean>, startLine = 1) {
  const isMarked = flags.addedLines || flags.removedLines
  const line = (index: number) => [index + startLine - 1]
  return {
    code: isMarked ? codeBlockFeatureExamples.markedCode : codeBlockExampleCode,
    highlightedLines: flags.highlightedLines ? line(1) : undefined,
    removedLines: flags.removedLines ? line(3) : undefined,
    addedLines: flags.addedLines ? line(4) : undefined,
  }
}

export function codeBlockExampleCodeView({ language, startLine, flags }: { language: string | null, startLine: number, flags: Record<(typeof codeBlockFlags)[number], boolean> }) {
  const { code, ...lines } = codeBlockExample(flags, flags.showLineNumbers ? startLine : 1)
  // Line numbers are on by default, so only turning them off is written out.
  const props = [
    formatJsxProps({ language: language ?? undefined, title: flags.title ? codeBlockFeatureExamples.title : undefined }),
    flags.showLineNumbers ? '' : ' showLineNumbers={false}',
    formatJsxProps({ startLine: flags.showLineNumbers && startLine !== 1 ? startLine : undefined, ...lines }),
  ].join('')
  return `<CodeBlock${props}>{\`${code}\`}</CodeBlock>`
}
