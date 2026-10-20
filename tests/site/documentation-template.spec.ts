import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { findSiteNavigationGroups, sitePages } from '../../site/siteStructure'

const componentPages = sitePages.filter(page => page.status === 'implemented'
  && findSiteNavigationGroups(page.id).some(group => group.id === 'components'))

for (const definition of componentPages) {
  test(`${definition.path} uses consistent sections and matching On this page links`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(definition.path)
    const main = page.getByRole('main')
    const contents = page.getByRole('navigation', { name: 'On this page', exact: true })
    await expect(contents).toBeVisible()
    await expect(main.getByRole('heading', { level: 1 })).toHaveCount(1)
    const sections = main.locator(':scope > section.component-section')
    const links = contents.locator(':scope > ul > li > a')
    await expect(links).toHaveCount(await sections.count())
    for (let index = 0; index < await sections.count(); index++) {
      const section = sections.nth(index)
      const heading = section.locator(':scope > h2')
      const id = await section.getAttribute('aria-labelledby')
      await expect(heading).toHaveAttribute('id', id!)
      await expect(links.nth(index)).toHaveAttribute('href', `#${id}`)
      await expect(links.nth(index)).toHaveText((await heading.textContent())!)
    }
    for (const href of await contents.locator('a').evaluateAll(elements => elements.map(a => a.getAttribute('href')!))) {
      expect(await page.evaluate(id => document.querySelectorAll(`[id="${id}"]`).length, href.slice(1))).toBe(1)
    }
    const technical = main.getByRole('region', { name: 'Technical details', exact: true })
    await expect(technical).toBeVisible()
    const triggers = technical.locator('.mz-disclosure-trigger')
    expect(await triggers.count()).toBeGreaterThan(0)
    for (const trigger of await triggers.all()) {
      await expect(trigger).toHaveAttribute('aria-expanded', 'false')
      await trigger.click()
      await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    }
    for (const sectionName of ['Related pages', 'References']) {
      const section = main.getByRole('region', { name: sectionName, exact: true })
      expect(await section.getByRole('link').count()).toBeGreaterThan(0)
      for (const link of await section.getByRole('link').all()) {
        const href = await link.getAttribute('href')
        if (sectionName === 'Related pages') {
          expect(sitePages.some(item => item.path === href)).toBe(true)
        } else {
          expect(href).toMatch(/^https:\/\//)
          await expect(link).toHaveAccessibleName(/opens in a new tab/)
          await expect(link).not.toHaveText(/opens in a new tab/)
          await expect(link.locator('svg')).toHaveAttribute('aria-hidden', 'true')
        }
      }
    }
    await page.setViewportSize({ width: 320, height: 900 })
    for (const fontSize of [16, 32]) {
      await page.evaluate(size => { document.documentElement.style.fontSize = `${size}px` }, fontSize)
      // Polled, so a Panel still animating its space closed after the resize can settle first.
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)
    }
    expect((await new AxeBuilder({ page }).include('section[aria-labelledby$="-technical-details"]').include('section[aria-labelledby="related-pages"]').include('section[aria-labelledby*="references"]').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([])
  })
}

test('TopBar exposes related pages and external references through On this page', async ({ page }) => {
  await page.goto('/top-bar')
  const main = page.getByRole('main')
  const contents = page.getByRole('navigation', { name: 'On this page', exact: true })
  const related = main.getByRole('region', { name: 'Related pages', exact: true })
  const references = main.getByRole('region', { name: 'References', exact: true })
  await contents.getByRole('link', { name: 'Related pages', exact: true }).click()
  await expect(page).toHaveURL(/#related-pages$/)
  await expect(related).toBeVisible()
  await expect(related.getByRole('link')).toHaveText(['Footer', 'Target size'])
  for (const link of await related.getByRole('link').all()) {
    const href = await link.getAttribute('href')
    expect(sitePages.some(item => item.path === href)).toBe(true)
    await expect(link).not.toHaveAttribute('target', '_blank')
  }
  await contents.getByRole('link', { name: 'References', exact: true }).click()
  await expect(page).toHaveURL(/#references$/)
  await expect(references.getByRole('link')).toHaveCount(3)
  for (const link of await references.getByRole('link').all()) {
    await expect(link).toHaveAttribute('href', /^https:\/\/react-aria.adobe.com\//)
    await expect(link).toHaveAttribute('target', '_blank')
    await expect(link).toHaveAttribute('rel', 'noreferrer')
    await expect(link).toHaveAccessibleName(/opens in a new tab/)
    await expect(link).not.toHaveText(/opens in a new tab/)
    await expect(link.locator('svg')).toHaveAttribute('aria-hidden', 'true')
  }
  const footer = related.getByRole('link', { name: 'Footer', exact: true })
  await footer.focus()
  await page.keyboard.press('Tab')
  await expect(related.getByRole('link', { name: 'Target size', exact: true })).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  expect(await footer.evaluate(element => getComputedStyle(element).outlineStyle)).toBe('solid')
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/\/footer$/)
  await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toHaveText('Footer')
})

test('TopBar groups technical sections and preserves their anchors', async ({ page }) => {
  await page.goto('/top-bar#top-bar-props')
  const main = page.getByRole('main')
  const group = main.getByRole('region', { name: 'Technical details', exact: true })
  await expect(group.getByRole('heading', { level: 2 })).toHaveText('Technical details')
  await expect(group.getByRole('heading', { level: 3 })).toHaveText([
    'Anatomy', 'Behaviour', 'Usage', 'Accessibility', 'Props', 'CSS tokens',
  ])
  const contents = page.getByRole('navigation', { name: 'On this page', exact: true })
  const groupItem = contents.locator(':scope > ul > li').filter({
    has: page.getByRole('link', { name: 'Technical details', exact: true }),
  })
  await expect(groupItem.locator(':scope > ul > li > a')).toHaveText([
    'Anatomy', 'Behaviour', 'Usage', 'Accessibility', 'Props', 'CSS tokens',
  ])
  await expect(group.getByRole('button', { name: 'Props', exact: true })).toHaveAttribute('aria-expanded', 'true')
  await expect(group.getByRole('heading', { name: 'Props', exact: true })).toBeInViewport()
  await contents.getByRole('link', { name: 'Anatomy', exact: true }).click()
  await expect(page).toHaveURL(/#top-bar-anatomy$/)
  await expect(group.getByRole('heading', { name: 'Anatomy', exact: true })).toBeInViewport()
})


test('technical disclosures support keyboard toggling and repeated section links', async ({ page }) => {
  await page.goto('/top-bar')
  const main = page.getByRole('main')
  const group = main.getByRole('region', { name: 'Technical details', exact: true })
  const triggers = group.getByRole('button')
  await expect(triggers).toHaveCount(6)
  for (const trigger of await triggers.all()) await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  const anatomy = group.getByRole('button', { name: 'Anatomy', exact: true })
  const behaviour = group.getByRole('button', { name: 'Behaviour', exact: true })
  await anatomy.focus()
  await page.keyboard.press('Enter')
  await expect(anatomy).toHaveAttribute('aria-expanded', 'true')
  await expect(group.getByRole('grid', { name: 'TopBar anatomy' })).toBeVisible()
  await behaviour.focus()
  await page.keyboard.press('Space')
  await expect(behaviour).toHaveAttribute('aria-expanded', 'true')
  await expect(anatomy).toHaveAttribute('aria-expanded', 'true')
  expect(await behaviour.evaluate(element => getComputedStyle(element).outlineStyle)).toBe('solid')
  await page.keyboard.press('Space')
  await expect(behaviour).toHaveAttribute('aria-expanded', 'false')
  await page.keyboard.press('Tab')
  await expect(group.getByRole('button', { name: 'Usage', exact: true })).toBeFocused()

  const contents = page.getByRole('navigation', { name: 'On this page', exact: true })
  const propsLink = contents.getByRole('link', { name: 'Props', exact: true })
  const props = group.getByRole('button', { name: 'Props', exact: true })
  await propsLink.click()
  await expect(props).toHaveAttribute('aria-expanded', 'true')
  await props.click()
  await expect(props).toHaveAttribute('aria-expanded', 'false')
  await propsLink.click()
  await expect(props).toHaveAttribute('aria-expanded', 'true')
  await contents.getByRole('link', { name: 'Usage', exact: true }).click()
  await props.click()
  await page.goBack()
  await expect(props).toHaveAttribute('aria-expanded', 'true')
  await expect(props).toBeInViewport()
})

for (const path of ['/top-bar', '/color', '/motion', '/typography/prose', '/shape', '/shape/corners', '/shape/borders', '/elevation']) {
  test(`${path} places page contents in the end Panel on wide screens`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(path)
    const contents = page.getByRole('navigation', { name: 'On this page', exact: true })
    await expect(contents).toBeVisible()
    await expect(page.getByRole('main').getByRole('navigation', { name: 'On this page', exact: true })).toHaveCount(0)
    const endPanel = page.locator('.mz-panel[data-edge="end"]')
    const main = await page.getByRole('main').boundingBox()
    expect((await endPanel.boundingBox())!.x).toBeGreaterThanOrEqual(main!.x + main!.width)
    await expect(contents.getByRole('link').first()).toBeVisible()
    if (path === '/top-bar') await page.screenshot({ path: 'reports/test-results/docs-contents-desktop.png' })
  })
}

for (const fontSize of [16, 32]) {
  test(`page contents appear inline after the heading on narrow screens at ${fontSize}px`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.goto('/top-bar')
    await page.evaluate(size => { document.documentElement.style.fontSize = `${size}px` }, fontSize)
    const main = page.getByRole('main')
    const contents = main.getByRole('navigation', { name: 'On this page', exact: true })
    await expect(contents).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'On this page', exact: true })).toHaveCount(1)
    await expect(page.getByRole('button', { name: 'On this page', exact: true })).toHaveCount(0)
    const description = await main.locator('.page-description').boundingBox()
    const contentsBox = await contents.boundingBox()
    expect(contentsBox!.y).toBeGreaterThan(description!.y + description!.height)
    expect(contentsBox!.y).toBeLessThan((await main.locator('section.component-section').first().boundingBox())!.y)
    await page.screenshot({ path: `reports/test-results/docs-contents-${fontSize}.png` })
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
    await contents.getByRole('link', { name: 'Props', exact: true }).click()
    await expect(page).toHaveURL(/#top-bar-props$/)
    await expect(page.getByRole('button', { name: 'Props', exact: true })).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByRole('heading', { name: 'Props', exact: true })).toBeInViewport()
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)
  })
}

