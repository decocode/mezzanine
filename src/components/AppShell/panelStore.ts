// Every Panel's open state in one AppShell, so a PanelTrigger anywhere inside it can read and change
// the Panel it names. Panels register here from a ref callback; triggers and the shell subscribe.

export type PanelEdge = 'start' | 'end' | 'bottom'

export interface PanelEntry {
  edge: PanelEdge
  // The element id that a trigger's aria-controls points at.
  elementId: string
  isOpen?: boolean
  defaultOpen: boolean
  hasMinimized: boolean
  // A Panel that can't be closed, such as an app's navigation; it's hidden when there's no room.
  isCollapsible: boolean
  onOpenChange?: (isOpen: boolean) => void
}

export class PanelStore {
  private entries = new Map<string, PanelEntry>()
  private uncontrolled = new Map<string, boolean>()
  private triggers = new Map<string, HTMLElement>()
  // Panels someone opened while they were drawers. A drawer never opens by itself, such as from
  // defaultOpen or after its AppShell narrows, because it would cover the page uninvited.
  private openedAsDrawer = new Set<string>()
  private listeners = new Set<() => void>()
  private version = 0
  // Whether someone has opened or closed a Panel yet. Panels that are open from the start appear in
  // place rather than sliding open on every page load.
  hasChanged = false

  subscribe = (listener: () => void) => {
    this.listeners.add(listener)
    return () => { this.listeners.delete(listener) }
  }

  getVersion = () => this.version

  private notify() {
    this.version += 1
    for (const listener of this.listeners) listener()
  }

  register(id: string, entry: PanelEntry) {
    this.entries.set(id, entry)
    this.notify()
    return () => {
      if (this.entries.get(id) === entry) this.entries.delete(id)
      this.notify()
    }
  }

  entry(id: string) {
    return this.entries.get(id)
  }

  panels() {
    return [...this.entries.entries()]
  }

  isOpen(id: string) {
    const entry = this.entries.get(id)
    return entry?.isOpen ?? this.uncontrolled.get(id) ?? entry?.defaultOpen ?? false
  }

  // Whether the Panel is open as it's shown now: beside the content, or as a drawer.
  isShownOpen(id: string, isDrawer: boolean) {
    return this.isOpen(id) && (!isDrawer || this.openedAsDrawer.has(id))
  }

  setOpen(id: string, isOpen: boolean, isDrawer = false) {
    const entry = this.entries.get(id)
    if (isOpen && isDrawer) this.openedAsDrawer.add(id)
    else this.openedAsDrawer.delete(id)
    if (entry?.isOpen === undefined) this.uncontrolled.set(id, isOpen)
    this.hasChanged = true
    this.notify()
    entry?.onOpenChange?.(isOpen)
  }

  // The trigger that most recently attached for a Panel, so closing from inside the Panel can return focus to it.
  setTrigger(id: string, element: HTMLElement | null) {
    if (element) this.triggers.set(id, element)
    else this.triggers.delete(id)
  }

  trigger(id: string) {
    return this.triggers.get(id)
  }
}
