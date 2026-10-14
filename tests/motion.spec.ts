import { expect, test } from '@playwright/test'

for (const theme of ['light', 'dark', 'wireframe']) {
  for (const reducedMotion of ['no-preference', 'reduce'] as const) {
    test(`${theme} motion policy with ${reducedMotion}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion })
      await page.goto('/disclosure')
      await page.evaluate(theme => { document.documentElement.dataset.theme = theme }, theme)
      const trigger = page.locator('main .mezzanine-disclosure-trigger').first()
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
  await page.goto('/navigation-tree')
  const tree = page.getByRole('treegrid', { name: 'Nav Tree items', exact: true })
  const icon = tree.getByRole('button', { name: 'Item B', exact: true }).locator('svg')
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
  await expect(page.locator('.mezzanine-disclosure-chevron').first()).toHaveCSS('transition-duration', '0.8s')
})

test('theme changes settle a tree chevron; rapid toggles leave truthful immediate rows', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/navigation-tree')
  const tree = page.getByRole('treegrid', { name: 'Nav Tree items', exact: true })
  const trigger = tree.getByRole('button', { name: 'Item B', exact: true })
  const child = tree.getByRole('row', { name: 'Child item B1', exact: true })
  await tree.evaluate(element => { element.style.setProperty('--motion-duration-interface', '10s') })
  await trigger.click()
  await expect(child).toHaveCount(0)
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  await tree.evaluate(element => { element.dataset.theme = 'wireframe' })
  await expect(trigger.locator('svg')).toHaveCSS('rotate', '0deg')
  await trigger.click()
  await expect(child).toBeVisible()
  await trigger.click()
  await trigger.click()
  await expect(child).toBeVisible()
  await expect(trigger).toHaveAttribute('aria-expanded', 'true')
  await tree.evaluate(element => { element.dataset.theme = 'light'; element.style.setProperty('--motion-duration-interface', 'invalid') })
  await trigger.click()
  await expect(child).toHaveCount(0)
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

test('pending Button ring stays visible when the system stops rotation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/button')
  const ring = page.locator('.mezzanine-button-progress-indicator').first()
  await page.evaluate(() => { document.documentElement.dataset.theme = 'wireframe' })
  await expect(ring).toBeVisible()
  await expect(ring).toHaveCSS('animation-name', 'mezzanine-button-progress-spin')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(ring).toHaveCSS('animation-name', 'none')
  await expect(ring).toBeVisible()
  await expect(ring).toHaveCSS('animation-duration', '1s')
})

for (const theme of ['light', 'dark', 'wireframe']) {
  for (const reducedMotion of ['no-preference', 'reduce'] as const) {
    test(`Disclosure panel reveal: ${theme}, ${reducedMotion}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion })
      await page.goto('/disclosure')
      await page.evaluate(theme => { document.documentElement.dataset.theme = theme }, theme)
      const trigger = page.locator('main .mezzanine-disclosure-trigger').first()
      const panel = page.locator('main .react-aria-DisclosurePanel').first()
      await expect.poll(() => panel.evaluate(element => element.getAnimations().length)).toBe(0)
      const fullHeight = (await panel.boundingBox())!.height
      await panel.evaluate(element => {
        const link = document.createElement('a')
        link.href = '#disclosure-basic-heading'
        link.textContent = 'Panel focus probe'
        element.append(link)
      })
      await trigger.click()
      await expect(panel).toHaveAttribute('aria-hidden', 'true')
      await panel.locator('a').evaluate(element => (element as HTMLElement).focus())
      await expect(trigger).toBeFocused()
      await expect(page.getByRole('link', { name: 'Panel focus probe' })).toHaveCount(0)
      await expect(panel).toHaveAttribute('hidden', 'until-found')
      await expect(panel).not.toHaveAttribute('inert')
      await trigger.click()
      await expect(panel).toHaveAttribute('aria-hidden', 'false')
      await expect(panel).not.toHaveAttribute('hidden')
      await expect.poll(() => panel.evaluate(element => element.getAnimations().length)).toBe(0)
      expect((await panel.boundingBox())!.height).toBeGreaterThanOrEqual(fullHeight)
      await expect(panel).toHaveCSS('overflow', 'visible')
      await panel.locator('a').focus()
      await expect(panel.locator('a')).toBeFocused()
      await expect(panel).toHaveCSS('animation-name', theme === 'wireframe' || reducedMotion === 'reduce' ? 'none' : 'mezzanine-disclosure-reveal')
    })
  }
}

