import { expect, test, type Locator } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize, setTheme, themes } from '../display'

// React Aria hides a checkbox's input, so a press on its visible label toggles it.
function toggleControl(example: Locator, name: string) {
  return example.locator('label').filter({ hasText: new RegExp(`^${name}$`) }).click()
}

const purposes = ['neutral', 'info', 'success', 'warning', 'danger', 'accent', 'signature']

// Draws each colour on a canvas, the wash over the page colour, and returns the contrast ratio
// between a note's title (or content) and the wash it sits on.
async function contrastOf(note: Locator, part: string) {
  return note.evaluate((element, part) => {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 1
    const context = canvas.getContext('2d', { willReadFrequently: true })!
    const probe = document.createElement('span')
    element.append(probe)
    const read = (...colors: string[]) => {
      context.clearRect(0, 0, 1, 1)
      for (const color of colors) {
        probe.style.color = color
        context.fillStyle = getComputedStyle(probe).color
        context.fillRect(0, 0, 1, 1)
      }
      return Array.from(context.getImageData(0, 0, 1, 1).data.slice(0, 3))
    }
    const background = read('var(--color-page)', 'var(--_notice-background)')
    const foreground = read(getComputedStyle(element.querySelector(part)!).color)
    probe.remove()
    const luminance = (rgb: number[]) => {
      const [r, g, b] = rgb.map(value => value / 255).map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
      return 0.2126 * r + 0.7152 * g + 0.0722 * b
    }
    const [light, dark] = [luminance(foreground), luminance(background)].sort((a, b) => b - a)
    return (light + 0.05) / (dark + 0.05)
  }, part)
}

// Checks, in each theme, that the Example's Select shows every purpose as a note whose title and content
// reach 4.5:1 on its wash, and that the page fits 320px at double text size and passes a scan.
for (const theme of themes) {
  test(`${theme} Notice shows every purpose with readable text at 320px`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.goto('/notice')
    await setTheme(page, theme)
    const example = page.locator('section[aria-labelledby="notice-example"]')
    const note = example.getByRole('note')
    for (const purpose of purposes) {
      await example.getByRole('button', { name: /purpose/ }).click()
      await page.getByRole('option', { name: purpose, exact: true }).click()
      await expect(note).toHaveAttribute('data-purpose', purpose)
      expect(await contrastOf(note, '.mz-notice-title'), `${purpose} title`).toBeGreaterThanOrEqual(4.5)
      expect(await contrastOf(note, '.mz-notice-content'), `${purpose} content`).toBeGreaterThanOrEqual(4.5)
    }
    await setTextSize(page, 32)
    await expectNoPageOverflow(page)
    await expectNoAccessibilityViolations(page, 'main')
  })
}

// Checks that the example's icon is hidden from screen readers and its actions follow its content in
// the Tab order.
test('Notice icon is hidden and its actions are reached in order', async ({ page }) => {
  await page.goto('/notice')
  const example = page.locator('section[aria-labelledby="notice-example"]')
  await toggleControl(example, 'icon')
  await toggleControl(example, 'actions')
  const note = example.getByRole('note')
  await expect(note.locator('.mz-notice-icon')).toHaveAttribute('aria-hidden', 'true')
  await note.getByRole('button', { name: 'Button', exact: true }).focus()
  await page.keyboard.press('Tab')
  await expect(note.getByRole('link', { name: 'Link', exact: true })).toBeFocused()
})

// Checks that the Font weight page shows its points in a signature notice.
test('Font weight page has a signature notice', async ({ page }) => {
  await page.goto('/typography/font-weight')
  const note = page.getByRole('note')
  await expect(note).toHaveAttribute('data-purpose', 'signature')
  await expect(note.getByRole('listitem')).toHaveCount(2)
  await expectNoAccessibilityViolations(page, 'main')
})

// Checks that the Example starts on accent, and its purpose Select lists two groups, brand first, and
// changes the note's purpose and its Code tab.
test('Notice example follows the purpose Select', async ({ page }) => {
  await page.goto('/notice')
  const example = page.locator('section[aria-labelledby="notice-example"]')
  await expect(example.getByRole('note')).toHaveAttribute('data-purpose', 'accent')
  await example.getByRole('button', { name: /purpose/ }).click()
  await expect(page.getByRole('listbox').getByRole('group')).toHaveCount(2)
  await expect(page.getByRole('listbox').locator('.mz-header')).toHaveText(['Brand', 'Semantic'])
  await expect(page.getByRole('listbox').locator('> .mz-separator')).toHaveCount(1)
  await page.getByRole('option', { name: 'signature', exact: true }).click()
  await expect(example.getByRole('note')).toHaveAttribute('data-purpose', 'signature')
  await example.getByRole('tab', { name: 'Code' }).click()
  await expect(example.locator('.mz-code-block')).toContainText('purpose="signature"')
})

