// Connects each implemented page in siteStructure.ts to its component, which lives in the page's
// folder in site/pages (see sitePageFolder), and loads that component only when someone visits it.

import { lazy, type ComponentType } from 'react'
import { sitePageFile, sitePageFolder, sitePages } from './siteStructure'

const pageModules = import.meta.glob<{ default: ComponentType }>('./pages/**/*Page.tsx')

// Declare lazy components once so theme updates retain each page's local state.
export const pageRegistry: Record<string, ComponentType> = Object.fromEntries(
  sitePages.filter((page) => page.status === 'implemented').map((page) => {
    const file = `./pages/${sitePageFolder(page.id)}/${sitePageFile(page.id)}`
    const load = pageModules[file]
    if (!load) throw new Error(`Page "${page.id}" should be at site/${file.slice(2)}.`)
    return [page.id, lazy(load)]
  }),
)