test('Disclosure measured height, exit focus exclusion, interruption and find-in-page', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/disclosure')
  const trigger = page.locator('main .mezzanine-disclosure-trigger').first()
  const panel = page.locator('main .react-aria-DisclosurePanel').first()
  await expect.poll(() => panel.evaluate(element => element.getAnimations().length)).toBe(0)
  await panel.evaluate(element => {
    element.style.setProperty('--motion-duration-interface', '2s')
    element.append(Object.assign(document.createElement('button'), { textContent: 'Exit focus probe' }))
  })
  const fullHeight = (await panel.boundingBox())!.height
  await trigger.click()
  await expect(panel).toHaveAttribute('inert')
  await expect(panel).not.toHaveAttribute('hidden')
  await expect(page.getByRole('button', { name: 'Exit focus probe' })).toHaveCount(0)
  await panel.locator('button').evaluate(element => element.focus())
  await expect(trigger).toBeFocused()
  const closing = await panel.evaluate(element => {
    const animations = element.getAnimations()
    for (const animation of animations) { animation.pause(); animation.currentTime = 1000 }
    return { height: element.getBoundingClientRect().height, opacity: Number(getComputedStyle(element).opacity), translate: getComputedStyle(element).translate }
  })
  expect(closing.height).toBeGreaterThan(0)
  expect(closing.height).toBeLessThan(fullHeight)
  expect(closing.opacity).toBeGreaterThan(0)
  expect(closing.opacity).toBeLessThan(1)
  expect(closing.translate).not.toBe('none')
  await trigger.click()
  await expect(panel).not.toHaveAttribute('inert')
  await trigger.click()
  await panel.evaluate(element => { element.dataset.theme = 'wireframe' })
  await expect(panel).toHaveAttribute('hidden', 'until-found')
  await expect(panel).not.toHaveAttribute('inert')
  // Exercise the event dispatched by browser find-in-page, without changing
  // React state or removing the hidden attribute ourselves.
  await panel.dispatchEvent('beforematch')
  await expect(trigger).toHaveAttribute('aria-expanded', 'true')
  await expect(panel).not.toHaveAttribute('hidden')
  await expect(panel).toBeVisible()
  await expect(panel).toHaveCSS('overflow', 'visible')
})

test('Disclosure group changes together; nested themes and system interruption', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference', forcedColors: 'active' })
  await page.goto('/disclosure')
  const group = page.locator('main .react-aria-DisclosureGroup').first()
  const triggers = group.locator('.mezzanine-disclosure-trigger')
  const panels = group.locator('.react-aria-DisclosurePanel')
  await page.evaluate(() => { document.documentElement.dataset.theme = 'wireframe' })
  for (const theme of ['light', 'dark']) {
    await group.evaluate((element, theme) => {
      element.dataset.theme = theme
      element.style.setProperty('--motion-duration-interface', '2s')
    }, theme)
    await triggers.nth(1).click()
    await expect(panels.nth(0)).toHaveAttribute('aria-hidden', 'true')
    await expect(panels.nth(1)).toHaveAttribute('aria-hidden', 'false')
    await expect(panels.nth(0)).toHaveCSS('animation-name', 'mezzanine-disclosure-conceal')
    await expect(panels.nth(1)).toHaveCSS('animation-name', 'mezzanine-disclosure-reveal')
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect(panels.nth(0)).toHaveAttribute('hidden', 'until-found')
    await expect(panels.nth(1)).not.toHaveAttribute('hidden')
    await expect(panels.nth(1)).toHaveCSS('animation-name', 'none')
    await triggers.nth(0).click()
    await page.emulateMedia({ reducedMotion: 'no-preference' })
  }
})

