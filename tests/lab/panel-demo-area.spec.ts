import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize } from '../display'

// The Lab's candidate Panel and demo area. Illustrative and unapproved.

// Checks that a collapsible Panel collapses and expands from a toggle outside it, which stays visible
// and says whether the Panel is expanded, and that minimizable and collapsible switch each other off.
test('a collapsible Lab Panel collapses from a toggle outside it', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/site/lab/panel-demo-area')
  const demo = page.locator('.lab-demo-area').first()
  const properties = demo.locator('.lab-demo-area-properties')
  await properties.locator('label', { hasText: /^isMinimizable$/ }).click()
  await properties.locator('label', { hasText: /^isCollapsible$/ }).click()
  await expect(properties.getByRole('switch', { name: 'isMinimizable' })).not.toBeChecked()
  const panel = demo.getByRole('region', { name: 'Panel A' })
  const toggle = demo.getByRole('button', { name: /^(Collapse|Expand) Panel A$/ })
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await toggle.click()
  await expect(toggle).toHaveAccessibleName('Expand Panel A')
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await expect(panel).toBeHidden()
  await toggle.click()
  await expect(panel).toBeVisible()
  // Let the toggle's tooltip fade out before the scan.
  await page.mouse.move(0, 0)
  await expect(page.getByRole('tooltip')).toHaveCount(0)
  await expectNoAccessibilityViolations(page, 'main')
})

// Checks that a resizable side Panel's edge moves with the arrow keys and Home. The width eases to its
// new size, so the checks wait for it.
test('a resizable Lab Panel resizes from the keyboard', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/site/lab/panel-demo-area')
  const demo = page.locator('.lab-demo-area').first()
  await demo.locator('.lab-demo-area-properties label', { hasText: /^isResizable$/ }).click()
  const handle = demo.getByRole('separator', { name: 'Resize Panel A' })
  const panel = demo.getByRole('region', { name: 'Panel A' })
  const width = async () => (await panel.boundingBox())!.width
  const before = await width()
  await handle.focus()
  await page.keyboard.press('ArrowRight')
  await expect.poll(width).toBeGreaterThan(before)
  await page.keyboard.press('Home')
  await expect.poll(width).toBeLessThan(before)
})

// Checks that, at 320px and double text size, every Panel stacks without the page scrolling sideways.
test('Lab Panels stack on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 })
  await page.goto('/site/lab/panel-demo-area')
  await setTextSize(page, 32)
  await expectNoPageOverflow(page)
})
