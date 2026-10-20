# Project map

## Overview

Mezzanine has two parts that share this repository:

- **The library** (`src/`) is the `@decocode/mezzanine` package. `src/index.ts` is its only public entry point. `npm run build:lib` builds it into `dist/`.
- **The showcase** (`site/`) is the website for mezzanine.fly.dev. `site/index.html` provides the `#root` element, `site/main.tsx` mounts `site/AppShell.tsx`. It imports the library as `@decocode/mezzanine`, which `vite.config.ts` resolves to `src/index.ts`. `npm run build:site` builds it into `site-dist/`, which the Docker image serves with nginx on Fly.io.

The showcase includes an experimental sandbox in `site/lab/`, reached through **Lab** in the top bar at `/site/lab`, with four experiments and a Components section. Components, at `/site/lab/components`, shows only its heading so far; its child page, Search, at `/site/lab/components/search`, holds the search dialog experiment. Layers, at `/site/lab/layers`, holds Positioning, Ordering layers, Bundles of layers and Scroll padding. Browser and device, at `/site/lab/browser-and-device`, holds Media queries, Supports, Safe areas and Touch targets. Emerging features, at `/site/lab/emerging-features`, holds a page, marked Lab, for each feature not yet well supported (Masonry, Scroll-state queries, Anchor positioning and Field sizing). The other is Layout: an overview at `/site/lab/layout`, six groups named after what you want to do (Box basics, Add space, Inside the box, Side by side, Grids and columns and Container), each with an overview at `/site/lab/layout/<group>` and a page for each topic or building block at `/site/lab/layout/<group>/<page>`. Reading order and Style priority are Lab pages outside the experiments, at `/site/lab/<page>`. Its illustrative candidates are not approved library features.

The library currently exports React Aria `Breadcrumbs`, `Button`, `Checkbox`, `Link`, `RadioGroup`, `Disclosure`, `DisclosureGroup`, `Dialog`, `DialogTrigger`, `Heading`, `Modal`, `ModalOverlay`, `ToggleButton`, `ToggleButtonGroup` and the `Table` family, the semantic `Badge`, composed `DisclosureHeader`, `TableOfContents`, `TopBar`, `NavTree`, `AppShell`, `Panel` and `Footer` patterns, the icons in active DecoCode use, three official color themes and fifteen public typography classes. Components arrive during extraction from the decocode repository.

## Files and directories

### Library (`src/`)

