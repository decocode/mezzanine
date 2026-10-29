import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, themes } from '../display'

// Checks that the ThemeSwitcher's button, named "Change theme", opens a menu headed "Theme" with a tick
// by the current theme, applies the chosen theme to the example, and closes again.
test('ThemeSwitcher chooses a theme from its menu', async ({ page }) => {
  await page.goto('/theme-switcher')
  const example = page.locator('.theme-switcher-example')
  const button = example.getByRole('button', { name: 'Change theme', exact: true })
  await button.click()
  const items = page.getByRole('menuitemradio')
  await expect(items).toHaveCount(4)
  await expect(page.getByRole('menu').getByText('Theme', { exact: true })).toBeVisible()
  await expect(page.getByRole('menuitemradio', { name: 'Light', exact: true })).toHaveAttribute('aria-checked', 'true')
  await page.getByRole('menuitemradio', { name: 'Dark', exact: true }).click()
  await expect(page.getByRole('menu')).toHaveCount(0)
  await expect(example).toHaveAttribute('data-theme', 'dark')
  await expect(button).toBeFocused()
  await button.click()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('menu')).toHaveCount(0)
  await expect(example).toHaveAttribute('data-theme', 'dark')
})

// Checks that System says which theme the device shows, such as "System (Dark)", follows a change to
// the device's setting, and gives the example data-theme="system".
test('ThemeSwitcher System names the theme the device shows', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/theme-switcher')
  const example = page.locator('.theme-switcher-example')
  await example.getByRole('button').click()
  await page.getByRole('menuitemradio', { name: 'System (Dark)', exact: true }).click()
  await expect(example).toHaveAttribute('data-theme', 'system')
  await example.getByRole('button').click()
  await expect(page.getByRole('menuitemradio', { name: 'System (Dark)', exact: true })).toHaveAttribute('aria-checked', 'true')
  await page.getByRole('menuitemradio', { name: 'System (Dark)', exact: true }).click()
  await expect(page.getByRole('menu')).toHaveCount(0)
  await page.emulateMedia({ colorScheme: 'light' })
  await example.getByRole('button').click()
  await expect(page.getByRole('menuitemradio', { name: 'System (Light)', exact: true })).toBeVisible()
})

// Checks that iconPosition="leading" shows the theme as text beside the icon.
test('ThemeSwitcher shows its name as text with iconPosition leading', async ({ page }) => {
  await page.goto('/theme-switcher')
  const demo = page.locator('.mz-demo-block').first()
  await demo.getByRole('button', { name: /iconPosition/ }).click()
  await page.getByRole('option', { name: 'leading', exact: true }).click()
  await expect(demo.locator('.theme-switcher-example').getByRole('button')).toHaveText('Change theme')
})

// Checks the page in each theme and size, at 320px, with an open menu, against an accessibility scan.
for (const theme of themes) {
  test(`${theme} ThemeSwitcher passes a scan and fits 320px`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 })
    await page.goto('/theme-switcher')
    await setTheme(page, theme)
    await setTextSize(page, 32)
    await expectNoPageOverflow(page)
    await setTextSize(page, 16)
    await page.locator('.theme-switcher-example').getByRole('button').click()
    await expect(page.getByRole('menu')).toBeVisible()
    await expectNoAccessibilityViolations(page, 'main')
    await expectNoAccessibilityViolations(page, '.mz-popover')
  })
}
