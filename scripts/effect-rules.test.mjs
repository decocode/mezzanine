import { test } from 'node:test'
import assert from 'node:assert/strict'
import { checkAllowedEffectFiles, checkEffectSource } from './effect-rules.mjs'

const allowed = [{ file: 'src/Allowed.ts', hook: 'useEffect', reason: 'Fixture.' }]

test('code without effects passes', () => {
  assert.deepEqual(checkEffectSource('src/Plain.tsx', `import { useState, useSyncExternalStore, useEffectEvent } from 'react'; useState(0)`, allowed), [])
})
test('every way of calling an effect hook is caught', () => {
  for (const source of [
    `import { useEffect } from 'react'; useEffect(() => {})`,
    `import { useLayoutEffect as useMeasure } from 'react'; useMeasure(() => {})`,
    `import { useInsertionEffect } from 'react'; useInsertionEffect(() => {})`,
    `import * as React from 'react'; React.useEffect(() => {})`,
    `import React from 'react'; React.useLayoutEffect(() => {})`,
  ]) assert.equal(checkEffectSource('site/Page.tsx', source, allowed).length, 1, source)
})
test('an allow-list entry permits exactly one call of its hook', () => {
  assert.deepEqual(checkEffectSource('src/Allowed.ts', `import { useEffect } from 'react'; useEffect(() => {})`, allowed), [])
  assert.equal(checkEffectSource('src/Allowed.ts', `import { useEffect } from 'react'; useEffect(() => {}); useEffect(() => {})`, allowed).length, 1)
  assert.equal(checkEffectSource('src/Allowed.ts', `import { useLayoutEffect } from 'react'; useLayoutEffect(() => {})`, allowed).length, 2)
})
test('unused and missing allow-list entries are reported', () => {
  assert.equal(checkEffectSource('src/Allowed.ts', `export const value = 1`, allowed).length, 1)
  assert.deepEqual(checkAllowedEffectFiles(['src/Allowed.ts'], allowed), [])
  assert.equal(checkAllowedEffectFiles(['src/Other.ts'], allowed).length, 1)
})
test('hooks with the same name from other modules are not React effects', () => {
  assert.deepEqual(checkEffectSource('site/Page.tsx', `import { useEffect } from './local'; useEffect()`, allowed), [])
})
