import { useLayoutEffect, useRef, useState, type AriaAttributes, type ReactNode } from 'react'
import { composeRenderProps } from 'react-aria-components'
import { Button } from './Button'
import { Dialog, DialogTrigger } from './Dialog'
import { Heading } from './Heading'
import { Modal, ModalOverlay } from './Modal'
import { Link, type LinkProps } from './Link'
import { MoreIcon } from '../icons/StudioIcons'

export interface TabBarItem extends Omit<LinkProps, 'children'> {
  id: string
  'aria-current'?: AriaAttributes['aria-current']
  href: string
  label: string
  icon?: ReactNode
}

export interface TabBarProps {
  'aria-label': string
  items: readonly TabBarItem[]
  position?: 'inline' | 'bottom'
  moreLabel?: string
  closeLabel?: string
  className?: string
}

function TabBarLink({ item, close }: { item: TabBarItem; close?: () => void }) {
  const { id: _id, label, icon, className, onClick, ...props } = item
  return (
    <li className="mezzanine-tab-bar-item">
      <Link {...props}
        onClick={(event) => { onClick?.(event); if (!event.defaultPrevented) close?.() }}
        className={composeRenderProps(className, (value) => ['react-aria-Link', 'mezzanine-tab-bar-link', value].filter(Boolean).join(' '))}
      >
        {icon != null && <span className="mezzanine-tab-bar-icon" aria-hidden="true">{icon}</span>}
        <span>{label}</span>
      </Link>
    </li>
  )
}

// A composed navigation pattern: route links plus a modal for overflow destinations.
export function TabBar({ items, 'aria-label': label, position = 'bottom', moreLabel = 'More', closeLabel = 'Close', className }: TabBarProps) {
  const { listRef, slotRef, capacity } = useTabBarCapacity()
  const [isOpen, setIsOpen] = useState(false)
  const [openVisibleCount, setOpenVisibleCount] = useState(0)
  const visibleCount = isOpen ? Math.min(openVisibleCount, items.length) : items.length <= capacity ? items.length : Math.max(0, capacity - 1)
  const overflow = items.slice(visibleCount)
  const currentOverflow = overflow.find((item) => item['aria-current'] === 'page')

  return (
    <nav aria-label={label} className={['mezzanine-tab-bar', className].filter(Boolean).join(' ')} data-position={position} hidden={items.length === 0}>
      <span ref={slotRef} className="mezzanine-tab-bar-measure" aria-hidden="true" />
      <ul ref={listRef} className="mezzanine-tab-bar-items">
        {items.slice(0, visibleCount).map((item) => <TabBarLink key={item.id} item={item} />)}
        {(overflow.length > 0 || isOpen) && (
          <li className="mezzanine-tab-bar-item">
            <DialogTrigger isOpen={isOpen} onOpenChange={(open) => { if (open) setOpenVisibleCount(visibleCount); setIsOpen(open) }}>
              <Button className="mezzanine-tab-bar-more" variant="tertiary"
                aria-label={currentOverflow ? `${moreLabel}: ${currentOverflow.label}` : moreLabel}
                data-current-route={currentOverflow ? 'true' : undefined}>
                <span className="mezzanine-tab-bar-icon" aria-hidden="true"><MoreIcon /></span>
                <span>{moreLabel}</span>
              </Button>
              <ModalOverlay className="mezzanine-tab-bar-overlay" isDismissable>
                <Modal className="mezzanine-tab-bar-sheet">
                  <Dialog>
                    {({ close }) => (
                      <>
                        <div className="mezzanine-tab-bar-sheet-heading">
                          <Heading slot="title">{moreLabel}</Heading>
                          <Button slot="close" variant="secondary">{closeLabel}</Button>
                        </div>
                        <nav aria-label={label}>
                          <ul className="mezzanine-tab-bar-sheet-items">
                            {overflow.map((item) => <TabBarLink key={item.id} item={item} close={close} />)}
                          </ul>
                        </nav>
                      </>
                    )}
                  </Dialog>
                </Modal>
              </ModalOverlay>
            </DialogTrigger>
          </li>
        )}
      </ul>
    </nav>
  )
}

// Measure both available space and the token-sized slot, including text enlargement.
function useTabBarCapacity() {
  const listRef = useRef<HTMLUListElement>(null)
  const slotRef = useRef<HTMLSpanElement>(null)
  const [capacity, setCapacity] = useState(1)

  useLayoutEffect(() => {
    const list = listRef.current
    const slot = slotRef.current
    if (!list || !slot) return

    const measure = () => {
      const style = getComputedStyle(list)
      const gap = parseFloat(style.columnGap) || 0
      const width = list.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
      const slotWidth = slot.getBoundingClientRect().width
      setCapacity(Math.max(1, Math.floor((width + gap) / (slotWidth + gap))))
    }
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    observer.observe(slot)
    measure()
    return () => observer.disconnect()
  }, [])

  return { listRef, slotRef, capacity }
}
