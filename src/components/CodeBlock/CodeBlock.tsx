import { useRef, useState, type ComponentPropsWithoutRef } from 'react'
import { VisuallyHidden } from 'react-aria-components/VisuallyHidden'
import { CheckIcon, CopyIcon } from '../../icons/Icons'
import { Button } from '../Button/Button'

export type CodeBlockProps = ComponentPropsWithoutRef<'pre'>

// How long the button shows "Copied" before it offers to copy again.
const copiedDuration = 2000

// A static block of code: a pre element with the code inside a code element. The app supplies the code as text.
// A copy button sits at the top end and copies the code's text to the clipboard.
export function CodeBlock({ className, children, ...preProps }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null)
  const [isCopied, setIsCopied] = useState(false)

  // If the browser refuses clipboard access, the button stays as it was.
  function copyCode() {
    navigator.clipboard.writeText(codeRef.current?.textContent ?? '').then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), copiedDuration)
    }, () => {})
  }

  return (
    <pre {...preProps} className={['mz-code-block', className].filter(Boolean).join(' ')}>
      <Button
        className="mz-code-block-copy"
        iconLeading={isCopied ? <CheckIcon /> : <CopyIcon />}
        labelPlacement="tooltip"
        size="sm"
        hierarchy="tertiary"
        onPress={copyCode}
      >
        {isCopied ? 'Copied' : 'Copy code'}
      </Button>
      <code ref={codeRef}>{children}</code>
      <VisuallyHidden elementType="span" role="status">{isCopied ? 'Copied' : ''}</VisuallyHidden>
    </pre>
  )
}
