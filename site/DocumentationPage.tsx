import { Component, Suspense, useEffect, type ReactNode } from 'react'
import { Button } from '@decocode/mezzanine'
import { documentationPages } from './documentationPages'
import { PageHeading } from './PageHeading'
import type { SitePageDefinition } from './siteNavigation'

class PageLoadBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <PageHeading title="Unable to load this page" />
          <p role="alert">Reload the page to try again.</p>
          <Button onPress={() => window.location.reload()}>Reload page</Button>
        </>
      )
    }
    return this.props.children
  }
}

function LoadedPage({ pageId, refreshKey }: { pageId: string; refreshKey: string }) {
  const Page = documentationPages[pageId]

  useEffect(() => {
    // A direct section link may arrive before the page's chunk and heading exist.
    const frame = requestAnimationFrame(() => {
      let id: string
      try {
        id = decodeURIComponent(window.location.hash.slice(1))
      } catch {
        return
      }
      if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
    })
    return () => cancelAnimationFrame(frame)
  }, [pageId])

  return <Page refreshKey={refreshKey} />
}

export function DocumentationPage({ page, refreshKey }: {
  page: SitePageDefinition
  refreshKey: string
}) {
  return (
    <PageLoadBoundary key={page.id}>
      <Suspense fallback={
        <>
          <PageHeading title={page.label} />
          <p role="status">Loading documentation…</p>
        </>
      }>
        <LoadedPage pageId={page.id} refreshKey={refreshKey} />
      </Suspense>
    </PageLoadBoundary>
  )
}
