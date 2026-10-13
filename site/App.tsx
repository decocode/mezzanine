import { useEffect, useState } from 'react'
import { Link } from '@decocode/mezzanine'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { PageHeading } from './PageHeading'
import { DocumentationPage } from './DocumentationPage'
import { findSitePage, type SitePageDefinition } from './siteNavigation'
import { applyThemeSelection, storeThemeSelection, type ThemeSelection } from './themeSelection'

interface AppProps {
  initialThemeSelection: ThemeSelection
}

function LandingPage() {
  return (
    <main className="landing-page" id="main-content">
      <section className="landing-hero" aria-labelledby="landing-heading">
        <p className="mz-text-label-lg section-label">Design system by DecoCode</p>
        <h1 id="landing-heading" className="mz-text-display-md mz-text-emphasis">Mezzanine</h1>
        <p className="mz-text-body-lg landing-hero-description">
          An accessible React Aria design system with neutral defaults that products can theme.
        </p>
        <Link className="landing-primary-cta" href="/introduction">Documentation</Link>
      </section>
    </main>
  )
}

function EmptyPage({ page }: { page: SitePageDefinition }) {
  return (
    <>
      <PageHeading
        reactAriaPage={page.reactAriaPage}
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

export function App({ initialThemeSelection }: AppProps) {
  const [themeSelection, setThemeSelection] = useState(initialThemeSelection)
  const [systemPreferenceVersion, setSystemPreferenceVersion] = useState(0)
  const currentPath = window.location.pathname === '/'
    ? '/'
    : window.location.pathname.replace(/\/$/, '')
  const currentPage = findSitePage(currentPath)

  useEffect(() => {
    applyThemeSelection(themeSelection)
    storeThemeSelection(themeSelection)
  }, [themeSelection])

  useEffect(() => {
    if (themeSelection !== 'system') return

    const devicePreference = window.matchMedia('(prefers-color-scheme: dark)')
    const updateSystemPreference = () => {
      setSystemPreferenceVersion((currentVersion) => currentVersion + 1)
    }

    devicePreference.addEventListener('change', updateSystemPreference)
    return () => devicePreference.removeEventListener('change', updateSystemPreference)
  }, [themeSelection])

  const refreshKey = `${themeSelection}-${systemPreferenceVersion}`

  if (!currentPage) {
    return (
      <>
        <title>Page not found | Mezzanine</title>
        <Header
          currentPath={currentPath}
          onThemeSelectionChange={setThemeSelection}
          themeSelection={themeSelection}
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
        <Header
          currentPath={currentPath}
          onThemeSelectionChange={setThemeSelection}
          themeSelection={themeSelection}
        />
        <LandingPage />
      </>
    )
  }

  return (
    <>
      <title>{`${currentPage.label} | Mezzanine`}</title>
      <Link className="skip-link" href="#main-content">Skip to main content</Link>
      <Header
        currentPath={currentPath}
        onThemeSelectionChange={setThemeSelection}
        themeSelection={themeSelection}
      />
      <div className="site-layout">
        <Sidebar currentPage={currentPage} />
        <main className="site-content" id="main-content">
          {currentPage.status === 'implemented'
            ? <DocumentationPage page={currentPage} refreshKey={refreshKey} />
            : <EmptyPage page={currentPage} />}
        </main>
      </div>
    </>
  )
}
