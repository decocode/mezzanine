import type { CSSProperties, ReactNode } from 'react'

// Lab-only layout building blocks, following Bedrock Layouts and Every Layout. Each limit is
// passed as a CSS custom property so it could be a token. Illustrative and unapproved.

type Children = { children: ReactNode }
const vars = (values: Record<string, string | undefined>) => Object.fromEntries(Object.entries(values).filter(([, value]) => value)) as CSSProperties

// Stack: even vertical space between items, set by the parent.
export function Stack({ children, space }: Children & { space?: string }) {
  return <div className="lab-stack" style={vars({ '--lab-stack-space': space })}>{children}</div>
}

// Inline: items in one row; with switchAt, a column whenever the row is narrower than that width.
export function Inline({ children, space, switchAt }: Children & { space?: string; switchAt?: string }) {
  return <div className={`lab-inline${switchAt ? ' lab-inline-switch' : ''}`} style={vars({ '--lab-inline-space': space, '--lab-switch-at': switchAt })}>{children}</div>
}

// Inline cluster: items that wrap like words in a sentence.
export function InlineCluster({ children, space }: Children & { space?: string }) {
  return <div className="lab-inline-cluster" style={vars({ '--lab-inline-cluster-space': space })}>{children}</div>
}

// How Split shares the row between its two areas: the first area's share, then the second's.
export const splitFractions = {
  '1/4': ['1', '3'],
  '1/3': ['1', '2'],
  '1/2': ['1', '1'],
  '2/3': ['2', '1'],
  '3/4': ['3', '1'],
} as const

export type SplitFraction = keyof typeof splitFractions

// Split: two areas side by side, sharing the row by a fraction; with switchAt, a column below that width.
export function Split({ children, fraction = '1/2', switchAt }: Children & { fraction?: SplitFraction; switchAt?: string }) {
  const [start, end] = splitFractions[fraction]
  return <div className={`lab-split${switchAt ? ' lab-split-switch' : ''}`} style={vars({ '--lab-split-start': start, '--lab-split-end': end, '--lab-switch-at': switchAt })}>{children}</div>
}

// Columns: a fixed number of equal columns.
export function Columns({ children, columns }: Children & { columns?: number }) {
  return <div className="lab-columns" style={vars({ '--lab-columns': columns?.toString() })}>{children}</div>
}

// An item in Columns that spans more than one column.
export function ColumnsItem({ children, span }: Children & { span?: number }) {
  return <div className="lab-columns-item" style={vars({ '--lab-span': span?.toString() })}>{children}</div>
}

// Grid: as many columns as fit, none narrower than the minimum.
export function Grid({ children, min }: Children & { min?: string }) {
  return <div className="lab-grid" style={vars({ '--lab-grid-min': min })}>{children}</div>
}

// Center: caps the width of content and centres it.
export function Center({ children, max }: Children & { max?: string }) {
  return <div className="lab-center" style={vars({ '--lab-center-max': max })}>{children}</div>
}

// Frame: a fixed shape, such as "16 / 9", that crops the picture inside it.
export function Frame({ children, ratio }: Children & { ratio?: string }) {
  return <div className="lab-media-frame" style={vars({ '--lab-frame-ratio': ratio })}>{children}</div>
}

// Cover: a tall area with one item in the middle and optional items at the top and bottom.
export function Cover({ children, top, bottom, minHeight }: Children & { top?: ReactNode; bottom?: ReactNode; minHeight?: string }) {
  return <div className="lab-cover" style={vars({ '--lab-cover-min': minHeight })}>
    {top}
    <div className="lab-cover-centre">{children}</div>
    {bottom}
  </div>
}

// Reel: a row that scrolls sideways. It is a named region that takes focus, so keyboard users can scroll it.
export function Reel({ children, label, itemWidth }: Children & { label: string; itemWidth?: string }) {
  return <div className="lab-reel" role="region" aria-label={label} tabIndex={0} style={vars({ '--lab-reel-item': itemWidth })}>{children}</div>
}

// A plain coloured block for showing layout without real content.
export function Block({ children, tall }: { children: ReactNode; tall?: boolean }) {
  return <div className={`lab-block mz-text-body-sm${tall ? ' lab-block-tall' : ''}`}>{children}</div>
}
