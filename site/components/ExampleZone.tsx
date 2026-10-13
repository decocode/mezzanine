import type { ReactNode } from 'react'

interface ExampleZoneProps {
  children: ReactNode
  className?: string
}

// Documentation-only frame; the children render real Mezzanine components.
export function ExampleZone({ children, className }: ExampleZoneProps) {
  return (
    <div className={['component-example', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}
