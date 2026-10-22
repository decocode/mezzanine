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

// Checks that a Card with href is one link with a hidden arrow, that keyboard focus shows
// a ring on it and that pressing Enter follows it.
test('a Card with href is one link that keyboard users can follow', async ({ page }) => {
  await page.goto('/dimension')
  const card = page.locator('main a.mz-card', { has: page.getByRole('heading', { name: 'Width', level: 3 }) })
  await expect(card).toHaveCount(1)
  await expect(card).toHaveAttribute('href', '/dimension/width')
  await expect(card.getByRole('link')).toHaveCount(0)
  await expect(card.locator('.mz-card-arrow')).toHaveAttribute('aria-hidden', 'true')
  await card.focus()
  await page.keyboard.press('Shift+Tab')
  await page.keyboard.press('Tab')
  await expect(card).toHaveAttribute('data-focus-visible', 'true')
  expect(await card.evaluate(element => getComputedStyle(element).outlineStyle)).toBe('solid')
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/\/dimension\/width$/)
  await expectNoAccessibilityViolations(page, 'main')
})
