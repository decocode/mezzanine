# Project map

## Overview

Mezzanine has two parts that share this repository:

- **The library** (`src/`) is the `@decocode/mezzanine` package. `src/index.ts` is its only public entry point. `npm run build:lib` builds it into `dist/`.
- **The showcase** (`site/`) is the website for mezzanine.fly.dev. `site/index.html` provides the `#root` element, `site/main.tsx` mounts `site/AppShell.tsx`. It imports the library as `@decocode/mezzanine`, which `vite.config.ts` resolves to `src/index.ts`. `npm run build:site` builds it into `site-dist/`, which the Docker image serves with nginx on Fly.io.

The showcase includes an experimental sandbox in `site/lab/`, reached through **Lab** in the navbar at `/site/lab`, with four experiments and a Components section. Components, at `/site/lab/components`, shows only its heading so far; its child page, Search, at `/site/lab/components/search`, holds the search dialog experiment. Layers, at `/site/lab/layers`, holds Positioning, Ordering layers, Bundles of layers and Scroll padding. Browser and device, at `/site/lab/browser-and-device`, holds Media queries, Supports, Safe areas and Touch targets. Emerging features, at `/site/lab/emerging-features`, holds a page, marked Lab, for each feature not yet well supported (Masonry, Scroll-state queries, Anchor positioning and Field sizing). The other is Layout: an overview at `/site/lab/layout`, seven groups named after what you want to do (Box basics, Add space, Inside the box, Side by side, One below another, Grid formation and Container), each with an overview at `/site/lab/layout/<group>` and a page for each topic or building block at `/site/lab/layout/<group>/<page>`. Reading order and Style priority are Lab pages outside the experiments, at `/site/lab/<page>`. Its illustrative candidates are not approved library features.

The library currently exports React Aria `Breadcrumbs`, `Button`, `Checkbox`, `Link`, `RadioGroup`, `Disclosure`, `DisclosureGroup`, `Dialog`, `DialogTrigger`, `Heading`, `Modal`, `ModalOverlay`, `ToggleButton`, `ToggleButtonGroup` and the `Table` family, the semantic `Badge`, composed `DisclosureHeader`, `TableOfContents`, `Navbar`, `NavTree` and `Sidebar` patterns, the icons in active DecoCode use, three official color themes and fifteen public typography classes. Components arrive during extraction from the decocode repository.

## Files and directories

### Library (`src/`)

