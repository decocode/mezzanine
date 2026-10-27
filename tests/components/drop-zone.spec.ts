import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { setTheme, themes } from '../display'

// Checks, in each theme, that the drop zone is a dashed area that takes the focus ring from the
// keyboard, stacks its icon, label and button, and passes an accessibility scan.
for (const theme of themes) {
  test(`drop zone shows its border and focus in ${theme}`, async ({ page }) => {
    await page.goto('/drop-zone')
    await setTheme(page, theme)
    const zone = page.locator('.mz-drop-zone')
    await expect(zone).toHaveCSS('border-top-style', 'dashed')
    await zone.locator('button, [tabindex]').first().focus()
    await page.keyboard.press('Shift+Tab')
    await page.keyboard.press('Tab')
    await expect(zone).toHaveCSS('outline-style', 'solid')
    // Its content stacks: the icon above the label, the label above the help text and button.
    const icon = (await zone.locator('svg').boundingBox())!
    const label = (await zone.locator('[slot="label"]').boundingBox())!
    const button = (await zone.getByRole('button', { name: 'Button' }).boundingBox())!
    expect(label.y).toBeGreaterThan(icon.y + icon.height - 1)
    expect(button.y).toBeGreaterThan(label.y + label.height - 1)
    await expectNoAccessibilityViolations(page, 'main')
  })
}
