import { useEffect, useState } from 'react'
import { Link } from '@decocode/mezzanine'
import { MezzanineNavbar } from './components/MezzanineNavbar'
import { Sidebar } from './components/Sidebar'
import { PageLoader } from './PageLoader'
import NotFoundPage from './pages/NotFoundPage'
import NotImplementedPage from './pages/NotImplementedPage'
import { siteContent } from './content/siteContent'
import { findSitePage } from './siteStructure'
import { applyTheme, storeTheme, type Theme } from './themeSwitcherLogic'

interface AppShellProps {
  initialTheme: Theme
}

export function AppShell({ initialTheme }: AppShellProps) {
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
      <div className="site-layout">
        <Sidebar currentPage={currentPage} />
        <main className="site-content" id="main-content">
          {currentPage.status === 'implemented'
            ? <PageLoader page={currentPage} refreshKey={refreshKey} />
            : <NotImplementedPage title={currentPage.label} />}
        </main>
      </div>
    </>
  )
}
