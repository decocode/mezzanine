import { useCallback, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent, type ReactNode, type RefObject } from 'react'
import { Focusable, useLocale } from 'react-aria-components'
import { mergeProps } from 'react-aria/mergeProps'
import { useFocusRing } from 'react-aria/useFocusRing'
import { useHover } from 'react-aria/useHover'
import { useMove } from 'react-aria/useMove'
import { Button, type ButtonProps } from '../Button/Button'
// The drawer has its own look, so it uses React Aria's Dialog and Modal without Mezzanine's classes.
import { Dialog } from 'react-aria-components/Dialog'
import { Modal, ModalOverlay } from 'react-aria-components/Modal'
import { Heading } from '../Heading/Heading'
import { Tooltip, TooltipTrigger } from '../Tooltip/Tooltip'
import { CloseIcon } from '../../icons/Icons'
import { tokenInPixels, useAppShell } from '../AppShell/AppShell'
import type { PanelEdge } from '../AppShell/panelStore'

interface PanelBaseProps {
  // Names the Panel for PanelTrigger's `panel` prop.
  id: string
  edge: PanelEdge
  headingLevel?: 2 | 3 | 4 | 5 | 6
  // Shown in place of nothing when the Panel isn't open: the same content, condensed.
  minimized?: ReactNode
  // The close button's label, shown in its tooltip. Defaults to "Close" and the title.
  closeLabel?: string
  // Whether the Panel can be closed, with its own close button and a PanelTrigger elsewhere. When
  // false it stays open, has no close button, and is hidden when there's no room beside the content,
  // so the app offers the same content another way, such as in a TopBar menu.
  isCollapsible?: boolean
  // Whether people can change a side Panel's width, between --panel-min-width and --panel-max-width:
  // by dragging its inner edge, clicking it to step through the widths, or with the arrow keys. A double
  // click restores its width.
  isResizable?: boolean
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  children: ReactNode
  className?: string
}

// A Panel is named either by a visible heading, `title`, or, when the app already shows what it is
// (such as a navigation Panel under a TopBar), by `aria-label` alone, with no heading.
export type PanelProps = PanelBaseProps & (
  | { title: string; 'aria-label'?: never }
  | { title?: never; 'aria-label': string }
)

// An area at the start, end or bottom of an AppShell that shares the space with the main content.
// When there's no room beside the content, a side Panel opens as a drawer instead.
export function Panel({
  id, edge, title, 'aria-label': label, headingLevel = 2, minimized, closeLabel, isCollapsible = true, isResizable = false,
  isOpen: controlledOpen, defaultOpen = false, onOpenChange, children, className,
}: PanelProps) {
  const name = title ?? label
  const { store, presentation } = useAppShell('Panel')
  useSyncExternalStore(store.subscribe, store.getVersion, store.getVersion)
  const elementId = useId()
  const headingId = useId()
  const isDrawer = presentation(edge) === 'drawer'
  const isOpen = (isCollapsible ? controlledOpen ?? store.isOpen(id) : true) && (!isDrawer || store.isShownOpen(id, true))
  const classes = ['mz-panel', className].filter(Boolean).join(' ')
  const panelRef = useRef<HTMLElement | null>(null)

  // Register from a ref callback, so triggers can find this Panel without an effect.
  const register = useCallback((element: HTMLElement | null) => {
    panelRef.current = element
    if (!element) return
    return store.register(id, { edge, elementId, isOpen: isCollapsible ? controlledOpen : true, defaultOpen, hasMinimized: minimized != null, isCollapsible, onOpenChange })
  }, [store, id, edge, elementId, isCollapsible, controlledOpen, defaultOpen, minimized, onOpenChange])

  function close() {
    // Closing from inside a shared-space Panel hides the focused button, so return focus to the trigger.
    if (!isDrawer) store.trigger(id)?.focus()
    store.setOpen(id, false, isDrawer)
  }

  const contents = <>
    {(title != null || isCollapsible) && <div className="mz-panel-header">
      {title != null && <Heading id={headingId} level={headingLevel} slot={isDrawer ? 'title' : undefined}>{title}</Heading>}
      {isCollapsible && <Button icon={<CloseIcon />} iconPosition="iconOnly" size="sm" hierarchy="tertiary" onPress={close}>{closeLabel ?? `Close ${name}`}</Button>}
    </div>}
    <div className="mz-panel-content">{children}</div>
  </>

  const isShown = isOpen && !isDrawer
  return <>
    <aside
      ref={register}
      id={isDrawer ? undefined : elementId}
      className={classes}
      data-edge={edge}
      data-state={isShown ? 'open' : minimized != null ? 'minimized' : 'closed'}
      aria-labelledby={isShown && title != null ? headingId : undefined}
      aria-label={isShown && title != null ? undefined : name}
      inert={!isShown && minimized == null}
    >
      {isShown ? contents : minimized != null && <div className="mz-panel-minimized">{minimized}</div>}
    </aside>
    {isShown && isResizable && edge !== 'bottom' && <PanelResizeHandle id={id} edge={edge} name={name} controls={elementId} panelRef={panelRef} />}
    {isDrawer && isCollapsible && <ModalOverlay isOpen={isOpen} onOpenChange={(open) => store.setOpen(id, open, true)} isDismissable className="mz-panel-overlay" data-edge={edge}>
      <Modal className={classes} data-edge={edge}>
        <Dialog id={elementId} className="mz-panel-dialog" aria-label={title == null ? name : undefined}>{contents}</Dialog>
      </Modal>
    </ModalOverlay>}
  </>
}

// How far, in pixels, a press has to move before it counts as a drag rather than a click.
const dragThreshold = 4

