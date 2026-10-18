import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import { emergingFeatures, cssNotes, futurePages, browserAndDeviceLab, browserAndDevicePages, labTopLevelPages, layersLab, layersPages, layoutStages, stagePages, stagePagesByStage } from '../../site/lab/layout/layoutLabContent'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, textSizes, themes } from '../display'

const stageOverviewPages = layoutStages.map(stage => ({ path: `/site/lab/layout/${stage.slug}`, title: stage.title }))
const stageChildPages = stagePages.map(page => ({ path: page.href, title: page.title }))
const futureOverviewPage = { path: emergingFeatures.href, title: emergingFeatures.title }
const futureChildPages = futurePages.map(page => ({ path: page.href, title: page.title }))
const layoutPages = [{ path: '/site/lab/layout', title: 'Layout' }, ...stageOverviewPages, ...stageChildPages, futureOverviewPage, ...futureChildPages, ...Object.values(labTopLevelPages).map(page => ({ path: page.href, title: page.title })), { path: layersLab.href, title: layersLab.title }, ...Object.values(layersPages).map(page => ({ path: page.href, title: page.title })), { path: browserAndDeviceLab.href, title: browserAndDeviceLab.title }, ...Object.values(browserAndDevicePages).map(page => ({ path: page.href, title: page.title }))]

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
// the Lab navigation; a group shows a Card per page; building blocks link to where they come from;
// an unknown address shows the not-found page.
test('Lab Layout stages and pages are reachable from the overview and the navigation', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/site/lab/layout')
  const main = page.locator('main')
  // Each group is a Card with a Read docs Button to its overview, described by the group's name.
  for (const stage of stageOverviewPages) {
    const readDocs = main.locator('.mezzanine-card').filter({ has: page.getByRole('heading', { name: stage.title, exact: true, level: 3 }) }).getByRole('link', { name: 'Read docs', exact: true })
    await expect(readDocs).toHaveAttribute('href', stage.path)
    await expect(readDocs).toHaveAccessibleDescription(stage.title)
  }
  await expect(page.getByRole('navigation', { name: 'On this page', exact: true })).toHaveCount(0)
  await main.locator('a[href="/site/lab/layout/box-basics"]').click()
  await expect(page).toHaveTitle('Box basics | Lab')

  // A stage shows a Card for each of its pages, each with a Read docs Button to the page.
  const card = (title: string) => page.locator('main .mezzanine-card').filter({ has: page.getByRole('heading', { name: title, exact: true, level: 3 }) })
  for (const stagePage of stagePagesByStage('boxBasics')) {
    const readDocs = card(stagePage.title).getByRole('link', { name: 'Read docs', exact: true })
    await expect(readDocs).toHaveAttribute('href', stagePage.href)
    await expect(readDocs).toHaveAccessibleDescription(stagePage.title)
  }
  // Box basics is an index of Cards; the box model has its own page, first among them.
  await expect(page.getByRole('heading', { name: 'How it works', exact: true, level: 2 })).toHaveCount(0)
  await expect(page.locator('main .mezzanine-card').first().getByRole('heading', { level: 3 })).toHaveText('The box model')
  await card('Types of box').getByRole('link', { name: 'Read docs', exact: true }).click()
  await expect(page).toHaveTitle('Types of box | Lab')
  await expect(page.getByText('When boxes decide whether to stack up or line up.', { exact: true })).toBeVisible()

  // On a stage page, the tree lists every stage and page, and the pages still to be sorted.
  const tree = page.locator('.site-layout > .site-sidebar').getByRole('treegrid', { name: 'Lab experiments' })
  for (const layoutPage of [...stageOverviewPages, ...stagePagesByStage('boxBasics').map(item => ({ path: item.href, title: item.title }))]) {
    await expect(tree.getByRole('link', { name: layoutPage.title, exact: true })).toHaveAttribute('href', layoutPage.path)
  }
  // Emerging features carries a Lab badge, which is part of its link's name.
  await expect(tree.getByRole('link', { name: `${emergingFeatures.title} Lab`, exact: true })).toHaveAttribute('href', futureOverviewPage.path)

  // A stage page explains how it works, then shows an example with the CSS behind it. A building
  // block page also links to its sources.
  await page.goto('/site/lab/layout/one-below-another/column')
  await expect(page).toHaveTitle('Column | Lab')
  await expect(page.getByRole('heading', { name: 'How it works', exact: true, level: 2 })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Example', exact: true, level: 2 })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'The CSS behind Column', level: 3 })).toBeVisible()
  await expect(main.getByRole('heading', { name: 'References', exact: true, level: 2 })).toBeVisible()
  await expect(main.getByRole('link', { name: 'Bedrock: Stack (opens in a new tab)', exact: true })).toHaveAttribute('href', 'https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/stack')
  // The Gap page lists the real spacing tokens with their live values.
  await page.goto('/site/lab/layout/add-space/gap')
  await expect(main.locator('.spacing-scale-item').filter({ hasText: '--space-4' }).locator('.spacing-scale-rem')).toHaveText('1rem')
  await page.goto('/site/lab/layout/not-a-page')
  await expect(page).toHaveTitle('Page not found | Lab')
})

