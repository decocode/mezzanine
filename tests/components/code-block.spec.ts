import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, textSizes, themes } from '../display'

// Checks that the Code block example is a pre element holding a code element, keeps its line
// breaks, and fits a 320px screen at normal and doubled text in every theme without
// accessibility problems.
for (const theme of themes) {
  test(`Code block example fits 320px and passes accessibility checks in ${theme}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.goto('/code-block')
    await setTheme(page, theme)
    const block = page.locator('main pre.mezzanine-code-block')
    await expect(block).toHaveCount(1)
    await expect(block.locator('> code')).toHaveCount(1)
    expect(await block.evaluate(element => element.textContent?.split('\n').length)).toBe(4)
    for (const size of textSizes) {
      await setTextSize(page, size)
      await expectNoPageOverflow(page)
      expect(await block.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true)
    }
    await expectNoAccessibilityViolations(page, 'main pre.mezzanine-code-block')
  })
}
