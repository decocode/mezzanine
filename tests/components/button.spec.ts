import { expect, test, type Page } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, themes } from '../display'

// Opens the Button Example's icon settings and chooses an option in one of its Selects.
async function choose(page: Page, label: string, option: string) {
  await page.locator('main .mz-demo-area-end-panel').first().getByRole('button', { name: new RegExp(label) }).click()
  await page.getByRole('option', { name: option, exact: true }).click()
}

// Checks that the Example's icon settings make an icon button named by its label: in a tooltip, it
// shows only the icon and the label appears on focus and hides with Escape; at the bottom, the label
// shows under the icon.
test('Button Example names icon buttons by their label', async ({ page }) => {
  await page.goto('/button')
  const demo = page.locator('main .mz-demo-area').first()
  await demo.locator('.mz-demo-area-end-panel label', { hasText: /^icon$/ }).click()
  await choose(page, 'iconPosition', 'iconOnly')
  const button = demo.locator('.mz-demo-area-content').getByRole('button', { name: 'Press', exact: true })
  await expect(button).toHaveAttribute('data-icon-only', 'true')
  await expect(demo.locator('.mz-demo-area-content').getByText('Press', { exact: true })).toHaveCount(0)
  await button.focus()
  await expect(page.getByRole('tooltip')).toHaveText('Press')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('tooltip')).toHaveCount(0)
  await choose(page, 'labelPosition', 'bottom')
  await expect(button).toHaveAttribute('data-label-position', 'bottom')
  await expect(demo.locator('.mz-demo-area-content').getByText('Press', { exact: true })).toBeVisible()
})

// Checks that a Button with an href behaves like a link (Enter follows it, Space does not), that an
// ordinary Button responds to both Enter and Space, and that a pending button is announced as loading.
test('Button href preserves navigation and action behaviour', async ({ page }) => {
  await page.goto('/')
  const readDocs = page.getByRole('link', { name: 'Read docs', exact: true })
  await readDocs.focus()
  await page.keyboard.press('Space')
  await expect(page).toHaveURL(/\/$/)
  await page.goto('/button')
  const action = page.getByRole('button', { name: 'Press', exact: true })
  await action.focus()
  await page.keyboard.press('Space')
  await expect(page.getByRole('status')).toHaveText('Press count: 1')
  await page.keyboard.press('Enter')
  await expect(page.getByRole('status')).toHaveText('Press count: 2')
  await page.locator('main .mz-demo-area-end-panel').first().locator('label', { hasText: 'isPending' }).click()
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
  await page.locator('main .mz-demo-area-end-panel').first().locator('label', { hasText: 'isPending' }).click()
  const ring = page.locator('.mz-button-progress-indicator').first()
  await page.evaluate(() => { document.documentElement.dataset.theme = 'wireframe' })
  await expect(ring).toBeVisible()
  await expect(ring).toHaveCSS('animation-name', 'mz-button-progress-spin')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(ring).toHaveCSS('animation-name', 'none')
  await expect(ring).toBeVisible()
  await expect(ring).toHaveCSS('animation-duration', '1s')
})
