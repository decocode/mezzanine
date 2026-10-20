import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, textSizes, themes } from '../display'

// Checks that the Card example is a plain container (no role of its own) with its heading,
// text and action inside, and that it fits a 320px screen at normal and doubled text in every
// theme without accessibility problems.
for (const theme of themes) {
  test(`Card example fits 320px and passes accessibility checks in ${theme}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.goto('/card')
    await setTheme(page, theme)
    const card = page.locator('main .mz-card')
    await expect(card).toHaveCount(1)
    await expect(card).not.toHaveAttribute('role')
    await expect(card.getByRole('heading', { name: 'Card title', level: 3 })).toBeVisible()
    await expect(card.getByRole('button', { name: 'Action', exact: true })).toBeVisible()
    for (const size of textSizes) {
      await setTextSize(page, size)
      await expectNoPageOverflow(page)
      expect(await card.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true)
    }
    await expectNoAccessibilityViolations(page, 'main .mz-card')
  })
}
