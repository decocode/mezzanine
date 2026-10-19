import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, textSizes, themes } from '../display'

// Checks the Navbar example at phone width with only the keyboard: the menu button opens and closes
// the menu, links inside it work, focus returns to the menu button, and the action button still
// works.
test('Navbar menu works with the keyboard at 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/navbar')
  const example = page.locator('main .mz-navbar')
  const trigger = example.getByRole('button', { name: /^(Menu|Close menu)$/ })
  // Actions stay in the bar on narrow screens, before the menu button.
  const action = example.getByRole('button', { name: 'Button', exact: true })
  await action.focus()
  await page.keyboard.press('Tab')
  await expect(trigger).toBeFocused()
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
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
  await action.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('status')).toHaveText('Changes saved.')
  await trigger.click()
  await expect(example.getByRole('navigation', { name: 'Example navigation' })).toBeHidden()
})

// Checks, in each theme at normal and double text size, that the Navbar example fits a phone
// screen: the menu button has a visible focus outline and is large enough to tap, the menu opens
// without animating, nothing overflows and the page passes an accessibility scan.
for (const theme of themes) {
  for (const fontSize of textSizes) {
    test(`${theme} Navbar at 320px and ${fontSize}px text`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 900 })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/navbar')
      await setTheme(page, theme)
      await setTextSize(page, fontSize)
      const example = page.locator('main .mz-navbar')
      const trigger = example.getByRole('button', { name: /^(Menu|Close menu)$/ })
      const action = example.getByRole('button', { name: 'Button', exact: true })
      await expect(action).toBeVisible()
      await action.focus()
      await page.keyboard.press('Tab')
      await expect(trigger).toHaveCSS('outline-style', 'solid')
      expect((await trigger.boundingBox())!.height).toBeGreaterThanOrEqual(44)
      await page.keyboard.press('Enter')
      await expect(trigger).toHaveAttribute('aria-expanded', 'true')
      await expect(example.locator('.mz-navbar-panel')).toHaveCSS('animation-name', 'none')
      await expectNoPageOverflow(page)
      const technicalDetails = page.getByRole('region', { name: 'Technical details', exact: true })
      for (const detailsTrigger of await technicalDetails.getByRole('button').all()) {
        await detailsTrigger.click()
        await expect(detailsTrigger).toHaveAttribute('aria-expanded', 'true')
        expect((await detailsTrigger.boundingBox())!.height).toBeGreaterThanOrEqual(24)
        await expect(detailsTrigger.locator('svg')).toHaveCSS('transition-duration', '0s')
      }
      await expectNoPageOverflow(page)
      // Scan from the page start: keyboard scrolling can leave unrelated Contents links behind the sticky site header.
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
      await expectNoAccessibilityViolations(page, 'main')
    })
  }
}

// Checks that on a wide screen the Navbar shows its links directly instead of a menu button, and
// that links keep a visible focus outline in high-contrast mode.
test('desktop navigation and showcase actions remain accessible', async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1000 })
  await page.goto('/navbar')
  const example = page.locator('main .mz-navbar')
  await expect(example.getByRole('button', { name: /^(Menu|Close menu)$/ })).toBeHidden()
  await expect(example.getByRole('navigation', { name: 'Example navigation' })).toBeVisible()
  await expect(page.getByRole('radiogroup', { name: 'Theme', exact: true })).toBeVisible()
  await page.emulateMedia({ forcedColors: 'active' })
  const linkA = example.getByRole('link', { name: 'Link A', exact: true })
  await linkA.focus()
  await expect(linkA).toHaveCSS('outline-style', 'solid')
})
