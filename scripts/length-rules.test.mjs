import assert from 'node:assert/strict'
import test from 'node:test'
import { checkRawLengths } from './length-rules.mjs'

test('structural lengths and tokens are allowed', () => {
  const css = '.x { width: 100%; translate: 0 -50%; block-size: 100dvh; padding: var(--space-2); margin: 0; }'
  assert.deepEqual(checkRawLengths('src/components/X/X.css', css), [])
})

test('query conditions and comments may hold literals', () => {
  const css = '@container x (min-width: 48rem) { .x { display: grid; } } /* 12px */'
  assert.deepEqual(checkRawLengths('src/components/X/X.css', css), [])
})

test('raw lengths in declarations fail', () => {
  assert.equal(checkRawLengths('src/components/X/X.css', '.x { padding: 12px; }').length, 1)
  assert.equal(checkRawLengths('src/components/X/X.css', '.x { gap: calc(var(--space-2) + 0.25rem); }').length, 1)
  assert.equal(checkRawLengths('src/components/X/X.css', '.x { width: 75%; }').length, 1)
})

test('listed exceptions pass only in their own file', () => {
  const css = '.x { padding: min(var(--space-4), 4cqi); }'
  assert.deepEqual(checkRawLengths('src/components/TopBar/TopBar.css', css), [])
  assert.equal(checkRawLengths('src/components/X/X.css', css).length, 1)
})
