type RgbColor = [red: number, green: number, blue: number]

function parseHexColor(value: string): RgbColor | null {
  const hex = value.trim().replace(/^#/, '')
  const expandedHex = hex.length === 3
    ? hex.split('').map((character) => character.repeat(2)).join('')
    : hex

  if (!/^[\dA-Fa-f]{6}$/.test(expandedHex)) return null

  return [
    Number.parseInt(expandedHex.slice(0, 2), 16),
    Number.parseInt(expandedHex.slice(2, 4), 16),
    Number.parseInt(expandedHex.slice(4, 6), 16),
  ]
}

function relativeLuminance([red, green, blue]: RgbColor) {
  const [linearRed, linearGreen, linearBlue] = [red, green, blue].map((channel) => {
    const value = channel / 255
    return value <= 0.04045
      ? value / 12.92
      : ((value + 0.055) / 1.055) ** 2.4
  })

  return (0.2126 * linearRed) + (0.7152 * linearGreen) + (0.0722 * linearBlue)
}

function contrastRatio(firstColor: RgbColor, secondColor: RgbColor) {
  const lighter = Math.max(relativeLuminance(firstColor), relativeLuminance(secondColor))
  const darker = Math.min(relativeLuminance(firstColor), relativeLuminance(secondColor))

  return (lighter + 0.05) / (darker + 0.05)
}

export function chooseSwatchTextTone(
  backgroundValue: string,
  darkTextValue: string,
  lightTextValue: string,
) {
  const background = parseHexColor(backgroundValue)
  const darkText = parseHexColor(darkTextValue)
  const lightText = parseHexColor(lightTextValue)

  if (!background || !darkText || !lightText) return 'dark'

  return contrastRatio(background, darkText) >= contrastRatio(background, lightText)
    ? 'dark'
    : 'light'
}
