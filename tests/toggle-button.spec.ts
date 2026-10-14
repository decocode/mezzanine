import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

for (const theme of ['light', 'dark', 'wireframe']) {
  test(`secondary toggles distinguish interaction and selection in ${theme}`, async ({ page }) => {
    await page.goto('/toggle-button')
    await page.evaluate(theme => { document.documentElement.dataset.theme = theme }, theme)
    const example = page.getByRole('grid', { name: 'ToggleButton states', exact: true })
    const toggles = example.locator('[data-variant="secondary"]')
    const selected = toggles.nth(1)
    const unselected = toggles.nth(0)
    await expect(selected).toHaveAttribute('aria-pressed', 'true')
    await expect(toggles.nth(2)).toBeDisabled()
    expect(await selected.evaluate(el => getComputedStyle(el).boxShadow)).not.toBe('none')
    await unselected.hover()
    const hover = await unselected.evaluate(el => getComputedStyle(el).backgroundColor)
    await page.mouse.down()
    await expect(unselected).toHaveAttribute('data-pressed')
    expect(await unselected.evaluate(el => getComputedStyle(el).backgroundColor)).not.toBe(hover)
    await page.mouse.up()
    await expect(unselected).toHaveAttribute('aria-pressed', 'true')
    await unselected.press('Space')
    await expect(unselected).toHaveAttribute('aria-pressed', 'false')
    await expect(unselected).toHaveCSS('outline-style', 'solid')
    await page.mouse.move(0, 0)
    expect((await new AxeBuilder({ page }).include('.toggle-button-states-table').analyze()).violations).toEqual([])
    await page.setViewportSize({ width: 320, height: 900 })
    await page.evaluate(() => { document.documentElement.style.fontSize = '32px' })
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)
  })
}

test('secondary selection remains visible in forced colours', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' })
  await page.goto('/toggle-button')
  const selected = page.getByRole('grid', { name: 'ToggleButton states', exact: true }).locator('[data-variant="secondary"]').nth(1)
  await expect(selected).toHaveCSS('text-decoration-line', 'underline')
})

test('state comparison keeps three readable columns and scrolls locally on narrow screens', async ({ page }) => {
  await page.goto('/toggle-button')
  const table = page.getByRole('grid', { name: 'ToggleButton states', exact: true })
  await expect(table.getByRole('columnheader')).toHaveText(['State', 'Primary', 'Secondary'])
  const widths = await table.getByRole('columnheader').evaluateAll(headers => headers.map(header => header.getBoundingClientRect().width))
  expect(Math.max(...widths) - Math.min(...widths)).toBeLessThan(2)
  await table.scrollIntoViewIfNeeded()
  await table.screenshot({ path: 'test-results/toggle-states-desktop.png' })
  for (const fontSize of [16, 32]) {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.evaluate(size => { document.documentElement.style.fontSize = `${size}px` }, fontSize)
    const secondary = table.locator('[data-variant="secondary"]').first()
    const box = await secondary.boundingBox()
    expect(box!.width).toBeGreaterThan(box!.height)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)
    expect(await page.locator('.toggle-button-states-table').evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true)
  }
})

test('secondary group preserves keyboard selection in the Sidebar controls', async ({ page }) => {
  await page.goto('/sidebar')
  const controls = page.getByRole('group', { name: 'Example controls' })
  const left = controls.getByRole('radio', { name: 'Left', exact: true })
  const right = controls.getByRole('radio', { name: 'Right', exact: true })
  await left.focus()
  await page.keyboard.press('ArrowRight')
  await expect(right).toBeFocused()
  await page.keyboard.press('Space')
  await expect(right).toBeChecked()
  await expect(left).not.toBeChecked()
})
