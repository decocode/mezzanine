// Every LabPanel's expanded state and resized size in one LabPanelLayout, so a LabPanelToggle anywhere
// inside it can read and change the Panel it names. Panels register here from a ref callback; toggles and
// the layout subscribe. Taken from the first library attempt's panel store. Illustrative and unapproved.
import type { LabPanelPlacement } from './labPanelSize'

export interface LabPanelEntry {
  placement: LabPanelPlacement
  // Whether the app controls the Panel's expanded state; undefined leaves it to the store.
  isExpanded?: boolean
  isCollapsible: boolean
  onExpandedChange?: (isExpanded: boolean) => void
}

export class LabPanelStore {
  private entries = new Map<string, LabPanelEntry>()
  private uncontrolled = new Map<string, boolean>()
  // Panels someone expanded while they were overlays. An overlay never opens by itself, such as when the
  // layout narrows, because it would cover the content uninvited.
  private openedAsOverlay = new Set<string>()
  // Sizes, in pixels, that people have dragged resizable Panels to.
  private sizes = new Map<string, number>()
  private listeners = new Set<() => void>()
  private version = 0
  // Whether someone has expanded or collapsed a Panel yet, so Panels expanded from the start appear in
  // place rather than opening on every page load.
  hasChanged = false
  // Whether someone is dragging a Panel's edge, so the tracks follow the pointer without animating.
  isResizing = false

  subscribe = (listener: () => void) => {
    this.listeners.add(listener)
    return () => { this.listeners.delete(listener) }
  }

  getVersion = () => this.version

  private notify() {
    this.version += 1
    for (const listener of this.listeners) listener()
  }

  register(id: string, entry: LabPanelEntry) {
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

  isExpanded(id: string) {
    const entry = this.entries.get(id)
    if (entry && !entry.isCollapsible) return true
    return entry?.isExpanded ?? this.uncontrolled.get(id) ?? true
  }

  // Whether the Panel shows now: beside the content, or as an overlay someone opened.
  isShown(id: string, isOverlay: boolean) {
    return this.isExpanded(id) && (!isOverlay || this.openedAsOverlay.has(id))
  }

  setExpanded(id: string, isExpanded: boolean, isOverlay: boolean) {
    const entry = this.entries.get(id)
    if (isExpanded && isOverlay) this.openedAsOverlay.add(id)
    else this.openedAsOverlay.delete(id)
    if (entry?.isExpanded === undefined) this.uncontrolled.set(id, isExpanded)
    this.hasChanged = true
    this.notify()
    entry?.onExpandedChange?.(isExpanded)
  }

  // The size someone resized a Panel to, or undefined for its usual size.
  size(id: string) {
    return this.sizes.get(id)
  }

  setSize(id: string, size: number | undefined) {
    if (size === undefined) this.sizes.delete(id)
    else this.sizes.set(id, size)
    this.notify()
  }

  setResizing(isResizing: boolean) {
    this.isResizing = isResizing
    this.notify()
  }
}
