import { useState, type ReactNode } from 'react'
import { Button } from './Button'
import { Heading } from './Dialog'
import { Disclosure, DisclosurePanel } from './Disclosure'
import { MenuIcon } from '../icons/Icons'

export interface HeaderRenderProps {
  closeMenu: () => void
}

export interface HeaderProps {
  brand: ReactNode
  children: ReactNode | ((props: HeaderRenderProps) => ReactNode)
  menuLabel?: string
  className?: string
}

// Composes Mezzanine's React Aria Disclosure, Heading and Button for compact navigation.
export function Header({ brand, children, menuLabel = 'Menu', className }: HeaderProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const closeMenu = () => setIsExpanded(false)
  const navigation = typeof children === 'function' ? children({ closeMenu }) : children

  return (
    <header className={['global-header', className].filter(Boolean).join(' ')}>
      <div className="mezzanine-header-content">
        {brand}
        <Disclosure
          className="mobile-navigation"
          isExpanded={isExpanded}
          onExpandedChange={setIsExpanded}
        >
          <Heading className="mobile-navigation-heading" level={2}>
            <Button
              className="menu-trigger"
              iconLeading={<MenuIcon />}
              slot="trigger"
              variant="secondary"
            >
              {menuLabel}
            </Button>
          </Heading>
          <DisclosurePanel className="mobile-navigation-panel">
            {navigation}
          </DisclosurePanel>
        </Disclosure>
        <div className="desktop-navigation">{navigation}</div>
      </div>
    </header>
  )
}
