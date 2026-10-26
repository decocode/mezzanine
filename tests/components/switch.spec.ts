import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, themes } from '../display'

// Checks, in each theme, that the switch turns on with Space, its handle moves to the end and the
// track changes colour, it passes an accessibility scan, and it fits a phone screen at double text size.
for (const theme of themes) {
  test(`switch turns on and off in ${theme}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/switch')
    await setTheme(page, theme)
    const example = page.locator('.docs-page-lead .mz-demo-area-content .mz-switch-field').first()
    const control = example.getByRole('switch', { name: 'Switch label', exact: true })
    const track = example.locator('.mz-switch-track')
    const handle = example.locator('.mz-switch-handle')
    const offBackground = await track.evaluate(el => getComputedStyle(el).backgroundColor)
    const offStart = (await handle.boundingBox())!.x
    await control.focus()
    await page.keyboard.press('Space')
    await expect(control).toBeChecked()
    await expect(track).toHaveCSS('outline-style', 'solid')
    await expect(track).not.toHaveCSS('background-color', offBackground)
    expect((await handle.boundingBox())!.x).toBeGreaterThan(offStart)
    await page.keyboard.press('Space')
    await expect(control).not.toBeChecked()
    await expectNoAccessibilityViolations(page, 'main')
    await page.setViewportSize({ width: 320, height: 900 })
    await setTextSize(page, 32)
    await expectNoPageOverflow(page)
  })
}

// Checks that the handle moves towards the start of the line in right-to-left text.
test('switch handle moves to the end in right to left', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/switch')
  await page.evaluate(() => { document.documentElement.dir = 'rtl' })
  const example = page.locator('.mz-switch-field').first()
  const handle = example.locator('.mz-switch-handle')
  const offStart = (await handle.boundingBox())!.x
  await example.getByRole('switch').focus()
  await page.keyboard.press('Space')
  expect((await handle.boundingBox())!.x).toBeLessThan(offStart)
})

// Checks that the handle slides only when motion is allowed.
test('switch handle slide follows reduced motion', async ({ page }) => {
  await page.goto('/switch')
  const handle = page.locator('.mz-switch-handle').first()
  await expect(handle).not.toHaveCSS('transition-duration', '0s')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(handle).toHaveCSS('transition-duration', '0s')
})

// Checks that on and off stay distinguishable in high-contrast mode, where theme colours are replaced.
test('switch state remains visible in forced colours', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' })
  await page.goto('/switch')
  const rows = page.getByRole('grid', { name: 'Switch states', exact: true })
  const off = await rows.locator('.mz-switch-track').nth(0).evaluate(el => getComputedStyle(el).backgroundColor)
  await expect(rows.locator('.mz-switch-track').nth(1)).not.toHaveCSS('background-color', off)
})
