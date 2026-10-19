import type { CSSProperties, HTMLAttributes, Ref } from 'react'

export interface RatioPairProps extends HTMLAttributes<HTMLDivElement> {
  // How the row is shared: the first area's fraction, or auto, where one area keeps the width it needs and the other fills the rest.
  fraction?: '1/4' | '1/3' | '1/2' | '2/3' | '3/4' | 'auto-start' | 'auto-end'
  // The narrowest each sharing area may be before the areas stack. Any CSS length; defaults to --ratio-pair-min-area-width.
  minAreaWidth?: string
  // A step on the spacing scale; defaults to --ratio-pair-gap.
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24
  ref?: Ref<HTMLDivElement>
}

// Two areas side by side that stack when they can't both have their minimum width. Layout only: it
// follows its container, not the screen, and adds no behaviour.
export function RatioPair({ fraction = '1/2', minAreaWidth, gap, className, style, ...divProps }: RatioPairProps) {
  const layout = {
    ...(gap === undefined ? {} : { '--_ratio-pair-gap': `var(--space-${gap})` }),
    ...(minAreaWidth === undefined ? {} : { '--_ratio-pair-min-area-width': minAreaWidth }),
  } as CSSProperties
  return (
    <div
      {...divProps}
      className={['mz-ratio-pair', className].filter(Boolean).join(' ')}
      data-fraction={fraction}
      style={{ ...layout, ...style }}
    />
  )
}
