import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'

// Checks that the modal opens as a dialog, keeps focus inside, and closes back to its trigger.
test('modal opens and closes back to its trigger', async ({ page }) => {
  await page.goto('/modal')
  const trigger = page.getByRole('button', { name: 'Modal trigger', exact: true })
  await trigger.click()
  const dialog = page.getByRole('dialog', { name: 'Modal title' })
  await expect(dialog).toBeVisible()
  await expectNoAccessibilityViolations(page, '.react-aria-Modal')
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(trigger).toBeFocused()
})

// Checks that focusing the trigger opens its preview in a popover after the wait, and Escape closes it.
test('preview trigger opens its preview on focus', async ({ page }) => {
  await page.goto('/preview-trigger')
  const trigger = page.getByRole('link', { name: 'Link A', exact: true })
  await trigger.focus()
  const preview = page.locator('.react-aria-Popover')
  await expect(preview).toContainText('Preview of Link A.')
  await page.keyboard.press('Escape')
  await expect(preview).toBeHidden()
})

// Checks that sending the form with its required field empty shows the field's error, and the page
// passes an accessibility scan.
test('form shows a required field error on submit', async ({ page }) => {
  await page.goto('/form')
  await page.getByRole('button', { name: 'Submit', exact: true }).click()
  const field = page.getByRole('textbox', { name: 'Field A' })
  await expect(field).toBeFocused()
  await expect(field).toHaveAttribute('aria-invalid', 'true')
  await expectNoAccessibilityViolations(page, 'main')
})

// Checks that the virtualized list draws only a few of its thousand options, and draws later ones
// after scrolling.
test('virtualizer draws only the options in view', async ({ page }) => {
  await page.goto('/virtualizer')
  const list = page.getByRole('listbox', { name: 'List box A', exact: true })
  await expect(list.getByRole('option').first()).toBeVisible()
  expect(await list.getByRole('option').count()).toBeLessThan(50)
  await list.evaluate(element => { element.scrollTop = 16000 })
  // Halfway down, the first drawn option is far into the list, not Option 1.
  await expect.poll(async () => Number((await list.getByRole('option').first().textContent())?.replace('Option ', ''))).toBeGreaterThan(400)
})
