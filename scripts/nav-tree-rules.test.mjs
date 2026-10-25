import { test } from 'node:test'
import assert from 'node:assert/strict'
import { checkNavTreeCss, checkNavTreeSource } from './nav-tree-rules.mjs'

test('data-only NavTree and low-level composition remain supported', () => {
  assert.deepEqual(checkNavTreeSource('site/Page.tsx', `import {NavTree as Tree} from '@decocode/mezzanine'; <Tree items={items} className="page-navigation" />`), [])
  assert.deepEqual(checkNavTreeSource('site/Page.tsx', `<NavigationTree><NavigationTreeItemContent><Button slot="chevron" /></NavigationTreeItemContent></NavigationTree>`), [])
})
test('aliased and namespace NavTree cannot acquire consumer slots or rows', () => {
  for (const source of [
    `import {NavTree as Tree} from '@decocode/mezzanine'; <Tree slot="chevron" />`,
    `import * as M from '@decocode/mezzanine'; <M.NavTree><Button /></M.NavTree>`,
  ]) assert.ok(checkNavTreeSource('site/Page.tsx', source).length)
})
test('removed hooks and recipe classes are caught', () => {
  assert.ok(checkNavTreeSource('src/Tree.ts', `useAnimatedNavigationTree([])`).length)
  assert.ok(checkNavTreeCss('site/style.css', '.mezzanine-navigation-tree-item-closing { opacity: 0; }').length)
  assert.ok(checkNavTreeSource('site/Page.tsx', '<NavTree className="mz-nav-tree" />').length)
})
test('tree internals cannot be styled by the site', () => {
  assert.ok(checkNavTreeCss('site/style.css', '.sidebar .mz-nav-tree-item { padding: 0; }').length)
  assert.ok(checkNavTreeCss('site/style.css', '.mz-navigation-tree-item { margin: 0; }').length)
  assert.deepEqual(checkNavTreeCss('site/style.css', '.page-navigation { min-width: 0; }'), [])
})
test('owned tree recipes cannot reach into shared controls or arbitrary icons', () => {
  for (const selector of ['.mz-link', '.mz-button-content', '.tree svg']) {
    assert.ok(checkNavTreeCss('src/components/NavTree/NavTree.css', `${selector} { color: inherit; }`).length)
  }
  assert.deepEqual(checkNavTreeCss('src/components/NavTree/NavTree.css', '.mz-nav-tree-chevron { rotate: var(--motion-rotation-expanded); }'), [])
})
