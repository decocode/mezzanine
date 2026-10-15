import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import { primitiveCss } from '../../site/lab/layout/layoutLabContent'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, textSizes, themes } from '../display'

// Checks the Lab Layout page fits a 320px screen at normal and doubled text in every theme,
// marks its Lab-only components, and passes an automated accessibility scan.
for (const theme of themes) {
  test(`Lab Layout page fits 320px and passes accessibility checks in ${theme}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.goto('/site/lab/layout')
    await setTheme(page, theme)
    await expect(page.getByRole('heading', { name: 'Layout', level: 1 })).toBeVisible()
    await expect(page.locator('.lab-only').first()).toBeVisible()
    for (const size of textSizes) {
      await setTextSize(page, size)
      await expectNoPageOverflow(page)
    }
    await setTextSize(page, 16)
    await expectNoAccessibilityViolations(page, '.lab-layout')
  })
}

// Checks the demos do what their captions say: the same tile responds to its own slot, the
// Switcher changes at its threshold, and the list becomes a grid when it has a fifth item.
test('Lab Layout demos respond to their space and content', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/site/lab/layout')

  const tiles = page.locator('.lab-two-slots .lab-cq-tile')
  const columns = (index: number) => tiles.nth(index).evaluate(element => getComputedStyle(element).gridTemplateColumns.split(' ').length)
  expect(await columns(0)).toBe(1)
  expect(await columns(1)).toBe(2)

  const switcherFrame = page.locator('.lab-frame').filter({ has: page.locator('.lab-switcher') })
  const rows = () => switcherFrame.locator('.lab-switcher > *').evaluateAll(items => new Set(items.map(item => Math.round(item.getBoundingClientRect().top))).size)
  await switcherFrame.getByRole('button', { name: 'Wide', exact: true }).click()
  await expect.poll(rows).toBe(1)
  await switcherFrame.getByRole('button', { name: '320px', exact: true }).click()
  await expect.poll(rows).toBe(3)

  const list = page.locator('.lab-has-list')
  await expect(list).toHaveCSS('display', 'flex')
  await page.getByRole('button', { name: 'Add an item', exact: true }).click()
  await page.getByRole('button', { name: 'Add an item', exact: true }).click()
  await expect(list).toHaveCSS('display', 'grid')
})

// Checks the CSS shown in each primitive's "The CSS behind it" panel matches the Lab stylesheet,
// so the explanation cannot drift from the rules it describes.
test('Lab Layout CSS notes match the Lab stylesheet', () => {
  const normalise = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim()
  const stylesheet = normalise(readFileSync('site/lab/layout/layout-lab.css', 'utf8'))
  for (const note of Object.values(primitiveCss)) {
    for (const rule of note.code.split(/\n\s*\n/)) expect(stylesheet).toContain(normalise(rule))
  }
})
