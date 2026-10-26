import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, themes } from '../display'

// Checks, in each theme, that the bar shows the theme picker, a demo theme leaves the end panel in the
// site's theme, the end panel's controls change the demo, the Code tab shows the source, and the page
// passes an accessibility scan and fits a phone at double text size.
for (const theme of themes) {
  test(`demo area bar, end panel and code tab work in ${theme}`, async ({ page }) => {
    await page.goto('/demo-area')
    await setTheme(page, theme)
    // The example shows a demo area inside another one.
    const inner = page.locator('.docs-page-lead .mz-demo-area-content .mz-demo-area')
    await expect(inner.getByRole('radio', { name: 'Light theme' })).toBeVisible()
    const panel = inner.getByRole('group', { name: 'Properties', exact: true })
    // Choosing Dark for the demo leaves its end panel in the site's theme.
    await inner.getByRole('radio', { name: 'Dark theme' }).click()
    await expect(inner.locator('.mz-demo-area-content')).toHaveAttribute('data-theme', 'dark')
    expect(await panel.evaluate(element => element.closest('[data-theme]') === document.documentElement)).toBe(true)
    await panel.getByRole('switch').focus()
    await page.keyboard.press('Space')
    await expect(inner.getByRole('button', { name: 'Button A', exact: true })).toBeDisabled()
    await inner.getByRole('tab', { name: 'Code' }).click()
    await expect(inner.locator('pre')).toContainText('<Button>Button A</Button>')
    await expectNoAccessibilityViolations(page, 'main')
    await page.setViewportSize({ width: 320, height: 900 })
    await setTextSize(page, 32)
    await expectNoPageOverflow(page)
  })
}

// Checks that choosing a theme in one demo changes that demo only, and a menu opened from it takes
// its theme while the page keeps its own.
test('a demo theme changes only that demo and its pop-ups', async ({ page }) => {
  await page.goto('/menu')
  await setTheme(page, 'light')
  const demo = page.locator('.mz-demo-area').first()
  const pageColor = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
  await demo.getByRole('radio', { name: 'Dark theme' }).click()
  const body = demo.locator('.mz-demo-area-content')
  await expect(body).toHaveAttribute('data-theme', 'dark')
  expect(await body.evaluate(element => getComputedStyle(element).backgroundColor)).not.toBe(pageColor)
  expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe(pageColor)
  await demo.getByRole('button', { name: 'Menu trigger', exact: true }).click()
  const popover = page.locator('.mz-popover')
  await expect(popover).toBeVisible()
  expect(await popover.evaluate(element => element.closest('[data-theme]')?.getAttribute('data-theme'))).toBe('dark')
  // The menu still sits next to its button.
  const trigger = (await demo.getByRole('button', { name: 'Menu trigger', exact: true }).boundingBox())!
  const menu = (await popover.boundingBox())!
  // It may open above or below, depending on the room.
  expect(Math.min(Math.abs(menu.y - (trigger.y + trigger.height)), Math.abs(menu.y + menu.height - trigger.y))).toBeLessThan(40)
})

// Checks that the bar's Properties toggle starts pressed with the panel open, closes the panel and lets
// the demo take the full width, and opens it again.
test('the Properties toggle hides and shows the end panel', async ({ page }) => {
  await page.goto('/button')
  const demo = page.locator('.docs-page-lead .mz-demo-area')
  const toggle = demo.getByRole('button', { name: 'Properties', exact: true })
  const panel = demo.getByRole('group', { name: 'Properties', exact: true })
  await expect(toggle).toHaveAttribute('aria-pressed', 'true')
  await expect(panel).toBeVisible()
  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-pressed', 'false')
  await expect(panel).toBeHidden()
  const content = (await demo.locator('.mz-demo-area-content').boundingBox())!
  const area = (await demo.boundingBox())!
  expect(area.width - content.width).toBeLessThan(4)
  await toggle.click()
  await expect(panel).toBeVisible()
})
