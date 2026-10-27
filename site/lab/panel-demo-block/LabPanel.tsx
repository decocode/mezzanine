// A candidate Panel that works in any container, and the host that lays Panels out around its main
// content. Illustrative and unapproved: the library's Panel only works inside AppShell.
import { useId, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode, type RefObject } from 'react'
import { useLocale } from 'react-aria-components'
import { useMove } from 'react-aria'
import { Button } from '@decocode/mezzanine'
import { labPanelIcon } from './LabPanelIcons'
import { clampSize, panelSizeLimits, type LabPanelPlacement } from './labPanelSize'

// Lays out its Panels at the start, end, top and bottom of its main content, which is every other child.
// Without room for a side Panel beside the content, the side Panel moves above it.
export function LabPanelHost({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={['lab-panel-host', className].filter(Boolean).join(' ')}>{children}</div>
}

export interface LabPanelProps {
  placement: LabPanelPlacement
  // A visible heading in the Panel's header, which also names it for screen readers.
  title: string
  // People can change the Panel's size by dragging its inner edge, or with the arrow keys.
  isResizable?: boolean
  // A button in the header minimizes the Panel to its header, and maximizes it again.
  isMinimizable?: boolean
  // The whole Panel can be collapsed and expanded by a LabPanelToggle outside it, which stays visible.
  // A Panel is collapsible or minimizable, not both, so this switches minimizing off.
  isCollapsible?: boolean
  // Whether a collapsible Panel is expanded. It is unless this is false.
  isExpanded?: boolean
  // The Panel's id, which its LabPanelToggle names.
  id?: string
  children: ReactNode
  className?: string
}

export function LabPanel({ placement, title, isResizable = false, isMinimizable = false, isCollapsible = false, isExpanded = true, id, children, className }: LabPanelProps) {
  const [isMaximized, setIsMaximized] = useState(true)
  // A size someone dragged the Panel to, in pixels, or undefined for its usual size.
  const [size, setSize] = useState<number | undefined>(undefined)
  const panelRef = useRef<HTMLElement>(null)
  const headingId = useId()
  const bodyId = useId()
  const canMinimize = isMinimizable && !isCollapsible
  const isShown = !isCollapsible || isExpanded
  const isOpen = isShown && (!canMinimize || isMaximized)

  return (
    <section
      ref={panelRef}
      id={id}
      className={['lab-panel', className].filter(Boolean).join(' ')}
      data-placement={placement}
      data-maximized={isOpen || undefined}
      data-collapsed={!isShown || undefined}
      aria-labelledby={headingId}
      // A collapsed Panel keeps its size for when it expands, but doesn't apply it.
      style={size === undefined || !isShown ? undefined : { '--_lab-panel-size': `${size}px` } as CSSProperties}
    >
      <div className="lab-panel-inner">
        <div className="lab-panel-header">
          <h3 className="lab-panel-title" id={headingId}>{title}</h3>
          {canMinimize && (
            <Button
              size="sm"
              hierarchy="tertiary"
              icon={labPanelIcon(placement, isMaximized)}
              iconPosition="iconOnly"
              aria-expanded={isMaximized}
              aria-controls={bodyId}
              onPress={() => setIsMaximized(!isMaximized)}
            >
              {`${isMaximized ? 'Minimize' : 'Maximize'} ${title}`}
            </Button>
          )}
        </div>
        <div className="lab-panel-body" id={bodyId} hidden={!isOpen}>
          <div className="lab-panel-clip">
            <div className="lab-panel-content">{children}</div>
          </div>
        </div>
      </div>
      {isResizable && isOpen && <LabPanelResizeHandle placement={placement} title={title} controls={bodyId} panelRef={panelRef} size={size} onResize={setSize} />}
    </section>
  )
}

// The button that collapses and expands a collapsible Panel, placed outside it, where it stays visible:
// in a strip, a toolbar or a top bar. Its icon shows what pressing does.
export function LabPanelToggle({ panel, placement, title, isExpanded, onExpandedChange, collapseLabel, expandLabel }: {
  // The Panel's id.
  panel: string
  placement: LabPanelPlacement
  title: string
  isExpanded: boolean
  onExpandedChange: (isExpanded: boolean) => void
  // The button's name and tooltip, for wording that suits the use, such as "Hide properties". They
  // default to "Collapse" and "Expand" with the Panel's title.
  collapseLabel?: string
  expandLabel?: string
}) {
  return (
    <Button
      size="sm"
      hierarchy="tertiary"
      icon={labPanelIcon(placement, isExpanded)}
      iconPosition="iconOnly"
      aria-expanded={isExpanded}
      aria-controls={panel}
      onPress={() => onExpandedChange(!isExpanded)}
    >
      {isExpanded ? collapseLabel ?? `Collapse ${title}` : expandLabel ?? `Expand ${title}`}
    </Button>
  )
}

interface ResizeHandleProps {
  placement: LabPanelPlacement
  title: string
  controls: string
  panelRef: RefObject<HTMLElement | null>
  size: number | undefined
  onResize: (size: number | undefined) => void
}

// The Panel's inner edge, following the window splitter pattern: a focusable separator that pointer,
// touch and arrow keys move with React Aria's useMove. Home and End go to the limits, and a double
// click restores the usual size.
function LabPanelResizeHandle({ placement, title, controls, panelRef, size, onResize }: ResizeHandleProps) {
  const { direction } = useLocale()
  const dragStart = useRef(0)
  const isSide = placement === 'start' || placement === 'end'
  // Moving toward the main content makes the Panel bigger; which way that is depends on its placement
  // and, for a side Panel, the reading direction.
  const growing = isSide ? ((placement === 'start') === (direction === 'ltr') ? 1 : -1) : placement === 'top' ? 1 : -1
  const current = () => size ?? (isSide ? panelRef.current?.offsetWidth : panelRef.current?.offsetHeight) ?? 0
  const limits = () => panelSizeLimits(panelRef.current, placement)
  const resize = (next: number) => onResize(clampSize(next, limits()))

  const { moveProps } = useMove({
    onMoveStart() {
      dragStart.current = current()
    },
    onMove({ deltaX, deltaY, pointerType }) {
      const delta = (isSide ? deltaX : deltaY) * growing
      if (pointerType === 'keyboard') resize(current() + Math.sign(delta) * limits().step)
      else {
        dragStart.current += delta
        resize(dragStart.current)
      }
    },
  })

  function onKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Home' && event.key !== 'End') return
    event.preventDefault()
    const { min, max } = limits()
    resize(event.key === 'Home' ? min : max)
  }

  const { min, max } = limits()
  return (
    <div
      {...moveProps}
      onKeyDown={(event) => { moveProps.onKeyDown?.(event); onKeyDown(event) }}
      onDoubleClick={() => onResize(undefined)}
      className="lab-panel-resize-handle"
      data-placement={placement}
      role="separator"
      aria-orientation={isSide ? 'vertical' : 'horizontal'}
      aria-label={`Resize ${title}`}
      aria-controls={controls}
      aria-valuenow={Math.round(current())}
      aria-valuemin={Math.round(min)}
      aria-valuemax={Math.round(max)}
      tabIndex={0}
    />
  )
}
