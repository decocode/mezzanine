import { expect, test } from '@playwright/test'

// Checks that the link to the section being read is marked as the current location as the page scrolls,
// with the current-page bar, and that it reaches the last section at the end of the page.
test('Table of contents follows the section being read', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 800 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/button')
  const contents = page.getByRole('complementary').getByRole('navigation', { name: 'On this page' })
  const current = contents.locator('[aria-current="location"]')
  await expect(current).toHaveText('Example')
  const content = page.locator('.mz-app-shell-content')
  await page.locator('#button-sizes').evaluate((element) => element.scrollIntoView({ block: 'start' }))
  await expect(current).toHaveText('Button sizes')
  expect(await current.evaluate((element) => Number.parseFloat(getComputedStyle(element, '::before').width))).toBeGreaterThan(0)
  await content.evaluate((element) => { element.scrollTop = element.scrollHeight })
  await expect(current).toHaveText('References')
})
