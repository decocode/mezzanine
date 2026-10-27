import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize } from '../display'

// The Lab's candidate Panel host, with a candidate Panel at each side. Illustrative and unapproved.

// Checks that the host shows a Panel at each side, that the Properties panel's switches remove one, and
// that the page passes an accessibility scan.
test('a Lab Panel host takes one Panel at each side', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/site/lab/panel-host')
  const demo = page.locator('.lab-demo-block').first()
  for (const name of ['Start panel', 'End panel', 'Top panel', 'Bottom panel']) {
    await expect(demo.getByRole('region', { name, exact: true })).toBeVisible()
  }
  await demo.locator('.lab-demo-block-properties label', { hasText: /^top$/ }).click()
  await expect(demo.getByRole('region', { name: 'Top panel', exact: true })).toHaveCount(0)
  await expectNoAccessibilityViolations(page, 'main')
})

// Checks that, at 320px and double text size, every Panel stacks without the page scrolling sideways.
test('Lab Panel host stacks on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 })
  await page.goto('/site/lab/panel-host')
  await setTextSize(page, 32)
  await expectNoPageOverflow(page)
})
