import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, themes } from '../display'

// Checks, in each theme, that the keyboard opens the list as wide as the field, the arrow keys and
// Enter choose an option, focus returns to the trigger, and the page passes an accessibility scan and
// fits a phone at double text size.
for (const theme of themes) {
  test(`select chooses an option from the keyboard in ${theme}`, async ({ page }) => {
    await page.goto('/select')
    await setTheme(page, theme)
    const trigger = page.locator('.mz-select-trigger')
    await trigger.focus()
    await expect(trigger).toHaveCSS('outline-style', 'solid')
    await page.keyboard.press('Enter')
    const list = page.getByRole('listbox')
    await expect(list).toBeVisible()
    const popover = (await page.locator('.mz-popover').boundingBox())!
    expect(Math.abs(popover.width - (await trigger.boundingBox())!.width)).toBeLessThan(2)
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await expect(list).toBeHidden()
    await expect(trigger).toContainText('Option B')
    await expect(trigger).toBeFocused()
    await expectNoAccessibilityViolations(page, 'main')
    await page.setViewportSize({ width: 320, height: 900 })
    await setTextSize(page, 32)
    await expectNoPageOverflow(page)
  })
}
