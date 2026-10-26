import { expect, test, type Page } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { demoThemeSelect, expectNoPageOverflow, setTextSize, setTheme, textSizes, themes } from '../display'

// The Tooltip page demo's tools: the theme Select and the Properties panel's button, which show their
// names in tooltips.
const demoTools = (page: Page) => page.locator('.docs-page-lead .mz-demo-area-frame')
const propertiesToggle = (page: Page) => demoTools(page).getByRole('button', { name: /^(Hide|Show) properties$/ })

// Checks that the demo tools' tooltips, on the Tooltip page, appear on hover, stay open while the pointer
// is over the tooltip itself and close with Escape.
test('demo tool tooltips support hover, hoverable content and Escape dismissal', async ({ page }) => {
  // A simulated clock lets the test skip past the close delay instead of waiting for it.
  await page.clock.install()
  await page.goto('/tooltip')
  await page.mouse.move(0, 500)
  for (const [name, control] of [['Demo theme', demoThemeSelect(demoTools(page))], ['Hide properties', propertiesToggle(page)]] as const) {
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

// Checks that moving keyboard focus to the demo's Properties button on a phone shows its tooltip, that
// Escape hides the tooltip without moving focus, and that Space still works the button.
test('keyboard focus opens a tooltip that Escape closes without blocking the control', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/tooltip')
  const control = propertiesToggle(page)
  await page.keyboard.press('Tab')
  await control.focus()
  const tooltip = page.getByRole('tooltip', { name: 'Hide properties', exact: true })
  await expect(tooltip).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(tooltip).toBeHidden()
  await expect(control).toBeFocused()
  await page.keyboard.press('Space')
  await expect(control).toHaveAttribute('aria-expanded', 'false')
})

// Checks, in each theme at normal and double text size, that a demo tool's tooltip opened with the
// keyboard on a phone stays on screen without animating, the control is large enough with a visible
// focus outline, and both pass an accessibility scan.
for (const theme of themes) {
  for (const fontSize of textSizes) {
    test(`${theme} tooltips fit 320px with ${fontSize}px text and reduced motion`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 900 })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/tooltip')
      await setTheme(page, theme)
      await setTextSize(page, fontSize)
      // Bring the picker into view first, so focusing it doesn't scroll the page and close the tooltip.
      await demoTools(page).evaluate(element => element.scrollIntoView({ block: 'start' }))
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
      const control = propertiesToggle(page)
      await page.keyboard.press('Tab')
      await control.focus()
      const tooltip = page.getByRole('tooltip', { name: 'Hide properties', exact: true })
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
  await page.goto('/tooltip')
  await propertiesToggle(page).focus()
  const tooltip = page.getByRole('tooltip', { name: 'Hide properties', exact: true })
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
  const button = page.getByRole('main').getByRole('button', { name: 'Hover or focus', exact: true })
  await page.mouse.move(0, 0)
  await button.hover()
  const tooltip = page.getByRole('tooltip', { name: 'This is a tooltip', exact: true })
  await expect(tooltip).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(tooltip).toBeHidden()
  await page.mouse.move(0, 0)
  for (const fontSize of textSizes) {
    await setTextSize(page, fontSize)
    // Bring the demo itself into view, below the Properties panel on a phone, so focusing its button
    // doesn't scroll the page and close the tooltip the button opens.
    await page.locator('.docs-page-lead .mz-demo-area-content').evaluate(element => element.scrollIntoView({ block: 'start' }))
    // Let scroll-triggered overlay dismissal finish before focusing the example.
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
    // Start from the Properties panel's last control, just before the demo, then Tab into the example.
    await page.locator('.docs-page-lead .mz-demo-area-end-panel-controls').getByRole('button').last().evaluate(element => (element as HTMLElement).focus({ preventScroll: true }))
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
    await page.getByRole('button', { name: 'Hover or focus', exact: true }).tap()
    // Skip beyond the hover delay to catch accidental tooltips from touch events.
    await page.clock.runFor(650)
    await expect(page.getByRole('tooltip')).toHaveCount(0)
    await expect(page).toHaveURL(/\/tooltip$/)
  } finally {
    await context.close()
  }
})
