import { test } from 'node:test'
import assert from 'node:assert/strict'
import { checkRoutes, checkTokens, checkTokenValues, declaredTokens, documentedTokenValues, labPaths, parsePropRows, propMentions, templateTokenPatterns } from './docs-rules.mjs'

test('routes: misplaced page files, stray page files and bad Lighthouse URLs are reported', () => {
  const pages = [{ id: 'button', file: 'site/pages/components/button/ButtonPage.tsx' }, { id: 'link', file: 'site/pages/components/link/LinkPage.tsx' }]
  const pageFiles = ['site/pages/components/button/ButtonPage.tsx', 'site/pages/link/LinkPage.tsx', 'site/pages/not-found/NotFoundPage.tsx']
  const messages = checkRoutes({ routes: ['/', '/button'], pages, pageFiles, otherPageFiles: ['site/pages/not-found/NotFoundPage.tsx'], lighthouseUrls: [{ file: 'lh.json', url: 'http://localhost/gone' }] }).map(p => p.message)
  assert.ok(messages.some(m => m.includes('"link"') && m.includes('components/link/LinkPage.tsx')))
  assert.ok(messages.some(m => m.startsWith('site/pages/link/LinkPage.tsx')))
  assert.ok(messages.some(m => m.includes('Lighthouse URL /gone')))
  assert.equal(messages.length, 3)
})

test('routes: Lab pages come from Lab hrefs and Layout slugs', () => {
  const extraPaths = labPaths({
    labContent: "index: { href: '/site/lab' }, layoutPage: { href: '/site/lab/layout' }",
    pageContent: "{ slug: 'grid' } { slug: 'new-lab-page' } { key: 'stack', href: '/site/lab/layout/grid/stack' }",
  })
  assert.deepEqual(extraPaths, ['/site/lab', '/site/lab/layout', '/site/lab/layout/grid/stack', '/site/lab/layout/grid', '/site/lab/layout/new-lab-page'])
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

test('props in copy: attributes alone and on elements are found, bare words are not', () => {
  const mentions = propMentions("Set `hierarchy=\"secondary\"`, `layout={ListLayout}` or `<Button hierarchy='tertiary' isDisabled>`. `ButtonProps` and `gap` are not props.")
  assert.deepEqual(mentions.map(({ component, prop, value }) => [component, prop, value]), [
    [undefined, 'hierarchy', 'secondary'],
    [undefined, 'layout', undefined],
    ['Button', 'hierarchy', 'tertiary'],
    ['Button', 'isDisabled', undefined],
  ])
})

test('props in copy: a fenced code example does not hide the mentions after it', () => {
  const mentions = propMentions('Before `isOpen={true}`.\n```tsx\n<Panel id="a">x</Panel>\n```\nAfter `isCollapsible={false}`.')
  assert.deepEqual(mentions.map(item => item.prop), ['isOpen', 'isCollapsible'])
})

test('token values: copied values and pixel equivalents are checked against the token files', () => {
  const rows = documentedTokenValues([
    '| Token | Level |',
    '| --- | --- |',
    '| `--elevation-raised-1` | 1 |',
    '',
    '| Token | Stored value | Reference value |',
    '| --- | --- | --- |',
    '| `--space-1` | `0.25rem` | 4px |',
    '| `--space-2` | `0.5rem` | 9px |',
    '| `--target-size-xs` | 2rem (32px) | Buttons |',
    '| `--width-md` | `20rem` | Panel width |',
    '| `--gone` | `1rem` |',
    '| `--space-gap-control` | `--space-2` |',
    '| `--focus-ring-offset-inset` | minus the width |',
  ].join('\n'))
  assert.deepEqual(rows.map(row => [row.token, row.value, row.px]), [
    ['--space-1', '0.25rem', 4], ['--space-2', '0.5rem', 9], ['--target-size-xs', '2rem', 32], ['--width-md', '20rem', undefined], ['--gone', '1rem', undefined], ['--space-gap-control', '--space-2', undefined],
  ])
  const declared = new Map([['--space-1', new Set(['0.25rem'])], ['--space-2', new Set(['0.5rem'])], ['--target-size-xs', new Set(['2rem'])], ['--width-md', new Set(['24rem'])], ['--space-gap-control', new Set(['var(--space-2)'])]])
  const messages = checkTokenValues(rows, declared).map(problem => problem.message)
  assert.ok(messages.some(m => m.includes('--space-2 as 9px')))
  assert.ok(messages.some(m => m.includes('--width-md is 20rem')))
  assert.ok(messages.some(m => m.includes('--gone')))
  assert.equal(messages.length, 3)
})

