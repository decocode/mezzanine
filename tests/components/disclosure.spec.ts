import { expect, test } from '@playwright/test'

for (const fontSize of [16, 32]) {
  test(`Disclosure reflows at 320px with ${fontSize}px text and retains expanded orientation`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/disclosure')
    await page.evaluate(size => { document.documentElement.style.fontSize = `${size}px` }, fontSize)
    const trigger = page.locator('main .mezzanine-disclosure-trigger').first()
    await trigger.focus()
    if (await trigger.getAttribute('aria-expanded') !== 'true') await page.keyboard.press('Enter')
    await expect(trigger.locator('svg')).toHaveCSS('rotate', '90deg')
    expect(await trigger.evaluate(element => getComputedStyle(element).outlineStyle)).toBe('solid')
    expect((await trigger.boundingBox())!.height).toBeGreaterThanOrEqual(24)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  })
}

for (const theme of ['light', 'dark', 'wireframe']) {
  for (const reducedMotion of ['no-preference', 'reduce'] as const) {
    test(`Disclosure panel opens and closes immediately: ${theme}, ${reducedMotion}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion })
      await page.goto('/disclosure')
      await page.evaluate(theme => { document.documentElement.dataset.theme = theme }, theme)
      const trigger = page.locator('main .mezzanine-disclosure-trigger').first()
      const panel = page.locator('main .react-aria-DisclosurePanel').first()
      const fullHeight = (await panel.boundingBox())!.height
      await panel.evaluate(element => {
        const link = document.createElement('a')
        link.href = '#disclosure-basic-heading'
        link.textContent = 'Panel focus probe'
        element.append(link)
      })
      await trigger.click()
      await expect(panel).toHaveAttribute('hidden', 'until-found')
      expect(await panel.evaluate(element => element.getAnimations().length)).toBe(0)
      await panel.locator('a').evaluate(element => (element as HTMLElement).focus())
      await expect(trigger).toBeFocused()
      await trigger.click()
      await expect(panel).not.toHaveAttribute('hidden')
      expect(await panel.evaluate(element => element.getAnimations().length)).toBe(0)
      expect((await panel.boundingBox())!.height).toBeGreaterThanOrEqual(fullHeight)
      await panel.locator('a').focus()
      await expect(panel.locator('a')).toBeFocused()
    })
  }
}

test('Disclosure find-in-page opens a closed panel', async ({ page }) => {
  await page.goto('/disclosure')
  const trigger = page.locator('main .mezzanine-disclosure-trigger').first()
  const panel = page.locator('main .react-aria-DisclosurePanel').first()
  await trigger.click()
  await expect(panel).toHaveAttribute('hidden', 'until-found')
  // Exercise the event dispatched by browser find-in-page, without changing
  // React state or removing the hidden attribute ourselves.
  await panel.dispatchEvent('beforematch')
  await expect(trigger).toHaveAttribute('aria-expanded', 'true')
  await expect(panel).not.toHaveAttribute('hidden')
  await expect(panel).toBeVisible()
})

test('Disclosure group swaps panels immediately, including in forced colours', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' })
  await page.goto('/disclosure')
  const group = page.locator('main .react-aria-DisclosureGroup').first()
  const triggers = group.locator('.mezzanine-disclosure-trigger')
  const panels = group.locator('.react-aria-DisclosurePanel')
  await triggers.nth(1).click()
  await expect(panels.nth(0)).toHaveAttribute('hidden', 'until-found')
  await expect(panels.nth(1)).not.toHaveAttribute('hidden')
  await expect(panels.nth(1)).toBeVisible()
})

for (const fontSize of [16, 32]) {
  test(`Disclosure wrapped content reflows at 320px and ${fontSize}px text`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.goto('/disclosure')
    await page.evaluate(size => { document.documentElement.style.fontSize = `${size}px` }, fontSize)
    const panel = page.locator('main .react-aria-DisclosurePanel').first()
    await panel.evaluate(element => {
      const paragraph = document.createElement('p')
      paragraph.textContent = 'Wrapped disclosure content with enough words to wrap across several lines. '.repeat(8)
      element.append(paragraph)
    })
    await expect(panel.locator('p').last()).toBeVisible()
    await expect(panel).toHaveCSS('overflow', 'visible')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  })
}
