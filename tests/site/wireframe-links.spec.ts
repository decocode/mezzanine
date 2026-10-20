import { expect, test } from '@playwright/test'

for (const path of ['/', '/navigation-tree', '/link', '/navbar', '/tabs', '/breadcrumbs']) {
  test(`Wireframe underlines text links except the wordmark and button-style links on ${path}`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('mezzanine-theme', 'wireframe'))
    await page.setViewportSize({ width: 320, height: 900 })
    await page.goto(path)
    await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByText('Loading documentation…', { exact: true })).toHaveCount(0)
    for (const fontSize of [16, 32]) {
      await page.evaluate(size => document.documentElement.style.fontSize = `${size}px`, fontSize)
      const missingUnderlines = await page.locator('a, [role="link"]').evaluateAll(elements => elements
        .filter(element => !element.matches('.site-name, .react-aria-Button'))
        .filter(element => !getComputedStyle(element).textDecorationLine.includes('underline'))
        .map(element => element.textContent))
      expect(missingUnderlines).toEqual([])
      await expect(page.getByRole('link', { name: 'Mezzanine home', exact: true })).toHaveCSS('text-decoration-line', 'none')
      if (path === '/') {
        const readDocs = page.getByRole('link', { name: 'Read docs', exact: true })
        await expect(readDocs).toHaveCSS('text-decoration-line', 'none')
        await readDocs.hover()
        await expect(readDocs).toHaveCSS('text-decoration-line', 'none')
        await readDocs.focus()
        await expect(readDocs).toHaveCSS('text-decoration-line', 'none')
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)
    }
  })
}

test('NavigationTree links retain underlines through hover and keyboard focus in Wireframe only', async ({ page }) => {
  await page.goto('/navigation-tree')
  const tree = page.getByRole('treegrid', { name: 'Nav Tree items', exact: true })
  const link = tree.getByRole('link', { name: 'Apples', exact: true })
  for (const theme of ['light', 'dark', 'wireframe']) {
    await page.evaluate(theme => document.documentElement.dataset.theme = theme, theme)
    await link.hover()
    expect(await link.evaluate(element => getComputedStyle(element).textDecorationLine)).toBe(theme === 'wireframe' ? 'underline' : 'none')
    await page.keyboard.press('Tab')
    await link.focus()
    expect(await link.evaluate(element => getComputedStyle(element).textDecorationLine)).toBe(theme === 'wireframe' ? 'underline' : 'none')
  }
})
