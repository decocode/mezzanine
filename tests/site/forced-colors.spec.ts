import { expect, test } from '@playwright/test'
import { setTheme, themes } from '../display'

// Checks that with forced colours on, every theme points the colour roles at system colours, and
// that without them the theme's own colours stay in place.
for (const theme of themes) {
  test(`colour roles follow system colours in forced colours in ${theme}`, async ({ page }) => {
    await page.goto('/')
    await setTheme(page, theme)
    const role = (name: string) => page.evaluate((token) => getComputedStyle(document.documentElement).getPropertyValue(token).trim(), name)
    expect(await role('--color-focus')).not.toBe('Highlight')
    await page.emulateMedia({ forcedColors: 'active' })
    expect(await role('--color-focus')).toBe('Highlight')
    expect(await role('--color-text')).toBe('CanvasText')
    expect(await role('--color-accent-muted-hovered')).toBe('Canvas')
    expect(await role('--color-link')).toBe('LinkText')
  })
}
