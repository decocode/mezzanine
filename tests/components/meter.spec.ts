import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, themes } from '../display'

// Checks, in each theme, that the meter announces its value and fills to match, and the page passes
// an accessibility scan and fits a phone at double text size.
for (const theme of themes) {
  test(`meter shows its value in ${theme}`, async ({ page }) => {
    await page.goto('/meter')
    await setTheme(page, theme)
    const meter = page.getByRole('meter', { name: 'Meter A', exact: true })
    await expect(meter).toHaveAttribute('aria-valuenow', '35')
    await expect(meter.locator('.mz-meter-value')).toHaveText('35%')
    const track = (await meter.locator('.mz-meter-track').boundingBox())!
    const fill = (await meter.locator('.mz-meter-fill').boundingBox())!
    expect(Math.abs(fill.width / track.width - 0.35)).toBeLessThan(0.02)
    await expectNoAccessibilityViolations(page, 'main')
    await page.setViewportSize({ width: 320, height: 900 })
    await setTextSize(page, 32)
    await expectNoPageOverflow(page)
  })
}
