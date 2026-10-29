// A candidate Panel that works in any container, and the LabPanelLayout that holds one or more of them
// beside its content. Illustrative and unapproved.
import { Children, isValidElement, useCallback, useId, useRef, useState, useSyncExternalStore, type CSSProperties, type KeyboardEvent, type ReactNode, type RefObject } from 'react'
import { useLocale } from 'react-aria-components'
import { useMove } from 'react-aria'
import { Button, CloseIcon, Tooltip, TooltipTrigger } from '@decocode/mezzanine'
import { labPanelIcon } from './LabPanelIcons'
import { LabPanelLayoutContext, lengthOnElement, useLabPanelLayout, useLabPanelLayoutState } from './labPanelLayoutState'
import type { LabPanelPlacement } from './labPanelSize'

export interface LabPanelLayoutProps {
  // LabPanels, and the content they sit beside, which is every other child.
  children: ReactNode
  // A row across the top, above the Panels and the content, such as a toolbar holding a LabPanelToggle.
  header?: ReactNode
  // The narrowest the content gets before a side Panel stops sharing the space and becomes an overlay,
  // as a CSS length. The xs width unless given.
  minContentWidth?: string
  className?: string
}

// Holds one or more LabPanels and the content beside them, and decides how they share the room. It keeps
// every Panel's expanded state and size, measures its own width, and without room for a side Panel,
// shows it as an overlay inside the layout. It can go on any element.
export function LabPanelLayout({ children, header, minContentWidth = 'var(--width-md)', className }: LabPanelLayoutProps) {
  const { state, elementProps } = useLabPanelLayoutState()
  const isPanel = (child: ReactNode) => isValidElement(child) && child.type === LabPanel
  const childList = Children.toArray(children)
  const content = childList.filter((child) => !isPanel(child))
  return (
    <LabPanelLayoutContext value={state}>
      <div
        {...elementProps}
        className={['lab-panel-layout', className].filter(Boolean).join(' ')}
        style={{ '--_lab-panel-layout-min-content-width': minContentWidth, ...elementProps.style } as CSSProperties}
      >
        {header != null && <div className="lab-panel-layout-header">{header}</div>}
        {childList.filter(isPanel)}
        {content.length > 0 && <div className="lab-panel-layout-content">{content}</div>}
      </div>
    </LabPanelLayoutContext>
  )
}

export interface LabPanelProps {
  placement: LabPanelPlacement
  // An optional visible heading in the Panel's header row, for when the content needs introducing. It
  // makes the Panel a region named by it. Without one, the Panel isn't a landmark, and its content names
  // itself.
  title?: string
  // A name for a Panel without a visible title, which makes it a region and names its buttons.
  'aria-label'?: string
  // People can change the Panel's size by dragging its inner edge, or with the arrow keys.
  isResizable?: boolean
  // The whole Panel can be collapsed and expanded by a LabPanelToggle outside it, which stays visible.
  isCollapsible?: boolean
  // Whether a collapsible Panel is expanded, for an app that controls it, and a response to changes.
  // Without isExpanded, the Panel starts expanded.
  isExpanded?: boolean
  onExpandedChange?: (isExpanded: boolean) => void
  // A collapsible Panel holds a LabPanelToggle in its header row that collapses it. Placeholder name; the
  // owner is still to confirm it.
  hasCollapseButton?: boolean
  // The collapse button's icon, which the app chooses by context: a panel collapse icon, the default, such
  // as for navigation, or an × to close, such as for filters or a supplementary Panel. Placeholder name.
  collapseIcon?: 'collapse' | 'close'
  // The Panel's id, which its LabPanelToggle names.
  id: string
  children?: ReactNode
  className?: string
}

