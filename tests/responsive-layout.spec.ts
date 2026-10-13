import { expect, test } from '@playwright/test'

for (const fontSize of [16, 32]) {
  for (const width of [320, 767, 768, 1024, 1440, 1536]) {
    test(`Elevation fits ${width}px with ${fontSize}px root text`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/elevation')
      await expect(page.getByRole('heading', { name: 'Elevation', exact: true })).toBeVisible()
      await page.evaluate((size) => {
        document.documentElement.style.fontSize = `${size}px`
      }, fontSize)

      await expect(page.locator('.elevation-role-card')).toHaveCount(5)
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width)
      expect(await page.locator('.elevation-role-card').evaluateAll((cards) => (
        cards.every((card) => card.scrollWidth <= card.clientWidth)
      ))).toBe(true)

      const browse = page.getByRole('button', { name: 'Browse sections', exact: true })
      if (width < 48 * fontSize) {
        await expect(browse).toBeVisible()
        await browse.focus()
        await page.keyboard.press('Enter')
        await expect(browse).toHaveAttribute('aria-expanded', 'true')
        await expect(page.getByRole('treegrid', { name: 'Mezzanine documentation' })).toBeVisible()
        await page.keyboard.press('Enter')
        await expect(browse).toHaveAttribute('aria-expanded', 'false')
        await expect(browse).toBeFocused()
      } else {
        await expect(browse).toBeHidden()
        await expect(page.getByRole('treegrid', { name: 'Mezzanine documentation' })).toBeVisible()
      }
    })
  }
}
