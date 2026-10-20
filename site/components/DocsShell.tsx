import { useState, useSyncExternalStore, type ReactNode } from 'react'
import { AppShell, Panel, TableOfContents, type NavTreeItemData } from '@decocode/mezzanine'
import { DocsContentsContext, DocsContentsStore } from './docsContentsContext'
import { NavigationPanel } from './Sidebar'
import { siteContent } from '../siteContent'

interface DocsShellProps {
  // The site Navbar, which renders the shell's <header>.
  navbar: ReactNode
  navigation: {
    title: string
    'aria-label': string
    navigationLabel: string
    items: NavTreeItemData[]
    selectedRoute: string
  }
  mainClassName?: string
  mainTabIndex?: number
  children: ReactNode
}

// The frame shared by docs and Lab pages: the library AppShell with the section's navigation in a start
// Panel and the page's sections in an end Panel. Both stay open; when there's no room beside the content,
// the Navbar menu offers the navigation and the sections sit inline after the page heading.
export function DocsShell({ navbar, navigation, mainClassName, mainTabIndex, children }: DocsShellProps) {
  const [contentsStore] = useState(() => new DocsContentsStore())
  const sections = useSyncExternalStore(contentsStore.subscribe, contentsStore.getSections, contentsStore.getSections)
  const { title, ...navigationProps } = navigation

  return (
    <DocsContentsContext.Provider value={contentsStore}>
      <AppShell className="docs-app-shell">
        {navbar}
        <Panel id="docs-navigation" edge="start" title={title} isCollapsible={false}>
          <NavigationPanel {...navigationProps} />
        </Panel>
        <main className={['site-content', mainClassName].filter(Boolean).join(' ')} id="main-content" tabIndex={mainTabIndex}>
          {children}
        </main>
        {sections && (
          <Panel id="docs-contents" edge="end" title={siteContent.docsContents.title} isCollapsible={false}>
            <TableOfContents aria-label={siteContent.docsContents.title} sections={sections} />
          </Panel>
        )}
      </AppShell>
    </DocsContentsContext.Provider>
  )
}
