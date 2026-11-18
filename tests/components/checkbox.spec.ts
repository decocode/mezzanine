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

// Checks that a checkbox's error sits above its box, starting at the same edge, and its help text under
// it, lined up with its label text, and that screen readers read both with the checkbox.
test('checkbox error sits above the box and help text lines up with the label', async ({ page }) => {
  await page.goto('/checkbox')
  const demo = page.locator('.docs-page-lead .mz-demo-block')
  const panel = demo.locator('.mz-demo-block-end-panel')
  await panel.locator('label', { hasText: /^description$/ }).click()
  await panel.locator('label', { hasText: /^isInvalid$/ }).click()
  const content = demo.locator('.mz-demo-block-area')
  const checkbox = content.getByRole('checkbox', { name: 'Checkbox label' })
  await expect(checkbox).toHaveAccessibleDescription('Checkbox description Checkbox error message')
  await expect(content.locator('.mz-checkbox-field > *')).toHaveClass([/mz-field-error/, /mz-checkbox/, /mz-text/])
  const textStart = async (selector: string) => content.locator(selector).evaluate((element) => {
    const range = document.createRange()
    range.selectNodeContents(element.lastChild ?? element)
    return Math.round(range.getBoundingClientRect().left)
  })
  const boxStart = await content.locator('.mz-checkbox-indicator').evaluate((element) => Math.round(element.getBoundingClientRect().left))
  expect(await textStart('.mz-field-error')).toBe(boxStart)
  expect(await textStart('[slot="description"]')).toBe(await textStart('.mz-checkbox'))
})
