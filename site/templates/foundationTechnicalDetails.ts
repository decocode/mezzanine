import type { ReactNode } from 'react'
import type { DocumentationSection, DocumentationSectionGroup } from './ComponentPageTemplate'

// The shared Technical details set for Foundations and Styles pages. Every page
// uses the same titles in the same order and leaves out sections that do not apply.
const foundationTechnicalDetailTitles = {
  cssProperties: 'CSS properties',
  tokens: 'Tokens',
  // Styles pages only: Foundations do not change with the theme, which the Foundations page explains.
  theming: 'Theming',
  accessibility: 'Accessibility',
  localisation: 'Localisation',
} as const

export type FoundationTechnicalDetails = Partial<Record<keyof typeof foundationTechnicalDetailTitles, ReactNode>>

export function foundationTechnicalDetailsGroup(pageId: string, details: FoundationTechnicalDetails): DocumentationSectionGroup {
  const sections: DocumentationSection[] = []
  for (const [key, title] of Object.entries(foundationTechnicalDetailTitles)) {
    const content = details[key as keyof FoundationTechnicalDetails]
    if (content == null) continue
    sections.push({ id: `${pageId}-${key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}`, title, content })
  }
  return { id: `${pageId}-technical-details`, title: 'Technical details', sections }
}
