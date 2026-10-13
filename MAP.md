# Project map

## Overview

Mezzanine has two parts that share this repository:

- **The library** (`src/`) is the `@decocode/mezzanine` package. `src/index.ts` is its only public entry point. `npm run build:lib` builds it into `dist/`.
- **The showcase** (`site/`) is the website for mezzanine.fly.dev. `site/index.html` provides the `#root` element, `site/main.tsx` mounts `site/AppShell.tsx`. It imports the library as `@decocode/mezzanine`, which `vite.config.ts` resolves to `src/index.ts`. `npm run build:site` builds it into `site-dist/`, which the Docker image serves with nginx on Fly.io.

The library currently exports React Aria `Breadcrumbs`, `Button`, `Checkbox`, `Link`, `RadioGroup`, `Disclosure`, `DisclosureGroup`, `Dialog`, `DialogTrigger`, `Heading`, `Modal`, `ModalOverlay`, `NavigationTree`, `ToggleButton`, `ToggleButtonGroup` and the `Table` family, the semantic `Badge`, composed `IconButton`, `DisclosureHeader`, `TableOfContents`, `PageHeading` and `Navbar` patterns, the icons in active DecoCode use, three official color themes and fifteen public typography classes. Components arrive during extraction from the decocode repository.

## Files and directories

