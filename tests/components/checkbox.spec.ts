import { expect, test } from '@playwright/test'

// Checks that pressing a checkbox far down a long page keeps the page where it is. React Aria's
// hidden input must stay beside the checkbox, so focusing it doesn't scroll somewhere else.
test('pressing a checkbox keeps the scroll position', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/site/lab/layout/add-space/spacing')
  const checkbox = page.locator('label', { hasText: 'Group with space' })
  await checkbox.scrollIntoViewIfNeeded()
  const content = page.locator('.mz-app-shell-content')
  const before = await content.evaluate(element => element.scrollTop)
  await checkbox.click()
  await expect(checkbox.getByRole('checkbox')).toBeChecked()
  expect(await content.evaluate(element => element.scrollTop)).toBe(before)
  expect(await page.evaluate(() => document.documentElement.scrollTop)).toBe(0)
})
