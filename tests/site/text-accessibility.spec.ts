import { expect, test } from '@playwright/test'
import { sitePages } from '../../site/siteStructure'

// WCAG 1.4.4 and 1.4.10: the Text accessibility page says every page is tested at 320 CSS pixels wide,
// with text at 100% and 200%, and that nothing scrolls sideways. Text at 200% is the browser's text size
// setting, which doubles the root font size that every rem follows.
test.describe.configure({ mode: 'parallel' })

for (const textSize of ['100%', '200%']) {
  for (const sitePage of sitePages.filter((page) => page.status === 'implemented')) {
    test(`${sitePage.path} doesn't scroll sideways at 320 pixels with text at ${textSize}`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 900 })
      await page.goto(sitePage.path)
      await expect(page.getByText('Loading documentation…', { exact: true })).toHaveCount(0)
      await page.addStyleTag({ content: `html { font-size: ${textSize}; }` })
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1)
    })
  }
}
