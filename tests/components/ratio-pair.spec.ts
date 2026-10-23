import { expect, test, type Page } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTheme, themes } from '../display'

// These checks use the Ratio pair docs page, which shows the library class inside a box whose width
// can be chosen.

async function areas(page: Page) {
  const pair = page.locator('.mz-ratio-pair')
  const [first, second] = [pair.locator('> *').first(), pair.locator('> *').last()]
  return { pair, first: (await first.boundingBox())!, second: (await second.boundingBox())! }
}

async function chooseFraction(page: Page, label: string) {
  await page.getByRole('radio', { name: label, exact: true }).check()
}

// Checks that the fractions share the row in proportion, and that auto start keeps the first area
// at the width its content needs while the second fills the rest.
test('RatioPair shares the row by fraction or by auto', async ({ page }) => {
  // Wide enough that, beside both Panels, each area stays above its minimum width.
  await page.setViewportSize({ width: 1800, height: 900 })
  await page.goto('/layout/side-by-side/ratio-pair')
  await chooseFraction(page, '1/3')
  let { first, second } = await areas(page)
  expect(Math.abs(first.y - second.y)).toBeLessThan(1)
  expect(second.width / first.width).toBeGreaterThan(1.6)
  await chooseFraction(page, '1/2')
  ;({ first, second } = await areas(page))
  expect(Math.abs(first.width - second.width)).toBeLessThan(2)
  await chooseFraction(page, 'Auto start')
  ;({ first, second } = await areas(page))
  expect(Math.abs(first.y - second.y)).toBeLessThan(1)
  expect(second.width).toBeGreaterThan(first.width * 2)
})

// Checks that the areas stack, each at full width, when the box is too narrow for both to have
// their 15rem minimum, at normal and doubled text, without widening the page.
for (const fontSize of [16, 32]) {
  test(`RatioPair stacks its areas in a narrow container at ${fontSize}px text`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/layout/side-by-side/ratio-pair')
    await page.evaluate(size => { document.documentElement.style.fontSize = `${size}px` }, fontSize)
    await page.getByRole('radio', { name: '320px', exact: true }).check()
    // Measure inside the wait, so a layout that is still settling can't make the check flaky.
    await expect.poll(async () => {
      const { pair, first, second } = await areas(page)
      const pairBox = (await pair.boundingBox())!
      return second.y >= first.y + first.height - 1
        && Math.abs(first.width - pairBox.width) < 1
        && Math.abs(second.width - pairBox.width) < 1
    }).toBe(true)
    await expectNoPageOverflow(page)
  })
}

// Checks that the ratio pair page passes an accessibility scan in each theme.
for (const theme of themes) {
  test(`/layout/side-by-side/ratio-pair passes an accessibility scan in ${theme}`, async ({ page }) => {
    await page.goto('/layout/side-by-side/ratio-pair')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await setTheme(page, theme)
    await expectNoAccessibilityViolations(page, 'main')
  })
}
