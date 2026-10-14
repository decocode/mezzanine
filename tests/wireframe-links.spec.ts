import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('Button documents four content options and gives icon-only buttons a tooltip', async ({ page }) => {
  await page.goto('/button')
  const examples = page.getByRole('grid', { name: 'Button content', exact: true })
  await expect(examples.getByRole('row')).toHaveCount(5)
  for (const label of ['Text-only', 'Text + icon leading', 'Text + icon trailing', 'Icon only']) {
    await expect(examples.getByText(label, { exact: true })).toBeVisible()
  }
  const iconOnly = examples.getByRole('button', { name: 'Download', exact: true })
  await iconOnly.scrollIntoViewIfNeeded()
  await iconOnly.focus()
  await expect(page.getByRole('tooltip')).toHaveText('Download')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('tooltip')).toHaveCount(0)
  // Escape also returns focus to React Aria Table's row navigation.
  await expect.poll(() => examples.evaluate(element => element.contains(document.activeElement))).toBe(true)
})

test('Button href preserves navigation and action behaviour', async ({ page }) => {
  await page.goto('/button')
  const navigation = page.getByRole('link', { name: 'Read usage guidance', exact: true })
  await expect(navigation).toHaveAttribute('href', '#button-usage-heading')
  await expect(page.getByText('Want to find out more about button accessibility?', { exact: true })).toBeVisible()
  await expect(navigation.locator('.mezzanine-button-icon')).toHaveCount(0)
  await navigation.focus()
  await page.keyboard.press('Space')
  await expect(page).toHaveURL(/\/button$/)
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#button-usage-heading$/)
  await expect(page.locator('#button-usage-heading')).toBeVisible()
  const action = page.getByRole('button', { name: 'Press', exact: true })
  await action.focus()
  await page.keyboard.press('Space')
  await expect(page.getByRole('status')).toHaveText('Press count: 1')
  await page.keyboard.press('Enter')
  await expect(page.getByRole('status')).toHaveText('Press count: 2')
  await expect(page.locator('button[data-pending]').first().getByRole('progressbar')).toHaveAttribute('aria-label', 'Loading')
})

for (const theme of ['light', 'dark', 'wireframe']) {
  test(`Read docs matches the shared Primary Medium Button in ${theme}`, async ({ page }) => {
    await page.addInitScript(theme => localStorage.setItem('mezzanine-theme', theme), theme)
    await page.setViewportSize({ width: 320, height: 900 })
    const styles: Record<string, string>[] = []
    for (const path of ['/button', '/']) {
      await page.goto(path)
      const control = path === '/'
        ? page.getByRole('link', { name: 'Read docs', exact: true })
        : page.getByRole('button', { name: 'Press', exact: true })
      await expect(control).toBeVisible()
      for (const [index, state] of ['default', 'hovered', 'focused', 'pressed'].entries()) {
        await control.evaluate((element, state) => {
          element.setAttribute('data-preview-state', state)
        }, state)
        const style = await control.evaluate(element => {
          const computed = getComputedStyle(element)
          return Object.fromEntries([
            'min-height', 'padding-block', 'padding-inline', 'border-width', 'border-color',
            'border-radius', 'background-color', 'color', 'font-size', 'font-weight',
            'line-height', 'outline-width', 'outline-style', 'outline-offset', 'text-decoration-line',
          ].map(property => [property, computed.getPropertyValue(property)]))
        })
        if (path === '/button') styles.push(style)
        else expect(style).toEqual(styles[index])
      }
      await control.evaluate(element => element.removeAttribute('data-preview-state'))
    }
    const readDocs = page.getByRole('link', { name: 'Read docs', exact: true })
    await page.evaluate(() => { document.documentElement.style.fontSize = '32px' })
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)
    expect((await new AxeBuilder({ page }).include('.landing-hero').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([])
    await readDocs.focus()
    await expect(readDocs).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/introduction$/)
  })
}

for (const path of ['/', '/navigation-tree', '/link', '/navbar', '/tabs', '/tab-bar', '/breadcrumbs']) {
  test(`Wireframe underlines text links except the wordmark and button-style links on ${path}`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('mezzanine-theme', 'wireframe'))
    await page.setViewportSize({ width: 320, height: 900 })
    await page.goto(path)
    await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByText('Loading documentation…', { exact: true })).toHaveCount(0)
    for (const fontSize of [16, 32]) {
      await page.evaluate(size => document.documentElement.style.fontSize = `${size}px`, fontSize)
      const missingUnderlines = await page.locator('a, [role="link"]').evaluateAll(elements => elements
        .filter(element => !element.matches('.site-name, .react-aria-Button'))
        .filter(element => !getComputedStyle(element).textDecorationLine.includes('underline'))
        .map(element => element.textContent))
      expect(missingUnderlines).toEqual([])
      await expect(page.getByRole('link', { name: 'Mezzanine home', exact: true })).toHaveCSS('text-decoration-line', 'none')
      if (path === '/') {
        const readDocs = page.getByRole('link', { name: 'Read docs', exact: true })
        await expect(readDocs).toHaveCSS('text-decoration-line', 'none')
        await readDocs.hover()
        await expect(readDocs).toHaveCSS('text-decoration-line', 'none')
        await readDocs.focus()
        await expect(readDocs).toHaveCSS('text-decoration-line', 'none')
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)
    }
  })
}

test('NavigationTree links retain underlines through hover and keyboard focus in Wireframe only', async ({ page }) => {
  await page.goto('/navigation-tree')
  const tree = page.getByRole('treegrid', { name: 'Nav Tree items', exact: true })
  const link = tree.getByRole('link', { name: 'Item A', exact: true })
  for (const theme of ['light', 'dark', 'wireframe']) {
    await page.evaluate(theme => document.documentElement.dataset.theme = theme, theme)
    await link.hover()
    expect(await link.evaluate(element => getComputedStyle(element).textDecorationLine)).toBe(theme === 'wireframe' ? 'underline' : 'none')
    await page.keyboard.press('Tab')
    await link.focus()
    expect(await link.evaluate(element => getComputedStyle(element).textDecorationLine)).toBe(theme === 'wireframe' ? 'underline' : 'none')
  }
})
