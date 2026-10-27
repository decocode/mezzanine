import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, themes } from '../display'

// Checks, in each theme, that the arrow keys open a parent and turn its chevron, children indent
// further than their parent, Enter chooses a row and gives it the indicator bar, and the page passes
// an accessibility scan and fits a phone at double text size.
for (const theme of themes) {
  test(`tree opens, indents and chooses rows in ${theme}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/tree')
    await setTheme(page, theme)
    const tree = page.getByRole('treegrid', { name: 'Tree', exact: true })
    const branchB = tree.getByRole('row', { name: 'Branch B' })
    await expect(branchB).toHaveAttribute('aria-expanded', 'false')
    await branchB.focus()
    await page.keyboard.press('ArrowRight')
    await expect(branchB).toHaveAttribute('aria-expanded', 'true')
    await expect(branchB.locator('.mz-tree-chevron-icon')).toHaveCSS('rotate', '90deg')
    const leaf = tree.getByRole('row', { name: 'Leaf B1' })
    const indent = (row: typeof leaf) => row.evaluate(element => Number.parseFloat(getComputedStyle(element).paddingInlineStart))
    expect(await indent(leaf)).toBeGreaterThan(await indent(branchB))
    await leaf.focus()
    await page.keyboard.press('Enter')
    await expect(leaf).toHaveAttribute('aria-selected', 'true')
    expect(await leaf.evaluate(element => getComputedStyle(element, '::before').content)).not.toBe('none')
    await expectNoAccessibilityViolations(page, 'main')
    await page.setViewportSize({ width: 320, height: 900 })
    await setTextSize(page, 32)
    await expectNoPageOverflow(page)
  })
}