| Path | Purpose |
| --- | --- |
| `src/index.ts` | Public entry point of the package; imports the default tokens and library styles and exports every component |
| `src/motion.css` | Internal finite/loading/scroll motion policy for theme scopes and the system preference; shared backdrop fade keyframes used by Modal, Sidebar and TabBar |
| `src/motionPolicy.ts` | Internal resolved-duration reader, preference/theme observation and token-display notification |
| `src/styles.css` | Library stylesheet entry point; imports typography and, as components arrive, their structural styles |
| `src/tokens.css` | Token entry point: imports the three themes, then the shared token files in `src/tokens/`, then each component's tokens, then the themes last so they can override defaults |
| `src/typography.css` | Base text for `body` (no automatic hyphens) and `h1`–`h6`, fifteen public text-style classes and the Inline code element pattern, assembled from typography tokens |
| `src/components/<Name>/<Name>.tokens.css` | Each component's structural tokens, shared by every theme; its theme-specific colours stay in `src/themes/` |
| `src/components/Badge/Badge.css` | Token-led styling for Neutral, Violet, Info, Success, Warning and Danger Badges |
| `src/components/Badge/Badge.tsx` | Public non-interactive Badge with core and semantic color variants, rendered as a semantic span |
| `src/components/Breadcrumbs/Breadcrumbs.css` | Token-led layout and separator styling for Breadcrumbs |
| `src/components/Breadcrumbs/Breadcrumbs.ts` | Public React Aria Breadcrumbs and Breadcrumb exports and prop types |
| `src/components/Button/Button.css` | Shared Button/ToggleButton size recipes, Button variants and React Aria interaction states |
| `src/components/Button/Button.tsx` | Public Button: React Aria Button for actions or Link when href is supplied, sharing variants, sizes and icon layout; pending state is action-only |
| `src/components/Card/Card.css` | Card surface, border, elevation, padding and spacing between direct children, with body text and Title medium headings |
| `src/components/Card/Card.tsx` | Public static Card: a div container with the card surface; the app composes its content |
| `src/components/CodeBlock/CodeBlock.css` | Code block surface, border and padding, with Body small text in the shared monospace family; long lines wrap and indentation is kept |
| `src/components/Autocomplete/Autocomplete.ts` | Public React Aria Autocomplete and useFilter exports; no styles, since it only connects a SearchField or TextField to the collection it filters |
| `src/components/CodeBlock/CodeBlock.tsx` | Public static CodeBlock: a pre element with a code element inside; the app supplies the code as text |
| `src/components/Checkbox/Checkbox.css` | Token-led styling for Checkbox states and interaction feedback |
| `src/components/Checkbox/Checkbox.tsx` | Public React Aria Checkbox wrapper with selected and indeterminate indicators |
| `src/components/Dialog/Dialog.ts`, `src/components/Dialog/Dialog.css` | Public React Aria Dialog and DialogTrigger exports; token-led content, title, focus and action-footer styling |
| `src/components/Disclosure/Disclosure.css` | Token-led styling for Disclosure, DisclosureGroup and DisclosureHeader states |
| `src/components/Disclosure/Disclosure.tsx` | Public React Aria Disclosure family plus the composed DisclosureHeader trigger pattern |
| `src/components/FieldError/FieldError.ts` | Public React Aria FieldError export and prop and render-prop types |
| `src/components/Heading/Heading.ts` | Public React Aria Heading export and prop type |
| `src/components/Label/Label.ts` | Public React Aria Label export and prop type |
| `src/components/ListBox/ListBox.ts`, `src/components/ListBox/ListBox.css` | Public React Aria ListBox, ListBoxItem, ListBoxSection and Header exports; token-led vertical list, section header, label and description slots, hovered, highlighted, pressed, focus, selected and disabled states, and forced-colour styling |
| `src/components/Link/Link.css` | Token-led styling for Link interaction states |
| `src/components/Link/Link.ts` | Public React Aria Link export and prop types |
| `src/components/Modal/Modal.ts`, `src/components/Modal/Modal.css` | Public React Aria Modal and ModalOverlay exports; token-led backdrop, responsive container and reduced-motion-aware entry/exit styling |
| `src/components/Navbar/Navbar.css` | Token-based Navbar layout, text-size-aware container breakpoint and reduced-motion-aware menu panel |
| `src/components/Navbar/Navbar.tsx` | Public sticky Navbar with brand, navigation and action areas, a React Aria Disclosure mobile menu with an icon-only trigger and tooltip, actions kept in the bar on narrow screens, and an isMenu render value for menu-only content |
| `src/components/RadioGroup/RadioGroup.css` | Token-led styling for RadioGroup, RadioField, RadioButton and SelectionIndicator |
| `src/components/RadioGroup/RadioGroup.ts` | Public current React Aria RadioGroup composition exports and prop types |
| `src/components/SelectionIndicator/SelectionIndicator.ts` | Public React Aria SelectionIndicator export and prop type |
| `src/components/Sidebar/Sidebar.css` | Token-based sidebar regions, left/right placement, rail and modal drawer styling |
| `src/components/Sidebar/Sidebar.tsx` | Public Sidebar state boundary, Button-based SidebarTrigger and generic inline or modal SidebarPanel with optional compact rail, permanent inline expansion and optional inline header |
| `src/components/Split/Split.tsx`, `src/components/Split/Split.css` | Public Split layout building block: two areas side by side that share the row by a fraction or by auto and stack when they can't both have their minimum width; layout only, following its container through flexbox wrapping |
| `src/components/Sidebar/sidebarState.ts` | Internal sidebar context and responsive media-query subscription |
| `src/components/TabBar/TabBar.css` | TabBar states, safe-area spacing and responsive bottom-sheet presentation |
| `src/components/TabBar/TabBar.tsx` | Primary route navigation with built-in capacity measurement and a More bottom sheet composed from library links, buttons and modal parts |
| `src/components/Table/Table.css` | Token-led structural and interaction-state styling for the exported Table parts |
| `src/components/Table/Table.tsx` | React Aria Table parts and a Column wrapper that adds a shared sort-direction indicator |
| `src/components/TableOfContents/TableOfContents.css` | TableOfContents spacing, nested list layout and link targets using shared design tokens |
| `src/components/TableOfContents/TableOfContents.tsx` | Public Contents navigation composed from Heading and Link, with nested sections and a configurable heading |
| `src/components/Tabs/Tabs.tsx`, `src/components/Tabs/Tabs.css` | Public Tabs, TabList, Tab and TabPanel APIs, with the official selection-indicator composition and token-based horizontal/vertical styling |
| `src/components/Text/Text.ts` | Public React Aria Text export and prop type |
| `src/components/TextArea/TextArea.ts` | Public React Aria TextArea export and type; composes with TextField for multiline input |
| `src/components/SearchField/SearchField.tsx`, `src/components/SearchField/SearchField.css` | Public React Aria SearchField wrapper that adds the search icon and a clear button (the shared Button) around the app's Label and Input; the Input keeps the shared field appearance |
| `src/components/TextField/TextField.css` | Shared TextField, Input and TextArea layout, interaction states and forced-colour styling |
| `src/components/TextField/TextField.ts` | Public React Aria TextField and Input exports and types |
| `src/components/ToggleButton/ToggleButton.css` | Token-led styling for ToggleButton states and ToggleButtonGroup layout |
| `src/components/ToggleButton/ToggleButton.ts` | React Aria ToggleButton and ToggleButtonGroup with shared button sizes, icon content, optional secondary appearance and preserved selection APIs |
| `src/components/Tooltip/Tooltip.css` | Token-based tooltip layout, fade animation, reduced-motion and forced-colour rules |
| `src/components/Tooltip/Tooltip.tsx` | React Aria Tooltip exports and TooltipTrigger with a configurable 500ms default hover delay |
| `src/docs/COMPONENTS.md` | How apps use Button, Navbar, Table sorting, NavTree, Tooltip and Sidebar |
| `src/docs/TOKENS.md` | Plain-language guide to the token model, official themes, current inventory and naming rules |
| `src/docs/TYPOGRAPHY.md` | Typography roles, named styles, defaults, pattern mappings, theming guidance, and accessibility checks |
| `src/icons/Icons.tsx` | Public Mezzanine icon library extracted from the icons in active DecoCode use |
| `src/icons/StudioIcons.tsx` | Public action, navigation, transport and sequencer icons imported from Rhythm Directives' active icon modules |
| `src/themes/dark.css` | Neutral Dark theme, including automatic device-preference handling |
| `src/themes/light.css` | Neutral Light theme and the fallback when no preference is available |
| `src/themes/wireframe.css` | Monochrome Wireframe theme with semantic status colors and blue focus |
| `src/tokens/color.css` | Colour palettes; semantic colour roles are set per theme (Styles › Color) |
| `src/tokens/interaction.css` | Shared disabled opacity (Foundations › Interaction) target sizes: `--target-size-min` (the WCAG minimum) and `--target-size` (the size controls use), documented on Interaction › Target size; and the shared control-size scale, `--control-size-sm` to `--control-size-xl`, which Button, ToggleButton, text fields, Disclosure and TabBar take their heights from |
| `src/tokens/elevation.css` | Elevation levels built from the shadow and highlight colours; each theme sets its shadow colour (Styles › Elevation) |
| `src/tokens/motion.css` | Durations, easing, distances, scale and rotation (Styles › Motion) |
| `src/tokens/z-index.css` | The shared stacking scale: base, raised, sticky, overlay (every pop-up) and toast; not yet documented on a site page |
| `src/tokens/shape.css` | Corner-radius and border-width scales (Styles › Shape › Corners and Borders) |
| `src/tokens/text.css` | Text behaviour tokens: `--line-length` (Foundations › Text) |
| `src/tokens/space.css` | Spacing scale; shown on the Lab's Gap page, with no docs page until the Lab pages are promoted |
| `src/tokens/typography.css` | Font families, weights, type-scale roles and inline-code tokens (Styles › Typography) |

