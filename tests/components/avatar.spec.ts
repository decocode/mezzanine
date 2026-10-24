import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, textSizes, themes } from '../display'

// Checks that a named Avatar hides its picture and is read by its name, that one with no picture shows
// the name's initials, and that one with no visible name is an image named by alt.
test('Avatar is read by its name, shows initials without a picture, and names an unlabelled picture', async ({ page }) => {
  await page.goto('/avatar')
  const avatars = page.locator('main .mz-avatar')
  await expect(avatars).toHaveCount(4)
  await expect(avatars.nth(0).locator('.mz-avatar-picture')).toHaveAttribute('aria-hidden', 'true')
  await expect(avatars.nth(0).getByText('Avatar name', { exact: true })).toBeVisible()
  await expect(avatars.nth(1).locator('.mz-avatar-initials')).toHaveText('AI')
  await expect(avatars.nth(3).getByRole('img', { name: 'Avatar without a visible name' })).toBeVisible()
})

// Checks that the Avatar example fits 320px at normal and doubled text in every theme without
// accessibility problems.
for (const theme of themes) {
  test(`Avatar example fits 320px and passes accessibility checks in ${theme}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.goto('/avatar')
    await setTheme(page, theme)
    for (const size of textSizes) {
      await setTextSize(page, size)
      await expectNoPageOverflow(page)
    }
    await expectNoAccessibilityViolations(page, 'main')
  })
}
