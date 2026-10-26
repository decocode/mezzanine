import { expect, test } from '@playwright/test'

for (const theme of ['light', 'dark', 'wireframe']) {
  for (const reducedMotion of ['no-preference', 'reduce'] as const) {
    test(`${theme} motion policy with ${reducedMotion}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion })
      await page.goto('/disclosure')
      await page.evaluate(theme => { document.documentElement.dataset.theme = theme }, theme)
      const trigger = page.locator('main .mz-disclosure-trigger').first()
      const icon = trigger.locator('svg')
      await expect(icon.locator('path')).toHaveAttribute('d', 'm9 6 6 6-6 6')
      await expect(icon).toHaveCSS('transition-duration', reducedMotion === 'reduce' || theme === 'wireframe' ? '0s' : '0.18s')
      if (await trigger.getAttribute('aria-expanded') === 'true') await trigger.click()
      await trigger.focus()
      await page.keyboard.press('Enter')
      await expect(trigger).toHaveAttribute('aria-expanded', 'true')
      await expect(icon).toHaveCSS('rotate', '90deg')
      await expect(trigger).toBeFocused()
      await page.keyboard.press('Space')
      await expect(trigger).toHaveAttribute('aria-expanded', 'false')
      await expect(icon).toHaveCSS('rotate', 'none')
    })
  }
}

test('nested themes restore finite motion and system reduction wins over speed overrides', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/nav-tree')
  const tree = page.getByRole('treegrid', { name: 'Nav tree items', exact: true })
  const icon = tree.getByRole('button', { name: 'Fruit', exact: true }).locator('svg')
  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'wireframe'
    document.documentElement.style.setProperty('--motion-duration-interface', '800ms')
  })
  await expect(icon).toHaveCSS('transition-duration', '0s')
  for (const theme of ['light', 'dark', 'system']) {
    await tree.evaluate((element, theme) => { element.dataset.theme = theme }, theme)
    await expect(icon).toHaveCSS('transition-duration', '0.8s')
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect(icon).toHaveCSS('transition-duration', '0s')
    await page.emulateMedia({ reducedMotion: 'no-preference' })
  }
  await tree.evaluate(element => { element.dataset.theme = 'wireframe' })
  await page.evaluate(() => { document.documentElement.dataset.theme = 'light' })
  await expect(icon).toHaveCSS('transition-duration', '0s')
  await expect(page.locator('.mz-disclosure-chevron').first()).toHaveCSS('transition-duration', '0.8s')
})

test('loading remains visible and Wireframe leaves its behaviour unchanged', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/icons')
  const preview = page.locator('.icon-loading').first()
  await page.evaluate(() => { document.documentElement.dataset.theme = 'wireframe' })
  await expect(preview).toBeVisible()
  await expect(preview).toHaveCSS('animation-duration', '1s')
  await expect(preview).toHaveCSS('animation-name', 'icon-loading-spin')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(preview).toHaveCSS('animation-name', 'none')
  await expect(preview).toBeVisible()
})

test('Motion reference reads shared values and refreshes its policy status', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/motion')
  await expect(page.getByText('Finite motion on this page is currently enabled.', { exact: false })).toBeVisible()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.getByText('Finite motion on this page is currently suppressed.', { exact: false })).toBeVisible()
  const tokens = page.getByRole('grid', { name: 'Motion CSS tokens', exact: true })
  await expect(tokens.getByRole('row')).toHaveCount(11)
  await expect(tokens.getByRole('row', { name: /--motion-rotation-expanded/ })).toContainText('90deg')
})
