import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, textSizes, themes } from '../display'

// Checks that the theme switcher's tooltips appear on hover, stay open while the pointer is over
// the tooltip itself and close with Escape.
test('theme tooltips support hover, hoverable content and Escape dismissal', async ({ page }) => {
  // A simulated clock lets the test skip past the close delay instead of waiting for it.
  await page.clock.install()
  await page.goto('/')
  await page.mouse.move(0, 500)
  for (const name of ['Light theme', 'Dark theme', 'Wireframe theme']) {
    const control = page.getByRole('radio', { name, exact: true })
    await control.hover()
    const tooltip = page.getByRole('tooltip', { name, exact: true })
    await expect(tooltip).toBeVisible()
    await expect(control).toHaveAttribute('aria-describedby', await tooltip.getAttribute('id'))
    await tooltip.hover()
    // Remain open beyond the trigger's default 500ms close delay.
    await page.clock.runFor(650)
    await expect(tooltip).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(tooltip).toBeHidden()
    await page.mouse.move(0, 500)
  }
})

// Checks that moving keyboard focus to a theme control on a phone shows its tooltip, that Escape
// hides the tooltip without moving focus, and that Space still selects the theme.
test('keyboard focus opens a theme tooltip that Escape closes without blocking the control', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.getByRole('banner').getByRole('button', { name: 'Menu', exact: true }).click()
  const control = page.getByRole('radio', { name: 'Dark theme', exact: true })
  await page.keyboard.press('Tab')
  await control.focus()
  const tooltip = page.getByRole('tooltip', { name: 'Dark theme', exact: true })
  await expect(tooltip).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(tooltip).toBeHidden()
  await expect(control).toBeFocused()
  await page.keyboard.press('Space')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(control).toBeChecked()
})

// Checks, in each theme at normal and double text size, that a theme tooltip opened with the
// keyboard on a phone stays on screen without animating, the control is large enough with a visible
// focus outline, and both pass an accessibility scan.
for (const theme of themes) {
  for (const fontSize of textSizes) {
    test(`${theme} tooltips fit 320px with ${fontSize}px text and reduced motion`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 900 })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/')
      await setTheme(page, theme)
      await setTextSize(page, fontSize)
      await page.getByRole('banner').getByRole('button', { name: 'Menu', exact: true }).click()
      const control = page.getByRole('radio', { name: 'Dark theme', exact: true })
      await page.keyboard.press('Tab')
      await control.focus()
      const tooltip = page.getByRole('tooltip', { name: 'Dark theme', exact: true })
      await expect(tooltip).toBeVisible()
      await expect(tooltip).toHaveCSS('animation-name', 'none')
      const box = (await tooltip.boundingBox())!
      expect(box.x).toBeGreaterThanOrEqual(0)
      expect(box.x + box.width).toBeLessThanOrEqual(320)
      await expectNoPageOverflow(page)
      expect((await control.boundingBox())!.height).toBeGreaterThanOrEqual(36)
      await expect(control).toHaveCSS('outline-style', 'solid')
      await expectNoAccessibilityViolations(page, '[role="tooltip"]')
    })
  }
}

// Checks that tooltips keep a visible border in high-contrast mode.
test('theme tooltips remain visible in forced colours', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' })
  await page.goto('/')
  await page.getByRole('radio', { name: 'Dark theme', exact: true }).focus()
  const tooltip = page.getByRole('tooltip', { name: 'Dark theme', exact: true })
  await expect(tooltip).toBeVisible()
  await expect(tooltip).toHaveCSS('border-style', 'solid')
})

// Checks the Tooltip page example on a phone: its tooltip opens on hover and on keyboard focus,
// stays on screen at normal and double text size, and closes with Escape while focus stays on the
// button.
test('Tooltip documentation example supports hover and keyboard focus at narrow widths', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/tooltip')
  const button = page.getByRole('main').getByRole('button', { name: 'Settings', exact: true })
  await page.mouse.move(0, 0)
  await button.hover()
  const tooltip = page.getByRole('tooltip', { name: 'Settings', exact: true })
  await expect(tooltip).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(tooltip).toBeHidden()
  await page.mouse.move(0, 0)
  for (const fontSize of textSizes) {
    await setTextSize(page, fontSize)
    // Bring the whole demo into view, theme picker and button, so tabbing through them doesn't
    // scroll the page and close the tooltip the button opens.
    await page.getByRole('main').locator('.mz-demo-area').first().evaluate(element => element.scrollIntoView({ block: 'start' }))
    // Let scroll-triggered overlay dismissal finish before focusing the example.
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
    // At narrow widths On this page sits inline before the example. Start from
    // its last link, then Tab past the demo's theme picker into the actual example.
    await page.getByRole('main').getByRole('navigation', { name: 'On this page', exact: true }).getByRole('link').last().evaluate(element => (element as HTMLElement).focus({ preventScroll: true }))
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await expect(button).toBeFocused()
    await expect(tooltip).toBeVisible()
    const box = (await tooltip.boundingBox())!
    expect(box.x).toBeGreaterThanOrEqual(0)
    expect(box.x + box.width).toBeLessThanOrEqual(320)
    await expectNoPageOverflow(page)
    await expectNoAccessibilityViolations(page, 'main', '[role="tooltip"]')
    await page.keyboard.press('Escape')
    await expect(tooltip).toBeHidden()
    await expect(button).toBeFocused()
  }
})

// Checks that the Tooltip page explains tooltips can't be seen on touchscreens, and that tapping
// the example button doesn't open one.
test('Tooltip documentation explains touch behaviour and tapping does not open a tooltip', async ({ browser }) => {
  const context = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 320, height: 900 } })
  try {
    const page = await context.newPage()
    await page.clock.install()
    await page.goto('/tooltip')
    await expect(page.getByText(/tooltips cannot be viewed on touchscreen devices/)).toBeVisible()
    await page.getByRole('button', { name: 'Settings', exact: true }).tap()
    // Skip beyond the hover delay to catch accidental tooltips from touch events.
    await page.clock.runFor(650)
    await expect(page.getByRole('tooltip')).toHaveCount(0)
    await expect(page).toHaveURL(/\/tooltip$/)
  } finally {
    await context.close()
  }
})
