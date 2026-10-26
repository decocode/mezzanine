import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { setTheme, themes } from '../display'

// Checks that pressing a checkbox far down a long page keeps the page where it is. React Aria's
// hidden input must stay beside the checkbox, so focusing it doesn't scroll somewhere else.
test('pressing a checkbox keeps the scroll position', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/checkbox')
  // The Checkbox group demo, below the fold.
  const checkbox = page.locator('.mz-checkbox-group label', { hasText: 'Checkbox C' })
  await checkbox.scrollIntoViewIfNeeded()
  const content = page.locator('.mz-app-shell-content')
  const before = await content.evaluate(element => element.scrollTop)
  await checkbox.click()
  await expect(checkbox.getByRole('checkbox')).toBeChecked()
  expect(await content.evaluate(element => element.scrollTop)).toBe(before)
  expect(await page.evaluate(() => document.documentElement.scrollTop)).toBe(0)
})

// Checks that the Checkbox page passes an accessibility scan in each theme.
for (const theme of themes) {
  test(`/checkbox passes an accessibility scan in ${theme}`, async ({ page }) => {
    await page.goto('/checkbox')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await setTheme(page, theme)
    await expectNoAccessibilityViolations(page, 'main')
  })
}
