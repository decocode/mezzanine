import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { setTheme, themes } from '../display'

// Checks that with a mouse the expanding VolumeControl's speaker mutes, and that hovering or focusing
// it reveals the slider beside it.
test('expanding VolumeControl mutes from its speaker and reveals on hover or focus', async ({ page }) => {
  await page.goto('/site/lab/expanding-controls')
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
  // Tall enough that the tooltip has room below the speaker, rather than flipping above it.
  await page.setViewportSize({ width: 1280, height: 1100 })
  await page.goto('/site/lab/expanding-controls')
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
    await page.goto('/site/lab/expanding-controls')
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
  await page.goto('/site/lab/expanding-controls')
  const panels = page.locator('.lab-media-expand-panel')
  expect(await panels.evaluateAll((elements) => elements.every((element) => getComputedStyle(element).transitionDuration.split(', ').every((duration) => duration === '0s')))).toBe(true)
})

// Checks, in each theme, that the page passes an accessibility scan.
for (const theme of themes) {
  test(`${theme} Expanding controls page passes a scan`, async ({ page }) => {
    await page.goto('/site/lab/expanding-controls')
    await setTheme(page, theme)
    await expect(page.getByRole('button', { name: 'Mute C' })).toBeVisible()
    await expectNoAccessibilityViolations(page, 'main')
  })
}
