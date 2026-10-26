import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, themes } from '../display'

// Checks, in each theme, that typing filters the suggestions, the arrow keys and Enter choose one, and
// the page passes an accessibility scan and fits a phone at double text size.
for (const theme of themes) {
  test(`combo box filters and chooses a suggestion in ${theme}`, async ({ page }) => {
    await page.goto('/combo-box')
    await setTheme(page, theme)
    const input = page.getByRole('combobox', { name: 'Combo box A', exact: true })
    // Bring the field into view first: scrolling closes an open list, which clears an unchosen value.
    await input.evaluate((element) => element.scrollIntoView({ block: 'center' }))
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
    await input.fill('B')
    const list = page.getByRole('listbox')
    await expect(list.getByRole('option')).toHaveCount(1)
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await expect(input).toHaveValue('Option B')
    await expect(list).toBeHidden()
    await expectNoAccessibilityViolations(page, 'main')
    await page.setViewportSize({ width: 320, height: 900 })
    await setTextSize(page, 32)
    await expectNoPageOverflow(page)
  })
}
