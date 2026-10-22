import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, themes } from '../display'

// Checks, in each theme, that the arrow keys move between the toolbar's controls, the separator stands
// upright between the groups, and the page passes an accessibility scan and fits a phone at double text.
for (const theme of themes) {
  test(`toolbar moves between controls with the arrow keys in ${theme}`, async ({ page }) => {
    await page.goto('/toolbar')
    await setTheme(page, theme)
    const toolbar = page.getByRole('toolbar', { name: 'Toolbar A', exact: true })
    await toolbar.getByRole('radio', { name: 'Toggle A' }).focus()
    await page.keyboard.press('ArrowRight')
    await expect(toolbar.getByRole('radio', { name: 'Toggle B' })).toBeFocused()
    await page.keyboard.press('ArrowRight')
    await expect(toolbar.getByRole('button', { name: 'Action A' })).toBeFocused()
    await expect(toolbar.locator('.react-aria-Separator')).toHaveAttribute('aria-orientation', 'vertical')
    await expectNoAccessibilityViolations(page, 'main')
    await page.setViewportSize({ width: 320, height: 900 })
    await setTextSize(page, 32)
    await expectNoPageOverflow(page)
  })
}
