import { useState } from 'react'
import { DemoBlock, ThemeSwitcher, type ButtonHierarchy, type ButtonSize, type ThemeName } from '@decocode/mezzanine'
import { PanelSelect } from '../../../../components/PanelSelect'
import { ContentPage } from '../../../../templates/ContentPage'
import {
  themeSwitcherContent, themeSwitcherExampleCode, themeSwitcherHierarchies, themeSwitcherIconPositions,
  themeSwitcherLabels, themeSwitcherSizes, themeSwitcherTooltipPositions,
} from './themeSwitcherContent'
import './themeSwitcher.css'

// The example applies the chosen theme to its own box, as an app applies it to the page.
export default function ThemeSwitcherPage() {
  const [theme, setTheme] = useState<ThemeName>('light')
  const [label, setLabel] = useState<(typeof themeSwitcherLabels)[number]>('Theme')
  const [iconPosition, setIconPosition] = useState<(typeof themeSwitcherIconPositions)[number]>('iconOnly')
  const [size, setSize] = useState<ButtonSize>('sm')
  const [hierarchy, setHierarchy] = useState<ButtonHierarchy>('secondary')
  const [tooltipPosition, setTooltipPosition] = useState<(typeof themeSwitcherTooltipPositions)[number]>('top')
  return (
    <ContentPage
      content={themeSwitcherContent}
      parts={{
        example: (
          <DemoBlock
            codeView={themeSwitcherExampleCode({ label, iconPosition, size, hierarchy, tooltipPosition })}
            endPanel={<>
              <PanelSelect label="label" options={themeSwitcherLabels} value={label} onChange={setLabel} />
              <PanelSelect label="iconPosition" options={themeSwitcherIconPositions} value={iconPosition} onChange={setIconPosition} />
              <PanelSelect label="size" options={themeSwitcherSizes} value={size} onChange={setSize} />
              <PanelSelect label="hierarchy" options={themeSwitcherHierarchies} value={hierarchy} onChange={setHierarchy} />
              {iconPosition === 'iconOnly' && <PanelSelect label="tooltipPosition" options={themeSwitcherTooltipPositions} value={tooltipPosition} onChange={setTooltipPosition} />}
            </>}
          >
            <div className="theme-switcher-example" data-theme={theme}>
              <ThemeSwitcher selectedTheme={theme} onThemeChange={setTheme} label={label} iconPosition={iconPosition} size={size} hierarchy={hierarchy} tooltipPosition={tooltipPosition} />
            </div>
          </DemoBlock>
        ),
      }}
    />
  )
}
