import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'

// Checks that a horizontal separator draws its line along the top and a vertical one along its start,
// stretching to the row, and the page passes an accessibility scan.
test('separators draw a line in each orientation', async ({ page }) => {
  await page.goto('/separator')
  const demo = page.locator('.docs-page-lead .mz-demo-block-area')
  const horizontal = demo.locator('.mz-separator')
  await expect(horizontal).toHaveCSS('border-top-style', 'solid')
  // The Example's orientation control turns it upright.
  await page.locator('.docs-page-lead .mz-demo-block-end-panel').getByRole('button', { name: /orientation/ }).click()
  await page.getByRole('option', { name: 'vertical', exact: true }).click()
  const vertical = demo.locator('.mz-separator[aria-orientation="vertical"]')
  await expect(vertical).toHaveCSS('border-left-style', 'solid')
  expect((await vertical.boundingBox())!.height).toBeGreaterThan(10)
  await expectNoAccessibilityViolations(page, 'main')
})
