import { useState, useSyncExternalStore, type ReactNode } from 'react'
import { AppShell, Panel, TableOfContents, type NavTreeProps } from '@decocode/mezzanine'
import { DocsContentsContext, DocsContentsStore } from './docsContentsContext'
import { NavigationPanel } from './NavigationPanel'
import { siteContent } from '../siteContent'

interface DocsShellProps {
  // The site TopBar, which renders the shell's <header>.
  topBar: ReactNode
  navigation: {
    // Names the navigation Panel for screen readers; the TopBar already shows which section it is.
    title: string
    'aria-label': string
    navigationLabel: string
    items: NavTreeProps['items']
    selectedRoute: string
  }
  mainClassName?: string
  mainTabIndex?: number
  children: ReactNode
}

// The frame shared by docs and Lab pages: the library AppShell with the section's navigation in a start
// Panel and the page's sections in an end Panel. Both stay open; when there's no room beside the content,
// the TopBar menu offers the navigation and the sections sit inline after the page heading.
export function DocsShell({ topBar, navigation, mainClassName, mainTabIndex, children }: DocsShellProps) {
  const [contentsStore] = useState(() => new DocsContentsStore())
  const sections = useSyncExternalStore(contentsStore.subscribe, contentsStore.getSections, contentsStore.getSections)
  const { title, ...navigationProps } = navigation

  return (
    <DocsContentsContext.Provider value={contentsStore}>
      <AppShell className="docs-app-shell">
        {topBar}
        <Panel id="docs-navigation" edge="start" aria-label={title} isCollapsible={false}>
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
