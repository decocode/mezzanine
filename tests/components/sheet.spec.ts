import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { setTheme, themes } from '../display'

// Checks, in each theme, that the button opens the sheet as a dialog with its title and handle over a
// dimmed backdrop, the close button closes it, and focus returns to the trigger.
for (const theme of themes) {
  test(`sheet opens and closes in ${theme}`, async ({ page }) => {
    await page.goto('/sheet')
    await setTheme(page, theme)
    const trigger = page.getByRole('button', { name: 'Sheet trigger', exact: true })
    await trigger.click()
    const sheet = page.getByRole('dialog', { name: 'Sheet title' })
    await expect(sheet).toBeVisible()
    await expect(page.locator('.mz-sheet-handle')).toBeVisible()
    await expect(page.locator('.mz-sheet-backdrop')).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
    await expectNoAccessibilityViolations(page, '.mz-sheet')
    // The close button is pressed from the keyboard, so the test needn't wait for the sheet's scroll to settle.
    await sheet.getByRole('button', { name: 'Close', exact: true }).focus()
    await page.keyboard.press('Enter')
    await expect(sheet).toBeHidden()
    await expect(trigger).toBeFocused()
  })
}