### Documentation site (`site/`)

Typography retains its overview at `/typography`. Its child pages are `/typography/text-styles` (beginner guide: quick start, roles, styles grouped by role, choosing, weights, base elements, small screens, line height and token reference) and `/typography/prose` (lists and inline code). Shape retains its overview at `/shape`, with child pages `/shape/corners` (the corner-radius scale) and `/shape/borders` (the border-width scale). These pages are loaded from `site/pages/` through `site/pageRegistry.ts`; `site/siteStructure.ts` defines the linked parent and children.

| Path | Purpose |
| --- | --- |
| `site/AppShell.tsx` | Site layout, theme state and route selection; applies and saves a theme change before rendering; delegates page rendering to page components and the loading boundary |
| `site/favicon.svg` | Staircase Z favicon with neutral-200 background and neutral-950 mark, embedded for use outside the site CSS |
| `site/index.html` | HTML shell for the showcase site, including its favicon reference |
| `site/main.tsx` | Showcase browser entry point; restores and applies the saved theme before rendering |
| `site/PageLoader.tsx` | Documentation loading and error states, reload action, and section-link scrolling after a page loads |
| `site/pageRegistry.ts` | Maps implemented documentation page IDs to lazy imports so only the requested page loads |
| `site/PAGES.md` | How documentation site pages are built: folders, the component page template, and Related pages and References |
| `site/siteStructure.ts` | Single source of truth for nested IA groups, routes, labels, implementation status; top-level groups are Get started, Principles, Foundations (does not change with the theme; Interaction is a group with Target size under it, and Text a group with Fluid text and Reading direction under it), Styles (changes with the theme), Themes and Components; Components contains Navigation, Actions and controls, Forms and input, Overlays, and Cards, with the top-navigation page at `/navbar` and remaining pages awaiting categorisation |
| `site/styles.css` | Responsive layout and presentation used only by the showcase site |
| `site/themeSwitcherLogic.ts` | Theme option validation, device colour-scheme subscription, system-theme resolution, root-attribute application and saved visitor preference |
| `site/assets/mezzanine-logo.svg` | Mezzanine brand icon: a Z with a staircase diagonal; standalone SVG using currentColor |
| `site/assets/sidebar-example.svg` | Neutral geometric image demonstrating sidebar content composition |
| `site/components/ColorSwatch.tsx` | Displays a palette shade, its number and resolved colour value with readable text |
| `site/components/colorSwatchLogic.ts` | Contrast calculation used to choose light or dark text inside ColorSwatch |
| `site/components/docsContentsContext.ts` | Shares the AppShell contents destination with documentation pages |
| `site/components/DocsDisclosureGroup.tsx` | Composes Mezzanine disclosures for grouped technical documentation sections (level 3 headers), or for a single collapsible top-level section (level 2) |
| `site/components/DocsDisclosureGroupLogic.ts` | Opens the containing documentation disclosure for initial, changed and repeated URL anchors; scrolls to changed and repeated anchors using the motion policy's scroll behaviour |
| `site/components/DocsTable.tsx` | Shared Mezzanine Table presentation for named documentation entries and their purposes, with an optional description column label |
| `site/components/DocsTableOfContents.tsx` | Page contents shown inline after the page heading on narrower screens and in the right column on wide screens |
| `site/components/ExampleZone.tsx` | Shared documentation example frame, preserving the standard CSS and optional example-specific classes |
| `site/components/MezzanineNavbar.tsx` | Supplies Mezzanine branding, Docs and Lab links, theme actions and, in the narrow-screen menu, the docs NavTree under Docs on docs pages or the Lab's NavTree (passed in as `labNavigation`) under Lab on Lab pages, to the library Navbar |
| `site/components/Sidebar.tsx` | Docs composition of the public non-collapsible SidebarPanel and NavTree navigation for wider screens, expanding the current page's ancestor groups; exports DocsNavigation for the Navbar menu, plus NavigationPanel and SidebarColumn so the Lab can pass in its own NavTree without the site importing Lab code |
| `site/components/SpacingScale.tsx` | Every spacing token with a bar of its size, its live value and its usual pixel size; used by the Lab's Gap page |
| `site/components/ThemeSwitcher.tsx` | Site theme switcher composing Mezzanine toggle buttons for Light, Dark and Wireframe |
| `site/components/TokenValue.tsx` | Displays a live CSS token value as code |
| `site/components/tokenValueLogic.ts` | Reads current CSS token values and re-reads them when the theme, device colour scheme or motion setting changes, and describes font-size tokens in pixels |
| `site/content/accessibilityContent.tsx` | Target, React Aria and Mezzanine rows, checking notes and links for the Accessibility page |
| `site/content/badgeContent.tsx` | Badge written guidance, reference entries, related pages and external references |
| `site/content/breadcrumbsContent.tsx` | Breadcrumbs written guidance, reference entries, related pages and external references |
| `site/content/buttonContent.tsx` | Button guidance, variants, sizes, states, token descriptions, related pages and references |
| `site/content/cardContent.tsx` | Card guidance, example labels, anatomy, token descriptions, related pages and references |
| `site/content/codeBlockContent.tsx` | Code block guidance, example code, anatomy, token descriptions, related pages and references |
| `site/content/checkboxContent.tsx` | Checkbox written guidance, reference entries, related pages and external references |
| `site/content/colorContent.ts` | Colour palette descriptions, shade steps and semantic colour-role reference entries |
| `site/content/dialogContent.tsx` | Dialog written guidance, reference entries, related pages and external references |
| `site/content/disclosureContent.tsx` | Disclosure written guidance, reference entries, related pages and external references |
| `site/content/elevationContent.ts` | Elevation levels and uses, colour tokens, source paths, what each theme sets and links |
| `site/content/foundationsContent.tsx` | Definition, page list and shared notes for the Foundations overview page |
| `site/content/homeContent.ts` | Home attribution, title, description and documentation link |
| `site/content/iconsContent.tsx` | Names and rendered examples for every icon exported by Mezzanine |
| `site/content/interactionContent.tsx` | Interaction states, behaviour descriptions, token notes and lists, and links for the Interaction page |
| `site/content/linkContent.tsx` | Link written guidance, reference entries, related pages and external references |
| `site/content/motionContent.tsx` | Motion timing, token and reduced-motion reference descriptions |
| `site/content/navbarContent.tsx` | Navbar introduction, rich-text guidance and Anatomy, Props and CSS token reference entries |
| `site/content/navigationTreeContent.tsx` | Nav Tree written guidance, reference entries, related pages and external references |
| `site/content/radioGroupContent.tsx` | RadioGroup guidance, anatomy, states, token descriptions, related pages and references |
| `site/content/shapeContent.ts` | Corner-radius and border-width labels and token names displayed on the Corners and Borders pages |
| `site/content/sidebarContent.tsx` | Sidebar guidance, prop and token references, and neutral example labels |
| `site/content/siteContent.ts` | Shared site name, skip-link label and not-found/not-implemented messages |
| `site/content/spacingContent.ts` | Spacing scale steps displayed by SpacingScale on the Lab's Gap page |
| `site/content/tabBarContent.tsx` | TabBar written guidance, reference entries, related pages and external references |
| `site/content/tableContent.tsx` | Table sample rows and column definitions, written guidance, reference entries, related pages and external references |
| `site/content/tableOfContentsContent.tsx` | TableOfContents written guidance, reference entries, related pages and external references |
| `site/content/tabsContent.tsx` | Tabs written guidance, reference entries, related pages and external references |
| `site/content/textAreaContent.tsx` | TextArea written guidance, reference entries, related pages and external references |
| `site/content/textFieldContent.tsx` | TextField written guidance, reference entries, related pages and external references |
| `site/content/textContent.tsx` | Text page wording for line length and long words, CSS properties and related pages |
| `site/content/readingDirectionContent.tsx` | Reading direction page wording, code example, right-to-left and vertical example text, related pages and references |
| `site/content/fluidTextContent.tsx` | Fluid text page wording, example text, CSS properties, the six fluid size tokens, related pages and references |
| `site/content/textStylesContent.ts` | Text style intro, code example, roles, style names and purposes, recommended choices (kept identical to TYPOGRAPHY.md by check:rules), weight examples, base elements and token names |
| `site/content/toggleButtonContent.tsx` | ToggleButton written guidance, reference entries, related pages and external references |
| `site/content/tooltipContent.tsx` | Tooltip introduction, anatomy, behaviour, usage, props, tokens and reference links |
| `site/content/typographyContent.tsx` | Typography overview intro, How typography works layers and theme example code |
| `site/pages/AccessibilityPage.tsx` | Foundations page for accessibility that applies everywhere: WCAG target, React Aria behaviour, Mezzanine additions and checks; loaded only when its route is requested |
| `site/pages/BadgePage.tsx` | Badge examples and variants; loaded only when its route is requested |
| `site/pages/BreadcrumbsPage.tsx` | Breadcrumb hierarchy and disabled examples; loaded only when its route is requested |
| `site/pages/ButtonPage.tsx` | Button examples, states, sizes and token reference; loaded only when its route is requested |
| `site/pages/CardPage.tsx` | Card example and technical details; loaded only when its route is requested |
| `site/pages/CodeBlockPage.tsx` | Code block example and technical details; loaded only when its route is requested |
| `site/pages/CheckboxPage.tsx` | Checkbox example and selection states; loaded only when its route is requested |
| `site/pages/ColorPage.tsx` | Palette swatches and semantic color-role reference; loaded only when its route is requested |
| `site/pages/DialogPage.tsx` | Dialog documentation content and modal examples, composed with the shared template; loaded only when requested |
| `site/pages/DisclosurePage.tsx` | Disclosure and DisclosureGroup examples; loaded only when its route is requested |
| `site/pages/ElevationPage.tsx` | Elevation level cards and shared Technical details (CSS properties, tokens with live values, what each theme sets, focus note) with source links; loaded only when its route is requested |
| `site/pages/FoundationsPage.tsx` | Foundations overview: what applies to every Foundation and links to each page; loaded only when its route is requested |
| `site/pages/HomePage.tsx` | Home hero and wordmark composition using the separate Home content |
| `site/pages/IconsPage.tsx` | Exported icon catalogue; loaded only when its route is requested |
| `site/pages/InteractionPage.tsx` | Interaction states, focus, pointer and touch, keyboard and disabled behaviour, with shared Technical details; loaded only when its route is requested |
| `site/pages/IntroductionPage.tsx` | Design-system introduction; loaded only when its route is requested |
| `site/pages/LinkPage.tsx` | Link states and content examples; loaded only when its route is requested |
| `site/pages/MotionPage.tsx` | Motion timing, tokens and reduced-motion guidance; loaded only when its route is requested |
| `site/pages/NavbarPage.tsx` | Composes Navbar content with the shared template and owns the live example state |
| `site/pages/NavigationTreePage.tsx` | Hierarchical navigation example; loaded only when its route is requested |
| `site/pages/NotFoundPage.tsx` | Unknown-route heading and return-home link |
| `site/pages/NotImplementedPage.tsx` | WIP page heading and not-implemented message |
| `site/pages/ProsePage.tsx` | List and inline-code examples; loaded only when its route is requested |
| `site/pages/RadioGroupPage.tsx` | RadioGroup anatomy, states, validation and token reference; loaded only when its route is requested |
| `site/pages/ShapePage.tsx` | Shape overview linking to Corners and Borders; loaded only when its route is requested |
| `site/pages/CornersPage.tsx` | Corner-radius scale and guidance for styling all corners or individual corners; loaded only when its route is requested |
| `site/pages/BordersPage.tsx` | Border-width scale, hairline guidance and how to use the scale; loaded only when its route is requested |
| `site/pages/SidebarPage.tsx` | Real Sidebar examples for mixed content, collapse options, multiple independent panels and the actual documentation sidebar |
| `site/pages/TabBarPage.tsx` | Live TabBar example and verified composition, overflow and placement guidance |
| `site/pages/TableOfContentsPage.tsx` | Showcase table-of-contents examples and props; loaded only when its route is requested |
| `site/pages/TablePage.tsx` | Table selection, sorting, empty-state and anatomy examples; loaded only when its route is requested |
| `site/pages/TabsPage.tsx` | Tabs documentation content and examples, composed with the shared template; loaded only when requested |
| `site/pages/TextAreaPage.tsx` | Multiline field examples, states, composition and vertical resizing guidance |
| `site/pages/TextFieldPage.tsx` | TextField composition, editing, states and local validation examples |
| `site/pages/TextPage.tsx` | Foundations › Text: line length and long words, with real Card examples and the `--line-length` token; loaded only when its route is requested |
| `site/pages/ReadingDirectionPage.tsx` | Foundations › Text › Reading direction in three sections: Start and end (physical and logical sides, with a right-to-left example built on Split and a Checkbox), Right to left (Arabic, Persian, Urdu and Hebrew) and Top to bottom (Japanese, Simplified and Traditional Chinese), with real Card examples |
| `site/pages/FluidTextPage.tsx` | Foundations › Text › Fluid text: how Display and Heading sizes grow with the screen through `clamp()` while other text stays fixed, an example of the real text styles, and Technical details with CSS properties and the fluid size tokens read from the token source |
| `site/pages/TargetSizePage.tsx`, `site/content/targetSizeContent.tsx` | Foundations › Interaction › Target size: the WCAG minimum and Mezzanine's 44px target size, the two target-size tokens read from the token source, and the components that use them |
| `site/pages/TextStylesPage.tsx` | Beginner guide to the text styles: quick start, roles, grouped styles, choosing, weights, base elements, small screens, line height and token reference; loaded only when its route is requested |
| `site/pages/ToggleButtonPage.tsx` | Standalone and grouped toggle examples; loaded only when its route is requested |
| `site/pages/TooltipPage.tsx` | Live Tooltip example and shared-template documentation under Overlays |
| `site/pages/TypographyPage.tsx` | Typography overview, How typography works layers and live Label token example; loaded only when its route is requested |
| `site/public/robots.txt` | Served unchanged at `/robots.txt`; allows crawling so search engines can read the pre-launch `noindex` response header |
| `site/templates/DocsPageTemplate.tsx` | Shared docs page template, used by component pages, converted Foundations and Styles pages and the Lab (On this page can be turned off for short index pages): owns the site-only PageHeading presentation and composes it with generated On this page links, technical disclosures, optional collapsible sections (a closed Disclosure that its On this page link opens) and reference sections from page-supplied content |

