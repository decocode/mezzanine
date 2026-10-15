import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

for (const theme of ['light', 'dark', 'wireframe']) {
  for (const fontSize of [16, 32]) {
    test(`${theme} Navbar at 320px and ${fontSize}px text`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 900 })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/navbar')
      await page.evaluate(({ theme, fontSize }) => {
        document.documentElement.dataset.theme = theme
        document.documentElement.style.fontSize = `${fontSize}px`
      }, { theme, fontSize })
      const example = page.locator('main .mezzanine-navbar')
      const trigger = example.getByRole('button', { name: /^(Menu|Close menu)$/ })
      // Actions stay in the bar on narrow screens, before the menu button.
      const action = example.getByRole('button', { name: 'Button', exact: true })
      await expect(action).toBeVisible()
      await action.focus()
      await page.keyboard.press('Tab')
      await expect(trigger).toBeFocused()
      await expect(trigger).toHaveAttribute('aria-expanded', 'false')
      expect(await trigger.evaluate(e => getComputedStyle(e).outlineStyle)).toBe('solid')
      expect((await trigger.boundingBox())!.height).toBeGreaterThanOrEqual(44)
      await page.keyboard.press('Enter')
      await expect(trigger).toHaveAccessibleName('Close menu')
      await expect(trigger).toHaveAttribute('aria-expanded', 'true')
      await page.keyboard.press('Tab')
      await expect(example.getByRole('link', { name: 'Home link', exact: true })).toBeFocused()
      await page.keyboard.press('Tab')
      await expect(example.getByRole('link', { name: 'Link A', exact: true })).toBeFocused()
      await page.keyboard.press('Enter')
      await expect(trigger).toBeFocused()
      await expect(trigger).toHaveAttribute('aria-expanded', 'false')
      await expect(page).toHaveURL(/\/navbar$/)
      await page.keyboard.press('Space')
      await expect(example.getByRole('link', { name: 'Link A', exact: true })).toHaveAttribute('aria-current', 'page')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await expect(example.getByRole('link', { name: 'Link B', exact: true })).toBeFocused()
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)
      expect(await example.locator('.mezzanine-navbar-panel').evaluate(e => getComputedStyle(e).animationName)).toBe('none')
      const technicalDetails = page.getByRole('region', { name: 'Technical details', exact: true })
      for (const trigger of await technicalDetails.getByRole('button').all()) {
        await trigger.click()
        await expect(trigger).toHaveAttribute('aria-expanded', 'true')
        expect((await trigger.boundingBox())!.height).toBeGreaterThanOrEqual(24)
        expect(await trigger.locator('svg').evaluate(element => getComputedStyle(element).transitionDuration)).toBe('0s')
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)
      // Scan from the page start: keyboard scrolling can leave unrelated Contents links behind the sticky site header.
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
      expect((await new AxeBuilder({ page }).include('main').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([])
      await example.screenshot({ path: `reports/test-results/navbar-${theme}-${fontSize}.png` })
      await example.getByRole('button', { name: 'Button', exact: true }).focus()
      await page.keyboard.press('Enter')
      await expect(page.getByRole('status')).toHaveText('Changes saved.')
      await trigger.click()
      await expect(example.getByRole('navigation', { name: 'Example navigation' })).toBeHidden()
    })
  }
}

test('desktop navigation and showcase actions remain accessible', async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1000 })
  await page.goto('/navbar')
  const example = page.locator('main .mezzanine-navbar')
  await expect(example.getByRole('button', { name: /^(Menu|Close menu)$/ })).toBeHidden()
  await expect(example.getByRole('navigation', { name: 'Example navigation' })).toBeVisible()
  await expect(page.getByRole('radiogroup', { name: 'Theme', exact: true })).toBeVisible()
  await page.emulateMedia({ forcedColors: 'active' })
  const linkA = example.getByRole('link', { name: 'Link A', exact: true })
  await linkA.focus()
  expect(await linkA.evaluate(e => getComputedStyle(e).outlineStyle)).toBe('solid')
})
