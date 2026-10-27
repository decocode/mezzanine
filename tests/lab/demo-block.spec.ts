import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize } from '../display'

// The Lab's candidate demo block, rebuilt from the candidate Panel. Illustrative and unapproved.

// Checks that the Properties Panel collapses and expands from its toggle in the strip, which stays
// visible and says whether the Panel is expanded, and that its control changes the demo.
test('the Lab demo block collapses its Properties Panel from the strip', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/site/lab/demo-block')
  const demo = page.locator('.lab-demo-block').first()
  const properties = demo.getByRole('region', { name: 'Properties', exact: true })
  // The Parts group's switch removes the Card's footer, and the Code tab follows.
  const parts = demo.getByRole('region', { name: 'Parts', exact: true })
  await expect(parts).toBeVisible()
  await parts.locator('label', { hasText: /^CardFooter$/ }).click()
  await expect(demo.getByText('Footer details')).toHaveCount(0)
  const toggle = demo.getByRole('button', { name: 'Hide properties' })
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await toggle.click()
  await expect(properties).toBeHidden()
  const showToggle = demo.getByRole('button', { name: 'Show properties' })
  await expect(showToggle).toHaveAttribute('aria-expanded', 'false')
  await showToggle.click()
  await expect(properties).toBeVisible()
  // Let the toggle's tooltip fade out before the scan.
  await page.mouse.move(0, 0)
  await expect(page.getByRole('tooltip')).toHaveCount(0)
  await expectNoAccessibilityViolations(page, 'main')
})

// Checks that the strip is a toolbar named "Demo tools": Tab reaches it once, at the theme Select, the
// arrow keys move to the Properties toggle and back, and Tab then leaves the strip.
test('the Lab demo block strip is a toolbar the arrow keys move through', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/site/lab/demo-block')
  const demo = page.locator('.lab-demo-block').first()
  const strip = demo.getByRole('toolbar', { name: 'Demo tools' })
  const theme = strip.getByRole('button', { name: /demo theme$/ })
  const toggle = strip.getByRole('button', { name: 'Hide properties' })
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
