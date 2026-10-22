import { test, expect } from '@playwright/test'
import { build } from 'vite'
import { resolve } from 'node:path'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, textSizes, themes } from '../display'

// These tests put the Nav Tree on its own test page, without any documentation site styles, to
// check the library component by itself.
test.describe('isolated recipe', () => {
  let fixtureHtml: string

  test.beforeAll(async () => {
    const output = await build({ configFile: false, logLevel: 'silent',
      define: { 'process.env.NODE_ENV': JSON.stringify('production') },
      build: { write: false, minify: false, lib: { entry: resolve('tests/components/fixtures/NavTreeHarness.tsx'), formats: ['es'] } },
    })
    const files = (Array.isArray(output) ? output[0] : output).output
    const script = files.filter(file => file.type === 'chunk').map(file => file.code).join('\n')
    const css = files.filter(file => file.type === 'asset' && file.fileName.endsWith('.css')).map(file => file.source).join('\n')
    fixtureHtml = `<html lang="en" data-theme="light"><head><title>Nav Tree test</title><style>body { background: var(--color-page); color: var(--color-text); } ${css}</style></head><body><main><div id="root"></div></main><script type="module">${script.replaceAll('</script', '<\\/script')}</script></body></html>`
  })
  test.beforeEach(async ({ page }) => {
    await page.route('**/__nav-tree-test', route => route.fulfill({ contentType: 'text/html', body: fixtureHtml }))
    await page.goto('/__nav-tree-test')
    await expect(page.getByRole('treegrid', { name: 'Isolated navigation' })).toBeVisible()
  })

  // Checks that a section's icon sits before its label and is hidden from screen readers.
  test('a section header shows its icon before the label', async ({ page }) => {
    const header = page.locator('.mz-nav-tree-header')
    await expect(header).toHaveText('Section')
    const icon = header.locator('.mz-nav-tree-header-icon')
    await expect(icon).toHaveAttribute('aria-hidden', 'true')
    await expect(icon.locator('svg')).toBeVisible()
  })

  // Checks that branches and links get the right names and states, that empty and disabled rows are
  // marked unavailable, and that collapsing a branch moves focus to the branch instead of losing
  // it.
  test('isolated recipe names controls, preserves links and makes collapse immediate and safe', async ({ page }) => {
    const tree = page.getByRole('treegrid')
    const branch = tree.getByRole('button', { name: 'Branch A', exact: true })
    await expect(branch).toHaveAttribute('aria-expanded', 'true')
    expect(await branch.ariaSnapshot()).toContain('button "Branch A" [expanded]')
    await expect(tree.getByRole('link', { name: 'Branch B', exact: true })).toHaveAttribute('href', '#branch-b')
    await expect(tree.getByRole('button', { name: 'Expand Branch B', exact: true })).toBeVisible()
    await expect(tree.getByRole('row', { name: 'Empty', exact: true })).toHaveAttribute('aria-disabled', 'true')
    await expect(tree.getByRole('row', { name: 'Disabled', exact: true })).toHaveAttribute('aria-disabled', 'true')
    await tree.getByRole('link', { name: 'Leaf A WIP', exact: true }).focus()
    await page.evaluate(() => { (window as any).navTreeHarness.setControlled(true); (window as any).navTreeHarness.setKeys(new Set()) })
    await expect(tree.getByRole('row', { name: 'Leaf A', exact: true })).toHaveCount(0)
    await expect(tree.getByRole('row', { name: 'Branch A', exact: true })).toBeFocused()
    await expect(branch).toHaveAttribute('aria-expanded', 'false')
    await expect(tree).toHaveClass(/consumer-tree/)
    await expectNoAccessibilityViolations(page, '[role="treegrid"]')
  })

  // Checks that the tree opens the branches leading to the current page without reopening branches
  // the person closed, and copes with pages that are added or moved later.
  test('route reveal preserves manual expansion, waits for missing items and follows moved items', async ({ page }) => {
    const a = page.getByRole('button', { name: 'Branch A', exact: true })
    await a.click()
    await page.evaluate(() => (window as any).navTreeHarness.setVersion(1))
    await expect(a).toHaveAttribute('aria-expanded', 'false')
    await page.evaluate(() => (window as any).navTreeHarness.setRoute('#b'))
    await expect(page.getByRole('link', { name: 'Leaf B', exact: true })).toBeVisible()
    await expect(a).toHaveAttribute('aria-expanded', 'false')
    await page.evaluate(() => (window as any).navTreeHarness.setRoute('#a'))
    await expect(page.getByRole('link', { name: 'Leaf A WIP', exact: true })).toBeVisible()
    await page.evaluate(() => (window as any).navTreeHarness.setRoute('#late'))
    await page.evaluate(() => {
      const h = (window as any).navTreeHarness
      h.setItems([...h.initialItems, { id: 'late-parent', label: 'Late parent', children: [{ id: 'late', label: 'Late', href: '#late' }] }])
    })
    await expect(page.getByRole('link', { name: 'Late', exact: true })).toBeVisible()
    await page.evaluate(() => {
      const h = (window as any).navTreeHarness
      h.setItems([...h.initialItems, { id: 'moved-parent', label: 'Moved parent', children: [{ id: 'late', label: 'Late', href: '#late' }] }])
    })
    await expect(page.getByRole('button', { name: 'Moved parent', exact: true })).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByRole('button', { name: 'Late parent', exact: true })).toHaveCount(0)
  })

  // Checks that when the app decides which branches are open, the tree asks only once to open the
  // current page's branch and never overrides the app's answer.
  test('controlled route requests are deduplicated and never override the caller', async ({ page }) => {
    await page.evaluate(() => { const h = (window as any).navTreeHarness; h.setAccept(false); h.setControlled(true); h.setRoute('#b') })
    await expect.poll(() => page.evaluate(() => (window as any).navTreeHarness.requests.filter((keys: string[]) => keys.includes('b')).length)).toBe(1)
    await expect(page.getByRole('link', { name: 'Leaf B', exact: true })).toHaveCount(0)
    await page.evaluate(() => (window as any).navTreeHarness.setVersion(2))
    expect(await page.evaluate(() => (window as any).navTreeHarness.requests.filter((keys: string[]) => keys.includes('b')).length)).toBe(1)
    await page.evaluate(() => { const h = (window as any).navTreeHarness; h.setAccept(true); h.setKeys(new Set(['b'])) })
    await expect(page.getByRole('link', { name: 'Leaf B', exact: true })).toBeVisible()
  })

  // Checks, in each theme at normal and double text size, that the tree fits a phone screen, shows
  // a focus outline (also in high-contrast mode), has tall enough rows and passes an accessibility
  // scan.
  for (const theme of themes) for (const fontSize of textSizes) {
    test(`${theme} fits 320px with ${fontSize}px text, focus and forced colours`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 900 })
      await setTheme(page, theme)
      await setTextSize(page, fontSize)
      const branch = page.getByRole('button', { name: 'Branch A', exact: true })
      await page.keyboard.press('Tab')
      const focusedRow = page.getByRole('row', { name: 'Branch A', exact: true })
      await focusedRow.focus()
      await expect(focusedRow).toBeFocused()
      await expect(focusedRow).toHaveCSS('outline-style', 'solid')
      expect((await branch.boundingBox())!.height).toBeGreaterThanOrEqual(32)
      await expectNoPageOverflow(page)
      await expectNoAccessibilityViolations(page, '[role="treegrid"]')
      await page.emulateMedia({ forcedColors: 'active' })
      await expect(focusedRow).toHaveCSS('outline-style', 'solid')
    })
  }

  // Checks that a branch opens and closes with Enter and the arrow keys, and that Space does
  // nothing, matching how React Aria's navigation rows work.
  test('Enter and the arrow keys toggle a branch, and Space does not', async ({ page }) => {
    const branch = page.getByRole('button', { name: 'Branch A', exact: true })
    await page.getByRole('row', { name: 'Branch A', exact: true }).focus()
    await page.keyboard.press('Enter')
    await expect(branch).toHaveAttribute('aria-expanded', 'false')
    // React Aria's navigation row uses Enter/arrows; Space is not a toggle.
    await page.keyboard.press('Space')
    await expect(branch).toHaveAttribute('aria-expanded', 'false')
    await page.keyboard.press('ArrowRight')
    await expect(branch).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByRole('link', { name: 'Leaf A WIP', exact: true })).toBeVisible()
  })

  // Checks that if the focused row is removed, focus moves to the nearest remaining parent, and
  // that removing rows never pulls focus away from something outside the tree.
  test('removing focused data recovers to an enabled ancestor without stealing outside focus', async ({ page }) => {
    await page.getByRole('link', { name: 'Leaf A WIP', exact: true }).focus()
    await page.evaluate(() => {
      const h = (window as any).navTreeHarness
      h.setItems([{ id: 'a', label: 'Branch A', children: [{ id: 'nested', label: 'Nested', children: [] }] }])
    })
    await expect(page.getByRole('row', { name: 'Branch A', exact: true })).toBeFocused()
    await page.getByRole('button', { name: 'After tree', exact: true }).focus()
    await page.evaluate(() => (window as any).navTreeHarness.setItems([]))
    await expect(page.getByRole('button', { name: 'After tree', exact: true })).toBeFocused()
  })

  // Checks that very long labels wrap onto several lines without being cut off at phone width and
  // double text size.
  test('long labels reflow without clipping at 320px and 200% text', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '32px'
      const h = (window as any).navTreeHarness
      h.setItems([{ id: 'long', label: 'A long parent label that must wrap across several lines', children: [
        { id: 'leaf-a', label: 'A long nested destination that also wraps across lines', href: '#a' },
      ] }])
    })
    const row = page.getByRole('row', { name: 'A long parent label that must wrap across several lines', exact: true })
    expect((await row.boundingBox())!.height).toBeGreaterThan(88)
    expect(await row.evaluate(element => element.scrollHeight <= element.clientHeight)).toBe(true)
    await expectNoPageOverflow(page)
    await expect(page.getByRole('link', { name: 'A long nested destination that also wraps across lines', exact: true })).toBeVisible()
  })
})

