import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppShell } from './AppShell'
import { applyThemeSelection, readStoredThemeSelection } from './themeSelection'
import './styles.css'

const root = document.getElementById('root')
if (!root) throw new Error('Mezzanine site: #root element not found')

const initialThemeSelection = readStoredThemeSelection()
applyThemeSelection(initialThemeSelection)

createRoot(root).render(
  <StrictMode>
    <AppShell initialThemeSelection={initialThemeSelection} />
  </StrictMode>,
)
