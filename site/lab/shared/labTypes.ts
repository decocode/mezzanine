// The shapes of the Lab's page content, shared by every page folder. Illustrative and unapproved.
import type { JSX } from 'react'
import type { DocsPageContent } from '../../templates/docsPageContent'

// A Lab page's content: the docs site's shared page shape, so ContentPage builds Lab and Docs pages
// alike, plus its address in the Lab. A candidate component's page follows the component page pattern.
export interface LabPage extends DocsPageContent {
  readonly href: string
}

// An emerging feature's page. Its key finds its example.
export interface FuturePage extends LabPage {
  readonly key: string
}

// A page in Layout. Its key finds its examples; its description is also its Card's text.
export interface LayoutChildPage extends LabPage {
  readonly key: string
}

export type { CssNote } from '../../components/ExampleParts'

// Each Layout page's examples, keyed by the page's key. Pages with several examples give each a
// third-level heading; pages with one put the CSS behind it under a third-level heading. A page can
// also show Mezzanine's own detail, such as the spacing scale, after its example in the Example section.
export type LayoutExamples = Record<string, { Example: () => JSX.Element; Detail?: () => JSX.Element }>
