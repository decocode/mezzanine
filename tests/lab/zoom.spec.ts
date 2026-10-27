import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { setTheme, themes } from '../display'

// Checks that the candidate ZoomControl puts 100% in the middle of its logarithmic slider, moves
// about 7% per arrow press, steps through the browsers' zoom stops from its buttons, and shows its
// level on one line as plain text, not a button.
test('ZoomControl is logarithmic, steps through zoom stops, and shows its level', async ({ page }) => {
  await page.goto('/site/lab/zoom')
  await page.getByRole('button', { name: 'Zoom' }).click()
  const slider = page.getByRole('slider', { name: 'Zoom' })
  await expect(slider).toHaveAttribute('aria-valuetext', '100%')
  const min = Number(await slider.getAttribute('min'))
  const max = Number(await slider.getAttribute('max'))
  expect(Number(await slider.inputValue())).toBeCloseTo(min + (max - min) / 2)
  await slider.focus()
  await page.keyboard.press('ArrowRight')
  await expect(slider).toHaveAttribute('aria-valuetext', '107%')
  await page.getByRole('button', { name: 'Zoom in' }).click()
  // From 107%, between stops, the buttons go to the nearest stop in their direction.
  await expect(slider).toHaveAttribute('aria-valuetext', '110%')
  await page.getByRole('button', { name: 'Zoom out' }).click()
  await page.getByRole('button', { name: 'Zoom out' }).click()
  await expect(slider).toHaveAttribute('aria-valuetext', '90%')
  const level = page.locator('.lab-media-popover .lab-media-level')
  await expect(level).toHaveText('90%')
  await expect(page.locator('.lab-media-popover').getByRole('button', { name: /%/ })).toHaveCount(0)
  // One line: no taller than a line of its text.
  const height = (await level.boundingBox())!.height
  const lineHeight = await level.evaluate((element) => parseFloat(getComputedStyle(element).lineHeight))
  expect(height).toBeLessThanOrEqual(lineHeight + 1)
})

// Checks that 100% is marked on the track, that a drag near the mark snaps onto it and one further
// away doesn't, and that a double-press of the handle returns to it.
test('ZoomControl marks 100% and snaps a nearby drag onto it', async ({ page }) => {
  await page.goto('/site/lab/zoom')
  await page.getByRole('button', { name: 'Zoom' }).click()
  const slider = page.getByRole('slider', { name: 'Zoom' })
  const track = page.locator('.lab-media-popover .mz-slider-track')
  expect(await track.evaluate((element) => getComputedStyle(element, '::before').content)).toBe('""')
  await page.getByRole('button', { name: 'Zoom out' }).click()
  await expect(slider).toHaveAttribute('aria-valuetext', '90%')
  const box = (await track.boundingBox())!
  const at = (share: number) => [box.x + box.width * share, box.y + box.height / 2] as const
  // Just past the middle: without the snap this would be 107%.
  await page.mouse.move(...at(0.25))
  await page.mouse.down()
  await page.mouse.move(...at(0.52), { steps: 5 })
  await page.mouse.up()
  await expect(slider).toHaveAttribute('aria-valuetext', '100%')
  // Further along, it doesn't snap.
  await page.mouse.move(...at(0.5))
  await page.mouse.down()
  await page.mouse.move(...at(0.6), { steps: 5 })
  await page.mouse.up()
  await expect(slider).not.toHaveAttribute('aria-valuetext', '100%')
  // A double-press of the handle returns to the mark.
  await page.locator('.lab-media-popover .mz-slider-thumb').dblclick()
  await expect(slider).toHaveAttribute('aria-valuetext', '100%')
})

// Checks that opening from the keyboard puts focus on the slider's handle, between zoom out and zoom
// in, and that keyboard focus inside holds the pop-up open past its 2-second countdown.
test('ZoomControl opens on its handle and stays open while keyboard focus is inside', async ({ page }) => {
  await page.goto('/site/lab/zoom')
  await page.getByRole('button', { name: 'Zoom' }).focus()
  await page.keyboard.press('Enter')
  const slider = page.getByRole('slider', { name: 'Zoom' })
  await expect(slider).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(page.getByRole('button', { name: 'Zoom out' })).toBeFocused()
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('button', { name: 'Zoom in' })).toBeFocused()
  await page.waitForTimeout(2500)
  await expect(slider).toBeVisible()
  // Escape on a button first closes its tooltip, so it's pressed from the handle.
  await page.keyboard.press('Shift+Tab')
  await expect(slider).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(slider).toBeHidden()
  await expect(page.getByRole('button', { name: 'Zoom' })).toBeFocused()
})

