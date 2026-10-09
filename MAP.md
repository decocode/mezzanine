# Project map

## Overview

Mezzanine has two parts that share this repository:

- **The library** (`src/`) is the `@decocode/mezzanine` package. `src/index.ts` is its only public entry point. `npm run build:lib` builds it into `dist/`.
- **The showcase** (`site/`) is the website for mezzanine.fly.dev. `site/index.html` provides the `#root` element, `site/main.tsx` mounts `site/App.tsx`. It imports the library as `@decocode/mezzanine`, which `vite.config.ts` resolves to `src/index.ts`. `npm run build:site` builds it into `site-dist/`, which the Docker image serves with nginx on Fly.io.

The library currently exports React Aria `Button` and the `Table` family, the icons in active DecoCode use, three official color themes and fifteen public typography classes. Components arrive during extraction from the decocode repository.

## Files and directories

| Path | Purpose |
| --- | --- |
| `src/index.ts` | Public entry point of the package; imports the default tokens and library styles and exports every component |
| `src/components/Button.tsx` | Public React Aria Button wrapper with Mezzanine variants, sizes, icon content and pending-state progress |
| `src/components/Button.css` | Token-led styling for Button variants and React Aria interaction states |
| `src/icons/Icons.tsx` | Public Mezzanine icon library extracted from the icons in active DecoCode use |
| `src/icons/StudioIcons.tsx` | Public action, navigation, transport and sequencer icons imported from Rhythm Directives' active icon modules |
| `src/components/Table.ts` | Public React Aria Table, TableHeader, Column, Row, TableBody and Cell exports and their prop types |
| `src/components/Table.css` | Token-led structural and interaction-state styling for the exported Table parts |
| `src/tokens.css` | Shared typography token contract and entry point for the three official color themes |
| `src/themes/light.css` | Neutral Light theme and the fallback when no preference is available |
| `src/themes/dark.css` | Neutral Dark theme, including automatic device-preference handling |
| `src/themes/wireframe.css` | Monochrome Wireframe theme with semantic status colors and blue focus |
| `src/styles.css` | Library stylesheet entry point; imports typography and, as components arrive, their structural styles |
| `src/typography.css` | Fifteen public text-style classes with predictable single-class specificity, assembled from typography tokens |
| `site/index.html` | HTML shell for the showcase site |
| `site/main.tsx` | Showcase browser entry point; restores and applies the saved theme before rendering |
| `site/App.tsx` | Route-aware showcase shell, landing hero, implemented documentation content, and explicit empty-page state |
| `site/Header.tsx` | Responsive showcase header with React Aria links, theme Select and Disclosure hamburger menu |
| `site/Sidebar.tsx` | Responsive React Aria sidebar navigation, including the mobile Browse sections disclosure |
| `site/SidebarDisclosureItem.tsx` | Reusable React Aria disclosure anatomy for each sidebar navigation group |
| `site/siteNavigation.ts` | Single source of truth for approved IA groups, routes, labels, and implementation status |
| `site/foundationData.ts` | Names and plain-language descriptions for the implemented tokens and typography styles shown by the showcase |
| `site/iconDefinitions.tsx` | Names and rendered examples for every icon exported by Mezzanine |
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
