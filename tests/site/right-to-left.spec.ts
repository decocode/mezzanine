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
  const checkbox = page.locator('main .react-aria-Checkbox').first()
  const box = (await checkbox.locator('.mezzanine-checkbox-indicator').boundingBox())!
  const row = (await checkbox.boundingBox())!
  expect(box.x + box.width).toBeGreaterThan(row.x + row.width - 2)
})

// Checks that Breadcrumbs reads from the right, so the first crumb is the rightmost.
test('Breadcrumbs runs from the right in right to left', async ({ page }) => {
  await page.goto('/breadcrumbs')
  await readRightToLeft(page)
  const crumbs = page.locator('main .react-aria-Breadcrumbs').first().locator('.react-aria-Breadcrumb')
  const first = (await crumbs.first().boundingBox())!
  const last = (await crumbs.last().boundingBox())!
  expect(first.x).toBeGreaterThan(last.x)
})

// Checks that a nested On this page list is indented from the right, not the left.
test('Table of contents indents nested links from the start of the line in right to left', async ({ page }) => {
  await page.setViewportSize({ width: 800, height: 900 })
  await page.goto('/button')
  await readRightToLeft(page)
  const nested = page.locator('.mezzanine-table-of-contents ul ul').first()
  await expect(nested).toHaveCSS('padding-right', /^[1-9]/)
  await expect(nested).toHaveCSS('padding-left', '0px')
})
