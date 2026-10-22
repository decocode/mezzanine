import assert from 'node:assert/strict'
import { test } from 'node:test'
import { checkComponentPointers, componentPointers } from './pointer-rules.mjs'

const declared = new Set(['--color-accent-emphasis', '--space-2', '--button-padding'])

test('a named pointer with a declared fallback is accepted', () => {
  assert.deepEqual(checkComponentPointers('Button', '.b { background: var(--button-primary-background-hovered, var(--color-accent-emphasis)); }', declared), [])
})
test('a pointer may fall back to a structural value', () => {
  assert.deepEqual(checkComponentPointers('Button', '.b { background: var(--button-secondary-background, transparent); }', declared), [])
})
test('a pointer needs a fallback', () => {
  assert.ok(checkComponentPointers('Button', '.b { background: var(--button-primary-background); }', declared).length)
})
test('a pointer must start with its component', () => {
  assert.ok(checkComponentPointers('Button', '.b { background: var(--card-background, var(--color-accent-emphasis)); }', declared).length)
})
test('a pointer must end with a property and states', () => {
  assert.ok(checkComponentPointers('Button', '.b { background: var(--button-primary-stuff, var(--color-accent-emphasis)); }', declared).length)
})
test('a pointer must fall back to a token that exists', () => {
  assert.ok(checkComponentPointers('Button', '.b { padding: var(--button-md-padding-block, var(--space-99)); }', declared).length)
})
test('private, declared and run-time properties are not pointers', () => {
  assert.deepEqual(checkComponentPointers('NavTree', '.a { padding: var(--_x); gap: var(--space-2); inline-size: var(--tree-item-level); }', declared), [])
})
test('pointers are listed once, sorted, with their fallbacks', () => {
  const css = '.b { padding: var(--button-md-padding-block, var(--space-2)); } .c { padding: var(--button-md-padding-block, var(--space-2)); background: var(--button-primary-background, var(--color-accent-emphasis)); }'
  assert.deepEqual(componentPointers(css, declared), [
    { name: '--button-md-padding-block', fallback: 'var(--space-2)' },
    { name: '--button-primary-background', fallback: 'var(--color-accent-emphasis)' },
  ])
})
