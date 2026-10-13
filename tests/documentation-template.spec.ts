import { expect, test } from '@playwright/test'
import { findSiteNavigationGroups, sitePages } from '../site/siteNavigation'

const componentPages = sitePages.filter(page => page.status === 'implemented'
  && findSiteNavigationGroups(page.id).some(group => group.id === 'components'))

for (const definition of componentPages) {
  test(`${definition.path} uses consistent sections and matching Contents links`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.goto(definition.path)
    const main = page.getByRole('main')
    const contents = main.getByRole('navigation', { name: 'Contents', exact: true })
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
    for (const fontSize of [16, 32]) {
      await page.evaluate(size => { document.documentElement.style.fontSize = `${size}px` }, fontSize)
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)
    }
  })
}
