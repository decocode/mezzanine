import { test } from 'node:test'
import assert from 'node:assert/strict'
import { checkTypographyCss, checkTypographyTokens } from './typography-rules.mjs'

const file = 'src/components/Example/Example.css'
const labelLarge = `font-family: var(--font-family-body); font-size: var(--font-size-label-lg); font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-label); line-height: var(--line-height-label-lg); text-transform: var(--text-transform-label);`

test('a complete role, intent weights and font: inherit are accepted', () => {
  assert.deepEqual(checkTypographyCss(file, `.a { ${labelLarge} }`), [])
  assert.deepEqual(checkTypographyCss(file, `.a { ${labelLarge.replace('semibold', 'default')} }`), [])
  assert.deepEqual(checkTypographyCss(file, '.a[data-current] { font-weight: var(--font-weight-emphasis); }'), [])
  assert.deepEqual(checkTypographyCss(file, '.a { font: inherit; }'), [])
})
test('partial roles, mixed roles and raw sizes are caught', () => {
  assert.ok(checkTypographyCss(file, '.a { font-size: var(--font-size-label-lg); line-height: var(--line-height-label-lg); }').length)
  assert.ok(checkTypographyCss(file, `.a { ${labelLarge.replace('line-height-label-lg', 'line-height-body-sm')} }`).length)
  assert.ok(checkTypographyCss(file, '.a { font-size: 0.875rem; }').length)
  assert.ok(checkTypographyCss(file, '.a { font-family: var(--font-family-body); }').length)
  assert.ok(checkTypographyCss(file, '.a { font: 600 1rem/1.5 system-ui; }').length)
})
test('numeric weights are allowed only as the role default', () => {
  assert.ok(checkTypographyCss(file, '.a { font-weight: var(--font-weight-semibold); }').length)
  assert.ok(checkTypographyCss(file, `.a { ${labelLarge.replace('semibold', 'medium')} }`).length)
})
test('button size tokens and a role face are accepted together', () => {
  assert.deepEqual(checkTypographyCss(file, '.b { font-size: var(--button-font-size); line-height: var(--button-line-height); }'), [])
  assert.deepEqual(checkTypographyCss(file, `.b { font-family: var(--font-family-body); font-weight: var(--font-weight-semibold);
    letter-spacing: var(--letter-spacing-label); text-transform: var(--text-transform-label); }`), [])
})
test('site styles and Lab are outside this rule', () => {
  assert.deepEqual(checkTypographyCss('site/styles.css', '.a { font-size: 1rem; }'), [])
})
test('button text tokens must point to the scale', () => {
  assert.deepEqual(checkTypographyTokens('--button-sm-font-size: var(--font-size-label-md);'), [])
  assert.ok(checkTypographyTokens('--button-sm-font-size: 0.75rem;').length)
})
test('documented and displayed style choices must match', async () => {
  const { checkTypographyChoices } = await import('./typography-rules.mjs')
  const guide = '## Pattern mappings\n\n| Text | Style |\n| --- | --- |\n| Page title | `heading-lg` |\n\n## Next'
  assert.deepEqual(checkTypographyChoices(guide, `{ use: 'Page title', classNames: ['mz-text-heading-lg'] }`), [])
  assert.ok(checkTypographyChoices(guide, `{ use: 'Page title', classNames: ['mz-text-heading-md'] }`).length)
  assert.ok(checkTypographyChoices(guide, '').length)
})
