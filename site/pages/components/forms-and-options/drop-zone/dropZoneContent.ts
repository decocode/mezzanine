import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'

export const dropZoneContent: DocsPageContent = {
  id: 'drop-zone',
  kind: 'component',
  title: 'Drop zone',
  description: '`DropZone` is a component that accepts files or other content dragged or pasted into it.',
  sections: [
    { key: 'example', intro: ['`DropZone` is a dashed area with its content stacked in the middle: an icon, the label, help text and a button that opens the file picker. While something is dragged over it, its border turns solid and it takes the accent tint.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Drop zone anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'DropZone', description: 'The area that accepts the drop.' },
          { name: 'Icon', description: 'Optional, first, as a decorative SVG.' },
          { name: 'Text', description: 'Its visible label, with `slot="label"`.' },
          { name: 'p', description: 'Optional help text, such as the accepted file types. Link it to the drop zone and the button with `aria-describedby`.' },
          { name: 'p role="alert"', description: 'Optional error message, such as a file that couldn’t be opened.' },
          { name: 'FileTrigger', description: 'Optional, with a `Button` that opens the file picker.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Handle `onDrop` to receive the dropped items, and `getDropOperation` to accept only some kinds. Put a `FileTrigger` inside it to offer a button that opens the file picker as well.',
        'Only a mouse or trackpad can drag files, so on touch screens the button is the way in. Say “drag and drop” only where it works, for example with a `(pointer: fine)` media query, and use `isDisabled` with the button’s `isPending` while a file is being checked.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Keyboard users focus the drop zone with Tab and paste into it, or use its button. Screen readers announce its label and help text, and announce when a drag is over it. An error paragraph with `role="alert"` is announced as soon as it appears.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Drop zone pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('DropZone'),
      },
    },
  ],
  relatedPages: [
    { label: 'Button', href: '/button' },
  ],
  references: [
    { label: 'React Aria DropZone', href: 'https://react-aria.adobe.com/DropZone' },
  ],
}

// The example's labels and copy.
export const dropZoneExampleLabels = { label: 'Drop zone A', help: 'Help text A.', button: 'Button A' } as const

// The Properties panel's on/off prop, and the example's code.
export const dropZoneDisabledLabel = 'isDisabled'

export function dropZoneExampleCode(isDisabled: boolean) {
  return [
    `<DropZone${isDisabled ? ' isDisabled' : ''} aria-describedby="drop-zone-help">`,
    '  <PlaceholderIcon aria-hidden="true" />',
    `  <Text slot="label">${dropZoneExampleLabels.label}</Text>`,
    `  <p id="drop-zone-help">${dropZoneExampleLabels.help}</p>`,
    '  <FileTrigger>',
    `    <Button hierarchy="secondary" aria-describedby="drop-zone-help">${dropZoneExampleLabels.button}</Button>`,
    '  </FileTrigger>',
    '</DropZone>',
  ].join('\n')
}
