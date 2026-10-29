import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import { layoutPages as layoutChildPages } from '../../site/lab/layout/layoutContent'
import { emergingFeatures, futurePages } from '../../site/lab/emerging-features/emergingFeaturesContent'
import { cssNotes } from '../../site/lab/labCssNotes'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, textSizes, themes } from '../display'

const layoutChildPaths = layoutChildPages.map(page => ({ path: page.href, title: page.title }))
const futureOverviewPage = { path: emergingFeatures.href, title: emergingFeatures.title }
const futureChildPages = futurePages.map(page => ({ path: page.href, title: page.title }))
const layoutPages = [{ path: '/site/lab/layout', title: 'Layout' }, ...layoutChildPaths, futureOverviewPage, ...futureChildPages]

// Checks the Layout overview, each Layout page and each emerging feature fit a 320px
// screen at normal and doubled text in every theme, and pass an automated accessibility scan.
for (const theme of themes) {
  test(`Lab Layout pages fit 320px and pass accessibility checks in ${theme}`, async ({ page }) => {
    test.setTimeout(180_000)
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

// The overview shows a Card per page, in reading order, with no On this page list; each page is in
// the Lab navigation; layout component pages link to where they come from; an unknown address shows
// the not-found page.
test('Lab Layout pages are reachable from the overview and the navigation', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/site/lab/layout')
  const main = page.locator('main')
  // Each page is a Card with a Read docs Button to the page, described by the page's name.
  const card = (title: string) => main.locator('.mz-card').filter({ has: page.getByRole('heading', { name: title, exact: true, level: 3 }) })
  for (const layoutPage of layoutChildPaths) {
    const readDocs = card(layoutPage.title).getByRole('link', { name: 'Read docs', exact: true })
    await expect(readDocs).toHaveAttribute('href', layoutPage.path)
    await expect(readDocs).toHaveAccessibleDescription(layoutPage.title)
  }
  await expect(main.locator('.mz-card').getByRole('heading', { level: 3 })).toHaveText(layoutChildPaths.map(item => item.title))
  await expect(page.getByRole('navigation', { name: 'On this page', exact: true })).toHaveCount(0)
  await card('Types of box').getByRole('link', { name: 'Read docs', exact: true }).click()
  await expect(page).toHaveTitle('Types of box | Lab')
  await expect(page.getByText('When boxes decide whether to stack up or line up.', { exact: true })).toBeVisible()

  // On a Layout page, the tree lists every Layout page.
  const tree = page.locator('.mz-panel[data-edge="start"]').getByRole('treegrid', { name: 'Lab experiments' })
  for (const layoutPage of layoutChildPaths) {
    await expect(tree.getByRole('link', { name: layoutPage.title, exact: true })).toHaveAttribute('href', layoutPage.path)
  }
  // The Lab tree has no Lab badges, so Emerging features' link is named by its title alone.
  await expect(tree.getByRole('link', { name: emergingFeatures.title, exact: true })).toHaveAttribute('href', futureOverviewPage.path)

  // A Layout page explains how it works, then shows an example with the CSS behind it. A building
  // block page also links to its sources.
  await page.goto('/site/lab/layout/center')
  await expect(page).toHaveTitle('Center | Lab')
  await expect(page.getByRole('heading', { name: 'How it works', exact: true, level: 2 })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Example', exact: true, level: 2 })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'The CSS behind Center', level: 3 })).toBeVisible()
  await expect(main.getByRole('heading', { name: 'References', exact: true, level: 2 })).toBeVisible()
  await expect(main.getByRole('link', { name: 'Bedrock: Center', exact: true })).toHaveAttribute('href', 'https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/center')
  await page.goto('/site/lab/layout/not-a-page')
  await expect(page).toHaveTitle('Page not found | Lab')
})

// Checks the examples do what their captions say: the list becomes a grid with a fifth item, and the
// overflow box becomes scrollable.
test('Lab Layout examples respond to their space and content', async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 900 })
  await page.goto('/site/lab/layout/box-has-content')
  const list = page.locator('.lab-has-list')
  await expect(list).toHaveCSS('display', 'flex')
  await page.getByRole('button', { name: 'Add an item', exact: true }).click()
  await page.getByRole('button', { name: 'Add an item', exact: true }).click()
  await expect(list).toHaveCSS('display', 'grid')

  await page.goto('/site/lab/layout/overflow')
  const box = page.locator('.lab-overflow-box')
  await expect(box).toHaveCSS('overflow-y', 'visible')
  // The overflow choices are RadioButtons, whose label takes the click.
  await page.getByRole('group', { name: 'Properties', exact: true }).getByText('auto', { exact: true }).click()
  await expect(page.getByRole('radio', { name: 'auto', exact: true })).toBeChecked()
  await expect(box).toHaveCSS('overflow-y', 'auto')
  await expect(page.getByRole('region', { name: 'Box with too much text', exact: true })).toHaveAttribute('tabindex', '0')
})

// Checks the CSS shown in each "The CSS behind" panel matches the Lab stylesheet (or the library's layout classes), apart from example CSS,
// so the explanation cannot drift from the rules it describes.
test('Lab Layout CSS notes match the Lab stylesheet', () => {
  const normalise = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim()
  const stylesheet = normalise(['site/lab/shared/layout-lab.css', 'src/styles/layout.css'].map((file) => readFileSync(file, 'utf8')).join('\n'))
  for (const note of Object.values(cssNotes).filter((note) => !note.isExample)) {
    for (const rule of note.code.split(/\n\s*\n/)) expect(stylesheet).toContain(normalise(rule))
  }
})
