import AxeBuilder from '@axe-core/playwright'
import { expect, type Page } from '@playwright/test'

// Mezzanine targets WCAG 2.2 Level AA, so every scan checks exactly those rules.
export const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']

export async function expectNoAccessibilityViolations(page: Page, ...selectors: string[]) {
  let scan = new AxeBuilder({ page }).withTags(wcagTags)
  for (const selector of selectors) scan = scan.include(selector)
  expect((await scan.analyze()).violations).toEqual([])
}
