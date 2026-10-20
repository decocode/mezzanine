# How documentation pages are built

This covers the documentation site in `site/`. The library itself is documented
in `src/docs/`.

## Where things live

| Folder or file | What it holds |
| --- | --- |
| `site/AppShell.tsx` | Route selection and theme. Docs pages render inside `components/DocsShell.tsx` (the library AppShell with navigation and On this page Panels) and load separately through `PageLoader.tsx`. |
| `site/templates/ContentPage.tsx` | Builds a page from its content file: the sections, the Technical details group, Related pages and References |
| `site/templates/docsPageContent.ts` | The one shape every content file follows (`DocsPageContent`), the standard section titles and how section ids are made |
| `site/templates/DocsPageTemplate.tsx` | The layout underneath `ContentPage`, and the site-only `PageHeading` used for every page title and introduction |
| `site/pages/` | One folder per page, arranged like the navigation: `foundations/interaction/target-size/`, `components/control/button/` and so on. Each holds the page (`ButtonPage.tsx`: live examples, local state and anything only code can build, passed to `ContentPage` as `parts`), its content file (`buttonContent.ts`: the wording, reference entries and data, as plain TypeScript with no JSX) and any helpers only that page uses. A parent page, such as Interaction, keeps its files in its own folder beside its child pages' folders. |
| `site/siteContent.ts` | Wording shared across the site: its name, the skip link and the not-found and not-implemented messages |
| `site/components/` | Reusable site UI, separate from the library's components in `src/components/` |

## Writing copy

Copy in content files is plain text. Three markers, borrowed from Markdown, add
formatting:

- `` `code` `` for code, such as a prop or token name.
- `**strong**` for emphasis.
- `[label](href)` for a link. A link to another site opens in a new tab and says
  so, like the References list.

A paragraph can also be a short bulleted list: `{ list: ['First item', 'Second item'] }`.

When a page moves in the navigation, move its folder to match, so the folders always read like the navigation. The Lab in `site/lab/` follows the same pattern: each Lab page's content file exports the same `DocsPageContent` shape (as a `LabPage`, which adds its Lab address), and `ContentPage` builds it, with its examples as `parts`.

## Adding a page

1. Add the page to `site/siteStructure.ts`, in its navigation group.
2. Create its folder in `site/pages/`, following the navigation, with
   `<Name>Page.tsx` and `<name>Content.ts`. The page id `target-size` in the
   Interaction group becomes `foundations/interaction/target-size/TargetSizePage.tsx`.

The page loads from its folder automatically, and the server allows its route
on the next deploy. `npm run check:rules` reports a page whose file is missing
or in the wrong folder.

Useful site components:

- `ExampleZone` is the standard frame around an example. It accepts extra
  classes for special layouts.
- `DocsTable` shows Anatomy, Props and CSS token entries with Mezzanine's Table.
- The disclosure group and its anchor-link handling.
- `SiteTopBar` and `DocsShell`, the site's own top bar and the AppShell frame around docs and Lab pages.

## Component pages

Every page uses `ContentPage`. The page passes its content file and any live
parts:

```tsx
<ContentPage content={badgeContent} parts={{ example: <ExampleZone>…</ExampleZone> }} />
```

Every page, in the Docs or the Lab, follows the same order:

1. Also known as, when the page's name is agreed: what Figma, CSS, Tailwind CSS,
   Bootstrap and Material Design call the same thing, in a closed Disclosure.
2. The page's own sections, such as Example and Variants, or How it works and
   Example in the Lab.
3. Technical details, where the page has them.
4. Related pages and References.

The content file sets the page's `id`, `kind` (`component` or `foundation`),
title, description, its `alsoKnownAs` rows, its `sections` in order, its
`technicalDetails`, Related pages and References.

- Each section has a `key`. Standard keys, such as `example`, `anatomy`,
  `usage` and `tokens`, supply their own title; any other key needs a `title`.
- A section's id is the page id and its key, such as `badge-anatomy`. The
  Technical details group is always `<page id>-technical-details`.
