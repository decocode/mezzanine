import type { ReactNode } from 'react'
import { ChevronDownIcon } from '@decocode/mezzanine'
import { Button, Disclosure, DisclosurePanel, Heading } from 'react-aria-components'

interface SidebarDisclosureItemProps {
  children: ReactNode
  id: string
  title: string
}

export function SidebarDisclosureItem({
  children,
  id,
  title,
}: SidebarDisclosureItemProps) {
  return (
    <Disclosure className="sidebar-disclosure" id={id}>
      <Heading className="sidebar-disclosure-heading" level={2}>
        <Button className="sidebar-disclosure-trigger" slot="trigger">
          {title}
          <ChevronDownIcon className="sidebar-disclosure-chevron" />
        </Button>
      </Heading>
      <DisclosurePanel className="sidebar-disclosure-panel">
        {children}
      </DisclosurePanel>
    </Disclosure>
  )
}
