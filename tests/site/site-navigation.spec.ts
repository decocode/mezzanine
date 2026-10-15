import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('mobile navigation opens from the Navbar menu and retains expanded groups', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/button')
  await expect(page.getByText('Loading documentation…', { exact: true })).toHaveCount(0)
  await page.evaluate(() => { document.documentElement.style.fontSize = '32px' })
  const browse = page.getByRole('banner').getByRole('button', { name: /^(Menu|Close menu)$/ })
  await browse.focus()
  await page.keyboard.press('Enter')
  const tree = page.getByRole('treegrid', { name: 'Mezzanine documentation' })
  await expect(tree).toBeVisible()
  const forms = tree.getByRole('button', { name: 'Forms and input', exact: true })
  await forms.click()
  await expect(tree.getByRole('link', { name: 'Checkbox', exact: true })).toBeVisible()
  await browse.click()
  await browse.click()
  await expect(tree.getByRole('link', { name: 'Checkbox', exact: true })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)
})

for (const theme of ['light', 'dark', 'wireframe']) {
  test(`${theme} site Navbar distinguishes the current documentation section`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/tooltip')
    await page.evaluate(theme => document.documentElement.dataset.theme = theme, theme)
    const wordmark = page.getByRole('link', { name: 'Mezzanine home', exact: true })
    // The brand area is a flex container, so the link's inline-flex computes as flex.
    await expect(wordmark).toHaveCSS('display', 'flex')
    await expect(wordmark).toHaveCSS('font-weight', '700')
    const neutralText = await page.locator('body').evaluate(element => getComputedStyle(element).color)
    await expect(wordmark).toHaveCSS('color', neutralText)
    await wordmark.hover()
    await expect(wordmark).toHaveCSS('color', neutralText)
    await expect(wordmark).toHaveCSS('text-decoration-line', 'none')
    const docsLink = page.getByRole('navigation', { name: 'Showcase navigation', exact: true }).getByRole('link', { name: 'Docs', exact: true })
    await expect(docsLink).toHaveAttribute('aria-current', 'true')
    expect(await docsLink.evaluate(element => {
      const style = getComputedStyle(element)
      return style.borderBottomColor !== 'rgba(0, 0, 0, 0)' && Number.parseFloat(style.borderBottomWidth) > 0 && style.backgroundColor === 'rgba(0, 0, 0, 0)'
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
      await expect(page.getByRole('banner').getByRole('radiogroup', { name: 'Theme', exact: true })).toBeVisible()
      await expect(page.getByRole('banner').getByRole('treegrid', { name: 'Mezzanine documentation' })).toBeVisible()
      await expect(page.getByRole('navigation', { name: 'Showcase navigation', exact: true }).getByRole('link', { name: 'Home', exact: true })).toHaveCount(0)
      // The menu reads Docs, then the docs tree, then Lab.
      await page.keyboard.press('Tab')
      await expect(docsLink).toBeFocused()
      expect(await docsLink.evaluate(element => getComputedStyle(element).outlineStyle)).toBe('solid')
      await page.keyboard.press('Tab')
      expect(await page.evaluate(() => document.activeElement?.closest('header [role="treegrid"]') != null)).toBe(true)
      await page.keyboard.press('Tab')
      const labLink = page.getByRole('navigation', { name: 'Showcase navigation', exact: true }).getByRole('link', { name: 'Lab', exact: true })
      await expect(labLink).toBeFocused()
      await expect(labLink).toHaveAttribute('href', '/site/lab')
      expect(await labLink.evaluate(element => getComputedStyle(element).outlineStyle)).toBe('solid')
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)
      expect((await new AxeBuilder({ page }).include('header').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([])
      await page.getByRole('banner').screenshot({ path: `reports/test-results/site-navbar-current-${theme}-${fontSize}.png` })
      await page.getByRole('banner').getByRole('button', { name: 'Close menu', exact: true }).click()
    }
    await page.emulateMedia({ forcedColors: 'active' })
    await page.getByRole('banner').getByRole('button', { name: 'Menu', exact: true }).click()
    expect(await docsLink.evaluate(element => getComputedStyle(element).borderBottomStyle)).toBe('solid')
  })
}

test('site Navbar leaves Docs inactive on the landing page and unknown routes', async ({ page }) => {
  for (const path of ['/', '/not-a-page']) {
    await page.goto(path)
    await page.evaluate(() => document.documentElement.dataset.theme = 'wireframe')
    const docsLink = page.getByRole('navigation', { name: 'Showcase navigation', exact: true }).getByRole('link', { name: 'Docs', exact: true })
    await expect(docsLink).not.toHaveAttribute('aria-current')
    const homeLink = page.getByRole('link', { name: 'Mezzanine home', exact: true })
    await expect(homeLink).toHaveAttribute('href', '/')
    if (path === '/') await expect(homeLink).toHaveAttribute('aria-current', 'page')
    else await expect(homeLink).not.toHaveAttribute('aria-current')
    expect(await docsLink.evaluate(element => getComputedStyle(element).textDecorationLine)).toBe('underline')
    expect(await docsLink.evaluate(element => getComputedStyle(element).borderBottomColor)).toBe('rgba(0, 0, 0, 0)')
  }
})
