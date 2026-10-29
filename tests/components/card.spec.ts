import { expect, test, type Page } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, textSizes, themes } from '../display'

// The example starts with every switch off; this turns the named ones on, in order.
async function switchOn(page: Page, names: string[]) {
  for (const name of names) await page.locator('main .mz-demo-block label', { hasText: new RegExp(`^${name}$`) }).click()
}

// Checks that the Card example starts with only its title and text, and that, with every part
// switched on, it's a plain container (no role of its own) with its picture, heading, text and controls
// inside, and that it fits a 320px screen at normal and doubled text in every
// theme without accessibility problems.
for (const theme of themes) {
  test(`Card example fits 320px and passes accessibility checks in ${theme}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.goto('/card')
    await setTheme(page, theme)
    const card = page.locator('main .mz-card')
    await expect(card).toHaveCount(1)
    await expect(card.locator('.mz-card-image, .mz-avatar, .mz-card-footer')).toHaveCount(0)
    await switchOn(page, ['CardImage', 'Badge', 'ToggleButton', 'Avatar', 'CardFooter', 'Detail', 'Button'])
    await expect(card).not.toHaveAttribute('role')
    await expect(card.getByRole('heading', { name: 'Card title', level: 3 })).toBeVisible()
    await expect(card.getByRole('button', { name: 'Favourite', exact: true })).toBeVisible()
    await expect(card.getByRole('button', { name: 'Button', exact: true })).toBeVisible()
    for (const size of textSizes) {
      await setTextSize(page, size)
      await expectNoPageOverflow(page)
      expect(await card.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true)
    }
    await expectNoAccessibilityViolations(page, 'main .mz-card')
  })
}

// Checks that in a card with a linked title, the title is the card's only link and its name is just
// the title, that pressing the card's text follows it, and that a control inside the card takes its
// own press instead.
test('a linked CardTitle covers the card, and controls inside it stay pressable', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/card')
  await switchOn(page, ['CardImage', 'ToggleButton', 'href'])
  const card = page.locator('main .mz-card')
  await expect(card.getByRole('link')).toHaveCount(1)
  await expect(card.getByRole('link')).toHaveAccessibleName('Card title')
  const toggle = card.getByRole('button', { name: 'Favourite', exact: true })
  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-pressed', 'true')
  await expect(page).toHaveURL(/\/card$/)
  await page.goto('/dimension')
  // The title's link covers the text, so the press lands where a mouse would, on the text's position.
  const text = await page.locator('main .mz-card', { has: page.getByRole('heading', { name: 'Aspect ratio', level: 3 }) }).getByText('A set shape that crops pictures to fit.').boundingBox()
  await page.mouse.click(text!.x + 4, text!.y + text!.height / 2)
  await expect(page).toHaveURL(/\/dimension\/aspect-ratio$/)
})

// Checks that a linked card shows a hidden arrow, that keyboard focus on its title shows a ring
// around the whole card, and that pressing Enter follows it.
test('a linked Card shows its focus ring on the card and keyboard users can follow it', async ({ page }) => {
  await page.goto('/dimension')
  const card = page.locator('main .mz-card', { has: page.getByRole('heading', { name: 'Width', level: 3 }) })
  const link = card.getByRole('link', { name: 'Width', exact: true })
  await expect(link).toHaveAttribute('href', '/dimension/width')
  await expect(card.locator('.mz-card-arrow')).toHaveAttribute('aria-hidden', 'true')
  await link.focus()
  await page.keyboard.press('Shift+Tab')
  await page.keyboard.press('Tab')
  await expect(link).toHaveAttribute('data-focus-visible', 'true')
  expect(await card.evaluate(element => getComputedStyle(element).outlineStyle)).toBe('solid')
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/\/dimension\/width$/)
  await expectNoAccessibilityViolations(page, 'main')
})

// Checks that a linked card with a footer shows its arrow at the footer's end, and its title's own
// arrow row is hidden.
test('a linked Card with a footer shows its arrow in the footer', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/card')
  await switchOn(page, ['href', 'CardFooter'])
  const card = page.locator('main .mz-demo-block .mz-card').first()
  await expect(card.locator('.mz-card-footer > .mz-card-arrow')).toBeVisible()
  await expect(card.locator('> .mz-card-arrow')).toBeHidden()
})
