import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, textSizes, themes } from '../display'

// Checks that each Code block example holds its code in a pre element with a code element inside,
// keeps its line breaks, and fits a 320px screen at normal and doubled text in every theme without
// accessibility problems. Long lines scroll inside the block, so the page itself never scrolls sideways.
for (const theme of themes) {
  test(`Code block examples fit 320px and pass accessibility checks in ${theme}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.goto('/code-block')
    await setTheme(page, theme)
    const blocks = page.locator('main .mz-code-block')
    await expect(blocks).toHaveCount(5)
    const first = blocks.first().locator('pre.mz-code-block-content')
    await expect(first.locator('> code')).toHaveCount(1)
    expect(await first.evaluate(element => element.textContent?.split('\n').length)).toBe(4)
    for (const size of textSizes) {
      await setTextSize(page, size)
      await expectNoPageOverflow(page)
    }
    await expectNoAccessibilityViolations(page, 'main .mz-code-block')
  })
}

// Checks that the copy button, reached with the keyboard, copies the code's text, then says
// "Copied" in its name and in a polite status message.
test('Code block copy button copies the code', async ({ context, page }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/code-block')
  const block = page.locator('main .mz-code-block').first()
  const button = block.getByRole('button', { name: 'Copy code' })
  await button.focus()
  await expect(button).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(block.getByRole('button', { name: 'Copied' })).toBeVisible()
  await expect(block.getByRole('status')).toHaveText('Copied')
  const code = await block.locator('pre > code').textContent()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(code)
  await expect(block.getByRole('button', { name: 'Copy code' })).toBeVisible({ timeout: 4000 })
})

// Checks that the code area follows the copy button in the tab order, shows the focus ring, reads left to
// right, and is a region named by its title, or "Code" without one.
test('Code block code area takes keyboard focus and is named', async ({ page }) => {
  await page.goto('/code-block')
  const blocks = page.locator('main .mz-code-block')
  await blocks.first().getByRole('button', { name: 'Copy code' }).focus()
  await page.keyboard.press('Tab')
  const plain = blocks.first().getByRole('region', { name: 'Code', exact: true })
  await expect(plain).toBeFocused()
  await expect(plain).toHaveAttribute('data-focus-visible', 'true')
  await expect(plain).not.toHaveCSS('outline-style', 'none')
  await expect(plain).toHaveAttribute('dir', 'ltr')
  await expect(blocks.nth(2).getByRole('region', { name: 'example.css', exact: true })).toBeVisible()
})

// Checks that line numbers start from startLine and are hidden from screen readers, that marked lines
// show + and − with a word screen readers hear, and that copying leaves numbers and markers out.
test('Code block line numbers and marked lines', async ({ context, page }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/code-block')
  const numbered = page.locator('main .mz-code-block').nth(3)
  const numbers = numbered.locator('.mz-code-block-line-number')
  await expect(numbers).toHaveText(['12', '13', '14', '15'])
  await expect(numbers.first()).toHaveAttribute('aria-hidden', 'true')
  const marked = page.locator('main .mz-code-block').nth(4)
  await expect(marked.locator('.mz-code-block-line[data-mark="added"] .mz-code-block-marker')).toHaveText('+')
  await expect(marked.locator('.mz-code-block-line[data-mark="removed"] .mz-code-block-marker')).toHaveText('−')
  await expect(marked.locator('.mz-code-block-line[data-mark="removed"]')).toContainText('Removed:')
  await expect(marked.locator('.mz-code-block-line[data-mark="highlighted"]')).toHaveCount(1)
  await marked.getByRole('button', { name: 'Copy code' }).click()
  const copied = await page.evaluate(() => navigator.clipboard.readText())
  expect(copied.startsWith('.example {\n  color')).toBe(true)
  expect(copied).not.toMatch(/Removed:|Added:|^\s*\d/)
})

// Checks that a block with a language colours its code once the highlighter loads: a property and a
// value each take a syntax role, and the text itself is unchanged. The plain example stays plain.
test('Code block highlights code with a language', async ({ page }) => {
  await page.goto('/code-block')
  const blocks = page.locator('main .mz-code-block')
  const highlighted = blocks.nth(1).locator('pre')
  await expect(highlighted.locator('[data-syntax]').first()).toBeVisible()
  await expect(highlighted.locator('[data-syntax="constant"]').first()).toBeVisible()
  expect(await highlighted.locator('[data-syntax="constant"]').first().evaluate(element => getComputedStyle(element).color))
    .not.toBe(await highlighted.evaluate(element => getComputedStyle(element).color))
  expect(await highlighted.textContent()).toBe(await blocks.first().locator('pre').textContent())
  await expect(blocks.first().locator('[data-syntax]')).toHaveCount(0)
})

