import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { setTheme, themes } from '../display'

// Checks that the candidate VolumeControl words its level as a percentage, mutes from its speaker
// button, and closes itself 2 seconds after it was last used.
test('VolumeControl mutes from its speaker and closes itself after use', async ({ page }) => {
  await page.goto('/site/lab/volume-and-zoom')
  const trigger = page.getByRole('button', { name: 'Volume A' })
  await trigger.click()
  const slider = page.getByRole('slider', { name: 'Volume A' })
  await expect(slider).toHaveAttribute('aria-valuetext', '60%')
  await slider.focus()
  await page.keyboard.press('ArrowRight')
  await expect(slider).toHaveAttribute('aria-valuetext', '65%')
  const mute = page.getByRole('button', { name: 'Mute A' })
  await mute.click()
  await expect(mute).toHaveAttribute('aria-pressed', 'true')
  await expect(slider).toHaveAttribute('aria-valuetext', '0%')
  await page.mouse.move(0, 0)
  await expect(slider).toBeHidden({ timeout: 4000 })
  await expect(trigger).toBeFocused()
})

// Checks that the vertical VolumeControl stands its slider upright.
test('VolumeControl can stand upright', async ({ page }) => {
  await page.goto('/site/lab/volume-and-zoom')
  await page.getByRole('button', { name: 'Volume B' }).click()
  await expect(page.getByRole('slider', { name: 'Volume B' })).toHaveAttribute('aria-orientation', 'vertical')
})

// Checks that with a mouse the expanding VolumeControl's speaker mutes, and that hovering or focusing
// it reveals the slider beside it.
test('expanding VolumeControl mutes from its speaker and reveals on hover or focus', async ({ page }) => {
  await page.goto('/site/lab/volume-and-zoom')
  const mute = page.getByRole('button', { name: 'Mute C' })
  const slider = page.getByRole('slider', { name: 'Volume C' })
  await expect(slider).toBeHidden()
  await mute.focus()
  await expect(slider).toBeVisible()
  await page.keyboard.press('Tab')
  await expect(slider).toBeFocused()
  await page.keyboard.press('ArrowRight')
  await expect(slider).toHaveAttribute('aria-valuetext', '65%')
  await mute.click()
  await expect(mute).toHaveAttribute('aria-pressed', 'true')
  await expect(slider).toHaveAttribute('aria-valuetext', '0%')
})

// Checks that the upright expanding VolumeControl rises above its speaker without moving anything
// around it.
test('upright expanding VolumeControl rises above its speaker and floats', async ({ page }) => {
  await page.goto('/site/lab/volume-and-zoom')
  const mute = page.getByRole('button', { name: 'Mute D' })
  const neighbour = page.getByRole('button', { name: 'Mute C' })
  await mute.scrollIntoViewIfNeeded()
  const before = await neighbour.boundingBox()
  await mute.hover()
  const slider = page.getByRole('slider', { name: 'Volume D' })
  await expect(slider).toBeVisible()
  await expect(slider).toHaveAttribute('aria-orientation', 'vertical')
  // Measured once the row has finished rising.
  await expect.poll(async () => (await slider.boundingBox())!.y + (await slider.boundingBox())!.height).toBeLessThan((await mute.boundingBox())!.y)
  expect(await neighbour.boundingBox()).toEqual(before)
  // The speaker's tooltip opens below it, clear of the rising row.
  await mute.focus()
  const tooltip = page.getByRole('tooltip')
  await expect(tooltip).toBeVisible()
  // Allows a pixel for rounding.
  expect((await tooltip.boundingBox())!.y).toBeGreaterThanOrEqual((await mute.boundingBox())!.y + (await mute.boundingBox())!.height - 1)
})

test.describe('on a touch screen', () => {
  test.use({ hasTouch: true, isMobile: true })

  // Checks that without hover, tapping the speaker reveals the row with mute inside, and Escape closes
  // it, returning focus to the speaker.
  test('expanding VolumeControl reveals its row on tap', async ({ page }) => {
    await page.goto('/site/lab/volume-and-zoom')
    const trigger = page.getByRole('button', { name: 'Volume C' })
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await trigger.tap()
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByRole('button', { name: 'Mute C' })).toBeVisible()
    await page.getByRole('slider', { name: 'Volume C' }).focus()
    await page.keyboard.press('Escape')
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await expect(trigger).toBeFocused()
  })
})

// Checks that the expanding row appears straight away when the system asks for reduced motion.
test('expanding VolumeControl honours reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/site/lab/volume-and-zoom')
  const panels = page.locator('.lab-media-expand-panel')
  expect(await panels.evaluateAll((elements) => elements.every((element) => getComputedStyle(element).transitionDuration.split(', ').every((duration) => duration === '0s')))).toBe(true)
})

// Checks that the candidate ZoomControl puts 100% in the middle of its logarithmic slider, moves
// about 7% per arrow press, halves and doubles from its buttons, and resets from its percentage.
test('ZoomControl is logarithmic, halves, doubles and resets', async ({ page }) => {
  await page.goto('/site/lab/volume-and-zoom')
  await page.getByRole('button', { name: 'Zoom E' }).click()
  const slider = page.getByRole('slider', { name: 'Zoom E' })
  await expect(slider).toHaveAttribute('aria-valuetext', '100%')
  const min = Number(await slider.getAttribute('min'))
  const max = Number(await slider.getAttribute('max'))
  expect(Number(await slider.inputValue())).toBeCloseTo(min + (max - min) / 2)
  await slider.focus()
  await page.keyboard.press('ArrowRight')
  await expect(slider).toHaveAttribute('aria-valuetext', '107%')
  await page.getByRole('button', { name: 'Step up E' }).click()
  await expect(slider).toHaveAttribute('aria-valuetext', '214%')
  await page.getByRole('button', { name: 'Step down E' }).click()
  await page.getByRole('button', { name: 'Step down E' }).click()
  await expect(slider).toHaveAttribute('aria-valuetext', '54%')
  await page.getByRole('button', { name: 'Reset E, 54%' }).click()
  await expect(slider).toHaveAttribute('aria-valuetext', '100%')
})

// Checks, in each theme, that the page and an open zoom pop-up pass an accessibility scan.
for (const theme of themes) {
  test(`${theme} volume and zoom candidates pass a scan`, async ({ page }) => {
    await page.goto('/site/lab/volume-and-zoom')
    await setTheme(page, theme)
    await expect(page.getByRole('button', { name: 'Zoom E' })).toBeVisible()
    await expectNoAccessibilityViolations(page, 'main')
    await page.getByRole('button', { name: 'Zoom E' }).click()
    // Scan once the pop-up has finished fading in, so its colours are final.
    await expect(page.locator('.lab-media-popover')).not.toHaveAttribute('data-entering')
    await expectNoAccessibilityViolations(page, '.lab-media-popover')
  })
}
