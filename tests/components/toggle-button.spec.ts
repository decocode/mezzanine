import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, textSizes, themes } from '../display'

// Checks, in each theme, that secondary toggle buttons look different when hovered, pressed and
// selected, switch with the mouse and Space, pass an accessibility scan and fit a phone screen at
// double text size.
for (const theme of themes) {
  test(`secondary toggles distinguish interaction and selection in ${theme}`, async ({ page }) => {
    await page.goto('/toggle-button')
    await setTheme(page, theme)
    const example = page.getByRole('grid', { name: 'ToggleButton states', exact: true })
    const toggles = example.locator('[data-variant="secondary"]')
    const selected = toggles.nth(1)
    const unselected = toggles.nth(0)
    await expect(selected).toHaveAttribute('aria-pressed', 'true')
    await expect(toggles.nth(2)).toBeDisabled()
    await expect(selected).not.toHaveCSS('box-shadow', 'none')
    await unselected.hover()
    const hover = await unselected.evaluate(el => getComputedStyle(el).backgroundColor)
    await page.mouse.down()
    await expect(unselected).toHaveAttribute('data-pressed')
    await expect(unselected).not.toHaveCSS('background-color', hover)
    await page.mouse.up()
    await expect(unselected).toHaveAttribute('aria-pressed', 'true')
    await unselected.press('Space')
    await expect(unselected).toHaveAttribute('aria-pressed', 'false')
    await expect(unselected).toHaveCSS('outline-style', 'solid')
    await page.mouse.move(0, 0)
    await expectNoAccessibilityViolations(page, '.toggle-button-states-table')
    await page.setViewportSize({ width: 320, height: 900 })
    await setTextSize(page, 32)
    await expectNoPageOverflow(page)
  })
}

// Checks that a selected secondary toggle stays recognisable in high-contrast mode, where colour
// can't be relied on, by showing an underline.
test('secondary selection remains visible in forced colours', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' })
  await page.goto('/toggle-button')
  const selected = page.getByRole('grid', { name: 'ToggleButton states', exact: true }).locator('[data-variant="secondary"]').nth(1)
  await expect(selected).toHaveCSS('text-decoration-line', 'underline')
})

// Checks that the states table keeps three equal columns and, on a phone, scrolls inside its own
// box rather than squashing the buttons or widening the page.
test('state comparison keeps three readable columns and scrolls locally on narrow screens', async ({ page }) => {
  await page.goto('/toggle-button')
  const table = page.getByRole('grid', { name: 'ToggleButton states', exact: true })
  await expect(table.getByRole('columnheader')).toHaveText(['State', 'Primary', 'Secondary'])
  const widths = await table.getByRole('columnheader').evaluateAll(headers => headers.map(header => header.getBoundingClientRect().width))
  expect(Math.max(...widths) - Math.min(...widths)).toBeLessThan(2)
  for (const fontSize of textSizes) {
    await page.setViewportSize({ width: 320, height: 900 })
    await setTextSize(page, fontSize)
    const secondary = table.locator('[data-variant="secondary"]').first()
    const box = await secondary.boundingBox()
    expect(box!.width).toBeGreaterThan(box!.height)
    await expectNoPageOverflow(page)
    expect(await page.locator('.toggle-button-states-table').evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true)
  }
})

// Checks that the toggle button group in the Sidebar page's controls can be moved through with the
// arrow keys and selected with Space.
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

// Checks the group example's Single and Multi tabs: Single allows one choice, Multi allows several,
// and each tab remembers its choices when you switch back.
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

// Checks, at normal and double text size, that Button and ToggleButton are exactly the same size at
// each of the five sizes, and that the theme switcher uses the small size.
for (const fontSize of textSizes) {
  test(`Button and ToggleButton share all size dimensions at ${fontSize}px root text`, async ({ page }) => {
    const dimensions = async (route: string, tableName: string) => {
      await page.goto(route)
      await setTextSize(page, fontSize)
      const table = page.getByRole('grid', { name: tableName, exact: true })
      await expect(table.locator('[data-icon-only]')).toHaveCount(5)
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
    expect(buttons.map(button => button.size)).toEqual(['xs', 'sm', 'md', 'lg', 'xl'])
    expect(buttons.map(button => parseFloat(button.iconWidth))).toEqual([1, 1.25, 1.5, 1.75, 2].map(size => size * fontSize))
    expect(buttons.map(button => parseFloat(button.height))).toEqual([2, 2.25, 2.75, 3, 3.5].map(size => size * fontSize))
    const themes = page.getByRole('radiogroup', { name: 'Theme', exact: true }).filter({ visible: true })
    if (!(await themes.count())) await page.locator('header.mz-navbar').first().getByRole('button', { name: 'Menu', exact: true }).click()
    await expect(themes.getByRole('radio').first()).toHaveAttribute('data-size', 'sm')
    await expect(themes.getByRole('radio').first().locator('svg')).toHaveCSS('width', `${fontSize * 1.25}px`)
  })
}
