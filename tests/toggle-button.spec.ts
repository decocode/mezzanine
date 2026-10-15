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
  await table.screenshot({ path: 'reports/test-results/toggle-states-desktop.png' })
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
  const controls = page.getByRole('complementary', { name: 'Control panel', exact: true })
  const left = controls.getByRole('radio', { name: 'Left', exact: true })
  const right = controls.getByRole('radio', { name: 'Right', exact: true })
  await left.focus()
  await page.keyboard.press('ArrowRight')
  await expect(right).toBeFocused()
  await page.keyboard.press('Space')
  await expect(right).toBeChecked()
  await expect(left).not.toBeChecked()
})

test('group example tabs switch selection modes and preserve choices', async ({ page }) => {
  await page.goto('/toggle-button')
  const single = page.getByRole('tab', { name: 'Single', exact: true })
  const multi = page.getByRole('tab', { name: 'Multi', exact: true })
  const panel = page.getByRole('tabpanel')
  await expect(single).toHaveAttribute('aria-selected', 'true')
  await panel.getByRole('radio', { name: 'Toggle B' }).click()
  await single.focus()
  await page.keyboard.press('ArrowRight')
  await expect(multi).toBeFocused()
  await expect(multi).toHaveAttribute('aria-selected', 'true')
  await panel.getByRole('button', { name: 'Toggle B' }).click()
  await expect(panel.getByRole('button', { name: 'Toggle A' })).toHaveAttribute('aria-pressed', 'true')
  await expect(panel.getByRole('button', { name: 'Toggle B' })).toHaveAttribute('aria-pressed', 'true')
  await single.click()
  await expect(panel.getByRole('radio', { name: 'Toggle B' })).toBeChecked()
  await multi.click()
  await expect(panel.getByRole('button', { name: 'Toggle B' })).toHaveAttribute('aria-pressed', 'true')
})

for (const fontSize of [16, 32]) {
  test(`Button and ToggleButton share all size dimensions at ${fontSize}px root text`, async ({ page }) => {
    const dimensions = async (route: string, tableName: string) => {
      await page.goto(route)
      await page.evaluate(size => { document.documentElement.style.fontSize = `${size}px` }, fontSize)
      const table = page.getByRole('grid', { name: tableName, exact: true })
      await expect(table.locator('[data-icon-only]')).toHaveCount(4)
      return table.locator('[data-icon-only]').evaluateAll(buttons => buttons.map(button => {
        const style = getComputedStyle(button)
        const icon = button.querySelector('svg')!
        return { size: button.getAttribute('data-size'), width: style.width, height: style.height,
          padding: style.padding, fontSize: style.fontSize, iconWidth: getComputedStyle(icon).width }
      }))
    }
    const buttons = await dimensions('/button', 'Button sizes')
    const toggles = await dimensions('/toggle-button', 'ToggleButton sizes')
    expect(toggles).toEqual(buttons)
    expect(buttons.map(button => button.size)).toEqual(['sm', 'md', 'lg', 'xl'])
    expect(buttons.map(button => parseFloat(button.iconWidth))).toEqual([1, 1.125, 1.25, 1.5].map(size => size * fontSize))
    expect(buttons.map(button => parseFloat(button.height))).toEqual([2.75, 3, 3.25, 3.5].map(size => size * fontSize))
    const themes = page.getByRole('radiogroup', { name: 'Theme', exact: true }).filter({ visible: true })
    if (!(await themes.count())) await page.locator('header.mezzanine-navbar').first().getByRole('button', { name: 'Menu', exact: true }).click()
    await expect(themes.getByRole('radio').first()).toHaveAttribute('data-size', 'sm')
    await expect(themes.getByRole('radio').first().locator('svg')).toHaveCSS('width', `${fontSize}px`)
  })
}
