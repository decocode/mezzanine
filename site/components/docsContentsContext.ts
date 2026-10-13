import { createContext } from 'react'

// The AppShell owns placement; each page owns its section definitions.
export const DocsContentsContext = createContext<HTMLDivElement | null>(null)
