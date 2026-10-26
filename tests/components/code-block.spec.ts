import { expect, test, type Page } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, textSizes, themes } from '../display'

// The Example's Code block, and its Properties panel controls.
const exampleBlock = (page: Page) => page.locator('.docs-page-lead .mz-demo-area-content .mz-code-block')
const panel = (page: Page) => page.locator('.docs-page-lead .mz-demo-area-end-panel')
const toggle = (page: Page, name: string) => panel(page).locator('label', { hasText: new RegExp(`^${name}$`) }).click()
async function choose(page: Page, label: string, option: string) {
  await panel(page).getByRole('button', { name: new RegExp(label) }).click()
  await page.getByRole('option', { name: option, exact: true }).click()
}

// Checks that the Code block example holds its code in a pre element with a code element inside,
// keeps its line breaks, and fits a 320px screen at normal and doubled text in every theme without
// accessibility problems. Long lines scroll inside the block, so the page itself never scrolls sideways.
for (const theme of themes) {
  test(`Code block examples fit 320px and pass accessibility checks in ${theme}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.goto('/code-block')
    await setTheme(page, theme)
    const first = exampleBlock(page).locator('pre.mz-code-block-content')
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
  const block = exampleBlock(page)
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
  await exampleBlock(page).getByRole('button', { name: 'Copy code' }).focus()
  await page.keyboard.press('Tab')
  const plain = exampleBlock(page).getByRole('region', { name: 'Code', exact: true })
  await expect(plain).toBeFocused()
  await expect(plain).toHaveAttribute('data-focus-visible', 'true')
  await expect(plain).not.toHaveCSS('outline-style', 'none')
  await expect(plain).toHaveAttribute('dir', 'ltr')
  await toggle(page, 'title')
  await expect(exampleBlock(page).getByRole('region', { name: 'example.css', exact: true })).toBeVisible()
})

// Checks that line numbers start from startLine and are hidden from screen readers, that marked lines
// show + and − with a word screen readers hear, and that copying leaves numbers and markers out.
test('Code block line numbers and marked lines', async ({ context, page }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/code-block')
  await toggle(page, 'showLineNumbers')
  await choose(page, 'startLine', '12')
  const numbers = exampleBlock(page).locator('.mz-code-block-line-number')
  await expect(numbers).toHaveText(['12', '13', '14', '15'])
  await expect(numbers.first()).toHaveAttribute('aria-hidden', 'true')
  await toggle(page, 'highlightedLines')
  await toggle(page, 'addedLines')
  await toggle(page, 'removedLines')
  const marked = exampleBlock(page)
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
// value each take a syntax role, and the text itself is unchanged. Without a language, it stays plain.
test('Code block highlights code with a language', async ({ page }) => {
  await page.goto('/code-block')
  const plainText = await exampleBlock(page).locator('pre').textContent()
  await expect(exampleBlock(page).locator('[data-syntax]')).toHaveCount(0)
  await choose(page, 'language', 'css')
  const highlighted = exampleBlock(page).locator('pre')
  await expect(highlighted.locator('[data-syntax]').first()).toBeVisible()
  await expect(highlighted.locator('[data-syntax="constant"]').first()).toBeVisible()
  expect(await highlighted.locator('[data-syntax="constant"]').first().evaluate(element => getComputedStyle(element).color))
    .not.toBe(await highlighted.evaluate(element => getComputedStyle(element).color))
  expect(await highlighted.textContent()).toBe(plainText)
})

// Checks that the block is dark in every theme, because it applies the Dark theme to itself, and that inside
// Wireframe its code is monochrome: a value takes the text colour rather than a syntax colour.
test('Code block is dark in every theme and monochrome in Wireframe', async ({ page }) => {
  await page.goto('/code-block')
  await choose(page, 'language', 'css')
  const block = exampleBlock(page)
  const value = block.locator('[data-syntax="constant"]').first()
  await expect(value).toBeVisible()
  const backgrounds = new Set<string>()
  for (const theme of themes) {
    await setTheme(page, theme)
    await page.evaluate(theme => document.querySelectorAll('main [data-theme]').forEach(element => {
      if (!element.classList.contains('mz-code-block')) (element as HTMLElement).dataset.theme = theme
    }), theme)
    await expect(block).toHaveAttribute('data-theme', 'dark')
    backgrounds.add(await block.evaluate(element => getComputedStyle(element).backgroundColor))
    const [valueColour, textColour] = await Promise.all([value, block.locator('pre')].map(item => item.evaluate(element => getComputedStyle(element).color)))
    if (theme === 'wireframe') expect(valueColour).toBe(textColour)
    else expect(valueColour).not.toBe(textColour)
  }
  expect(backgrounds.size).toBe(1)
})

