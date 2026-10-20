import { useCallback, useContext } from 'react'
import { TableOfContents, type TableOfContentsProps } from '@decocode/mezzanine'
import { DocsContentsContext } from './docsContentsContext'

// The page's section links sit inline after its heading on narrower screens. The page also hands its
// sections to the shell, which shows them in its end Panel when there's room; CSS then hides this copy.
export function DocsTableOfContents(props: TableOfContentsProps) {
  const store = useContext(DocsContentsContext)
  // Keyed by content, so a re-render with the same sections doesn't register again.
  const sectionsKey = JSON.stringify(props.sections)
  const register = useCallback((element: HTMLDivElement | null) => {
    if (!element || !store) return
    store.setSections(JSON.parse(sectionsKey))
    return () => store.setSections(null)
  }, [store, sectionsKey])

  if (props.sections.length === 0) return null

  return (
    <div className="docs-contents-inline" ref={register}>
      <TableOfContents {...props} heading="On this page" />
    </div>
  )
}
