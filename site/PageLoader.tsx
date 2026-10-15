// This component finds the requested page in pageRegistry.ts and displays it.
// It shows a loading message while the page downloads, or an error with a reload
// button if something goes wrong. Once the page loads, it also scrolls to the
// requested section when the URL includes a section link, such as #navbar-anatomy.

import { Component, Suspense, useEffect, type ReactNode } from 'react'
import { Button } from '@decocode/mezzanine'
import { PageHeading } from './templates/ComponentPageTemplate'
import { pageRegistry } from './pageRegistry'
import type { SitePageDefinition } from './siteStructure'

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

function LoadedPage({ pageId }: { pageId: string }) {
  const Page = pageRegistry[pageId]

  useEffect(() => {
    // A direct section link may arrive before the page's chunk and heading exist.
    // Arriving on a page jumps straight to the section rather than animating from the top.
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

  return <Page />
}

export function PageLoader({ page }: { page: SitePageDefinition }) {
  return (
    <PageLoadBoundary key={page.id}>
      <Suspense fallback={
        <>
          <PageHeading title={page.label} />
          <p role="status">Loading documentation…</p>
        </>
      }>
        <LoadedPage pageId={page.id} />
      </Suspense>
    </PageLoadBoundary>
  )
}