// Checks that every arrow key press moves the zoom, all the way to 400% and back down to 25%.
test('ZoomControl arrow keys move on every press, end to end', async ({ page }) => {
  await page.goto('/site/lab/zoom')
  await page.getByRole('button', { name: 'Zoom' }).focus()
  await page.keyboard.press('Enter')
  const slider = page.getByRole('slider', { name: 'Zoom' })
  await expect(slider).toBeFocused()
  const zoom = async () => parseInt((await slider.getAttribute('aria-valuetext'))!)
  for (const [key, end, isUp] of [['ArrowRight', 400, true], ['ArrowLeft', 25, false]] as const) {
    let previous = await zoom()
    while (previous !== end) {
      await page.keyboard.press(key)
      const next = await zoom()
      expect(isUp ? next > previous : next < previous, `${key} from ${previous}% gave ${next}%`).toBe(true)
      previous = next
    }
  }
})

// Checks that Page Up and Page Down move on every press, end to end, and that the arrow keys still
// move after them, as in 100%, Page Down to 76%, then down and back up.
test('ZoomControl Page Up and Page Down move on every press, and arrows follow on', async ({ page }) => {
  await page.goto('/site/lab/zoom')
  await page.getByRole('button', { name: 'Zoom' }).focus()
  await page.keyboard.press('Enter')
  const slider = page.getByRole('slider', { name: 'Zoom' })
  await expect(slider).toBeFocused()
  const zoom = async () => parseInt((await slider.getAttribute('aria-valuetext'))!)
  for (const [key, end, isUp] of [['PageUp', 400, true], ['PageDown', 25, false]] as const) {
    let previous = await zoom()
    while (previous !== end) {
      await page.keyboard.press(key)
      const next = await zoom()
      expect(isUp ? next > previous : next < previous, `${key} from ${previous}% gave ${next}%`).toBe(true)
      previous = next
    }
  }
  await page.keyboard.press('End')
  await expect(slider).toHaveAttribute('aria-valuetext', '400%')
  await page.keyboard.press('Home')
  await expect(slider).toHaveAttribute('aria-valuetext', '25%')
  // From a level off the arrow keys' grid, each arrow press still moves.
  for (const key of ['ArrowRight', 'PageUp', 'PageUp', 'ArrowDown', 'ArrowDown', 'ArrowUp', 'ArrowUp', 'PageDown', 'ArrowLeft', 'ArrowRight']) {
    const before = await zoom()
    await page.keyboard.press(key)
    expect(await zoom(), `${key} from ${before}%`).not.toBe(before)
  }
})

// Checks that the zoom-out and zoom-in buttons step through every stop, both ways.
test('ZoomControl buttons step through every stop, both ways', async ({ page }) => {
  const stops = [25, 33, 50, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250, 300, 400]
  await page.goto('/site/lab/zoom')
  await page.getByRole('button', { name: 'Zoom' }).click()
  const slider = page.getByRole('slider', { name: 'Zoom' })
  const zoom = async () => parseInt((await slider.getAttribute('aria-valuetext'))!)
  const zoomIn = page.getByRole('button', { name: 'Zoom in' })
  const zoomOut = page.getByRole('button', { name: 'Zoom out' })
  for (let index = 0; index < 8; index++) await zoomOut.click()
  await expect(slider).toHaveAttribute('aria-valuetext', '25%')
  const upward = [await zoom()]
  while (upward.at(-1) !== 400) { await zoomIn.click(); upward.push(await zoom()) }
  expect(upward).toEqual(stops)
  const downward = [await zoom()]
  while (downward.at(-1) !== 25) { await zoomOut.click(); downward.push(await zoom()) }
  expect(downward).toEqual([...stops].reverse())
})

// Checks, in each theme, that the page and an open zoom pop-up pass an accessibility scan.
for (const theme of themes) {
  test(`${theme} Zoom candidate passes a scan`, async ({ page }) => {
    await page.goto('/site/lab/zoom')
    await setTheme(page, theme)
    await expect(page.getByRole('button', { name: 'Zoom' })).toBeVisible()
    await expectNoAccessibilityViolations(page, 'main')
    await page.getByRole('button', { name: 'Zoom' }).click()
    // Scan once the pop-up has finished fading in, so its colours are final.
    await expect(page.locator('.lab-media-popover')).not.toHaveAttribute('data-entering')
    await expectNoAccessibilityViolations(page, '.lab-media-popover')
  })
}
