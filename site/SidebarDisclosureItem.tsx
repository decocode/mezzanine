import type { ReactNode } from 'react'
import { Button, Disclosure, DisclosurePanel, Heading } from 'react-aria-components'

interface SidebarDisclosureItemProps {
  children: ReactNode
  id: string
  title: string
}

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
      className="sidebar-disclosure-chevron"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 20 20"
    >
      <path d="m5 7.5 5 5 5-5" />
    </svg>
  )
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
          <ChevronDownIcon />
        </Button>
      </Heading>
      <DisclosurePanel className="sidebar-disclosure-panel">
        {children}
      </DisclosurePanel>
    </Disclosure>
  )
}
