import { checkNavTreeCss, checkNavTreeSource } from './nav-tree-rules.mjs'
import { checkTypographyChoices, checkTypographyCss, checkTypographyTokens } from './typography-rules.mjs'
import { checkMotionCss, checkMotionSource, motionTokens } from './motion-rules.mjs'
import { checkMap, checkRoutes, checkTokens, checkTokenValues, declaredTokens, documentedTokenValues, parsePropRows, propMentions } from './docs-rules.mjs'
import { appRoutes } from './generate-routes.mjs'
import { sitePageFile, sitePageFolder, sitePages } from '../site/siteStructure.ts'
import { checkAllowedEffectFiles, checkEffectSource } from './effect-rules.mjs'
import { checkColorPointers, checkThemeColors, checkThemesMatch, themeRoles } from './color-rules.mjs'
import { checkRawLengths } from './length-rules.mjs'
import { checkComponentPointers, componentPointers } from './pointer-rules.mjs'
import { tokenReferences, tokensUsedBy, withUsedBy } from './used-by-rules.mjs'
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const root = fileURLToPath(new URL('../', import.meta.url))
const snapshotFile = 'scripts/public-api.snapshot.json'
const tokenBaselineFile = 'scripts/undocumented-tokens.baseline.json'
const problems = []
const allowedPrefixes = ['react-aria-', 'mz-']
const read = file => readFileSync(path.join(root, file), 'utf8')
// Files that define token values: the entry point, src/tokens/, each component's
// *.tokens.css and the themes. Literal design values belong only here.
const isTokenFile = file => file === 'src/tokens.css' || file.startsWith('src/tokens/')
  || file.endsWith('.tokens.css') || /^src\/themes\/[^/]+\.css$/.test(file)

function report(file, text, position, check, message) {
  const line = text.slice(0, position).split('\n').length
  problems.push({ file, line, check, message })
}

function filesIn(directory, extensions) {
  return readdirSync(path.join(root, directory), { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))
    .flatMap(entry => {
      const file = `${directory}/${entry.name}`
      return entry.isDirectory() ? filesIn(file, extensions)
        : entry.isFile() && extensions.includes(path.extname(file)) ? [file] : []
    })
}

function walk(node, visit) {
  visit(node)
  ts.forEachChild(node, child => walk(child, visit))
}

function publicApi(program, checker) {
  const source = program.getSourceFile(path.join(root, 'src/index.ts'))
  const exports = checker.getExportsOfModule(checker.getSymbolAtLocation(source))
  function isTypeOnly(symbol, seen = new Set()) {
    if (seen.has(symbol)) return false
    seen.add(symbol)
    for (const declaration of symbol.declarations ?? []) {
      if (ts.isExportSpecifier(declaration)) {
        const statement = declaration.parent.parent
        if (declaration.isTypeOnly || statement.isTypeOnly) return true
        if (statement.moduleSpecifier) {
          const module = checker.getSymbolAtLocation(statement.moduleSpecifier)
          const name = (declaration.propertyName ?? declaration.name).text
          const target = module && checker.getExportsOfModule(module).find(item => item.name === name)
          if (target && isTypeOnly(target, seen)) return true
        } else {
          const target = checker.getExportSpecifierLocalTargetSymbol(declaration)
          if (target && isTypeOnly(target, seen)) return true
        }
      }
      if (ts.isImportSpecifier(declaration)
        && (declaration.isTypeOnly || declaration.parent.parent.isTypeOnly)) return true
      if (ts.isImportClause(declaration) && declaration.isTypeOnly) return true
    }
    return false
  }
  function exportKind(module, name, seen = new Set()) {
    const symbol = checker.getExportsOfModule(module).find(item => item.name === name)
    if (!symbol) return 'type'
    const target = symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol
    const fallback = !isTypeOnly(symbol) && target.flags & ts.SymbolFlags.Value ? 'value' : 'type'
    if (seen.has(module)) return fallback
    const nextSeen = new Set(seen).add(module)
    const moduleSource = module.declarations?.find(ts.isSourceFile)
    if (!moduleSource) return fallback
    const wildcardKinds = []
    for (const statement of moduleSource.statements) {
      if (!ts.isExportDeclaration(statement)) continue
      const clause = statement.exportClause
      const importedModule = statement.moduleSpecifier && checker.getSymbolAtLocation(statement.moduleSpecifier)
      if (clause && ts.isNamedExports(clause)) {
        const item = clause.elements.find(element => element.name.text === name)
        if (!item) continue
        if (statement.isTypeOnly || item.isTypeOnly) return 'type'
        return importedModule ? exportKind(importedModule, (item.propertyName ?? item.name).text, nextSeen) : fallback
      }
      if (clause && ts.isNamespaceExport(clause) && clause.name.text === name) {
        return statement.isTypeOnly ? 'type' : 'value'
      }
      if (!clause && importedModule && name !== 'default'
        && checker.getExportsOfModule(importedModule).some(item => item.name === name)) {
        wildcardKinds.push(statement.isTypeOnly ? 'type' : exportKind(importedModule, name, nextSeen))
      }
    }
    // Explicit local declarations take precedence over wildcard re-exports.
    if (symbol.declarations?.some(declaration => declaration.getSourceFile() === moduleSource)) return fallback
    return wildcardKinds.length ? (wildcardKinds.includes('value') ? 'value' : 'type') : fallback
  }
  const module = checker.getSymbolAtLocation(source)
  return exports.map(symbol => ({ name: symbol.name, kind: exportKind(module, symbol.name) }))
    .sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
}

