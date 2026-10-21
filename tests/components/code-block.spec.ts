import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, textSizes, themes } from '../display'

// Checks that the Code block example is a pre element holding a code element, keeps its line
// breaks, and fits a 320px screen at normal and doubled text in every theme without
// accessibility problems.
for (const theme of themes) {
  test(`Code block example fits 320px and passes accessibility checks in ${theme}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.goto('/code-block')
    await setTheme(page, theme)
    const block = page.locator('main pre.mz-code-block')
    await expect(block).toHaveCount(1)
    await expect(block.locator('> code')).toHaveCount(1)
    expect(await block.evaluate(element => element.textContent?.split('\n').length)).toBe(4)
    for (const size of textSizes) {
      await setTextSize(page, size)
      await expectNoPageOverflow(page)
      expect(await block.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true)
    }
    await expectNoAccessibilityViolations(page, 'main pre.mz-code-block')
  })
}

// Checks that the copy button, reached with the keyboard, copies the code's text, then says
// "Copied" in its name and in a polite status message.
test('Code block copy button copies the code', async ({ context, page }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/code-block')
  const block = page.locator('main pre.mz-code-block')
  const button = block.getByRole('button', { name: 'Copy code' })
  await button.focus()
  await expect(button).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(block.getByRole('button', { name: 'Copied' })).toBeVisible()
  await expect(block.getByRole('status')).toHaveText('Copied')
  const code = await block.locator('> code').textContent()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(code)
  await expect(block.getByRole('button', { name: 'Copy code' })).toBeVisible({ timeout: 4000 })
})
