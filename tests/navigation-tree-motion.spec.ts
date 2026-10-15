import { expect, test } from '@playwright/test'

for (const reducedMotion of ['no-preference', 'reduce'] as const) {
  test(`Nav Tree immediate rows and chevron respect ${reducedMotion}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion })
    await page.goto('/navigation-tree')
    await page.evaluate(() => document.documentElement.style.setProperty('--motion-duration-interface', '800ms'))
    const tree = page.getByRole('treegrid', { name: 'Nav Tree items', exact: true })
    const trigger = tree.getByRole('button', { name: 'Fruit', exact: true })
    const child = tree.getByRole('row', { name: 'Apples', exact: true })
    const parent = tree.getByRole('row', { name: 'Fruit', exact: true })
    await parent.focus()
    await page.keyboard.press('ArrowLeft')
    await expect(child).toHaveCount(0)
    await expect(parent).toHaveAttribute('aria-expanded', 'false')
    await expect(parent).toBeFocused()
    await expect(trigger.locator('svg')).toHaveCSS('transition-duration', reducedMotion === 'reduce' ? '0s' : '0.8s')
    await page.keyboard.press('ArrowRight')
    await expect(child).toBeVisible()
    await expect(parent).toHaveAttribute('aria-expanded', 'true')
    expect(await child.evaluate(element => element.getAnimations().length)).toBe(0)
    await expect(trigger.locator('svg')).toHaveCSS('rotate', '90deg')
  })
}

test('enabling reduced motion completes a pending Nav Tree chevron rotation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/navigation-tree')
  const tree = page.getByRole('treegrid', { name: 'Nav Tree items', exact: true })
  await tree.evaluate(element => { element.style.setProperty('--motion-duration-interface', '10s') })
  const trigger = tree.getByRole('button', { name: 'Fruit', exact: true })
  await trigger.click()
  await expect(tree.getByRole('row', { name: 'Apples', exact: true })).toHaveCount(0)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(trigger.locator('svg')).toHaveCSS('rotate', '0deg')
  await expect(trigger.locator('svg')).toHaveCSS('transition-duration', '0s')
})
