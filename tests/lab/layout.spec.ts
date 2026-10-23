import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import { layoutStages, stagePages, stagePagesByStage } from '../../site/lab/layout/layoutContent'
import { emergingFeatures, futurePages } from '../../site/lab/emerging-features/emergingFeaturesContent'
import { cssNotes } from '../../site/lab/labCssNotes'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, textSizes, themes } from '../display'

const stageOverviewPages = layoutStages.map(stage => ({ path: `/site/lab/layout/${stage.slug}`, title: stage.title }))
const stageChildPages = stagePages.map(page => ({ path: page.href, title: page.title }))
const futureOverviewPage = { path: emergingFeatures.href, title: emergingFeatures.title }
const futureChildPages = futurePages.map(page => ({ path: page.href, title: page.title }))
const layoutPages = [{ path: '/site/lab/layout', title: 'Layout' }, ...stageOverviewPages, ...stageChildPages, futureOverviewPage, ...futureChildPages]

// Checks the Layout overview, each stage, each stage page and each page still to be sorted fit a 320px
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

// The overview shows a Card per group, with no On this page list; each group and its pages are in
// the Lab navigation; a group shows a Card per page; layout component pages link to where they come from;
// an unknown address shows the not-found page.
test('Lab Layout stages and pages are reachable from the overview and the navigation', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/site/lab/layout')
  const main = page.locator('main')
  // Each group is a Card with a Read docs Button to its overview, described by the group's name.
  for (const stage of stageOverviewPages) {
    const readDocs = main.locator('.mz-card').filter({ has: page.getByRole('heading', { name: stage.title, exact: true, level: 3 }) }).getByRole('link', { name: 'Read docs', exact: true })
    await expect(readDocs).toHaveAttribute('href', stage.path)
    await expect(readDocs).toHaveAccessibleDescription(stage.title)
  }
  await expect(page.getByRole('navigation', { name: 'On this page', exact: true })).toHaveCount(0)
  await main.locator('a[href="/site/lab/layout/box-basics"]').click()
  await expect(page).toHaveTitle('Box basics | Lab')

  // A stage shows a Card for each of its pages, each with a Read docs Button to the page.
  const card = (title: string) => page.locator('main .mz-card').filter({ has: page.getByRole('heading', { name: title, exact: true, level: 3 }) })
  for (const stagePage of stagePagesByStage('boxBasics')) {
    const readDocs = card(stagePage.title).getByRole('link', { name: 'Read docs', exact: true })
    await expect(readDocs).toHaveAttribute('href', stagePage.href)
    await expect(readDocs).toHaveAccessibleDescription(stagePage.title)
  }
  // Box basics is an index of Cards; the box model has its own page, first among them.
  await expect(page.getByRole('heading', { name: 'How it works', exact: true, level: 2 })).toHaveCount(0)
  await expect(page.locator('main .mz-card').first().getByRole('heading', { level: 3 })).toHaveText('The box model')
  await card('Types of box').getByRole('link', { name: 'Read docs', exact: true }).click()
  await expect(page).toHaveTitle('Types of box | Lab')
  await expect(page.getByText('When boxes decide whether to stack up or line up.', { exact: true })).toBeVisible()

  // On a stage page, the tree lists every stage and page, and the pages still to be sorted.
  const tree = page.locator('.mz-panel[data-edge="start"]').getByRole('treegrid', { name: 'Lab experiments' })
  for (const layoutPage of [...stageOverviewPages, ...stagePagesByStage('boxBasics').map(item => ({ path: item.href, title: item.title }))]) {
    await expect(tree.getByRole('link', { name: layoutPage.title, exact: true })).toHaveAttribute('href', layoutPage.path)
  }
  // Emerging features carries a Lab badge, which is part of its link's name.
  await expect(tree.getByRole('link', { name: `${emergingFeatures.title} Lab`, exact: true })).toHaveAttribute('href', futureOverviewPage.path)

  // A stage page explains how it works, then shows an example with the CSS behind it. A building
  // block page also links to its sources.
  await page.goto('/site/lab/layout/box-basics/center')
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
  await page.goto('/site/lab/layout/inside-the-box/box-has-content')
  const list = page.locator('.lab-has-list')
  await expect(list).toHaveCSS('display', 'flex')
  await page.getByRole('button', { name: 'Add an item', exact: true }).click()
  await page.getByRole('button', { name: 'Add an item', exact: true }).click()
  await expect(list).toHaveCSS('display', 'grid')

  await page.goto('/site/lab/layout/inside-the-box/overflow')
  const box = page.locator('.lab-overflow-box')
  await expect(box).toHaveCSS('overflow-y', 'visible')
  await page.getByRole('radio', { name: 'auto', exact: true }).click()
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
