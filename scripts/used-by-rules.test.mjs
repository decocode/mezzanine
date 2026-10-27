import assert from 'node:assert/strict'
import test from 'node:test'
import { tokenReferences, tokensUsedBy, withUsedBy } from './used-by-rules.mjs'

// A component uses a token it reads directly, or through another token's value.
test('a token is used directly or through another token', () => {
  const references = tokenReferences([':root { --width-md: 20rem; --panel-start-width: var(--width-md); }'])
  const usedBy = tokensUsedBy(new Map([
    ['Panel', '.mz-panel { inline-size: var(--panel-start-width); }'],
    ['Tooltip', '.mz-tooltip { max-inline-size: var(--tooltip-max-width, var(--width-md)); }'],
  ]), references)
  assert.deepEqual(usedBy.get('--width-md'), ['Panel', 'Tooltip'])
})

// Only tables with a Used by column change, and an unused token says so.
test('Used by cells are rewritten, other tables are left alone', () => {
  const markdown = [
    '| Token | Value | Used by |', '| --- | --- | --- |', '| `--width-md` | `20rem` | Old text |', '| `--width-lg` | `30rem` | Old text |', '',
    '| Token | Meaning |', '| --- | --- |', '| `--width-md` | Untouched |',
  ].join('\n')
  const result = withUsedBy(markdown, new Map([['--width-md', ['Panel', 'Tooltip']]]))
  assert.match(result, /\| `--width-md` \| `20rem` \| Panel, Tooltip \|/)
  assert.match(result, /\| `--width-lg` \| `30rem` \| Not used by components \|/)
  assert.match(result, /\| `--width-md` \| Untouched \|/)
})
