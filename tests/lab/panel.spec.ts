import { expect, test } from '@playwright/test'
import { expectNoAccessibilityViolations } from '../accessibility'
import { expectNoPageOverflow, setTextSize } from '../display'

// The Lab's candidate Panel, in a LabPanelLayout in the candidate demo block. Illustrative and unapproved.

// Checks that a collapsible Panel with a collapse button holds a toggle in its header row, that its twin
// stays in the bar across the top of the layout, and that collapsing hands focus to the bar's toggle.
test('a collapsible Lab Panel hands focus to the bar', async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 900 })
  await page.goto('/site/lab/panel')
  const demo = page.locator('.lab-demo-block').first()
  // The example starts collapsible, with its toggle in the bar.
  const panel = demo.locator('.lab-panel-example > .lab-panel')
  const panelToggle = panel.getByRole('button', { name: 'Collapse Start panel' })
  const barToggle = demo.locator('.lab-panel-layout-bar').getByRole('button', { name: 'Start panel' })
  await expect(panelToggle).toHaveAttribute('aria-expanded', 'true')
  await expect(barToggle).toHaveAttribute('aria-expanded', 'true')

  await panelToggle.focus()
  await page.keyboard.press('Enter')
  await expect(panel).toBeHidden()
  await expect(barToggle).toBeFocused()
  await expect(barToggle).toHaveAttribute('aria-expanded', 'false')

  await page.keyboard.press('Enter')
  await expect(panel).toBeVisible()
  await expect(barToggle).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('tooltip')).toHaveCount(0)
  await expectNoAccessibilityViolations(page, 'main')
})

// Checks that LabPanelHeader and LabPanelFooter come and go from the demo panel, and that the footer sits
// at the bottom of the Panel.
test('a Lab Panel header and footer are parts', async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 900 })
  await page.goto('/site/lab/panel')
  const demo = page.locator('.lab-demo-block').first()
  const panel = demo.locator('.lab-panel-example > .lab-panel')
  const header = panel.locator('.lab-panel-header-content')
  const footer = panel.locator('.lab-panel-footer')
  await expect(header).toHaveText('Panel header')
  await expect(footer).toHaveText('Panel footer')
  await demo.locator('.lab-demo-block-controls label', { hasText: /^LabPanelHeader$/ }).click()
  await expect(header).toHaveCount(0)
  await demo.locator('.lab-demo-block-controls label', { hasText: /^LabPanelHeader$/ }).click()
  await expect(header).toBeVisible()

  // The footer sits at the bottom of the Panel, with the empty content between it and the header.
  const panelBox = (await panel.boundingBox())!
  const footerBox = (await footer.boundingBox())!
  expect(panelBox.y + panelBox.height - (footerBox.y + footerBox.height)).toBeLessThan(40)
})

// Checks that a resizable side Panel's edge moves with the arrow keys and Home.
test('a resizable Lab Panel resizes from the keyboard', async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 900 })
  await page.goto('/site/lab/panel')
  const demo = page.locator('.lab-demo-block').first()
  await demo.locator('.lab-demo-block-controls label', { hasText: /^isResizable$/ }).click()
  const handle = demo.locator('.lab-panel-example').getByRole('separator', { name: 'Resize Start panel' })
  const panel = demo.locator('.lab-panel-example > .lab-panel')
  const width = async () => (await panel.boundingBox())!.width
  const before = await width()
  await handle.focus()
  await page.keyboard.press('ArrowRight')
  await expect.poll(width).toBeGreaterThan(before)
  await page.keyboard.press('Home')
  await expect.poll(width).toBeLessThan(before)
})

// Checks that without room beside the content, a collapsible Panel starts collapsed and never stacks: its
// toggle opens it over the content, which keeps its size, and Escape closes it, returning focus to the
// toggle.
test('a Lab Panel without room opens as an overlay', async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 900 })
  await page.goto('/site/lab/panel')
  const demo = page.locator('.lab-demo-block').first()
  // Narrow the layout so the Panel no longer fits beside the content.
  await demo.locator('.lab-panel-example').evaluate((layout) => { layout.style.inlineSize = '18rem' })
  const panel = demo.locator('.lab-panel-example > .lab-panel')
  const toggle = demo.locator('.lab-panel-layout-bar').getByRole('button', { name: 'Start panel' })
  await expect(panel).toBeHidden()
  const main = demo.locator('.lab-panel-example-main')
  const mainBefore = await main.boundingBox()
  await toggle.click()
  await expect(panel).toBeVisible()
  await expect(panel).toHaveAttribute('data-overlay', 'true')
  expect(await main.boundingBox()).toEqual(mainBefore)
  await page.keyboard.press('Escape')
  await expect(panel).toBeHidden()
  await expect(toggle).toBeFocused()
})

// Checks that, at 320px and double text size, the page doesn't scroll sideways.
test('the Lab Panel page fits a phone', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 })
  await page.goto('/site/lab/panel')
  await setTextSize(page, 32)
  await expectNoPageOverflow(page)
})
