import type { ComponentPropsWithoutRef } from 'react'

export type CodeBlockProps = ComponentPropsWithoutRef<'pre'>

// A static block of code: a pre element with the code inside a code element. The app supplies the code as text.
export function CodeBlock({ className, children, ...preProps }: CodeBlockProps) {
  return <pre {...preProps} className={['mezzanine-code-block', className].filter(Boolean).join(' ')}><code>{children}</code></pre>
}
