import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, themes } from '../display'

// Checks, in each theme, that the arrow keys move the thumb and its value, the fill follows it, the
// focused thumb shows a ring, the page passes an accessibility scan and fits a phone at double text.
for (const theme of themes) {
  test(`slider moves with the arrow keys in ${theme}`, async ({ page }) => {
    await page.goto('/slider')
    await setTheme(page, theme)
    const slider = page.locator('.mz-demo-block-area .mz-slider')
    const thumb = slider.getByRole('slider', { name: 'Slider', exact: true })
    const fill = slider.locator('.mz-slider-fill')
    const before = (await fill.boundingBox())!.width
    await thumb.focus()
    await page.keyboard.press('ArrowRight')
    await expect(thumb).toHaveValue('41')
    await expect(slider.locator('.mz-slider-output')).toHaveText('41')
    expect((await fill.boundingBox())!.width).toBeGreaterThan(before)
    await expect(slider.locator('.mz-slider-thumb')).toHaveCSS('outline-style', 'solid')
    await expectNoAccessibilityViolations(page, 'main')
    await page.setViewportSize({ width: 320, height: 900 })
    await setTextSize(page, 32)
    await expectNoPageOverflow(page)
  })
}

// Checks that a range has one named thumb for each value, and the fill runs between them.
test('a range slider has two named thumbs with the fill between them', async ({ page }) => {
  await page.goto('/slider')
  // The Example's defaultValue control switches it to a range.
  await page.locator('.mz-demo-block-end-panel').getByRole('button', { name: /defaultValue/ }).click()
  await page.getByRole('option', { name: '[20, 70]' }).click()
  const range = page.locator('.mz-demo-block-area .mz-slider')
  await expect(range.getByRole('slider', { name: 'Minimum' })).toHaveValue('20')
  await expect(range.getByRole('slider', { name: 'Maximum' })).toHaveValue('70')
  const fill = (await range.locator('.mz-slider-fill').boundingBox())!
  const minimum = (await range.locator('.mz-slider-thumb').first().boundingBox())!
  expect(Math.abs(fill.x - (minimum.x + minimum.width / 2))).toBeLessThan(2)
})
