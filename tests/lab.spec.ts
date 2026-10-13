import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('lab desktop panels frame an independently scrolling workspace', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/site/lab')
  const left = page.getByRole('complementary', { name: 'Options', exact: true })
  const right = page.getByRole('complementary', { name: 'Details', exact: true })
  await expect(left).toBeVisible()
  await expect(right).toBeVisible()
  await expect(right.getByRole('button', { name: 'Close Details' })).toHaveCount(0)
  const main = page.getByRole('main')
  const before = (await main.boundingBox())!.width
  await left.getByRole('button', { name: 'Close Options' }).click()
  await expect(left).toBeHidden()
  await expect.poll(async () => (await main.boundingBox())!.width).toBeGreaterThan(before)
  await page.getByRole('button', { name: 'Options', exact: true }).press('Enter')
  await expect(left).toBeVisible()
  const header = await page.getByRole('banner').boundingBox()
  const rail = await page.locator('.lab-rail').boundingBox()
  await main.evaluate(element => { element.scrollTop = element.scrollHeight })
  expect(await page.getByRole('banner').boundingBox()).toEqual(header)
  expect(await page.locator('.lab-rail').boundingBox()).toEqual(rail)
  await expect(page.locator('.lab-bottom-bar')).toBeHidden()
  await page.screenshot({ path: 'test-results/lab-desktop.png' })
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
})

for (const fontSize of [16, 32]) {
  test(`lab narrow layout supports independent drawers at ${fontSize}px`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 })
    await page.goto('/site/lab')
    await page.evaluate(size => { document.documentElement.style.fontSize = `${size}px` }, fontSize)
    await expect(page.locator('.lab-bottom-bar')).toBeVisible()
    await expect(page.locator('.lab-rail')).toBeHidden()
    await expect(page.getByRole('button', { name: 'Menu', exact: true })).toBeVisible()
    for (const name of ['Options', 'Details']) {
      const trigger = page.getByRole('button', { name, exact: true })
      await trigger.click()
      const dialog = page.getByRole('dialog', { name, exact: true })
      await expect(dialog).toBeVisible()
      await page.keyboard.press('Escape')
      await expect(dialog).toBeHidden()
      await expect(trigger).toBeFocused()
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.screenshot({ path: `test-results/lab-mobile-${fontSize}.png` })
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
  })
}

for (const reducedMotion of ['no-preference', 'reduce'] as const) {
  test(`lab respects ${reducedMotion} motion preference`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion })
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/site/lab')
    const body = page.locator('.lab-body')
    await expect(body).toHaveCSS('transition-duration', reducedMotion === 'reduce' ? '0s' : '0.18s')
    await expect(page.getByRole('main')).toHaveCSS('scroll-behavior', reducedMotion === 'reduce' ? 'auto' : 'smooth')
    await page.getByRole('button', { name: 'Options', exact: true }).click()
    await expect(body).toHaveAttribute('data-left-expanded', 'false')
    await expect.poll(async () => body.evaluate(element => getComputedStyle(element).gridTemplateColumns.split(' ')[1])).toBe('0px')
    await page.getByRole('button', { name: 'Options', exact: true }).click()
    await expect.poll(async () => body.evaluate(element => getComputedStyle(element).gridTemplateColumns.split(' ')[1])).toBe('272px')
    await page.setViewportSize({ width: 320, height: 800 })
    await page.getByRole('button', { name: 'Details', exact: true }).click()
    const dialog = page.getByRole('dialog', { name: 'Details', exact: true })
    await expect(dialog).toBeVisible()
    if (reducedMotion === 'reduce') {
      await expect(page.locator('.mezzanine-sidebar-overlay')).toHaveCSS('animation-name', 'none')
      await expect(page.locator('.mezzanine-sidebar-overlay > .mezzanine-sidebar-panel')).toHaveCSS('animation-name', 'none')
    }
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
  })
}
