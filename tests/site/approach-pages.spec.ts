import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import type { CssNote } from '../../site/components/ExampleParts'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize } from '../display'
import { mediaQueriesCssNotes } from '../../site/pages/foundations/interaction/media-queries/mediaQueriesContent'
import { safeAreasCssNotes } from '../../site/pages/foundations/interaction/safe-areas/safeAreasContent'
import { supportsCssNotes } from '../../site/pages/foundations/interaction/supports/supportsContent'
import { readingOrderCssNotes } from '../../site/pages/foundations/layout/reading-order/readingOrderContent'
import { splitCssNotes } from '../../site/pages/foundations/layout/split/splitContent'
import { rowCssNotes } from '../../site/pages/foundations/layout/row/rowContent'
import { rowWrapCssNotes } from '../../site/pages/foundations/layout/row-wrap/rowWrapContent'
import { rowWrapGrowCssNotes } from '../../site/pages/foundations/layout/row-wrap-grow/rowWrapGrowContent'
import { reelCssNotes } from '../../site/pages/foundations/layout/reel/reelContent'
import { aspectRatioCssNotes } from '../../site/pages/foundations/dimension/aspect-ratio/aspectRatioContent'
import { spaceCssNotes } from '../../site/pages/foundations/dimension/space/spaceContent'
import { stackCssNotes } from '../../site/pages/foundations/layout/stack/stackContent'
import { gridCssNotes } from '../../site/pages/foundations/layout/grid/gridContent'
import { subgridCssNotes } from '../../site/pages/foundations/layout/subgrid/subgridContent'
import { containerQueriesCssNotes } from '../../site/pages/foundations/layout/container-queries/containerQueriesContent'
import { unitsCssNotes } from '../../site/pages/foundations/dimension/units/unitsContent'
import { fluidSizingCssNotes } from '../../site/pages/foundations/dimension/fluid-sizing/fluidSizingContent'
import { stylePriorityCssNotes } from '../../site/pages/foundations/themes/style-priority/stylePriorityContent'

// The Foundations pages that came from the Lab, with the stylesheet each one's CSS notes quote.
const pages: { path: string; notes: Record<string, CssNote>; stylesheet?: string }[] = [
  { path: '/interaction/media-queries', notes: mediaQueriesCssNotes },
  { path: '/interaction/safe-areas', notes: safeAreasCssNotes, stylesheet: 'site/pages/foundations/interaction/safe-areas/safeAreas.css' },
  { path: '/interaction/supports', notes: supportsCssNotes },
  { path: '/layout/reading-order', notes: readingOrderCssNotes, stylesheet: 'site/pages/foundations/layout/reading-order/readingOrder.css' },
  { path: '/layout/split', notes: splitCssNotes, stylesheet: 'src/styles/layout.css' },
  { path: '/layout/row', notes: rowCssNotes, stylesheet: 'site/pages/foundations/layout/sideBySide.css' },
  { path: '/layout/row-wrap', notes: rowWrapCssNotes, stylesheet: 'site/pages/foundations/layout/sideBySide.css' },
  { path: '/layout/row-wrap-grow', notes: rowWrapGrowCssNotes, stylesheet: 'site/pages/foundations/layout/sideBySide.css' },
  { path: '/layout/reel', notes: reelCssNotes, stylesheet: 'site/pages/foundations/layout/sideBySide.css' },
  { path: '/dimension/aspect-ratio', notes: aspectRatioCssNotes, stylesheet: 'site/pages/foundations/dimension/aspect-ratio/aspectRatio.css' },
  { path: '/dimension/space', notes: spaceCssNotes, stylesheet: 'site/pages/foundations/dimension/space/space.css' },
  { path: '/layout/stack', notes: stackCssNotes, stylesheet: 'site/pages/foundations/layout/stack/stack.css' },
  { path: '/layout/grid', notes: gridCssNotes, stylesheet: 'site/pages/foundations/layout/grid/grid.css' },
  { path: '/layout/subgrid', notes: subgridCssNotes, stylesheet: 'site/pages/foundations/layout/subgrid/subgrid.css' },
  { path: '/layout/container-queries', notes: containerQueriesCssNotes, stylesheet: 'site/pages/foundations/layout/container-queries/containerQueries.css' },
  { path: '/dimension/units', notes: unitsCssNotes, stylesheet: 'site/pages/foundations/dimension/units/units.css' },
  { path: '/dimension/fluid-sizing', notes: fluidSizingCssNotes, stylesheet: 'site/pages/foundations/dimension/fluid-sizing/fluidSizing.css' },
  { path: '/themes/style-priority', notes: stylePriorityCssNotes, stylesheet: 'site/pages/foundations/themes/style-priority/stylePriority.css' },
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

// Checks the same item responds to its own container: one column in the narrow container, two in the wide one.
test('Container queries items follow their own container', async ({ page }) => {
  // Wide enough that the wide container has room for two columns beside the On this page column.
  await page.setViewportSize({ width: 1600, height: 900 })
  await page.goto('/layout/container-queries')
  const items = page.locator('.example-two-containers .example-item-layout')
  const columns = (index: number) => items.nth(index).evaluate(element => getComputedStyle(element).gridTemplateColumns.split(' ').length)
  expect(await columns(0)).toBe(1)
  expect(await columns(1)).toBe(2)
})

// Checks the cascade layer decides the winner: the library rule wins outside a layer, the app rule inside one.
test('Style priority chips show which rule won', async ({ page }) => {
  await page.goto('/themes/style-priority')
  const label = (selector: string) => page.locator(`${selector} .example-chip`).evaluate(element => getComputedStyle(element, '::after').content)
  expect(await label('.example-cascade-unlayered')).toBe('"Library style won"')
  expect(await label('.example-cascade-layered')).toBe('"App style won"')
})

// Checks that reversing the row changes only what's seen: Tab still follows the HTML.
test('Reading order follows the HTML when the row is reversed', async ({ page }) => {
  await page.goto('/layout/reading-order')
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

// Checks that a page's "Also known as" names are the first disclosure in Technical details, start
// closed, open from their button, and open when their On this page link is followed.
test('Also known as opens Technical details, starts closed and opens from its button or On this page', async ({ page }) => {
  await page.goto('/layout/split')
  const trigger = page.getByRole('button', { name: 'Also known as', exact: true })
  const technicalDetails = page.locator('section[aria-labelledby$="-technical-details"]')
  await expect(technicalDetails.getByRole('button').first()).toHaveAccessibleName('Also known as')
  const names = page.getByRole('grid', { name: 'Other names for Split' })
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
  await page.goto('/layout/row')
  const items = page.locator('.example-row > *')
  const rows = () => items.evaluateAll(list => new Set(list.map(item => Math.round(item.getBoundingClientRect().top))).size)
  await expect.poll(rows).toBe(1)
  // The frame fills its demo, so a phone-sized window makes it narrower than the lg width.
  await page.setViewportSize({ width: 480, height: 900 })
  await expect.poll(rows).toBe(3)
  await page.locator('label').filter({ hasText: 'Switch to a column below the lg width' }).click()
  await expect.poll(rows).toBe(1)
})
