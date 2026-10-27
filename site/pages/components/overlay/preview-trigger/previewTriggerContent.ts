import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { formatJsxProps } from '../../../../components/formatJsxProps'

export const previewTriggerContent: DocsPageContent = {
  id: 'preview-trigger',
  kind: 'component',
  title: 'Preview trigger',
  description: '`PreviewTrigger` is a component that shows a small preview of what a link or button leads to, in a popover, while it is hovered or focused.',
  sections: [
    { key: 'example', intro: ['After a short wait on hover or focus, the preview opens in a `Popover`. Unlike a tooltip, it can hold links and buttons, and Tab moves into it.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Preview trigger anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'PreviewTrigger', description: 'Opens and closes the preview.' },
          { name: 'Link, Button or Focusable', description: 'The trigger.' },
          { name: 'Popover', description: 'The preview, with its content.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Put the trigger, then a `Popover` holding the preview, inside `PreviewTrigger`. `delay` sets the wait before it opens, and `closeDelay` the wait before it closes.',
        'The popover adds no padding, so give the preview’s content its own.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Focusing the trigger opens the preview, Tab moves into it and Escape closes it, returning focus to the trigger. On touch screens it opens with a long press. Keep anything in the preview available elsewhere too, because some people never see it.',
      ],
    },

  ],
  relatedPages: [
    { label: 'Popover', href: '/popover' },
    { label: 'Tooltip', href: '/tooltip' },
    { label: 'Link', href: '/link' },
  ],
  references: [
    { label: 'React Aria PreviewTrigger', href: 'https://react-aria.adobe.com/PreviewTrigger' },
  ],
}

// The example's trigger and preview copy.
export const previewTriggerExampleLabels = { trigger: 'Link', preview: 'Preview of Link.' } as const

// The Properties panel's choices, in milliseconds: the wait before the preview opens (600 by default)
// and before it closes (200 by default).
export const previewTriggerDelays = ['0', '300', '600', '1200'] as const
export const previewTriggerCloseDelays = ['0', '200', '600'] as const

export function previewTriggerExampleCode({ delay, closeDelay }: { delay: number, closeDelay: number }) {
  return [
    `<PreviewTrigger${formatJsxProps({ delay: delay === 600 ? undefined : delay, closeDelay: closeDelay === 200 ? undefined : closeDelay })}>`,
    `  <Link href="/popover">${previewTriggerExampleLabels.trigger}</Link>`,
    '  <Popover>',
    `    <Text elementType="p" className="mz-text-body-md">${previewTriggerExampleLabels.preview}</Text>`,
    '  </Popover>',
    '</PreviewTrigger>',
  ].join('\n')
}
