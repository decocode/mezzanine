import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { setTheme, themes } from '../display'

// Plain <kbd>, styled by Mezzanine's base text styles, on the Semantic HTML page.

// Checks that a single key draws a box, and that a combination, a <kbd> holding a <kbd> for each key,
// draws none of its own and sets its keys side by side.
test('kbd shows a key, and a combination as one box per key', async ({ page }) => {
  await page.goto('/typography/semantic-html')
  const example = page.locator('main p.mz-text-body-md:has(kbd)').first()
  const single = example.locator('kbd:not(:has(kbd))').first()
  await expect(single).toHaveText('Esc')
  expect(await single.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe('rgba(0, 0, 0, 0)')
  const combination = example.locator('kbd:has(> kbd)').first()
  await expect(combination.locator('> kbd')).toHaveText(['⌘', 'K'])
  expect(await combination.evaluate((element) => getComputedStyle(element).backgroundColor)).toBe('rgba(0, 0, 0, 0)')
  const [first, second] = await combination.locator('> kbd').evaluateAll((keys) => keys.map((key) => key.getBoundingClientRect()))
  expect(second.left).toBeGreaterThan(first.right)
})

// Checks that in forced colours each key keeps a visible edge, and a combination draws none.
test('kbd keeps its edge in forced colours', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' })
  await page.goto('/typography/semantic-html')
  const example = page.locator('main p.mz-text-body-md:has(kbd)').first()
  await expect(example.locator('kbd').first()).toBeVisible()
  expect(await example.locator('kbd:not(:has(kbd))').first().evaluate((element) => getComputedStyle(element).borderTopStyle)).toBe('solid')
  expect(await example.locator('kbd:has(> kbd)').first().evaluate((element) => getComputedStyle(element).borderTopStyle)).toBe('none')
})

// Checks the keys against an accessibility scan in each theme.
for (const theme of themes) {
  test(`${theme} kbd passes a scan`, async ({ page }) => {
    await page.goto('/typography/semantic-html')
    await expect(page.locator('main kbd').first()).toBeVisible()
    await setTheme(page, theme)
    await expectNoAccessibilityViolations(page, 'main p.mz-text-body-md:has(kbd)')
  })
}
