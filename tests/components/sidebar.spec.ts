import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, textSizes, themes } from '../display'

// Checks the main Sidebar example on a wide screen: it can collapse to a narrow rail and expand
// again, move to the right, or hide completely, while remembering the options chosen inside it.
test('inline panel switches side, collapses to rail or hides, and preserves content state', async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1000 })
  await page.goto('/sidebar')
  const example = page.locator('.sidebar-example')
  const panel = example.getByRole('complementary', { name: 'Sidebar', exact: true })
  const trigger = example.getByRole('button', { name: 'Open', exact: true })
  await expect(panel).toBeVisible()
  await panel.getByRole('checkbox', { name: 'Option A' }).focus()
  await page.keyboard.press('Space')
  await panel.getByRole('button', { name: 'Close sidebar' }).focus()
  await page.keyboard.press('Enter')
  await expect(trigger).toHaveCount(0)
  await expect(panel.getByRole('checkbox')).toHaveCount(0)
  const expand = panel.getByRole('button', { name: 'Expand sidebar' })
  await expect(expand).toBeFocused()
  await expand.focus()
  await page.keyboard.press('Enter')
  await expect(panel.getByRole('button', { name: 'Close sidebar' })).toBeFocused()
  await expect(panel.getByRole('checkbox', { name: 'Option A' })).toBeChecked()
  await panel.locator('.react-aria-Checkbox').filter({ hasText: 'Option B' }).click()
  await expect(panel.getByRole('checkbox', { name: 'Option B' })).toBeChecked()
  await example.getByRole('radio', { name: 'Right', exact: true }).click()
  const workspace = example.locator('.sidebar-example-workspace')
  await expect.poll(async () => (await panel.boundingBox())!.x > (await workspace.boundingBox())!.x).toBe(true)
  await example.getByRole('radio', { name: 'Hide', exact: true }).click()
  await panel.getByRole('button', { name: 'Close sidebar' }).click()
  await expect(panel).toHaveCount(0)
  await trigger.focus()
  await page.keyboard.press('Space')
  await expect(panel.getByRole('checkbox', { name: 'Option A' })).toBeChecked()
  await panel.getByRole('button', { name: 'Reset options' }).click()
  await expect(panel.getByRole('checkbox', { name: 'Option A' })).not.toBeChecked()
})

// Checks that on a phone the Sidebar opens as a drawer that keeps keyboard focus inside it, closes
// with Escape, the close button or a tap outside, returns focus to the Open button and remembers
// chosen options.
test('mobile drawer traps focus, dismisses and restores focus, and keeps controlled options', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 })
  await page.goto('/sidebar')
  const trigger = page.getByRole('button', { name: 'Open', exact: true })
  await trigger.focus()
  await page.keyboard.press('Enter')
  const dialog = page.getByRole('dialog', { name: 'Sidebar', exact: true })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('img')).toBeVisible()
  await dialog.getByRole('checkbox', { name: 'Option A' }).focus()
  await page.keyboard.press('Space')
  const close = dialog.getByRole('button', { name: 'Close sidebar' })
  await close.focus()
  await page.keyboard.press('Shift+Tab')
  await expect(dialog.getByRole('button', { name: 'Reset options' })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(close).toBeFocused()
  // The close button's label shows in a tooltip on keyboard focus. Escape always closes the tooltip;
  // depending on timing, the same press may close the drawer too, or a second press does.
  await page.keyboard.press('Escape')
  await expect(page.getByRole('tooltip')).toHaveCount(0)
  if (await dialog.count()) await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
  await trigger.click()
  await expect(dialog.getByRole('checkbox', { name: 'Option A' })).toBeChecked()
  await close.click()
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
  await trigger.click()
  await page.mouse.click(318, 400)
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
})

// Checks that resizing between phone and desktop widths closes the drawer cleanly and keeps the
// desktop sidebar's own open or collapsed state.
test('responsive change releases modal and preserves independent desktop expansion', async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1000 })
  await page.goto('/sidebar')
  const example = page.locator('.sidebar-example')
  await example.getByRole('button', { name: 'Close sidebar' }).click()
  await page.setViewportSize({ width: 500, height: 800 })
  const trigger = example.getByRole('button', { name: 'Open', exact: true })
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  await trigger.click()
  await expect(page.getByRole('dialog', { name: 'Sidebar', exact: true })).toBeVisible()
  await page.setViewportSize({ width: 1600, height: 1000 })
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(example.getByRole('button', { name: 'Expand sidebar' })).toBeVisible()
  await page.setViewportSize({ width: 500, height: 800 })
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  await expect(page.getByRole('dialog')).toHaveCount(0)
})