function checkSite(source, checker, exportedNames) {
  const file = path.relative(root, source.fileName)
  const namespaces = new Set()
  const checkImport = (name, node) => {
    if (exportedNames.has(name)) {
      report(file, source.text, node.getStart(source), 'site-controls',
        `Import ${name} from @decocode/mezzanine; it is already publicly exported there.`)
    }
  }
  walk(source, node => {
    if (ts.isImportDeclaration(node) && /^react-aria-components(?:\/|$)/.test(node.moduleSpecifier.text)) {
      const clause = node.importClause
      if (!clause) return
      const bindings = clause.namedBindings
      if (bindings && ts.isNamedImports(bindings)) {
        for (const item of bindings.elements) {
          checkImport((item.propertyName ?? item.name).text, item)
        }
      } else if (bindings && ts.isNamespaceImport(bindings)) {
        namespaces.add(checker.getSymbolAtLocation(bindings.name))
      }
    }
    if ((ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node))
      && ts.isIdentifier(node.tagName) && ['a', 'button'].includes(node.tagName.text)) {
      report(file, source.text, node.getStart(source), 'site-controls',
        `Native <${node.tagName.text}> bypasses Mezzanine; use its Link or Button component.`)
    }
  })
  // Namespace imports must not provide a way around the named-import check.
  walk(source, node => {
    if (!ts.isIdentifier(node) || !namespaces.has(checker.getSymbolAtLocation(node))) return
    const parent = node.parent
    if (ts.isNamespaceImport(parent)) return
    if (ts.isPropertyAccessExpression(parent) && parent.expression === node) {
      checkImport(parent.name.text, parent)
    } else if (ts.isElementAccessExpression(parent) && parent.expression === node
      && ts.isStringLiteralLike(parent.argumentExpression)) {
      checkImport(parent.argumentExpression.text, parent)
    } else if (ts.isVariableDeclaration(parent) && ts.isObjectBindingPattern(parent.name)) {
      for (const element of parent.name.elements) {
        if (!element.dotDotDotToken) checkImport((element.propertyName ?? element.name).getText(source), element)
        else report(file, source.text, element.getStart(source), 'site-controls',
          'Import named React Aria components so their public Mezzanine equivalents can be checked.')
      }
    } else {
      report(file, source.text, node.getStart(source), 'site-controls',
        'Import named React Aria components instead of passing or dynamically indexing the namespace.')
    }
  })
}

function checkClasses(file, text, value, position) {
  for (const match of value.matchAll(/\S+/g)) {
    if (!allowedPrefixes.some(prefix => match[0].startsWith(prefix))) {
      report(file, text, position + match.index, 'class-prefix',
        `Class "${match[0]}" must start with react-aria- or mz-.`)
    }
  }
}

