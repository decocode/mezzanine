import { useRef, useState, type ReactNode } from 'react'
import { Button } from '../Button/Button'
// The menu has its own look, so it uses React Aria's Disclosure and Heading without Mezzanine's classes.
import { Disclosure, DisclosurePanel } from 'react-aria-components/DisclosureGroup'
import { Heading } from 'react-aria-components/Heading'
import { MenuIcon, CloseIcon } from '../../icons/Icons'
import { useOptionalAppShell } from '../AppShell/AppShell'

export interface TopBarRenderProps {
  closeMenu: () => void
  /** True inside the narrow-screen menu, false in the bar. */
  isMenu: boolean
}

type TopBarContent = ReactNode | ((props: TopBarRenderProps) => ReactNode)

export interface TopBarProps {
  brand: ReactNode
  children: TopBarContent
  actions?: TopBarContent
  'aria-label': string
  menuLabel?: string
  closeLabel?: string
  className?: string
}

// Navigation uses ordinary links; Disclosure supplies the mobile trigger behaviour.
// Children and actions render once for the menu and once for the bar, and receive isMenu,
// so menu-only content can sit between links and actions can change in the menu.
// While the menu is in use, actions sit in it after the links, leaving the bar the brand
// and the menu button.
export function TopBar({ brand, children, actions, 'aria-label': label, menuLabel = 'Menu', closeLabel = 'Close menu', className }: TopBarProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  // Inside an AppShell whose navigation Panel is hidden for lack of room, the menu is the only way to
  // reach that navigation, so the TopBar uses its menu however wide it is.
  const isMenuOnly = useOptionalAppShell()?.isStartPanelHidden ?? false
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeMenu = () => {
    if (isExpanded) {
      triggerRef.current?.focus({ preventScroll: true })
      setIsExpanded(false)
    }
  }
  const render = (content: TopBarContent, isMenu: boolean) => typeof content === 'function' ? content({ closeMenu, isMenu }) : content
  const links = (isMenu: boolean) => <nav aria-label={label} className="mz-top-bar-links">{render(children, isMenu)}</nav>
  const actionGroup = (isMenu: boolean) => {
    const content = render(actions, isMenu)
    return content != null && <div className="mz-top-bar-actions">{content}</div>
  }

  return (
    <header className={['mz-top-bar', className].filter(Boolean).join(' ')} data-menu-only={isMenuOnly || undefined}>
      <div className="mz-top-bar-content">
        <div className="mz-top-bar-brand">{brand}</div>
        <Disclosure className="mz-top-bar-mobile" isExpanded={isExpanded} onExpandedChange={setIsExpanded}>
          <Heading className="mz-top-bar-heading" level={2}>
            {/* Its label shows in a tooltip, to keep the bar compact. */}
            <Button ref={triggerRef} className="mz-top-bar-trigger" size="sm" icon={isExpanded ? <CloseIcon /> : <MenuIcon />} iconPosition="iconOnly" slot="trigger" hierarchy="secondary">
              {isExpanded ? closeLabel : menuLabel}
            </Button>
          </Heading>
          <DisclosurePanel className="mz-top-bar-panel">{links(true)}{actionGroup(true)}</DisclosurePanel>
        </Disclosure>
        <div className="mz-top-bar-desktop">{links(false)}{actionGroup(false)}</div>
      </div>
    </header>
  )
}
