import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, themes } from '../display'

// The Lab's candidate Item, from shadcn/ui's React Aria Item. Illustrative and unapproved.

// Checks that the Parts group adds and removes the Item's optional parts, and the Code tab follows.
test('the Lab Item adds and removes its parts', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/site/lab/item')
  const demo = page.locator('.lab-demo-block').first()
  const item = demo.locator('.lab-item')
  await expect(item.locator('.lab-item-media')).toHaveCount(1)
  await expect(item.locator('.lab-item-header')).toHaveCount(0)
  const parts = demo.getByRole('region', { name: 'Parts', exact: true })
  await parts.locator('label', { hasText: /^ItemHeader$/ }).click()
  await parts.locator('label', { hasText: /^ItemMedia$/ }).click()
  await expect(item.locator('.lab-item-header')).toHaveText('Header A')
  await expect(item.locator('.lab-item-media')).toHaveCount(0)
  await demo.getByRole('tab', { name: 'Code' }).click()
  await expect(demo.locator('.mz-code-block')).toContainText('<ItemHeader>Header A</ItemHeader>')
  await expect(demo.locator('.mz-code-block')).not.toContainText('ItemMedia')
})

// Checks that with href the title is the Item's one link, covering the Item, while its action button
// still takes its own press without following the link.
test('a linked Lab Item keeps its action pressable', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/site/lab/item')
  const demo = page.locator('.lab-demo-block').first()
  await demo.locator('.lab-demo-block-properties label', { hasText: /^href$/ }).click()
  const item = demo.locator('.lab-item')
  await expect(item.getByRole('link')).toHaveCount(1)
  await expect(item.getByRole('link')).toHaveAccessibleName('Item A')
  await item.getByRole('button', { name: 'Button A' }).click()
  await expect(page).toHaveURL(/\/site\/lab\/item$/)
  const box = (await item.boundingBox())!
  await page.mouse.click(box.x + box.width / 2, box.y + box.height - 4)
  await expect(page).toHaveURL(/\/card$/)
})

// Checks the page in each theme, at 320px with text at 200%, against an accessibility scan.
for (const theme of themes) {
  test(`${theme} Lab Item passes a scan and fits 320px`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.goto('/site/lab/item')
    await expect(page.locator('.lab-item')).toBeVisible()
    await setTheme(page, theme)
    await setTextSize(page, 32)
    await expectNoPageOverflow(page)
    await setTextSize(page, 16)
    await expectNoAccessibilityViolations(page, 'main')
  })
}