interface PanelResizeHandleProps {
  id: string
  edge: 'start' | 'end'
  name: string
  // The Panel element's id, which the handle controls.
  controls: string
  panelRef: RefObject<HTMLElement | null>
}

// A side Panel's resize handle, following the window splitter pattern: a focusable separator that
// pointer, touch and arrow keys move with React Aria's useMove, and Home and End take to the limits.
// A click without dragging steps to the next width, so people who can't drag can still resize it, and
// a double click restores the token width (its two clicks step first, then the reset wins).
function PanelResizeHandle({ id, edge, name, controls, panelRef }: PanelResizeHandleProps) {
  const { store, maxPanelSize } = useAppShell('Panel')
  const { direction } = useLocale()
  const [isMoving, setMoving] = useState(false)
  const dragStart = useRef({ size: 0, distance: 0 })
  // Whether the pointer moved past the threshold since it went down, so the click that ends a drag
  // doesn't also step. Cleared on every press, in case a drag ended away from the handle.
  const hasDragged = useRef(false)
  // Dragging toward the main content widens the Panel; which way that is depends on the edge and the reading direction.
  const widening = (edge === 'start') === (direction === 'ltr') ? 1 : -1

  // The Panel's limits, read from its tokens, and never so wide that the main content drops below its minimum.
  const limits = () => {
    const panel = panelRef.current
    const min = tokenInPixels(panel, '--panel-min-width')
    const max = Math.max(min, Math.min(tokenInPixels(panel, '--panel-max-width'), maxPanelSize(edge)))
    const size = store.size(id) ?? tokenInPixels(panel, edge === 'start' ? '--panel-start-width' : '--panel-end-width')
    const base = tokenInPixels(panel, edge === 'start' ? '--panel-start-width' : '--panel-end-width')
    return { min, max, size, base, step: tokenInPixels(panel, '--space-4') }
  }
  const resize = (size: number) => {
    const { min, max } = limits()
    store.setSize(id, Math.min(max, Math.max(min, size)))
  }

  const { moveProps } = useMove({
    onMoveStart() {
      dragStart.current = { size: limits().size, distance: 0 }
    },
    onMove({ deltaX, pointerType }) {
      if (pointerType === 'keyboard') {
        const { size, step } = limits()
        resize(size + Math.sign(deltaX) * step * widening)
        return
      }
      dragStart.current.distance += deltaX
      // A press that wobbles a little is still a click; it becomes a drag once it moves further.
      if (!hasDragged.current && Math.abs(dragStart.current.distance) < dragThreshold) return
      if (!hasDragged.current) {
        hasDragged.current = true
        setMoving(true)
        store.setResizing(true)
      }
      resize(dragStart.current.size + dragStart.current.distance * widening)
    },
    onMoveEnd() {
      if (!isMoving && !store.isResizing) return
      setMoving(false)
      store.setResizing(false)
    },
  })
  const { hoverProps, isHovered } = useHover({})
  const { focusProps, isFocusVisible } = useFocusRing()

  // Each click steps through the narrowest, the token width and the widest, then back to the narrowest.
  function onClick() {
    if (hasDragged.current) return
    const { min, max, size, base } = limits()
    const next = [min, base, max].find((width) => width > size + 1)
    resize(next ?? min)
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Home' && event.key !== 'End') return
    event.preventDefault()
    const { min, max } = limits()
    resize(event.key === 'Home' ? min : max)
  }

  const { min, max, size } = limits()
  return (
    <TooltipTrigger>
      <Focusable>
        <div
          {...mergeProps(moveProps, hoverProps, focusProps, { onKeyDown, onClick, onPointerDown: () => { hasDragged.current = false }, onDoubleClick: () => store.setSize(id, undefined) })}
          className="mz-panel-resize-handle"
          data-edge={edge}
          role="separator"
          aria-orientation="vertical"
          aria-label={`Resize ${name}`}
          aria-controls={controls}
          aria-valuenow={Math.round(size)}
          aria-valuemin={Math.round(min)}
          aria-valuemax={Math.round(max)}
          tabIndex={0}
          data-hovered={isHovered || undefined}
          data-moving={isMoving || undefined}
          data-focus-visible={isFocusVisible || undefined}
        />
      </Focusable>
      <Tooltip placement={edge === 'start' ? 'end' : 'start'}>Resize</Tooltip>
    </TooltipTrigger>
  )
}

// Omit each member of a union on its own, so Button's tooltip-label rule survives.
type OmitFromEach<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type PanelTriggerProps = OmitFromEach<Extract<ButtonProps, { href?: never }>, 'ref' | 'aria-controls' | 'aria-expanded'> & {
  // The id of the Panel this button opens and closes.
  panel: string
}

// A Mezzanine Button that opens and closes a Panel, placed wherever suits the app: in a TopBar, a Rail
// or a toolbar. It reports whether the Panel is expanded and which element it controls.
export function PanelTrigger({ panel, onPress, ...props }: PanelTriggerProps) {
  const { store, presentation } = useAppShell('PanelTrigger')
  useSyncExternalStore(store.subscribe, store.getVersion, store.getVersion)
  const entry = store.entry(panel)
  const isDrawer = entry != null && presentation(entry.edge) === 'drawer'
  const isOpen = store.isShownOpen(panel, isDrawer)
  const setTrigger = useCallback((element: HTMLButtonElement | null) => {
    store.setTrigger(panel, element)
  }, [store, panel])
  return (
    <Button
      {...props}
      ref={setTrigger}
      aria-expanded={isOpen}
      // A drawer's dialog only exists while it's open, so point at it only then.
      aria-controls={entry && (isOpen || !isDrawer) ? entry.elementId : undefined}
      onPress={(event) => {
        onPress?.(event)
        store.setOpen(panel, !isOpen, isDrawer)
      }}
    />
  )
}