// Checks the demos do what their captions say: the same tile responds to its own slot, Row switches
// to a column below its switch width, the list becomes a grid with a fifth item, the overflow box
// becomes scrollable, and reversing the row changes what you see but not the keyboard order.
test('Lab Layout demos respond to their space and content', async ({ page }) => {
  // Wide enough that the wide slot has room for two columns beside the On this page column.
  await page.setViewportSize({ width: 1600, height: 900 })
  await page.goto('/site/lab/layout/container/container-queries')
  const tiles = page.locator('.lab-two-slots .lab-cq-tile')
  const columns = (index: number) => tiles.nth(index).evaluate(element => getComputedStyle(element).gridTemplateColumns.split(' ').length)
  expect(await columns(0)).toBe(1)
  expect(await columns(1)).toBe(2)

  await page.goto('/site/lab/layout/side-by-side/row')
  const inlineFrame = page.locator('.lab-frame').filter({ has: page.locator('.lab-row') })
  const rows = () => inlineFrame.locator('.lab-row > *').evaluateAll(items => new Set(items.map(item => Math.round(item.getBoundingClientRect().top))).size)
  await inlineFrame.getByRole('radio', { name: 'Wide', exact: true }).click()
  await expect.poll(rows).toBe(1)
  await inlineFrame.getByRole('radio', { name: '320px', exact: true }).click()
  await expect.poll(rows).toBe(3)
  await page.locator('label').filter({ hasText: 'Switch to a column below 30rem' }).click()
  await expect.poll(rows).toBe(1)

  await page.goto('/site/lab/layout/inside-the-box/box-has-content')
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

  await page.goto('/site/lab/reading-order')
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

// Checks the CSS shown in each "The CSS behind" panel matches the Lab stylesheet (or, for Split, the library's), apart from example CSS,
// so the explanation cannot drift from the rules it describes.
test('Lab Layout CSS notes match the Lab stylesheet', () => {
  const normalise = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim()
  // Split's note shows the library's own CSS, since the Lab uses the library component.
  const stylesheet = normalise(['site/lab/layout/layout-lab.css', 'src/components/Split/Split.css'].map((file) => readFileSync(file, 'utf8')).join('\n'))
  for (const note of Object.values(cssNotes).filter((note) => !note.isExample)) {
    for (const rule of note.code.split(/\n\s*\n/)) expect(stylesheet).toContain(normalise(rule))
  }
})

// Checks that a page's "Also known as" names start in a closed Disclosure, open from its button,
// and open when its On this page link is followed.
test('Also known as starts closed and opens from its button or On this page', async ({ page }) => {
  await page.goto('/site/lab/layout/side-by-side/split')
  const trigger = page.getByRole('button', { name: 'Also known as', exact: true })
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
