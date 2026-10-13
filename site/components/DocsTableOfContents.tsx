import { useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { PanelRightOpenIcon, Sidebar, SidebarPanel, SidebarTrigger, TableOfContents, type TableOfContentsProps } from '@decocode/mezzanine'
import { DocsContentsContext } from './docsContentsContext'

// The same section links occupy the desktop right column or a narrow-screen drawer.
export function DocsTableOfContents(props: TableOfContentsProps) {
  const host = useContext(DocsContentsContext)
  const [isOpen, setOpen] = useState(false)
  if (!host || props.sections.length === 0) return null

  return createPortal(
    <Sidebar isCollapsible={false} inlineMediaQuery="(min-width: 80rem)" isOpen={isOpen} onOpenChange={setOpen}>
      <SidebarTrigger iconLeading={<PanelRightOpenIcon />} variant="secondary">On this page</SidebarTrigger>
      <SidebarPanel title="On this page" side="right" hideInlineHeader className="docs-contents-panel">
        <div onClickCapture={(event) => {
          if (!event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
            && event.target instanceof Element && event.target.closest('a[href^="#"]')) setOpen(false)
        }}>
          <TableOfContents {...props} heading="On this page" />
        </div>
      </SidebarPanel>
    </Sidebar>, host,
  )
}
