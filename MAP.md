# Project map

## Overview

Mezzanine has two parts that share this repository:

- **The library** (`src/`) is the `@decocode/mezzanine` package. `src/index.ts` is its only public entry point. `npm run build:lib` builds it into `dist/`.
- **The showcase** (`site/`) is the website for mezzanine.fly.dev. `site/index.html` provides the `#root` element, `site/main.tsx` mounts `site/App.tsx`. It imports the library as `@decocode/mezzanine`, which `vite.config.ts` resolves to `src/index.ts`. `npm run build:site` builds it into `site-dist/`, which the Docker image serves with nginx on Fly.io.

The library currently exports React Aria `Breadcrumbs`, `Button`, `Checkbox`, `Link`, `RadioGroup`, `Disclosure`, `DisclosureGroup`, `Dialog`, `DialogTrigger`, `Heading`, `Modal`, `ModalOverlay`, `NavigationTree`, `ToggleButton`, `ToggleButtonGroup` and the `Table` family, the semantic `Badge`, composed `IconButton` and `DisclosureHeader` patterns, the icons in active DecoCode use, three official color themes and fifteen public typography classes. Components arrive during extraction from the decocode repository.

## Files and directories

| Path | Purpose |
| --- | --- |
| `src/index.ts` | Public entry point of the package; imports the default tokens and library styles and exports every component |
| `src/components/Badge.tsx` | Public non-interactive Badge with core and semantic color variants, rendered as a semantic span |
| `src/components/Badge.css` | Token-led styling for Neutral, Violet, Info, Success, Warning and Danger Badges |
| `src/components/Button.tsx` | Public React Aria Button wrapper with Mezzanine variants, sizes, icon content and pending-state progress |
| `src/components/Button.css` | Token-led styling for Button variants and React Aria interaction states |
| `src/components/Breadcrumbs.ts` | Public React Aria Breadcrumbs and Breadcrumb exports and prop types |
| `src/components/Breadcrumbs.css` | Token-led layout and separator styling for Breadcrumbs |
| `src/components/IconButton.tsx` | Public composed icon-only Button requiring a label that can be hidden, above or below |
| `src/components/IconButton.css` | Token-led layout and visible-label styling for IconButton |
| `src/components/Checkbox.tsx` | Public React Aria Checkbox wrapper with selected and indeterminate indicators |
| `src/components/Checkbox.css` | Token-led styling for Checkbox states and interaction feedback |
| `src/components/Link.ts` | Public React Aria Link export and prop types |
| `src/components/Link.css` | Token-led styling for Link interaction states |
| `src/components/NavigationTree.ts` | Public React Aria NavigationTree family exports and prop types |
| `src/components/NavigationTree.css` | Token-led styling for NavigationTree hierarchy, routes and interaction states |
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
| `site/TabsExamples.tsx` | Tabs examples, anatomy, props and keyboard guidance for the existing `/tabs` route |
| `src/components/Table.css` | Token-led structural and interaction-state styling for the exported Table parts |
| `src/components/ToggleButton.ts` | Public current React Aria ToggleButton and ToggleButtonGroup exports and prop types |
| `src/components/ToggleButton.css` | Token-led styling for ToggleButton states and ToggleButtonGroup layout |
| `src/tokens.css` | Shared typography, spacing and corner-radius token contract and entry point for the three official color themes |
| `src/themes/light.css` | Neutral Light theme and the fallback when no preference is available |
| `src/themes/dark.css` | Neutral Dark theme, including automatic device-preference handling |
| `src/themes/wireframe.css` | Monochrome Wireframe theme with semantic status colors and blue focus |
| `src/styles.css` | Library stylesheet entry point; imports typography and, as components arrive, their structural styles |
| `src/typography.css` | Fifteen public text-style classes and the Inline code element pattern, assembled from typography tokens |
| `site/index.html` | HTML shell for the showcase site |
| `site/main.tsx` | Showcase browser entry point; restores and applies the saved theme before rendering |
| `site/App.tsx` | Route-aware showcase shell, landing hero, implemented documentation content, and explicit empty-page state |
| `site/Header.tsx` | Responsive showcase header with React Aria links, an icon-only Mezzanine ToggleButtonGroup theme switcher and Disclosure hamburger menu |
| `site/Sidebar.tsx` | Responsive nested NavigationTree sidebar, expanding the current page's ancestor groups, including the mobile Browse sections disclosure |
| `site/TableOfContents.tsx` | Reusable site-level Contents navigation with nested child links and a configurable heading, composing Mezzanine Link with section anchors; documented at `/table-of-contents` under Navigation |
| `site/DialogExamples.tsx` | Modal and confirmation-dialog examples, anatomy and accessibility guidance for `/dialog` under Components → Overlays |
| `site/ShapeCornerExample.tsx` | Independent single-select corner-radius ToggleButtonGroups, defaulting to none, with a live shape preview and resulting CSS |
| `site/useAnimatedNavigationTree.ts` | Shared expansion state and reduced-motion handling for NavigationTree reveal and collapse motion |
| `site/siteNavigation.ts` | Single source of truth for nested IA groups, routes, labels, implementation status and verified React Aria documentation matches; Components contains Navigation, Actions and controls, Forms and input, Overlays, and Cards, with remaining pages awaiting categorisation |
| `site/foundationData.tsx` | Names and descriptions, with inline code markup for component references, for the implemented color, typography, spacing, corner-radius and motion foundations shown by the showcase |
| `site/iconDefinitions.tsx` | Names and rendered examples for every icon exported by Mezzanine |
| `site/tableExampleData.ts` | Table anatomy content, example rows and sorting logic used by the Table documentation page |
| `site/radioGroupDocumentation.tsx` | Verified anatomy, state descriptions with inline code markup, and component token names for the RadioGroup documentation page |
| `site/componentTokenDocumentation.ts` | Verified Tabs and Dialog/Modal token names and descriptions for their documentation tables |
| `site/colorContrast.ts` | Contrast calculation used to choose readable text inside palette swatches |
| `site/themeSelection.ts` | Theme option validation, root-attribute application and saved visitor preference |
| `site/styles.css` | Responsive layout and presentation used only by the showcase site |
| `package.json`, `package-lock.json` | Package name, exports, peer dependencies, dev dependencies, and npm scripts |
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
| `lighthouserc.mobile.json`, `lighthouserc.desktop.json` | Lighthouse page coverage of the showcase, device profiles, performance assertions, and local report destinations |
| `scripts/run-lighthouse.mjs` | Runs Lighthouse CI with the configured system Chrome or Playwright Chromium fallback |
| `LICENSE` | All rights reserved: the source is public to view, not licensed for use |
| `TOKENS.md` | Plain-language guide to the token model, official themes, current inventory and naming rules |
| `TYPOGRAPHY.md` | Typography roles, named styles, defaults, pattern mappings, theming guidance, and accessibility checks |
| `README.md` | Overview, licence note, local setup, and how DecoCode products use the package |
| `AGENTS.md` | Instructions for coding agents |

## Commands

Typography retains its overview at `/typography`. Its child pages are
`/typography/text-styles` (full-width text-style specimens and line heights) and
`/typography/prose` (lists and inline code). These pages are rendered by
`site/App.tsx`; `site/siteNavigation.ts` defines the linked parent and children.

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
| `npm run lighthouse` | Build the showcase and run the mobile and desktop Lighthouse performance audits |
| `npm run lighthouse:mobile` | Build the showcase and run the mobile Lighthouse audit |
| `npm run lighthouse:desktop` | Build the showcase and run the desktop Lighthouse audit |
| `fly deploy` | Build the Docker image and deploy the showcase to mezzanine.fly.dev |
| `gitleaks git --staged --redact .` | Scan staged changes |

`dist/`, `site-dist/`, `reports/`, and `node_modules/` are generated and ignored by Git.
