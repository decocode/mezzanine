import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { setTheme, themes } from '../display'

// Checks, in each theme, that the button opens the popover as a raised surface with its dialog,
// Escape closes it and focus returns to the button.
for (const theme of themes) {
  test(`popover opens and closes in ${theme}`, async ({ page }) => {
    await page.goto('/popover')
    await setTheme(page, theme)
    const trigger = page.getByRole('button', { name: 'Popover trigger', exact: true })
    await trigger.click()
    const popover = page.locator('.react-aria-Popover')
    await expect(popover.getByRole('dialog')).toBeVisible()
    await expect(popover).toHaveCSS('border-top-style', 'solid')
    await expectNoAccessibilityViolations(page, '.react-aria-Popover')
    await page.keyboard.press('Escape')
    await expect(popover).toBeHidden()
    await expect(trigger).toBeFocused()
  })
}
