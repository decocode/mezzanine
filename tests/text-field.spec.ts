import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('text fields support keyboard editing, descriptions and validation', async ({ page }) => {
  await page.goto('/text-field')
  const field = page.getByRole('textbox', { name: 'Field label', exact: true })
  await expect(field).toHaveAccessibleDescription('Supporting information about this field.')
  await field.focus()
  await page.keyboard.type('Example value')
  await expect(page.getByText('Current value: Example value')).toBeVisible()
  await expect(field).toHaveAttribute('data-focused')
  expect(await field.evaluate((element) => getComputedStyle(element).outlineStyle)).toBe('solid')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('textbox', { name: 'Read-only field', exact: true })).toBeFocused()
  await page.keyboard.type('Changed')
  await expect(page.getByRole('textbox', { name: 'Read-only field', exact: true })).toHaveValue('Read-only value')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('textbox', { name: 'Invalid field', exact: true })).toBeFocused()
  await expect(page.getByRole('textbox', { name: 'Disabled field', exact: true })).toBeDisabled()
  const email = page.getByRole('textbox', { name: 'Email address (required)', exact: true })
  await page.getByRole('button', { name: 'Validate field' }).click()
  await expect(email).toBeFocused()
  await expect(email).toHaveAttribute('aria-invalid', 'true')
  await expect(email).toHaveAccessibleDescription(/Please fill out this field/)
  await email.fill('name@example.com')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('button', { name: 'Validate field' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('status')).toHaveText('The email address passed validation.')
})

for (const theme of ['light', 'dark', 'wireframe']) {
  for (const fontSize of [16, 32]) {
    test(`${theme} fields reflow at 320px with ${fontSize}px root text`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 900 })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/text-field')
      await page.evaluate(({ theme, fontSize }) => {
        document.documentElement.dataset.theme = theme
        document.documentElement.style.fontSize = `${fontSize}px`
      }, { theme, fontSize })
      const field = page.getByRole('textbox', { name: 'Field label', exact: true })
      await expect(field).toBeVisible()
      await field.fill('A long value that should remain within the input rather than widen the page')
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)
      expect((await field.boundingBox())!.height).toBeGreaterThanOrEqual(48)
      const violations = (await new AxeBuilder({ page }).include('main').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations
      expect(violations).toEqual([])
      await field.scrollIntoViewIfNeeded()
      await page.screenshot({ path: `test-results/text-field-${theme}-${fontSize}.png` })
    })
  }
}

test('forced colours retain a visible keyboard focus indicator', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' })
  await page.goto('/text-field')
  const field = page.getByRole('textbox', { name: 'Field label', exact: true })
  await field.focus()
  expect(await field.evaluate((element) => getComputedStyle(element).outlineStyle)).toBe('solid')
  await expect(field).toHaveAttribute('data-focused')
})
