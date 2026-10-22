import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, themes } from '../display'

// Checks, in each theme, that Space chooses a tag and gives it the accent fill, the remove button
// and Delete take tags out, and the page passes an accessibility scan and fits a phone at double text.
for (const theme of themes) {
  test(`tag group chooses and removes tags in ${theme}`, async ({ page }) => {
    await page.goto('/tag-group')
    await setTheme(page, theme)
    const selectable = page.getByRole('grid', { name: 'Tag group A', exact: true })
    const tagB = selectable.getByRole('row', { name: 'Tag B', exact: true })
    const unchosen = await tagB.evaluate(element => getComputedStyle(element).backgroundColor)
    await tagB.focus()
    await page.keyboard.press('Space')
    await expect(tagB).toHaveAttribute('aria-selected', 'true')
    await expect(tagB).not.toHaveCSS('background-color', unchosen)
    const removable = page.getByRole('grid', { name: 'Tag group B', exact: true })
    await removable.getByRole('row', { name: 'Tag A' }).getByRole('button').click()
    await expect(removable.getByRole('row')).toHaveCount(2)
    await removable.getByRole('row', { name: 'Tag B' }).focus()
    await page.keyboard.press('Delete')
    await expect(removable.getByRole('row')).toHaveCount(1)
    await expectNoAccessibilityViolations(page, 'main')
    await page.setViewportSize({ width: 320, height: 900 })
    await setTextSize(page, 32)
    await expectNoPageOverflow(page)
  })
}
