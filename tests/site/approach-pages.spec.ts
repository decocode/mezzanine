import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import type { CssNote } from '../../site/components/ExampleParts'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize } from '../display'
import { mediaQueriesCssNotes } from '../../site/pages/foundations/interaction/media-queries/mediaQueriesContent'
import { safeAreasCssNotes } from '../../site/pages/foundations/interaction/safe-areas/safeAreasContent'
import { supportsCssNotes } from '../../site/pages/foundations/interaction/supports/supportsContent'
import { readingOrderCssNotes } from '../../site/pages/foundations/text/reading-order/readingOrderContent'
import { ratioPairCssNotes } from '../../site/pages/foundations/layout/side-by-side/ratio-pair/ratioPairContent'
import { rowCssNotes } from '../../site/pages/foundations/layout/side-by-side/row/rowContent'
import { rowWrapCssNotes } from '../../site/pages/foundations/layout/side-by-side/row-wrap/rowWrapContent'
import { rowWrapGrowCssNotes } from '../../site/pages/foundations/layout/side-by-side/row-wrap-grow/rowWrapGrowContent'
import { reelCssNotes } from '../../site/pages/foundations/layout/side-by-side/reel/reelContent'
import { aspectRatioCssNotes } from '../../site/pages/foundations/dimension/size/aspect-ratio/aspectRatioContent'
import { spaceCssNotes } from '../../site/pages/foundations/dimension/space/spaceContent'

// The Foundations pages that came from the Lab, with the stylesheet each one's CSS notes quote.
const pages: { path: string; notes: Record<string, CssNote>; stylesheet?: string }[] = [
  { path: '/interaction/media-queries', notes: mediaQueriesCssNotes },
  { path: '/interaction/safe-areas', notes: safeAreasCssNotes, stylesheet: 'site/pages/foundations/interaction/safe-areas/safeAreas.css' },
  { path: '/interaction/supports', notes: supportsCssNotes },
  { path: '/text/reading-order', notes: readingOrderCssNotes, stylesheet: 'site/pages/foundations/text/reading-order/readingOrder.css' },
  { path: '/layout/side-by-side/ratio-pair', notes: ratioPairCssNotes, stylesheet: 'src/styles/layout.css' },
  { path: '/layout/side-by-side/row', notes: rowCssNotes, stylesheet: 'site/pages/foundations/layout/side-by-side/sideBySide.css' },
  { path: '/layout/side-by-side/row-wrap', notes: rowWrapCssNotes, stylesheet: 'site/pages/foundations/layout/side-by-side/sideBySide.css' },
  { path: '/layout/side-by-side/row-wrap-grow', notes: rowWrapGrowCssNotes, stylesheet: 'site/pages/foundations/layout/side-by-side/sideBySide.css' },
  { path: '/layout/side-by-side/reel', notes: reelCssNotes, stylesheet: 'site/pages/foundations/layout/side-by-side/sideBySide.css' },
  { path: '/dimension/size/aspect-ratio', notes: aspectRatioCssNotes, stylesheet: 'site/pages/foundations/dimension/size/aspect-ratio/aspectRatio.css' },
  { path: '/dimension/space', notes: spaceCssNotes, stylesheet: 'site/pages/foundations/dimension/space/space.css' },
]

// Checks the CSS quoted in each "The CSS behind" panel matches its stylesheet, apart from example CSS.
test('CSS notes match their stylesheets', () => {
  const normalise = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim()
  for (const { notes, stylesheet } of pages) {
    for (const note of Object.values(notes).filter((note) => !note.isExample)) {
      const source = normalise(readFileSync(stylesheet!, 'utf8'))
      for (const rule of note.code.split(/\n\s*\n/)) expect(source).toContain(normalise(rule))
    }
  }
})

// Checks each page passes an accessibility scan and fits a phone screen at double text size.
for (const { path } of pages) {
  test(`${path} is accessible and fits a narrow screen`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(path)
    await expect(page.getByText('Loading documentation…', { exact: true })).toHaveCount(0)
    await expectNoAccessibilityViolations(page, 'main')
    await page.setViewportSize({ width: 320, height: 900 })
    await setTextSize(page, 32)
    await expectNoPageOverflow(page)
  })
}

// Checks that reversing the row changes only what's seen: Tab still follows the HTML.
test('Reading order follows the HTML when the row is reversed', async ({ page }) => {
  await page.goto('/text/reading-order')
  const buttons = page.locator('.reading-order-row').getByRole('button')
  await expect(buttons).toHaveCount(3)
  const leftToRight = () => buttons.evaluateAll(items => items.map(item => ({ name: item.textContent, left: item.getBoundingClientRect().left })).sort((a, b) => a.left - b.left).map(item => item.name))
  expect(await leftToRight()).toEqual(['Button 1', 'Button 2', 'Button 3'])
  await page.locator('label').filter({ hasText: 'Reverse on screen' }).click()
  await expect.poll(leftToRight).toEqual(['Button 3', 'Button 2', 'Button 1'])
  await buttons.first().focus()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('button', { name: 'Button 2', exact: true })).toBeFocused()
})

// Checks that a page's "Also known as" names start in a closed Disclosure, open from its button,
// and open when its On this page link is followed.
test('Also known as starts closed and opens from its button or On this page', async ({ page }) => {
  await page.goto('/layout/side-by-side/ratio-pair')
  const trigger = page.getByRole('button', { name: 'Also known as', exact: true })
  const names = page.getByRole('grid', { name: 'Other names for Ratio pair' })
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  await expect(names).toBeHidden()
  await trigger.click()
  await expect(names).toBeVisible()
  await expect(names.getByRole('rowheader', { name: 'Figma', exact: true })).toBeVisible()
  await page.reload()
  await page.getByRole('navigation', { name: 'On this page' }).getByRole('link', { name: 'Also known as', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Also known as', exact: true })).toHaveAttribute('aria-expanded', 'true')
  await expect(names).toBeVisible()
})

// Checks Row: with the switch, a narrow frame turns the row into a column; without it, the items stay
// in one row.
test('Row switches to a column below the lg width', async ({ page }) => {
  await page.goto('/layout/side-by-side/row')
  const items = page.locator('.example-row > *')
  const rows = () => items.evaluateAll(list => new Set(list.map(item => Math.round(item.getBoundingClientRect().top))).size)
  await expect.poll(rows).toBe(1)
  await page.getByRole('radio', { name: '320px', exact: true }).click()
  await expect.poll(rows).toBe(3)
  await page.locator('label').filter({ hasText: 'Switch to a column below the lg width' }).click()
  await expect.poll(rows).toBe(1)
})
