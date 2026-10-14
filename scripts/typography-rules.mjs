// Component text must use one complete role from the type scale (see src/docs/TYPOGRAPHY.md).
const roleDefaults = { display: 'regular', heading: 'regular', title: 'semibold', body: 'regular', label: 'semibold' }
const intentWeights = ['var(--font-weight-default)', 'var(--font-weight-emphasis)']
const face = ['font-family', 'font-weight', 'letter-spacing', 'text-transform']

function declarations(body) {
  const found = new Map()
  for (const match of body.matchAll(/(?:^|;)\s*(font|font-family|font-size|font-weight|letter-spacing|line-height|text-transform)\s*:\s*([^;]+)/g)) {
    found.set(match[1], match[2].trim())
  }
  return found
}

function roleOf(found) {
  const face = found.get('letter-spacing')?.match(/^var\(--letter-spacing-(\w+)\)$/)
  return face?.[1]
}

function expected(role, size) {
  const family = role === 'display' || role === 'heading' ? 'heading' : 'body'
  return {
    'font-family': `var(--font-family-${family})`,
    ...(size && { 'font-size': `var(--font-size-${role}-${size})`, 'line-height': `var(--line-height-${role}-${size})` }),
    'letter-spacing': `var(--letter-spacing-${role})`,
    'text-transform': `var(--text-transform-${role})`,
  }
}

function checkWeight(value, role) {
  return intentWeights.includes(value) || (role && value === `var(--font-weight-${roleDefaults[role]})`)
}

export function checkTypographyCss(file, source) {
  const problems = []
  if (!/^src\/components\/.+\.css$/.test(file)) return problems
  const css = source.replace(/\/\*[\s\S]*?\*\//g, comment => ' '.repeat(comment.length))
  for (const block of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const found = declarations(block[2])
    if (!found.size) continue
    const report = message => problems.push({ position: block.index, message })
    if (found.has('font') && found.get('font') !== 'inherit') report('Use font: inherit or a complete text role, not the font shorthand.')
    const size = found.get('font-size')
    // Button and ToggleButton select their size through button tokens that point to the scale.
    if (size === 'var(--button-font-size)') {
      if (found.get('line-height') !== 'var(--button-line-height)') report('Pair --button-font-size with --button-line-height.')
      continue
    }
    const sized = size?.match(/^var\(--font-size-(\w+)-(sm|md|lg)\)$/)
    if (size && !sized) report(`Font size ${size} is not a type-scale token.`)
    const role = sized?.[1] ?? roleOf(found)
    const setsFace = face.some(name => name !== 'font-weight' && found.has(name)) || found.has('line-height')
    if (size || setsFace) {
      if (!role || !(role in roleDefaults)) {
        report('Set text with a complete role: family, size, weight, letter spacing, line height and transform.')
        continue
      }
      const wanted = expected(role, sized?.[2])
      if (size) {
        for (const [name, value] of Object.entries(wanted)) {
          if (found.get(name) !== value) report(`${role}-${sized[2]} needs ${name}: ${value}.`)
        }
      } else {
        // A rule without a size may set only a role's face, as Button does with its size tokens.
        if (found.has('line-height')) report('Line height must be set with its paired font size.')
        for (const name of face.filter(name => name !== 'font-weight')) {
          if (found.get(name) !== wanted[name]) report(`The ${role} face needs ${name}: ${wanted[name]}.`)
        }
      }
      if (!found.has('font-weight')) report(`Set the ${role} weight so it is not inherited from a parent.`)
    }
    if (found.has('font-weight') && !checkWeight(found.get('font-weight'), size || setsFace ? role : undefined)) {
      report('Use the role\'s own weight, --font-weight-default or --font-weight-emphasis.')
    }
  }
  return problems
}

// Button text sizes must point to the type scale rather than copy its values.
export function checkTypographyTokens(source) {
  const problems = []
  for (const match of source.matchAll(/--button-(?:sm|md|lg|xl)-(font-size|line-height):\s*([^;]+);/g)) {
    if (!new RegExp(`^var\\(--${match[1]}-(?:title|body|label)-(?:sm|md|lg)\\)$`).test(match[2].trim())) {
      problems.push({ position: match.index, message: `Button ${match[1]} must reference a type-scale token.` })
    }
  }
  return problems
}

// The Pattern mappings table in TYPOGRAPHY.md and the site's Text styles choices must match.
export function checkTypographyChoices(markdown, content) {
  const section = markdown.split('## Pattern mappings')[1]?.split('\n## ')[0] ?? ''
  const documented = [...section.matchAll(/^\| (?!Text \|)(?!---)(.+?) \| (.+?) \|$/gm)]
    .map(row => `${row[1]}: ${[...row[2].matchAll(/`([\w-]+)`/g)].map(match => match[1]).join(', ')}`)
  const shown = [...content.matchAll(/\{ use: '([^']+)', classNames: \[([^\]]*)\] \}/g)]
    .map(row => `${row[1]}: ${[...row[2].matchAll(/'mz-text-([\w-]+)'/g)].map(match => match[1]).join(', ')}`)
  if (!documented.length || !shown.length) return [{ position: 0, message: 'Could not read the typography choices from TYPOGRAPHY.md or textStylesContent.ts.' }]
  if (documented.join('\n') === shown.join('\n')) return []
  const first = documented.findIndex((row, index) => row !== shown[index])
  return [{ position: 0, message: `Typography choices differ at row ${first + 1}: TYPOGRAPHY.md has "${documented[first] ?? 'nothing'}", the site has "${shown[first] ?? 'nothing'}".` }]
}
