import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'

// Checks that a horizontal separator draws its line along the top and a vertical one along its start,
// stretching to the row, and the page passes an accessibility scan.
test('separators draw a line in each orientation', async ({ page }) => {
  await page.goto('/separator')
  const horizontal = page.locator('.mz-separator').first()
  await expect(horizontal).toHaveCSS('border-top-style', 'solid')
  const vertical = page.locator('.mz-separator[aria-orientation="vertical"]')
  await expect(vertical).toHaveCSS('border-left-style', 'solid')
  expect((await vertical.boundingBox())!.height).toBeGreaterThan(10)
  await expectNoAccessibilityViolations(page, 'main')
})
