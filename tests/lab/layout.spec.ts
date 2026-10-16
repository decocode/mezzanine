import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import { boxToTheFuture, cssNotes, futurePages, layoutLabSections, layoutStages, stagePages, stagePagesByStage } from '../../site/lab/layout/layoutLabContent'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, textSizes, themes } from '../display'

const sectionPages = Object.values(layoutLabSections).map(section => ({ path: `/site/lab/layout/${section.slug}`, title: section.title }))
const stageOverviewPages = layoutStages.map(stage => ({ path: `/site/lab/layout/${stage.slug}`, title: stage.title }))
const stageChildPages = stagePages.map(page => ({ path: page.href, title: page.title }))
const futureOverviewPage = { path: `/site/lab/layout/${boxToTheFuture.slug}`, title: boxToTheFuture.title }
const futureChildPages = futurePages.map(page => ({ path: page.href, title: page.title }))
const layoutPages = [{ path: '/site/lab/layout', title: 'Layout' }, ...stageOverviewPages, ...stageChildPages, futureOverviewPage, ...futureChildPages, ...sectionPages]

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

// Each stage and its pages are listed on the overview and in the Lab navigation; a stage shows a
// Card per page; building blocks link to where they come from; an unknown address shows the not-found page.
test('Lab Layout stages and pages are reachable from the overview and the navigation', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/site/lab/layout')
  const main = page.locator('main')
  // Each stage is a section of the docs page template, with links to its pages and a Read docs Button to its overview.
  for (const layoutPage of [...stageChildPages, ...futureChildPages, ...sectionPages]) {
    await expect(main.getByRole('link', { name: layoutPage.title, exact: true })).toHaveAttribute('href', layoutPage.path)
  }
  for (const stage of [...stageOverviewPages, futureOverviewPage]) {
    await expect(main.locator(`a[href="${stage.path}"]`)).toHaveAccessibleDescription(stage.title)
  }
  await expect(page.getByRole('navigation', { name: 'On this page', exact: true }).getByRole('link', { name: 'The box', exact: true })).toBeVisible()
  await main.locator('a[href="/site/lab/layout/the-box"]').click()
  await expect(page).toHaveTitle('The box | Lab')

  // A stage shows a Card for each of its pages, each with a Read docs Button to the page.
  const card = (title: string) => page.locator('main .mezzanine-card').filter({ has: page.getByRole('heading', { name: title, exact: true, level: 3 }) })
  for (const stagePage of stagePagesByStage('theBox')) {
    const readDocs = card(stagePage.title).getByRole('link', { name: 'Read docs', exact: true })
    await expect(readDocs).toHaveAttribute('href', stagePage.href)
    await expect(readDocs).toHaveAccessibleDescription(stagePage.title)
  }
  // The box explains the box model itself, before its Cards.
  await expect(page.getByRole('heading', { name: 'How it works', exact: true, level: 2 })).toBeVisible()
  await expect(page.locator('.lab-box-anatomy')).toBeVisible()
  await card('Margin').getByRole('link', { name: 'Read docs', exact: true }).click()
  await expect(page).toHaveTitle('Margin | Lab')
  await expect(page.getByText('When boxes assert their need for personal space.', { exact: true })).toBeVisible()

  // On a stage page, the tree lists every stage and page, and the pages still to be sorted.
  const tree = page.locator('.site-layout > .site-sidebar').getByRole('treegrid', { name: 'Lab experiments' })
  for (const layoutPage of [...stageOverviewPages, ...stagePagesByStage('theBox').map(item => ({ path: item.href, title: item.title })), ...sectionPages]) {
    await expect(tree.getByRole('link', { name: layoutPage.title, exact: true })).toHaveAttribute('href', layoutPage.path)
  }
  // Box to the Future carries a Lab badge, which is part of its link's name.
  await expect(tree.getByRole('link', { name: `${boxToTheFuture.title} Lab`, exact: true })).toHaveAttribute('href', futureOverviewPage.path)

  // A stage page has two halves: how it works, then how Mezzanine uses it, with each line marked
  // Today or Lab candidate. A building block page also links to its sources.
  await page.goto('/site/lab/layout/box-formations/stack')
  await expect(page).toHaveTitle('Stack | Lab')
  await expect(page.getByRole('heading', { name: 'How it works', exact: true, level: 2 })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'The CSS behind Stack', level: 3 })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'How Mezzanine uses it', exact: true, level: 2 })).toBeVisible()
  const uses = main.locator('.lab-uses')
  await expect(uses.locator('.lab-use').filter({ hasText: 'Today' })).toHaveCount(1)
  await expect(uses.locator('.lab-use').filter({ hasText: 'Lab candidate' })).toHaveCount(1)
  await expect(main.getByRole('heading', { name: 'References', exact: true, level: 2 })).toBeVisible()
  await expect(main.getByRole('link', { name: 'Bedrock: Stack (opens in a new tab)', exact: true })).toHaveAttribute('href', 'https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/stack')
  // The Gap page lists the real spacing tokens with their live values.
  await page.goto('/site/lab/layout/arranging-boxes/gap')
  await expect(main.locator('.spacing-scale-item').filter({ hasText: '--space-4' }).locator('.spacing-scale-rem')).toHaveText('1rem')
  await page.goto('/site/lab/layout/not-a-page')
  await expect(page).toHaveTitle('Page not found | Lab')
})

