import type { CSSProperties, ReactNode } from 'react'

// Lab-only intrinsic layout primitives, after Every Layout. Each limit is passed as a
// CSS custom property so it could be a token. Illustrative and unapproved.

type Children = { children: ReactNode }
const vars = (values: Record<string, string | undefined>) => Object.fromEntries(Object.entries(values).filter(([, value]) => value)) as CSSProperties

// Stack: even vertical space between items, set by the parent.
export function Stack({ children, space }: Children & { space?: string }) {
  return <div className="lab-stack" style={vars({ '--lab-stack-space': space })}>{children}</div>
}

// Cluster: items that wrap like words in a sentence.
export function Cluster({ children, space }: Children & { space?: string }) {
  return <div className="lab-cluster" style={vars({ '--lab-cluster-space': space })}>{children}</div>
}

// Switcher: a row that becomes a column when the container is narrower than the threshold.
export function Switcher({ children, threshold }: Children & { threshold?: string }) {
  return <div className="lab-switcher" style={vars({ '--lab-switcher-threshold': threshold })}>{children}</div>
}

// Grid: as many columns as fit, none narrower than the minimum.
export function AutoGrid({ children, min }: Children & { min?: string }) {
  return <div className="lab-auto-grid" style={vars({ '--lab-grid-min': min })}>{children}</div>
}

// Sidebar: a side column beside the main content, stacking when the main content would get too narrow.
export function SidebarLayout({ side, children, sideWidth, contentMin }: Children & { side: ReactNode; sideWidth?: string; contentMin?: string }) {
  return <div className="lab-sidebar-layout" style={vars({ '--lab-sidebar-width': sideWidth, '--lab-sidebar-content-min': contentMin })}>
    <div className="lab-sidebar-side">{side}</div>
    <div className="lab-sidebar-main">{children}</div>
  </div>
}

// Center: caps the width of content and centres it.
export function Center({ children, max }: Children & { max?: string }) {
  return <div className="lab-center" style={vars({ '--lab-center-max': max })}>{children}</div>
}

// A plain coloured block for showing layout without real content.
export function Block({ children, tall }: { children: ReactNode; tall?: boolean }) {
  return <div className={`lab-block mz-text-body-sm${tall ? ' lab-block-tall' : ''}`}>{children}</div>
}
