import { test } from 'node:test'
import assert from 'node:assert/strict'
import { checkRoutes, checkTokens, declaredTokens, parsePropRows, templateTokenPatterns } from './docs-rules.mjs'

const nginx = `map $uri $is_app_route {
    default 0;
    ~^/?$ 1;
    ~^/typography/(text-styles|prose)/?$ 1;
    ~^/(button|link|old-page)/?$ 1;
}`
const site = `{ path: '/' } { path: '/button' } { path: '/link' } { path: '/typography/prose' } { path: '/new-page' }`

test('routes: missing nginx entries, stale entries and bad Lighthouse URLs are reported', () => {
  const messages = checkRoutes({ siteStructure: site, nginx, lighthouseUrls: [{ file: 'lh.json', url: 'http://localhost/gone' }] }).map(p => p.message)
  assert.ok(messages.some(m => m.includes('/new-page') && m.includes('404')))
  assert.ok(messages.some(m => m.includes('/old-page') && m.includes('no such page')))
  assert.ok(messages.some(m => m.includes('/typography/text-styles')))
  assert.ok(messages.some(m => m.includes('Lighthouse URL /gone')))
  assert.ok(!messages.some(m => m.includes('/button') || m.includes('/typography/prose')))
})

test('tokens: unknown mentions fail, prefixes and templates count, the baseline must stay current', () => {
  const publicTokens = declaredTokens([':root { --space-1: 1px; --space-2: 2px; --color-focus: red; --badge-gap: 1px; --gone-soon: 0; }'])
  const siteSources = [{ file: 'site/a.tsx', text: "const t = `--space-${step}`; '--color-focus'; '--space'; '--elevation-inset'" }]
  const { problems, undocumented } = checkTokens({ publicTokens, knownTokens: publicTokens, siteSources, baseline: ['--gone-soon', '--color-focus', '--removed'] })
  const messages = problems.map(p => p.message)
  assert.deepEqual(undocumented, ['--badge-gap', '--gone-soon'])
  assert.ok(messages.some(m => m.includes('--elevation-inset') && m.includes('no token file')))
  assert.ok(messages.some(m => m.includes('Token --badge-gap is not documented')))
  assert.ok(messages.some(m => m.includes('--color-focus is now documented')))
  assert.ok(messages.some(m => m.includes('--removed no longer exists')))
  assert.ok(!messages.some(m => m.includes("'--space'") || m.includes('Docs mention --space,')))
})

test('tokens: templates without enough literal text document nothing', () => {
  assert.equal(templateTokenPatterns('`${a}-${b}`').length, 0)
  assert.ok(templateTokenPatterns('`${prefix}-focus-ring-width`')[0].test('--button-focus-ring-width'))
})

test('props: grouped, prefixed and component-heading rows are parsed', () => {
  assert.deepEqual(parsePropRows(['brand', 'isOpen / defaultOpen', 'className, style'], []), [
    { component: undefined, prop: 'brand' }, { component: undefined, prop: 'isOpen' },
    { component: undefined, prop: 'defaultOpen' }, { component: undefined, prop: 'className' }, { component: undefined, prop: 'style' },
  ])
  assert.deepEqual(parsePropRows(['TooltipTrigger: delay', 'side', 'SidebarPanel', 'title'], ['TooltipTrigger', 'SidebarPanel']), [
    { component: 'TooltipTrigger', prop: 'delay' }, { component: 'TooltipTrigger', prop: 'side' }, { component: 'SidebarPanel', prop: 'title' },
  ])
  assert.deepEqual(parsePropRows(["type: 'section'"], []), [{ component: undefined, prop: 'type' }])
})
