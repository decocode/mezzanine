import { expect, test } from '@playwright/test'

for (const reducedMotion of ['no-preference', 'reduce'] as const) {
  test(`NavigationTree expansion respects ${reducedMotion}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion })
    await page.goto('/navigation-tree')
    await page.evaluate(() => document.documentElement.style.setProperty('--navigation-tree-motion-duration', '800ms'))
    const tree = page.getByRole('treegrid', { name: 'NavigationTree items', exact: true })
    const trigger = tree.getByRole('button', { name: /^Expand or collapse Item B/ })
    const child = tree.getByRole('row', { name: /Child item B1/ })
    const parent = tree.getByRole('row', { name: 'Item B', exact: true })
    await parent.focus()
    await page.keyboard.press('ArrowLeft')
    if (reducedMotion === 'no-preference') {
      await expect(tree.locator('.mezzanine-navigation-tree-item-animated.mezzanine-navigation-tree-item-closing')).toHaveCount(2)
      expect(await tree.locator('.mezzanine-navigation-tree-item-animated.mezzanine-navigation-tree-item-closing').first().evaluate(e => getComputedStyle(e).animationName)).toBe('navigation-tree-item-close')
    } else {
      await expect(tree.locator('.mezzanine-navigation-tree-item-closing')).toHaveCount(0)
      expect(await trigger.locator('svg').evaluate(e => getComputedStyle(e).transitionDuration)).toBe('0s')
    }
    await expect(child).toHaveCount(0)
    await expect(parent).toBeFocused()
    await page.keyboard.press('ArrowRight')
    await expect(child).toBeVisible()
    if (reducedMotion === 'no-preference') {
      await expect(tree.locator('.mezzanine-navigation-tree-item-animated.mezzanine-navigation-tree-item-opening')).toHaveCount(2)
      await expect(tree.locator('.mezzanine-navigation-tree-item-opening')).toHaveCount(0)
    } else {
      await expect(tree.locator('.mezzanine-navigation-tree-item-opening')).toHaveCount(0)
    }
  })
}

test('enabling reduced motion completes a pending NavigationTree collapse', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/navigation-tree')
  await page.evaluate(() => document.documentElement.style.setProperty('--navigation-tree-motion-duration', '10s'))
  const tree = page.getByRole('treegrid', { name: 'NavigationTree items', exact: true })
  await tree.getByRole('button', { name: /^Expand or collapse Item B/ }).click()
  await expect(tree.locator('.mezzanine-navigation-tree-item-animated.mezzanine-navigation-tree-item-closing')).toHaveCount(2)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(tree.locator('.mezzanine-navigation-tree-item-closing')).toHaveCount(0)
  await expect(tree.getByRole('row', { name: /Child item B1/ })).toHaveCount(0)
})
