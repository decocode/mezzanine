import { Suspense, use, useId, useRef, useState, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { mergeProps } from 'react-aria/mergeProps'
import { useFocusRing } from 'react-aria/useFocusRing'
import { VisuallyHidden } from 'react-aria-components/VisuallyHidden'
import { CheckIcon, CopyIcon } from '../../icons/Icons'
import { Button } from '../Button/Button'
import { highlightCode, type CodeBlockLanguage, type SyntaxToken } from './codeBlockHighlight'
import { codeLines, type CodeLine, type LineMark } from './codeBlockLines'

export interface CodeBlockProps extends Omit<ComponentPropsWithoutRef<'pre'>, 'title'> {
  // A visible heading in the strip above the code, such as a file name or "Terminal". It also names the
  // code for screen readers.
  title?: ReactNode
  // Colours the code's keywords, strings, comments and so on. Shiki, which does the highlighting, and
  // the language's rules load only when a page first shows code in that language.
  language?: CodeBlockLanguage
  // Shows a number beside each line, starting from startLine. Numbers are hidden from screen readers.
  showLineNumbers?: boolean
  startLine?: number
  // Line numbers, counted from startLine, to mark. Added and removed lines also show + and −, so the
  // meaning doesn't rely on colour.
  highlightedLines?: readonly number[]
  addedLines?: readonly number[]
  removedLines?: readonly number[]
}

// How long the button shows "Copied" before it offers to copy again.
const copiedDuration = 2000

// What screen readers hear before a marked line, since the + and − are hidden from them.
const markWords: Record<LineMark, string> = { highlighted: 'Highlighted: ', added: 'Added: ', removed: 'Removed: ' }
const markSymbols: Partial<Record<LineMark, string>> = { added: '+', removed: '−' }

interface CodeContentProps {
  lines: CodeLine[]
  tokens?: SyntaxToken[][]
  hasLineParts: boolean
  showLineNumbers: boolean
}

// One line's text: coloured tokens when the code is highlighted, plain text otherwise.
function LineText({ line, tokens }: { line: CodeLine; tokens?: SyntaxToken[] }) {
  return tokens
    ? tokens.map((token, index) => token.kind
      ? <span key={index} data-syntax={token.kind}>{token.text}</span>
      : token.text)
    : line.text
}

// The code, as a row per line when it has line numbers or marked lines, or as text with line breaks.
function CodeContent({ lines, tokens, hasLineParts, showLineNumbers }: CodeContentProps) {
  if (!hasLineParts) {
    return lines.map((line, index) => <span key={line.number}>
      <LineText line={line} tokens={tokens?.[index]} />{index < lines.length - 1 && '\n'}
    </span>)
  }
  return lines.map((line, index) => (
    <span key={line.number} className="mz-code-block-line" data-mark={line.mark}>
      {showLineNumbers && <span className="mz-code-block-line-number" aria-hidden="true">{line.number}</span>}
      <span className="mz-code-block-marker" aria-hidden="true">{line.mark && markSymbols[line.mark]}</span>
      <span className="mz-code-block-line-text">
        {line.mark && <VisuallyHidden>{markWords[line.mark]}</VisuallyHidden>}
        <LineText line={line} tokens={tokens?.[index]} />
        {'\n'}
      </span>
    </span>
  ))
}

// Reads the highlighted tokens; until they're ready, Suspense shows the plain code instead.
function HighlightedContent({ code, language, ...props }: Omit<CodeContentProps, 'tokens'> & { code: string; language: CodeBlockLanguage }) {
  return <CodeContent {...props} tokens={use(highlightCode(code, language))} />
}

// A static block of code, always on a dark surface: the block applies the Dark theme to itself, so its
// text, syntax colours, copy button and focus ring all use Dark's roles, in every theme. Inside Wireframe it
// stays monochrome. A strip above the code holds an optional title and a copy button, so the code never
// wraps around the button. Long lines scroll sideways rather than breaking mid-word, so the code area can
// take keyboard focus. Code always reads left to right, even on a right-to-left page. The app supplies the
// code as text; highlighting, line numbers and marked lines need it as a single string.
export function CodeBlock({
  className, children, title, language, showLineNumbers = false, startLine = 1, highlightedLines, addedLines, removedLines, ...preProps
}: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null)
  const titleId = useId()
  const [isCopied, setIsCopied] = useState(false)
  const { focusProps, isFocusVisible } = useFocusRing()
  const code = typeof children === 'string' ? children : undefined
  const lines = code === undefined ? undefined : codeLines(code, { startLine, highlightedLines, addedLines, removedLines })
  const hasLineParts = lines !== undefined && (showLineNumbers || lines.some(line => line.mark !== undefined))
  const contentProps = { lines: lines ?? [], hasLineParts, showLineNumbers }

  // Copies the code as written, without line numbers or markers. If the browser refuses clipboard
  // access, the button stays as it was.
  function copyCode() {
    const text = code ?? codeRef.current?.textContent ?? ''
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), copiedDuration)
    }, () => {})
  }

  return (
    <div className={['mz-code-block', className].filter(Boolean).join(' ')} data-theme="dark">
      <div className="mz-code-block-header">
        {title != null && <span id={titleId} className="mz-code-block-title">{title}</span>}
        <Button
          className="mz-code-block-copy"
          icon={isCopied ? <CheckIcon /> : <CopyIcon />}
          iconPosition="only"
          size="sm"
          hierarchy="tertiary"
          onPress={copyCode}
        >
          {isCopied ? 'Copied' : 'Copy code'}
        </Button>
      </div>
      <pre
        tabIndex={0}
        role="region"
        {...(title != null ? { 'aria-labelledby': titleId } : { 'aria-label': 'Code' })}
        {...mergeProps(preProps, focusProps)}
        dir="ltr"
        className="mz-code-block-content"
        data-focus-visible={isFocusVisible || undefined}
        data-line-numbers={showLineNumbers || undefined}
      >
        <code ref={codeRef} data-lines={hasLineParts || undefined}>
          {code === undefined
            ? children
            : language
              ? <Suspense fallback={<CodeContent {...contentProps} />}>
                <HighlightedContent {...contentProps} code={code} language={language} />
              </Suspense>
              : <CodeContent {...contentProps} />}
        </code>
      </pre>
      <VisuallyHidden elementType="span" role="status">{isCopied ? 'Copied' : ''}</VisuallyHidden>
    </div>
  )
}
