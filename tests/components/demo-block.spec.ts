import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { chooseDemoTheme, demoThemeSelect, expectNoPageOverflow, setTextSize, setTheme, themes } from '../display'

// Checks, in each theme, that the bar shows the theme switcher, a demo theme leaves the end panel in the
// site's theme, the end panel's controls change the demo, the Code tab shows the source, and the page
// passes an accessibility scan and fits a phone at double text size.
for (const theme of themes) {
  test(`demo block bar, end panel and code tab work in ${theme}`, async ({ page }) => {
    await page.goto('/demo-block')
    await setTheme(page, theme)
    // The example shows a demo block inside another one.
    const inner = page.locator('.docs-page-lead .mz-demo-block-area .mz-demo-block')
    await expect(demoThemeSelect(inner)).toBeVisible()
    const panel = inner.getByRole('group', { name: 'Properties', exact: true })
    // Choosing another theme for the demo leaves its end panel in the site's theme. The Select starts on
    // the page's theme, so it picks one that differs.
    const [label, chosen] = theme === 'dark' ? ['Light', 'light'] as const : ['Dark', 'dark'] as const
    await chooseDemoTheme(page, inner, label)
    await expect(inner.locator('.mz-demo-block-area')).toHaveAttribute('data-theme', chosen)
    expect(await panel.evaluate(element => element.closest('[data-theme]') === document.documentElement)).toBe(true)
    await panel.getByRole('switch').focus()
    await page.keyboard.press('Space')
    await expect(inner.getByRole('button', { name: 'Button', exact: true })).toBeDisabled()
    await inner.getByRole('tab', { name: 'Code' }).click()
    await expect(inner.locator('pre')).toContainText('<Button>Button</Button>')
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
  const demo = page.locator('.mz-demo-block').first()
  const pageColor = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
  await chooseDemoTheme(page, demo, 'Dark')
  const body = demo.locator('.mz-demo-block-area')
  await expect(body).toHaveAttribute('data-theme', 'dark')
  expect(await body.evaluate(element => getComputedStyle(element).backgroundColor)).not.toBe(pageColor)
  expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe(pageColor)
  await demo.getByRole('button', { name: 'Menu trigger', exact: true }).click()
  // The theme list may still be fading out, so this finds the menu's popover.
  const popover = page.locator('.mz-popover').filter({ has: page.getByRole('menu') })
  await expect(popover).toBeVisible()
  expect(await popover.evaluate(element => element.closest('[data-theme]')?.getAttribute('data-theme'))).toBe('dark')
  // The menu still sits next to its button.
  const trigger = (await demo.getByRole('button', { name: 'Menu trigger', exact: true }).boundingBox())!
  const menu = (await popover.boundingBox())!
  // It may open above or below, depending on the room.
  expect(Math.min(Math.abs(menu.y - (trigger.y + trigger.height)), Math.abs(menu.y + menu.height - trigger.y))).toBeLessThan(40)
})

// Checks that the Properties panel's header button starts expanded with the controls showing, rolls
// them up while the header stays, lets the demo take the full width, and rolls them down again.
test('the Properties header button hides and shows the controls', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/button')
  const demo = page.locator('.docs-page-lead .mz-demo-block')
  const toggle = demo.getByRole('button', { name: /^(Hide|Show) properties$/ })
  const panel = demo.getByRole('group', { name: 'Properties', exact: true })
  const controls = panel.locator('.mz-demo-block-end-panel-body')
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await expect(controls).toBeVisible()
  const headerBox = (await toggle.boundingBox())!
  await toggle.click()
  await expect(toggle).toHaveAccessibleName('Show properties')
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await expect(controls).toBeHidden()
  await expect(panel).toBeVisible()
  expect((await toggle.boundingBox())!.y).toBe(headerBox.y)
  await expect.poll(async () => (await demo.boundingBox())!.width - (await demo.locator('.mz-demo-block-area').boundingBox())!.width).toBeLessThan(4)
  await toggle.click()
  await expect(controls).toBeVisible()
})

// Checks that the demo's tools belong to the Demo tab: the Code tab shows the code block's own buttons
// instead, and going back to Demo brings the tools back.
test('the demo tools show only on the Demo tab', async ({ page }) => {
  await page.goto('/button')
  const demo = page.locator('.docs-page-lead .mz-demo-block')
  const themePicker = demoThemeSelect(demo)
  const toggle = demo.getByRole('button', { name: /^(Hide|Show) properties$/ })
  await expect(themePicker).toBeVisible()
  await demo.getByRole('tab', { name: 'Code' }).click()
  await expect(themePicker).toHaveCount(0)
  await expect(toggle).toHaveCount(0)
  await expect(demo.getByRole('button', { name: 'Wrap lines' })).toBeVisible()
  await demo.getByRole('tab', { name: 'Demo' }).click()
  await expect(themePicker).toBeVisible()
  await expect(toggle).toBeVisible()
})
