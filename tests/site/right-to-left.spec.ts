import { expect, test, type Page } from '@playwright/test'

// Mezzanine describes sides as start and end, so components mirror when the page reads right to left,
// as it does for Arabic and Hebrew.

async function readRightToLeft(page: Page) {
  await page.evaluate(() => { document.documentElement.dir = 'rtl' })
}

// Checks that a checkbox's box moves to the right of its label, which is where the line starts.
test('Checkbox puts its box at the start of the line in right to left', async ({ page }) => {
  await page.goto('/checkbox')
  await readRightToLeft(page)
  const checkbox = page.locator('main .mz-checkbox').first()
  const box = (await checkbox.locator('.mz-checkbox-indicator').boundingBox())!
  const row = (await checkbox.boundingBox())!
  expect(box.x + box.width).toBeGreaterThan(row.x + row.width - 2)
})

// Checks that Breadcrumbs reads from the right, so the first crumb is the rightmost.
test('Breadcrumbs runs from the right in right to left', async ({ page }) => {
  await page.goto('/breadcrumbs')
  await readRightToLeft(page)
  const crumbs = page.locator('main .mz-breadcrumbs').first().locator('.mz-breadcrumb')
  const first = (await crumbs.first().boundingBox())!
  const last = (await crumbs.last().boundingBox())!
  expect(first.x).toBeGreaterThan(last.x)
})

// Checks that a nested On this page list is indented from the right, not the left.
test('Table of contents indents nested links from the start of the line in right to left', async ({ page }) => {
  await page.setViewportSize({ width: 800, height: 900 })
  await page.goto('/button')
  await readRightToLeft(page)
  // A nested link keeps its full-width tint and indents its text from the start, the right.
  const nested = page.locator('.mz-table-of-contents ul ul .mz-link').first()
  const padding = await nested.evaluate(element => { const style = getComputedStyle(element); return [Number.parseFloat(style.paddingRight), Number.parseFloat(style.paddingLeft)] })
  expect(padding[0]).toBeGreaterThan(padding[1])
})

// Checks the Reading direction example: in right to left, the logical box's border moves to the right
// and the physical box's border stays on the left.
test('Reading direction shows logical sides mirroring and physical sides staying put', async ({ page }) => {
  await page.goto('/typography/global-and-languages')
  const physical = page.locator('.text-direction-physical')
  const logical = page.locator('.text-direction-logical')
  await expect(logical).toHaveCSS('border-left-style', 'solid')
  await page.locator('label').filter({ hasText: 'Show right to left' }).click()
  await expect(page.getByRole('checkbox', { name: 'Show right to left', exact: true })).toBeChecked()
  await expect(logical).toHaveCSS('border-right-style', 'solid')
  await expect(logical).toHaveCSS('border-left-style', 'none')
  await expect(physical).toHaveCSS('border-left-style', 'solid')
})
