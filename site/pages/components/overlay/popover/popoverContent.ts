import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { formatJsxProps } from '../../../../components/formatJsxProps'
import { pointerRows } from '../../../../components/pointerRows'

export const popoverContent: DocsPageContent = {
  id: 'popover',
  kind: 'component',
  title: 'Popover',
  description: '`Popover` is a component that shows extra content beside the control that opened it, such as a menu, a list of options or a short form.',
  sections: [
    { key: 'example', intro: ['A `DialogTrigger` opens the `Popover` from a `Button`. It fades in from the side it opens on, and closes with Escape or a press outside it.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Popover anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'Popover', description: 'The raised surface. React Aria places it beside its trigger and keeps it on screen.' },
          { name: 'Dialog', description: 'Optional. Wraps content that isn’t a list, so it gets a dialog role and focus.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Put a `Popover` inside a `DialogTrigger`, `MenuTrigger`, `Select` or `ComboBox`, after the trigger. `placement` chooses the side it opens on.',
        'The popover adds no padding of its own, so a `Dialog`, `Menu` or `ListBox` inside it sets the space.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Focus moves into the popover when it opens and returns to the trigger when it closes. Escape closes it.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Popover pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('Popover'),
      },
    },
  ],
  relatedPages: [
    { label: 'Menu', href: '/menu' },
    { label: 'Select', href: '/select' },
    { label: 'Tooltip', href: '/tooltip' },
    { label: 'Dialog', href: '/dialog' },
  ],
  references: [
    { label: 'React Aria Popover', href: 'https://react-aria.adobe.com/Popover' },
  ],
}

// The example's trigger and content, kept here so the page component holds no copy.
export const popoverExampleLabels = { trigger: 'Popover trigger', content: 'Popover content.' } as const

// The Properties panel's placement choice. bottom is the default.
export const popoverPlacements = ['bottom', 'top', 'start', 'end'] as const

export function popoverExampleCode(placement: string) {
  return [
    '<DialogTrigger>',
    `  <Button hierarchy="secondary">${popoverExampleLabels.trigger}</Button>`,
    `  <Popover${formatJsxProps({ placement: placement === 'bottom' ? undefined : placement })}>`,
    `    <Dialog aria-label="${popoverExampleLabels.trigger}">`,
    `      <Text elementType="p" className="mz-text-body-md">${popoverExampleLabels.content}</Text>`,
    '    </Dialog>',
    '  </Popover>',
    '</DialogTrigger>',
  ].join('\n')
}
