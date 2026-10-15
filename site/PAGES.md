# How documentation pages are built

This covers the documentation site in `site/`. The library itself is documented
in `src/docs/`.

## Where things live

| Folder or file | What it holds |
| --- | --- |
| `site/AppShell.tsx` | The site layout, navigation and theme. Loads each page separately through `PageLoader.tsx`. |
| `site/templates/ComponentPageTemplate.tsx` | The component page template, and the site-only `PageHeading` used for every page title and introduction |
| `site/pages/` | One file per page: examples, local state, and putting the content into the template |
| `site/content/` | Each page's wording, reference entries and data, in a `*Content.tsx` (or `.ts`) file. JSX is used for inline code and links. |
| `site/components/` | Reusable site UI, separate from the library's components in `src/components/` |

Useful site components:

- `ExampleZone` is the standard frame around an example. It accepts extra
  classes for special layouts.
- `DocsTable` shows Anatomy, Props and CSS token entries with Mezzanine's Table.
- The disclosure group and its anchor-link handling.
- `MezzanineNavbar` and `Sidebar`, the site's own navbar and sidebar.

## Component pages

Every implemented component page uses `ComponentPageTemplate`. A page supplies
its title, description and an ordered `sections` list.

- Each section defines `id`, `title` and `content` once. The template creates
  its heading, its wrapper and its link in On this page.
- Optional `subsections` add On this page links to headings inside a section.
- On this page appears after the page heading and description on narrower
  screens, and in the right column on wide screens.
- A section group has `id`, `title` and its own `sections` list instead of
  `content`. Its heading is level 2 and its children become a Disclosure group
  with level-3 headings. The disclosures start closed, several can be open, and
  an On this page link opens the right panel before scrolling to it, including
  from a direct URL.

Each component page has, where they apply:

1. The example, and any other interactive demonstrations, always visible.
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

Edit the page's content list. Each entry has a `label` and an `href`: a local
path for Related pages, an external URL for References. External links show a
trailing icon and announce that they open in a new tab. An empty list produces
no section and no On this page link. The optional `referencesId` keeps an
existing anchor for the References section.

## Foundations and Styles pages

Shared accessibility information (the WCAG target, what React Aria provides,
what Mezzanine adds and how it is checked) lives on the Foundations
Accessibility page at `/accessibility`, so other pages do not repeat it.

The Foundations group has an overview page at `/foundations`. It explains what
applies to every Foundation, including that Foundations do not change with the
theme, so individual Foundations pages do not repeat it.

Foundations and Styles pages open with their own sections, such as a scale or a
table of states. Pages that have been converted (Interaction and Spacing) use
`ComponentPageTemplate` and end with a shared Technical details group, built by
`foundationTechnicalDetailsGroup` in `site/templates/foundationTechnicalDetails.ts`.
Its sections always appear in this order:

1. CSS properties: the CSS properties the page governs.
2. Tokens: token names, purposes and values read from the token source.
3. Theming: Styles pages only. The Wireframe baseline and what a theme changes.
4. Accessibility: only what is specific to this page. Leave it out when there
   is nothing specific; what applies everywhere is on the Accessibility page.
5. Localisation: direction and text expansion, only once verified.

Do not list the components that use a token or state by hand: such lists go
out of date. Add them only if they can be generated from the code.

Leave out sections that do not apply. Pages not yet converted, such as
Typography and Color, have their own structures but reuse `PageHeading`.

## Facts checked by check:rules

`npm run check:rules` keeps documentation facts in step with the code:

- Every page in `site/siteStructure.ts` must be an allowed route in
  `nginx.conf`, every route nginx allows must be a page, and every Lighthouse
  URL must be a route.
- Every token the site mentions must exist, and every public token in
  `src/tokens.css` and the theme files must be documented on some page.
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
