import { expect, test } from '@playwright/test'

// Checks the library's CSS sits in the mezzanine cascade layer: an app's single class, outside any
// layer, beats the library's stronger selectors.
test('An app class outside a layer beats the library', async ({ page }) => {
  await page.goto('/button')
  const button = page.locator('main .mz-button').first()
  await expect(button).not.toHaveCSS('background-color', 'rgb(1, 2, 3)')
  await page.addStyleTag({ content: '.app-override { background-color: rgb(1, 2, 3); }' })
  await button.evaluate(element => element.classList.add('app-override'))
  await expect(button).toHaveCSS('background-color', 'rgb(1, 2, 3)')
})

// Checks the site's plain-link defaults sit below the library: a navigation link keeps the
// navigation's text colour instead of taking the link colour.
test('Plain-link defaults do not restyle a component that renders a link', async ({ page }) => {
  await page.goto('/button')
  const navigationLink = page.locator('a.mz-nav-tree-label').first()
  const linkColor = await page.evaluate(() => {
    const plain = document.createElement('a')
    plain.href = '#'
    document.body.append(plain)
    return getComputedStyle(plain).color
  })
  await expect(navigationLink).not.toHaveCSS('color', linkColor)
})
