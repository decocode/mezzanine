import { useEffect, useState } from 'react'
import { PageHeading, Link } from '@decocode/mezzanine'
import { MezzanineNavbar } from './components/MezzanineNavbar'
import { Sidebar } from './components/Sidebar'
import { PageLoader } from './PageLoader'
import { findSitePage, type SitePageDefinition } from './siteStructure'
import { applyTheme, storeTheme, type Theme } from './themeSwitcherLogic'

interface AppShellProps {
  initialTheme: Theme
}

function LandingPage() {
  return (
    <main className="landing-page" id="main-content">
      <section className="landing-hero" aria-labelledby="landing-heading">
        <p className="mz-text-label-lg section-label">Design system by DecoCode Ltd</p>
        <h1 id="landing-heading" className="landing-wordmark mz-text-display-md mz-text-emphasis">
          <span aria-hidden="true" className="site-logo landing-hero-logo" />
          <span className="landing-wordmark-name">Mezzanine</span>
        </h1>
        <p className="mz-text-body-lg landing-hero-description">
          An accessible React Aria design system with neutral defaults that products can theme.
        </p>
        <Link className="landing-primary-cta" href="/introduction">Read docs</Link>
      </section>
    </main>
  )
}

function EmptyPage({ page }: { page: SitePageDefinition }) {
  return (
    <>
      <PageHeading
        title={page.label}
      />
      <p className="mz-text-body-md empty-page-status">Not implemented</p>
    </>
  )
}

function NotFoundPage() {
  return (
    <main className="not-found-page" id="main-content">
      <PageHeading title="Page not found" />
      <Link href="/">Return to Mezzanine</Link>
    </main>
  )
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
        <title>Page not found | Mezzanine</title>
        <MezzanineNavbar
          currentPath={currentPath}
          onThemeChange={setSelectedTheme}
          selectedTheme={selectedTheme}
        />
        <NotFoundPage />
      </>
    )
  }

  if (currentPage.id === 'home') {
    return (
      <>
        <title>Mezzanine</title>
        <Link className="skip-link" href="#main-content">Skip to main content</Link>
        <MezzanineNavbar
          currentPath={currentPath}
          onThemeChange={setSelectedTheme}
          selectedTheme={selectedTheme}
        />
        <LandingPage />
      </>
    )
  }

  return (
    <>
      <title>{`${currentPage.label} | Mezzanine`}</title>
      <Link className="skip-link" href="#main-content">Skip to main content</Link>
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
            : <EmptyPage page={currentPage} />}
        </main>
      </div>
    </>
  )
}