- In a section, `intro` paragraphs come first, in the muted description style,
  then `body` paragraphs, then the page's part for that key, then the section's
  two-column `table`.
- Optional `subsections` add On this page links to headings inside a section.
- Optional `subheadings` add headed blocks inside a section, such as Browser
  support, each with a level-3 heading and its own On this page link.
- On this page appears after the page heading and description on narrower
  screens, and in DocsShell's end Panel on wide screens.
- The Technical details group's heading is level 2 and its sections become a
  Disclosure group with level-3 headings. The disclosures start closed, several
  can be open, and an On this page link opens the right panel before scrolling
  to it, including from a direct URL.

Each component page has, where they apply:

1. The example, and any other interactive examples, always visible.
2. Technical details, in disclosures (see below).
3. Related pages: links to other Mezzanine pages.
4. References: links to the React Aria documentation or other sources. Badge is
   a plain HTML element, so its reference is MDN.

Leave out sections that do not apply. Never add an empty section or describe a
feature that does not exist.

### Component Technical details

The Technical details group always uses this order:

1. Anatomy: the parts the component is built from.
2. Behaviour: how it responds and changes. Page-specific extras, such as
   Table's Responsive behaviour, sit next to it.
3. States: when a page lists them inside Technical details.
4. Usage: how to set it up and which props to choose.
5. Accessibility: only what is specific to this component, such as its
   keyboard keys, the accessible names it needs or what it announces. Guidance
   that applies to every component, such as visible focus or reduced motion,
   belongs on a shared Foundations page, not here. Leave the section out when a
   component has nothing specific to say.
6. Props.
7. CSS tokens.

Do not combine Usage and Accessibility into one section.

## Related pages and References

Edit the page's content file. Each entry has a `label` and an `href`: a local
path for Related pages, an external URL for References. External links show a
trailing icon and announce that they open in a new tab. An empty list produces
no section and no On this page link.

## Foundations pages

Shared accessibility information (the WCAG target, what React Aria provides,
what Mezzanine adds and how it is checked) lives on the Foundations
Accessibility page at `/accessibility`, so other pages do not repeat it.

Foundations pages cover how Mezzanine works, such as accessibility, interaction
and text, and its visual values, such as color, shape, opacity and motion, many
of which a theme can change.

Foundations pages open with their own sections, such as a scale or a
table of states. Their content files use `kind: 'foundation'`, and where they
have a Technical details group, its sections always appear in this order:

1. CSS properties: the CSS properties the page governs.
2. Tokens: token names, purposes and values read from the token source.
3. Theming: pages whose values a theme changes. The Wireframe baseline and what a theme changes.
4. Accessibility: only what is specific to this page. Leave it out when there
   is nothing specific; what applies everywhere is on the Accessibility page.
5. Localisation: direction and text expansion, only once verified.

Do not list the components that use a token or state by hand: such lists go
out of date. Add them only if they can be generated from the code.

Leave out sections that do not apply.

## Facts checked by check:rules

`npm run check:rules` keeps documentation facts in step with the code:

- Every implemented page in `site/siteStructure.ts` must have its component in
  the folder its place in the navigation gives it, such as
  `site/pages/foundations/interaction/target-size/TargetSizePage.tsx`, and no
  page file may sit anywhere else. Every Lighthouse URL must be a page.
- The server's allowed routes are not written by hand: `scripts/generate-routes.mjs`
  lists every docs and Lab page, and the Docker build gives that list to nginx.
- Every token the site mentions must exist, and every public token in
  `src/tokens/`, the components' `*.tokens.css` files and the theme files must
  be documented on some page.
  Known gaps are listed in `scripts/undocumented-tokens.baseline.json`. After
  documenting a token, or when a gap is accepted, run
  `npm run check:rules -- --update-token-baseline`.
- Each Props table must match the component's exported TypeScript props: no
  documented prop may be missing from the type, and every prop the component
  declares itself must be documented. Inherited React Aria props may be listed
  selectively. The tables and their types are listed in
  `scripts/check-rules.mjs`; add a new Props table there.

## Other pages

Pages for subjects that are not implemented yet say Not implemented and are
marked WIP in the navigation.
