import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, themes } from '../display'

// Checks the Button page shows all six label and icon placements (text only, icon before, icon
// after, and an icon button with its label in a tooltip, below or above), that each icon button is
// named by its label, and that the tooltip label shows when focused and hides again with Escape.
test('Button documents six label and icon placements and names icon buttons by their label', async ({ page }) => {
  await page.goto('/button')
  const examples = page.getByRole('grid', { name: 'Button content', exact: true })
  await expect(examples.getByRole('row')).toHaveCount(7)
  for (const label of ['Text-only', 'Text + icon leading', 'Text + icon trailing', 'Icon, label in a tooltip', 'Icon, label below', 'Icon, label above']) {
    await expect(examples.getByText(label, { exact: true })).toBeVisible()
  }
  // Three icon buttons, each named by its label; the tooltip one shows no visible text.
  await expect(examples.getByRole('button', { name: 'Download', exact: true })).toHaveCount(3)
  await expect(examples.getByText('Download', { exact: true })).toHaveCount(2)
  const iconOnly = examples.getByRole('row', { name: /label in a tooltip/ }).getByRole('button', { name: 'Download', exact: true })
  await iconOnly.scrollIntoViewIfNeeded()
  await iconOnly.focus()
  await expect(page.getByRole('tooltip')).toHaveText('Download')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('tooltip')).toHaveCount(0)
  // Escape also returns focus to React Aria Table's row navigation.
  await expect.poll(() => examples.evaluate(element => element.contains(document.activeElement))).toBe(true)
})

// Checks that a Button with a destination behaves like a link (Enter follows it, Space does not),
// that an ordinary Button responds to both Enter and Space, and that a loading button is announced
// as loading.
test('Button href preserves navigation and action behaviour', async ({ page }) => {
  await page.goto('/button')
  const navigation = page.getByRole('link', { name: 'Read accessibility details', exact: true })
  await expect(navigation).toHaveAttribute('href', '#button-accessibility')
  await expect(page.getByText('Want to know how a navigational button works with a keyboard or screen reader?', { exact: true })).toBeVisible()
  await expect(navigation.locator('.mezzanine-button-icon')).toHaveCount(0)
  await navigation.focus()
  await page.keyboard.press('Space')
  await expect(page).toHaveURL(/\/button$/)
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#button-accessibility$/)
  await expect(page.locator('#button-accessibility')).toBeVisible()
  const action = page.getByRole('button', { name: 'Press', exact: true })
  await action.focus()
  await page.keyboard.press('Space')
  await expect(page.getByRole('status')).toHaveText('Press count: 1')
  await page.keyboard.press('Enter')
  await expect(page.getByRole('status')).toHaveText('Press count: 2')
  await expect(page.locator('button[data-pending]').first().getByRole('progressbar')).toHaveAttribute('aria-label', 'Loading')
})

// Checks, in each theme, that the home page's Read docs link looks exactly like the standard
// Primary Medium Button in every state, fits a phone screen with large text, passes an automated
// accessibility scan and opens the Introduction page.
for (const theme of themes) {
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
    await setTextSize(page, 32)
    await expectNoPageOverflow(page)
    await expectNoAccessibilityViolations(page, '.landing-hero')
    await readDocs.focus()
    await expect(readDocs).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/introduction$/)
  })
}

// Checks that a loading button's ring stops spinning but stays visible when the device asks for
// reduced motion.
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