| Path | Purpose |
| --- | --- |
| `src/index.ts` | Public entry point of the package; imports the default tokens and library styles and exports every component |
| `src/motion.css` | Internal finite/loading/scroll motion policy for theme scopes and the system preference; shared backdrop fade keyframes used by Modal and Panel drawers |
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
| `src/components/TopBar/TopBar.css` | Token-based TopBar layout, text-size-aware container breakpoint and reduced-motion-aware menu panel |
| `src/components/TopBar/TopBar.tsx` | Public sticky TopBar with brand, navigation and action areas, a React Aria Disclosure mobile menu with a menu trigger whose label shows in a tooltip, actions kept in the bar on narrow screens, and an isMenu render value for menu-only content |
| `src/components/RadioGroup/RadioGroup.css` | Token-led styling for RadioGroup, RadioField, RadioButton and SelectionIndicator |
| `src/components/RadioGroup/RadioGroup.ts` | Public current React Aria RadioGroup composition exports and prop types |
| `src/components/SelectionIndicator/SelectionIndicator.ts` | Public React Aria SelectionIndicator export and prop type |
| `src/components/AppShell/AppShell.tsx`, `src/components/AppShell/AppShell.css`, `src/components/AppShell/AppShell.tokens.css` | Public AppShell: frames an app's screen with a header row, Panels at the start, end and bottom edges, and the app's own main content followed by an optional Footer, which scroll together; measures itself to decide when a side Panel becomes a drawer |
| `src/components/AppShell/panelStore.ts` | Every Panel's open state in one AppShell, shared with PanelTriggers; drawers open only when someone opens them |
| `src/components/AppShell/appShellLayout.ts` | Decides whether each side Panel shares the space or becomes a drawer (end Panel first), and converts length tokens to pixels |
| `src/components/Footer/Footer.tsx`, `src/components/Footer/Footer.css` | Public Footer: a page's closing strip that arranges the app's small print and links in a row that wraps; inside AppShell it follows main and scrolls with it |
| `src/components/Panel/Panel.tsx`, `src/components/Panel/Panel.css`, `src/components/Panel/Panel.tokens.css` | Public Panel and PanelTrigger: an area at an AppShell edge that shares the space, with an optional minimised version, and the Button that opens and closes it; a side Panel without room opens as a React Aria Modal drawer |
| `src/components/RatioPair/RatioPair.tsx`, `src/components/RatioPair/RatioPair.css` | Public RatioPair (formerly Split) layout building block: two areas side by side that share the row by a fraction or by auto and stack when they can't both have their minimum width; layout only, following its container through flexbox wrapping |
| `src/components/Table/Table.css` | Token-led structural and interaction-state styling for the exported Table parts |
| `src/components/Table/Table.tsx` | React Aria Table parts and a Column wrapper that adds a shared sort-direction indicator |
| `src/components/TableOfContents/TableOfContents.css` | TableOfContents spacing, nested list layout and link targets using shared design tokens |
| `src/components/TableOfContents/TableOfContents.tsx` | Public Contents navigation composed from Heading and Link, with nested sections and a configurable heading |
| `src/components/Tabs/Tabs.tsx`, `src/components/Tabs/Tabs.css` | Public Tabs, TabList, Tab and TabPanel APIs, with the official selection-indicator composition and token-based horizontal/vertical styling |
| `src/components/Text/Text.ts` | Public React Aria Text export and prop type |
| `src/components/{CheckboxGroup,ComboBox,DropZone,FileTrigger,Form,GridList,Group,Menu,Meter,NumberField,Popover,PreviewTrigger,ProgressBar,Select,Separator,Sheet,Slider,Switch,TagGroup,TokenField,Toolbar,Tree,Virtualizer}/*.ts` | Thin React Aria re-exports, mostly for AI chat interfaces (one component family per file, with prop types); no Mezzanine styles yet |
| `src/components/TextArea/TextArea.ts` | Public React Aria TextArea export and type; composes with TextField for multiline input |
| `src/components/SearchField/SearchField.tsx`, `src/components/SearchField/SearchField.css` | Public React Aria SearchField wrapper that adds the search icon and a clear button (the shared Button) around the app's Label and Input; the Input keeps the shared field appearance |
| `src/components/TextField/TextField.css` | Shared TextField, Input and TextArea layout, interaction states and forced-colour styling |
| `src/components/TextField/TextField.ts` | Public React Aria TextField and Input exports and types |
| `src/components/ToggleButton/ToggleButton.css` | Token-led styling for ToggleButton states and ToggleButtonGroup layout |
| `src/components/ToggleButton/ToggleButton.ts` | React Aria ToggleButton and ToggleButtonGroup with shared button sizes, icon content, optional secondary appearance and preserved selection APIs |
| `src/components/Tooltip/Tooltip.css` | Token-based tooltip layout, fade animation, reduced-motion and forced-colour rules |
| `src/components/Tooltip/Tooltip.tsx` | React Aria Tooltip exports and TooltipTrigger with a configurable 500ms default hover delay |
| `src/docs/COMPONENTS.md` | How apps use Button, TopBar, Table sorting, NavTree, Tooltip, AppShell, Panel and Footer |
| `src/docs/TOKENS.md` | Plain-language guide to the token model, official themes, current inventory and naming rules |
| `src/docs/TYPOGRAPHY.md` | Typography roles, named styles, defaults, pattern mappings, theming guidance, and accessibility checks |
| `src/icons/Icons.tsx` | Public Mezzanine icon library extracted from the icons in active DecoCode use |
| `src/icons/StudioIcons.tsx` | Public action, navigation, transport and sequencer icons imported from Rhythm Directives' active icon modules |
| `src/themes/dark.css` | Neutral Dark theme, including automatic device-preference handling |
| `src/themes/light.css` | Neutral Light theme and the fallback when no preference is available |
| `src/themes/wireframe.css` | Monochrome Wireframe theme with semantic status colors and blue focus |
| `src/tokens/color.css` | Colour palettes; semantic colour roles are set per theme (Styles › Color) |
| `src/tokens/interaction.css` | Shared disabled opacity (Foundations › Interaction) target sizes: `--target-size-min` (the WCAG minimum) and the shared scale `--target-size-xs` to `--target-size-xl`, which every interactive element takes its height from, documented on Interaction › Target size |
| `src/tokens/elevation.css` | Elevation levels built from the shadow and highlight colours; each theme sets its shadow colour (Styles › Elevation) |
| `src/tokens/motion.css` | Durations, easing, distances, scale and rotation (Styles › Motion) |
| `src/tokens/z-index.css` | The shared stacking scale: base, raised, sticky, overlay (every pop-up) and toast; not yet documented on a site page |
| `src/tokens/shape.css` | Corner-radius and border-width scales (Styles › Shape › Corners and Borders) |
| `src/tokens/text.css` | Text behaviour tokens: `--line-length` (Foundations › Text) |
| `src/tokens/icon.css` | Icon size scale, `--icon-size-xs` to `--icon-size-xl`, which Button, ToggleButton, Checkbox, the Disclosure and NavTree chevrons, and SearchField take their icon sizes from; not yet documented on a site page |
| `src/tokens/space.css` | Spacing scale; shown on the Lab's Gap page, with no docs page until the Lab pages are promoted |
| `src/tokens/typography.css` | Font families, weights, type-scale roles and inline-code tokens (Styles › Typography) |

### Documentation site (`site/`)

