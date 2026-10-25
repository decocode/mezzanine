// The one shape every documentation page's content file follows. ContentPage turns it into a page.
// Copy is plain text with `code`, **strong** and [label](href) markers; see richText.ts.

export type Copy = string

// A paragraph, or a bulleted list of short items.
export type Block = Copy | { readonly list: readonly Copy[] }

export interface LinkItem {
  readonly label: string
  readonly href: string
}

// An Anatomy, Props, CSS tokens or similar reference table.
export interface ContentTable {
  // The table's accessible name, such as "Badge anatomy".
  readonly label: string
  readonly nameColumn: string
  readonly descriptionColumn?: string
  // Part names such as "Section header" are plain text; API names default to code.
  readonly namesAreCode?: boolean
  readonly className?: string
  readonly rows: readonly { readonly name: string; readonly description: Copy }[]
}

export interface ContentSection {
  // Makes the section's id, `${page id}-${key}`. A standard key also supplies the title.
  readonly key: string
  // Needed unless the key is one of the standard section titles.
  readonly title?: string
  // Shown as a closed Disclosure, with the title as its header, for detail some readers can skip.
  readonly isCollapsible?: boolean
  // Introductory paragraphs, shown in the muted description style.
  readonly intro?: readonly Block[]
  // Body paragraphs, shown as ordinary text.
  readonly body?: readonly Block[]
  // Shown after the paragraphs and any live example the page supplies for this key.
  readonly table?: ContentTable
  // On this page links to headings inside the section, such as one a live example adds.
  readonly subsections?: readonly { readonly id: string; readonly label: string }[]
  // Headed blocks within the section, such as Browser support, shown after its paragraphs with
  // level-3 headings and their own On this page links.
  readonly subheadings?: readonly { readonly key: string; readonly title: string; readonly body: readonly Block[] }[]
}

// What designers, engineers and other design systems call the same thing as the page's subject.
export interface AlsoKnownAs {
  // CSS, Tailwind CSS, Figma, Material Design or shadcn/ui (owner's decision, 23 October 2026), or any
  // well-known source that uses a different name from the page's (owner's decision, 25 October 2026).
  readonly where: string
  readonly called: Copy
}

export interface DocsPageContent {
  // Prefixes every section id, such as "badge" in "badge-anatomy".
  readonly id: string
  // Components and Foundations name their token section differently.
  readonly kind: 'component' | 'foundation'
  readonly title: string
  readonly description?: Copy | readonly Copy[]
  // Shown first, in a closed Disclosure, once the page's name is agreed.
  readonly alsoKnownAs?: readonly AlsoKnownAs[]
  // The sections before Technical details, in order.
  readonly sections?: readonly ContentSection[]
  // The Technical details group, in the order PAGES.md sets.
  readonly technicalDetails?: readonly ContentSection[]
  readonly relatedPages?: readonly LinkItem[]
  readonly references?: readonly LinkItem[]
}

const standardTitles: Record<string, string> = {
  alsoKnownAs: 'Also known as',
  howItWorks: 'How it works',
  example: 'Example',
  states: 'States',
  variants: 'Variants',
  anatomy: 'Anatomy',
  behaviour: 'Behaviour',
  usage: 'Usage',
  accessibility: 'Accessibility',
  props: 'Props',
  cssProperties: 'CSS properties',
  theming: 'Theming',
  localisation: 'Localisation',
}

export const technicalDetailsTitle = 'Technical details'

export function sectionTitle(section: ContentSection, kind: DocsPageContent['kind']): string {
  if (section.title) return section.title
  if (section.key === 'tokens') return kind === 'component' ? 'CSS tokens' : 'Tokens'
  const title = standardTitles[section.key]
  if (!title) throw new Error(`Section "${section.key}" needs a title.`)
  return title
}

// Fills {name} placeholders in a page's copy with values only the page can read, such as a live token value.
export function withValues(content: DocsPageContent, values: Record<string, string>): DocsPageContent {
  const fill = (block: Block): Block => typeof block === 'string'
    ? block.replace(/\{(\w+)\}/g, (match, name: string) => values[name] ?? match)
    : { list: block.list.map((item) => item.replace(/\{(\w+)\}/g, (match, name: string) => values[name] ?? match)) }
  const fillSection = (section: ContentSection): ContentSection => ({ ...section, intro: section.intro?.map(fill), body: section.body?.map(fill), subheadings: section.subheadings?.map((subheading) => ({ ...subheading, body: subheading.body.map(fill) })) })
  return { ...content, sections: content.sections?.map(fillSection), technicalDetails: content.technicalDetails?.map(fillSection) }
}

// Section ids are written in kebab case, so "cssProperties" becomes "css-properties".
export function sectionId(pageId: string, key: string): string {
  return `${pageId}-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`
}