function checkJsxClasses(source, checker) {
  const file = path.relative(root, source.fileName)
  const visited = new Set()
  function inspect(node) {
    if (!node || visited.has(node)) return
    visited.add(node)
    if (ts.isStringLiteralLike(node)) {
      checkClasses(file, source.text, node.text, node.getStart(source) + 1)
    } else if (ts.isConditionalExpression(node)) {
      inspect(node.whenTrue)
      inspect(node.whenFalse)
    } else if (ts.isBinaryExpression(node)) {
      if (node.operatorToken.kind !== ts.SyntaxKind.AmpersandAmpersandToken) inspect(node.left)
      inspect(node.right)
    } else if (ts.isIdentifier(node)) {
      for (const declaration of checker.getSymbolAtLocation(node)?.declarations ?? []) {
        if (declaration.getSourceFile() === source && ts.isVariableDeclaration(declaration)) inspect(declaration.initializer)
      }
    } else if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
      const property = ts.isPropertyAccessExpression(node) ? node.name : node.argumentExpression
      for (const declaration of checker.getSymbolAtLocation(property)?.declarations ?? []) {
        if (declaration.getSourceFile() === source && ts.isPropertyAssignment(declaration)) inspect(declaration.initializer)
      }
    } else if (ts.isCallExpression(node)) {
      if (ts.isPropertyAccessExpression(node.expression)) {
        inspect(node.expression.expression)
        // join separators and filter predicates are not class names.
        if (['join', 'filter'].includes(node.expression.name.text)) return
      }
      node.arguments.forEach(inspect)
    } else if (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) {
      if (ts.isBlock(node.body)) walk(node.body, child => {
        if (ts.isReturnStatement(child)) inspect(child.expression)
      })
      else inspect(node.body)
    } else if (ts.isTemplateExpression(node)) {
      checkClasses(file, source.text, node.head.text, node.head.getStart(source) + 1)
      for (const span of node.templateSpans) {
        // Static fragments beginning with whitespace start a new class token.
        const match = /\s[\s\S]*/.exec(span.literal.text)
        if (match) checkClasses(file, source.text, match[0], span.literal.getStart(source) + 1 + match.index)
        if (!node.head.text || /\s$/.test(node.head.text)) inspect(span.expression)
      }
    } else if (ts.isObjectLiteralExpression(node)) {
      for (const property of node.properties) {
        if (ts.isPropertyAssignment(property)) {
          checkClasses(file, source.text, property.name.text ?? property.name.getText(source), property.name.getStart(source))
        }
      }
    } else {
      ts.forEachChild(node, inspect)
    }
  }
  walk(source, node => {
    if (ts.isJsxAttribute(node) && node.name.text === 'className') inspect(node.initializer)
    if (ts.isPropertyAssignment(node) && node.name.getText(source).replace(/['"]/g, '') === 'className') inspect(node.initializer)
  })
}

// Mask comments and strings without moving source positions. CSS URLs are data,
// not selectors or colour declarations (e.g. an SVG fragment can contain #fff).
function maskCss(text) {
  return text.replace(/\/\*[\s\S]*?\*\/|"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|url\((?:\\[\s\S]|[^)\\])*\)/gi,
    match => match.replace(/[^\n\r]/g, ' '))
}

function checkCss(file) {
  const text = read(file)
  const masked = maskCss(text)
  const checkPrefixes = file.startsWith('src/components/')
  // These files define token values, so literal colours belong here.
  const checkColours = !isTokenFile(file)
  let start = 0
  let parentheses = 0
  let brackets = 0
  for (let index = 0; index < masked.length; index++) {
    const character = masked[index]
    if (character === '(') parentheses++
    if (character === ')') parentheses--
    if (character === '[') brackets++
    if (character === ']') brackets--
    if (parentheses || brackets || !'{};'.includes(character)) continue
    const segment = masked.slice(start, index)
    if (character === '{' && checkPrefixes && !segment.trimStart().startsWith('@')) {
      for (const match of segment.matchAll(/\.((?:\\[0-9a-fA-F]{1,6}\s?|\\[^\n\r]|[a-zA-Z_-]|\P{ASCII})(?:\\[0-9a-fA-F]{1,6}\s?|\\[^\n\r]|[\w-]|\P{ASCII})*)/gu)) {
        const name = match[1].replace(/\\([0-9a-fA-F]{1,6})\s?|\\(.)/g,
          (_, hex, escaped) => hex ? String.fromCodePoint(parseInt(hex, 16) || 0xfffd) : escaped)
        checkClasses(file, text, name, start + match.index)
      }
    } else if (character !== '{' && checkColours) {
      const colon = segment.indexOf(':')
      if (colon !== -1 && !segment.trimStart().startsWith('@')) {
        const value = segment.slice(colon + 1)
        // Sides are start and end. A physical side needs a "physical:" comment on its line or the one before.
        const property = segment.slice(0, colon).trim()
        const physicalSide = /^(?:(?:margin|padding|border|inset|scroll-margin|scroll-padding)-(?:top|right|bottom|left)(?:-.+)?|top|right|bottom|left)$/.test(property)
          || (/^(?:text-align|float|clear)$/.test(property) && /^\s*(?:left|right)\s*$/.test(value))
        if (physicalSide) {
          const lineIndex = text.slice(0, start + colon).split('\n').length - 1
          const lines = text.split('\n')
          if (!/physical:/.test(lines[lineIndex] ?? '') && !/physical:/.test(lines[lineIndex - 1] ?? '')) {
            report(file, text, start + colon, 'logical-sides',
              `Use a start/end (logical) property instead of "${property}", or add a "physical:" comment saying why.`)
          }
        }
        // Stacking order comes from the shared --z-index-* scale, never a component's own number.
        if (segment.slice(0, colon).trim() === 'z-index' && !/^\s*(?:var\(--z-index-[a-z]+\)|auto)\s*$/.test(value)) {
          report(file, text, start + colon + 1, 'z-index',
            'Use a --z-index-* step (base, raised, sticky, overlay or toast) instead of a number.')
        }
        // System colour keywords in forced-colors rules are intentionally valid;
        // this check targets the explicit hex and function syntaxes requested.
        for (const match of value.matchAll(/#[\da-f]{3,8}\b|\b(?:rgba?|hsla?|oklch|oklab|lab)\s*\(/gi)) {
          if (match[0].startsWith('#') && ![4, 5, 7, 9].includes(match[0].length)) continue
          report(file, text, start + colon + 1 + match.index, 'raw-colour',
            `Raw colour "${match[0]}" must use a design token instead.`)
        }
      }
    }
    start = index + 1
  }
}

// Button dimensions belong to the shared size scale, not consuming selectors.
// Collect consumer class names too, so statically named consumer classes are checked as well.
const buttonClasses = new Set(['mz-button', 'mz-toggle-button', 'mz-button-icon', 'mz-button-content'])
const sizingProperty = /^(?:(?:min-|max-)?(?:width|height|inline-size|block-size)|padding(?:-.+)?|font(?:-.+)?|line-height|letter-spacing|text-transform|zoom|scale|transform)$/

function collectButtonClasses(source) {
  const file = path.relative(root, source.fileName)
  walk(source, node => {
    if (!(ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node))) return
    if (!['Button', 'ToggleButton'].includes(node.tagName.getText(source))) return
    for (const attribute of node.attributes.properties) {
      if (!ts.isJsxAttribute(attribute)) continue
      if (attribute.name.text === 'className' && attribute.initializer && ts.isStringLiteral(attribute.initializer)) {
        attribute.initializer.text.split(/\s+/).forEach(name => buttonClasses.add(name))
      }
      if (attribute.name.text === 'style') {
        report(file, source.text, attribute.getStart(source), 'button-sizing',
          'Use Button/ToggleButton size props and shared theme tokens, not inline button styles.')
      }
    }
  })
}

function checkButtonSizing(file) {
  // Select, ComboBox, NumberField, TagGroup, GridList and Tree draw their own small buttons rather than Mezzanine's Button.
  if (['src/components/Button/Button.css', 'src/components/ToggleButton/ToggleButton.css', 'src/components/Select/Select.css', 'src/components/ComboBox/ComboBox.css', 'src/components/NumberField/NumberField.css', 'src/components/TagGroup/TagGroup.css', 'src/components/GridList/GridList.css', 'src/components/Tree/Tree.css'].includes(file) || isTokenFile(file)) return
  const text = read(file)
  const masked = maskCss(text)
  for (const block of masked.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    // :has selects a parent layout, not the button contained within it.
    const selector = block[1].replace(/:has\([^)]*\)/g, '')
    const targetsButton = [...selector.matchAll(/\.([\w-]+)/g)].some(match => buttonClasses.has(match[1]))
    for (const declaration of block[2].matchAll(/([\w-]+)\s*:\s*([^;{}]+)/g)) {
      const property = declaration[1]
      const setsSizeToken = /^--(?:toggle-)?button-.*(?:size|height|width|padding|gap|line-height)(?:-|$)/.test(property)
      if (setsSizeToken || (targetsButton && sizingProperty.test(property))) {
        report(file, text, block.index + block[1].length + 1 + declaration.index, 'button-sizing',
          `${property} overrides shared button sizing. Select size with props; position buttons using their parent layout.`)
      }
    }
  }
}

function checkSnapshot(api, update) {
  if (update) {
    writeFileSync(path.join(root, snapshotFile), `${JSON.stringify(api, null, 2)}\n`)
    console.log(`Updated ${snapshotFile} (${api.length} exports).`)
    return
  }
  const snapshotText = read(snapshotFile)
  const snapshot = JSON.parse(snapshotText)
  if (!Array.isArray(snapshot) || snapshot.some(item => !item || typeof item.name !== 'string'
    || !['value', 'type'].includes(item.kind)) || new Set(snapshot.map(item => item.name)).size !== snapshot.length) {
    throw new Error(`${snapshotFile} must contain unique names marked value or type.`)
  }
  const before = new Map(snapshot.map(item => [item.name, item.kind]))
  const after = new Map(api.map(item => [item.name, item.kind]))
  const source = read('src/index.ts')
  const exportPosition = name => Math.max(0, source.indexOf(name))
  for (const { name, kind } of api) {
    if (!before.has(name)) report('src/index.ts', source, exportPosition(name), 'public-api', `Added ${kind} export "${name}".`)
    else if (before.get(name) !== kind) report('src/index.ts', source, exportPosition(name), 'public-api',
      `Export "${name}" changed from ${before.get(name)} to ${kind}.`)
  }
  for (const { name, kind } of snapshot) {
    if (!after.has(name)) report(snapshotFile, snapshotText, snapshotText.indexOf(`"name": ${JSON.stringify(name)}`),
      'public-api', `Removed ${kind} export "${name}".`)
  }
}

// Each Props table, by content file and section key, and the exported types it documents. Rows prefixed with a
// component name, or following a row that is only that name, use its type.
const propTables = [
  { file: 'site/pages/structure/top-bar/topBarContent.ts', key: 'props', types: ['TopBarProps'] },
  { file: 'site/pages/components/navigation/navigation-tree/navigationTreeContent.ts', key: 'props', types: ['NavTreeProps'] },
  { file: 'site/pages/components/navigation/navigation-tree/navigationTreeContent.ts', key: 'itemProps', types: ['NavTreeItemData', 'NavTreeSectionData'] },
  { file: 'site/pages/components/organise-info/tabs/tabsContent.ts', key: 'props', types: ['TabsProps', 'TabListProps', 'TabProps', 'TabPanelProps'] },
  { file: 'site/pages/components/navigation/table-of-contents/tableOfContentsContent.ts', key: 'props', types: ['TableOfContentsProps'] },
  { file: 'site/pages/structure/app-shell/appShellContent.ts', key: 'props', types: ['AppShellProps'] },
  { file: 'site/pages/structure/footer/footerContent.ts', key: 'props', types: ['FooterProps'] },
  { file: 'site/pages/structure/panel/panelContent.ts', key: 'props', types: ['PanelProps'],
    components: { PanelTrigger: ['PanelTriggerProps'] } },
  { file: 'site/pages/components/overlay/tooltip/tooltipContent.ts', key: 'props', types: [],
    components: { TooltipTrigger: ['TooltipTriggerComponentProps'], Tooltip: ['TooltipProps'] } },
]

// The Props rows of one content-file section: the object whose `key` is the section key, then its
// `table.rows`. Content files follow site/templates/docsPageContent.ts.
function documentedPropNames(program, file, key) {
  const source = program.getSourceFile(path.join(root, file))
  const property = (object, name) => object.properties.find(item => ts.isPropertyAssignment(item) && item.name.getText(source) === name)?.initializer
  const names = []
  walk(source, node => {
    let table
    // A section such as { key: 'props', table: { rows } }.
    if (ts.isObjectLiteralExpression(node)) {
      const sectionKey = property(node, 'key')
      if (sectionKey && ts.isStringLiteral(sectionKey) && sectionKey.text === key) table = property(node, 'table')
    }
    // A table a page renders itself, exported under the key, such as props: { rows }.
    if (ts.isPropertyAssignment(node) && node.name.getText(source) === key) table = node.initializer
    const rows = table && ts.isObjectLiteralExpression(table) ? property(table, 'rows') : undefined
    if (!rows || !ts.isArrayLiteralExpression(rows)) return
    for (const element of rows.elements) {
      if (!ts.isObjectLiteralExpression(element)) continue
      const name = property(element, 'name')
      if (name && ts.isStringLiteral(name)) names.push({ text: name.text, position: name.getStart(source) })
    }
  })
  return names
}

function exportedType(checker, exports, name) {
  let symbol = exports.find(item => item.name === name)
  if (!symbol) return undefined
  if (symbol.flags & ts.SymbolFlags.Alias) symbol = checker.getAliasedSymbol(symbol)
  return checker.getDeclaredTypeOfSymbol(symbol)
}

// Every property of the type, across all members of a union.
function propertiesOf(type) {
  return type.isUnion() ? type.types.flatMap(propertiesOf) : type.getProperties()
}

function checkPropTables(program, checker) {
  const index = program.getSourceFile(path.join(root, 'src/index.ts'))
  const exports = checker.getExportsOfModule(checker.getSymbolAtLocation(index))
  for (const table of propTables) {
    const text = read(table.file)
    const rows = documentedPropNames(program, table.file, table.key)
    if (!rows.length) { report(table.file, text, 0, 'docs-props', `No ${table.key} rows found.`); continue }
    const components = table.components ?? {}
    const typeNamesFor = component => component ? components[component] : table.types
    const resolve = names => names.map(name => {
      const type = exportedType(checker, exports, name)
      if (!type) report(table.file, text, 0, 'docs-props', `${name} is not exported from src/index.ts.`)
      return type
    }).filter(Boolean)
    const documented = new Map()
    for (const { component, prop } of parsePropRows(rows.map(row => row.text), Object.keys(components))) {
      const typeNames = typeNamesFor(component)
      const names = new Set(resolve(typeNames).flatMap(type => propertiesOf(type).map(symbol => symbol.name)))
      const row = rows.find(item => item.text.includes(prop))
      if (!names.has(prop)) report(table.file, text, row?.position ?? 0, 'docs-props', `Props table documents "${prop}", which ${typeNames.join(' / ')} does not have.`)
      for (const typeName of typeNames) documented.set(typeName, new Set([...(documented.get(typeName) ?? []), prop]))
    }
    // Props a component declares itself must be documented. Props it inherits,
    // from React Aria or another Mezzanine component, are documented selectively.
    for (const typeName of new Set([...table.types, ...Object.values(components).flat()])) {
      const [type] = resolve([typeName])
      if (!type) continue
      const typeFiles = new Set((type.aliasSymbol ?? type.symbol)?.declarations?.map(declaration => declaration.getSourceFile().fileName) ?? [])
      const own = propertiesOf(type).filter(symbol => (symbol.declarations ?? []).some(declaration => {
        const fileName = declaration.getSourceFile().fileName
        return typeFiles.has(fileName) && fileName.startsWith(path.join(root, 'src'))
      }))
      // ref is the standard React prop every component accepts.
      for (const symbol of own.filter(item => item.name !== 'ref')) {
        const covered = [...documented].some(([name, props]) => props.has(symbol.name) && (name === typeName || resolve([name]).some(other => propertiesOf(other).includes(symbol))))
        if (!covered) report(table.file, text, 0, 'docs-props', `${typeName} declares "${symbol.name}", but the Props table does not document it.`)
      }
    }
  }
}

// Props that component pages name in their copy, such as `hierarchy="secondary"`, must exist on the page's
// component, and a fixed value must be one the prop accepts. A page's components are the exported Props types
// named after its folder: the toggle-button page covers ToggleButtonProps and ToggleButtonGroupProps.
const pageComponentNames = { 'navigation-tree': 'NavTree' }
// Attributes every element accepts, which the docs may name on any component's parts.
const sharedAttributes = new Set(['slot', 'role', 'id', 'className', 'style', 'key', 'children', 'href'])
function checkPropMentions(program, checker) {
  const index = program.getSourceFile(path.join(root, 'src/index.ts'))
  const exports = checker.getExportsOfModule(checker.getSymbolAtLocation(index))
  const propsTypes = exports.filter(symbol => symbol.name.endsWith('Props') && !symbol.name.endsWith('RenderProps'))
  const pascal = folder => pageComponentNames[folder] ?? folder.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join('')
  const typesNamed = base => propsTypes.filter(symbol => new RegExp(`^${base}[A-Za-z]*Props$`).test(symbol.name))
  const sections = []
  for (const file of filesIn('site/pages/components', ['.ts']).filter(item => item.endsWith('Content.ts'))) {
    sections.push({ file, text: read(file), offset: 0, pageTypes: typesNamed(pascal(path.basename(path.dirname(file)))) })
  }
  // COMPONENTS.md: each section covers the components it names, such as "AppShell and Panel", including one it
  // mentions in passing, such as the Panel beside a TopBar.
  const guideFile = 'src/docs/COMPONENTS.md'
  const guide = read(guideFile)
  for (const heading of guide.matchAll(/^## (.+)$/gm)) {
    const found = guide.indexOf('\n## ', heading.index + 1)
    const end = found === -1 ? guide.length : found
    const names = new Set(guide.slice(heading.index, end).match(/\b[A-Z][A-Za-z]+\b/g) ?? [])
    sections.push({ file: guideFile, text: guide, offset: heading.index, end,
      pageTypes: propsTypes.filter(symbol => names.has(symbol.name.replace(/Props$/, ''))) })
  }
  for (const { file, text, offset, end, pageTypes } of sections) {
    const scope = end === undefined ? text : text.slice(offset, end)
    for (const found of propMentions(scope)) {
      const mention = { ...found, position: found.position + offset }
      if (sharedAttributes.has(mention.prop) || /^(aria|data)-/.test(mention.prop)) continue
      const typeSymbols = mention.component
        ? propsTypes.filter(symbol => symbol.name === `${mention.component}Props`)
        : pageTypes
      if (!typeSymbols.length) continue
      const types = typeSymbols.map(symbol => exportedType(checker, exports, symbol.name)).filter(Boolean)
      const props = types.flatMap(propertiesOf).filter(symbol => symbol.name === mention.prop)
      const owner = mention.component ?? typeSymbols.map(symbol => symbol.name).join(' / ')
      if (!props.length) {
        report(file, text, mention.position, 'docs-props', `The copy names "${mention.prop}", which ${owner} does not have.`)
        continue
      }
      if (mention.value === undefined) continue
      const allowed = new Set()
      let isOpen = false
      for (const prop of props) {
        const type = checker.getNonNullableType(checker.getTypeOfSymbolAtLocation(prop, index))
        for (const member of type.isUnion() ? type.types : [type]) {
          if (member.isStringLiteral()) allowed.add(member.value)
          else isOpen = true
        }
      }
      if (!isOpen && !allowed.has(mention.value)) report(file, text, mention.position, 'docs-props', `The copy sets ${mention.prop}="${mention.value}", but ${owner} accepts only ${[...allowed].map(value => `"${value}"`).join(', ')}.`)
    }
  }
}

// The token guide's tables copy values by hand, so each must still match what the token files declare.
function checkGuideTokenValues() {
  const declared = new Map()
  for (const file of filesIn('src', ['.css'])) {
    for (const match of maskCss(read(file)).matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
      const value = read(file).slice(match.index, match.index + match[0].length).match(/:\s*([^;]+);/)[1].trim().replace(/\s+/g, ' ')
      declared.set(match[1], (declared.get(match[1]) ?? new Set()).add(value))
    }
  }
  const guideFile = 'src/docs/TOKENS.md'
  const guide = read(guideFile)
  for (const problem of checkTokenValues(documentedTokenValues(guide), declared)) report(guideFile, guide, problem.position, 'docs-tokens', problem.message)
}

// MAP.md's rows must name real paths, and every folder inside a mapped folder needs a row.
function checkMapFile() {
  const text = read('MAP.md')
  const foldersIn = parent => readdirSync(path.join(root, parent), { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => entry.name)
  for (const problem of checkMap(text, { exists: file => existsSync(path.join(root, file)), foldersIn })) report('MAP.md', text, problem.position, 'map', problem.message)
}

function checkDocsTokens(update) {
  const tokenFiles = filesIn('src', ['.css']).filter(file => isTokenFile(file) && file !== 'src/tokens.css')
  const publicTokens = declaredTokens(tokenFiles.map(read))
  const knownTokens = declaredTokens([...filesIn('src', ['.css']), ...filesIn('site', ['.css'])].map(read))
  // Component pointers are undeclared on purpose, but the docs may name them.
  const declared = new Set(knownTokens)
  for (const file of filesIn('src/components', ['.css']).filter(file => !file.endsWith('.tokens.css'))) {
    for (const { name } of componentPointers(read(file), declared)) knownTokens.add(name)
  }
  const siteSources = filesIn('site', ['.ts', '.tsx']).filter(file => !file.startsWith('site/lab/'))
    .map(file => ({ file, text: read(file) }))
  const baselineText = read(tokenBaselineFile)
  const baseline = update ? [] : JSON.parse(baselineText)
  const { problems: tokenProblems, undocumented } = checkTokens({ publicTokens, knownTokens, siteSources, baseline })
  if (update) {
    writeFileSync(path.join(root, tokenBaselineFile), `${JSON.stringify(undocumented, null, 2)}\n`)
    console.log(`Updated ${tokenBaselineFile} (${undocumented.length} undocumented tokens).`)
    return
  }
  for (const problem of tokenProblems) {
    const text = problem.file === tokenBaselineFile ? baselineText : read(problem.file)
    report(problem.file, text, problem.position, 'docs-tokens', problem.message)
  }
}

function checkDocsRoutes() {
  const lighthouseUrls = ['config/lighthouserc.mobile.json', 'config/lighthouserc.desktop.json']
    .flatMap(file => JSON.parse(read(file)).ci.collect.url.map(url => ({ file, url })))
  const pages = sitePages.filter(page => page.status === 'implemented')
    .map(page => ({ id: page.id, file: `site/pages/${sitePageFolder(page.id)}/${sitePageFile(page.id)}` }))
  const pageFiles = filesIn('site/pages', ['.tsx']).filter(file => file.endsWith('Page.tsx'))
  // Shown by the app shell for unknown and unbuilt pages, so they have no place in the navigation.
  const otherPageFiles = ['site/pages/not-found/NotFoundPage.tsx', 'site/pages/not-implemented/NotImplementedPage.tsx']
  for (const problem of checkRoutes({ routes: appRoutes(), pages, pageFiles, otherPageFiles, lighthouseUrls })) {
    report(problem.file, read(problem.file), problem.position, 'docs-routes', problem.message)
  }
}

// Palettes feed theme roles, and library CSS reads only those roles (see color-rules.mjs).
// Component pointers: named, with a fallback that exists. Their list for the docs pages is generated
// from the CSS into site/components/componentPointers.ts; --update-pointers rewrites it.
const pointersFile = 'site/components/componentPointers.ts'
function checkPointers(update) {
  const declared = new Set(filesIn('src', ['.css']).flatMap(file => [...read(file).matchAll(/(--[\w-]+)\s*:/g)].map(match => match[1])))
  const lists = {}
  for (const file of filesIn('src/components', ['.css']).filter(file => !file.endsWith('.tokens.css'))) {
    const component = file.split('/')[2]
    const text = read(file)
    for (const problem of checkComponentPointers(component, text, declared)) report(file, text, problem.position, 'pointers', problem.message)
    const pointers = componentPointers(text, declared)
    if (pointers.length) lists[component] = [...(lists[component] ?? []), ...pointers]
  }
  const sorted = Object.fromEntries(Object.keys(lists).sort().map(component => [component, lists[component]]))
  const generated = `// Generated from each component's CSS by npm run check:rules with the update-pointers flag. Do not edit.
// The parts of each component an app can restyle on its own, with the shared token each falls back to.

export const componentPointers: Record<string, readonly { name: string; fallback: string }[]> = ${JSON.stringify(sorted, null, 2)}
`
  if (update) writeFileSync(path.join(root, pointersFile), generated)
  else if (read(pointersFile) !== generated) report(pointersFile, '', 0, 'pointers', 'The pointer list is out of date; run check:rules with --update-pointers.')
}

// TOKENS.md's Used by columns, generated from which components read each token; --update-used-by
// rewrites them.
const tokensGuideFile = 'src/docs/TOKENS.md'
function checkUsedBy(update) {
  const references = tokenReferences(filesIn('src', ['.css']).filter(isTokenFile).map(read))
  const componentCss = new Map()
  for (const file of filesIn('src/components', ['.css']).filter(file => !file.endsWith('.tokens.css'))) {
    const component = file.split('/')[2]
    componentCss.set(component, `${componentCss.get(component) ?? ''}\n${read(file)}`)
  }
  const guide = read(tokensGuideFile)
  const generated = withUsedBy(guide, tokensUsedBy(componentCss, references))
  if (update) writeFileSync(path.join(root, tokensGuideFile), generated)
  else if (generated !== guide) report(tokensGuideFile, '', 0, 'used-by', 'A Used by column in TOKENS.md is out of date; run check:rules with --update-used-by.')
}

function checkColors() {
  const themeFiles = ['src/themes/light.css', 'src/themes/dark.css', 'src/themes/wireframe.css']
  const themes = themeFiles.map(file => ({ file, text: read(file) }))
  for (const { file, text } of themes) {
    // Only each theme's role blocks count; Wireframe's later link rules hold no declarations of tokens.
    for (const problem of checkThemeColors(text)) report(file, text, problem.position, 'colors', problem.message)
  }
  const darkText = themes[1].text
  const darkBlocks = [darkText.slice(0, darkText.indexOf('@media')), darkText.slice(darkText.indexOf('@media'))]
  const roleSets = [
    { file: themeFiles[0], roles: themeRoles(themes[0].text) },
    { file: `${themeFiles[1]} (explicit)`, roles: themeRoles(darkBlocks[0]) },
    { file: `${themeFiles[1]} (system)`, roles: themeRoles(darkBlocks[1]) },
    { file: themeFiles[2], roles: themeRoles(themes[2].text) },
  ]
  for (const problem of checkThemesMatch(roleSets)) report(problem.file.split(' ')[0], '', 0, 'colors', problem.message)
  const roles = new Set(roleSets[0].roles)
  const libraryCss = filesIn('src', ['.css']).filter(file => file !== 'src/tokens/color.tokens.css' && !file.startsWith('src/themes/'))
  for (const file of libraryCss) {
    const text = read(file)
    for (const problem of checkColorPointers(text, roles)) report(file, text, problem.position, 'colors', problem.message)
    if (!isTokenFile(file)) for (const problem of checkRawLengths(file, text)) report(file, text, problem.position, 'lengths', problem.message)
  }
}

try {
  const argumentsList = process.argv.slice(2)
  if (argumentsList.some(argument => !['--update-api', '--update-token-baseline', '--update-pointers', '--update-used-by'].includes(argument))) throw new Error('Only --update-api, --update-token-baseline, --update-pointers and --update-used-by are supported.')
  const configFile = ts.readConfigFile(path.join(root, 'config/tsconfig.app.json'), ts.sys.readFile)
  if (configFile.error) throw new Error(ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n'))
  const config = ts.parseJsonConfigFileContent(configFile.config, ts.sys, path.join(root, 'config'))
  if (config.errors.length) throw new Error(config.errors.map(error => ts.flattenDiagnosticMessageText(error.messageText, '\n')).join('\n'))
  const siteFiles = filesIn('site', ['.tsx'])
  const componentFiles = filesIn('src/components', ['.tsx'])
  const program = ts.createProgram([...new Set([...config.fileNames, ...siteFiles.map(file => path.join(root, file)),
    ...componentFiles.map(file => path.join(root, file))])], config.options)
  const checker = program.getTypeChecker()
  const api = publicApi(program, checker)
  const exportedNames = new Set(api.map(item => item.name))
  for (const file of siteFiles) checkSite(program.getSourceFile(path.join(root, file)), checker, exportedNames)
  for (const file of componentFiles) checkJsxClasses(program.getSourceFile(path.join(root, file)), checker)
  for (const file of filesIn('src', ['.css'])) checkCss(file)
  for (const source of program.getSourceFiles()) {
    if (source.fileName.startsWith(root) && !source.fileName.includes('/node_modules/')) collectButtonClasses(source)
  }
  for (const file of [...filesIn('src', ['.css']), ...filesIn('site', ['.css'])]) checkButtonSizing(file)
  for (const file of [...filesIn('src', ['.css']), ...filesIn('site', ['.css'])]) {
    const text = read(file)
    for (const problem of checkNavTreeCss(file, text)) report(file, text, problem.position, 'nav-tree-ownership', problem.message)
    for (const problem of checkTypographyCss(file, text)) report(file, text, problem.position, 'typography', problem.message)
    for (const problem of checkMotionCss(file, text)) report(file, text, problem.position, 'motion', problem.message)
  }
  const sourceFiles = [...filesIn('src', ['.ts', '.tsx']), ...filesIn('site', ['.ts', '.tsx'])]
  for (const file of sourceFiles) {
    const text = read(file)
    for (const problem of checkNavTreeSource(file, text)) report(file, text, problem.position, 'nav-tree-ownership', problem.message)
    for (const problem of checkMotionSource(file, text)) report(file, text, problem.position, 'motion', problem.message)
    for (const problem of checkEffectSource(file, text)) report(file, text, problem.position, 'effects', problem.message)
  }
  for (const message of checkAllowedEffectFiles(sourceFiles)) report('scripts/effect-rules.mjs', '', 0, 'effects', message)
  const buttonTokensFile = 'src/components/Button/Button.css'
  const buttonTokens = read(buttonTokensFile)
  for (const problem of checkTypographyTokens(buttonTokens)) report(buttonTokensFile, buttonTokens, problem.position, 'typography', problem.message)
  const tokens = read('src/tokens/motion.tokens.css')
  const typographyGuide = read('src/docs/TYPOGRAPHY.md')
  for (const problem of checkTypographyChoices(typographyGuide, read('site/pages/foundations/typography/typographyContent.ts'))) report('src/docs/TYPOGRAPHY.md', typographyGuide, problem.position, 'typography', problem.message)
  for (const token of motionTokens) {
    if (!tokens.includes(`${token}:`)) report('src/tokens/motion.tokens.css', tokens, 0, 'motion-contract', `Missing shared token ${token}.`)
  }
  checkColors()
  checkPointers(argumentsList.includes('--update-pointers'))
  checkUsedBy(argumentsList.includes('--update-used-by'))
  checkSnapshot(api, argumentsList.includes('--update-api'))
  checkDocsRoutes()
  checkDocsTokens(argumentsList.includes('--update-token-baseline'))
  checkPropTables(program, checker)
  checkPropMentions(program, checker)
  checkGuideTokenValues()
  checkMapFile()
} catch (error) {
  report('scripts/check-rules.mjs', '', 0, 'rule-checker', error.message)
}

problems.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line || a.message.localeCompare(b.message))
for (const problem of problems) console.error(`${problem.file}:${problem.line}, ${problem.check}, ${problem.message}`)
if (problems.length) {
  console.error(`Rule checks failed: ${problems.length} problem(s).`)
  process.exitCode = 1
} else {
  console.log('All checks passed (including shared motion rules).')
}
