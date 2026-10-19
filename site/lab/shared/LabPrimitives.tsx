import type { CSSProperties, ReactNode } from 'react'

// Lab-only layout components, following Bedrock Layouts and Every Layout. Each limit is
// passed as a CSS custom property so it could be a token. Illustrative and unapproved.

type Children = { children: ReactNode }
const vars = (values: Record<string, string | undefined>) => Object.fromEntries(Object.entries(values).filter(([, value]) => value)) as CSSProperties

// Column: boxes one below another, with even space between them set by the parent.
export function Column({ children, space }: Children & { space?: string }) {
  return <div className="lab-column" style={vars({ '--lab-column-space': space })}>{children}</div>
}

// Row: items in one row; with switchAt, one below another whenever the row is narrower than that width.
export function Row({ children, space, switchAt }: Children & { space?: string; switchAt?: string }) {
  return <div className={`lab-row${switchAt ? ' lab-row-switch' : ''}`} style={vars({ '--lab-row-space': space, '--lab-switch-at': switchAt })}>{children}</div>
}

// Row wrap: items that wrap like words in a sentence.
export function RowWrap({ children, space }: Children & { space?: string }) {
  return <div className="lab-row-wrap" style={vars({ '--lab-row-wrap-space': space })}>{children}</div>
}

// FixedColumnGrid: a grid with a set number of equal columns.
export function FixedColumnGrid({ children, columns }: Children & { columns?: number }) {
  return <div className="lab-fixed-column-grid" style={vars({ '--lab-fixed-columns': columns?.toString() })}>{children}</div>
}

// An item in FixedColumnGrid that spans more than one column.
export function FixedColumnGridItem({ children, span }: Children & { span?: number }) {
  return <div className="lab-fixed-column-grid-item" style={vars({ '--lab-span': span?.toString() })}>{children}</div>
}

// AutoFillGrid: a grid with as many columns as fit, none narrower than the minimum.
export function AutoFillGrid({ children, min }: Children & { min?: string }) {
  return <div className="lab-auto-fill-grid" style={vars({ '--lab-auto-fill-min': min })}>{children}</div>
}

// Row wrap grow: a row that wraps, where the boxes on each new row grow to fill it.
export function RowWrapGrow({ children, min }: Children & { min?: string }) {
  return <div className="lab-row-wrap-grow" style={vars({ '--lab-row-wrap-grow-min': min })}>{children}</div>
}

// Center: caps the width of content and centres it.
export function Center({ children, max }: Children & { max?: string }) {
  return <div className="lab-center" style={vars({ '--lab-center-max': max })}>{children}</div>
}

// AspectRatio: a fixed shape, such as "16 / 9", that crops the picture inside it.
export function AspectRatio({ children, ratio }: Children & { ratio?: string }) {
  return <div className="lab-aspect-ratio" style={vars({ '--lab-aspect-ratio': ratio })}>{children}</div>
}

// Reel: a row that scrolls sideways. It is a named region that takes focus, so keyboard users can scroll it.
export function Reel({ children, label, itemWidth }: Children & { label: string; itemWidth?: string }) {
  return <div className="lab-reel" role="region" aria-label={label} tabIndex={0} style={vars({ '--lab-reel-item': itemWidth })}>{children}</div>
}

// A plain coloured block for showing layout without real content.
export function Block({ children, tall }: { children: ReactNode; tall?: boolean }) {
  return <div className={`lab-block mz-text-body-sm${tall ? ' lab-block-tall' : ''}`}>{children}</div>
}
