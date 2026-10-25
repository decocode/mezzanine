import ts from 'typescript'

const obsolete = /\b(?:useAnimatedNavigationTree|animated-navigation-tree|sidebar-navigation-tree-group|mezzanine-navigation-tree-(?:item-(?:animated|opening|closing|has-link)|group-toggle))\b/g

export function checkNavTreeSource(file, source) {
  const problems = []
  for (const match of source.matchAll(obsolete)) problems.push({ position: match.index, message: `Removed tree recipe ${match[0]}; use NavTree data or the low-level React Aria parts.` })
  if (!file.startsWith('site/')) return problems
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const patterns = new Set()
  const namespaces = new Set()
  for (const node of ast.statements) {
    if (!ts.isImportDeclaration(node) || node.moduleSpecifier.text !== '@decocode/mezzanine') continue
    const bindings = node.importClause?.namedBindings
    if (bindings && ts.isNamespaceImport(bindings)) namespaces.add(bindings.name.text)
    if (bindings && ts.isNamedImports(bindings)) for (const item of bindings.elements) {
      if ((item.propertyName ?? item.name).text === 'NavTree') patterns.add(item.name.text)
    }
  }
  function visit(node) {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName.getText(ast)
      if (patterns.has(tag) || [...namespaces].some(name => tag === `${name}.NavTree`)) {
        for (const prop of node.attributes.properties) {
          if (ts.isJsxAttribute(prop) && ['children', 'slot'].includes(prop.name.text)) problems.push({ position: prop.pos, message: 'NavTree owns its controls and slots; supply items instead.' })
        }
        if (ts.isJsxOpeningElement(node) && node.parent.children.some(child => !ts.isJsxText(child) || child.text.trim())) problems.push({ position: node.pos, message: 'NavTree owns row composition; supply items instead of JSX children.' })
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(ast)
  for (const match of source.matchAll(/\bmz-nav-tree(?:-(?:item|label|toggle|chevron|content|section|header))?\b/g)) problems.push({ position: match.index, message: 'The library supplies NavTree recipe classes; consumers use their own className for layout.' })
  return problems
}

export function checkNavTreeCss(file, source) {
  const problems = []
  const css = source.replace(/\/\*[\s\S]*?\*\//g, comment => ' '.repeat(comment.length))
  for (const match of css.matchAll(obsolete)) problems.push({ position: match.index, message: `Removed tree recipe class ${match[0]}.` })
  for (const block of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selector = block[1]
    if (file.startsWith('site/') && /\.(?:mz-nav-tree-(?:item|label|toggle|chevron|content|section|header)|mz-navigation-tree-(?:item|section|header))\b/.test(selector)) problems.push({ position: block.index, message: 'NavTree internal appearance and spacing belong in the library.' })
    if (!/Nav(?:igation)?Tree\.css$/.test(file)) continue
    if (/\.(?:mz-(?:button|link)|mz-button-[\w-]+)\b|\bsvg\b/.test(selector)) problems.push({ position: block.index, message: 'Style owned tree parts directly, not generic Button/Link internals or every SVG.' })
    if (/!important\b/.test(block[2])) problems.push({ position: block.index, message: 'Do not force tree appearance over another component.' })
  }
  return problems
}
