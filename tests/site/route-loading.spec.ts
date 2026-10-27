import { expect, test } from '@playwright/test'
import { chooseSiteTheme, siteThemeSwitcher } from '../display'
import { sitePageFile, sitePages } from '../../site/siteStructure'

// The file name of every page component, such as "ButtonPage". Shared modules whose names also end
// in "Page", such as the ContentPage builder, may load with any page and aren't counted.
const pageComponents = new Set(sitePages.map((page) => sitePageFile(page.id).replace(/\.tsx$/, '')))

for (const sitePage of sitePages) {
  test(`${sitePage.path} loads only its own documentation page`, async ({ page }) => {
    const pageChunks: string[] = []
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('request', (request) => {
      const match = new URL(request.url()).pathname.match(/\/([A-Za-z]+Page)-[^/]+\.js$/)
      if (match && pageComponents.has(match[1])) pageChunks.push(match[1])
    })

    await page.goto(sitePage.path)
    await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByText('Loading documentation…', { exact: true })).toHaveCount(0)
    await expect(page.getByRole('button', { name: 'Reload page', exact: true })).toHaveCount(0)

    const expectedPage = sitePageFile(sitePage.id).replace(/\.tsx$/, '')
    expect(pageChunks).toEqual(sitePage.status === 'implemented'
      ? [expectedPage]
      : [])
    expect(errors).toEqual([])
    const docsLink = page.getByRole('navigation', { name: 'Primary', exact: true }).getByRole('link', { name: 'Docs', exact: true })
    if (sitePage.id === 'home') {
      await expect(docsLink).not.toHaveAttribute('aria-current')
    } else {
      await expect(docsLink).toHaveAttribute('aria-current', sitePage.id === 'introduction' ? 'page' : 'true')
    }
  })
}

test('delayed loading keeps the shell usable and restores a direct section link', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  let releaseChunk!: () => void
  const chunkReady = new Promise<void>((resolve) => { releaseChunk = resolve })
  await page.route('**/assets/ButtonPage-*.js', async (route) => {
    await chunkReady
    await route.continue()
  })

  await page.goto('/button#button-tokens')
  await expect(page.getByRole('status')).toHaveText('Loading documentation…')
  await page.evaluate(() => { document.documentElement.style.fontSize = '32px' })
  await page.getByRole('button', { name: 'Menu', exact: true }).click()
  await expect(siteThemeSwitcher(page)).toBeVisible()
  await page.getByRole('button', { name: 'Close menu', exact: true }).click()
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)

  releaseChunk()
  const heading = page.locator('#button-tokens')
  await expect(heading).toBeVisible()
  await expect.poll(() => heading.evaluate((element) => element.getBoundingClientRect().top))
    .toBeGreaterThanOrEqual(0)
  // The heading lands near the top of the scrolling content, below the TopBar and AppShell's frame.
  await expect.poll(() => heading.evaluate((element) => {
    const content = element.closest('.mz-app-shell-content')!
    return element.getBoundingClientRect().top - content.getBoundingClientRect().top
  })).toBeLessThan(150)
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)
})

test('a failed page download offers a working reload action', async ({ page }) => {
  await page.route('**/assets/ButtonPage-*.js', (route) => route.abort())
  await page.goto('/button')
  await expect(page.getByRole('heading', { name: 'Unable to load this page' })).toBeVisible()
  await expect(page.getByRole('alert')).toHaveText('Reload the page to try again.')
  await page.unroute('**/assets/ButtonPage-*.js')
  await page.getByRole('button', { name: 'Reload page', exact: true }).focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('button', { name: 'Press', exact: true })).toBeVisible()
})

test('theme changes preserve the loaded page and example state', async ({ page }) => {
  await page.goto('/button')
  await page.getByRole('button', { name: 'Press', exact: true }).focus()
  await page.keyboard.press('Enter')
  // The page's own theme switcher is in the top bar; each demo has its own too.
  await chooseSiteTheme(page, 'Dark')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(page.getByRole('status')).toHaveText('Press count: 1')
})

// Checks that switching theme moves nothing: the app's areas, the page heading and the first example keep
// the same position and size in Light, Dark and Wireframe.
test('switching theme keeps content in the same place', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/button')
  const selectors = ['main', 'main h1', '.mz-demo-block', '.mz-top-bar', '.mz-panel']
  for (const selector of selectors) await expect(page.locator(selector).first()).toBeVisible()
  const boxes = async () => page.evaluate(selectors => selectors.map(selector => {
    const { x, y, width, height } = document.querySelector(selector)!.getBoundingClientRect()
    return [selector, Math.round(x), Math.round(y), Math.round(width), Math.round(height)].join(' ')
  }), selectors)
  const layouts = []
  for (const theme of ['light', 'dark', 'wireframe']) {
    await page.evaluate(theme => { document.documentElement.dataset.theme = theme }, theme)
    layouts.push(await boxes())
  }
  expect(layouts[1]).toEqual(layouts[0])
  expect(layouts[2]).toEqual(layouts[0])
})
