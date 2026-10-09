import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { applyThemeSelection, readStoredThemeSelection } from './themeSelection'
import './styles.css'

const root = document.getElementById('root')
if (!root) throw new Error('Mezzanine site: #root element not found')

const initialThemeSelection = readStoredThemeSelection()
applyThemeSelection(initialThemeSelection)

createRoot(root).render(
  <StrictMode>
    <App initialThemeSelection={initialThemeSelection} />
  </StrictMode>,
)
