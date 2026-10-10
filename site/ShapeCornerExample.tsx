import { useId, useState } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@decocode/mezzanine'
import { radiusLevels } from './foundationData'

const corners = [
  { id: 'topLeft', label: 'Top-left', property: 'border-top-left-radius' },
  { id: 'topRight', label: 'Top-right', property: 'border-top-right-radius' },
  { id: 'bottomRight', label: 'Bottom-right', property: 'border-bottom-right-radius' },
  { id: 'bottomLeft', label: 'Bottom-left', property: 'border-bottom-left-radius' },
] as const

export function ShapeCornerExample() {
  const labelId = useId()
  const [selectedTokens, setSelectedTokens] = useState({
    topLeft: '--radius-none',
    topRight: '--radius-none',
    bottomRight: '--radius-none',
    bottomLeft: '--radius-none',
  })

  return (
    <div className="component-example shape-corner-example">
      <div className="shape-corner-preview" aria-hidden="true" style={{
        borderTopLeftRadius: `var(${selectedTokens.topLeft})`,
        borderTopRightRadius: `var(${selectedTokens.topRight})`,
        borderBottomRightRadius: `var(${selectedTokens.bottomRight})`,
        borderBottomLeftRadius: `var(${selectedTokens.bottomLeft})`,
      }} />
      <div className="shape-corner-controls">
        {corners.map(({ id, label }) => (
          <div className="shape-corner-control" key={id}>
            <span id={`${labelId}-${id}`}>{label}</span>
            <ToggleButtonGroup
              aria-labelledby={`${labelId}-${id}`}
              selectionMode="single"
              disallowEmptySelection
              selectedKeys={[selectedTokens[id]]}
              onSelectionChange={(keys) => {
                const token = keys.values().next().value
                if (typeof token === 'string') {
                  setSelectedTokens((current) => ({ ...current, [id]: token }))
                }
              }}
            >
              {radiusLevels.map(({ token }) => (
                <ToggleButton key={token} id={token}>{token.replace('--radius-', '')}</ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>
        ))}
      </div>
      <p className="component-example-feedback">Resulting CSS</p>
      <pre className="shape-corner-code"><code>{corners.map(({ id, property }) =>
        `${property}: var(${selectedTokens[id]});`
      ).join('\n')}</code></pre>
    </div>
  )
}
