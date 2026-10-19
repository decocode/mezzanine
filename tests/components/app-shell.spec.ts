import { expect, test, type Page } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, textSizes, themes } from '../display'

// These checks use the AppShell docs page, whose example has Panel A at the start (open at first),
// Panel B at the end and Panel C at the bottom (with a minimised version), each with a PanelTrigger.

const shell = (page: Page) => page.locator('.app-shell-example')
const trigger = (page: Page, name: string) => shell(page).getByRole('button', { name, exact: true })
const panel = (page: Page, name: string) => shell(page).getByRole('complementary', { name, exact: true })

// Checks that open Panels share the space: the main content shrinks, triggers report the state,
// and a Panel's own close button returns focus to its trigger.
test('Panels open beside the main content and close back to their trigger', async ({ page }) => {
  await page.setViewportSize({ width: 1800, height: 1000 })
  await page.goto('/app-shell')
  const main = shell(page).getByRole('main')
  await expect(trigger(page, 'Panel A')).toHaveAttribute('aria-expanded', 'true')
  await expect(panel(page, 'Panel A')).toBeVisible()
  const withPanel = (await main.boundingBox())!.width

  await panel(page, 'Panel A').getByRole('button', { name: 'Close Panel A', exact: true }).click()
  await expect(trigger(page, 'Panel A')).toHaveAttribute('aria-expanded', 'false')
  await expect(trigger(page, 'Panel A')).toBeFocused()
  await expect(shell(page).getByText('A start Panel.')).toBeHidden()
  await expect.poll(async () => (await main.boundingBox())!.width).toBeGreaterThan(withPanel + 100)

  await trigger(page, 'Panel B').click()
  await expect(trigger(page, 'Panel B')).toHaveAttribute('aria-expanded', 'true')
  await expect(panel(page, 'Panel B')).toBeVisible()
  await expect(page.getByRole('dialog')).toHaveCount(0)
})

// Checks that a bottom Panel shows its minimised version when closed and its full content when open.
test('A bottom Panel swaps its minimised version for its content', async ({ page }) => {
  await page.setViewportSize({ width: 1800, height: 1000 })
  await page.goto('/app-shell')
  await expect(shell(page).getByText('Panel C, minimised')).toBeVisible()
  await trigger(page, 'Panel C').click()
  await expect(shell(page).getByText('A bottom Panel.')).toBeVisible()
  await expect(shell(page).getByText('Panel C, minimised')).toHaveCount(0)
})

// Checks that when two side Panels don't both fit, the end Panel opens as a modal drawer: focus
// moves into it, Escape closes it and focus returns to its trigger. A drawer never opens by itself.
test('The end Panel becomes a drawer when there is no room beside the content', async ({ page }) => {
  await page.setViewportSize({ width: 1100, height: 900 })
  await page.goto('/app-shell')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await trigger(page, 'Panel B').focus()
  await page.keyboard.press('Enter')
  const drawer = page.getByRole('dialog', { name: 'Panel B', exact: true })
  await expect(drawer).toBeVisible()
  await expect.poll(() => drawer.evaluate(element => element.contains(document.activeElement))).toBe(true)
  await page.keyboard.press('Escape')
  await expect(drawer).toHaveCount(0)
  await expect(trigger(page, 'Panel B')).toBeFocused()
  await expect(trigger(page, 'Panel B')).toHaveAttribute('aria-expanded', 'false')
})

// Checks the example fits a 320px screen at normal and doubled text in every theme, and passes an
// automated accessibility scan.
for (const theme of themes) {
  test(`AppShell example fits 320px and passes accessibility checks in ${theme}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.goto('/app-shell')
    await expect(shell(page)).toBeVisible()
    await setTheme(page, theme)
    for (const size of textSizes) {
      await setTextSize(page, size)
      await expectNoPageOverflow(page)
    }
    await setTextSize(page, 16)
    await expectNoAccessibilityViolations(page, '.app-shell-example')
  })
}

// Checks that the Footer follows the main content inside the AppShell, outside <main>, so it stays the
// page's footer landmark, and scrolls with the content.
test('AppShell places its Footer after the main content, outside main', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/app-shell')
  const main = shell(page).getByRole('main')
  const footer = shell(page).locator('footer')
  await expect(footer).toHaveText('Footer')
  await expect(main.locator('footer')).toHaveCount(0)
  const [mainBox, footerBox] = [(await main.boundingBox())!, (await footer.boundingBox())!]
  expect(footerBox.y).toBeGreaterThanOrEqual(mainBox.y + mainBox.height - 1)
  expect(await footer.evaluate(element => element.parentElement === element.closest('.mezzanine-app-shell')?.querySelector('main')?.parentElement)).toBe(true)
})

// Checks the Footer page's example is a footer landmark whose links are named as their own group.
test('Footer is the page footer landmark and fits 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 })
  await page.goto('/footer')
  const example = page.locator('.footer-example')
  await expect(example).toBeVisible()
  await expect(example.getByRole('navigation', { name: 'Footer links', exact: true }).getByRole('link')).toHaveCount(3)
  await expectNoPageOverflow(page)
  await expectNoAccessibilityViolations(page, '.footer-example')
})
