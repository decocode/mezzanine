import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize } from '../display'

// The Lab's candidate Panel layout, with a candidate Panel at each placement. Illustrative and unapproved.

// Checks that the layout shows a Panel at each placement, that the demo panel's switches remove one,
// and that the page passes an accessibility scan.
test('a Lab Panel layout takes one Panel at each placement', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/site/lab/panel-layout')
  const demo = page.locator('.lab-demo-block').first()
  await page.mouse.move(0, 0)
  await expect(demo.getByRole('region', { name: 'Start panel', exact: true })).toBeVisible()
  // The bottom Panel is a drawer, so it waits, collapsed, for its toggle, then opens over the content.
  const bottom = demo.getByRole('region', { name: 'Bottom panel', exact: true })
  await expect(bottom).toBeHidden()
  await demo.locator('.lab-panel-layout-bar').getByRole('button', { name: 'Bottom', exact: true }).click()
  await expect(bottom).toBeVisible()
  await expect(bottom).toHaveAttribute('data-overlay', 'true')
  await page.keyboard.press('Escape')
  await expect(bottom).toBeHidden()
  // The end Panel gives way first, so without room for both side Panels it collapses, and its toggle
  // opens it as an overlay.
  const endToggle = demo.locator('.lab-panel-layout-bar').getByRole('button', { name: 'End', exact: true })
  await expect(endToggle).toHaveAttribute('aria-expanded', 'false')
  await endToggle.click()
  await expect(demo.getByRole('region', { name: 'End panel', exact: true })).toBeVisible()
  await expect(demo.getByRole('region', { name: 'End panel', exact: true })).toHaveAttribute('data-overlay', 'true')
  await page.keyboard.press('Escape')
  // Focus returns to the End button, which shows its tooltip; Escape closes that too, before the scan.
  await page.keyboard.press('Escape')
  await page.mouse.move(0, 0)
  await expect(page.getByRole('tooltip')).toHaveCount(0)
  await demo.locator('.lab-demo-block-controls label', { hasText: /^bottom$/ }).click()
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
