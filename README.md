# Mezzanine

An accessible, token-themed design system built on React Aria Components, by DecoCode Ltd.

Mezzanine provides behaviour, accessibility and structure. Each product supplies its own look by
defining the design tokens (CSS custom properties) in its own theme file.

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
- `npm run test:e2e` — Playwright tests

## How DecoCode products use it

```ts
import '@decocode/mezzanine/styles.css' // Mezzanine structure
import './theme.css'                    // the product's own token values
import { Button } from '@decocode/mezzanine'
```

The package is `private` and is not published to npm.
