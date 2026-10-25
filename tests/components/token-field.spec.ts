import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, themes } from '../display'

// Checks, in each theme, that the tokens are drawn as tinted chips in a field with the text field's
// border, the field shows its focus ring, and the page passes an accessibility scan and fits a phone.
for (const theme of themes) {
  test(`token field shows its tokens in ${theme}`, async ({ page }) => {
    await page.goto('/token-field')
    await setTheme(page, theme)
    const input = page.locator('.mz-token-input')
    await expect(input.locator('.mz-token')).toHaveCount(2)
    await expect(input.locator('.mz-token').first()).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
    await expect(input).toHaveCSS('border-top-style', 'solid')
    await input.click()
    await expect(input).toHaveCSS('outline-style', 'solid')
    await expectNoAccessibilityViolations(page, 'main')
    await page.setViewportSize({ width: 320, height: 900 })
    await setTextSize(page, 32)
    await expectNoPageOverflow(page)
  })
}
