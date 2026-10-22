import type { DialogProps } from 'react-aria-components/Dialog'
import {
  Sheet as ReactAriaSheet,
  SheetBackdrop,
  SheetContent,
  SheetOverlay,
  type SheetOverlayProps,
  type SheetProps as ReactAriaSheetProps,
} from 'react-aria-components/Sheet'

export interface SheetProps extends Omit<SheetOverlayProps, 'children'>, Pick<ReactAriaSheetProps, 'swipeAnimation' | 'swipeAnimationRange'> {
  // The sheet's content, shown inside a Dialog.
  children?: DialogProps['children']
  // Whether the sheet seems to carry on past the edge of the screen when pulled further. Defaults to true.
  overscrollPadding?: boolean
}

// A panel that slides in from an edge and can be swiped away. Mezzanine draws the backdrop, the panel,
// its drag handle and the scrolling content, following React Aria's vanilla starter.
export function Sheet({ children, swipeAnimation, swipeAnimationRange, overscrollPadding = true, style, ...props }: SheetProps) {
  const { snapPoints, preventDismissal } = props
  return (
    <SheetOverlay {...props}>
      {/* The backdrop fades in as the sheet comes in; with snap points it waits until the last one. */}
      <SheetBackdrop swipeAnimation="mz-sheet-backdrop" swipeAnimationRange={snapPoints ? { start: snapPoints.length - 1 } : undefined} />
      <ReactAriaSheet overscrollPadding={overscrollPadding} swipeAnimation={swipeAnimation} swipeAnimationRange={swipeAnimationRange} style={style}>
        {!preventDismissal && <div className="mz-sheet-handle" aria-hidden="true" />}
        <SheetContent>{children}</SheetContent>
      </ReactAriaSheet>
    </SheetOverlay>
  )
}

export { SheetBackdrop, SheetContent, SheetOverlay, SheetTrigger } from 'react-aria-components/Sheet'

export type {
  SheetBackdropProps,
  SheetContentProps,
  SheetOverlayProps,
  SheetRenderProps,
  SheetTriggerProps,
} from 'react-aria-components/Sheet'
