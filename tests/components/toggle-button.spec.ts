import { expect, test, type Page } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, textSizes, themes } from '../display'

// Chooses an option in one of the Example's Properties panel Selects.
async function choose(page: Page, label: string, option: string) {
  const panel = page.locator('main .mz-demo-area').first().locator('.mz-demo-area-end-panel')
  await panel.getByRole('button', { name: new RegExp(label) }).click()
  await page.getByRole('option', { name: option, exact: true }).click()
}

const exampleToggle = (page: Page) => page.locator('main .mz-demo-area').first().locator('.mz-demo-area-content .mz-toggle-button')

// Checks, in each theme, that a secondary toggle button in the Example looks different when hovered,
// pressed and selected, switches with the mouse and Space, can be disabled, passes an accessibility
// scan and fits a phone screen at double text size.
for (const theme of themes) {
  test(`secondary toggles distinguish interaction and selection in ${theme}`, async ({ page }) => {
    await page.goto('/toggle-button')
    await setTheme(page, theme)
    await choose(page, 'hierarchy', 'secondary')
    const toggle = exampleToggle(page)
    await expect(toggle).toHaveAttribute('data-variant', 'secondary')
    await expect(toggle).toHaveAttribute('aria-pressed', 'false')
    await toggle.hover()
    const hover = await toggle.evaluate(el => getComputedStyle(el).backgroundColor)
    await page.mouse.down()
    await expect(toggle).toHaveAttribute('data-pressed')
    await expect(toggle).not.toHaveCSS('background-color', hover)
    await page.mouse.up()
    await expect(toggle).toHaveAttribute('aria-pressed', 'true')
    await expect(toggle).not.toHaveCSS('box-shadow', 'none')
    await toggle.press('Space')
    await expect(toggle).toHaveAttribute('aria-pressed', 'false')
    await expect(toggle).toHaveCSS('outline-style', 'solid')
    await page.mouse.move(0, 0)
    await expectNoAccessibilityViolations(page, 'main')
    await page.locator('main .mz-demo-area-end-panel').first().locator('label', { hasText: 'isDisabled' }).click()
    await expect(exampleToggle(page)).toBeDisabled()
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
  await choose(page, 'hierarchy', 'secondary')
  await exampleToggle(page).click()
  await expect(exampleToggle(page)).toHaveCSS('text-decoration-line', 'underline')
})

// Checks, at normal and double text size, that Button and ToggleButton are exactly the same size at
// each of the five sizes, and that the theme switcher uses the small size.
for (const fontSize of textSizes) {
  test(`Button and ToggleButton share all size dimensions at ${fontSize}px root text`, async ({ page }) => {
    // Each page's Example shows an icon-only control at each size in turn.
    const dimensions = async (route: string, selector: string) => {
      await page.goto(route)
      await setTextSize(page, fontSize)
      await page.locator('main .mz-demo-area-end-panel').first().locator('label', { hasText: /^icon$/ }).click()
      await choose(page, 'iconPosition', 'iconOnly')
      const sizes = []
      for (const size of ['xs', 'sm', 'md', 'lg', 'xl']) {
        await choose(page, 'size', size)
        sizes.push(await page.locator('main .mz-demo-area').first().locator(`.mz-demo-area-content ${selector}`).evaluate(button => {
          const style = getComputedStyle(button)
          const icon = button.querySelector('svg')!
          return { size: button.getAttribute('data-size'), width: style.width, height: style.height,
            padding: style.padding, fontSize: style.fontSize, iconWidth: getComputedStyle(icon).width }
        }))
      }
      return sizes
    }
    const buttons = await dimensions('/button', '.mz-button')
    const toggles = await dimensions('/toggle-button', '.mz-toggle-button')
    expect(toggles).toEqual(buttons)
    expect(buttons.map(button => button.size)).toEqual(['xs', 'sm', 'md', 'lg', 'xl'])
    expect(buttons.map(button => parseFloat(button.iconWidth))).toEqual([1, 1.25, 1.5, 1.75, 2].map(size => size * fontSize))
    expect(buttons.map(button => parseFloat(button.height))).toEqual([2, 2.25, 2.75, 3, 3.5].map(size => size * fontSize))
    const themes = page.getByRole('radiogroup', { name: 'Theme', exact: true }).filter({ visible: true })
    if (!(await themes.count())) await page.locator('header.mz-top-bar').first().getByRole('button', { name: 'Menu', exact: true }).click()
    await expect(themes.getByRole('radio').first()).toHaveAttribute('data-size', 'sm')
    await expect(themes.getByRole('radio').first().locator('svg')).toHaveCSS('width', `${fontSize * 1.25}px`)
  })
}
