import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, themes } from '../display'

// Checks each page passes an accessibility scan in every theme and fits a phone screen at double text size.
for (const path of ['/search-field', '/autocomplete', '/list-box']) {
  for (const theme of themes) {
    test(`${path} is accessible in ${theme} and fits a narrow screen`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto(path)
      await setTheme(page, theme)
      await expect(page.getByText('Loading documentation…', { exact: true })).toHaveCount(0)
      await expectNoAccessibilityViolations(page, 'main')
      await page.setViewportSize({ width: 320, height: 900 })
      await setTextSize(page, 32)
      await expectNoPageOverflow(page)
    })
  }
}

// Checks that Escape empties the search field.
test('SearchField clears with Escape', async ({ page }) => {
  await page.goto('/search-field')
  const field = page.getByRole('searchbox', { name: 'Search A', exact: true })
  await field.fill('Term A')
  await field.press('Escape')
  await expect(field).toHaveValue('')
})

// Checks that typing filters the options while focus stays in the field, and the arrow keys move through them.
test('Autocomplete filters as you type and keeps focus in the field', async ({ page }) => {
  await page.goto('/autocomplete')
  const field = page.getByRole('searchbox', { name: 'Search options', exact: true })
  const options = page.getByRole('listbox', { name: 'Options', exact: true }).getByRole('option')
  await expect(options).toHaveCount(4)
  await field.fill('b')
  await expect(options).toHaveText(['Option B'])
  await field.fill('zz')
  await expect(page.getByRole('listbox', { name: 'Options', exact: true })).toHaveText('No results')
  await field.fill('option')
  await field.press('ArrowDown')
  await expect(field).toBeFocused()
  await expect(field).toHaveAttribute('aria-activedescendant', /.+/)
})

// Checks that the arrow keys move between options and Space selects one.
test('ListBox moves with the arrow keys and selects with Space', async ({ page }) => {
  await page.goto('/list-box')
  const list = page.getByRole('listbox', { name: 'Options', exact: true })
  await list.getByRole('option').first().focus()
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Space')
  await expect(list.getByRole('option', { name: /Option B/ })).toHaveAttribute('aria-selected', 'true')
})