Typography retains its overview at `/typography`. Its child pages are `/typography/text-styles` (beginner guide: quick start, roles, styles grouped by role, choosing, weights, base elements, small screens, line height and token reference) and `/typography/prose` (lists and inline code). Shape retains its overview at `/shape`, with child pages `/shape/corners` (the corner-radius scale) and `/shape/borders` (the border-width scale). These pages are loaded from `site/pages/` through `site/pageRegistry.ts`; `site/siteStructure.ts` defines the linked parent and children.

| Path | Purpose |
| --- | --- |
| `site/AppShell.tsx` | Site layout, theme state and route selection; applies and saves a theme change before rendering; docs pages render inside DocsShell, and page rendering is delegated to page components and the loading boundary |
| `site/favicon.svg` | Staircase Z favicon with neutral-200 background and neutral-950 mark, embedded for use outside the site CSS |
| `site/index.html` | HTML shell for the showcase site, including its favicon reference |
| `site/main.tsx` | Showcase browser entry point; restores and applies the saved theme before rendering |
| `site/PageLoader.tsx` | Documentation loading and error states, reload action, and section-link scrolling after a page loads |
| `site/pageRegistry.ts` | Finds each implemented page's component in the folder its place in the navigation gives it, loading it only when the page is visited |
| `site/PAGES.md` | How documentation site pages are built: folders, the component page template, and Related pages and References |
| `site/siteStructure.ts` | Single source of truth for nested IA groups, routes, labels, implementation status; top-level groups are Get started, Foundations (does not change with the theme; Interaction is a group with Target size under it, and Text a group with Fluid text and Reading direction under it), Styles (changes with the theme), Themes and Components; Components contains Navigation, Actions and controls, Forms and input, Overlays, Cards and Structure (AppShell, TopBar, Panel, Rail and Footer), with remaining pages awaiting categorisation |
| `site/styles.css` | Responsive layout and presentation used only by the showcase site |
| `site/themeSwitcherLogic.ts` | Theme option validation, device colour-scheme subscription, system-theme resolution, root-attribute application and saved visitor preference |
| `site/assets/mezzanine-logo.svg` | Mezzanine brand icon: a Z with a staircase diagonal; standalone SVG using currentColor |
| `site/pages/styles/color/ColorSwatch.tsx` | Displays a palette shade, its number and resolved colour value with readable text |
| `site/pages/styles/color/colorSwatchLogic.ts` | Contrast calculation used to choose light or dark text inside ColorSwatch |
| `site/components/docsContentsContext.ts` | The store through which a page hands its sections to DocsShell, registered from a ref callback |
| `site/components/DocsShell.tsx` | The frame shared by docs and Lab pages: the library AppShell with the navigation in a start Panel and the page's sections in an end Panel, both always open |
| `site/components/DocsDisclosureGroup.tsx` | Composes Mezzanine disclosures for grouped technical documentation sections (level 3 headers), or for a single collapsible top-level section (level 2) |
| `site/components/DocsDisclosureGroupLogic.ts` | Opens the containing documentation disclosure for initial, changed and repeated URL anchors; scrolls to changed and repeated anchors using the motion policy's scroll behaviour |
| `site/components/DocsTable.tsx` | Shared Mezzanine Table presentation for named documentation entries and their purposes, with an optional description column label |
| `site/components/RichText.tsx` | Renders content-file copy, turning its `code`, **strong** and [label](href) markers into elements |
| `site/components/DocsTableOfContents.tsx` | Page contents shown inline after the page heading; also hands the sections to DocsShell's end Panel, which replaces the inline copy when there's room |
| `site/components/ExampleZone.tsx` | Shared documentation example frame, preserving the standard CSS and optional example-specific classes |
| `site/components/SiteTopBar.tsx` | Supplies Mezzanine branding, Docs and Lab links, theme actions and, in the narrow-screen menu, the docs NavTree under Docs on docs pages or the Lab's NavTree (passed in as `labNavigation`) under Lab on Lab pages, to the library TopBar |
| `site/components/NavigationPanel.tsx` | NavigationPanel (a section's NavTree in a navigation landmark) for the Panels and the TopBar menu, and DocsNavigation for the docs |
| `site/components/ThemeSwitcher.tsx` | Site theme switcher composing Mezzanine toggle buttons for Light, Dark and Wireframe |
| `site/components/TokenValue.tsx` | Displays a live CSS token value as code |
| `site/components/tokenValueLogic.ts` | Reads current CSS token values and re-reads them when the theme, device colour scheme or motion setting changes, and describes font-size tokens in pixels |
| `site/pages/foundations/accessibility/accessibilityContent.ts` | Target, React Aria and Mezzanine rows, checking notes and links for the Accessibility page |
| `site/pages/components/badge/badgeContent.ts` | Badge written guidance, reference entries, related pages and external references |
| `site/pages/styles/shape/borders/bordersContent.ts` | Borders page wording: border width, baseline width and using the scale |
| `site/pages/components/navigation/breadcrumbs/breadcrumbsContent.ts` | Breadcrumbs written guidance, reference entries, related pages and external references |
| `site/pages/components/actions-and-controls/button/buttonContent.ts` | Button guidance, variants, sizes, states, token descriptions, related pages and references |
| `site/pages/components/cards/card/cardContent.ts` | Card guidance, example labels, anatomy, token descriptions, related pages and references |
| `site/pages/components/code-block/codeBlockContent.ts` | Code block guidance, example code, anatomy, token descriptions, related pages and references |
| `site/pages/components/forms-and-input/checkbox/checkboxContent.ts` | Checkbox written guidance, reference entries, related pages and external references |
| `site/pages/styles/color/colorContent.ts` | Colour palette descriptions, shade steps and semantic colour-role reference entries |
| `site/pages/styles/shape/corners/cornersContent.ts` | Corners page wording: corner radius, individual corners and using the scale |
| `site/pages/components/overlays/dialog/dialogContent.ts` | Dialog written guidance, reference entries, related pages and external references |
| `site/pages/components/disclosure/disclosureContent.ts` | Disclosure written guidance, reference entries, related pages and external references |
| `site/pages/styles/elevation/elevationContent.ts` | Elevation levels and uses, colour tokens, source paths, what each theme sets and links |
| `site/pages/foundations/foundationsContent.ts` | Definition, page list and shared notes for the Foundations overview page |
| `site/pages/home/homeContent.ts` | Home attribution, title, description and documentation link |
| `site/pages/styles/icons/iconsContent.ts` | Names and rendered examples for every icon exported by Mezzanine |
| `site/pages/foundations/interaction/interactionContent.ts` | Interaction states, behaviour descriptions, token notes and lists, and links for the Interaction page |
| `site/pages/foundations/interaction/target-size/targetSizeContent.ts` | Target size page wording, the target size tokens (`--target-size-min` and `--target-size-xs` to `--target-size-xl`) and links |
| `site/pages/get-started/introduction/introductionContent.ts` | Introduction page title and description |
| `site/pages/components/navigation/link/linkContent.ts` | Link written guidance, reference entries, related pages and external references |
| `site/pages/styles/motion/motionContent.ts` | Motion timing, token and reduced-motion reference descriptions |
| `site/pages/components/structure/app-shell/appShellContent.ts`, `site/pages/components/structure/app-shell/AppShellPage.tsx` | AppShell docs page: anatomy, behaviour, usage, accessibility, props and token |
| `site/pages/components/structure/app-shell/AppShellExample.tsx` | The live AppShell example with Panels A, B and C, shared by the AppShell and Panel pages |
| `site/pages/components/structure/footer/footerContent.ts`, `site/pages/components/structure/footer/FooterPage.tsx` | Footer docs page with a live example of small print and links |
| `site/pages/components/structure/panel/panelContent.ts`, `site/pages/components/structure/panel/PanelPage.tsx` | Panel docs page, covering Panel and PanelTrigger |
| `site/pages/components/structure/top-bar/topBarContent.ts` | TopBar introduction, rich-text guidance and Anatomy, Props and CSS token reference entries |
| `site/pages/components/navigation/navigation-tree/navigationTreeContent.ts` | Nav Tree written guidance, reference entries, related pages and external references |
| `site/pages/components/forms-and-input/radio-group/radioGroupContent.ts` | RadioGroup guidance, anatomy, states, token descriptions, related pages and references |
| `site/pages/styles/shape/shapeContent.ts` | Shape overview page wording, and the corner-radius and border-width levels the Corners and Borders pages display |
| `site/pages/styles/typography/prose/proseContent.ts` | Prose page wording: lists and inline code, with placeholders for live values |
| `site/siteContent.ts` | Shared site name, skip-link label and not-found/not-implemented messages |
| `site/pages/components/table/tableContent.ts` | Table sample rows and column definitions, written guidance, reference entries, related pages and external references |
| `site/pages/components/navigation/table-of-contents/tableOfContentsContent.ts` | TableOfContents written guidance, reference entries, related pages and external references |
| `site/pages/components/navigation/tabs/tabsContent.ts` | Tabs written guidance, reference entries, related pages and external references |
| `site/pages/components/forms-and-input/text-area/textAreaContent.ts` | TextArea written guidance, reference entries, related pages and external references |
| `site/pages/components/forms-and-input/text-field/textFieldContent.ts` | TextField written guidance, reference entries, related pages and external references |
| `site/pages/foundations/text/textContent.ts` | Text page wording for line length and long words, CSS properties and related pages |
| `site/pages/foundations/text/reading-direction/readingDirectionContent.ts` | Reading direction page wording, code example, right-to-left and vertical example text, related pages and references |
| `site/pages/foundations/text/fluid-text/fluidTextContent.ts` | Fluid text page wording, example text, CSS properties, the six fluid size tokens, related pages and references |
| `site/pages/styles/typography/text-styles/textStylesContent.ts` | Text style intro, code example, roles, style names and purposes, recommended choices (kept identical to TYPOGRAPHY.md by check:rules), weight examples, base elements and token names |
| `site/pages/components/actions-and-controls/toggle-button/toggleButtonContent.ts` | ToggleButton written guidance, reference entries, related pages and external references |
| `site/pages/components/overlays/tooltip/tooltipContent.ts` | Tooltip introduction, anatomy, behaviour, usage, props, tokens and reference links |
| `site/pages/styles/typography/typographyContent.ts` | Typography overview intro, How typography works layers and theme example code |
| `site/pages/foundations/accessibility/AccessibilityPage.tsx` | Foundations page for accessibility that applies everywhere: WCAG target, React Aria behaviour, Mezzanine additions and checks; loaded only when its route is requested |
| `site/pages/components/badge/BadgePage.tsx` | Badge examples and variants; loaded only when its route is requested |
| `site/pages/components/navigation/breadcrumbs/BreadcrumbsPage.tsx` | Breadcrumb hierarchy and disabled examples; loaded only when its route is requested |
| `site/pages/components/actions-and-controls/button/ButtonPage.tsx` | Button examples, states, sizes and token reference; loaded only when its route is requested |
| `site/pages/components/cards/card/CardPage.tsx` | Card example and technical details; loaded only when its route is requested |
| `site/pages/components/code-block/CodeBlockPage.tsx` | Code block example and technical details; loaded only when its route is requested |
| `site/pages/components/forms-and-input/checkbox/CheckboxPage.tsx` | Checkbox example and selection states; loaded only when its route is requested |
| `site/pages/styles/color/ColorPage.tsx` | Palette swatches and semantic color-role reference; loaded only when its route is requested |
| `site/pages/components/overlays/dialog/DialogPage.tsx` | Dialog documentation content and modal examples, composed with the shared template; loaded only when requested |
| `site/pages/components/disclosure/DisclosurePage.tsx` | Disclosure and DisclosureGroup examples; loaded only when its route is requested |
| `site/pages/styles/elevation/ElevationPage.tsx` | Elevation level cards and shared Technical details (CSS properties, tokens with live values, what each theme sets, focus note) with source links; loaded only when its route is requested |
| `site/pages/foundations/FoundationsPage.tsx` | Foundations overview: what applies to every Foundation and links to each page; loaded only when its route is requested |
| `site/pages/home/HomePage.tsx` | Home hero and wordmark composition using the separate Home content |
| `site/pages/styles/icons/IconsPage.tsx` | Exported icon catalogue; loaded only when its route is requested |
| `site/pages/foundations/interaction/InteractionPage.tsx` | Interaction states, focus, pointer and touch, keyboard and disabled behaviour, with shared Technical details; loaded only when its route is requested |
| `site/pages/get-started/introduction/IntroductionPage.tsx` | Design-system introduction; loaded only when its route is requested |
| `site/pages/components/navigation/link/LinkPage.tsx` | Link states and content examples; loaded only when its route is requested |
| `site/pages/styles/motion/MotionPage.tsx` | Motion timing, tokens and reduced-motion guidance; loaded only when its route is requested |
| `site/pages/components/structure/top-bar/TopBarPage.tsx` | Composes TopBar content with the shared template and owns the live example state |
| `site/pages/components/navigation/navigation-tree/NavigationTreePage.tsx` | Hierarchical navigation example; loaded only when its route is requested |
| `site/pages/not-found/NotFoundPage.tsx` | Unknown-route heading and return-home link |
| `site/pages/not-implemented/NotImplementedPage.tsx` | WIP page heading and not-implemented message |
| `site/pages/styles/typography/prose/ProsePage.tsx` | List and inline-code examples; loaded only when its route is requested |
| `site/pages/components/forms-and-input/radio-group/RadioGroupPage.tsx` | RadioGroup anatomy, states, validation and token reference; loaded only when its route is requested |
| `site/pages/styles/shape/ShapePage.tsx` | Shape overview linking to Corners and Borders; loaded only when its route is requested |
| `site/pages/styles/shape/corners/CornersPage.tsx` | Corner-radius scale and guidance for styling all corners or individual corners; loaded only when its route is requested |
| `site/pages/styles/shape/borders/BordersPage.tsx` | Border-width scale, hairline guidance and how to use the scale; loaded only when its route is requested |
| `site/pages/components/navigation/table-of-contents/TableOfContentsPage.tsx` | Showcase table-of-contents examples and props; loaded only when its route is requested |
| `site/pages/components/table/TablePage.tsx` | Table selection, sorting, empty-state and anatomy examples; loaded only when its route is requested |
| `site/pages/components/navigation/tabs/TabsPage.tsx` | Tabs documentation content and examples, composed with the shared template; loaded only when requested |
| `site/pages/components/forms-and-input/text-area/TextAreaPage.tsx` | Multiline field examples, states, composition and vertical resizing guidance |
| `site/pages/components/forms-and-input/text-field/TextFieldPage.tsx` | TextField composition, editing, states and local validation examples |
| `site/pages/foundations/text/TextPage.tsx` | Foundations › Text: line length and long words, with real Card examples and the `--line-length` token; loaded only when its route is requested |
| `site/pages/foundations/text/reading-direction/ReadingDirectionPage.tsx` | Foundations › Text › Reading direction in three sections: Start and end (physical and logical sides, with a right-to-left example built on RatioPair and a Checkbox), Right to left (Arabic, Persian, Urdu and Hebrew) and Top to bottom (Japanese, Simplified and Traditional Chinese), with real Card examples |
| `site/pages/foundations/text/fluid-text/FluidTextPage.tsx` | Foundations › Text › Fluid text: how Display and Heading sizes grow with the screen through `clamp()` while other text stays fixed, an example of the real text styles, and Technical details with CSS properties and the fluid size tokens read from the token source |
| `site/pages/foundations/interaction/target-size/TargetSizePage.tsx`, `site/pages/foundations/interaction/target-size/targetSizeContent.ts` | Foundations › Interaction › Target size: the WCAG minimum and Mezzanine's target size scale, the target-size tokens read from the token source, and the components that use them |
| `site/pages/styles/typography/text-styles/TextStylesPage.tsx` | Beginner guide to the text styles: quick start, roles, grouped styles, choosing, weights, base elements, small screens, line height and token reference; loaded only when its route is requested |
| `site/pages/components/actions-and-controls/toggle-button/ToggleButtonPage.tsx` | Standalone and grouped toggle examples; loaded only when its route is requested |
| `site/pages/components/overlays/tooltip/TooltipPage.tsx` | Live Tooltip example and shared-template documentation under Overlays |
| `site/pages/styles/typography/TypographyPage.tsx` | Typography overview, How typography works layers and live Label token example; loaded only when its route is requested |
| `site/public/robots.txt` | Served unchanged at `/robots.txt`; allows crawling so search engines can read the pre-launch `noindex` response header |
| `site/templates/ContentPage.tsx` | Builds every documentation page from its content file and the page's live parts |
| `site/templates/docsPageContent.ts` | The one shape every content file follows, standard section titles, section ids and the placeholder helper for live values |
| `site/templates/richText.ts` | Parses the `code`, **strong** and [label](href) markers in content-file copy |
| `site/templates/DocsPageTemplate.tsx` | The page layout underneath ContentPage: heading, On this page, sections, the Technical details Disclosure group, Related pages and References; also the site-only `PageHeading` |

### Lab (`site/lab/`)

| Path | Purpose |
| --- | --- |
| `site/lab/labContent.tsx` | Lab labels, the experiment list and the Lab's NavTree items: Layout at the top level, its groups each holding their pages, then Layers, Browser and device, Emerging features, Components (holding Search), and the pages outside the experiments: Reading order and Style priority |
| `site/lab/LabPage.tsx`, `site/lab/lab-page.css` | Lab route entry: the site's TopBar and DocsShell frame with the Lab's NavTree, Components and Search, the Layers, Browser and device and Emerging features experiments, the top-level Reading order and Style priority pages and the On this page end Panel supplied by DocsShell; chooses the index, the Layout overview, a group, a group page, an experiment page or the not-found page from the address |
| `site/lab/ComponentsPage.tsx` | Lab Components section (heading only) and its Search page, built with DocsPageTemplate |
| `site/lab/labTopLevelPages.ts` | The Lab pages outside the experiments, Reading order and Style priority, gathered from their folders |
| `site/lab/labCssNotes.ts` | Every page's CSS notes gathered into one list, which a browser test checks against layout-lab.css |
| `site/lab/components/search/SearchLab.tsx`, `site/lab/components/search/search-lab.css` | Lab search experiment: SearchField and ListBox joined by Autocomplete in a modal Dialog opened by a Search Button, following React Aria's command palette example; Lab-scoped layout with a candidate dialog height |
| `site/lab/components/search/searchLabContent.ts` | Sample results for the search experiment: every linked page in the docs and Lab navigation trees, grouped as Docs and Lab, with the groups above each page |
| `site/lab/shared/LayoutPage.tsx` | Every Lab page's route component: the Layout overview, each group's overview and pages, the Layers and Browser and device overviews, Emerging features and its pages, and the pages outside Layout, each given its content file and examples; illustrative and unapproved |
| `site/lab/shared/StagePages.tsx` | Builds Lab pages with the docs site's ContentPage: a content page, whose examples go in its Example section (How it works on emerging features), and an overview page whose one section holds a Card per page, with no On this page list except on Emerging features |
| `site/lab/shared/labTypes.ts` | The shapes of Lab page content: `LabPage` (the docs site's `DocsPageContent` plus its Lab address), Layout pages and emerging features built on it, Layout groups, CSS notes and page examples |
| `site/lab/shared/labValues.ts` | Values shared by Lab pages: the overview Cards' heading, the Lab badge and Card button labels, frame presets, the example picture's alt text, and Every Layout and Bedrock source links |
| `site/lab/shared/labLogic.ts` | Live media-query matching without effects, CSS support checks, and live viewport-height and safe-area measurement that updates on resize, rotation and toolbar changes, and the How it works paragraph an overview Card shows |
| `site/lab/shared/LabParts.tsx` | Width-slider example frame, example headings and text, CSS notes, value pickers and emerging-feature support badges |
| `site/lab/shared/LabPrimitives.tsx` | Lab-only layout components following Bedrock Layouts and Every Layout: Column, Row, RowWrap, RowWrapGrow, Reel, Center, AspectRatio, and the two grid recipes FixedColumnGrid and AutoFillGrid, with limits as custom properties |
| `site/lab/shared/layout-lab.css` | Lab-scoped styles and illustrative --lab-* candidate tokens for the Lab's pages |
| `site/lab/layout/layoutContent.ts` | The Layout overview's content, the six groups, and each group's pages in reading order, gathered from the page folders |
| `site/lab/layout/layoutExamples.ts` | Each Layout page's examples, keyed by the page's key, gathered from the page folders |
| `site/lab/layout/<group>/<page>/<page>Content.ts` | One folder per Layout page, named after its address (for example `site/lab/layout/side-by-side/row/rowContent.ts`): the page's content in the docs site's shape (description, any Also known as names, How it works with any Browser support, Example, Related pages and References) with its address, plus the CSS notes and any linked copy its example uses. Groups: box-basics (the-box-model, types-of-box, measuring-the-box, viewport-units, sizing-the-box, center), add-space (margin-and-padding, gap, spacing), inside-the-box (alignment, filling-the-box, overflowing-the-box, aspect-ratio, content-columns, box-has-content), side-by-side (row, row-wrap, row-wrap-grow, reel, ratio-pair), grids-and-columns (column, grid, subgrid) and container (container-queries, fluid-sizing) |
| `site/lab/layout/<group>/<page>/<Page>Example.tsx` | The page's example, with any options it alone uses (for example `RowExample.tsx`); Gap's also exports the spacing tokens shown after it |
| `site/lab/layout/add-space/spacing/SpacingScale.tsx` | Every spacing token with a bar of its size, its live value and its usual pixel size; used by the Lab's Spacing page |
| `site/lab/layout/add-space/spacing/spacingContent.ts` | Spacing scale steps displayed by SpacingScale on the Lab's Spacing page |
| `site/lab/layers/layersContent.ts` | The Layers experiment's overview content and its pages in order, gathered from its page folders |
| `site/lab/layers/<page>/` | One folder per Layers page, each with its content and CSS notes and its example: positioning, ordering-layers, bundles-of-layers and scroll-padding |
| `site/lab/browser-and-device/browserAndDeviceContent.ts` | The Browser and device experiment's overview content and its pages in order, gathered from its page folders |
| `site/lab/browser-and-device/<page>/` | One folder per Browser and device page, each with its content and CSS notes and its example: media-queries (with the environment queries it asks live), supports, safe-areas and touch-targets |
| `site/lab/emerging-features/emergingFeaturesContent.ts`, `site/lab/emerging-features/emergingFeaturesExamples.ts` | The Emerging features overview content and its pages in order, and each feature's example keyed by its page, gathered from the page folders |
| `site/lab/emerging-features/<page>/` | One folder per emerging feature, each with its content and CSS notes and its example with support detection: masonry (grid-lanes), scroll-state-queries, anchor-positioning and field-sizing |
| `site/lab/reading-order/readingOrderContent.ts`, `site/lab/reading-order/ReadingOrderExample.tsx` | The Lab's Reading order page, outside Layout: its content, CSS note and example |
| `site/lab/style-priority/stylePriorityContent.ts`, `site/lab/style-priority/StylePriorityExample.tsx` | The Lab's Style priority page, outside Layout: its content, CSS note and example of the cascade, including cascade layers |

### Browser tests (`tests/`)

| Path | Purpose |
| --- | --- |
| `tests/accessibility.ts` | Shared browser-test helper that runs an automated WCAG 2.2 AA accessibility scan on chosen parts of a page |
| `tests/display.ts` | Shared browser-test helpers for the three themes, normal and 200% text sizes, and a retrying no-horizontal-overflow check |
| `tests/components/button.spec.ts` | Button content options, href navigation and actions, the landing Read docs link matching the shared Button, and the pending ring under reduced motion |
| `tests/components/card.spec.ts` | Card example structure, reflow at 320px with normal and doubled text, and accessibility in each theme |
| `tests/components/code-block.spec.ts` | Code block structure, kept line breaks, reflow at 320px with normal and doubled text, and accessibility in each theme |
| `tests/components/disclosure.spec.ts` | Disclosure reflow, immediate panels in every theme and motion setting, find-in-page and group switching |
| `tests/components/top-bar.spec.ts` | TopBar example keyboard, responsive, theme, contrast and forced-colour checks |
| `tests/components/app-shell.spec.ts` | AppShell and Panel: sharing the space, closing back to the trigger, the bottom Panel's minimised version, the end Panel becoming a drawer, and 320px, text size, theme and axe checks |
| `tests/components/ratio-pair.spec.ts` | RatioPair sharing by fraction and by auto, and stacking at full width in a narrow container at normal and doubled text, using the Lab's Ratio pair page |
| `tests/components/table.spec.ts` | Table sorting interactions, keyboard and pointer activation, sort indicators and responsive contrast checks |
| `tests/components/text-field.spec.ts` | TextField keyboard, validation, responsive and automated accessibility checks |
| `tests/components/toggle-button.spec.ts` | Secondary toggle selection, keyboard, theme, responsive and forced-colour checks |
| `tests/components/tooltip.spec.ts` | Theme tooltip hover, keyboard dismissal, responsive positioning and accessibility checks |
| `tests/lab/search.spec.ts` | Lab search experiment: filtering while focus stays in the field, arrow keys and Enter, Docs and Lab groups, the empty state, clearing with the button and Escape, closing and focus return, every result reachable by keyboard, 320px reflow at normal and doubled text with accessibility scans in each theme, and forced colours |
| `tests/lab/lab.spec.ts` | Lab navigation through the site menu at 320px with normal and doubled text, the shared docs frame, and the saved theme shared between Docs and Lab |
| `tests/lab/layout.spec.ts` | Lab Layout pages: 320px reflow at normal and doubled text and accessibility in each theme for the overview, every stage and every page, links from the overview, group Cards and navigation, container-query, Row switch, :has(), overflow and reading-order behaviour, CSS notes matching the stylesheet (and, for Ratio pair, the library's), and the closed Also known as Disclosure opening from its button or On this page |
| `tests/site/right-to-left.spec.ts` | Right-to-left mirroring: Checkbox's box at the start of the line, Breadcrumbs running from the right, nested Table of contents links indented from the right, and the Reading direction example's logical box mirroring while its physical box stays put |
| `tests/site/documentation-template.spec.ts` | Checks every implemented component page for matching headings and Contents links, unique anchors and narrow-screen reflow, plus inline On this page placement and anchor scrolling under each motion policy |
| `tests/site/elevation.spec.ts` | Checks the Elevation page fits each breakpoint width with normal and doubled text |
| `tests/site/motion.spec.ts` | Shared motion policy in each theme, nested themes, system precedence, loading indicators and the live Motion reference |
| `tests/site/route-loading.spec.ts` | Verifies route-specific downloads, delayed and failed loads, section links and theme-state preservation |
| `tests/site/site-navigation.spec.ts` | Documentation site TopBar: mobile menu, current section, landing and unknown routes |
| `tests/site/wireframe-links.spec.ts` | Checks Wireframe underlines across link patterns and narrow layouts while preserving Light and Dark treatments |

### Rule checks (`scripts/`)

| Path | Purpose |
| --- | --- |
| `scripts/check-rules.mjs` | Checks documentation controls, component class prefixes, library CSS colours, z-index values from the shared scale, logical sides (start and end, unless marked `physical:`), shared button sizing, typography, NavTree ownership, shared motion, allowed effects, docs facts (routes, tokens, Props tables) and the public API snapshot; supports explicit `--update-api` |
| `scripts/docs-rules.mjs` | Checks that each page's component sits in the folder its place in the navigation gives it and that Lighthouse URLs are pages, finds Lab routes, checks that documented tokens exist and public tokens are documented, and parses Props table rows |
| `scripts/generate-routes.mjs` | Lists every docs and Lab page as nginx's allowed routes; the Docker build writes it to `/etc/nginx/conf.d/routes.inc` |
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
| `Dockerfile`, `.dockerignore` | Production image: builds the showcase, generates the allowed routes, checks the nginx configuration and serves `site-dist/` with nginx |
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
| `config/lighthouserc.mobile.json`, `config/lighthouserc.desktop.json` | Representative home, Button, Table, Tabs, TopBar, Tooltip and Lab page audits, mobile/desktop profiles, warning-only performance thresholds and local report destinations |
| `config/nginx.conf` | Static server for the showcase: includes the generated allowed routes, real 404s, caching, gzip, and the pre-launch `noindex` header |
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
| `site/components/docsNavigationItems.tsx` | Converts site structure to navigation data and WIP badge content |
| `scripts/nav-tree-rules.mjs`, `scripts/nav-tree-rules.test.mjs` | Ownership checks and regression fixtures for removed recipes, consumer internals and aliased composition |
| `tests/components/nav-tree.spec.ts`, `tests/components/fixtures/NavTreeHarness.tsx` | Isolated public-library checks for data, controlled state, focus, themes and reflow without site CSS, plus the documentation example's immediate rows, chevron motion and rapid toggles |
