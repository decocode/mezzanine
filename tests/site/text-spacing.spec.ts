import { expect, test } from '@playwright/test'
import { sitePages } from '../../site/siteStructure'

// WCAG 1.4.12: nothing is lost when people set their own, wider text spacing. The Text accessibility
// page says the pages are checked with these settings, wide and at 320 CSS pixels.
const textSpacingOverrides = `*, *::before, *::after {
  line-height: 1.5 !important;
  letter-spacing: 0.12em !important;
  word-spacing: 0.16em !important;
}
p { margin-block-end: 2em !important; }`

// Boxes that cut their text off, and whether the page scrolls sideways. Text cut short with an
// ellipsis on purpose, such as a Select's chosen value, is left out.
const lostText = () => {
  const cutOff: string[] = []
  for (const element of document.querySelectorAll<HTMLElement>('body *')) {
    if (!element.innerText?.trim() || element.clientWidth <= 2 || element.clientHeight <= 2) continue
    const style = getComputedStyle(element)
    if (style.textOverflow === 'ellipsis') continue
    const cutsX = ['hidden', 'clip'].includes(style.overflowX) && element.scrollWidth > element.clientWidth + 1
    const cutsY = ['hidden', 'clip'].includes(style.overflowY) && element.scrollHeight > element.clientHeight + 1
    if (cutsX || cutsY) cutOff.push(`${element.tagName.toLowerCase()}.${[...element.classList].join('.')}: ${element.innerText.trim().slice(0, 40)}`)
  }
  return { cutOff, scrollsSideways: document.documentElement.scrollWidth > window.innerWidth + 1 }
}

test.describe.configure({ mode: 'parallel' })

for (const width of [1300, 320]) {
  for (const sitePage of sitePages.filter((page) => page.status === 'implemented')) {
    test(`${sitePage.path} loses no text with wider text spacing at ${width} pixels`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(sitePage.path)
      await expect(page.getByText('Loading documentation…', { exact: true })).toHaveCount(0)
      const before = await page.evaluate(lostText)
      await page.addStyleTag({ content: textSpacingOverrides })
      const after = await page.evaluate(lostText)
      expect(after.cutOff.filter((box) => !before.cutOff.includes(box))).toEqual([])
      expect(after.scrollsSideways).toBe(before.scrollsSideways)
    })
  }
}