// Checks the demos do what their captions say: the same tile responds to its own slot, Inline switches
// to a column below its switch width, the list becomes a grid with a fifth item, the overflow box
// becomes scrollable, and reversing the row changes what you see but not the keyboard order.
test('Lab Layout demos respond to their space and content', async ({ page }) => {
  // Wide enough that the wide slot has room for two columns beside the On this page column.
  await page.setViewportSize({ width: 1600, height: 900 })
  await page.goto('/site/lab/layout/container-queries')
  const tiles = page.locator('.lab-two-slots .lab-cq-tile')
  const columns = (index: number) => tiles.nth(index).evaluate(element => getComputedStyle(element).gridTemplateColumns.split(' ').length)
  expect(await columns(0)).toBe(1)
  expect(await columns(1)).toBe(2)

  await page.goto('/site/lab/layout/box-formations/inline')
  const inlineFrame = page.locator('.lab-frame').filter({ has: page.locator('.lab-inline') })
  const rows = () => inlineFrame.locator('.lab-inline > *').evaluateAll(items => new Set(items.map(item => Math.round(item.getBoundingClientRect().top))).size)
  await inlineFrame.getByRole('radio', { name: 'Wide', exact: true }).click()
  await expect.poll(rows).toBe(1)
  await inlineFrame.getByRole('radio', { name: '320px', exact: true }).click()
  await expect.poll(rows).toBe(3)
  await page.locator('label').filter({ hasText: 'Switch to a column below 30rem' }).click()
  await expect.poll(rows).toBe(1)

  await page.goto('/site/lab/layout/inside-the-box/has')
  const list = page.locator('.lab-has-list')
  await expect(list).toHaveCSS('display', 'flex')
  await page.getByRole('button', { name: 'Add an item', exact: true }).click()
  await page.getByRole('button', { name: 'Add an item', exact: true }).click()
  await expect(list).toHaveCSS('display', 'grid')

  await page.goto('/site/lab/layout/inside-the-box/overflowing-the-box')
  const box = page.locator('.lab-overflow-box')
  await expect(box).toHaveCSS('overflow-y', 'visible')
  await page.getByRole('radio', { name: 'auto', exact: true }).click()
  await expect(box).toHaveCSS('overflow-y', 'auto')
  await expect(page.getByRole('region', { name: 'Box with too much text', exact: true })).toHaveAttribute('tabindex', '0')

  await page.goto('/site/lab/layout/arranging-boxes/reading-order')
  const buttons = page.locator('.lab-order-row').getByRole('button')
  await expect(buttons).toHaveCount(3)
  const leftToRight = () => buttons.evaluateAll(items => items.map(item => ({ name: item.textContent, left: item.getBoundingClientRect().left })).sort((a, b) => a.left - b.left).map(item => item.name))
  expect(await leftToRight()).toEqual(['Button 1', 'Button 2', 'Button 3'])
  await page.locator('label').filter({ hasText: 'Reverse on screen' }).click()
  await expect.poll(leftToRight).toEqual(['Button 3', 'Button 2', 'Button 1'])
  await buttons.first().focus()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('button', { name: 'Button 2', exact: true })).toBeFocused()
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
