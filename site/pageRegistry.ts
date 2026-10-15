// This is the site's directory of implemented pages. It connects each page ID
// (such as 'navbar') to its React component and loads that component only when
// someone visits the page. The page content lives in site/pages/ and site/content/.

import { lazy, type ComponentType } from 'react'

export interface DocumentationPageProps {
  refreshKey: string
}

// Declare lazy components once so theme updates retain each page's local state.
export const pageRegistry: Record<string, ComponentType<DocumentationPageProps>> = {
  home: lazy(() => import('./pages/HomePage')),
  introduction: lazy(() => import('./pages/IntroductionPage')),
  color: lazy(() => import('./pages/ColorPage')),
  typography: lazy(() => import('./pages/TypographyPage')),
  'text-styles': lazy(() => import('./pages/TextStylesPage')),
  prose: lazy(() => import('./pages/ProsePage')),
  foundations: lazy(() => import('./pages/FoundationsPage')),
  accessibility: lazy(() => import('./pages/AccessibilityPage')),
  spacing: lazy(() => import('./pages/SpacingPage')),
  interaction: lazy(() => import('./pages/InteractionPage')),
  shape: lazy(() => import('./pages/ShapePage')),
  elevation: lazy(() => import('./pages/ElevationPage')),
  motion: lazy(() => import('./pages/MotionPage')),
  icons: lazy(() => import('./pages/IconsPage')),
  badge: lazy(() => import('./pages/BadgePage')),
  button: lazy(() => import('./pages/ButtonPage')),
  'toggle-button': lazy(() => import('./pages/ToggleButtonPage')),
  'navigation-tree': lazy(() => import('./pages/NavigationTreePage')),
  'table-of-contents': lazy(() => import('./pages/TableOfContentsPage')),
  breadcrumbs: lazy(() => import('./pages/BreadcrumbsPage')),
  tabs: lazy(() => import('./pages/TabsPage')),
  link: lazy(() => import('./pages/LinkPage')),
  tooltip: lazy(() => import('./pages/TooltipPage')),
  dialog: lazy(() => import('./pages/DialogPage')),
  disclosure: lazy(() => import('./pages/DisclosurePage')),
  checkbox: lazy(() => import('./pages/CheckboxPage')),
  'radio-group': lazy(() => import('./pages/RadioGroupPage')),
  'text-area': lazy(() => import('./pages/TextAreaPage')),
  'text-field': lazy(() => import('./pages/TextFieldPage')),
  'tab-bar': lazy(() => import('./pages/TabBarPage')),
  sidebar: lazy(() => import('./pages/SidebarPage')),
  navbar: lazy(() => import('./pages/NavbarPage')),
  table: lazy(() => import('./pages/TablePage')),
}
