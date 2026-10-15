import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('More opens a bottom sheet, traps focus and restores it on dismissal', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 })
  await page.goto('/tab-bar')
  const nav = page.getByRole('navigation', { name: 'Tab bar example', exact: true })
  const more = nav.getByRole('button', { name: 'More', exact: true })
  await more.focus()
  await page.keyboard.press('Enter')
  const dialog = page.getByRole('dialog', { name: 'More', exact: true })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('link', { name: 'Account', exact: true })).toBeVisible()
  await expect(dialog.getByRole('link', { name: 'Disabled', exact: true })).toHaveAttribute('aria-disabled', 'true')
  const modal = page.locator('.mezzanine-tab-bar-sheet')
  await expect.poll(async () => {
    const box = (await modal.boundingBox())!
    return Math.round(box.y + box.height)
  }).toBe(800)
  await dialog.getByRole('button', { name: 'Close' }).focus()
  await page.keyboard.press('Shift+Tab')
  await expect(dialog.getByRole('link', { name: 'Settings', exact: true })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(dialog.getByRole('button', { name: 'Close' })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(more).toBeFocused()
  await more.click()
  await dialog.getByRole('button', { name: 'Close' }).click()
  await expect(dialog).toHaveCount(0)
  await expect(more).toBeFocused()
  await more.click()
  await page.mouse.click(4, 4)
  await expect(dialog).toHaveCount(0)
  await expect(more).toBeFocused()
})

test('sheet links select an example destination without leaving the page', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 })
  await page.goto('/tab-bar')
  await page.getByRole('button', { name: 'More', exact: true }).click()
  await page.getByRole('dialog').getByRole('link', { name: 'Account', exact: true }).focus()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/\/tab-bar$/)
  await expect(page.getByRole('button', { name: 'More: Account', exact: true })).toBeVisible()
  await expect(page.getByRole('dialog')).toHaveCount(0)
})

for (const theme of ['light', 'dark', 'wireframe']) {
  for (const fontSize of [16, 32]) {
    test(`${theme} TabBar and sheet fit 320px at ${fontSize}px text`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 800 })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/tab-bar')
      await page.evaluate(({ theme, fontSize }) => {
        document.documentElement.dataset.theme = theme
        document.documentElement.style.fontSize = `${fontSize}px`
      }, { theme, fontSize })
      const nav = page.getByRole('navigation', { name: 'Tab bar example', exact: true })
      const more = nav.getByRole('button', { name: /^More/ })
      await expect(more).toBeVisible()
      if (fontSize === 32) {
        await expect(more).toHaveAccessibleName('More: Home')
        await expect(nav.getByRole('link')).toHaveCount(0)
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)
      expect(await page.locator('.mezzanine-tab-bar-items').evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true)
      expect((await more.boundingBox())!.height).toBeGreaterThanOrEqual(48)
      expect((await new AxeBuilder({ page }).include('main').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([])
      await more.click()
      const dialog = page.getByRole('dialog')
      await expect(dialog).toBeVisible()
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)
      expect((await new AxeBuilder({ page }).include('[role="dialog"]').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([])
      expect(await page.locator('.mezzanine-tab-bar-sheet').evaluate((element) => getComputedStyle(element).animationName)).toBe('none')
      await page.screenshot({ path: `reports/test-results/tab-bar-sheet-${theme}-${fontSize}.png` })
    })
  }
}


test('wide layouts expose all destinations without More', async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1000 })
  await page.goto('/tab-bar')
  const nav = page.getByRole('navigation', { name: 'Tab bar example', exact: true })
  await expect(nav.getByRole('link')).toHaveCount(4)
  await expect(nav.getByRole('button', { name: /^More/ })).toHaveCount(0)
  await expect(nav.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute('aria-current', 'page')
})

test('forced colours retain current-page and focus indicators', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 })
  await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' })
  await page.goto('/tab-bar')
  const nav = page.getByRole('navigation', { name: 'Tab bar example', exact: true })
  await nav.getByRole('link', { name: 'Home', exact: true }).focus()
  await page.keyboard.press('Tab')
  const more = nav.getByRole('button', { name: 'More', exact: true })
  await expect(more).toBeFocused()
  expect(await more.evaluate((element) => getComputedStyle(element).outlineStyle)).toBe('solid')
  await page.keyboard.press('Enter')
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(more).toBeFocused()
})
