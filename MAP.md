# Project map

What each folder holds and the conventions inside it. File names say what each file does, so this map describes folders, not every file.

## Library (`src/`)

The `@decocode/mezzanine` package. `npm run build:lib` builds it into `dist/`.

| Folder or file | What it holds |
| --- | --- |
| `index.ts` | The only public entry point. Everything an app can use is exported here. |
| `components/<Name>/` | One folder per component, named after it: `<Name>.tsx` and `<Name>.css`, plus any private `.ts` logic. Panel and AppShell also have a `<Name>.tokens.css` holding the layout settings an app may change. Some are thin React Aria re-exports that Mezzanine hasn't designed yet. |
| `tokens/` | The shared scales, one file per subject: colour palettes, elevation, icon size, interaction (target size, focus ring, nav item), motion, opacity, shape (radius, border width), size (widths and heights), space, layout, text, typography and z-index. |
| `themes/` | Light, Dark and Wireframe. Each maps the palettes onto the colour roles, and sets any other role values that differ. `forced-colors.css` points every colour role at a system colour when forced colours, such as Windows high contrast, are on. |
| `styles/` | Shared styles built from tokens. `typography.css` holds the public `mz-text-*` text styles and `layout.css` the layout classes, such as `mz-ratio-pair`, which apps write in their markup. `scroll.css` adds the soft fade at the edge of a scrolling ListBox, Menu, GridList, Tree or Panel, with nothing for apps to write. |
| `mezzanine.css`, `tokens.css`, `styles.css`, `motion.css` | Entry stylesheets: `mezzanine.css` puts everything in the `mezzanine` cascade layer and is the one file apps import, `tokens.css` gathers the tokens, `styles.css` gathers every component stylesheet, and `motion.css` is the motion policy. |
| `icons/` | The icons in active use. |
| `docs/` | How apps use Mezzanine, and the rules for changing it: `COMPONENTS.md`, `TOKENS.md` and `TYPOGRAPHY.md`. |

## Documentation site (`site/`)

The website for mezzanine.fly.dev. It imports the library as `@decocode/mezzanine`, which `vite.config.ts` resolves to `src/index.ts`. `npm run build:site` builds it into `site-dist/`.

| Folder or file | What it holds |
| --- | --- |
| `siteStructure.ts` | The single source of truth for the information architecture: groups, pages, routes, labels and status. Navigation, routing and the server's allowed routes all come from it. |
| `AppShell.tsx`, `main.tsx`, `PageLoader.tsx`, `pageRegistry.ts` | Route selection, theme state, and loading each page separately. |
| `pages/<group>/<page>/` | One folder per page, mirroring the information architecture. Each has a `<Name>Page.tsx` and a `<name>Content.ts` holding its copy. See `PAGES.md`. |
| `templates/` | `ContentPage`, which builds a page from its content file, and the content shape every page follows. |
| `components/` | The site's own parts: `DocsShell` (the AppShell frame around docs and Lab pages), `SiteTopBar`, navigation, `TokenScale`, `PageCards` (an index page's linked cards), `SiteSearch`, the example parts shared with the Lab (`ExampleParts.tsx`, with `ExampleCard` and `PanelPicker`, and `browserLogic.ts`), `WidthFrame.tsx` (`WidthDemo`, a layout example's frame inside a DemoArea) and similar. |
| `styles.css` | The site's own styles. |
| `assets/`, `public/` | Images and static files. |

## Lab (`site/lab/`)

An experimental sandbox at `/site/lab`. Nothing here is approved library work.

| Folder | What it holds |
| --- | --- |
| `layout/<page>/` | The Layout pages, one folder each, all directly under Layout. |
| `emerging-features/` | The other experiment, one folder per page. |
| `notice/` | A candidate Notice component: a short note in one of Badge's six tones. |
| `volume-and-zoom/` | Candidate VolumeControl and ZoomControl: an icon button that opens a slider. |
| `shared/` | Shared Lab parts, types and values, and `layout-lab.css`, which each page's "The CSS behind" panel quotes. The panel itself, the example text and the panel picker come from the site's `components/ExampleParts.tsx`, shared with promoted docs pages. |
| `LabPage.tsx`, `labContent.tsx` | The Lab's entry and its navigation. |

## Tests, checks and configuration

| Folder or file | What it holds |
| --- | --- |
| `tests/components/`, `tests/site/`, `tests/lab/` | Playwright browser tests: one file per component, then the site and the Lab. `accessibility.ts` and `display.ts` are shared helpers. |
| `scripts/` | `check-rules.mjs` and its rule modules (each with a `.test.mjs`), the public API snapshot, the undocumented-token baseline, route generation for nginx, and the Lighthouse runner. |
| `config/` | Configuration that tools are pointed at by path: the library build, TypeScript projects, nginx and Lighthouse. Configuration that tools find by themselves stays at the root. |
| `.github/` | The CI workflows (browser tests, Lighthouse and the secret scan) and `dependabot.yml`, which asks Dependabot for weekly update pull requests. |
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