// Links into Technical details follow the motion policy: smooth by default,
// immediate with reduced motion or in Wireframe. The AppShell's content area is what scrolls.
for (const mode of ['default', 'reduced motion', 'wireframe'] as const) {
  test(`On this page links into Technical details scroll with the ${mode} policy`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    if (mode === 'reduced motion') await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/button')
    if (mode === 'wireframe') await page.evaluate(() => { document.documentElement.dataset.theme = 'wireframe' })
    const contents = page.getByRole('navigation', { name: 'On this page', exact: true })
    await contents.getByRole('link', { name: 'Anatomy', exact: true }).click()
    // Two frames: one for the panel to open, one for the scroll to begin.
    const early = await page.evaluate(() => new Promise<number>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve(document.querySelector('.mz-app-shell-content')!.scrollTop)))))
    await expect(page.getByRole('heading', { name: 'Anatomy', exact: true })).toBeInViewport()
    await expect.poll(() => page.evaluate(() => document.querySelector('.mz-app-shell-content')!.scrollTop)).toBeGreaterThan(0)
    await page.waitForTimeout(1500)
    const settled = await page.evaluate(() => document.querySelector('.mz-app-shell-content')!.scrollTop)
    if (mode === 'default') expect(early).toBeLessThan(settled)
    else expect(early).toBe(settled)
  })
}
