import { expect, test } from '@playwright/test'
import { chooseSiteTheme, siteThemeSelect } from '../display'
import AxeBuilder from '@axe-core/playwright'

// On narrow screens, the Lab uses the site's own TopBar menu: Docs, then Lab, then the Lab's
// navigation tree, with Layout under its Foundations header.
for (const fontSize of [16, 32]) {
  test(`Lab navigation works from the site menu at 320px and ${fontSize}px text`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/site/lab')
    await page.evaluate(size => { document.documentElement.style.fontSize = `${size}px` }, fontSize)
    await expect(page.getByRole('heading', { name: 'Lab', exact: true, level: 1 })).toBeVisible()
    await expect(page.getByRole('banner')).toHaveCount(1)
    const primaryNav = page.getByRole('navigation', { name: 'Primary', exact: true })
    const menu = page.getByRole('banner').getByRole('button', { name: 'Menu', exact: true })
    await menu.click()
    await expect(primaryNav.getByRole('link', { name: 'Lab', exact: true })).toHaveAttribute('aria-current', 'page')
    const tree = page.getByRole('banner').getByRole('treegrid', { name: 'Lab experiments' })
    await expect(tree).toBeVisible()
    await expect(page.getByRole('banner').getByRole('treegrid', { name: 'Index' })).toHaveCount(0)
    // The menu reads Docs, then Lab, then Search, then the Lab tree.
    await primaryNav.getByRole('link', { name: 'Docs', exact: true }).focus()
    await page.keyboard.press('Tab')
    await expect(primaryNav.getByRole('link', { name: 'Lab', exact: true })).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(page.getByRole('banner').getByRole('button', { name: 'Search docs', exact: true })).toBeFocused()
    await page.keyboard.press('Tab')
    expect(await page.evaluate(() => document.activeElement?.closest('header [role="treegrid"]') != null)).toBe(true)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
    await tree.getByRole('link', { name: 'Layout', exact: true }).click()
    await expect(page).toHaveURL(/\/site\/lab\/layout$/)
    await expect(page.getByRole('heading', { name: 'Layout', exact: true, level: 1 })).toBeVisible()
    await menu.click()
    await expect(primaryNav.getByRole('link', { name: 'Lab', exact: true })).toHaveAttribute('aria-current', 'true')
  })
}

// On wide screens, the Lab tree sits in the same start Panel as the docs navigation, and the
// saved theme carries between Docs and Lab.
test('Lab shares the docs frame and the saved theme with Docs', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/site/lab')
  await expect(page.getByRole('banner')).toHaveCount(1)
  const navigation = page.locator('.mz-panel[data-edge="start"]')
  await expect(navigation.getByRole('treegrid', { name: 'Lab experiments' })).toBeVisible()
  await chooseSiteTheme(page, 'Dark')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await navigation.getByRole('link', { name: 'Layout', exact: true }).click()
  await expect(page).toHaveURL(/\/site\/lab\/layout$/)
  await expect(siteThemeSelect(page)).toContainText('Dark')
  await chooseSiteTheme(page, 'Wireframe')
  await page.reload()
  await expect(siteThemeSelect(page)).toContainText('Wireframe')
  await chooseSiteTheme(page, 'Light')
  await page.getByRole('navigation', { name: 'Primary', exact: true }).getByRole('link', { name: 'Docs', exact: true }).click()
  await expect(page).toHaveURL(/\/introduction$/)
  await expect(siteThemeSelect(page)).toContainText('Light')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
})
