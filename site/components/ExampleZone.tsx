import type { ReactNode } from 'react'

interface ExampleZoneProps {
  children: ReactNode
  controls?: ReactNode
  className?: string
}

// Documentation-only frame; the children render real Mezzanine components.
export function ExampleZone({ children, controls, className }: ExampleZoneProps) {
  return (
    <div className={['component-example', className].filter(Boolean).join(' ')}>
      {controls != null && <fieldset className="example-zone-controls">
        <legend>Example controls</legend>
        <div className="example-zone-controls-content">{controls}</div>
      </fieldset>}
      {children}
    </div>
  )
}
