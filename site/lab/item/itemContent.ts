// The Lab's Item page: a candidate Item, from shadcn/ui's React Aria Item, in Mezzanine's CSS.
// Illustrative and unapproved.
import type { LabPage } from '../shared/labTypes'
import { formatJsxProps } from '../../components/formatJsxProps'

export const itemPage: LabPage = {
  id: 'lab-item', kind: 'component', title: 'Item', href: '/site/lab/item',
  description: '`Item` is a component that shows one thing in a list: a picture, a title and description, and actions.',
  sections: [
    { key: 'code', title: 'Code' },
    { key: 'about', title: 'About Item', body: [
      '`Item` is a component that shows one thing in a list: a picture, a title and description, and actions. Use it for rows such as people in a team, files, songs or settings. It shows content; for a form input, use the field components instead.',
      'Its own qualities are properties: `title`, `description`, how its box looks, its colour and its size. The optional pieces placed inside it are parts: `ItemMedia` before the content, `ItemActions` after it, and `ItemHeader` and `ItemFooter` as full rows above and below.',
    ] },
    { key: 'example' },
  ],
  technicalDetails: [
    { key: 'anatomy', table: {
      label: 'Item anatomy', nameColumn: 'Component', className: 'documentation-anatomy-table', namesAreCode: false,
      rows: [
        { name: 'Item', description: 'The row. It lays out its parts around its title and description.' },
        { name: 'ItemHeader', description: 'Optional: a full-width row above.' },
        { name: 'ItemMedia', description: 'Optional: an icon, an image or an Avatar, before the content.' },
        { name: 'ItemActions', description: 'Optional: buttons or other controls, after the content.' },
        { name: 'ItemFooter', description: 'Optional: a full-width row below.' },
      ],
    } },
    { key: 'behaviour', body: [{ list: [
      'With `href`, the title is the Item’s link, and pressing anywhere on the Item follows it. Controls in `ItemActions` still take their own presses, so there are no buttons inside a link.',
      'With a description, the media lines up with the title rather than the middle.',
    ] }] },
    { key: 'accessibility', body: [{ list: [
      'With `href`, the link is the title, so screen readers hear the title as the link’s name. Keyboard focus shows around the whole Item.',
      'Give an icon-only button in `ItemActions` its own label, and an image in `ItemMedia` meaningful alternative text.',
    ] }] },
    { key: 'props', table: {
      label: 'Item props', nameColumn: 'Prop', className: 'documentation-props-table',
      rows: [
        { name: 'title', description: 'The Item’s name.' },
        { name: 'description', description: 'A line or two about it, in the muted text colour.' },
        { name: 'variant', description: '`default`, with no border or fill; `outline`, with a border; or `muted`, with a soft fill.' },
        { name: 'purpose', description: '`neutral`, the default, `accent` or `signature`: the colour of the border, the fill and an icon.' },
        { name: 'size', description: '`md`, the default, `sm` for dense lists, or `xs`, the most compact.' },
        { name: 'href', description: 'Makes the title a link that covers the whole Item.' },
        { name: 'ItemMedia: variant', description: '`icon`, the default, or `image`, which fits an image or Avatar to a square.' },
      ],
    } },
  ],
  relatedPages: [
    { label: 'Card', href: '/card' },
    { label: 'Alert', href: '/alert' },
    { label: 'List box', href: '/list-box' },
  ],
  references: [
    { label: 'shadcn/ui: Item (React Aria)', href: 'https://ui.shadcn.com/docs/components/aria/item' },
  ],
}

// The example's labels, and the Properties panel's choices.
export const itemLabels = { title: 'Item', description: 'Item’s description, in a sentence.', href: '/card', action: 'Button', header: 'Header', footer: 'Footer' } as const
export const itemVariants = ['default', 'outline', 'muted'] as const
export const itemPurposes = ['neutral', 'accent', 'signature'] as const
export const itemSizes = ['md', 'sm', 'xs'] as const
export const itemParts = ['ItemMedia', 'ItemActions', 'ItemHeader', 'ItemFooter'] as const

export function itemCode({ variant, purpose, size, description, href, parts }: { variant: string; purpose: string; size: string; description: boolean; href: boolean; parts: Record<(typeof itemParts)[number], boolean> }) {
  const props = formatJsxProps({
    title: itemLabels.title,
    description: description ? itemLabels.description : undefined,
    variant: variant === 'default' ? undefined : variant,
    purpose: purpose === 'neutral' ? undefined : purpose,
    size: size === 'md' ? undefined : size,
    href: href ? itemLabels.href : undefined,
  })
  const inside = [
    ...(parts.ItemHeader ? [`  <ItemHeader>${itemLabels.header}</ItemHeader>`] : []),
    ...(parts.ItemMedia ? ['  <ItemMedia><PlaceholderIcon /></ItemMedia>'] : []),
    ...(parts.ItemActions ? [`  <ItemActions><Button hierarchy="secondary" size="sm">${itemLabels.action}</Button></ItemActions>`] : []),
    ...(parts.ItemFooter ? [`  <ItemFooter>${itemLabels.footer}</ItemFooter>`] : []),
  ]
  return inside.length ? [`<Item${props}>`, ...inside, '</Item>'].join('\n') : `<Item${props} />`
}
