import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, themes } from '../display'

// Checks, in each theme, that the arrow keys and the plus and minus buttons change the value, the
// buttons share the input's height, and the page passes an accessibility scan and fits a phone at
// double text size.
for (const theme of themes) {
  test(`number field steps its value in ${theme}`, async ({ page }) => {
    await page.goto('/number-field')
    await setTheme(page, theme)
    const input = page.getByRole('textbox', { name: 'Number field A', exact: true })
    await input.focus()
    await page.keyboard.press('ArrowUp')
    await expect(input).toHaveValue('5')
    await page.getByRole('button', { name: /Increase/ }).click()
    await expect(input).toHaveValue('6')
    await page.getByRole('button', { name: /Decrease/ }).click()
    await expect(input).toHaveValue('5')
    const inputBox = (await input.boundingBox())!
    const buttonBox = (await page.locator('.mz-number-field-step').first().boundingBox())!
    expect(Math.abs(inputBox.height - buttonBox.height)).toBeLessThan(2)
    await expectNoAccessibilityViolations(page, 'main')
    await page.setViewportSize({ width: 320, height: 900 })
    await setTextSize(page, 32)
    await expectNoPageOverflow(page)
  })
}
