import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, textSizes, themes } from '../display'

// Checks typing in a text field, its help text, moving between fields with Tab, that read-only and
// disabled fields can't be changed, and that the email field shows an error until it holds a valid
// address.
test('text fields support keyboard editing, descriptions and validation', async ({ page }) => {
  await page.goto('/text-field')
  const field = page.getByRole('textbox', { name: 'Field label', exact: true })
  await expect(field).toHaveAccessibleDescription('Supporting information about this field.')
  await field.focus()
  await page.keyboard.type('Example value')
  await expect(page.getByText('Current value: Example value')).toBeVisible()
  await expect(field).toHaveAttribute('data-focused')
  await expect(field).toHaveCSS('outline-style', 'solid')
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

// Checks, in each theme at normal and double text size, that text fields fit a phone screen even
// with a long value, are tall enough to tap and pass an accessibility scan.
for (const theme of themes) {
  for (const fontSize of textSizes) {
    test(`${theme} fields reflow at 320px with ${fontSize}px root text`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 900 })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/text-field')
      await setTheme(page, theme)
      await setTextSize(page, fontSize)
      const field = page.getByRole('textbox', { name: 'Field label', exact: true })
      await expect(field).toBeVisible()
      await field.fill('A long value that should remain within the input rather than widen the page')
      await expectNoPageOverflow(page)
      expect((await field.boundingBox())!.height).toBeGreaterThanOrEqual(44)
      await expectNoAccessibilityViolations(page, 'main')
    })
  }
}

// Checks that a focused text field keeps a visible focus outline in high-contrast mode.
test('forced colours retain a visible keyboard focus indicator', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' })
  await page.goto('/text-field')
  const field = page.getByRole('textbox', { name: 'Field label', exact: true })
  await field.focus()
  await expect(field).toHaveCSS('outline-style', 'solid')
  await expect(field).toHaveAttribute('data-focused')
})