// Checks that two sidebars on the same page open and close separately and don't share element IDs.
test('multiple inline sidebars operate independently and have unique panel relationships', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1100 })
  await page.goto('/sidebar')
  const example = page.locator('.sidebar-multiple-example')
  const filters = example.getByRole('complementary', { name: 'Filters', exact: true })
  const details = example.getByRole('complementary', { name: 'Details', exact: true })
  await filters.getByRole('checkbox', { name: 'Option C' }).focus()
  await page.keyboard.press('Space')
  await details.getByRole('button', { name: 'Close Details' }).click()
  await expect(details).toHaveCount(0)
  await expect(filters.getByRole('checkbox', { name: 'Option C' })).toBeChecked()
  await example.getByRole('button', { name: 'Details', exact: true }).click()
  await expect(details).toBeVisible()
  const controls = await example.locator('[aria-controls]').evaluateAll(elements => elements.map(element => element.getAttribute('aria-controls')))
  expect(new Set(controls).size).toBe(controls.length)
})

// Checks, in each theme at normal and double text size, that the phone drawer fits the screen
// without animating, has a large enough close button with a visible focus outline and passes an
// accessibility scan.
for (const theme of themes) {
  for (const fontSize of textSizes) {
    test(`${theme} sidebar fits 320px at ${fontSize}px text with reduced motion`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 800 })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/sidebar')
      await setTheme(page, theme)
      await setTextSize(page, fontSize)
      await expectNoPageOverflow(page)
      await page.getByRole('button', { name: 'Open', exact: true }).click()
      const panel = page.locator('.mz-sidebar-overlay .mz-sidebar-panel')
      const box = (await panel.boundingBox())!
      expect(box.x).toBeGreaterThanOrEqual(0)
      expect(box.x + box.width).toBeLessThanOrEqual(320)
      expect(await panel.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true)
      await expect(panel).toHaveCSS('animation-name', 'none')
      const close = page.getByRole('button', { name: 'Close sidebar' })
      const closeBox = (await close.boundingBox())!
      expect(closeBox.width).toBeGreaterThanOrEqual(24)
      expect(closeBox.height).toBeGreaterThanOrEqual(24)
      await close.focus()
      await page.keyboard.press('Tab')
      await page.keyboard.press('Shift+Tab')
      await expect(close).toHaveAttribute('data-focus-visible')
      await expectNoAccessibilityViolations(page, '.mz-sidebar-overlay')
    })
  }
}

// Checks that a right-hand drawer sits against the right edge of the screen and keeps a visible
// border in high-contrast mode.
test('right drawer uses the right edge and forced colours retain a visible border', async ({ page }) => {
  await page.setViewportSize({ width: 500, height: 800 })
  await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' })
  await page.goto('/sidebar')
  await page.locator('.sidebar-example').getByRole('radio', { name: 'Right', exact: true }).click()
  await page.getByRole('button', { name: 'Open', exact: true }).click()
  const panel = page.locator('.mz-sidebar-overlay .mz-sidebar-panel')
  const box = (await panel.boundingBox())!
  expect(Math.round(box.x + box.width)).toBe(500)
  await expect(panel).toHaveCSS('border-left-style', 'solid')
})

