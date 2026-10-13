# Mezzanine

An accessible, token-themed design system built on React Aria Components, by DecoCode Ltd.

Mezzanine provides behaviour, accessibility, structure and three neutral themes: Light, Dark and
Wireframe. Products can use those defaults or supply their own look by overriding the design tokens
(CSS custom properties) in a product theme file.

Used by: [decocode.fly.dev](https://decocode.fly.dev)
Showcase: [mezzanine.fly.dev](https://mezzanine.fly.dev)

> **Source-available, not open source.** This repository is public so the work can be viewed.
> It is not licensed for use in other projects. See [LICENSE](./LICENSE).

## Repo layout

| Path       | What it is                                                        |
| ---------- | ----------------------------------------------------------------- |
| `src/`     | The library: components, structural CSS, public `index.ts`         |
| `site/`    | The showcase site deployed to mezzanine.fly.dev                    |
| `dist/`    | Built package output (generated)                                  |
| `site-dist/` | Built showcase site output (generated)                          |

## Scripts

- `npm run dev` — run the showcase site locally
- `npm run build:lib` — build the publishable package into `dist/`
- `npm run build:site` — type-check and build the showcase into `site-dist/`
- `npm run build` — both
- `npm run lint` — oxlint
- `npm run test:e2e` — build the showcase and run Chromium route-loading regression tests

## Browser tests

Install Chromium once with `npx playwright install chromium`, then run
`npm run test:e2e`. The tests start a production preview automatically and check
route-specific downloads, loading and error states, direct section links and
state preservation when changing themes.

The Playwright workflow runs lint, the library and showcase builds, and browser
tests on pull requests and pushes to `main`. It rejects focused tests (`test.only`)
in CI and saves an HTML report plus traces for failed tests as a 14-day artifact.
Open a local report with `npx playwright show-report`.

## Lighthouse reports

Run `npm run lighthouse` after installing Chromium to build the showcase and audit
home, Button, and Table on mobile and desktop, with three runs per page and device.
Use `npm run lighthouse:mobile` or `npm run lighthouse:desktop` for one profile.
Reports are saved under `reports/lighthouse/` (ignored by Git).

The Lighthouse workflow runs the same audits on pull requests and pushes to `main`
and saves reports as a 14-day artifact. Performance thresholds produce warnings
while we establish a CI baseline; audit execution failures still fail the job.
These performance audits and browser tests do not establish WCAG compliance;
manual accessibility checks remain necessary.

## How DecoCode products use it

```ts
import '@decocode/mezzanine/styles.css' // Mezzanine structure and default themes
import './theme.css'                    // optional product token overrides
import { Table, TableHeader, Column, Row, TableBody, Cell } from '@decocode/mezzanine'
```

Set `data-theme="light"`, `data-theme="dark"`, or `data-theme="wireframe"` on the root HTML element
to choose an explicit theme. Use `data-theme="system"` (or no attribute) to follow the device's
Light/Dark preference, with Light as the fallback.

The package is `private` and is not published to npm.
