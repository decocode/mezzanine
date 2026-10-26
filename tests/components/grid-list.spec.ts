import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, themes } from '../display'

// Checks, in each theme, that each item has a selection checkbox, Space chooses an item and gives it
// the indicator bar, the grid layout wraps into columns, and the page passes an accessibility scan and
// fits a phone at double text size.
for (const theme of themes) {
  test(`grid list chooses items in ${theme}`, async ({ page }) => {
    await page.goto('/grid-list')
    await setTheme(page, theme)
    const list = page.getByRole('grid', { name: 'Grid list A', exact: true })
    await expect(list.getByRole('checkbox')).toHaveCount(3)
    const itemB = list.getByRole('row', { name: 'Item B' })
    await itemB.focus()
    await page.keyboard.press('Space')
    await expect(itemB).toHaveAttribute('aria-selected', 'true')
    expect(await itemB.evaluate(element => getComputedStyle(element, '::before').content)).not.toBe('none')
    // The Example's layout control wraps the items into columns.
    await page.locator('.docs-page-lead .mz-demo-area-end-panel').getByRole('button', { name: /layout/ }).click()
    await page.getByRole('option', { name: 'grid', exact: true }).click()
    const cards = list.getByRole('row')
    const first = (await cards.nth(0).boundingBox())!
    const second = (await cards.nth(1).boundingBox())!
    expect(Math.abs(first.y - second.y)).toBeLessThan(2)
    await expectNoAccessibilityViolations(page, 'main')
    await page.setViewportSize({ width: 320, height: 900 })
    await setTextSize(page, 32)
    await expectNoPageOverflow(page)
  })
}
