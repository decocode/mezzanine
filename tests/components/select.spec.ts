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
    // The example's Select, not the hierarchy control in the Properties panel.
    const trigger = page.locator('.mz-demo-block-area .mz-select-trigger')
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
    await expect(trigger).toContainText('Item B')
    await expect(trigger).toBeFocused()
    await expectNoAccessibilityViolations(page, 'main')
    await page.setViewportSize({ width: 320, height: 900 })
    await setTextSize(page, 32)
    await expectNoPageOverflow(page)
  })
}

// Checks the Example's Select with icons and valuePosition="iconOnly": its trigger shows only the chosen
// option's icon, and each option in the list has its icon before its name.
test('an iconOnly Select shows the chosen icon and option icons', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/select')
  const demo = page.locator('.mz-demo-block').first()
  await demo.locator('label', { hasText: /^icon$/ }).click()
  await demo.locator('label', { hasText: /^valuePosition$/ }).click()
  const trigger = demo.locator('.mz-demo-block-area .mz-select-trigger')
  await trigger.click()
  const options = page.getByRole('listbox').getByRole('option')
  for (const option of await options.all()) await expect(option.locator('.mz-list-box-item-icon svg')).toBeVisible()
  await options.first().click()
  await expect(trigger.locator('.mz-list-box-item-icon svg')).toBeVisible()
  expect((await trigger.locator('.mz-list-box-item-text').boundingBox())!.width).toBeLessThanOrEqual(1)
  // Scan once the list has faded out, so its half-faded text isn't measured.
  await expect(page.getByRole('listbox')).toHaveCount(0)
  await expectNoAccessibilityViolations(page, '.mz-demo-block')
})
