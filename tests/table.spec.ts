import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('Table sorting works with pointer and keyboard and supplies one accessible indicator', async ({ page }) => {
  await page.goto('/table')
  const table = page.getByRole('grid', { name: 'Sortable table', exact: true })
  const firstColumn = table.getByRole('columnheader', { name: 'Column A', exact: true })
  await expect(firstColumn).toHaveAttribute('aria-sort', 'ascending')
  await expect(table.locator('tbody tr')).toHaveText(['Row ACell A2Cell A3', 'Row BCell B2Cell B3', 'Row CCell C2Cell C3'])
  await firstColumn.click()
  await expect(firstColumn).toHaveAttribute('aria-sort', 'descending')
  await expect(table.locator('tbody tr')).toHaveText(['Row CCell C2Cell C3', 'Row BCell B2Cell B3', 'Row ACell A2Cell A3'])
  await page.keyboard.press('ArrowRight')
  const secondColumn = table.getByRole('columnheader', { name: 'Column B', exact: true })
  await expect(secondColumn).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(secondColumn).toHaveAttribute('aria-sort', 'ascending')
  await expect(secondColumn).toHaveCSS('outline-style', 'solid')
  await page.keyboard.press('Enter')
  await expect(secondColumn).toHaveAttribute('aria-sort', 'descending')
  const indicator = table.locator('.mezzanine-table-sort-indicator')
  await expect(indicator).toHaveCount(1)
  await expect(indicator).toHaveAttribute('aria-hidden', 'true')
  await expect(indicator).toHaveText('▼')
  await expect(page.getByRole('grid', { name: 'Table with single row selection', exact: true }).locator('.mezzanine-table-sort-indicator')).toHaveCount(0)
})

for (const theme of ['light', 'dark', 'wireframe']) {
  test(`${theme} sortable Table preserves contrast and contained scrolling at 320px`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/table')
    await page.evaluate(theme => document.documentElement.dataset.theme = theme, theme)
    const table = page.getByRole('grid', { name: 'Sortable table', exact: true })
    for (const fontSize of [16, 32]) {
      await page.evaluate(size => document.documentElement.style.fontSize = `${size}px`, fontSize)
      await table.getByRole('columnheader', { name: 'Column A', exact: true }).click()
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)
      expect((await new AxeBuilder({ page }).include('[aria-label="Sortable table"]').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([])
    }
    await page.emulateMedia({ forcedColors: 'active' })
    await expect(table.locator('.mezzanine-table-sort-indicator')).toBeVisible()
  })
}