// These tests use the Nav Tree example on the documentation site.
test.describe('documentation example', () => {
  // Checks, with and without reduced motion, that rows appear and disappear instantly with the
  // keyboard, and that only the arrow icon rotates, and not at all with reduced motion.
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

  // Checks that clicking a branch quickly several times always shows the rows that match its final
  // state, whatever the theme and motion speed.
  test('rapid toggles leave truthful immediate rows', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('/navigation-tree')
    const tree = page.getByRole('treegrid', { name: 'Nav Tree items', exact: true })
    const trigger = tree.getByRole('button', { name: 'Fruit', exact: true })
    const child = tree.getByRole('row', { name: 'Apples', exact: true })
    await tree.evaluate(element => { element.style.setProperty('--motion-duration-interface', '10s') })
    await trigger.click()
    await expect(child).toHaveCount(0)
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await tree.evaluate(element => { element.dataset.theme = 'wireframe' })
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

  // Checks that clicking a branch several times quickly leaves it in the state of the last click.
  test('rapid Nav Tree toggles retain the last requested expansion', async ({ page }) => {
    await page.goto('/navigation-tree')
    const tree = page.getByRole('treegrid', { name: 'Nav Tree items', exact: true })
    const trigger = tree.getByRole('button', { name: 'Fruit', exact: true })
    await tree.evaluate(element => { element.style.setProperty('--motion-duration-interface', '800ms') })
    await trigger.click()
    await expect(tree.getByRole('row', { name: 'Apples', exact: true })).toHaveCount(0)
    await trigger.click()
    await expect(tree.getByRole('row', { name: 'Apples', exact: true })).toBeVisible()
    await trigger.click()
    await expect(tree.getByRole('row', { name: 'Apples', exact: true })).toHaveCount(0)
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })
})
