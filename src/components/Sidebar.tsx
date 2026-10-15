import { useEffect, useEffectEvent, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Button, type ButtonProps } from './Button'
import { Dialog } from './Dialog'
import { Heading } from './Heading'
import { Modal, ModalOverlay } from './Modal'
import { PanelLeftCloseIcon, PanelRightCloseIcon } from '../icons/StudioIcons'
import { SidebarContext, useSidebarMediaQuery, useSidebarState, useSidebarFocus } from './sidebarState'

export interface SidebarProps {
  children: ReactNode
  presentation?: 'auto' | 'inline' | 'modal'
  isCollapsible?: boolean
  inlineMediaQuery?: string
  isExpanded?: boolean
  defaultExpanded?: boolean
  onExpandedChange?: (isExpanded: boolean) => void
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
}

/** State boundary for one independently controlled trigger and panel. Adds no DOM. */
export function Sidebar({
  children, presentation = 'auto', isCollapsible = true, inlineMediaQuery = '(min-width: 64rem)',
  isExpanded: controlledExpanded, defaultExpanded = true, onExpandedChange,
  isOpen: controlledOpen, defaultOpen = false, onOpenChange,
}: SidebarProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const [open, setOpen] = useState(defaultOpen)
  const isExpanded = !isCollapsible || (controlledExpanded ?? expanded)
  const isOpen = controlledOpen ?? open
  const isWide = useSidebarMediaQuery(inlineMediaQuery)
  const isModal = presentation === 'modal' || (presentation === 'auto' && !isWide)
  const wasModal = useRef(isModal)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()

  function changeOpen(next: boolean) {
    if (controlledOpen === undefined) setOpen(next)
    onOpenChange?.(next)
  }

  // A drawer must not stay open, unseen, after widening. Telling the application
  // cannot happen while rendering, so this runs only when the layout switches.
  const closeAfterWidening = useEffectEvent(() => {
    if (isOpen) changeOpen(false)
  })
  useEffect(() => {
    if (wasModal.current && !isModal) closeAfterWidening()
    wasModal.current = isModal
  }, [isModal])

  return (
    <SidebarContext.Provider value={{
      isModal, isCollapsible, isExpanded, isOpen, panelId, triggerRef,
      setOpen: changeOpen,
      setExpanded: (next) => {
        if (!isCollapsible) return
        if (controlledExpanded === undefined) setExpanded(next)
        onExpandedChange?.(next)
      },
    }}>
      {children}
    </SidebarContext.Provider>
  )
}

export type SidebarTriggerProps = Omit<Extract<ButtonProps, { href?: never }>, 'ref' | 'aria-controls' | 'aria-expanded' | 'aria-haspopup'>

/** Mezzanine Button, using React Aria press and focus behaviour. Keep it outside the panel. */
export function SidebarTrigger({ onPress, ...props }: SidebarTriggerProps) {
  const state = useSidebarState()
  if (!state.isModal && !state.isCollapsible) return null
  return (
    <Button
      {...props}
      ref={state.triggerRef}
      aria-controls={state.isModal && !state.isOpen ? undefined : state.panelId}
      aria-expanded={state.isModal ? state.isOpen : state.isExpanded}
      aria-haspopup={state.isModal ? 'dialog' : undefined}
      onPress={(event) => {
        onPress?.(event)
        if (state.isModal) state.setOpen(!state.isOpen)
        else state.setExpanded(!state.isExpanded)
      }}
    />
  )
}

interface SidebarPanelBaseProps {
  title: string
  children: ReactNode
  side?: 'left' | 'right'
  header?: ReactNode
  footer?: ReactNode
  closeLabel?: string
  headingLevel?: 2 | 3 | 4 | 5 | 6
  hideInlineHeader?: boolean
  className?: string
  style?: CSSProperties
}

export type SidebarPanelProps = SidebarPanelBaseProps & (
  | { collapseMode?: 'hide'; rail?: never }
  | { collapseMode: 'rail'; rail: ReactNode }
)

/** Generic complementary content; compose a labelled nav inside for navigation. */
export function SidebarPanel({
  title, children, side = 'left', collapseMode = 'hide', rail,
  hideInlineHeader = false, header, footer, closeLabel = `Close ${title}`, headingLevel = 2, className, style,
}: SidebarPanelProps) {
  const state = useSidebarState()
  const titleId = useId()
  const focusedElement = useSidebarFocus(state.isExpanded, state.triggerRef)
  const classes = ['mezzanine-sidebar-panel', className].filter(Boolean).join(' ')
  const contents = <>
    {(!hideInlineHeader || state.isModal) && <div className="mezzanine-sidebar-header">
      <Heading id={titleId} level={headingLevel} slot={state.isModal ? 'title' : undefined}>{title}</Heading>
      {(state.isModal || state.isCollapsible) && <Button
        aria-label={closeLabel}
        iconLeading={side === 'left' ? <PanelLeftCloseIcon /> : <PanelRightCloseIcon />}
        variant="tertiary"
        onPress={() => {
          if (state.isModal) state.setOpen(false)
          else {
            state.triggerRef.current?.focus()
            state.setExpanded(false)
          }
        }}
      />}
      {header != null && <div className="mezzanine-sidebar-header-content">{header}</div>}
    </div>}
    <div className="mezzanine-sidebar-content">{children}</div>
    {footer != null && <div className="mezzanine-sidebar-footer">{footer}</div>}
  </>

  if (state.isModal) {
    return (
      <ModalOverlay
        isOpen={state.isOpen}
        onOpenChange={state.setOpen}
        isDismissable
        className="mezzanine-sidebar-overlay"
        data-side={side}
      >
        <Modal className={classes} data-side={side} style={style}>
          <Dialog id={state.panelId} aria-labelledby={titleId} className="mezzanine-sidebar-dialog">
            {contents}
          </Dialog>
        </Modal>
      </ModalOverlay>
    )
  }

  return (
    <aside
      className={classes}
      style={style}
      data-side={side}
      data-expanded={state.isExpanded || undefined}
      data-collapse-mode={collapseMode}
      aria-label={title}
      onFocusCapture={(event) => { focusedElement.current = event.target as HTMLElement }}
      hidden={!state.isExpanded && collapseMode === 'hide'}
    >
      <div id={state.panelId} className="mezzanine-sidebar-expanded" hidden={!state.isExpanded}>
        {contents}
      </div>
      {collapseMode === 'rail' && <div className="mezzanine-sidebar-rail" hidden={state.isExpanded}>{rail}</div>}
    </aside>
  )
}
