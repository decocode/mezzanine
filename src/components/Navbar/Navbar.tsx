import { useRef, useState, type ReactNode } from 'react'
import { Button } from '../Button/Button'
import { Heading } from '../Heading/Heading'
import { Tooltip, TooltipTrigger } from '../Tooltip/Tooltip'
import { Disclosure, DisclosurePanel } from '../Disclosure/Disclosure'
import { MenuIcon } from '../../icons/Icons'
import { CloseIcon } from '../../icons/StudioIcons'

export interface NavbarRenderProps {
  closeMenu: () => void
  /** True inside the narrow-screen menu, false in the bar. */
  isMenu: boolean
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
// Actions stay visible on every width. Children render once for the menu and once
// for the bar, and receive isMenu so menu-only content can sit between links.
export function Navbar({ brand, children, actions, 'aria-label': label, menuLabel = 'Menu', closeLabel = 'Close menu', className }: NavbarProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeMenu = () => {
    if (isExpanded) {
      triggerRef.current?.focus({ preventScroll: true })
      setIsExpanded(false)
    }
  }
  const render = (content: NavbarContent, isMenu: boolean) => typeof content === 'function' ? content({ closeMenu, isMenu }) : content
  const actionContent = render(actions, false)
  const links = (isMenu: boolean) => <nav aria-label={label} className="mezzanine-navbar-links">{render(children, isMenu)}</nav>
  const actionGroup = actionContent != null && <div className="mezzanine-navbar-actions">{actionContent}</div>

  return (
    <header className={['mezzanine-navbar', className].filter(Boolean).join(' ')}>
      <div className="mezzanine-navbar-content">
        <div className="mezzanine-navbar-brand">{brand}</div>
        {/* Narrow screens keep actions in the bar, beside the menu button. */}
        {actionGroup && <div className="mezzanine-navbar-bar-actions">{actionGroup}</div>}
        <Disclosure className="mezzanine-navbar-mobile" isExpanded={isExpanded} onExpandedChange={setIsExpanded}>
          <Heading className="mezzanine-navbar-heading" level={2}>
            {/* Icon-only to leave room for actions; the tooltip shows the same name as aria-label. */}
            <TooltipTrigger>
              <Button ref={triggerRef} className="mezzanine-navbar-trigger" size="sm" aria-label={isExpanded ? closeLabel : menuLabel} iconLeading={isExpanded ? <CloseIcon /> : <MenuIcon />} slot="trigger" variant="secondary" />
              <Tooltip>{isExpanded ? closeLabel : menuLabel}</Tooltip>
            </TooltipTrigger>
          </Heading>
          <DisclosurePanel className="mezzanine-navbar-panel">{links(true)}</DisclosurePanel>
        </Disclosure>
        <div className="mezzanine-navbar-desktop">{links(false)}{actionGroup}</div>
      </div>
    </header>
  )
}
