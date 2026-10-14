import { lazy, Suspense, useEffect, useState } from 'react'
import { Link } from '@decocode/mezzanine'
import { MezzanineNavbar } from './components/MezzanineNavbar'
import { ThemeSwitcher } from './components/ThemeSwitcher'
import { Sidebar } from './components/Sidebar'
import { DocsContentsContext } from './components/docsContentsContext'
import { PageLoader } from './PageLoader'
import NotFoundPage from './pages/NotFoundPage'
import NotImplementedPage from './pages/NotImplementedPage'
import { siteContent } from './content/siteContent'
import { findSitePage } from './siteStructure'
import { applyTheme, storeTheme, type Theme } from './themeSwitcherLogic'

const LabPage = lazy(() => import('./lab/LabPage'))

interface AppShellProps {
  initialTheme: Theme
}

export function AppShell({ initialTheme }: AppShellProps) {
  const [contentsHost, setContentsHost] = useState<HTMLDivElement | null>(null)
  const [selectedTheme, setSelectedTheme] = useState(initialTheme)
  const [systemPreferenceVersion, setSystemPreferenceVersion] = useState(0)
  const currentPath = window.location.pathname === '/'
    ? '/'
    : window.location.pathname.replace(/\/$/, '')
  const currentPage = findSitePage(currentPath)

  useEffect(() => {
    applyTheme(selectedTheme)
    storeTheme(selectedTheme)
  }, [selectedTheme])

  useEffect(() => {
    if (selectedTheme !== 'system') return

    const devicePreference = window.matchMedia('(prefers-color-scheme: dark)')
    const updateSystemPreference = () => {
      setSystemPreferenceVersion((currentVersion) => currentVersion + 1)
    }

    devicePreference.addEventListener('change', updateSystemPreference)
    return () => devicePreference.removeEventListener('change', updateSystemPreference)
  }, [selectedTheme])

  const refreshKey = `${selectedTheme}-${systemPreferenceVersion}`

  if (currentPath === '/site/lab' || currentPath === '/site/lab/shell' || currentPath === '/site/lab/page-widths') return <Suspense fallback={<p role="status">Loading lab…</p>}><LabPage currentPath={currentPath} themeSwitcher={<ThemeSwitcher onThemeChange={setSelectedTheme} selectedTheme={selectedTheme} />} /></Suspense>

  if (!currentPage) {
    return (
      <>
        <title>{`${siteContent.notFound.title} | ${siteContent.name}`}</title>
        <MezzanineNavbar
          currentPath={currentPath}
          onThemeChange={setSelectedTheme}
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
          onThemeChange={setSelectedTheme}
          selectedTheme={selectedTheme}
        />
        <main className="landing-page" id="main-content">
          <PageLoader page={currentPage} refreshKey={refreshKey} />
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
        onThemeChange={setSelectedTheme}
        selectedTheme={selectedTheme}
      />
      <DocsContentsContext.Provider value={contentsHost}>
        <div className="site-layout">
          <Sidebar currentPage={currentPage} />
          <main className="site-content" id="main-content">
            {currentPage.status === 'implemented'
              ? <PageLoader page={currentPage} refreshKey={refreshKey} />
              : <NotImplementedPage title={currentPage.label} />}
          </main>
          <div className="site-contents-sidebar" ref={setContentsHost} />
        </div>
      </DocsContentsContext.Provider>
    </>
  )
}
