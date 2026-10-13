import { useRef, useState, type ReactNode } from 'react'
import { Button } from './Button'
import { Heading } from './Heading'
import { Disclosure, DisclosurePanel } from './Disclosure'
import { MenuIcon } from '../icons/Icons'
import { CloseIcon } from '../icons/StudioIcons'

export interface NavbarRenderProps {
  closeMenu: () => void
}

type NavbarContent = ReactNode | ((props: NavbarRenderProps) => ReactNode)

export interface NavbarProps {
  brand: ReactNode
  children: NavbarContent
  actions?: NavbarContent
  'aria-label': string
  menuLabel?: string
  closeLabel?: string
  className?: string
}

// Navigation uses ordinary links; Disclosure supplies the mobile trigger behaviour.
export function Navbar({ brand, children, actions, 'aria-label': label, menuLabel = 'Menu', closeLabel = 'Close menu', className }: NavbarProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeMenu = () => {
    if (isExpanded) {
      triggerRef.current?.focus({ preventScroll: true })
      setIsExpanded(false)
    }
  }
  const navigation = typeof children === 'function' ? children({ closeMenu }) : children
  const actionContent = typeof actions === 'function' ? actions({ closeMenu }) : actions
  const content = <>
    <nav aria-label={label} className="mezzanine-navbar-links">{navigation}</nav>
    {actionContent != null && <div className="mezzanine-navbar-actions">{actionContent}</div>}
  </>

  return (
    <header className={['mezzanine-navbar', className].filter(Boolean).join(' ')}>
      <div className="mezzanine-navbar-content">
        <div className="mezzanine-navbar-brand">{brand}</div>
        <Disclosure className="mezzanine-navbar-mobile" isExpanded={isExpanded} onExpandedChange={setIsExpanded}>
          <Heading className="mezzanine-navbar-heading" level={2}>
            <Button ref={triggerRef} className="mezzanine-navbar-trigger" iconLeading={isExpanded ? <CloseIcon /> : <MenuIcon />} slot="trigger" variant="secondary">
              {isExpanded ? closeLabel : menuLabel}
            </Button>
          </Heading>
          <DisclosurePanel className="mezzanine-navbar-panel">{content}</DisclosurePanel>
        </Disclosure>
        <div className="mezzanine-navbar-desktop">{content}</div>
      </div>
    </header>
  )
}
