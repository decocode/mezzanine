import { expect, test } from '@playwright/test'

// Checks that a single-selection group can be moved through with the arrow keys and selected with Space.
test('single-selection group keeps keyboard selection', async ({ page }) => {
  await page.goto('/toggle-button-group')
  const group = page.getByRole('radiogroup', { name: 'Group A' })
  const first = group.getByRole('radio', { name: 'Toggle A' })
  const second = group.getByRole('radio', { name: 'Toggle B' })
  await first.focus()
  await page.keyboard.press('ArrowRight')
  await expect(second).toBeFocused()
  await page.keyboard.press('Space')
  await expect(second).toBeChecked()
  await expect(first).not.toBeChecked()
})

// Checks that the group example's selectionMode control switches it to multiple selection, where
// several toggles can be selected at once.
test('group example switches to multiple selection', async ({ page }) => {
  await page.goto('/toggle-button-group')
  await page.getByRole('button', { name: /selectionMode/ }).click()
  await page.getByRole('option', { name: 'multiple' }).click()
  const group = page.getByRole('toolbar', { name: 'Group A' })
  await group.getByRole('button', { name: 'Toggle A' }).click()
  await group.getByRole('button', { name: 'Toggle B' }).click()
  await expect(group.getByRole('button', { name: 'Toggle A' })).toHaveAttribute('aria-pressed', 'true')
  await expect(group.getByRole('button', { name: 'Toggle B' })).toHaveAttribute('aria-pressed', 'true')
})
