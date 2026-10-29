import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize } from '../display'

// The Lab's candidate Panel layout, with a candidate Panel at each placement. Illustrative and unapproved.

// Checks that the layout shows a Panel at each placement, that the Properties panel's switches remove one,
// and that the page passes an accessibility scan.
test('a Lab Panel layout takes one Panel at each placement', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/site/lab/panel-layout')
  const demo = page.locator('.lab-demo-block').first()
  await page.mouse.move(0, 0)
  for (const name of ['Start panel', 'Bottom panel']) {
    await expect(demo.getByRole('region', { name, exact: true })).toBeVisible()
  }
  // The end Panel gives way first, so without room for both side Panels it waits, collapsed, for its toggle.
  await expect(demo.getByRole('region', { name: 'End panel', exact: true })).toHaveCount(1)
  await demo.locator('.lab-demo-block-properties label', { hasText: /^bottom$/ }).click()
  await expect(demo.getByRole('region', { name: 'Bottom panel', exact: true })).toHaveCount(0)
  await expectNoAccessibilityViolations(page, 'main')
})

// Checks that, at 320px and double text size, the page doesn't scroll sideways.
test('a Lab Panel layout fits a phone', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 })
  await page.goto('/site/lab/panel-layout')
  await setTextSize(page, 32)
  await expectNoPageOverflow(page)
})
