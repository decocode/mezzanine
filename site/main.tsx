import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppShell } from './AppShell'
import { applyTheme, readStoredTheme } from './themeSwitcherLogic'
import './styles.css'

const root = document.getElementById('root')
if (!root) throw new Error('Mezzanine site: #root element not found')

const initialTheme = readStoredTheme()
applyTheme(initialTheme)

createRoot(root).render(
  <StrictMode>
    <AppShell initialTheme={initialTheme} />
  </StrictMode>,
)
