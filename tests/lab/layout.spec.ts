import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import { cssNotes, layoutLabSections, primitivePages } from '../../site/lab/layout/layoutLabContent'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, textSizes, themes } from '../display'

const sectionPages = Object.values(layoutLabSections).map(section => ({ path: `/site/lab/layout/${section.slug}`, title: section.title }))
const primitivePagePaths = primitivePages.map(primitive => ({ path: primitive.href, title: primitive.title }))
const layoutPages = [{ path: '/site/lab/layout', title: 'Layout' }, ...sectionPages, ...primitivePagePaths]

// Checks the Layout overview, each of its child pages and each primitive page fit a 320px screen at normal and
// doubled text in every theme, and pass an automated accessibility scan.
for (const theme of themes) {
  test(`Lab Layout pages fit 320px and pass accessibility checks in ${theme}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 })
    for (const layoutPage of layoutPages) {
      await page.goto(layoutPage.path)
      await setTheme(page, theme)
      await expect(page.getByRole('heading', { name: layoutPage.title, exact: true, level: 1 })).toBeVisible()
      for (const size of textSizes) {
        await setTextSize(page, size)
        await expectNoPageOverflow(page)
      }
      await setTextSize(page, 16)
      await expectNoAccessibilityViolations(page, '.lab-layout')
    }
  })
}

// Each child page is listed on the overview, sits under Layout in the Lab navigation, and marks
// its Lab-only components; an unknown address shows the not-found page.
test('Lab Layout child pages are reachable from the overview and the navigation', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/site/lab/layout')
  for (const layoutPage of sectionPages) {
    await expect(page.locator('main').getByRole('link', { name: layoutPage.title, exact: true })).toHaveAttribute('href', layoutPage.path)
  }
  await page.locator('main').getByRole('link', { name: 'Subgrid', exact: true }).click()
  await expect(page).toHaveURL(/\/site\/lab\/layout\/subgrid$/)
  await expect(page).toHaveTitle('Subgrid | Lab')
  await expect(page.locator('.lab-only').first()).toBeVisible()
  // On a child page, the Layout group is expanded and lists every child page.
  const tree = page.locator('.site-layout > .site-sidebar').getByRole('treegrid', { name: 'Lab experiments' })
  for (const layoutPage of sectionPages) {
    await expect(tree.getByRole('link', { name: layoutPage.title, exact: true })).toHaveAttribute('href', layoutPage.path)
  }

  // Intrinsic primitives shows a Card per primitive, each with a Read docs Button to its page; on
  // a primitive page, the tree shows them all and the CSS behind it is a heading, not a closed panel.
  await page.goto('/site/lab/layout/intrinsic-primitives')
  const card = (title: string) => page.locator('main .mezzanine-card').filter({ has: page.getByRole('heading', { name: title, exact: true, level: 2 }) })
  for (const primitive of primitivePagePaths) {
    const readDocs = card(primitive.title).getByRole('link', { name: 'Read docs', exact: true })
    await expect(readDocs).toHaveAttribute('href', primitive.path)
    await expect(readDocs).toHaveAccessibleDescription(primitive.title)
  }
  await card('Stack').getByRole('link', { name: 'Read docs', exact: true }).click()
  await expect(page).toHaveTitle('Stack | Lab')
  for (const primitive of primitivePagePaths) {
    await expect(tree.getByRole('link', { name: primitive.title, exact: true })).toHaveAttribute('href', primitive.path)
  }
  await expect(page.getByRole('heading', { name: 'The CSS behind Stack', level: 2 })).toBeVisible()
  await expect(page.locator('main .lab-css-notes')).toHaveCount(0)
  await expect(page.locator('main pre.mezzanine-code-block')).toBeVisible()

  // Reading width, Target size and Named layers are top-level pages under Layout, each with one example.
  await page.goto('/site/lab/layout/named-layers')
  await expect(page).toHaveTitle('Named layers | Lab')
  await expect(page.getByRole('heading', { name: 'Example', exact: true, level: 2 })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'The CSS behind named layers', level: 2 })).toBeVisible()
  await expect(tree.getByRole('link', { name: 'Reading width', exact: true })).toHaveAttribute('href', '/site/lab/layout/reading-width')
  await page.goto('/site/lab/layout/not-a-page')
  await expect(page).toHaveTitle('Page not found | Lab')
})

// Checks the demos do what their captions say: the same tile responds to its own slot, the
// Switcher changes at its threshold, and the list becomes a grid when it has a fifth item.
test('Lab Layout demos respond to their space and content', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/site/lab/layout/container-queries')
  const tiles = page.locator('.lab-two-slots .lab-cq-tile')
  const columns = (index: number) => tiles.nth(index).evaluate(element => getComputedStyle(element).gridTemplateColumns.split(' ').length)
  expect(await columns(0)).toBe(1)
  expect(await columns(1)).toBe(2)

  await page.goto('/site/lab/layout/intrinsic-primitives/switcher')
  const switcherFrame = page.locator('.lab-frame').filter({ has: page.locator('.lab-switcher') })
  const rows = () => switcherFrame.locator('.lab-switcher > *').evaluateAll(items => new Set(items.map(item => Math.round(item.getBoundingClientRect().top))).size)
  await switcherFrame.getByRole('radio', { name: 'Wide', exact: true }).click()
  await expect.poll(rows).toBe(1)
  await switcherFrame.getByRole('radio', { name: '320px', exact: true }).click()
  await expect.poll(rows).toBe(3)

  await page.goto('/site/lab/layout/has')
  const list = page.locator('.lab-has-list')
  await expect(list).toHaveCSS('display', 'flex')
  await page.getByRole('button', { name: 'Add an item', exact: true }).click()
  await page.getByRole('button', { name: 'Add an item', exact: true }).click()
  await expect(list).toHaveCSS('display', 'grid')
})

// Checks the CSS shown in each "The CSS behind" panel matches the Lab stylesheet, apart from example CSS,
// so the explanation cannot drift from the rules it describes.
test('Lab Layout CSS notes match the Lab stylesheet', () => {
  const normalise = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim()
  const stylesheet = normalise(readFileSync('site/lab/layout/layout-lab.css', 'utf8'))
  for (const note of Object.values(cssNotes).filter((note) => !note.isExample)) {
    for (const rule of note.code.split(/\n\s*\n/)) expect(stylesheet).toContain(normalise(rule))
  }
})
