import { lazy, Suspense, useState } from 'react'
import { Link } from '@decocode/mezzanine'
import { MezzanineNavbar } from './components/MezzanineNavbar'
import { Sidebar } from './components/Sidebar'
import { DocsContentsContext } from './components/docsContentsContext'
import { PageLoader } from './PageLoader'
import NotFoundPage from './pages/not-found/NotFoundPage'
import NotImplementedPage from './pages/not-implemented/NotImplementedPage'
import { siteContent } from './siteContent'
import { findSitePage } from './siteStructure'
import { applyTheme, storeTheme, type Theme } from './themeSwitcherLogic'

const LabPage = lazy(() => import('./lab/LabPage'))

interface AppShellProps {
  initialTheme: Theme
}

export function AppShell({ initialTheme }: AppShellProps) {
  const [contentsHost, setContentsHost] = useState<HTMLDivElement | null>(null)
  const [selectedTheme, setSelectedTheme] = useState(initialTheme)
  const currentPath = window.location.pathname === '/'
    ? '/'
    : window.location.pathname.replace(/\/$/, '')
  const currentPage = findSitePage(currentPath)

  // Apply the theme before React renders, so components reading CSS see it.
  function changeTheme(theme: Theme) {
    applyTheme(theme)
    storeTheme(theme)
    setSelectedTheme(theme)
  }

  // The Lab entry decides which Lab page to show, including its own not-found page.
  if (currentPath === '/site/lab' || currentPath.startsWith('/site/lab/')) return <Suspense fallback={<p role="status">Loading lab…</p>}><LabPage currentPath={currentPath} onThemeChange={changeTheme} selectedTheme={selectedTheme} /></Suspense>

  if (!currentPage) {
    return (
      <>
        <title>{`${siteContent.notFound.title} | ${siteContent.name}`}</title>
        <MezzanineNavbar
          currentPath={currentPath}
          onThemeChange={changeTheme}
          selectedTheme={selectedTheme}
        />
        <main className="not-found-page" id="main-content">
          <NotFoundPage />
        </main>
      </>
    )
  }

  if (currentPage.id === 'home') {
    return (
      <>
        <title>{siteContent.name}</title>
        <Link className="skip-link" href="#main-content">{siteContent.skipLink}</Link>
        <MezzanineNavbar
          currentPath={currentPath}
          onThemeChange={changeTheme}
          selectedTheme={selectedTheme}
        />
        <main className="landing-page" id="main-content">
          <PageLoader page={currentPage} />
        </main>
      </>
    )
  }

  return (
    <>
      <title>{`${currentPage.label} | ${siteContent.name}`}</title>
      <Link className="skip-link" href="#main-content">{siteContent.skipLink}</Link>
      <MezzanineNavbar
        currentPath={currentPath}
        onThemeChange={changeTheme}
        selectedTheme={selectedTheme}
      />
      <DocsContentsContext.Provider value={contentsHost}>
        <div className="site-layout">
          <Sidebar currentPage={currentPage} />
          <main className="site-content" id="main-content">
            {currentPage.status === 'implemented'
              ? <PageLoader page={currentPage} />
              : <NotImplementedPage title={currentPage.label} />}
          </main>
          <div className="site-contents-sidebar" ref={setContentsHost} />
        </div>
      </DocsContentsContext.Provider>
    </>
  )
}
