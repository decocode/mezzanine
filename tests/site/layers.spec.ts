import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize } from '../display'
import { positioningCssNotes } from '../../site/pages/foundations/layers/positioning/positioningContent'
import { orderingLayersCssNotes } from '../../site/pages/foundations/layers/ordering-layers/orderingLayersContent'
import { bundlesOfLayersCssNotes } from '../../site/pages/foundations/layers/bundles-of-layers/bundlesOfLayersContent'
import { scrollPaddingCssNotes } from '../../site/pages/foundations/layers/scroll-padding/scrollPaddingContent'

const pages = ['/layers', '/layers/positioning', '/layers/ordering-layers', '/layers/bundles-of-layers', '/layers/scroll-padding']

// Checks the CSS quoted in each "The CSS behind" panel matches layers.css, so the explanation
// cannot drift from the rules it describes.
test('Layers CSS notes match the Layers stylesheet', () => {
  const normalise = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim()
  const stylesheet = normalise(readFileSync('site/pages/foundations/layers/layers.css', 'utf8'))
  const notes = [positioningCssNotes, orderingLayersCssNotes, bundlesOfLayersCssNotes, scrollPaddingCssNotes].flatMap(Object.values)
  for (const note of notes.filter((note) => !note.isExample)) {
    for (const rule of note.code.split(/\n\s*\n/)) expect(stylesheet).toContain(normalise(rule))
  }
})

// Checks each Layers page passes an accessibility scan and fits a phone screen at double text size.
for (const path of pages) {
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

// Checks the Positioning picker changes the second box's position.
test('Positioning picker sets the second box position', async ({ page }) => {
  await page.goto('/layers/positioning')
  const item = page.locator('.layers-position-item')
  await expect(item).toHaveCSS('position', 'static')
  await page.getByRole('radio', { name: 'sticky', exact: true }).click()
  await expect(item).toHaveCSS('position', 'sticky')
})

// Checks that unbundling removes the bundles' z-index, so their layers compete directly.
test('Bundles of layers checkbox removes the bundles', async ({ page }) => {
  await page.goto('/layers/bundles-of-layers')
  const bundleB = page.locator('.layers-bundle-b')
  await expect(bundleB).toHaveCSS('z-index', '2')
  await page.getByText('Bundle the layers', { exact: true }).click()
  await expect(bundleB).toHaveCSS('z-index', 'auto')
})

// Checks that with scroll padding, a section you jump to lands below the sticky header.
test('Scroll padding keeps a jumped-to heading below the sticky header', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/layers/scroll-padding')
  await page.getByText('Use scroll padding', { exact: true }).click()
  await page.getByRole('button', { name: 'Jump to section 3', exact: true }).click()
  const header = await page.locator('.layers-sticky-header').boundingBox()
  const heading = await page.getByRole('heading', { name: 'Section 3', exact: true }).boundingBox()
  expect(heading!.y).toBeGreaterThanOrEqual(header!.y + header!.height - 1)
})
