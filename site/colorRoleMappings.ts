import {
  colorShadeSteps,
  colorTokenGroups,
  foundationColorPalettes,
  semanticColorPalettes,
} from './foundationData'

export const documentedColorThemes = ['light', 'dark', 'wireframe'] as const

type DocumentedColorTheme = (typeof documentedColorThemes)[number]

export type ColorRoleMappings = Record<
  string,
  Record<DocumentedColorTheme, string>
>

const paletteTokens = [
  ...foundationColorPalettes,
  ...semanticColorPalettes,
].flatMap((palette) => (
  colorShadeSteps.map((step) => `--color-${palette.id}-${step}`)
))

const roleTokens = colorTokenGroups.flatMap((group) => (
  group.tokens.map((colorToken) => colorToken.token)
))

function normaliseColorValue(value: string) {
  return value.trim().toLowerCase()
}

export function readColorRoleMappings() {
  const root = document.documentElement
  const originalTheme = root.getAttribute('data-theme')
  const mappings = Object.fromEntries(roleTokens.map((token) => [token, {}])) as ColorRoleMappings

  try {
    documentedColorThemes.forEach((theme) => {
      root.dataset.theme = theme
      const styles = getComputedStyle(root)
      const paletteTokenByValue = new Map(
        paletteTokens.map((token) => [
          normaliseColorValue(styles.getPropertyValue(token)),
          token,
        ]),
      )

      roleTokens.forEach((token) => {
        const roleValue = normaliseColorValue(styles.getPropertyValue(token))
        mappings[token][theme] = paletteTokenByValue.get(roleValue) ?? roleValue
      })
    })
  } finally {
    if (originalTheme === null) {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', originalTheme)
    }
  }

  return mappings
}
