import { expect, test } from '@playwright/test'
import { siteThemeSwitcher } from '../display'
import AxeBuilder from '@axe-core/playwright'

test('mobile navigation opens from the TopBar menu and retains expanded groups', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/button')
  await expect(page.getByText('Loading documentation…', { exact: true })).toHaveCount(0)
  await page.evaluate(() => { document.documentElement.style.fontSize = '32px' })
  const browse = page.getByRole('banner').getByRole('button', { name: /^(Menu|Close menu)$/ })
  await browse.focus()
  await page.keyboard.press('Enter')
  const tree = page.getByRole('treegrid', { name: 'Index' })
  await expect(tree).toBeVisible()
  const input = tree.getByRole('button', { name: 'Forms and options', exact: true })
  await input.click()
  await expect(tree.getByRole('link', { name: 'Text field', exact: true })).toBeVisible()
  await browse.click()
  await browse.click()
  await expect(tree.getByRole('link', { name: 'Text field', exact: true })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)
})

for (const theme of ['light', 'dark', 'wireframe']) {
  test(`${theme} site TopBar distinguishes the current documentation section`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/tooltip')
    await page.evaluate(theme => document.documentElement.dataset.theme = theme, theme)
    const docsLink = page.getByRole('navigation', { name: 'Primary', exact: true }).getByRole('link', { name: 'Documentation', exact: true })
    await expect(docsLink).toHaveAttribute('aria-current', 'true')
    // The current section's link has a soft tint, with its indicator bar along the bottom inside it.
    expect(await docsLink.evaluate(element => {
      const bar = getComputedStyle(element, '::after')
      return bar.content !== 'none' && bar.backgroundColor !== 'rgba(0, 0, 0, 0)' && Number.parseFloat(bar.height) > 0 && Number.parseFloat(bar.bottom) > 0 && getComputedStyle(element).backgroundColor !== 'rgba(0, 0, 0, 0)'
    })).toBe(true)
    if (theme === 'wireframe') {
      expect(await docsLink.evaluate(element => getComputedStyle(element).textDecorationLine)).toBe('underline')
    }
    for (const fontSize of [16, 32]) {
      await page.setViewportSize({ width: 320, height: 900 })
      await page.evaluate(size => document.documentElement.style.fontSize = `${size}px`, fontSize)
      const menu = page.getByRole('banner').getByRole('button', { name: 'Menu', exact: true })
      await menu.click()
      await expect(docsLink).toBeVisible()
      await expect(siteThemeSwitcher(page)).toBeVisible()
      await expect(page.getByRole('banner').getByRole('treegrid', { name: 'Index' })).toBeVisible()
      // The menu reads Home, then Docs, then the docs tree, then Lab, then Search.
      await page.keyboard.press('Tab')
      await expect(page.getByRole('navigation', { name: 'Primary', exact: true }).getByRole('link', { name: 'Home', exact: true })).toBeFocused()
      await page.keyboard.press('Tab')
      await expect(docsLink).toBeFocused()
      expect(await docsLink.evaluate(element => getComputedStyle(element).outlineStyle)).toBe('solid')
      await page.keyboard.press('Tab')
      expect(await page.evaluate(() => document.activeElement?.closest('header [role="treegrid"]') != null)).toBe(true)
      await page.keyboard.press('Tab')
      const labLink = page.getByRole('navigation', { name: 'Primary', exact: true }).getByRole('link', { name: 'Lab', exact: true })
      await expect(labLink).toBeFocused()
      await page.keyboard.press('Tab')
      await expect(page.getByRole('banner').locator('.mz-search-trigger').filter({ visible: true })).toBeFocused()
      await labLink.focus()
      await expect(labLink).toHaveAttribute('href', '/site/lab')
      expect(await labLink.evaluate(element => getComputedStyle(element).outlineStyle)).toBe('solid')
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)
      expect((await new AxeBuilder({ page }).include('header').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([])
      await page.getByRole('banner').screenshot({ path: `reports/test-results/site-top-bar-current-${theme}-${fontSize}.png` })
      await page.getByRole('banner').getByRole('button', { name: 'Close menu', exact: true }).click()
    }
    await page.emulateMedia({ forcedColors: 'active' })
    await page.getByRole('banner').getByRole('button', { name: 'Menu', exact: true }).click()
    // In forced colours the bar keeps the system's Highlight colour.
    expect(await docsLink.evaluate(element => getComputedStyle(element, '::after').forcedColorAdjust)).toBe('none')
  })
}

test('site TopBar leaves Docs inactive on the landing page and unknown routes', async ({ page }) => {
  for (const path of ['/', '/not-a-page']) {
    await page.goto(path)
    await page.evaluate(() => document.documentElement.dataset.theme = 'wireframe')
    const docsLink = page.getByRole('navigation', { name: 'Primary', exact: true }).getByRole('link', { name: 'Documentation', exact: true })
    await expect(docsLink).not.toHaveAttribute('aria-current')
    // The Home link comes before Docs and Lab, and marks the landing page as current.
    const homeNavLink = page.getByRole('navigation', { name: 'Primary', exact: true }).getByRole('link', { name: 'Home', exact: true })
    await expect(homeNavLink).toHaveAttribute('href', '/')
    if (path === '/') await expect(homeNavLink).toHaveAttribute('aria-current', 'page')
    else await expect(homeNavLink).not.toHaveAttribute('aria-current')
    expect(await docsLink.evaluate(element => getComputedStyle(element).textDecorationLine)).toBe('underline')
    expect(await docsLink.evaluate(element => getComputedStyle(element, '::after').content)).toBe('none')
  }
})
