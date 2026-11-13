import { expect, test } from '@playwright/test'

// The Global and languages page says body text and Cards follow vertical writing. Each example runs top
// to bottom, and its Card holds all of it, with nothing cut off or sticking out.
test('vertical text runs top to bottom inside its Card', async ({ page }) => {
  await page.goto('/typography/global-and-languages')
  const examples = page.locator('.text-vertical-example')
  await expect(examples.first()).toBeVisible()
  for (const example of await examples.all()) {
    const fit = await example.evaluate((text) => {
      const card = text.closest('.mz-card')!.getBoundingClientRect()
      const box = text.getBoundingClientRect()
      return {
        writingMode: getComputedStyle(text).writingMode,
        insideCard: box.left >= card.left - 1 && box.right <= card.right + 1 && box.top >= card.top - 1 && box.bottom <= card.bottom + 1,
        overflows: text.scrollWidth > text.clientWidth + 1 || text.scrollHeight > text.clientHeight + 1,
      }
    })
    expect(fit).toEqual({ writingMode: 'vertical-rl', insideCard: true, overflows: false })
  }
})
