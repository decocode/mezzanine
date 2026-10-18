// The shapes of the Lab's page content, shared by every page folder. Illustrative and unapproved.
import type { JSX } from 'react'

// What a page's introduction needs: its heading, an optional subtitle, and what it is and why it matters.
export interface LabIntro {
  id: string
  title: string
  subtitle?: string
  what: string
  why?: string
  // Further paragraphs after what and why, when a page needs more explanation.
  details?: readonly string[]
}

export interface LabSection extends LabIntro {
  // The page's address under /site/lab/layout/.
  slug: string
  // Only where support is worth knowing: not for features that work in every browser.
  support?: string
  // Pages for reusable Lab-only layout components credit where each idea comes from.
  similarTo?: SimilarTo[]
  // External sources for further reading, shown as References.
  references?: SimilarTo[]
}

// An emerging feature's page.
export interface FuturePage {
  key: string
  id: string
  title: string
  href: string
  references?: SimilarTo[]
}

// Lab pages that aren't specific to layout, kept at the top level of the Lab until they find a home,
// such as a future Themes experiment for Style priority.
export interface LabTopLevelPage extends LabIntro {
  href: string
  support?: string
  references?: SimilarTo[]
  // Other Lab or docs pages to read next, shown as Related pages.
  relatedPages?: SimilarTo[]
}

export type StageKey = 'boxBasics' | 'addSpace' | 'insideTheBox' | 'sideBySide' | 'oneBelowAnother' | 'gridFormation' | 'container'

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

// Where a layout component's idea comes from, linked on its page.
export interface SimilarTo {
  label: string
  href: string
}

// A page in one of the stages.
export interface StagePage extends LabIntro {
  key: string
  stage: StageKey
  href: string
  subtitle?: string
  // Only where support is worth knowing: not for features that work in every browser.
  support?: string
  // Pages for reusable Lab-only layout components credit where each idea comes from.
  similarTo?: SimilarTo[]
  // External sources for further reading, shown as References after any Similar to sources.
  references?: SimilarTo[]
  // Other Mezzanine pages to read next, shown as Related pages.
  relatedPages?: SimilarTo[]
  // What designers, engineers and other systems call the same thing, shown first in a closed Disclosure.
  alsoKnownAs?: readonly { where: string; called: string }[]
}

export interface CssNote {
  // Text between backticks is shown as inline code.
  paragraphs: string[]
  code: string
  // True when the code is an example for apps rather than the rules this page uses.
  isExample?: boolean
}

// Each stage page's examples, keyed by the page's key. Pages with several examples give each a
// third-level heading; pages with one put the CSS behind it under a third-level heading. A page can
// also show Mezzanine's own detail, such as the spacing scale, after its example in the Example section.
export type StageExamples = Record<string, { Example: () => JSX.Element; Detail?: () => JSX.Element }>
