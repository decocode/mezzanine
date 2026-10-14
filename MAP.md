# Project map

## Overview

Mezzanine has two parts that share this repository:

- **The library** (`src/`) is the `@decocode/mezzanine` package. `src/index.ts` is its only public entry point. `npm run build:lib` builds it into `dist/`.
- **The showcase** (`site/`) is the website for mezzanine.fly.dev. `site/index.html` provides the `#root` element, `site/main.tsx` mounts `site/AppShell.tsx`. It imports the library as `@decocode/mezzanine`, which `vite.config.ts` resolves to `src/index.ts`. `npm run build:site` builds it into `site-dist/`, which the Docker image serves with nginx on Fly.io.

The library currently exports React Aria `Breadcrumbs`, `Button`, `Checkbox`, `Link`, `RadioGroup`, `Disclosure`, `DisclosureGroup`, `Dialog`, `DialogTrigger`, `Heading`, `Modal`, `ModalOverlay`, `NavigationTree`, `ToggleButton`, `ToggleButtonGroup` and the `Table` family, the semantic `Badge`, composed `DisclosureHeader`, `TableOfContents`, `Navbar` and `Sidebar` patterns, the icons in active DecoCode use, three official color themes and fifteen public typography classes. Components arrive during extraction from the decocode repository.

## Files and directories