// Checks the Example's starting state (title and content, no icon or actions), and that each of the
// other Properties controls changes the note and its Code tab: an unticked part is left out.
test('Notice example follows its title, content, icon and actions controls', async ({ page }) => {
  await page.goto('/notice')
  const example = page.locator('section[aria-labelledby="notice-example"]')
  const note = example.getByRole('note')
  const code = example.locator('.mz-code-block')
  const showCode = () => example.getByRole('tab', { name: 'Code' }).click()
  const showPreview = () => example.getByRole('tab', { name: 'Demo' }).click()

  await expect(example.getByRole('checkbox')).toHaveCount(4)
  await expect(example.locator('.mz-checkbox, label').filter({ hasText: /^(title|content|icon|actions)$/ })).toHaveText(['title', 'content', 'icon', 'actions'])
  await expect(note.locator('.mz-notice-title')).toHaveText('Notice title')
  await expect(note.locator('.mz-notice-content')).toHaveText('This is the main content of the notice component. By changing the purpose property of a Notice, you can change its color to communicate semantic or brand meaning.')
  await expect(note.locator('.mz-notice-icon')).toHaveCount(0)
  await expect(note.locator('.mz-notice-actions')).toHaveCount(0)
  await showCode()
  await expect(code).toContainText('purpose="accent"')
  await expect(code).toContainText('title="Notice title"')
  await expect(code).toContainText('This is the main content of the notice component. By changing the purpose property of a Notice, you can change its color to communicate semantic or brand meaning.')
  await expect(code).not.toContainText('icon=')
  await expect(code).not.toContainText('actions=')

  await showPreview()
  await toggleControl(example, 'title')
  await toggleControl(example, 'content')
  await toggleControl(example, 'icon')
  await toggleControl(example, 'actions')
  await expect(note.locator('.mz-notice-title')).toHaveCount(0)
  await expect(note.locator('.mz-notice-content')).toHaveCount(0)
  await expect(note.locator('.mz-notice-icon')).toHaveCount(1)
  await expect(note.getByRole('link', { name: 'Link', exact: true })).toBeVisible()
  await showCode()
  await expect(code).not.toContainText('title=')
  await expect(code).not.toContainText('This is the main content of the notice component. By changing the purpose property of a Notice, you can change its color to communicate semantic or brand meaning.')
  await expect(code).toContainText('icon={<PlaceholderIcon />}')
  await expect(code).toContainText('actions={<>')
  await expect(code).toContainText('/>')
})

// Checks every combination of the Example's title, icon, actions and content, in each theme, at a wide
// screen and at 320px with double text size. The icon sits beside the title, or beside the content when
// there's no title; at 320px either may wrap under the icon instead. Everything after that starts at the
// icon's start edge, and nothing overflows.
const layouts = [
  { name: 'wide', width: 1280, textSize: 16, mustSitBeside: true },
  { name: '320px', width: 320, textSize: 32, mustSitBeside: false },
]
for (const theme of themes) {
  for (const layout of layouts) {
    test(`${theme} Notice lays out every combination of its parts, ${layout.name}`, async ({ page }) => {
      await page.setViewportSize({ width: layout.width, height: 900 })
      await page.goto('/notice')
      await setTheme(page, theme)
      await setTextSize(page, layout.textSize)
      const example = page.locator('section[aria-labelledby="notice-example"]')
      const note = example.getByRole('note')
      const parts = ['title', 'icon', 'actions', 'content'] as const
      const isOn: Record<(typeof parts)[number], boolean> = { title: true, icon: false, actions: false, content: true }
      for (let combination = 0; combination < 16; combination++) {
        for (const [index, part] of parts.entries()) {
          const wanted = Boolean(combination & (1 << index))
          if (isOn[part] !== wanted) {
            await toggleControl(example, part)
            isOn[part] = wanted
          }
        }
        const box = async (selector: string) => (await note.locator(selector).boundingBox())!
        if (isOn.icon) {
          const icon = await box('.mz-notice-icon')
          const next = isOn.title ? '.mz-notice-title' : isOn.content ? '.mz-notice-content' : null
          if (next) {
            const nextBox = await box(next)
            const isBeside = nextBox.y < icon.y + icon.height
            if (layout.mustSitBeside) expect(isBeside, `${combination}: ${next} beside the icon`).toBe(true)
            if (isBeside) expect(nextBox.x, `${combination}: ${next} after the icon`).toBeGreaterThan(icon.x + icon.width)
            else expect(Math.abs(nextBox.x - icon.x), `${combination}: ${next} under the icon`).toBeLessThan(1)
          }
          for (const after of [...(isOn.title && isOn.content ? ['.mz-notice-content'] : []), ...(isOn.actions && next ? ['.mz-notice-actions'] : [])]) {
            expect(Math.abs((await box(after)).x - icon.x), `${combination}: ${after} starts under the icon`).toBeLessThan(1)
          }
        }
        await expectNoPageOverflow(page)
      }
    })
  }
}
