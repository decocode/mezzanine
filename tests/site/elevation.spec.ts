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

      await expect(page.locator('.elevation-levels > li')).toHaveCount(5)
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width)
      expect(await page.locator('.elevation-levels > li').evaluateAll((levels) => (
        levels.every((level) => level.scrollWidth <= level.clientWidth)
      ))).toBe(true)

      const browse = page.getByRole('banner').getByRole('button', { name: /^(Menu|Close menu)$/ })
      // TopBar uses its menu when it's narrow, or when the navigation Panel is hidden for lack of room,
      // so the navigation is always reachable.
      // The TopBar switches on the width inside its own padding, as its container query measures it.
      const barWidth = await page.locator('.mz-top-bar').evaluate((element) => {
        const style = getComputedStyle(element)
        return element.clientWidth - parseFloat(style.paddingInlineStart) - parseFloat(style.paddingInlineEnd)
      })
      const panelShowing = await page.getByRole('complementary').getByRole('treegrid', { name: 'Mezzanine documentation' }).isVisible()
      if (barWidth < 32 * fontSize || !panelShowing) {
        await expect(browse).toBeVisible()
        await browse.focus()
        await page.keyboard.press('Enter')
        await expect(browse).toHaveAttribute('aria-expanded', 'true')
        await expect(page.getByRole('banner').getByRole('treegrid', { name: 'Mezzanine documentation' })).toBeVisible()
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
