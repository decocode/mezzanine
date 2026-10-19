import { useCallback, useId, useSyncExternalStore, type ReactNode } from 'react'
import { Button, type ButtonProps } from '../Button/Button'
import { Dialog } from '../Dialog/Dialog'
import { Heading } from '../Heading/Heading'
import { Modal, ModalOverlay } from '../Modal/Modal'
import { CloseIcon } from '../../icons/StudioIcons'
import { useAppShell } from '../AppShell/AppShell'
import type { PanelEdge } from '../AppShell/panelStore'

export interface PanelProps {
  // Names the Panel for PanelTrigger's `panel` prop.
  id: string
  edge: PanelEdge
  // The Panel's heading, and the name of its landmark.
  title: string
  headingLevel?: 2 | 3 | 4 | 5 | 6
  // Shown in place of nothing when the Panel isn't open: the same content, condensed.
  minimized?: ReactNode
  // The close button's label, shown in its tooltip. Defaults to "Close" and the title.
  closeLabel?: string
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  children: ReactNode
  className?: string
}

// An area at the start, end or bottom of an AppShell that shares the space with the main content.
// When there's no room beside the content, a side Panel opens as a drawer instead.
export function Panel({
  id, edge, title, headingLevel = 2, minimized, closeLabel = `Close ${title}`,
  isOpen: controlledOpen, defaultOpen = false, onOpenChange, children, className,
}: PanelProps) {
  const { store, presentation } = useAppShell('Panel')
  useSyncExternalStore(store.subscribe, store.getVersion, store.getVersion)
  const elementId = useId()
  const headingId = useId()
  const isDrawer = presentation(edge) === 'drawer'
  const isOpen = (controlledOpen ?? store.isOpen(id)) && (!isDrawer || store.isShownOpen(id, true))
  const classes = ['mz-panel', className].filter(Boolean).join(' ')

  // Register from a ref callback, so triggers can find this Panel without an effect.
  const register = useCallback((element: HTMLElement | null) => {
    if (!element) return
    return store.register(id, { edge, elementId, isOpen: controlledOpen, defaultOpen, hasMinimized: minimized != null, onOpenChange })
  }, [store, id, edge, elementId, controlledOpen, defaultOpen, minimized, onOpenChange])

  function close() {
    // Closing from inside a shared-space Panel hides the focused button, so return focus to the trigger.
    if (!isDrawer) store.trigger(id)?.focus()
    store.setOpen(id, false, isDrawer)
  }

  const contents = <>
    <div className="mz-panel-header">
      <Heading id={headingId} level={headingLevel} slot={isDrawer ? 'title' : undefined}>{title}</Heading>
      <Button iconLeading={<CloseIcon />} labelPlacement="tooltip" size="sm" variant="tertiary" onPress={close}>{closeLabel}</Button>
    </div>
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
      aria-labelledby={isShown ? headingId : undefined}
      aria-label={isShown ? undefined : title}
      inert={!isShown && minimized == null}
    >
      {isShown ? contents : minimized != null && <div className="mz-panel-minimized">{minimized}</div>}
    </aside>
    {isDrawer && <ModalOverlay isOpen={isOpen} onOpenChange={(open) => store.setOpen(id, open, true)} isDismissable className="mz-panel-overlay" data-edge={edge}>
      <Modal className={classes} data-edge={edge}>
        <Dialog id={elementId} className="mz-panel-dialog">{contents}</Dialog>
      </Modal>
    </ModalOverlay>}
  </>
}

export type PanelTriggerProps = Omit<Extract<ButtonProps, { href?: never }>, 'ref' | 'aria-controls' | 'aria-expanded'> & {
  // The id of the Panel this button opens and closes.
  panel: string
}

// A Mezzanine Button that opens and closes a Panel, placed wherever suits the app: in a Navbar, a Rail
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