### Lab (`site/lab/`)

| Path | Purpose |
| --- | --- |
| `site/lab/labContent.tsx` | Lab labels, the experiment list and the Lab's NavTree items: Layout at the top level, its groups each holding their pages, then Layers, Browser and device, Emerging features, Components (holding Search), and the pages outside the experiments: Reading order and Style priority |
| `site/lab/LabPage.tsx`, `site/lab/lab-page.css` | Lab route entry: the site's Navbar and sidebar layout with the Lab's NavTree, Components and Search, the Layers, Browser and device and Emerging features experiments, the top-level Reading order and Style priority pages and the On this page column used by DocsPageTemplate; chooses the index, the Layout overview, a group, a group page, an experiment page or the not-found page from the address |
| `site/lab/ComponentsPage.tsx` | Lab Components section (heading only) and its Search page, built with DocsPageTemplate |
| `site/lab/SearchLab.tsx`, `site/lab/search-lab.css` | Lab search experiment: SearchField and ListBox joined by Autocomplete in a modal Dialog opened by a Search Button, following React Aria's command palette example; Lab-scoped layout with a candidate dialog height |
| `site/lab/searchLabContent.ts` | Sample results for the search experiment: every linked page in the docs and Lab navigation trees, grouped as Docs and Lab, with the groups above each page |
| `site/lab/LayoutPage.tsx` | Lab Layout pages: the overview (built with DocsPageTemplate) with a section per group, and the group and group page routes, keyed by slug, plus the demos for the Lab pages outside Layout; illustrative and unapproved |
| `site/lab/layout/layoutLabContent.ts` | Plain-English explanations for the Layout pages: the groups and their page order, each group page with its address, subtitle, sources and any Also known as names, the Lab pages outside Layout, their CSS notes, frame presets and environment queries |
| `site/lab/layout/boxCssNotes.ts` | The CSS behind each stage page's examples, in plain English, merged into Layout's CSS notes |
| `site/lab/layout/layoutLabLogic.ts` | Live media-query matching without effects, CSS support checks, and live viewport-height and safe-area measurement that updates on resize, rotation and toolbar changes |
| `site/lab/layout/LabParts.tsx` | Width-slider demo frame, demo headings and text, CSS notes, value pickers and emerging-feature support badges |
| `site/lab/layout/LabPrimitives.tsx` | Lab-only building blocks following Bedrock Layouts and Every Layout: Column, Row, RowWrap, Columns, Grid, RowWrapAndGrow, Center, AspectRatio, Hero and Reel, with limits as custom properties |
| `site/lab/layout/StagePages.tsx` | Lab Layout pages built with the site's DocsPageTemplate: a group's overview, with a Card per page and no On this page list; a stage page with an optional Also known as (a closed Disclosure holding a Table of what Figma, CSS, Tailwind CSS, Bootstrap and Material Design call the same thing), How it works (introduction and browser support), and Example (the demos, the CSS behind them and any Mezzanine detail, such as the spacing scale on Gap), with a building block's sources as References; and a Lab page outside Layout, with How it works and Example |
| `site/lab/layout/TheBoxDemos.tsx` | Box basics, Add space and Inside the box examples from the first stage: the box model (its own page, first in Box basics), margin, padding, types of box (display: block, inline, inline-block and none), measuring the box (units and clamp()), sizing the box (box-sizing), Aspect ratio and Center |
| `site/lab/layout/InsideTheBoxDemos.tsx` | Inside the box examples: filling the box (images and media), overflowing the box, content columns and Box has content |
| `site/lab/layout/ArrangingBoxesDemos.tsx` | Grid (the technique with its two recipes, a set number of columns and as many columns as fit), subgrid, alignment and gap (with the real spacing tokens) examples, and the reading-order demo for the Lab's Reading order page |
| `site/lab/layout/BoxFormationDemos.tsx` | Building block examples: Column, Hero, Row, Row wrap, Reel and Split, and the two grid recipes shown on the Grid page |
| `site/lab/layout/BoxesOnDevicesDemos.tsx` | Browser and device experiment examples: media queries (live answers for this browser), safe areas and touch targets |
| `site/lab/layout/FoundationDemos.tsx` | Demos for row wrap and grow, fluid sizing (fluid space, fluid width and safe minimums; fluid text is in the Docs), container queries and viewport units (now in their groups), the Layers experiment (positioning, ordering layers, bundles of layers and scroll padding), the Browser and device experiment's Supports page, and Style priority, outside the experiments (the cascade, including cascade layers) |
| `site/lab/layout/EmergingFeatureDemos.tsx` | Emerging features pages, one per feature, each with support detection: masonry with grid-lanes, scroll-state queries, anchor positioning and field sizing |
| `site/lab/layout/layout-lab.css` | Lab-scoped styles and illustrative --lab-* candidate tokens for the Layout pages |

