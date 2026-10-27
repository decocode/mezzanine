import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { setTheme, themes } from '../display'

// Checks that the candidate VolumeControl words its level as a percentage, mutes from its speaker
// button, and closes itself 2 seconds after it was last used.
test('VolumeControl mutes from its speaker and closes itself after use', async ({ page }) => {
  await page.goto('/site/lab/volume')
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
  await page.goto('/site/lab/volume')
  await page.getByRole('button', { name: 'Volume B' }).click()
  await expect(page.getByRole('slider', { name: 'Volume B' })).toHaveAttribute('aria-orientation', 'vertical')
})

// Checks that opening from the keyboard puts focus on the slider's handle, after the mute button, and
// that keyboard focus inside holds the pop-up open past its 2-second countdown.
test('VolumeControl opens on its handle and stays open while keyboard focus is inside', async ({ page }) => {
  await page.goto('/site/lab/volume')
  await page.getByRole('button', { name: 'Volume A' }).focus()
  await page.keyboard.press('Enter')
  const slider = page.getByRole('slider', { name: 'Volume A' })
  await expect(slider).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(page.getByRole('button', { name: 'Mute A' })).toBeFocused()
  await page.waitForTimeout(2500)
  await expect(slider).toBeVisible()
})

// Checks, in each theme, that the page and an open volume pop-up pass an accessibility scan.
for (const theme of themes) {
  test(`${theme} Volume candidate passes a scan`, async ({ page }) => {
    await page.goto('/site/lab/volume')
    await setTheme(page, theme)
    await expect(page.getByRole('button', { name: 'Volume A' })).toBeVisible()
    await expectNoAccessibilityViolations(page, 'main')
    await page.getByRole('button', { name: 'Volume A' }).click()
    // Scan once the pop-up has finished fading in, so its colours are final.
    await expect(page.locator('.lab-media-popover')).not.toHaveAttribute('data-entering')
    await expectNoAccessibilityViolations(page, '.lab-media-popover')
  })
}