| Path | Purpose |
| --- | --- |
| `site/assets/mezzanine-logo.svg` | Mezzanine brand icon: a Z with a staircase diagonal; standalone SVG using currentColor |
| `src/index.ts` | Public entry point of the package; imports the default tokens and library styles and exports every component |
| `src/components/TabBar.tsx` | Primary route navigation with a More bottom sheet composed from library links, buttons and modal parts |
| `src/components/TabBar.css` | TabBar states, safe-area spacing and responsive bottom-sheet presentation |
| `src/components/useTabBarCapacity.ts` | Observes container and token-sized slot widths to determine how many navigation items fit |
| `site/pages/TabBarPage.tsx` | Live TabBar example and verified composition, overflow and placement guidance |
| `tests/tab-bar.spec.ts` | TabBar overflow, navigation, sheet focus and responsive accessibility regression checks |
| `src/components/Badge.tsx` | Public non-interactive Badge with core and semantic color variants, rendered as a semantic span |
| `src/components/Badge.css` | Token-led styling for Neutral, Violet, Info, Success, Warning and Danger Badges |
| `src/components/Button.tsx` | Public React Aria Button wrapper with Mezzanine variants, sizes, icon content and pending-state progress |
| `src/components/Button.css` | Token-led styling for Button variants and React Aria interaction states |
| `src/components/Breadcrumbs.ts` | Public React Aria Breadcrumbs and Breadcrumb exports and prop types |
| `src/components/Breadcrumbs.css` | Token-led layout and separator styling for Breadcrumbs |
| `src/components/IconButton.tsx` | Public composed icon-only Button requiring a label that can be hidden, above or below |
| `src/components/IconButton.css` | Token-led layout and visible-label styling for IconButton |
| `src/components/TextArea.ts` | Public React Aria TextArea export and type; composes with TextField for multiline input |
| `src/components/TextField.ts` | Public React Aria TextField and Input exports and types |
| `src/components/TextField.css` | Shared TextField, Input and TextArea layout, interaction states and forced-colour styling |
| `site/pages/NavbarPage.tsx` | Composes Navbar content with the shared template and owns the live example state |
| `site/content/badgeContent.tsx` | Badge written guidance, reference entries, related pages and external references |
| `site/content/breadcrumbsContent.tsx` | Breadcrumbs written guidance, reference entries, related pages and external references |
| `site/content/buttonContent.tsx` | Button written guidance, reference entries, related pages and external references |
| `site/content/checkboxContent.tsx` | Checkbox written guidance, reference entries, related pages and external references |
| `site/content/dialogContent.tsx` | Dialog written guidance, reference entries, related pages and external references |
| `site/content/disclosureContent.tsx` | Disclosure written guidance, reference entries, related pages and external references |
| `site/content/linkContent.tsx` | Link written guidance, reference entries, related pages and external references |
| `site/content/navigationTreeContent.tsx` | NavigationTree written guidance, reference entries, related pages and external references |
| `site/content/radioGroupContent.tsx` | RadioGroup written guidance, reference entries, related pages and external references |
| `site/content/tabBarContent.tsx` | TabBar written guidance, reference entries, related pages and external references |
| `site/content/tableContent.tsx` | Table written guidance, reference entries, related pages and external references |
| `site/content/tableOfContentsContent.tsx` | TableOfContents written guidance, reference entries, related pages and external references |
| `site/content/tabsContent.tsx` | Tabs written guidance, reference entries, related pages and external references |
| `site/content/textAreaContent.tsx` | TextArea written guidance, reference entries, related pages and external references |
| `site/content/textFieldContent.tsx` | TextField written guidance, reference entries, related pages and external references |
| `site/content/toggleButtonContent.tsx` | ToggleButton written guidance, reference entries, related pages and external references |
| `site/content/navbarContent.tsx` | Navbar introduction, rich-text guidance and Anatomy, Props and CSS token reference entries |
| `site/components/ComponentExample.tsx` | Shared documentation example frame, preserving the standard CSS and optional example-specific classes |
| `site/components/ComponentReferenceTable.tsx` | Shared Mezzanine Table presentation for named documentation entries and their purposes |
| `tests/navigation-tree-motion.spec.ts` | Checks public tree animation, keyboard expansion and reduced motion including preference changes mid-animation |
| `tests/navbar.spec.ts` | Navbar keyboard, responsive, theme, contrast and forced-colour checks |
| `site/pages/TextAreaPage.tsx` | Multiline field examples, states, composition and vertical resizing guidance |
| `site/pages/TextFieldPage.tsx` | TextField composition, editing, states and local validation examples |
| `tests/text-field.spec.ts` | TextField keyboard, validation, responsive and automated accessibility checks |
| `src/components/Checkbox.tsx` | Public React Aria Checkbox wrapper with selected and indeterminate indicators |
| `src/components/Checkbox.css` | Token-led styling for Checkbox states and interaction feedback |
| `src/components/Link.ts` | Public React Aria Link export and prop types |
| `src/components/Link.css` | Token-led styling for Link interaction states |
| `src/components/NavigationTree.ts` | Public React Aria NavigationTree family, prop types and optional animation-hook export |
| `src/components/NavigationTree.css` | Token-led hierarchy, route and interaction styling, plus optional row animations and reduced-motion rules |
| `src/components/RadioGroup.ts` | Public current React Aria RadioGroup composition exports and prop types |
| `src/components/RadioGroup.css` | Token-led styling for RadioGroup, RadioField, RadioButton and SelectionIndicator |
| `src/components/Disclosure.tsx` | Public React Aria Disclosure family plus the composed DisclosureHeader trigger pattern |
| `src/components/Dialog.ts`, `src/components/Dialog.css` | Public React Aria Dialog, DialogTrigger and Heading exports; token-led content, title, focus and action-footer styling |
| `src/components/Modal.ts`, `src/components/Modal.css` | Public React Aria Modal and ModalOverlay exports; token-led backdrop, responsive container and reduced-motion-aware entry/exit styling |
| `src/components/Disclosure.css` | Token-led styling for Disclosure, DisclosureGroup and DisclosureHeader states |
| `src/icons/Icons.tsx` | Public Mezzanine icon library extracted from the icons in active DecoCode use |
| `src/icons/StudioIcons.tsx` | Public action, navigation, transport and sequencer icons imported from Rhythm Directives' active icon modules |
| `src/components/Table.ts` | Public React Aria Table, TableHeader, Column, Row, TableBody and Cell exports and their prop types |
| `src/components/Tabs.tsx`, `src/components/Tabs.css` | Public Tabs, TabList, Tab and TabPanel APIs, with the official selection-indicator composition and token-based horizontal/vertical styling |
| `src/components/Table.css` | Token-led structural and interaction-state styling for the exported Table parts |
| `src/components/ToggleButton.ts` | Public current React Aria ToggleButton and ToggleButtonGroup exports and prop types |
| `src/components/ToggleButton.css` | Token-led styling for ToggleButton states and ToggleButtonGroup layout |
| `src/tokens.css` | Shared typography, spacing and corner-radius token contract and entry point for the three official color themes |
| `src/themes/light.css` | Neutral Light theme and the fallback when no preference is available |
| `src/themes/dark.css` | Neutral Dark theme, including automatic device-preference handling |
| `src/themes/wireframe.css` | Monochrome Wireframe theme with semantic status colors and blue focus |
| `src/styles.css` | Library stylesheet entry point; imports typography and, as components arrive, their structural styles |
| `src/typography.css` | Fifteen public text-style classes and the Inline code element pattern, assembled from typography tokens |
| `site/index.html` | HTML shell for the showcase site, including its favicon reference |
| `site/favicon.svg` | Staircase Z favicon with neutral-200 background and neutral-950 mark, embedded for use outside the site CSS |
| `site/main.tsx` | Showcase browser entry point; restores and applies the saved theme before rendering |
| `site/AppShell.tsx` | Showcase shell, theme state, landing hero, and empty/not-found views; renders documentation through the route loading boundary |
| `site/pageRegistry.ts` | Maps implemented documentation page IDs to lazy imports so only the requested page loads |
| `site/PageLoader.tsx` | Documentation loading and error states, reload action, and section-link scrolling after a page loads |
| `src/components/PageHeading.tsx` | Public page introduction using Heading, optional description paragraphs and additional content |
| `src/components/PageHeading.css` | Token-based page introduction widths, spacing and fluid title typography |
| `site/templates/ComponentPageTemplate.tsx` | Shared component Docs template: composes the page heading, generated On this page links, technical disclosures and reference sections from page-supplied content |
| `site/components/MezzanineDisclosureGroup.tsx` | Composes Mezzanine disclosures for grouped technical documentation sections |
| `site/components/MezzanineDisclosureGroupLogic.ts` | Opens the containing documentation disclosure for initial, changed and repeated URL anchors before scrolling |
| `tests/documentation-template.spec.ts` | Checks every implemented component page for matching headings and Contents links, unique anchors and narrow-screen reflow |
| `site/components/tokenValueLogic.ts` | Reads current CSS token values when the selected theme changes |
| `site/components/TokenValue.tsx` | Displays a live CSS token value as code |
| `site/content/buttonReferenceData.ts` | Button variant, size and state reference data used by the Button page |
| `site/pages/IntroductionPage.tsx` | Design-system introduction; loaded only when its route is requested |
| `site/pages/ColorPage.tsx` | Palette swatches and semantic color-role reference; loaded only when its route is requested |
| `site/pages/TypographyPage.tsx` | Typography overview; loaded only when its route is requested |
| `site/pages/TextStylesPage.tsx` | Typography specimens, weight modifiers and token reference; loaded only when its route is requested |
| `site/pages/ProsePage.tsx` | List and inline-code examples; loaded only when its route is requested |
| `site/pages/SpacingPage.tsx` | Spacing-scale reference; loaded only when its route is requested |
| `site/pages/ShapePage.tsx` | Corner-radius scale and guidance for styling all corners or individual corners; loaded only when its route is requested |
| `site/pages/ElevationPage.tsx` | Elevation roles and theming guidance; loaded only when its route is requested |
| `site/pages/MotionPage.tsx` | Motion timing, tokens and reduced-motion guidance; loaded only when its route is requested |
| `site/pages/IconsPage.tsx` | Exported icon catalogue; loaded only when its route is requested |
| `site/pages/BadgePage.tsx` | Badge examples and variants; loaded only when its route is requested |
| `site/pages/ButtonPage.tsx` | Button examples, states, sizes and token reference; loaded only when its route is requested |
| `site/pages/ToggleButtonPage.tsx` | Standalone and grouped toggle examples; loaded only when its route is requested |
| `site/pages/NavigationTreePage.tsx` | Hierarchical navigation example; loaded only when its route is requested |
| `site/pages/TableOfContentsPage.tsx` | Showcase table-of-contents examples and props; loaded only when its route is requested |
| `site/pages/BreadcrumbsPage.tsx` | Breadcrumb hierarchy and disabled examples; loaded only when its route is requested |
| `site/pages/TabsPage.tsx` | Tabs documentation content and examples, composed with the shared template; loaded only when requested |
| `site/pages/LinkPage.tsx` | Link states and content examples; loaded only when its route is requested |
| `site/pages/DialogPage.tsx` | Dialog documentation content and modal examples, composed with the shared template; loaded only when requested |
| `site/pages/DisclosurePage.tsx` | Disclosure and DisclosureGroup examples; loaded only when its route is requested |
| `site/pages/CheckboxPage.tsx` | Checkbox example and selection states; loaded only when its route is requested |
| `site/pages/RadioGroupPage.tsx` | RadioGroup anatomy, states, validation and token reference; loaded only when its route is requested |
| `site/pages/TablePage.tsx` | Table selection, sorting, empty-state and anatomy examples; loaded only when its route is requested |
| `src/components/Navbar.tsx` | Public sticky Navbar with brand, navigation and action areas and a React Aria Disclosure mobile menu |
| `src/components/Navbar.css` | Token-based Navbar layout, text-size-aware container breakpoint and reduced-motion-aware menu panel |
| `site/components/ThemeSwitcher.tsx` | Site theme switcher composing Mezzanine toggle buttons for Light, Dark and Wireframe |
| `site/components/MezzanineNavbar.tsx` | Supplies Mezzanine branding, Docs link and separate theme actions to the library Navbar |
| `site/components/Sidebar.tsx` | Responsive nested NavigationTree sidebar, expanding the current page's ancestor groups, including the mobile Browse sections disclosure |
| `src/components/TableOfContents.tsx` | Public Contents navigation composed from Heading and Link, with nested sections and a configurable heading |
| `src/components/TableOfContents.css` | TableOfContents spacing, nested list layout and link targets using shared design tokens |
| `src/components/useAnimatedNavigationTree.ts` | Public optional NavigationTree expansion-animation hook with reduced-motion handling |
| `site/siteStructure.ts` | Single source of truth for nested IA groups, routes, labels, implementation status; Components contains Navigation, Actions and controls, Forms and input, Overlays, and Cards, with the top-navigation page at `/navbar` and remaining pages awaiting categorisation |
| `site/content/foundationData.tsx` | Names and descriptions, with inline code markup for component references, for the implemented color, typography, spacing, corner-radius and motion foundations shown by the showcase |
| `site/content/iconDefinitions.tsx` | Names and rendered examples for every icon exported by Mezzanine |
| `site/tableExampleData.ts` | Table example rows and sorting logic used by the Table documentation page |
| `site/content/radioGroupReferenceData.tsx` | Verified anatomy, state descriptions with inline code markup, and component token names for the RadioGroup documentation page |
| `site/colorContrast.ts` | Contrast calculation used to choose readable text inside palette swatches |
| `site/themeSwitcherLogic.ts` | Theme option validation, system-theme resolution, root-attribute application and saved visitor preference |
| `site/styles.css` | Responsive layout and presentation used only by the showcase site |
| `package.json`, `package-lock.json` | Package name, exports, peer dependencies, dev dependencies, and npm scripts |
| `playwright.config.ts` | Builds and serves the production showcase for Chromium tests, with CI safeguards, HTML reports and failure traces |
| `tests/route-loading.spec.ts` | Verifies route-specific downloads, delayed and failed loads, section links and theme-state preservation |
| `tests/responsive-layout.spec.ts` | Checks Elevation reflow with normal and doubled text, sidebar breakpoints and keyboard disclosure operation |
| `vite.config.ts` | Showcase build: React plugin, `site/` root, package-name alias, `site-dist/` output |
| `vite.lib.config.ts` | Package build: library mode, external peer dependencies, `dist/` output |
| `tsconfig.json` | References the app and node TypeScript projects |
| `tsconfig.app.json` | Type checking for `src/` and `site/`, including the package-name path |
| `tsconfig.node.json` | Type checking for Vite and Playwright configuration files |
| `tsconfig.lib.json` | Emits the package's type declarations into `dist/` |
| `Dockerfile`, `.dockerignore` | Production image: builds the showcase and serves `site-dist/` with nginx |
| `nginx.conf` | Static server for the showcase: allowed routes, real 404s, caching, gzip, and the pre-launch `noindex` header |
| `fly.toml` | Fly.io app `mezzanine`, London region, and HTTP service settings |
| `.githooks/pre-commit` | Gitleaks scan of staged changes |
| `.github/workflows/gitleaks.yml` | Gitleaks scan of the full history for pull requests, pushes to `main`, and manual workflow dispatches |
| `.github/workflows/lighthouse.yml` | Runs mobile and desktop Lighthouse CI audits of the showcase for pull requests, pushes to `main`, and manual workflow dispatches |
| `.github/workflows/playwright.yml` | Runs lint, builds and Chromium tests on pull requests and pushes to `main`, with downloadable reports and failure traces |
| `lighthouserc.mobile.json`, `lighthouserc.desktop.json` | Representative home, Button, Table, TabBar and the Navbar page audits, mobile/desktop profiles, warning-only performance thresholds and local report destinations |
| `scripts/run-lighthouse.mjs` | Runs Lighthouse CI with the configured system Chrome or Playwright Chromium fallback |
| `LICENSE` | All rights reserved: the source is public to view, not licensed for use |
| `docs/TOKENS.md` | Plain-language guide to the token model, official themes, current inventory and naming rules |
| `docs/TYPOGRAPHY.md` | Typography roles, named styles, defaults, pattern mappings, theming guidance, and accessibility checks |
| `README.md` | Overview, licence note, local setup, and how DecoCode products use the package |
| `AGENTS.md` | Instructions for coding agents |

