import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, demoThemeSelect, themes } from '../display'

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

// Checks DemoBlock's theme Select, which uses valuePosition="iconOnly": its trigger shows only the chosen
// theme's icon, screen readers still hear the theme and "Demo theme", a tooltip shows "Demo theme" on
// hover, and each option in the list has its icon before its name.
test('an iconOnly Select shows the chosen icon, a tooltip and option icons', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/select')
  await page.mouse.move(0, 500)
  const demo = page.locator('.mz-demo-block').first()
  const trigger = demoThemeSelect(demo)
  await expect(trigger).toHaveAccessibleName(/^(Light|Dark|Wireframe) Demo theme$/)
  await expect(trigger.locator('.mz-list-box-item-icon svg')).toBeVisible()
  expect((await trigger.locator('.mz-list-box-item-text').boundingBox())!.width).toBeLessThanOrEqual(1)
  await trigger.hover()
  await expect(page.getByRole('tooltip', { name: 'Demo theme', exact: true })).toBeVisible()
  await trigger.click()
  const options = page.getByRole('listbox').getByRole('option')
  await expect(options).toHaveCount(3)
  for (const option of await options.all()) await expect(option.locator('.mz-list-box-item-icon svg')).toBeVisible()
  await page.getByRole('option', { name: 'Dark', exact: true }).click()
  await expect(demo.locator('.mz-demo-block-area')).toHaveAttribute('data-theme', 'dark')
  await expectNoAccessibilityViolations(page, '.mz-demo-block')
})
