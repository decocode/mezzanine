import ts from 'typescript'

const effectHooks = new Set(['useEffect', 'useLayoutEffect', 'useInsertionEffect'])

// Each entry allows one effect call. Adding an entry needs the owner's agreement.
export const allowedEffects = [
  { file: 'src/components/sidebarState.ts', hook: 'useLayoutEffect', reason: 'Moves focus out of panel content that an application-controlled collapse has just hidden, which is only visible after React updates the page.' },
  { file: 'src/components/navTreeLogic.ts', hook: 'useEffect', reason: 'Tells the application about a route reveal; React does not allow calling its callback while rendering.' },
  { file: 'src/components/Sidebar.tsx', hook: 'useEffect', reason: 'Tells the application that the drawer closed after the layout widened; React does not allow calling its callback while rendering.' },
  { file: 'site/PageLoader.tsx', hook: 'useEffect', reason: 'Scrolls to the section in the URL once the lazily loaded page has rendered.' },
]

const guidance = 'Use an event handler, a calculation during rendering, useSyncExternalStore or a ref callback. If an effect is the only option, agree an allowedEffects entry in scripts/effect-rules.mjs with the owner.'

// Finds effect calls through named, aliased, namespace and default imports.
export function findEffects(file, source) {
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const localNames = new Map()
  const namespaces = new Set()
  for (const node of ast.statements) {
    if (!ts.isImportDeclaration(node) || node.moduleSpecifier.text !== 'react') continue
    const clause = node.importClause
    if (clause?.name) namespaces.add(clause.name.text)
    const bindings = clause?.namedBindings
    if (bindings && ts.isNamespaceImport(bindings)) namespaces.add(bindings.name.text)
    if (bindings && ts.isNamedImports(bindings)) for (const item of bindings.elements) {
      const hook = (item.propertyName ?? item.name).text
      if (effectHooks.has(hook)) localNames.set(item.name.text, hook)
    }
  }
  const effects = []
  function visit(node) {
    if (ts.isCallExpression(node)) {
      const callee = node.expression
      if (ts.isIdentifier(callee) && localNames.has(callee.text)) effects.push({ hook: localNames.get(callee.text), position: node.getStart(ast) })
      if (ts.isPropertyAccessExpression(callee) && ts.isIdentifier(callee.expression)
        && namespaces.has(callee.expression.text) && effectHooks.has(callee.name.text)) effects.push({ hook: callee.name.text, position: node.getStart(ast) })
    }
    ts.forEachChild(node, visit)
  }
  visit(ast)
  return effects
}

export function checkEffectSource(file, source, allowed = allowedEffects) {
  const problems = []
  const remaining = new Map()
  for (const entry of allowed.filter(entry => entry.file === file)) remaining.set(entry.hook, (remaining.get(entry.hook) ?? 0) + 1)
  for (const effect of findEffects(file, source)) {
    const count = remaining.get(effect.hook) ?? 0
    if (count > 0) remaining.set(effect.hook, count - 1)
    else problems.push({ position: effect.position, message: `${effect.hook} has no agreed reason. ${guidance}` })
  }
  for (const [hook, count] of remaining) {
    if (count > 0) problems.push({ position: 0, message: `allowedEffects lists ${count} unused ${hook} entr${count === 1 ? 'y' : 'ies'} for this file; remove them.` })
  }
  return problems
}

// Entries for files that no longer exist must not linger in the allow-list.
export function checkAllowedEffectFiles(files, allowed = allowedEffects) {
  return allowed.filter(entry => !files.includes(entry.file)).map(entry => `allowedEffects names missing file ${entry.file}.`)
}
