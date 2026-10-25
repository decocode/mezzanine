import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, themes } from '../display'

// Checks, in each theme at 320px with double text size, that the Lab's Notice page shows its note, fits
// a phone screen and passes an accessibility scan.
for (const theme of themes) {
  test(`${theme} Lab Notice page fits 320px and passes a scan`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.goto('/site/lab/notice')
    await setTheme(page, theme)
    await setTextSize(page, 32)
    await expect(page.getByRole('note')).toHaveCount(1)
    await expect(page.getByRole('note')).toContainText('Notice G content.')
    await expectNoPageOverflow(page)
    await expectNoAccessibilityViolations(page, 'main')
  })
}

// Checks that a note's actions are reached in order with Tab, and that its icon stays hidden from
// screen readers.
test('Notice actions follow its content in the Tab order', async ({ page }) => {
  await page.goto('/site/lab/notice')
  const note = page.getByRole('note').filter({ hasText: 'Notice G content.' })
  await expect(note.locator('.mz-notice-icon')).toHaveAttribute('aria-hidden', 'true')
  const button = note.getByRole('button', { name: 'Button A' })
  await button.focus()
  await page.keyboard.press('Tab')
  await expect(note.getByRole('link', { name: 'Link A' })).toBeFocused()
})