// Checks that a sidebar set not to collapse stays open on desktop with no close buttons, but can
// still be closed as a drawer on a phone.
test('non-collapsible inline panels stay expanded while mobile drawers remain dismissible', async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1000 })
  await page.goto('/sidebar')
  const example = page.locator('.sidebar-example')
  await example.getByRole('button', { name: 'Close sidebar' }).click()
  const collapsible = example.getByRole('checkbox', { name: 'Allow collapsing' })
  await collapsible.focus()
  await page.keyboard.press('Space')
  const panel = example.getByRole('complementary', { name: 'Sidebar', exact: true })
  await expect(panel.getByRole('checkbox', { name: 'Option A' })).toBeVisible()
  await expect(example.getByRole('button', { name: 'Open', exact: true })).toHaveCount(0)
  await expect(panel.getByRole('button', { name: 'Close sidebar' })).toHaveCount(0)
  await expect(panel.getByRole('button', { name: 'Expand sidebar' })).toHaveCount(0)
  await page.setViewportSize({ width: 320, height: 800 })
  const trigger = example.getByRole('button', { name: 'Open', exact: true })
  await trigger.click()
  const dialog = page.getByRole('dialog', { name: 'Sidebar', exact: true })
  await expect(dialog.getByRole('button', { name: 'Close sidebar' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
})

// Checks that the documentation site's own sidebar and the Sidebar page example use the same
// library component, show the same links and mark the current page.
test('AppShell and documentation example share permanent library panels and navigation', async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1000 })
  await page.goto('/sidebar')
  const shell = page.locator('.site-layout > .site-sidebar')
  const example = page.locator('.sidebar-documentation-example')
  const shellPanel = shell.locator('.desktop-sidebar .mz-sidebar-panel')
  const examplePanel = example.locator('.desktop-sidebar .mz-sidebar-panel')
  await expect(shellPanel).toBeVisible()
  await expect(examplePanel).toBeVisible()
  for (const panel of [shellPanel, examplePanel]) {
    await expect(panel.locator('.mz-sidebar-header')).toHaveCount(0)
    await expect(panel).toHaveAttribute('data-expanded')
    await expect(panel.getByRole('link', { name: 'Sidebar', exact: true })).toHaveAttribute('aria-current', 'page')
  }
  expect(await shellPanel.getByRole('link').evaluateAll(links => links.map(link => link.getAttribute('href'))))
    .toEqual(await examplePanel.getByRole('link').evaluateAll(links => links.map(link => link.getAttribute('href'))))
  await examplePanel.getByRole('link', { name: 'Tab bar', exact: true }).click()
  await expect(page).toHaveURL(/\/tab-bar$/)
  await expect(page.getByRole('heading', { name: 'Tab bar', level: 1, exact: true })).toBeVisible()
})

// Checks that at phone width the Sidebar page's documentation example stays in the page instead of
// becoming a drawer, at normal and double text size.
for (const fontSize of textSizes) {
  test(`docs sidebar example stays inline at 320px with ${fontSize}px text`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/sidebar')
    await setTextSize(page, fontSize)
    await expect(page.getByRole('button', { name: 'Browse sections', exact: true })).toHaveCount(0)
    await expect(page.locator('.site-layout > .site-sidebar').getByRole('treegrid')).toHaveCount(0)
    const example = page.locator('.sidebar-documentation-example')
    await expect(example.getByRole('treegrid')).toBeVisible()
    await expect(page.getByRole('dialog')).toHaveCount(0)
    await expect(example.locator('.mz-sidebar-header')).toHaveCount(0)
    await expectNoPageOverflow(page)
  })
}

// Checks that the example's control panel can be closed and reopened separately from the sidebar,
// keeping its settings, at desktop and phone widths.
test('control panel collapse independently and retain settings', async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1000 })
  await page.goto('/sidebar')
  const example = page.locator('.sidebar-example')
  const controls = example.getByRole('complementary', { name: 'Control panel', exact: true })
  const trigger = example.getByRole('button', { name: 'Control panel', exact: true })
  await controls.getByRole('radio', { name: 'Right', exact: true }).click()
  const preview = example.locator('.sidebar-example-layout')
  const expandedWidth = (await preview.boundingBox())!.width
  await controls.getByRole('button', { name: 'Close control panel' }).click()
  await expect(controls).toBeHidden()
  await expect(trigger).toBeFocused()
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  expect((await preview.boundingBox())!.width).toBeGreaterThan(expandedWidth)
  await page.keyboard.press('Enter')
  await expect(controls).toBeVisible()
  await expect(controls.getByRole('radio', { name: 'Right', exact: true })).toBeChecked()
  await expect(example.getByRole('complementary', { name: 'Sidebar', exact: true })).toBeVisible()
  await page.setViewportSize({ width: 320, height: 800 })
  await controls.getByRole('button', { name: 'Close control panel' }).click()
  await expect(controls).toBeHidden()
  await trigger.click()
  await expect(controls).toBeVisible()
  await expectNoPageOverflow(page)
})
