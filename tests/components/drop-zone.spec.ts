import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { setTheme, themes } from '../display'

// Checks, in each theme, that the drop zone is a dashed area that takes the focus ring from the
// keyboard, and passes an accessibility scan.
for (const theme of themes) {
  test(`drop zone shows its border and focus in ${theme}`, async ({ page }) => {
    await page.goto('/drop-zone')
    await setTheme(page, theme)
    const zone = page.locator('.react-aria-DropZone')
    await expect(zone).toHaveCSS('border-top-style', 'dashed')
    await zone.locator('button, [tabindex]').first().focus()
    await page.keyboard.press('Shift+Tab')
    await page.keyboard.press('Tab')
    await expect(zone).toHaveCSS('outline-style', 'solid')
    await expectNoAccessibilityViolations(page, 'main')
  })
}
