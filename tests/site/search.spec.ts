import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import { wcagTags } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, textSizes, themes } from '../display'

// The site search composes SearchField, ListBox and Autocomplete in a modal Dialog, opened from the
// navigation Panel, or from the TopBar menu on narrow screens.

async function openSearch(page: Page, path = '/introduction') {
  await page.goto(path)
  const trigger = page.getByRole('banner').locator('.mz-search-trigger').filter({ visible: true })
  await trigger.focus()
  await page.keyboard.press('Enter')
  const field = page.getByRole('dialog', { name: 'Search' }).getByRole('searchbox', { name: 'Search', exact: true })
  await expect(field).toBeFocused()
  return { trigger, field }
}

// Checks that typing filters the results while focus stays in the field, that the arrow keys move
// the highlighted result, and that Enter opens the highlighted page.
test('search results filter as you type and open with the keyboard', async ({ page }) => {
  const { field } = await openSearch(page)
  const results = page.getByRole('listbox', { name: 'Results' })
  await page.keyboard.type('corn')
  await expect(results.getByRole('option')).toHaveText(['CornersFoundations › Shape'])
  await expect(results.getByRole('option', { name: 'Corners' })).toHaveAccessibleDescription('Foundations › Shape')
  await expect(field).toBeFocused()
  await expect(field).toHaveAttribute('aria-activedescendant', /.+/)
  await expect(results.getByRole('option', { name: 'Corners' })).toHaveAttribute('data-focus-visible')
  await field.fill('co')
  const first = results.getByRole('option').first()
  const second = results.getByRole('option').nth(1)
  await expect(first).toHaveAttribute('data-focused')
  await page.keyboard.press('ArrowDown')
  await expect(second).toHaveAttribute('data-focused')
  await expect(field).toBeFocused()
  const destination = await second.getAttribute('href')
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(new RegExp(`${destination}$`))
})

// Checks that docs pages search the docs only, that Lab pages group results under Docs and Lab, that
// groups with no matches disappear, and that a search with no matches says so.
test('search groups results by area and reports no results', async ({ page }) => {
  await openSearch(page)
  await expect(page.getByRole('listbox', { name: 'Results' }).getByRole('group')).toHaveCount(1)
  await page.keyboard.press('Escape')
  const { field } = await openSearch(page, '/site/lab')
  const results = page.getByRole('listbox', { name: 'Results' })
  await expect(results.getByRole('group')).toHaveCount(2)
  await expect(results.getByText('Docs', { exact: true })).toBeVisible()
  await expect(results.getByText('Lab', { exact: true })).toBeVisible()
  await field.fill('masonry')
  await expect(results.getByText('Docs', { exact: true })).toHaveCount(0)
  await expect(results.getByText('Lab', { exact: true })).toBeVisible()
  await field.fill('zzzz')
  // React Aria marks the list as empty and shows the empty state in place of the results.
  await expect(results).toHaveAttribute('data-empty', 'true')
  await expect(results).toHaveText('No results')
})

// Checks that the clear button empties the field, that Escape first clears the text and then closes
// the dialog, and that focus returns to the Search button.
test('search clears with its button and Escape, then closes and restores focus', async ({ page }) => {
  const { trigger, field } = await openSearch(page)
  const clear = page.getByRole('dialog').getByRole('button', { name: 'Clear search' })
  await expect(clear).toBeHidden()
  await page.keyboard.type('text')
  await expect(clear).toBeVisible()
  expect((await clear.boundingBox())!.height).toBeGreaterThanOrEqual(24)
  await clear.click()
  await expect(field).toHaveValue('')
  await expect(field).toBeFocused()
  await page.keyboard.type('text')
  await page.keyboard.press('Escape')
  await expect(field).toHaveValue('')
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(trigger).toBeFocused()
})

// Checks, in each theme at normal and double text size, that the open search fits a phone screen,
// that results are tall enough to tap, and that it passes an accessibility scan.
for (const theme of themes) {
  for (const fontSize of textSizes) {
    test(`${theme} search reflows at 320px with ${fontSize}px root text`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 640 })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/introduction')
      await setTheme(page, theme)
      await setTextSize(page, fontSize)
      await page.getByRole('button', { name: 'Menu', exact: true }).click()
      await page.getByRole('banner').locator('.mz-search-trigger').filter({ visible: true }).click()
      const dialog = page.getByRole('dialog', { name: 'Search' })
      const field = dialog.getByRole('searchbox', { name: 'Search', exact: true })
      await field.fill('a long search phrase that should stay inside the field')
      await expectNoPageOverflow(page)
      await field.fill('box')
      const option = dialog.getByRole('option').first()
      await expect(option).toBeVisible()
      expect((await option.boundingBox())!.height).toBeGreaterThanOrEqual(44)
      const dialogBox = (await dialog.boundingBox())!
      expect(dialogBox.x).toBeGreaterThanOrEqual(0)
      expect(dialogBox.x + dialogBox.width).toBeLessThanOrEqual(320)
      // The results scroll while focus stays in the field, as in React Aria's Autocomplete. The scan
      // cannot see that the arrow keys reach every result, so that is checked by the next test instead.
      const scan = await new AxeBuilder({ page }).withTags(wcagTags).include('[role="dialog"]').disableRules(['scrollable-region-focusable']).analyze()
      expect(scan.violations).toEqual([])
    })
  }
}

// Checks that the arrow keys reach the last result and scroll it into view, so every result in the
// scrolling list can be reached from the field.
test('the arrow keys reach and reveal every result', async ({ page }) => {
  // Short enough that the results scroll, and wide enough to keep the navigation Panel beside the page.
  await page.setViewportSize({ width: 1280, height: 480 })
  const { field } = await openSearch(page)
  const options = page.getByRole('listbox', { name: 'Results' }).getByRole('option')
  const last = options.last()
  await expect(last).not.toBeInViewport()
  const count = await options.count()
  await page.keyboard.press('ArrowDown')
  for (let index = 1; index < count; index++) await page.keyboard.press('ArrowDown')
  await expect(last).toHaveAttribute('data-focused')
  await expect(last).toBeInViewport()
  await expect(field).toBeFocused()
})

// Checks that the highlighted result keeps a visible outline in high-contrast mode.
test('forced colours keep the highlighted result visible', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' })
  await openSearch(page)
  await page.keyboard.type('corn')
  await expect(page.getByRole('option', { name: 'Corners' })).toHaveCSS('outline-style', 'solid')
})

// Checks that Cmd+K or Ctrl+K opens search from anywhere on the page, with focus in the field.
for (const shortcut of ['Meta+k', 'Control+k']) {
  test(`${shortcut} opens search`, async ({ page }) => {
    await page.goto('/introduction')
    await expect(page.getByText('Loading documentation…', { exact: true })).toHaveCount(0)
    await page.keyboard.press(shortcut)
    await expect(page.getByRole('dialog', { name: 'Search' })).toHaveCount(1)
    await expect(page.getByRole('dialog', { name: 'Search' }).getByRole('searchbox', { name: 'Search', exact: true })).toBeFocused()
  })
}
