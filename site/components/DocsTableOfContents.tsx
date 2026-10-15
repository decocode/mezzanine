import { useContext } from 'react'
import { createPortal } from 'react-dom'
import { Sidebar, SidebarPanel, TableOfContents, type TableOfContentsProps } from '@decocode/mezzanine'
import { DocsContentsContext } from './docsContentsContext'

// The same section links appear inline after the page heading on narrower
// screens and in the right column on wide screens. CSS shows one copy at a time.
export function DocsTableOfContents(props: TableOfContentsProps) {
  const host = useContext(DocsContentsContext)
  if (!host || props.sections.length === 0) return null

  return (
    <>
      <div className="docs-contents-inline">
        <TableOfContents {...props} heading="On this page" />
      </div>
      {createPortal(
        <Sidebar isCollapsible={false} presentation="inline">
          <SidebarPanel title="On this page" side="right" hideInlineHeader className="docs-contents-panel">
            <TableOfContents {...props} heading="On this page" />
          </SidebarPanel>
        </Sidebar>, host,
      )}
    </>
  )
}