for (const fontSize of [16, 32]) {
  test(`Disclosure animated content reflows at 320px and ${fontSize}px text`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('/disclosure')
    const trigger = page.locator('main .mezzanine-disclosure-trigger').first()
    const panel = page.locator('main .react-aria-DisclosurePanel').first()
    await expect.poll(() => panel.evaluate(element => element.getAnimations().length)).toBe(0)
    await page.evaluate(size => { document.documentElement.style.fontSize = `${size}px` }, fontSize)
    await panel.evaluate(element => {
      const paragraph = document.createElement('p')
      paragraph.textContent = 'Wrapped disclosure content with enough words to exercise a measured, responsive panel height. '.repeat(8)
      element.append(paragraph)
    })
    // Changing root text size also changes rem-based bottom space. Let that size
    // change settle before recording the reference height.
    await expect.poll(() => panel.evaluate(element => element.getAnimations().length)).toBe(0)
    const fullHeight = (await panel.boundingBox())!.height
    await trigger.click()
    await expect(panel).toHaveAttribute('hidden', 'until-found')
    await panel.evaluate(element => { element.style.setProperty('--motion-duration-interface', '2s') })
    await trigger.click()
    const opening = await panel.evaluate(element => {
      for (const animation of element.getAnimations()) { animation.pause(); animation.currentTime = 1000 }
      return { height: element.getBoundingClientRect().height, opacity: Number(getComputedStyle(element).opacity) }
    })
    expect(opening.height).toBeGreaterThan(0)
    expect(opening.height).toBeLessThan(fullHeight)
    expect(opening.opacity).toBeGreaterThan(0)
    expect(opening.opacity).toBeLessThan(1)
    const endHeight = await panel.evaluate(element => {
      for (const animation of element.getAnimations()) animation.currentTime = 1999
      return element.getBoundingClientRect().height
    })
    expect(Math.abs(endHeight - fullHeight)).toBeLessThan(1)
    await panel.evaluate(element => { for (const animation of element.getAnimations()) animation.finish() })
    await expect.poll(() => panel.evaluate(element => element.style.getPropertyValue('--disclosure-panel-height'))).toBe('auto')
    expect((await panel.boundingBox())!.height).toBeCloseTo(fullHeight, 0)
    await expect(panel).toHaveCSS('overflow', 'visible')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await trigger.click()
    await trigger.click()
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect.poll(() => panel.evaluate(element => element.style.getPropertyValue('--disclosure-panel-height'))).toBe('auto')
    await expect(panel).not.toHaveAttribute('hidden')
    await panel.evaluate(element => { element.append(element.lastElementChild!.cloneNode(true)) })
    expect((await panel.boundingBox())!.height).toBeGreaterThan(fullHeight)
    await expect(panel).toHaveCSS('overflow', 'visible')
  })
}

test('rapid Nav Tree toggles retain the last requested expansion', async ({ page }) => {
  await page.goto('/navigation-tree')
  const tree = page.getByRole('treegrid', { name: 'Nav Tree items', exact: true })
  const trigger = tree.getByRole('button', { name: 'Item B', exact: true })
  await tree.evaluate(element => { element.style.setProperty('--motion-duration-interface', '800ms') })
  await trigger.click()
  await expect(tree.getByRole('row', { name: 'Child item B1', exact: true })).toHaveCount(0)
  await trigger.click()
  await expect(tree.getByRole('row', { name: 'Child item B1', exact: true })).toBeVisible()
  await trigger.click()
  await expect(tree.getByRole('row', { name: 'Child item B1', exact: true })).toHaveCount(0)
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
})
