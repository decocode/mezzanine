import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

// playwright.config.ts serves site-dist, so these also check production inclusion.
test('production lab links to width candidates and supports drag and keyboard resizing', async ({ page }) => {
  await page.setViewportSize({ width: 2400, height: 1400 })
  await page.goto('/introduction')
  await page.getByRole('navigation', { name: 'Showcase navigation', exact: true }).getByRole('link', { name: 'Lab', exact: true }).click()
  await expect(page).toHaveURL(/\/site\/lab$/)
  await page.getByRole('navigation', { name: 'Lab navigation', exact: true }).getByRole('link', { name: 'Page widths', exact: true }).click()
  await expect(page).toHaveURL(/\/site\/lab\/page-widths$/)
  await expect(page.getByRole('heading', { name: 'Page widths', exact: true })).toBeVisible()
  await expect(page.getByText('Illustrative candidates only. These widths are not approved and not part of Mezzanine.')).toBeVisible()
  const demo = page.getByRole('region', { name: 'Resizable page-width demonstration' })
  const readout = page.getByRole('status')
  const initialWidth = (await demo.boundingBox())!.width
  await expect(readout).toHaveText(`Demo area width: ${Math.round(initialWidth)} CSS px`)
  await expect(page.locator('.lab-grid-band')).toHaveCSS('max-width', '1216px')
  expect((await page.locator('.lab-grid-band').boundingBox())!.width).toBe(1216)
  const readingWidth = (await page.locator('.lab-reading-band').boundingBox())!.width
  expect(readingWidth).toBeLessThan(1216)
  expect((await page.locator('.lab-full-band').boundingBox())!.width).toBe(initialWidth)
  await page.screenshot({ path: 'test-results/page-widths-desktop.png' })
  const wideHeight = (await page.locator('.lab-reading-band').boundingBox())!.height
  const boxes = page.locator('.lab-width-placeholder').filter({ hasText: 'Placeholder' })
  expect((await boxes.nth(0).boundingBox())!.y).toBe((await boxes.nth(3).boundingBox())!.y)

  const narrower = page.getByRole('button', { name: 'Narrower', exact: true })
  await narrower.focus()
  await page.keyboard.press('Enter')
  await expect(narrower).toBeFocused()
  await expect(readout).toHaveText(`Demo area width: ${Math.round(initialWidth - 64)} CSS px`)
  await page.keyboard.press('Tab')
  await expect(page.getByRole('button', { name: 'Wider', exact: true })).toBeFocused()
  await page.keyboard.press('Space')
  await expect(readout).toHaveText(`Demo area width: ${Math.round(initialWidth)} CSS px`)

  await demo.scrollIntoViewIfNeeded()
  const bounds = (await demo.boundingBox())!
  await page.mouse.move(bounds.x + bounds.width - 3, bounds.y + bounds.height - 3)
  await page.mouse.down()
  await page.mouse.move(bounds.x + 300, bounds.y + bounds.height - 3, { steps: 12 })
  await page.mouse.up()
  await expect.poll(async () => (await demo.boundingBox())!.width).toBeLessThan(350)
  await expect(readout).toHaveText(`Demo area width: ${Math.round((await demo.boundingBox())!.width)} CSS px`)
  expect((await boxes.nth(3).boundingBox())!.y).toBeGreaterThan((await boxes.nth(0).boundingBox())!.y)
  expect((await page.locator('.lab-reading-band').boundingBox())!.height).toBeGreaterThan(wideHeight)
  await page.getByRole('button', { name: 'Use available width' }).click()
  await expect(readout).toHaveText(`Demo area width: ${Math.round(initialWidth)} CSS px`)
  await page.getByRole('link', { name: 'Lab index', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Lab', exact: true })).toBeVisible()
  await page.getByRole('navigation', { name: 'Lab navigation', exact: true }).getByRole('link', { name: 'Shell comparison' }).click()
  await expect(page.getByRole('heading', { name: 'A workspace with room around it.' })).toBeVisible()
  await page.getByRole('link', { name: 'Lab index', exact: true }).click()
  await page.getByRole('link', { name: 'Exit Lab', exact: true }).click()
  await expect(page).toHaveURL(/\/introduction$/)
})

for (const theme of ['light', 'dark', 'wireframe']) {
  for (const fontSize of [16, 32]) {
    test(`width demo reflows at 320px with ${theme} theme and ${fontSize}px text`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 800 })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/site/lab/page-widths')
      await expect(page.getByRole('heading', { name: 'Page widths', exact: true })).toBeVisible()
      await page.evaluate(({ theme, fontSize }) => {
        document.documentElement.dataset.theme = theme
        document.documentElement.style.fontSize = `${fontSize}px`
      }, { theme, fontSize })
      await page.getByRole('button', { name: 'Narrower', exact: true }).click()
      await page.getByRole('button', { name: 'Wider', exact: true }).click()
      await page.getByRole('button', { name: 'Use available width' }).click()
      for (const selector of ['html', '.lab-page-main', '.lab-width-demo']) {
        expect(await page.locator(selector).evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true)
      }
      await expect(page.getByRole('main')).toHaveCSS('scroll-behavior', 'auto')
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
      await page.screenshot({ path: `test-results/page-widths-${theme}-${fontSize}.png` })
    })
  }
}
