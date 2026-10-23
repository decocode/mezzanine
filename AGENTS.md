# Agent instructions

Mezzanine is a design system by DecoCode Ltd.

The system has three parts:

1. Library (`@decocode/mezzanine`) in `src/`
2. Documentation (site for mezzanine.fly.dev) in `site/`
3. Lab, an experimental sandbox area, in `site/lab/`.

## Stop signs

Never do these without the owner's explicit agreement in the conversation:

1. Invent a public name.
2. Put an idea into code, including the Lab.
3. Copy anything from the Lab into `src/`, the documentation site or `src/docs/`.
4. Add a dependency, feature, sample content or abstraction that the owner didn't ask for and the change doesn't need in order to work.
5. Add a `useEffect`, `useLayoutEffect` or `useInsertionEffect`. Use an event handler, a calculation during rendering, `useSyncExternalStore` or a ref callback instead. Only the effects listed in `scripts/effect-rules.mjs` are allowed. **[checked]**
6. Commit, push, deploy, publish, or change the licence or the package version.
7. Document something that isn't implemented and public, except approach pages and empty routes (see `site/PAGES.md`).

## Glossary

- **The owner:** the person who owns Mezzanine and decides names, designs, the tech stack and approvals.
- **A user:** anyone other than the owner who reads the docs or uses Mezzanine to build a product.
- **An end user:** someone using a product or service built with Mezzanine.
- **Public name:** anything apps rely on: exported components, hooks, functions, props and types, tokens, and documented classes and data attributes. Internal classes and private helpers aren't public.
- **Scale, role and pointer:** the three levels of tokens. See `src/docs/TOKENS.md`.
- **[checked]:** `npm run check:rules` enforces this rule and fails if it's broken. Its error message says how to fix the problem.

## Checks

- Run `npm run check:rules` before finishing any code change. It enforces the token, colour, type, motion, stacking, logical-side, class-name and documentation rules in the guides. CI runs it too.
- Run `npm run lint` and `npm run build` when library, site or configuration code changes.
- Run the browser tests (`npm run test:e2e`) that cover what you changed. Run the whole suite when shared foundations change, such as tokens, motion or shared styles. An edit to copy or Markdown only doesn't need them.
- Fix failures your change caused. Report any remaining failures, any checks you couldn't run and why, and anything no test covers.
- Run Lighthouse only when asked, once. Then remove only the reports that run made.
- Leave unrelated changes alone. The pre-commit hook scans staged changes with `gitleaks`.

## Read the guide for your task

- `MAP.md`: what each folder holds. Read it before adding, moving or removing files. Update it when a folder is added, removed or changes purpose. **[checked]**
- `src/docs/TOKENS.md`: tokens, themes, colour, layout, stacking and motion.
- `src/docs/TYPOGRAPHY.md`: text styles.
- `src/docs/COMPONENTS.md`: how components are built, named and used, including Button and Link. Update it when a component's usage changes.
- `site/PAGES.md`: how documentation pages are built and what they may say.
- `docs/MISSIONSTATEMENT.md`: Mezzanine's purpose and principles, for design, naming and structure decisions and when proposing ideas. `docs/` is private: never commit it, copy it into tracked files or quote it publicly. If it's missing, say so and continue.
- `README.md`: a short introduction for GitHub visitors. Keep it that way, with no component guidance or change notes.

## Working with the owner

- Do routine implementation, investigation and checking within an agreed task without asking. Fix your own mistakes and mention them.
- Ask about unresolved design decisions, public names, changes to agreed rules and conflicting requirements. Keep working on anything that doesn't depend on the answer.
- A request or approved proposal covers what it names. Don't ask for the same approval twice. A broad request doesn't waive a specific approval.
- If rules seem to conflict, honour approved exceptions. If a real conflict remains, explain it and ask.
- Ideas are welcome. Check them against the mission statement and talk them through first. The owner then decides, step by step, whether one becomes a proposal in `docs/`, a Lab experiment, and finally part of the library or docs.
- Within an approved task, the exact React Aria name for a matching component needs no separate approval. A name that is also a CSS word must mean what it means in CSS, in names, page titles and copy. Agreed exception (20 October 2026): "Layers" in Foundations means stacking.
- If an approved name seems wrong, say so, and keep using it until the owner decides.
- New public names fail the check until `npm run check:rules -- --update-api` is run. Run it only after the owner approves the name. **[checked]**

## Boundaries

- **Library (`src/`):** everything an app can use is exported from `src/index.ts`. `src/` never imports from `site/`. Components hold no product content or branding. The library owns each component's anatomy, appearance, states, motion and behaviour. If an app has to restyle internals or reimplement behaviour, move that recipe into `src/` and tell the owner.
- **Site (`site/`):** imports the library as `@decocode/mezzanine`, never by a relative path into `src/`. It documents the library and never designs, extends or simulates it.
- **Lab (`site/lab/`):** experiments are labelled as unapproved, and passing tests don't mean approval. The Lab may use public exports. Nothing outside the Lab imports Lab code, styles or values, except that site routing may load the Lab's entry. Keep Lab styles and values scoped so they can't affect other pages; a file's location alone doesn't isolate CSS. Promoting anything from the Lab needs the owner's approval for that promotion. Then build it in the library, export it, document it and have the Lab use it.

## Stack

- React with TypeScript and `react-aria-components`. Use React Aria wherever it has the pattern, and don't recreate its keyboard, focus, pointer or accessibility behaviour.
- Make only the requested change, and the smallest changes needed to make it work.
- Use npm, and keep `package-lock.json` in sync. Keep configuration minimal, following the existing Vite and Oxlint setup. Create a new folder or shared module only when the current work needs it.
- Give each file one responsibility and a literal name. Keep `.tsx` files for rendering, and put non-trivial or reused logic in clearly named `.ts` files, with no generic `utils.ts`.
- Call out removals, renames and incompatible changes to public names as breaking changes, with a `BREAKING CHANGE:` footer in the commit message.

## Accessibility

- Target WCAG 2.2 Level AA. Don't claim compliance without checking.
- Give every control an accessible name, preferably visible, and meaningful images a text alternative. Keep focus visible.
- Build mobile first: check at 320 CSS pixels and with text at 200%, with no unintended horizontal scrolling.
- For each finished interaction, check keyboard use, focus order, screen reader labels, target size, contrast and reduced motion.

## Licence and deployment

- All rights are reserved. Don't add a licence or change the terms.
- The package is private. Don't publish it or change its version.
- The site deploys to mezzanine.fly.dev with `fly deploy`. It's pre-launch and sends a `noindex` header. Deploy or change the Fly app only when asked, and keep the header.
