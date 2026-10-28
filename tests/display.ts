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

// The site's ThemeSwitcher in the top bar, a menu button named "Switch theme".
export const siteThemeSwitcher = (page: Page) => page.getByRole('banner').getByRole('button', { name: 'Switch theme', exact: true }).filter({ visible: true }).first()

export async function chooseSiteTheme(page: Page, label: 'Light' | 'Dark' | 'Wireframe') {
  await siteThemeSwitcher(page).click()
  await page.getByRole('menuitemradio', { name: label, exact: true }).click()
}

// A DemoBlock's ThemeSwitcher, inside the given demo block, which shows the chosen theme's icon.
export const demoThemeSelect = (demo: Locator) => demo.getByRole('button', { name: 'Switch demo theme', exact: true }).first()

export async function chooseDemoTheme(page: Page, demo: Locator, label: 'Light' | 'Dark' | 'Wireframe') {
  await demoThemeSelect(demo).click()
  await page.getByRole('menuitemradio', { name: label, exact: true }).click()
}
