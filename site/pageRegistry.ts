// This is the site's directory of implemented pages. It connects each page ID
// (such as 'navbar') to its React component and loads that component only when
// someone visits the page. The page content lives in site/pages/ and site/content/.

import { lazy, type ComponentType } from 'react'

// Declare lazy components once so theme updates retain each page's local state.
export const pageRegistry: Record<string, ComponentType> = {
  home: lazy(() => import('./pages/home/HomePage')),
  introduction: lazy(() => import('./pages/get-started/introduction/IntroductionPage')),
  color: lazy(() => import('./pages/styles/color/ColorPage')),
  typography: lazy(() => import('./pages/styles/typography/TypographyPage')),
  'text-styles': lazy(() => import('./pages/styles/typography/text-styles/TextStylesPage')),
  prose: lazy(() => import('./pages/styles/typography/prose/ProsePage')),
  foundations: lazy(() => import('./pages/foundations/FoundationsPage')),
  accessibility: lazy(() => import('./pages/foundations/accessibility/AccessibilityPage')),
  interaction: lazy(() => import('./pages/foundations/interaction/InteractionPage')),
  'target-size': lazy(() => import('./pages/foundations/interaction/target-size/TargetSizePage')),
  text: lazy(() => import('./pages/foundations/text/TextPage')),
  'fluid-text': lazy(() => import('./pages/foundations/text/fluid-text/FluidTextPage')),
  'reading-direction': lazy(() => import('./pages/foundations/text/reading-direction/ReadingDirectionPage')),
  shape: lazy(() => import('./pages/styles/shape/ShapePage')),
  corners: lazy(() => import('./pages/styles/shape/corners/CornersPage')),
  borders: lazy(() => import('./pages/styles/shape/borders/BordersPage')),
  elevation: lazy(() => import('./pages/styles/elevation/ElevationPage')),
  motion: lazy(() => import('./pages/styles/motion/MotionPage')),
  icons: lazy(() => import('./pages/styles/icons/IconsPage')),
  badge: lazy(() => import('./pages/components/badge/BadgePage')),
  card: lazy(() => import('./pages/components/cards/card/CardPage')),
  'code-block': lazy(() => import('./pages/components/code-block/CodeBlockPage')),
  button: lazy(() => import('./pages/components/actions-and-controls/button/ButtonPage')),
  'toggle-button': lazy(() => import('./pages/components/actions-and-controls/toggle-button/ToggleButtonPage')),
  'navigation-tree': lazy(() => import('./pages/components/navigation/navigation-tree/NavigationTreePage')),
  'table-of-contents': lazy(() => import('./pages/components/navigation/table-of-contents/TableOfContentsPage')),
  breadcrumbs: lazy(() => import('./pages/components/navigation/breadcrumbs/BreadcrumbsPage')),
  tabs: lazy(() => import('./pages/components/navigation/tabs/TabsPage')),
  link: lazy(() => import('./pages/components/navigation/link/LinkPage')),
  tooltip: lazy(() => import('./pages/components/overlays/tooltip/TooltipPage')),
  dialog: lazy(() => import('./pages/components/overlays/dialog/DialogPage')),
  disclosure: lazy(() => import('./pages/components/disclosure/DisclosurePage')),
  checkbox: lazy(() => import('./pages/components/forms-and-input/checkbox/CheckboxPage')),
  'radio-group': lazy(() => import('./pages/components/forms-and-input/radio-group/RadioGroupPage')),
  'text-area': lazy(() => import('./pages/components/forms-and-input/text-area/TextAreaPage')),
  'text-field': lazy(() => import('./pages/components/forms-and-input/text-field/TextFieldPage')),
  'tab-bar': lazy(() => import('./pages/components/navigation/tab-bar/TabBarPage')),
  sidebar: lazy(() => import('./pages/components/navigation/sidebar/SidebarPage')),
  navbar: lazy(() => import('./pages/components/navigation/navbar/NavbarPage')),
  table: lazy(() => import('./pages/components/table/TablePage')),
}
