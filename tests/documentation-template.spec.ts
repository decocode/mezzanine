import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { findSiteNavigationGroups, sitePages } from '../site/siteStructure'

const componentPages = sitePages.filter(page => page.status === 'implemented'
  && findSiteNavigationGroups(page.id).some(group => group.id === 'components'))

for (const definition of componentPages) {
  test(`${definition.path} uses consistent sections and matching On this page links`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.goto(definition.path)
    const main = page.getByRole('main')
    const contents = main.getByRole('navigation', { name: 'On this page', exact: true })
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
    const triggers = technical.locator('.mezzanine-disclosure-trigger')
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
    for (const fontSize of [16, 32]) {
      await page.evaluate(size => { document.documentElement.style.fontSize = `${size}px` }, fontSize)
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    expect((await new AxeBuilder({ page }).include('.mezzanine-table-of-contents').include('section[aria-labelledby$="-technical-details"]').include('section[aria-labelledby="related-pages"]').include('section[aria-labelledby*="references"]').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([])
  })
}

test('Navbar exposes related pages and external references through On this page', async ({ page }) => {
  await page.goto('/navbar')
  const main = page.getByRole('main')
  const contents = main.getByRole('navigation', { name: 'On this page', exact: true })
  const related = main.getByRole('region', { name: 'Related pages', exact: true })
  const references = main.getByRole('region', { name: 'References', exact: true })
  await contents.getByRole('link', { name: 'Related pages', exact: true }).click()
  await expect(page).toHaveURL(/#related-pages$/)
  await expect(related).toBeVisible()
  await expect(related.getByRole('link')).toHaveText(['Tab bar', 'Sidebar', 'Footer'])
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
  const tabBar = related.getByRole('link', { name: 'Tab bar', exact: true })
  await tabBar.focus()
  await page.keyboard.press('Tab')
  await expect(related.getByRole('link', { name: 'Sidebar', exact: true })).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  expect(await tabBar.evaluate(element => getComputedStyle(element).outlineStyle)).toBe('solid')
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/\/tab-bar$/)
  await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toHaveText('Tab bar')
})

test('Navbar groups technical sections and preserves their anchors', async ({ page }) => {
  await page.goto('/navbar#navbar-props-heading')
  const main = page.getByRole('main')
  const group = main.getByRole('region', { name: 'Technical details', exact: true })
  await expect(group.getByRole('heading', { level: 2 })).toHaveText('Technical details')
  await expect(group.getByRole('heading', { level: 3 })).toHaveText([
    'Anatomy', 'Behaviour', 'Usage', 'Props', 'CSS tokens',
  ])
  const contents = main.getByRole('navigation', { name: 'On this page', exact: true })
  const groupItem = contents.locator(':scope > ul > li').filter({
    has: page.getByRole('link', { name: 'Technical details', exact: true }),
  })
  await expect(groupItem.locator(':scope > ul > li > a')).toHaveText([
    'Anatomy', 'Behaviour', 'Usage', 'Props', 'CSS tokens',
  ])
  await expect(group.getByRole('button', { name: 'Props', exact: true })).toHaveAttribute('aria-expanded', 'true')
  await expect(group.getByRole('heading', { name: 'Props', exact: true })).toBeInViewport()
  await contents.getByRole('link', { name: 'Anatomy', exact: true }).click()
  await expect(page).toHaveURL(/#navbar-anatomy$/)
  await expect(group.getByRole('heading', { name: 'Anatomy', exact: true })).toBeInViewport()
})


test('technical disclosures support keyboard toggling and repeated section links', async ({ page }) => {
  await page.goto('/navbar')
  const main = page.getByRole('main')
  const group = main.getByRole('region', { name: 'Technical details', exact: true })
  const triggers = group.getByRole('button')
  await expect(triggers).toHaveCount(5)
  for (const trigger of await triggers.all()) await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  const anatomy = group.getByRole('button', { name: 'Anatomy', exact: true })
  const behaviour = group.getByRole('button', { name: 'Behaviour', exact: true })
  await anatomy.focus()
  await page.keyboard.press('Enter')
  await expect(anatomy).toHaveAttribute('aria-expanded', 'true')
  await expect(group.getByRole('grid', { name: 'Navbar anatomy' })).toBeVisible()
  await behaviour.focus()
  await page.keyboard.press('Space')
  await expect(behaviour).toHaveAttribute('aria-expanded', 'true')
  await expect(anatomy).toHaveAttribute('aria-expanded', 'true')
  expect(await behaviour.evaluate(element => getComputedStyle(element).outlineStyle)).toBe('solid')
  await page.keyboard.press('Space')
  await expect(behaviour).toHaveAttribute('aria-expanded', 'false')
  await page.keyboard.press('Tab')
  await expect(group.getByRole('button', { name: 'Usage', exact: true })).toBeFocused()

  const contents = main.getByRole('navigation', { name: 'On this page', exact: true })
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
