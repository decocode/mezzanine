import { expect, type Locator, type Page } from '@playwright/test'

export const themes = ['light', 'dark', 'wireframe'] as const
// Normal text and the 200% text size that WCAG reflow requires.
export const textSizes = [16, 32] as const

export async function setTheme(page: Page, theme: string) {
  await page.evaluate(theme => { document.documentElement.dataset.theme = theme }, theme)
}

export async function setTextSize(page: Page, fontSize: number) {
  await page.evaluate(fontSize => { document.documentElement.style.fontSize = `${fontSize}px` }, fontSize)
}

// Retries until layout settles, so a late reflow cannot make the check flaky.
export async function expectNoPageOverflow(page: Page) {
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0)
}

// The site's theme Select in the top bar, which shows the chosen theme.
export const siteThemeSelect = (page: Page) => page.getByRole('banner').getByRole('button', { name: /^(Light|Dark|Wireframe) Theme$/ }).filter({ visible: true }).first()

export async function chooseSiteTheme(page: Page, label: 'Light' | 'Dark' | 'Wireframe') {
  await siteThemeSelect(page).click()
  await page.getByRole('option', { name: label, exact: true }).click()
}

// A DemoArea's theme Select, inside the given demo area, which shows the chosen theme's icon.
export const demoThemeSelect = (demo: Locator) => demo.getByRole('button', { name: /^(Light|Dark|Wireframe) Demo theme$/ }).first()

export async function chooseDemoTheme(page: Page, demo: Locator, label: 'Light' | 'Dark' | 'Wireframe') {
  await demoThemeSelect(demo).click()
  await page.getByRole('option', { name: label, exact: true }).click()
}
