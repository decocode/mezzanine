import type { ColorPaletteDefinition } from '../content/colorContent'
import { chooseSwatchTextTone } from './colorSwatchLogic'
import { useTokenValue } from './tokenValueLogic'

export function ColorSwatch({
  darkTextValue,
  lightTextValue,
  paletteId,
  step,
}: {
  darkTextValue: string
  lightTextValue: string
  paletteId: ColorPaletteDefinition['id']
  step: number
}) {
  const token = `--color-${paletteId}-${step}`
  const value = useTokenValue(token)
  const textTone = chooseSwatchTextTone(value, darkTextValue, lightTextValue)

  return (
    <li className="color-palette-step">
      <span
        className="color-palette-swatch"
        style={{
          backgroundColor: `var(${token})`,
          color: textTone === 'dark'
            ? 'var(--color-neutral-950)'
            : 'var(--color-neutral-50)',
        }}
      >
        <strong className="color-palette-step-number">{step}</strong>
      </span>
      <code>{value}</code>
    </li>
  )
}
