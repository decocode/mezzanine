# Project map

## Overview

Mezzanine has two parts that share this repository:

- **The library** (`src/`) is the `@decocode/mezzanine` package. `src/index.ts` is its only public entry point. `npm run build:lib` builds it into `dist/`.
- **The showcase** (`site/`) is the website for mezzanine.fly.dev. `site/index.html` provides the `#root` element, `site/main.tsx` mounts `site/App.tsx`. It imports the library as `@decocode/mezzanine`, which `vite.config.ts` resolves to `src/index.ts`. `npm run build:site` builds it into `site-dist/`, which the Docker image serves with nginx on Fly.io.

The library currently exports no components. Components and showcase pages arrive in the extraction from the decocode repository.

## Files and directories

| Path | Purpose |
| --- | --- |
| `src/index.ts` | Public entry point of the package; imports the default tokens and library styles and exports every component |
| `src/tokens.css` | The token contract: every token name components may use, with default values that consuming apps override in their own themes |
| `src/styles.css` | Library stylesheet entry point; imports typography and, as components arrive, their structural styles |
| `src/typography.css` | Fifteen public text-style classes with predictable single-class specificity, assembled from typography tokens |
| `site/index.html` | HTML shell for the showcase site |
| `site/main.tsx` | Showcase browser entry point |
| `site/App.tsx` | Placeholder showcase page that imports the library through its package name |
| `site/content/color.md` | Draft plain-language copy for the Color foundation page, possibly for tooltips |
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
| `TOKENS.md` | Plain-language guide to the token model, current token inventory, naming rules, and decisions to resolve before component extraction |
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
