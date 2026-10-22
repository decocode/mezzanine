// Colour has two layers: palettes, and roles set by each theme that components read directly.
// These checks keep themes setting roles only, and components reading roles rather than palettes.

const paletteStep = /--color-(?:(?:accent|signature|neutral|info|success|warning|danger)-\d+|white|black)\b/g
const colorReference = /var\(\s*(--color-[a-z0-9-]+)/g
// Theme-only values that are not colour roles: corner, surface-gap and indicator-width roles, elevation,
// and one component override every theme genuinely needs.
const themeExceptions = [/^--radius-/, /^--surface-gap$/, /^--indicator-width$/, /^--elevation-/, /^--table-header-background$/]

function declarations(text) {
  const masked = text.replace(/\/\*[\s\S]*?\*\//g, value => value.replace(/[^\n]/g, ' '))
  return [...masked.matchAll(/(--[\w-]+)\s*:\s*([^;]*);/g)]
    .map(match => ({ property: match[1], value: match[2], position: match.index }))
}

// The colour roles a theme sets, in order.
export function themeRoles(text) {
  return declarations(text).map(item => item.property).filter(property => property.startsWith('--color-'))
}

// Themes set colour roles (and the listed exceptions) only, never palettes or anything else.
export function checkThemeColors(text) {
  return declarations(text).flatMap(({ property, position }) => {
    if (paletteStep.test(property)) { paletteStep.lastIndex = 0; return [{ position, message: `${property} is a palette step; themes read palettes but never set them.` }] }
    paletteStep.lastIndex = 0
    if (property.startsWith('--color-') || themeExceptions.some(pattern => pattern.test(property))) return []
    return [{ position, message: `${property} is not a colour role; themes set colour roles only, and components read them directly.` }]
  })
}

// Every theme sets the same roles, so switching theme never leaves a role unset.
export function checkThemesMatch(themes) {
  const [first, ...rest] = themes
  const expected = new Set(first.roles)
  return rest.flatMap(theme => {
    const actual = new Set(theme.roles)
    return [
      ...[...expected].filter(role => !actual.has(role)).map(role => ({ file: theme.file, message: `Missing the colour role ${role}, which ${first.file} sets.` })),
      ...[...actual].filter(role => !expected.has(role)).map(role => ({ file: theme.file, message: `Sets ${role}, which ${first.file} does not.` })),
    ]
  })
}

// Library CSS outside the palette file and themes reads roles only, and only roles that exist.
export function checkColorPointers(text, roles) {
  const masked = text.replace(/\/\*[\s\S]*?\*\//g, value => value.replace(/[^\n]/g, ' '))
  const problems = []
  for (const match of masked.matchAll(colorReference)) {
    const name = match[1]
    if (new RegExp(`^${paletteStep.source}$`).test(name)) problems.push({ position: match.index, message: `${name} is a palette step; point at a colour role instead.` })
    else if (!roles.has(name)) problems.push({ position: match.index, message: `${name} is not a colour role that the themes set.` })
  }
  return problems
}
