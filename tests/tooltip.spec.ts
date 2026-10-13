import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('theme tooltips support hover, hoverable content and Escape dismissal', async ({ page }) => {
  await page.goto('/')
  await page.mouse.move(0, 500)
  for (const name of ['Light theme', 'Dark theme', 'Wireframe theme']) {
    const control = page.getByRole('radio', { name, exact: true })
    await control.hover()
    const tooltip = page.getByRole('tooltip', { name, exact: true })
    await expect(tooltip).toBeVisible()
    await expect(control).toHaveAttribute('aria-describedby', await tooltip.getAttribute('id'))
    await tooltip.hover()
    // Remain open beyond the trigger's default 500ms close delay.
    await page.waitForTimeout(650)
    await expect(tooltip).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(tooltip).toBeHidden()
    await page.mouse.move(0, 500)
  }
})

for (const theme of ['light', 'dark', 'wireframe']) {
  for (const fontSize of [16, 32]) {
    test(`${theme} tooltips fit 320px with ${fontSize}px text and reduced motion`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 900 })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/')
      await page.evaluate(({ theme, fontSize }) => {
        document.documentElement.dataset.theme = theme
        document.documentElement.style.fontSize = `${fontSize}px`
      }, { theme, fontSize })
      await page.getByRole('banner').getByRole('button', { name: 'Menu', exact: true }).click()
      const control = page.getByRole('radio', { name: 'Dark theme', exact: true })
      await page.keyboard.press('Tab')
      await control.focus()
      const tooltip = page.getByRole('tooltip', { name: 'Dark theme', exact: true })
      await expect(tooltip).toBeVisible()
      expect(await tooltip.evaluate(element => getComputedStyle(element).animationName)).toBe('none')
      const box = (await tooltip.boundingBox())!
      expect(box.x).toBeGreaterThanOrEqual(0)
      expect(box.x + box.width).toBeLessThanOrEqual(320)
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)
      expect((await control.boundingBox())!.height).toBeGreaterThanOrEqual(44)
      expect(await control.evaluate(element => getComputedStyle(element).outlineStyle)).toBe('solid')
      expect((await new AxeBuilder({ page }).include('[role="tooltip"]').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([])
      await tooltip.screenshot({ path: `test-results/tooltip-${theme}-${fontSize}.png` })
      await page.keyboard.press('Escape')
      await expect(tooltip).toBeHidden()
      await expect(control).toBeFocused()
      await page.keyboard.press('Space')
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
      await expect(control).toBeChecked()
    })
  }
}

test('theme tooltips remain visible in forced colours', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' })
  await page.goto('/')
  await page.getByRole('radio', { name: 'Dark theme', exact: true }).focus()
  const tooltip = page.getByRole('tooltip', { name: 'Dark theme', exact: true })
  await expect(tooltip).toBeVisible()
  expect(await tooltip.evaluate(element => getComputedStyle(element).borderStyle)).toBe('solid')
})

test('Tooltip documentation example supports hover and keyboard focus at narrow widths', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/tooltip')
  const button = page.getByRole('main').getByRole('button', { name: 'Settings', exact: true })
  await page.mouse.move(0, 0)
  await button.hover()
  const tooltip = page.getByRole('tooltip', { name: 'Settings', exact: true })
  await expect(tooltip).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(tooltip).toBeHidden()
  await page.mouse.move(0, 0)
  for (const fontSize of [16, 32]) {
    await page.evaluate(size => document.documentElement.style.fontSize = `${size}px`, fontSize)
    await button.scrollIntoViewIfNeeded()
    // Let scroll-triggered overlay dismissal finish before focusing the example.
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
    await page.getByRole('navigation', { name: 'On this page', exact: true }).getByRole('link', { name: 'References', exact: true }).evaluate(element => (element as HTMLElement).focus({ preventScroll: true }))
    await page.keyboard.press('Tab')
    await expect(button).toBeFocused()
    await expect(tooltip).toBeVisible()
    const box = (await tooltip.boundingBox())!
    expect(box.x).toBeGreaterThanOrEqual(0)
    expect(box.x + box.width).toBeLessThanOrEqual(320)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)
    expect((await new AxeBuilder({ page }).include('main').include('[role="tooltip"]').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([])
    await page.screenshot({ path: `test-results/tooltip-page-${fontSize}.png`, fullPage: true })
    await page.keyboard.press('Escape')
    await expect(tooltip).toBeHidden()
    await expect(button).toBeFocused()
  }
})

test('Tooltip documentation explains touch behaviour and tapping does not open a tooltip', async ({ browser }) => {
  const context = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 320, height: 900 } })
  try {
    const page = await context.newPage()
    await page.goto('/tooltip')
    await expect(page.getByText(/tooltips cannot be viewed on touchscreen devices/)).toBeVisible()
    await page.getByRole('button', { name: 'Settings', exact: true }).tap()
    // Wait beyond the hover delay to catch accidental tooltips from touch events.
    await page.waitForTimeout(650)
    await expect(page.getByRole('tooltip')).toHaveCount(0)
    await expect(page).toHaveURL(/\/tooltip$/)
  } finally {
    await context.close()
  }
})
