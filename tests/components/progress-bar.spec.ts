import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, themes } from '../display'

// Checks, in each theme, that the bar announces its value and fills to match, the indeterminate bar
// has no value, and the page passes an accessibility scan and fits a phone at double text size.
for (const theme of themes) {
  test(`progress bar shows its value in ${theme}`, async ({ page }) => {
    await page.goto('/progress-bar')
    await setTheme(page, theme)
    const bar = page.getByRole('progressbar', { name: 'Progress A', exact: true })
    await expect(bar).toHaveAttribute('aria-valuenow', '60')
    await expect(bar.locator('.mz-progress-bar-value')).toHaveText('60%')
    const track = (await bar.locator('.mz-progress-bar-track').boundingBox())!
    const fill = (await bar.locator('.mz-progress-bar-fill').boundingBox())!
    expect(Math.abs(fill.width / track.width - 0.6)).toBeLessThan(0.02)
    // The Example's isIndeterminate control takes the value away.
    await page.locator('.docs-page-lead label', { hasText: 'isIndeterminate' }).click()
    const busy = page.getByRole('progressbar', { name: 'Progress A', exact: true })
    await expect(busy).not.toHaveAttribute('aria-valuenow')
    await expect(busy.locator('.mz-progress-bar-value')).toHaveCount(0)
    await expectNoAccessibilityViolations(page, 'main')
    await page.setViewportSize({ width: 320, height: 900 })
    await setTextSize(page, 32)
    await expectNoPageOverflow(page)
  })
}

// Checks that the indeterminate segment moves normally, and stops for the system's reduced motion.
test('the indeterminate segment stops only for reduced motion', async ({ page }) => {
  await page.goto('/progress-bar')
  await page.locator('.docs-page-lead label', { hasText: 'isIndeterminate' }).click()
  const segment = page.getByRole('progressbar', { name: 'Progress A', exact: true }).locator('.mz-progress-bar-fill')
  await expect(segment).not.toHaveCSS('animation-name', 'none')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(segment).toHaveCSS('animation-name', 'none')
  await expect(segment).toBeVisible()
})