export function LabPanel({ placement, title, 'aria-label': ariaLabel, isResizable = false, isCollapsible = false, isExpanded, onExpandedChange, hasCollapseButton = false, collapseIcon = 'collapse', id, children, className }: LabPanelProps) {
  const { store, presentation } = useLabPanelLayout('LabPanel')
  useSyncExternalStore(store.subscribe, store.getVersion, store.getVersion)
  const headingId = useId()
  const panelRef = useRef<HTMLDivElement | null>(null)
  const isOverlay = presentation(placement) === 'overlay'
  // A Panel that can't collapse has no toggle to open it as an overlay, so without room it's hidden.
  const isShown = isCollapsible ? store.isShown(id, isOverlay) : !isOverlay

  // Register from a ref callback, so toggles can find this Panel without an effect.
  const register = useCallback((element: HTMLDivElement | null) => {
    panelRef.current = element
    if (!element) return
    return store.register(id, { placement, isExpanded: isCollapsible ? isExpanded : true, isCollapsible, onExpandedChange })
  }, [store, id, placement, isCollapsible, isExpanded, onExpandedChange])

  // A LabPanelHeader among the children shares the header row with the title and the collapse button, and
  // a LabPanelFooter sits at the bottom, with the content scrolling between them.
  const parts = Children.toArray(children)
  const header = parts.find((child) => isValidElement(child) && child.type === LabPanelHeader)
  const footer = parts.find((child) => isValidElement(child) && child.type === LabPanelFooter)
  const content = parts.filter((child) => child !== header && child !== footer)
  // The Panel's name: its visible title, or its aria-label without one.
  const name = title ?? ariaLabel
  const collapseButton = isCollapsible && hasCollapseButton && (
    collapseIcon === 'close'
      ? <LabPanelToggle panel={id} placement={placement} title={name} icon={<CloseIcon />} collapseLabel={name === undefined ? 'Close panel' : `Close ${name}`} />
      : <LabPanelToggle panel={id} placement={placement} title={name} />
  )
  const hasHeaderRow = header !== undefined || title !== undefined || Boolean(collapseButton)
  // Only a named Panel is a region; otherwise it's a plain layout container. Typed as a div for the ref.
  const Element = (name === undefined ? 'div' : 'section') as 'div'

  return (
    <Element
      ref={register}
      id={id}
      className={['lab-panel', className].filter(Boolean).join(' ')}
      data-placement={placement}
      data-state={isShown ? 'open' : 'closed'}
      data-overlay={isOverlay || undefined}
      data-collapse-button={Boolean(collapseButton) || undefined}
      aria-labelledby={title === undefined ? undefined : headingId}
      aria-label={title === undefined ? ariaLabel : undefined}
      inert={!isShown}
      // An overlay closes with Escape, and focus goes back to the toggle outside it.
      onKeyDown={isOverlay && isShown && isCollapsible ? (event) => {
        if (event.key !== 'Escape') return
        store.setExpanded(id, false, true)
        handFocusToTwin(id, false)
      } : undefined}
    >
      <div className="lab-panel-inner">
        {hasHeaderRow && <div className="lab-panel-header">
          {placement === 'start' && collapseButton}
          {title !== undefined && <h3 className="lab-panel-title" id={headingId}>{title}</h3>}
          {header}
          {placement !== 'start' && collapseButton}
        </div>}
        <div className="lab-panel-body">
          <div className="lab-panel-clip">
            <div className="lab-panel-content">{content}</div>
            {footer}
          </div>
        </div>
      </div>
      {isResizable && isShown && !isOverlay && <LabPanelResizeHandle id={id} placement={placement} title={name} panelRef={panelRef} />}
    </Element>
  )
}

// An optional part at the top of a Panel, for what introduces it or acts on all of it, such as a heading
// or a few buttons. It shares its row with the Panel's title and collapse button, and stays put while the
// content below it scrolls.
export function LabPanelHeader({ children }: { children: ReactNode }) {
  return <div className="lab-panel-header-content">{children}</div>
}

// An optional part at the bottom of a Panel, for what should always be within reach, such as an account
// menu or a message box. It stays put while the content above it scrolls.
export function LabPanelFooter({ children }: { children: ReactNode }) {
  return <div className="lab-panel-footer">{children}</div>
}

// When a toggle disappears with what it changed, focus moves to the twin that stays: the one inside the
// Panel once it expands, or one outside it once it collapses. It tries each frame until the change has
// rendered and the twin takes focus, for up to ten frames.
function handFocusToTwin(panel: string, isExpanding: boolean) {
  let frames = 10
  const handOver = () => {
    const twin = [...document.querySelectorAll<HTMLElement>(`[aria-controls="${CSS.escape(panel)}"]`)]
      .find((toggle) => Boolean(toggle.closest(`#${CSS.escape(panel)}`)) === isExpanding)
    if (!twin || twin === document.activeElement) return
    twin.focus()
    if (twin !== document.activeElement && --frames > 0) requestAnimationFrame(handOver)
  }
  requestAnimationFrame(handOver)
}

