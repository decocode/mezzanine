import assert from 'node:assert/strict'
import test from 'node:test'
import { checkColorPointers, checkThemeColors, checkThemesMatch, themeRoles } from './color-rules.mjs'

test('themes set colour roles and the listed exceptions only', () => {
  assert.deepEqual(checkThemeColors(':root { --color-accent-emphasis: var(--color-accent-700); --radius-control: 0; --table-header-background: red; }'), [])
  assert.equal(checkThemeColors(':root { --checkbox-border: var(--color-border-control); }').length, 1)
  assert.equal(checkThemeColors(':root { --color-accent-700: #000; }').length, 1)
  assert.deepEqual(checkThemeColors(':root { /* --button-primary-background: red; */ }'), [])
})

test('every theme sets the same roles', () => {
  const light = { file: 'light.css', roles: themeRoles(':root { --color-text: a; --color-page: b; }') }
  assert.deepEqual(checkThemesMatch([light, { file: 'dark.css', roles: ['--color-page', '--color-text'] }]), [])
  assert.equal(checkThemesMatch([light, { file: 'dark.css', roles: ['--color-page'] }]).length, 1)
  assert.equal(checkThemesMatch([light, { file: 'dark.css', roles: ['--color-page', '--color-text', '--color-extra'] }]).length, 1)
})

test('component colours point at existing roles, never palette steps', () => {
  const roles = new Set(['--color-accent-emphasis', '--color-text'])
  assert.deepEqual(checkColorPointers(':root { --checkbox-background-selected: var(--color-accent-emphasis); }', roles), [])
  assert.equal(checkColorPointers(':root { --badge-background: var(--color-info-100); }', roles).length, 1)
  assert.equal(checkColorPointers('.x { color: var(--color-surface-hover); }', roles).length, 1)
  assert.deepEqual(checkColorPointers('/* var(--color-info-100) */ .x { color: var(--color-text); }', roles), [])
})
