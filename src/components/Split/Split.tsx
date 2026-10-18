import type { CSSProperties, HTMLAttributes, Ref } from 'react'

export interface SplitProps extends HTMLAttributes<HTMLDivElement> {
  // How the row is shared: the first area's fraction, or auto, where one area keeps the width it needs and the other fills the rest.
  fraction?: '1/4' | '1/3' | '1/2' | '2/3' | '3/4' | 'auto-start' | 'auto-end'
  // The narrowest each sharing area may be before the areas stack. Any CSS length; defaults to --split-min-area-width.
  minAreaWidth?: string
  // A step on the spacing scale; defaults to --split-gap.
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24
  ref?: Ref<HTMLDivElement>
}

// Two areas side by side that stack when they can't both have their minimum width. Layout only: it
// follows its container, not the screen, and adds no behaviour.
export function Split({ fraction = '1/2', minAreaWidth, gap, className, style, ...divProps }: SplitProps) {
  const layout = {
    ...(gap === undefined ? {} : { '--_split-gap': `var(--space-${gap})` }),
    ...(minAreaWidth === undefined ? {} : { '--_split-min-area-width': minAreaWidth }),
  } as CSSProperties
  return (
    <div
      {...divProps}
      className={['mezzanine-split', className].filter(Boolean).join(' ')}
      data-fraction={fraction}
      style={{ ...layout, ...style }}
    />
  )
}
