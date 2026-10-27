import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { setTheme, themes } from '../display'

// Checks, in each theme, that the button opens the menu in a popover, the arrow keys highlight items,
// Escape closes it and returns focus, and the open menu passes an accessibility scan.
for (const theme of themes) {
  test(`menu opens and closes from the keyboard in ${theme}`, async ({ page }) => {
    await page.goto('/menu')
    await setTheme(page, theme)
    const trigger = page.getByRole('button', { name: 'Menu trigger', exact: true })
    await trigger.focus()
    await page.keyboard.press('Enter')
    const menu = page.getByRole('menu')
    await expect(menu).toBeVisible()
    await expect(menu.getByRole('menuitem').first()).toBeFocused()
    await page.keyboard.press('ArrowDown')
    const second = menu.getByRole('menuitem', { name: 'Action B', exact: true })
    await expect(second).toBeFocused()
    await expect(second).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
    await expectNoAccessibilityViolations(page, '[role="menu"]')
    await page.keyboard.press('Escape')
    await expect(menu).toBeHidden()
    await expect(trigger).toBeFocused()
  })
}

// Checks that in a menu with selection, the chosen item shows a tick and the others don't.
test('a selectable menu ticks the chosen item', async ({ page }) => {
  await page.goto('/menu')
  await page.locator('.docs-page-lead .mz-demo-block-end-panel').getByRole('button', { name: /selectionMode/ }).click()
  await page.getByRole('option', { name: 'single', exact: true }).click()
  await page.getByRole('button', { name: 'Menu trigger', exact: true }).click()
  await page.getByRole('menuitemradio', { name: 'Action A' }).click()
  await page.getByRole('button', { name: 'Menu trigger', exact: true }).click()
  const menu = page.getByRole('menu')
  await expect(menu.getByRole('menuitemradio', { name: 'Action A' })).toHaveAttribute('aria-checked', 'true')
  await expect(menu.locator('.mz-menu-item-check svg')).toHaveCount(1)
})
