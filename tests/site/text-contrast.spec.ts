import { expect, test } from '@playwright/test'

// The Color and contrast page says the text roles are chosen to meet WCAG 2.2 AA, 4.5 to 1 for normal
// text, on the page and on surfaces, in every theme. Each pair is measured from the theme's real colors.
const themes = ['light', 'dark', 'wireframe']
const textRoles = ['--color-text', '--color-text-muted', '--color-link', '--color-danger']
const backgrounds = ['--color-page', '--color-surface']

for (const theme of themes) {
  test(`text roles meet AA on the page and surfaces in ${theme}`, async ({ page }) => {
    await page.goto('/typography/color-and-contrast')
    await expect(page.getByText('Loading documentation…', { exact: true })).toHaveCount(0)
    const ratios = await page.evaluate(({ theme, textRoles, backgrounds }) => {
      // The browser resolves any color syntax, such as oklch() or color-mix(), to sRGB pixels.
      const context = new OffscreenCanvas(1, 1).getContext('2d', { willReadFrequently: true })!
      const toRgb = (color: string) => {
        context.clearRect(0, 0, 1, 1)
        context.fillStyle = color
        context.fillRect(0, 0, 1, 1)
        return Array.from(context.getImageData(0, 0, 1, 1).data.slice(0, 3))
      }
      const luminance = (rgb: number[]) => {
        const [r, g, b] = rgb.map((value) => { const c = value / 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4 })
        return 0.2126 * r + 0.7152 * g + 0.0722 * b
      }
      const probe = document.createElement('div')
      probe.dataset.theme = theme
      document.body.append(probe)
      const resolve = (role: string, property: 'color' | 'backgroundColor') => {
        const element = document.createElement('span')
        element.style[property] = `var(${role})`
        probe.append(element)
        const value = getComputedStyle(element)[property]
        element.remove()
        return toRgb(value)
      }
      const results: Record<string, number> = {}
      for (const background of backgrounds) {
        const backgroundLuminance = luminance(resolve(background, 'backgroundColor'))
        for (const role of textRoles) {
          const textLuminance = luminance(resolve(role, 'color'))
          const [light, dark] = [Math.max(textLuminance, backgroundLuminance), Math.min(textLuminance, backgroundLuminance)]
          results[`${role} on ${background}`] = Math.round(((light + 0.05) / (dark + 0.05)) * 100) / 100
        }
      }
      probe.remove()
      return results
    }, { theme, textRoles, backgrounds })
    for (const [pair, ratio] of Object.entries(ratios)) expect(ratio, pair).toBeGreaterThanOrEqual(4.5)
  })
}
