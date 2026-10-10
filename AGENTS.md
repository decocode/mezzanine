# Agent instructions

This repository is Mezzanine, a React Aria design system by DecoCode Ltd. It contains two things: the component library (`@decocode/mezzanine`) in `src/`, and the showcase site for mezzanine.fly.dev in `site/`. Read `MAP.md` for the file layout and `README.md` for setup commands.

## Stack and conventions

- Use React with TypeScript.
- Use `react-aria-components` for supported interface patterns in both the library and the showcase so keyboard, focus, pointer, touch, and accessibility behavior come from the same foundation.
- Use npm and keep `package-lock.json` in sync with `package.json`.
- Keep configuration minimal and follow the existing Vite and Oxlint setup.

## Library and showcase boundaries

- `src/` is the package. Everything a consuming app can use is exported from `src/index.ts`. Do not import from `site/` inside `src/`.
- `site/` is the showcase. It imports the library as `@decocode/mezzanine` (resolved to `src/index.ts` by an alias), never by relative paths into `src/`, so it consumes the library the way apps do.
- `react`, `react-dom`, and `react-aria-components` are peer dependencies. Do not bundle them. If library code imports another package directly (for example `react-aria`, `react-stately`, or `@internationalized/date`), it must be listed in `package.json`.
- Library components contain no product-specific content, branding, copy, or imagery. Anything belonging to a single product stays in that product's repository.
- Library CSS references design tokens (CSS custom properties) only, never raw color, font, or size values. Each consuming app supplies token values in its own theme file. Name tokens by purpose, not appearance (for example `--color-accent`, not `--color-yellow`).
- Treat changes to exported component names, props, token names, or CSS class names as breaking changes for consuming apps. Call them out explicitly.

## Showcase accuracy and source of truth

- `src/` is the source of truth for what Mezzanine currently contains. The showcase documents the library; it must not design, extend, or simulate it.
- Only document components, variants, states, tokens, behaviours, and rules that are implemented in the library and available through its public API.
- Do not invent or embellish content to make the showcase appear more complete. The approved information architecture may include an empty route before its subject is implemented, but that page must say `Not implemented`, contain no speculative examples or rules, and be visibly marked `Empty` in navigation.
- Before adding showcase content, verify the corresponding implementation and its agreed behaviour in the repository. If something is missing or ambiguous, stop and ask the user before defining or documenting it.
- Showcase examples must render the real exported library components. Do not create showcase-only replicas, variants, styles, or behaviours.
- Build the showcase itself from React Aria Components wherever React Aria provides the interface pattern. If Mezzanine already exports that component, the showcase must import the Mezzanine export rather than importing the same component directly from `react-aria-components`.
- A direct `react-aria-components` import is allowed in the showcase only while Mezzanine has no corresponding public export, and must not be wrapped or styled as though it were an implemented Mezzanine component.
- Component comparison matrices and other tabular showcase content must use Mezzanine's exported `Table` parts. Do not use a native `<table>` as a shortcut once `Table` is available.
- Native semantic HTML remains appropriate for static page structure and content when React Aria does not provide a corresponding component.
- Display token values from the implemented token source wherever possible. Do not manually duplicate values in showcase code.
- Neutral sample text or data may be used to demonstrate an existing component, but it must not imply that an unimplemented feature, rule, or variant exists.
- Prefer descriptive teaching labels in showcase examples, such as `Toggle A`, `Column A`, `Row A`, and `Current page`, so the component anatomy and state are easy to identify. Use realistic product copy only when that content is itself necessary to demonstrate the agreed behaviour.
- When React Aria names a component part or concept, use that exact term in teaching labels and explanatory copy. Do not replace it with plainer product language: the showcase is a working reference that helps the user learn the React Aria code vocabulary.
- If the showcase or written documentation disagrees with the implemented public library, treat the library as authoritative and correct the documentation.
- An implemented foundation or component may be presented as documentation only after it has been agreed, implemented, exported where applicable, and checked. An approved empty IA destination is not evidence that its named subject exists in Mezzanine.

## React Aria alignment and naming