### Browser tests (`tests/`)

| Path | Purpose |
| --- | --- |
| `tests/accessibility.ts` | Shared browser-test helper that runs an automated WCAG 2.2 AA accessibility scan on chosen parts of a page |
| `tests/display.ts` | Shared browser-test helpers for the three themes, normal and 200% text sizes, and a retrying no-horizontal-overflow check |
| `tests/components/button.spec.ts` | Button content options, href navigation and actions, the landing Read docs link matching the shared Button, and the pending ring under reduced motion |
| `tests/components/card.spec.ts` | Card example structure, reflow at 320px with normal and doubled text, and accessibility in each theme |
| `tests/components/code-block.spec.ts` | Code block structure, kept line breaks, reflow at 320px with normal and doubled text, and accessibility in each theme |
| `tests/components/disclosure.spec.ts` | Disclosure reflow, immediate panels in every theme and motion setting, find-in-page and group switching |
| `tests/components/navbar.spec.ts` | Navbar example keyboard, responsive, theme, contrast and forced-colour checks |
| `tests/components/split.spec.ts` | Split sharing by fraction and by auto, and stacking at full width in a narrow container at normal and doubled text, using the Lab's Split page |
| `tests/components/sidebar.spec.ts` | Sidebar collapse, independent state, modal focus, responsiveness and accessibility checks |
| `tests/components/tab-bar.spec.ts` | TabBar overflow, navigation, sheet focus and responsive accessibility regression checks |
| `tests/components/table.spec.ts` | Table sorting interactions, keyboard and pointer activation, sort indicators and responsive contrast checks |
| `tests/components/text-field.spec.ts` | TextField keyboard, validation, responsive and automated accessibility checks |
| `tests/components/toggle-button.spec.ts` | Secondary toggle selection, keyboard, theme, responsive and forced-colour checks |
| `tests/components/tooltip.spec.ts` | Theme tooltip hover, keyboard dismissal, responsive positioning and accessibility checks |
| `tests/lab/search.spec.ts` | Lab search experiment: filtering while focus stays in the field, arrow keys and Enter, Docs and Lab groups, the empty state, clearing with the button and Escape, closing and focus return, every result reachable by keyboard, 320px reflow at normal and doubled text with accessibility scans in each theme, and forced colours |
| `tests/lab/lab.spec.ts` | Lab navigation through the site menu at 320px with normal and doubled text, the shared sidebar layout, and the saved theme shared between Docs and Lab |
| `tests/lab/layout.spec.ts` | Lab Layout pages: 320px reflow at normal and doubled text and accessibility in each theme for the overview, every stage and every page, links from the overview, group Cards and navigation, container-query, Row switch, :has(), overflow and reading-order behaviour, CSS notes matching the stylesheet (and, for Split, the library's), and the closed Also known as Disclosure opening from its button or On this page |
| `tests/site/right-to-left.spec.ts` | Right-to-left mirroring: Checkbox's box at the start of the line, Breadcrumbs running from the right, nested Table of contents links indented from the right, and the Reading direction example's logical box mirroring while its physical box stays put |
| `tests/site/documentation-template.spec.ts` | Checks every implemented component page for matching headings and Contents links, unique anchors and narrow-screen reflow, plus inline On this page placement and anchor scrolling under each motion policy |
| `tests/site/elevation.spec.ts` | Checks the Elevation page fits each breakpoint width with normal and doubled text |
| `tests/site/motion.spec.ts` | Shared motion policy in each theme, nested themes, system precedence, loading indicators and the live Motion reference |
| `tests/site/route-loading.spec.ts` | Verifies route-specific downloads, delayed and failed loads, section links and theme-state preservation |
| `tests/site/site-navigation.spec.ts` | Documentation site Navbar: mobile menu, current section, landing and unknown routes |
| `tests/site/wireframe-links.spec.ts` | Checks Wireframe underlines across link patterns and narrow layouts while preserving Light and Dark treatments |

### Rule checks (`scripts/`)

| Path | Purpose |
| --- | --- |
| `scripts/check-rules.mjs` | Checks documentation controls, component class prefixes, library CSS colours, z-index values from the shared scale, logical sides (start and end, unless marked `physical:`), shared button sizing, typography, NavTree ownership, shared motion, allowed effects, docs facts (routes, tokens, Props tables) and the public API snapshot; supports explicit `--update-api` |
| `scripts/docs-rules.mjs` | Checks that site routes, including the Lab index, Layout overview, stages and their pages, match nginx in both directions and that Lighthouse URLs are allowed routes, that documented tokens exist and public tokens are documented, and parses Props table rows |
| `scripts/docs-rules.test.mjs` | Passing and failing fixtures for the docs rules |
| `scripts/effect-rules.mjs` | Finds React effect calls in the library and site and allows only the listed effects, each with an agreed reason |
| `scripts/effect-rules.test.mjs` | Passing and failing fixtures for effect rules |
| `scripts/motion-rules.mjs` | Parses motion declarations and TypeScript usage to enforce the shared contract |
| `scripts/motion-rules.test.mjs` | Passing and failing fixtures for motion rules |
| `scripts/public-api.snapshot.json` | Reviewed public export names and value/type categories used to detect API changes |
| `scripts/run-lighthouse.mjs` | Runs Lighthouse CI with the configured system Chrome or Playwright Chromium fallback |
| `scripts/typography-rules.mjs` | Checks that component CSS sets complete type-scale roles, Button text tokens point to the scale, and the documented and displayed style choices match |
| `scripts/typography-rules.test.mjs` | Passing and failing fixtures for typography rules |
| `scripts/undocumented-tokens.baseline.json` | Public tokens not yet documented on the site; the token check fails only on new gaps, and entries must be removed once documented |

### Configuration, deployment and project files

| Path | Purpose |
| --- | --- |
| `AGENTS.md` | Instructions for coding agents |
| `Dockerfile`, `.dockerignore` | Production image: builds the showcase and serves `site-dist/` with nginx |
| `fly.toml` | Fly.io app `mezzanine`, London region, and HTTP service settings |
| `LICENSE` | All rights reserved: the source is public to view, not licensed for use |
| `package.json`, `package-lock.json` | Package name, exports, peer dependencies, dev dependencies, and npm scripts |
| `playwright.config.ts` | Builds and serves the production showcase for Chromium tests, with CI safeguards, HTML reports in `reports/playwright/` and failure traces and screenshots in `reports/test-results/` |
| `README.md` | Short introduction for people visiting on GitHub: what Mezzanine is, links, running it locally and the licence |
| `tsconfig.json` | References the app and node TypeScript projects in `config/`; stays at the root so editors find it |
| `vite.config.ts` | Showcase build: React plugin, `site/` root, package-name alias, `site-dist/` output |
| `.githooks/pre-commit` | Gitleaks scan of staged changes |
| `.github/workflows/gitleaks.yml` | Gitleaks scan of the full history for pull requests, pushes to `main`, and manual workflow dispatches |
| `.github/workflows/lighthouse.yml` | Runs mobile and desktop Lighthouse CI audits of the showcase for pull requests, pushes to `main`, and manual workflow dispatches |
| `.github/workflows/playwright.yml` | Runs lint, builds and Chromium tests on pull requests and pushes to `main`, with downloadable reports and failure traces |
| `config/lighthouserc.mobile.json`, `config/lighthouserc.desktop.json` | Representative home, Button, Table, TabBar, Navbar and Tooltip page audits, mobile/desktop profiles, warning-only performance thresholds and local report destinations |
| `config/nginx.conf` | Static server for the showcase: allowed routes, real 404s, caching, gzip, and the pre-launch `noindex` header |
| `config/tsconfig.app.json` | Type checking for `src/` and `site/`, including the package-name path |
| `config/tsconfig.lib.json` | Emits the package's type declarations into `dist/` |
| `config/tsconfig.node.json` | Type checking for Vite and Playwright configuration files |
| `config/vite.lib.config.ts` | Package build: library mode, external peer dependencies, `dist/` output |

## Commands

| Command | Purpose |
| --- | --- |
| `npm ci` | Install locked dependencies |
| `npm run dev` | Start the showcase on the local Vite server |
| `npm run check:rules` | Run the rule checks' own tests (`scripts/*.test.mjs`), then check repository rules including shared motion without changing the API snapshot |
| `npm run lint` | Run Oxlint |
| `npm run typecheck` | Type-check the library, showcase, and configuration |
| `npm run build:lib` | Build the package into `dist/` |
| `npm run build:site` | Type-check and build the showcase into `site-dist/` |
| `npm run build` | Build both the package and the showcase |
| `npm run preview` | Preview the showcase build locally |
| `npm run test:e2e` | Build the showcase and run every browser test |
| `npm run lighthouse` | Build the showcase and run the mobile and desktop Lighthouse performance audits |
| `npm run lighthouse:mobile` | Build the showcase and run the mobile Lighthouse audit |
| `npm run lighthouse:desktop` | Build the showcase and run the desktop Lighthouse audit |
| `fly deploy` | Build the Docker image and deploy the showcase to mezzanine.fly.dev |
| `gitleaks git --staged --redact .` | Scan staged changes |

`dist/`, `site-dist/`, `reports/`, and `node_modules/` are generated and ignored by Git. `reports/` holds browser test output (`reports/playwright/`, `reports/test-results/`) and Lighthouse output (`reports/lighthouse/`).

Browser tests are grouped by subject: `tests/components/` has one file per component, `tests/site/` covers the documentation site and shared rules such as motion and Wireframe links, and `tests/lab/` covers the Lab.

`config/` holds configuration that tools are pointed at by a flag or path. Configuration that tools discover by itself stays at the root: `package.json`, `tsconfig.json`, `vite.config.ts`, `playwright.config.ts`, `fly.toml`, `Dockerfile` and the ignore files.

### Nav Tree ownership

| File | Purpose |
| --- | --- |
| `src/components/NavTree/NavTree.tsx` | Composed data-driven tree with owned controls, accessible labels, badges and sections |
| `src/components/NavTree/NavTree.css` | Tree-row appearance, control focus and policy-aware quarter-turn chevron |
| `src/components/NavTree/navTreeLogic.ts` | Private route/expansion reconciliation and recovery of focus lost through row removal |
| `site/components/sidebarNavigationItems.tsx` | Converts site structure to navigation data and WIP badge content |
| `scripts/nav-tree-rules.mjs`, `scripts/nav-tree-rules.test.mjs` | Ownership checks and regression fixtures for removed recipes, consumer internals and aliased composition |
| `tests/components/nav-tree.spec.ts`, `tests/components/fixtures/NavTreeHarness.tsx` | Isolated public-library checks for data, controlled state, focus, themes and reflow without site CSS, plus the documentation example's immediate rows, chevron motion and rapid toggles |
