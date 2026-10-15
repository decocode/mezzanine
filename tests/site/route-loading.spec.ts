import { expect, test } from '@playwright/test'
import { sitePages } from '../../site/siteStructure'

for (const sitePage of sitePages) {
  test(`${sitePage.path} loads only its own documentation page`, async ({ page }) => {
    const pageChunks: string[] = []
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('request', (request) => {
      const match = new URL(request.url()).pathname.match(/\/([A-Za-z]+Page)-[^/]+\.js$/)
      if (match) pageChunks.push(match[1])
    })

    await page.goto(sitePage.path)
    await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByText('Loading documentation…', { exact: true })).toHaveCount(0)
    await expect(page.getByRole('button', { name: 'Reload page', exact: true })).toHaveCount(0)

    const expectedPage = sitePage.id.split('-').map((word) => (
      word[0].toUpperCase() + word.slice(1)
    )).join('') + 'Page'
    expect(pageChunks).toEqual(sitePage.status === 'implemented'
      ? [expectedPage]
      : [])
    expect(errors).toEqual([])
    const docsLink = page.getByRole('navigation', { name: 'Showcase navigation', exact: true }).getByRole('link', { name: 'Docs', exact: true })
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

  await page.goto('/button#button-tokens-heading')
  await expect(page.getByRole('status')).toHaveText('Loading documentation…')
  await page.evaluate(() => { document.documentElement.style.fontSize = '32px' })
  await page.getByRole('button', { name: 'Menu', exact: true }).click()
  await expect(page.getByRole('radio', { name: 'Dark theme', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Close menu', exact: true }).click()
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)

  releaseChunk()
  const heading = page.locator('#button-tokens-heading')
  await expect(heading).toBeVisible()
  await expect.poll(() => heading.evaluate((element) => element.getBoundingClientRect().top))
    .toBeGreaterThanOrEqual(0)
  await expect.poll(() => heading.evaluate((element) => element.getBoundingClientRect().top))
    .toBeLessThan(400)
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
  await page.getByRole('radio', { name: 'Dark theme', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(page.getByRole('status')).toHaveText('Press count: 1')
})