| Path | Purpose |
| --- | --- |
| `site/components/DocsTableOfContents.tsx` | Page contents rendered in the right sidebar, with a drawer on narrow screens |
| `site/components/docsContentsContext.ts` | Shares the AppShell contents destination with documentation pages |
| `site/lab/LabShell.tsx` | Experimental /site/lab shell using Navbar, Sidebar and responsive navigation |
| `site/lab/lab.css` | Fixed viewport layout, independent scrolling and responsive rail placement |
| `site/lab/labContent.ts` | Lab control labels and navigation destinations |
| `tests/lab.spec.ts` | Desktop layout and narrow-screen drawer regression checks |
| `site/assets/mezzanine-logo.svg` | Mezzanine brand icon: a Z with a staircase diagonal; standalone SVG using currentColor |
| `src/components/Sidebar.tsx` | Public Sidebar state boundary, Button-based SidebarTrigger and generic inline or modal SidebarPanel with optional compact rail, permanent inline expansion and optional inline header |
| `src/components/sidebarState.ts` | Internal sidebar context and responsive media-query subscription |
| `src/components/Sidebar.css` | Token-based sidebar regions, left/right placement, rail and modal drawer styling |
| `site/pages/SidebarPage.tsx` | Real Sidebar examples for mixed content, collapse options, multiple independent panels and the actual documentation sidebar |
| `site/content/sidebarContent.tsx` | Sidebar guidance, prop and token references, and neutral example labels |
| `site/assets/sidebar-example.svg` | Neutral geometric image demonstrating sidebar content composition |
| `tests/sidebar.spec.ts` | Sidebar collapse, independent state, modal focus, responsiveness and accessibility checks |
| `src/index.ts` | Public entry point of the package; imports the default tokens and library styles and exports every component |
| `src/components/TabBar.tsx` | Primary route navigation with built-in capacity measurement and a More bottom sheet composed from library links, buttons and modal parts |
| `src/components/TabBar.css` | TabBar states, safe-area spacing and responsive bottom-sheet presentation |
| `site/pages/TabBarPage.tsx` | Live TabBar example and verified composition, overflow and placement guidance |
| `tests/tab-bar.spec.ts` | TabBar overflow, navigation, sheet focus and responsive accessibility regression checks |
| `src/components/Tooltip.tsx` | React Aria Tooltip exports and TooltipTrigger with a configurable 500ms default hover delay |
| `src/components/Tooltip.css` | Token-based tooltip layout, fade animation, reduced-motion and forced-colour rules |
| `tests/tooltip.spec.ts` | Theme tooltip hover, keyboard dismissal, responsive positioning and accessibility checks |
| `src/components/Badge.tsx` | Public non-interactive Badge with core and semantic color variants, rendered as a semantic span |
| `src/components/Badge.css` | Token-led styling for Neutral, Violet, Info, Success, Warning and Danger Badges |
| `src/components/Button.tsx` | Public Button: React Aria Button for actions or Link when href is supplied, sharing variants, sizes and icon layout; pending state is action-only |
| `src/components/Button.css` | Shared Button/ToggleButton size recipes, Button variants and React Aria interaction states |
| `src/components/Breadcrumbs.ts` | Public React Aria Breadcrumbs and Breadcrumb exports and prop types |
| `src/components/Breadcrumbs.css` | Token-led layout and separator styling for Breadcrumbs |
| `src/components/TextArea.ts` | Public React Aria TextArea export and type; composes with TextField for multiline input |
| `src/components/TextField.ts` | Public React Aria TextField and Input exports and types |
| `src/components/TextField.css` | Shared TextField, Input and TextArea layout, interaction states and forced-colour styling |
| `site/pages/NavbarPage.tsx` | Composes Navbar content with the shared template and owns the live example state |
| `site/content/badgeContent.tsx` | Badge written guidance, reference entries, related pages and external references |
| `site/content/breadcrumbsContent.tsx` | Breadcrumbs written guidance, reference entries, related pages and external references |
| `site/content/buttonContent.tsx` | Button guidance, variants, sizes, states, token descriptions, related pages and references |
| `site/content/checkboxContent.tsx` | Checkbox written guidance, reference entries, related pages and external references |
| `site/content/dialogContent.tsx` | Dialog written guidance, reference entries, related pages and external references |
| `site/content/disclosureContent.tsx` | Disclosure written guidance, reference entries, related pages and external references |
| `site/content/linkContent.tsx` | Link written guidance, reference entries, related pages and external references |
| `site/content/navigationTreeContent.tsx` | NavigationTree written guidance, reference entries, related pages and external references |
| `site/content/radioGroupContent.tsx` | RadioGroup guidance, anatomy, states, token descriptions, related pages and references |
| `site/content/tabBarContent.tsx` | TabBar written guidance, reference entries, related pages and external references |
| `site/content/tableContent.tsx` | Table sample rows and column definitions, written guidance, reference entries, related pages and external references |
| `site/content/tableOfContentsContent.tsx` | TableOfContents written guidance, reference entries, related pages and external references |
| `site/content/tabsContent.tsx` | Tabs written guidance, reference entries, related pages and external references |
| `site/content/textAreaContent.tsx` | TextArea written guidance, reference entries, related pages and external references |
| `site/content/textFieldContent.tsx` | TextField written guidance, reference entries, related pages and external references |
| `site/content/toggleButtonContent.tsx` | ToggleButton written guidance, reference entries, related pages and external references |
| `site/content/navbarContent.tsx` | Navbar introduction, rich-text guidance and Anatomy, Props and CSS token reference entries |
| `site/components/ExampleZone.tsx` | Shared documentation example frame, preserving the standard CSS and optional example-specific classes |
| `site/components/DocsTable.tsx` | Shared Mezzanine Table presentation for named documentation entries and their purposes |
| `tests/navigation-tree-motion.spec.ts` | Checks public tree animation, keyboard expansion and reduced motion including preference changes mid-animation |
| `tests/wireframe-links.spec.ts` | Checks Wireframe underlines across link patterns and narrow layouts while preserving Light and Dark treatments |
| `tests/navbar.spec.ts` | Navbar keyboard, responsive, theme, contrast and forced-colour checks |
| `site/pages/TextAreaPage.tsx` | Multiline field examples, states, composition and vertical resizing guidance |
| `site/pages/TextFieldPage.tsx` | TextField composition, editing, states and local validation examples |
| `tests/text-field.spec.ts` | TextField keyboard, validation, responsive and automated accessibility checks |
| `src/components/Checkbox.tsx` | Public React Aria Checkbox wrapper with selected and indeterminate indicators |
| `src/components/Checkbox.css` | Token-led styling for Checkbox states and interaction feedback |
| `src/components/Link.ts` | Public React Aria Link export and prop types |
| `src/components/Link.css` | Token-led styling for Link interaction states |
| `src/components/NavigationTree.ts` | Public React Aria NavigationTree family, prop types and optional expansion-animation hook with reduced-motion handling |
| `src/components/NavigationTree.css` | Token-led hierarchy, route and interaction styling, plus optional row animations and reduced-motion rules |
| `src/components/RadioGroup.ts` | Public current React Aria RadioGroup composition exports and prop types |
| `src/components/RadioGroup.css` | Token-led styling for RadioGroup, RadioField, RadioButton and SelectionIndicator |
| `src/components/Disclosure.tsx` | Public React Aria Disclosure family plus the composed DisclosureHeader trigger pattern |
| `src/components/Dialog.ts`, `src/components/Dialog.css` | Public React Aria Dialog and DialogTrigger exports; token-led content, title, focus and action-footer styling |
| `src/components/Label.ts` | Public React Aria Label export and prop type |
| `src/components/Text.ts` | Public React Aria Text export and prop type |
| `src/components/FieldError.ts` | Public React Aria FieldError export and prop and render-prop types |
| `src/components/SelectionIndicator.ts` | Public React Aria SelectionIndicator export and prop type |
| `src/components/Heading.ts` | Public React Aria Heading export and prop type |
| `src/components/Modal.ts`, `src/components/Modal.css` | Public React Aria Modal and ModalOverlay exports; token-led backdrop, responsive container and reduced-motion-aware entry/exit styling |
| `src/components/Disclosure.css` | Token-led styling for Disclosure, DisclosureGroup and DisclosureHeader states |
| `src/icons/Icons.tsx` | Public Mezzanine icon library extracted from the icons in active DecoCode use |
| `src/icons/StudioIcons.tsx` | Public action, navigation, transport and sequencer icons imported from Rhythm Directives' active icon modules |
| `src/components/Table.tsx` | React Aria Table parts and a Column wrapper that adds a shared sort-direction indicator |
| `tests/table.spec.ts` | Table sorting interactions, keyboard and pointer activation, sort indicators and responsive contrast checks |
| `src/components/Tabs.tsx`, `src/components/Tabs.css` | Public Tabs, TabList, Tab and TabPanel APIs, with the official selection-indicator composition and token-based horizontal/vertical styling |
| `src/components/Table.css` | Token-led structural and interaction-state styling for the exported Table parts |
| `tests/toggle-button.spec.ts` | Secondary toggle selection, keyboard, theme, responsive and forced-colour checks |
| `src/components/ToggleButton.ts` | React Aria ToggleButton and ToggleButtonGroup with shared button sizes, icon content, optional secondary appearance and preserved selection APIs |
| `src/components/ToggleButton.css` | Token-led styling for ToggleButton states and ToggleButtonGroup layout |
| `src/tokens.css` | Shared typography, spacing and corner-radius token contract and entry point for the three official color themes |
| `src/themes/light.css` | Neutral Light theme and the fallback when no preference is available |
| `src/themes/dark.css` | Neutral Dark theme, including automatic device-preference handling |
| `src/themes/wireframe.css` | Monochrome Wireframe theme with semantic status colors and blue focus |
| `src/styles.css` | Library stylesheet entry point; imports typography and, as components arrive, their structural styles |
| `src/typography.css` | Fifteen public text-style classes and the Inline code element pattern, assembled from typography tokens |
| `site/index.html` | HTML shell for the showcase site, including its favicon reference |
| `site/public/robots.txt` | Served unchanged at `/robots.txt`; allows crawling so search engines can read the pre-launch `noindex` response header |
| `site/favicon.svg` | Staircase Z favicon with neutral-200 background and neutral-950 mark, embedded for use outside the site CSS |
| `site/main.tsx` | Showcase browser entry point; restores and applies the saved theme before rendering |
| `site/AppShell.tsx` | Site layout, theme state and route selection; delegates page rendering to page components and the loading boundary |
| `site/pages/HomePage.tsx` | Home hero and wordmark composition using the separate Home content |
| `site/content/homeContent.ts` | Home attribution, title, description and documentation link |
| `site/content/siteContent.ts` | Shared site name, skip-link label and not-found/not-implemented messages |
| `site/pages/NotFoundPage.tsx` | Unknown-route heading and return-home link |
| `site/pages/NotImplementedPage.tsx` | WIP page heading and not-implemented message |
| `site/pageRegistry.ts` | Maps implemented documentation page IDs to lazy imports so only the requested page loads |
| `site/PageLoader.tsx` | Documentation loading and error states, reload action, and section-link scrolling after a page loads |
| `site/templates/ComponentPageTemplate.tsx` | Shared component Docs template: owns the site-only PageHeading presentation and composes it with generated On this page links, technical disclosures and reference sections from page-supplied content |
| `site/components/DocsDisclosureGroup.tsx` | Composes Mezzanine disclosures for grouped technical documentation sections |
| `site/components/DocsDisclosureGroupLogic.ts` | Opens the containing documentation disclosure for initial, changed and repeated URL anchors before scrolling |
| `tests/documentation-template.spec.ts` | Checks every implemented component page for matching headings and Contents links, unique anchors and narrow-screen reflow |
| `site/components/tokenValueLogic.ts` | Reads current CSS token values when the selected theme changes |
| `site/components/TokenValue.tsx` | Displays a live CSS token value as code |
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
| `site/pages/TooltipPage.tsx` | Live Tooltip example and shared-template documentation under Overlays |
| `site/content/tooltipContent.tsx` | Tooltip introduction, anatomy, behaviour, usage, props, tokens and reference links |
| `site/pages/DialogPage.tsx` | Dialog documentation content and modal examples, composed with the shared template; loaded only when requested |
| `site/pages/DisclosurePage.tsx` | Disclosure and DisclosureGroup examples; loaded only when its route is requested |
| `site/pages/CheckboxPage.tsx` | Checkbox example and selection states; loaded only when its route is requested |
| `site/pages/RadioGroupPage.tsx` | RadioGroup anatomy, states, validation and token reference; loaded only when its route is requested |
| `site/pages/TablePage.tsx` | Table selection, sorting, empty-state and anatomy examples; loaded only when its route is requested |
| `src/components/Navbar.tsx` | Public sticky Navbar with brand, navigation and action areas and a React Aria Disclosure mobile menu |
| `src/components/Navbar.css` | Token-based Navbar layout, text-size-aware container breakpoint and reduced-motion-aware menu panel |
| `site/components/ThemeSwitcher.tsx` | Site theme switcher composing Mezzanine toggle buttons for Light, Dark and Wireframe |
| `site/components/MezzanineNavbar.tsx` | Supplies Mezzanine branding, Docs link and separate theme actions to the library Navbar |
| `site/components/Sidebar.tsx` | Docs composition of the public non-collapsible SidebarPanel, mobile Disclosure and on-demand navigation with loading and error states |
| `site/components/SidebarNavigation.tsx` | On-demand nested NavigationTree, expanding the current page's ancestor groups |
| `site/components/useSidebarNavigationVisibility.ts` | Observes when CSS makes the desktop sidebar visible, including text-size changes, before requesting navigation |
| `src/components/TableOfContents.tsx` | Public Contents navigation composed from Heading and Link, with nested sections and a configurable heading |
| `src/components/TableOfContents.css` | TableOfContents spacing, nested list layout and link targets using shared design tokens |
| `site/siteStructure.ts` | Single source of truth for nested IA groups, routes, labels, implementation status; Components contains Navigation, Actions and controls, Forms and input, Overlays, and Cards, with the top-navigation page at `/navbar` and remaining pages awaiting categorisation |
| `site/content/colorContent.ts` | Colour palette descriptions, shade steps and semantic colour-role reference entries |
| `site/content/textStylesContent.ts` | Typography style names, purposes and associated token names |
| `site/content/spacingContent.ts` | Spacing scale steps displayed on the Spacing page |
| `site/content/shapeContent.ts` | Corner-radius labels and token names displayed on the Shape page |
| `site/content/elevationContent.ts` | Elevation names, descriptions and token names |
| `site/content/motionContent.tsx` | Motion timing, token and reduced-motion reference descriptions |
| `site/content/iconsContent.tsx` | Names and rendered examples for every icon exported by Mezzanine |
| `site/components/ColorSwatch.tsx` | Displays a palette shade, its number and resolved colour value with readable text |
| `site/components/colorSwatchLogic.ts` | Contrast calculation used to choose light or dark text inside ColorSwatch |
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
| `lighthouserc.mobile.json`, `lighthouserc.desktop.json` | Representative home, Button, Table, TabBar, Navbar and Tooltip page audits, mobile/desktop profiles, warning-only performance thresholds and local report destinations |
| `scripts/check-rules.mjs` | Checks documentation controls, component class prefixes, library CSS colours, shared button sizing and the public API snapshot; supports explicit `--update-api` |
| `scripts/public-api.snapshot.json` | Reviewed public export names and value/type categories used to detect API changes |
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
| `npm run check:rules` | Check the five repository rules without changing the API snapshot |
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
