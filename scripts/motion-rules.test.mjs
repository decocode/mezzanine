import assert from 'node:assert/strict'
import test from 'node:test'
import { checkMotionCss, checkMotionSource } from './motion-rules.mjs'

const accepted = [
  '.x { animation: reveal var(--motion-duration-interface) var(--motion-easing-enter) both; animation-name: var(--_motion-animation, reveal); }',
  '.x { transition: rotate calc(var(--motion-duration-interface) * var(--_motion-enabled)) var(--motion-easing-enter); }',
  '.x { animation: spin var(--motion-duration-loading) var(--motion-easing-loading) infinite; animation-name: var(--_motion-loading-animation, spin); }',
  '@keyframes x { from { opacity: 0; transform: scale(var(--motion-scale-enter)); } to { opacity: 1; transform: scale(1); } }',
  '.x { translate: -50% -50%; } /* transition: all 180ms ease; */',
  '.x { rotate: calc(var(--motion-rotation-expanded) * 2); }',
]
const rejected = [
  '.x { animation: var(--_motion-animation, reveal) var(--motion-duration-interface) var(--motion-easing-enter) both; }',
  '.x { transition: rotate 180ms ease-out; }',
  '.x { animation: spin 0.18s linear infinite; }',
  '.x { transition: all var(--motion-duration-interface) cubic-bezier(0, 0, 1, 1); }',
  '.x { transition: opacity var(--motion-duration-interface) var(--motion-easing-enter), rotate 1s ease; }',
  '.x { transition: rotate var(--local-speed) var(--motion-easing-enter); }',
  '.x { transition: rotate var(--motion-duration-interface, 180ms) var(--motion-easing-enter); }',
  '.x { --local-speed: var(--motion-duration-interface); }',
  '.x { --modal-motion-duration: 180ms; }',
  '.x { transition-duration: var(--motion-duration-interface); }',
  '@media (prefers-reduced-motion: reduce) { .x { animation: none; } }',
  '[data-theme="wireframe"] .x { animation: none; }',
  '.x { rotate: 90deg; }',
  '@keyframes x { from { transform: translateY(4px); } to { transform: translateY(0); } }',
  '.x { animation-name: spin; }',
  '.x { scroll-behavior: smooth; }',
]
for (const css of accepted) test(`accept ${css}`, () => assert.deepEqual(checkMotionCss('src/components/Example/Example.css', css), []))
for (const css of rejected) test(`reject ${css}`, () => assert.ok(checkMotionCss('src/components/Example/Example.css', css).length))
test('policy and defaults own literals', () => {
  assert.deepEqual(checkMotionCss('src/tokens/motion.tokens.css', ':root { --motion-duration-interface: 180ms; }'), [])
  assert.deepEqual(checkMotionCss('src/motion.css', '@media (prefers-reduced-motion: reduce) { :root { --_motion-enabled: 0; } }'), [])
})
test('source timing and preference boundaries', () => {
  for (const code of ['const style = {transitionDuration: "180ms"}', 'element.animate([], {duration: 180, easing: "ease-out"})', 'window.matchMedia("(prefers-reduced-motion: reduce)")']) assert.ok(checkMotionSource('src/example.ts', code).length)
  assert.deepEqual(checkMotionSource('src/example.tsx', 'const delay = 500; const duration = seconds * 1000; const control = <TooltipTrigger delay={delay} />'), [])
  for (const code of ['window.matchMedia("(prefers-reduced-motion)")', 'const query = "prefers-reduced-motion: reduce"']) assert.ok(checkMotionSource('src/example.ts', code).length)
  assert.deepEqual(checkMotionSource('site/pages/styles/motion/motionContent.ts', 'const copy = "Mezzanine follows the device’s `prefers-reduced-motion` setting."'), [])
})