## Commands

Typography retains its overview at `/typography`. Its child pages are
`/typography/text-styles` (responsive Default/Emphasis example table, token reference and line heights) and
`/typography/prose` (lists and inline code). These pages are loaded from `site/pages/` through `site/pageRegistry.ts`;
`site/siteStructure.ts` defines the linked parent and children.

| Command | Purpose |
| --- | --- |
| `npm ci` | Install locked dependencies |
| `npm run dev` | Start the showcase on the local Vite server |
| `npm run lint` | Run Oxlint |
| `npm run typecheck` | Type-check the library, showcase, and configuration |
| `npm run build:lib` | Build the package into `dist/` |
| `npm run build:site` | Type-check and build the showcase into `site-dist/` |
| `npm run build` | Build both the package and the showcase |
| `npm run preview` | Preview the showcase build locally |
| `npm run test:e2e` | Build the showcase and run the route-loading browser tests |
| `npm run lighthouse` | Build the showcase and run the mobile and desktop Lighthouse performance audits |
| `npm run lighthouse:mobile` | Build the showcase and run the mobile Lighthouse audit |
| `npm run lighthouse:desktop` | Build the showcase and run the desktop Lighthouse audit |
| `fly deploy` | Build the Docker image and deploy the showcase to mezzanine.fly.dev |
| `gitleaks git --staged --redact .` | Scan staged changes |

`dist/`, `site-dist/`, `reports/`, and `node_modules/` are generated and ignored by Git.