- React Aria Components is the behavioural and naming foundation for Mezzanine's atomic components. Before implementing or revising one, consult the current official React Aria documentation for that component.
- When a Mezzanine atomic component directly corresponds to a React Aria component, use the exact React Aria component name for the Mezzanine export, file, documentation title, and showcase navigation entry. For example, use `ToggleButton`, `ToggleButtonGroup`, `Toast`, `Table`, `Switch`, and `Slider`, not product-specific or invented replacements.
- Compose the same documented React Aria parts and follow its prop names, event names, controlled and uncontrolled conventions, slots, render props, state model, keyboard behaviour, focus behaviour, and accessibility semantics as closely as possible. Do not replace React Aria conventions with a pre-existing DecoCode API merely to avoid revising that component.
- Use the official Vanilla CSS example for the corresponding React Aria component as the implementation baseline. Preserve its component anatomy, selectors, documented state data attributes, orientation and placement attributes, interaction-state coverage, forced-colour handling, and reduced-motion handling where applicable. Express Mezzanine's visual values through its implemented design tokens rather than copying an example theme's literal colours, type, spacing, radii, or shadows.
- Keep React Aria prop conventions such as `onPress`, `isDisabled`, `isPending`, `isSelected`, and `onSelectionChange` where the underlying component supports them. Do not introduce aliases for the same concepts.
- Do not omit a documented React Aria state or behaviour because the current DecoCode version lacks it. If supporting it requires an unresolved design decision, stop and ask the user before implementation.
- Any deviation from the corresponding React Aria component's name, anatomy, API, state selectors, or behaviour requires the user's explicit agreement and must be documented with the reason.
- More advanced Mezzanine patterns that compose multiple primitives may use bespoke, purpose-based names. Their underlying atomic parts should still use the matching React Aria components and conventions.
- Treat migrated DecoCode components as inputs to review, not as the naming authority. Rename or revise them during migration when they conflict with React Aria conventions.

## Scope and understandability

- Make only the requested change and the smallest changes needed to make it work. Do not add speculative features, sample content, dependencies, or abstractions.
- Before editing, identify the files involved and what each change is for. Ask about a material design decision that has not been specified.
- Give each file one clear responsibility. Create a new folder or shared module only when the current work needs it.
- Use literal, descriptive names for files, variables, and functions. Avoid abbreviations and vague names whose purpose cannot be understood in context.
- Update `MAP.md` when a source file is added, moved, or removed, and state that file's purpose.
- After a change, explain what each changed file does, why it changed, and how the result was checked.

## UI and logic files

- Keep `.tsx` files focused on rendering, component composition, React Aria wiring, and local display state. Simple conditions and `map` calls that directly render UI can stay there.
- Put nonvisual calculations, sorting, transformations, and reusable decisions in clearly named `.ts` files. Longer or shared content lists can also live in `.ts` files.
- Extract logic when it becomes nontrivial, mixes responsibilities, needs reuse, or takes more than one sentence to explain. Keep short, single-use values near the component that displays them.
- Avoid creating a paired `.ts` file for every component or a generic `utils.ts` file.

## Components, accessibility, and responsive design

- Target WCAG 2.2 Level AA across the library and showcase. Do not claim compliance without checking the finished components and interactions.
- Build mobile first: make the narrow layout work before adding wider-screen styles. Check content and controls at 320 CSS pixels, with text enlarged to 200%, and without unintended horizontal page scrolling.
- Use `react-aria-components` for interactive patterns it supports. Consult the official React Aria documentation for each component, use its compositional parts and built-in behavior, and do not recreate its keyboard, pointer, touch, or focus handling.
- Give advanced component wrappers a clear, purpose-based name for the composed UI pattern they present, and document the React Aria primitives they use. Atomic components follow the exact naming and API rules in “React Aria alignment and naming”. Keep wrapper props close to the underlying component APIs, and pass `className` through so consuming apps have an escape hatch.
- Use semantic HTML for page structure and static content. Give every control an accessible name, prefer visible labels, and provide text alternatives for meaningful images.
- Keep focus visible. Check keyboard operation, focus order, screen reader labels, touch target size, color contrast, and reduced-motion behavior for each completed interaction.

## Before finishing a code change

- Run `npm run lint` and `npm run build` when library, showcase, or configuration code changes. `npm run build` builds both the package and the showcase.
- Scan staged changes with `gitleaks git --staged --redact .` before a commit. The configured hook runs this automatically.
- Update `MAP.md` if the project structure or main entry points change.
- When a showcase route is added or removed, update the allowed routes in `nginx.conf` and the URLs in the Lighthouse configs.
- Report any check that could not run.

## Licence, publishing, and deployment status

The repository is public but all rights are reserved (see `LICENSE`). Do not add an open-source licence or change the licence terms unless the user asks.

The package is marked `"private": true` and is not published to npm. Do not publish it, change its version, or remove `private` unless the user asks.

The showcase is deployed to mezzanine.fly.dev from the Fly.io app `mezzanine` in the DecoCode Ltd organization, using `Dockerfile`, `nginx.conf`, and `fly.toml`. It is pre-launch and sends a `noindex` header. Do not deploy, change the Fly app, or remove the `noindex` header unless the user asks.

Preserve unrelated user changes and do not create a commit unless requested.