// The button that collapses and expands a collapsible Panel. Outside the Panel, it stays visible: in a
// strip, a toolbar, a bar of toggles or the content's header. With hasCollapseButton, a Panel also holds
// one in its header row. Its icon shows what pressing does; with children, it shows that text instead.
export function LabPanelToggle({ panel, placement, title, collapseLabel, expandLabel, children, icon, tooltip }: {
  // The Panel's id.
  panel: string
  placement: LabPanelPlacement
  // The Panel's title, if it has one, for the button's name.
  title?: string
  // The button's name and tooltip, for wording that suits the use, such as "Hide properties". They
  // default to "Collapse" and "Expand" with the Panel's title, or "Hide panel" and "Show panel" without one.
  collapseLabel?: string
  expandLabel?: string
  // A visible text label in place of the icon, such as "Start" in a bar of toggles. It names the button,
  // and aria-expanded says whether its Panel is expanded.
  children?: ReactNode
  // An icon in place of the panel icons, such as an × for a collapse button that closes the Panel.
  icon?: ReactNode
  // With children, a tooltip that adds to the text on hover and focus, such as "End panel" for "End".
  tooltip?: string
}) {
  const { store, presentation } = useLabPanelLayout('LabPanelToggle')
  useSyncExternalStore(store.subscribe, store.getVersion, store.getVersion)
  const isOverlay = presentation(placement) === 'overlay'
  const isShown = store.isShown(panel, isOverlay)
  const onPress = () => {
    store.setExpanded(panel, !isShown, isOverlay)
    handFocusToTwin(panel, !isShown)
  }
  if (children != null) {
    const button = <Button size="sm" hierarchy="tertiary" aria-expanded={isShown} aria-controls={panel} onPress={onPress}>{children}</Button>
    return tooltip === undefined ? button : <TooltipTrigger>{button}<Tooltip>{tooltip}</Tooltip></TooltipTrigger>
  }
  return (
    <Button
      size="sm"
      hierarchy="tertiary"
      icon={icon ?? labPanelIcon(placement, isShown)}
      iconPosition="iconOnly"
      aria-expanded={isShown}
      aria-controls={panel}
      onPress={onPress}
    >
      {isShown
        ? collapseLabel ?? (title === undefined ? 'Hide panel' : `Collapse ${title}`)
        : expandLabel ?? (title === undefined ? 'Show panel' : `Expand ${title}`)}
    </Button>
  )
}

interface ResizeHandleProps {
  id: string
  placement: LabPanelPlacement
  title: string | undefined
  panelRef: RefObject<HTMLElement | null>
}

// The Panel's inner edge, following the window splitter pattern: a focusable separator that pointer, touch
// and arrow keys move with React Aria's useMove. Home and End go to the limits, and a double click restores
// the usual size. A side Panel resizes between the xs and md widths, never so wide that the content drops
// below its minimum; a bottom one between the xs and sm widths, as heights.
function LabPanelResizeHandle({ id, placement, title, panelRef }: ResizeHandleProps) {
  const { store, maxPanelSize } = useLabPanelLayout('LabPanel')
  const { direction } = useLocale()
  const dragStart = useRef(0)
  const [isMoving, setMoving] = useState(false)
  const isSide = placement !== 'bottom'
  // Moving toward the content makes the Panel bigger; which way that is depends on its placement and, for
  // a side Panel, the reading direction.
  const growing = isSide ? ((placement === 'start') === (direction === 'ltr') ? 1 : -1) : -1
  const limits = () => {
    const panel = panelRef.current
    const min = lengthOnElement(panel, '--_lab-panel-min-width')
    const largest = lengthOnElement(panel, isSide ? '--_lab-panel-max-width' : '--_lab-panel-max-height')
    const max = Math.max(min, isSide ? Math.min(largest, maxPanelSize(placement)) : largest)
    return { min, max, step: lengthOnElement(panel, '--space-4') }
  }
  // The size of the Panel's track: what someone resized it to, its usual width, or, for a bottom Panel, its
  // height with the space around it.
  const current = () => {
    const panel = panelRef.current
    if (store.size(id) !== undefined) return store.size(id)!
    if (isSide) return lengthOnElement(panel, `--_lab-panel-${placement}-width`)
    if (!panel) return 0
    const styles = getComputedStyle(panel)
    return panel.offsetHeight + parseFloat(styles.marginBlockStart) + parseFloat(styles.marginBlockEnd)
  }
  const resize = (next: number) => {
    const { min, max } = limits()
    store.setSize(id, Math.min(max, Math.max(min, next)))
  }

  const { moveProps } = useMove({
    onMoveStart() {
      dragStart.current = current()
    },
    onMove({ deltaX, deltaY, pointerType }) {
      const delta = (isSide ? deltaX : deltaY) * growing
      if (pointerType === 'keyboard') {
        resize(current() + Math.sign(delta) * limits().step)
        return
      }
      if (!isMoving) {
        setMoving(true)
        store.setResizing(true)
      }
      dragStart.current += delta
      resize(dragStart.current)
    },
    onMoveEnd() {
      setMoving(false)
      store.setResizing(false)
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
      onDoubleClick={() => store.setSize(id, undefined)}
      className="lab-panel-resize-handle"
      data-placement={placement}
      role="separator"
      aria-orientation={isSide ? 'vertical' : 'horizontal'}
      aria-label={`Resize ${title ?? 'panel'}`}
      aria-controls={id}
      aria-valuenow={Math.round(current())}
      aria-valuemin={Math.round(min)}
      aria-valuemax={Math.round(max)}
      tabIndex={0}
    />
  )
}
