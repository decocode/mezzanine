import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize } from '../display'

// The Lab's candidate demo block, rebuilt from the candidate Panel. Illustrative and unapproved.

// Checks that the demo panel collapses and expands from its toggle in the strip, which stays visible
// and says whether the panel is expanded, and that its controls change the demo.
test('the Lab demo block collapses its demo panel from the strip', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/site/lab/demo-block')
  const demo = page.locator('.lab-demo-block').first()
  // The controls follow the Card's anatomy and start off; the footer's Detail switch appears beneath
  // CardFooter once it's in.
  const controls = demo.locator('.lab-demo-block-controls')
  await expect(controls).toBeVisible()
  await expect(controls.locator('label', { hasText: /^Detail$/ })).toHaveCount(0)
  await controls.locator('label', { hasText: /^CardFooter$/ }).click()
  await controls.locator('label', { hasText: /^Detail$/ }).click()
  await expect(demo.getByText('Footer details')).toBeVisible()
  const toggle = demo.getByRole('button', { name: 'Hide demo settings' })
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  const area = demo.locator('.lab-demo-block-area')
  const openHeight = (await area.boundingBox())!.height
  await toggle.click()
  await expect(controls).toBeHidden()
  // The collapsed panel's controls don't stretch the demo area taller.
  await expect.poll(async () => (await area.boundingBox())!.height).toBeLessThanOrEqual(openHeight)
  const showToggle = demo.getByRole('button', { name: 'Show demo settings' })
  await expect(showToggle).toHaveAttribute('aria-expanded', 'false')
  await showToggle.click()
  await expect(controls).toBeVisible()
  // Let the toggle's tooltip fade out before the scan.
  await page.mouse.move(0, 0)
  await expect(page.getByRole('tooltip')).toHaveCount(0)
  await expectNoAccessibilityViolations(page, 'main')
})

// Checks that the strip is a toolbar named "Demo tools": Tab reaches it once, at the theme Select, the
// arrow keys move to the demo panel's toggle and back, and Tab then leaves the strip.
test('the Lab demo block strip is a toolbar the arrow keys move through', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/site/lab/demo-block')
  const demo = page.locator('.lab-demo-block').first()
  const strip = demo.getByRole('toolbar', { name: 'Demo tools' })
  const theme = strip.getByRole('button', { name: /demo theme$/ })
  const toggle = strip.getByRole('button', { name: 'Hide demo settings' })
  await theme.focus()
  await page.keyboard.press('ArrowRight')
  await expect(toggle).toBeFocused()
  await page.keyboard.press('ArrowLeft')
  await expect(theme).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(toggle).not.toBeFocused()
  expect(await strip.evaluate((element) => element.contains(document.activeElement))).toBe(false)
})

// Checks that, at 320px and double text size, the demo block fits without the page scrolling sideways.
test('the Lab demo block fits a phone', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 })
  await page.goto('/site/lab/demo-block')
  await setTextSize(page, 32)
  await expectNoPageOverflow(page)
})
