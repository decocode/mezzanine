import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, textSizes, themes } from '../display'

// Checks that a named Avatar hides its picture and is read by its name, that one with no picture shows
// the name's initials, and that one with no visible name is an image named by alt.
test('Avatar is read by its name, shows initials without a picture, and names an unlabelled picture', async ({ page }) => {
  await page.goto('/avatar')
  const avatar = page.locator('.docs-page-lead .mz-demo-block-area .mz-avatar')
  const toggle = (name: string) => page.locator('.docs-page-lead .mz-demo-block-end-panel label', { hasText: new RegExp(`^${name}$`) }).click()
  await expect(avatar.locator('.mz-avatar-picture')).toHaveAttribute('aria-hidden', 'true')
  await expect(avatar.getByText('Avatar name', { exact: true })).toBeVisible()
  await toggle('src')
  await expect(avatar.locator('.mz-avatar-initials')).toHaveText('AN')
  await toggle('src')
  await toggle('children')
  await expect(avatar.getByRole('img', { name: 'Avatar without a visible name' })).toBeVisible()
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
