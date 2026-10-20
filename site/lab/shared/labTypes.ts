// The shapes of the Lab's page content, shared by every page folder. Illustrative and unapproved.
import type { JSX } from 'react'
import type { DocsPageContent } from '../../templates/docsPageContent'

// A Lab page's content: the docs site's shared page shape, so ContentPage builds Lab and Docs pages
// alike, plus its address in the Lab.
export interface LabPage extends DocsPageContent {
  readonly kind: 'foundation'
  readonly href: string
}

// An emerging feature's page. Its key finds its example.
export interface FuturePage extends LabPage {
  readonly key: string
}

export type StageKey = 'boxBasics' | 'addSpace' | 'insideTheBox' | 'sideBySide' | 'gridsAndColumns' | 'container'

// A Layout group: a set of pages with an overview page of its own.
export interface LayoutStage {
  key: StageKey
  id: string
  // The stage's address under /site/lab/layout/.
  slug: string
  title: string
  summary: string
  // The heading above the stage's Cards, when it isn't the usual "Pages".
  pagesHeading?: string
}

// A page in one of the stages. Its key finds its examples; its description is also its Card's text.
export interface StagePage extends LabPage {
  readonly key: string
  readonly stage: StageKey
}

export interface CssNote {
  // Copy with `code`, **strong** and [label](href) markers, like the page's content.
  paragraphs: string[]
  code: string
  // True when the code is an example for apps rather than the rules this page uses.
  isExample?: boolean
}

// Each stage page's examples, keyed by the page's key. Pages with several examples give each a
// third-level heading; pages with one put the CSS behind it under a third-level heading. A page can
// also show Mezzanine's own detail, such as the spacing scale, after its example in the Example section.
export type StageExamples = Record<string, { Example: () => JSX.Element; Detail?: () => JSX.Element }>
