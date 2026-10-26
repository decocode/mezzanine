import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { formatJsxProps } from '../../../../components/formatJsxProps'
import { pointerRows } from '../../../../components/pointerRows'

export const cardContent: DocsPageContent = {
  id: 'card',
  kind: 'component',
  title: 'Card',
  description: '`Card` is a component that groups related content, such as a picture, a heading, some text and actions, on its own surface. With a linked title, pressing anywhere on the card follows the link, while the controls inside it still work on their own.',
  sections: [
    { key: 'example', intro: ['`Card` renders a surface with a border, a raised shadow and space around its content. Its content is composed from the Card parts and other components.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Card anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'Card', description: 'Renders a `div` with the card surface. It adds even space between its direct children.' },
          { name: 'CardImage', description: 'Optional. A picture that keeps the shape set by `aspectRatio`, `16 / 9` by default, and crops to fill. As the first part it reaches the card’s edges. Its children sit over the picture: the first at the top start, the last at the top end.' },
          { name: 'CardTitle', description: 'The card’s heading, in the Title medium text style. With `href`, it’s the card’s one link, and its pressable area covers the whole card.' },
          { name: 'CardFooter', description: 'Optional. The bottom row: details at the start and a last `Button` at the end. It sits at the bottom of the card, so footers line up across a row of cards.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Place the parts inside `Card` in the order people should see them, with other components such as `Avatar`, `Text` and `Button`. Card adds the spacing between them.',
        'Content flows as it does elsewhere on a page: headings and paragraphs fill the width, while inline content such as `code`, a `Badge` or a `Link` keeps its natural size.',
        '`CardImage` needs `src` and `alt`. Pass `alt=""` when the title already names the card, so the picture is decorative.',
        'To make the card a link, give `CardTitle` an `href`. Pressing anywhere on the card then follows it, and an arrow at the card’s end shows it can be pressed, unless a `CardFooter` holds the card’s actions. Buttons, toggles and links inside the card stay pressable on their own. `CardTitle` accepts React Aria `Link` props, such as `target`, and `level` sets its heading level, 3 by default.',
        'Pass `className` to position the card in your layout. Card also accepts the other attributes of a `div`.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Card adds no role or accessible name. `CardTitle` gives it a heading, so people using a screen reader can find and identify it.',
        'With `href`, the title is the card’s only link, so a screen reader announces just its text, not everything in the card. The arrow is hidden from screen readers. Keyboard focus on the title shows a focus ring around the whole card.',
        'Keyboard order follows the HTML, which follows what people see: controls over the picture come before the title.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Card pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('Card'),
      },
    },
  ],
  relatedPages: [
    { label: 'Elevation', href: '/elevation' },
    { label: 'Shape', href: '/shape' },
    { label: 'Dialog', href: '/dialog' },
    { label: 'Avatar', href: '/avatar' },
  ],
  references: [
    { label: 'MDN: HTML div element', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/div' },
  ],
}

// The teaching labels inside the live card in the Example section.
export const cardExample = {
  badge: 'Badge',
  toggle: 'Favourite',
  avatar: 'Avatar name',
  heading: 'Card title',
  href: '/card',
  body: 'Card content describes the item in a sentence or two.',
  detail: 'Detail A',
  action: 'Button',
} as const

// The Properties panel's choices: the picture's shape (16 / 9 by default), and the card's optional
// parts. With href, the title links and the whole card can be pressed.
export const cardAspectRatios = ['16 / 9', '4 / 3', '1 / 1'] as const
export const cardFlags = ['CardImage', 'href', 'CardFooter'] as const

export function cardExampleCode({ aspectRatio, flags }: { aspectRatio: string, flags: Record<(typeof cardFlags)[number], boolean> }) {
  return [
    '<Card>',
    ...(flags.CardImage ? [
      `  <CardImage src={picture} alt=""${formatJsxProps({ aspectRatio: aspectRatio === '16 / 9' ? undefined : aspectRatio })}>`,
      `    <Badge>${cardExample.badge}</Badge>`,
      `    <ToggleButton hierarchy="secondary" size="sm" icon={<HeartIcon />} iconPosition="iconOnly">${cardExample.toggle}</ToggleButton>`,
      '  </CardImage>',
    ] : []),
    `  <Avatar size="sm">${cardExample.avatar}</Avatar>`,
    `  <CardTitle${formatJsxProps({ href: flags.href ? cardExample.href : undefined })}>${cardExample.heading}</CardTitle>`,
    `  <Text elementType="p">${cardExample.body}</Text>`,
    ...(flags.CardFooter ? [
      '  <CardFooter>',
      `    <Text>${cardExample.detail}</Text>`,
      `    <Button hierarchy="secondary">${cardExample.action}</Button>`,
      '  </CardFooter>',
    ] : []),
    '</Card>',
  ].join('\n')
}
