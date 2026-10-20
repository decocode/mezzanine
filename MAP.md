# Project map

What each folder holds and the conventions inside it. File names say what each file does, so this map describes folders, not every file.

## Library (`src/`)

The `@decocode/mezzanine` package. `npm run build:lib` builds it into `dist/`.

| Folder or file | What it holds |
| --- | --- |
| `index.ts` | The only public entry point. Everything an app can use is exported here. |
| `components/<Name>/` | One folder per component, named after it: `<Name>.tsx`, `<Name>.css` and `<Name>.tokens.css`, plus any private `.ts` logic. Some are thin React Aria re-exports that Mezzanine hasn't designed yet. |
| `tokens/` | The shared scales and roles, one file per subject: colour, elevation, icon size, interaction (target size, focus ring, nav item), motion, shape (radius, border width), space, layout, text, typography and z-index. |
| `themes/` | Light, Dark and Wireframe. Each sets colours and any role values that differ. |
| `styles/` | The shared classes that apps write in their markup, built from tokens: `typography.css` holds the public `mz-text-*` text styles. |
| `tokens.css`, `styles.css`, `motion.css` | Entry stylesheets: `tokens.css` gathers the tokens, `styles.css` gathers every stylesheet into the one file apps import, and `motion.css` is the motion policy. |
| `icons/` | The icons in active use. |
| `docs/` | How apps use Mezzanine: `COMPONENTS.md`, `TOKENS.md` and `TYPOGRAPHY.md`. |

## Documentation site (`site/`)

The website for mezzanine.fly.dev. It imports the library as `@decocode/mezzanine`, which `vite.config.ts` resolves to `src/index.ts`. `npm run build:site` builds it into `site-dist/`.

| Folder or file | What it holds |
| --- | --- |
| `siteStructure.ts` | The single source of truth for the information architecture: groups, pages, routes, labels and status. Navigation, routing and the server's allowed routes all come from it. |
| `AppShell.tsx`, `main.tsx`, `PageLoader.tsx`, `pageRegistry.ts` | Route selection, theme state, and loading each page separately. |
| `pages/<group>/<page>/` | One folder per page, mirroring the information architecture. Each has a `<Name>Page.tsx` and a `<name>Content.ts` holding its copy. See `PAGES.md`. |
| `templates/` | `ContentPage`, which builds a page from its content file, and the content shape every page follows. |
| `components/` | The site's own parts: `DocsShell` (the AppShell frame around docs and Lab pages), `SiteTopBar`, navigation, `TokenScale`, `ExampleZone` and similar. |
| `styles.css` | The site's own styles. |
| `assets/`, `public/` | Images and static files. |

## Lab (`site/lab/`)

An experimental sandbox at `/site/lab`. Nothing here is approved library work.

| Folder | What it holds |
| --- | --- |
| `layout/<group>/<page>/` | The Layout pages, in six groups: Box basics, Add space, Inside the box, Side by side, Grids and columns, and Container. |
| `layers/`, `browser-and-device/`, `emerging-features/`, `components/` | The other experiments, one folder per page. |
| `reading-order/`, `style-priority/` | Top-level Lab pages. |
| `shared/` | Shared Lab parts, types and values, and `layout-lab.css`, which each page's "The CSS behind" panel quotes. |
| `LabPage.tsx`, `labContent.tsx` | The Lab's entry and its navigation. |

## Tests, checks and configuration

| Folder or file | What it holds |
| --- | --- |
| `tests/components/`, `tests/site/`, `tests/lab/` | Playwright browser tests: one file per component, then the site and the Lab. `accessibility.ts` and `display.ts` are shared helpers. |
| `scripts/` | `check-rules.mjs` and its rule modules (each with a `.test.mjs`), the public API snapshot, the undocumented-token baseline, route generation for nginx, and the Lighthouse runner. |
| `config/` | Configuration that tools are pointed at by path: the library build, TypeScript projects, nginx and Lighthouse. Configuration that tools find by themselves stays at the root. |
| `Dockerfile`, `fly.toml` | The deployment to Fly.io. |

`dist/`, `site-dist/`, `reports/` and `node_modules/` are generated and ignored by Git.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the site locally |
| `npm run check:rules` | Run the rule checks and their own tests |
| `npm run lint` | Run Oxlint |
| `npm run typecheck` | Type-check the library, site and configuration |
| `npm run build` | Build the package and the site |
| `npm run test:e2e` | Build the site and run every browser test |
| `npm run lighthouse` | Run the mobile and desktop Lighthouse audits |
| `fly deploy` | Deploy the site to mezzanine.fly.dev |
| `gitleaks git --staged --redact .` | Scan staged changes for secrets |
