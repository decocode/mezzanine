import { expect, test, type Page } from '@playwright/test'
import { expectNoPageOverflow } from '../display'

// RatioPair has no docs page yet, so these checks use the Lab's Ratio pair page, which renders the library
// component inside a frame whose width can be changed.

async function areas(page: Page) {
  const split = page.locator('.mezzanine-ratio-pair')
  const [first, second] = [split.locator('> *').first(), split.locator('> *').last()]
  return { split, first: (await first.boundingBox())!, second: (await second.boundingBox())! }
}

async function chooseFraction(page: Page, label: string) {
  await page.getByRole('radio', { name: label, exact: true }).check()
}

// Checks that the fractions share the row in proportion, and that auto start keeps the first area
// at the width its content needs while the second fills the rest.
test('RatioPair shares the row by fraction or by auto', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/site/lab/layout/side-by-side/ratio-pair')
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

// Checks that the areas stack, each at full width, when the frame is too narrow for both to have
// their 15rem minimum, at normal and doubled text, without widening the page.
for (const fontSize of [16, 32]) {
  test(`RatioPair stacks its areas in a narrow container at ${fontSize}px text`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/site/lab/layout/side-by-side/ratio-pair')
    await page.evaluate(size => { document.documentElement.style.fontSize = `${size}px` }, fontSize)
    const width = page.getByRole('slider', { name: 'Width' })
    await width.focus()
    await page.keyboard.press('Home')
    await expect(width).toHaveValue('320')
    // Measure inside the wait, so a layout that is still settling can't make the check flaky.
    await expect.poll(async () => {
      const { split, first, second } = await areas(page)
      const splitBox = (await split.boundingBox())!
      return second.y >= first.y + first.height - 1
        && Math.abs(first.width - splitBox.width) < 1
        && Math.abs(second.width - splitBox.width) < 1
    }).toBe(true)
    await expectNoPageOverflow(page)
  })
}
