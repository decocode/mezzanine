import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, themes } from '../display'

// Checks that a Group joins its input and button into one box, with the focus ring round the whole
// group, and that Tab still reaches each part.
test('Group joins its parts and rings them all on focus', async ({ page }) => {
  await page.goto('/group')
  const group = page.locator('.mz-demo-area .mz-group')
  const input = page.getByRole('textbox', { name: 'Input A' })
  const button = group.getByRole('button', { name: 'Button A' })
  const inputBox = (await input.boundingBox())!
  const buttonBox = (await button.boundingBox())!
  expect(buttonBox.x).toBeLessThan(inputBox.x + inputBox.width)
  await input.focus()
  await expect(group).toHaveCSS('outline-style', 'solid')
  await expect(input).toHaveCSS('outline-style', 'none')
  await page.keyboard.press('Tab')
  await expect(button).toBeFocused()
})

// Checks, in each theme at 320px with double text size, that the Group fits and passes a scan.
for (const theme of themes) {
  test(`${theme} Group fits 320px and passes a scan`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.goto('/group')
    await setTheme(page, theme)
    await setTextSize(page, 32)
    await expect(page.locator('.mz-demo-area .mz-group')).toBeVisible()
    await expectNoPageOverflow(page)
    await expectNoAccessibilityViolations(page, 'main')
  })
}
