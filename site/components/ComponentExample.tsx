import type { ReactNode } from 'react'

interface ComponentExampleProps {
  children: ReactNode
  className?: string
}

// Documentation-only frame; the children render real Mezzanine components.
export function ComponentExample({ children, className }: ComponentExampleProps) {
  return (
    <div className={['component-example', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}
