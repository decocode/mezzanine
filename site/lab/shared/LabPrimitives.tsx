import type { CSSProperties, ReactNode } from 'react'

// Lab-only layout components, following Bedrock Layouts and Every Layout. Each limit is
// passed as a CSS custom property so it could be a token. Illustrative and unapproved.

type Children = { children: ReactNode }
const vars = (values: Record<string, string | undefined>) => Object.fromEntries(Object.entries(values).filter(([, value]) => value)) as CSSProperties

// Stack: items one below another, with even space between them set by the parent.
export function Stack({ children, space }: Children & { space?: string }) {
  return <div className="lab-stack" style={vars({ '--lab-stack-space': space })}>{children}</div>
}

// Center: caps the width of content and centres it.
export function Center({ children, max }: Children & { max?: string }) {
  return <div className="lab-center" style={vars({ '--lab-center-max': max })}>{children}</div>
}
