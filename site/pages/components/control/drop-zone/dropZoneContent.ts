import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'

export const dropZoneContent: DocsPageContent = {
  id: 'drop-zone',
  kind: 'component',
  title: 'Drop zone',
  description: 'A drop zone is an area that accepts files or other content dragged onto it, and can also be pasted into from the keyboard.',
  sections: [
    { key: 'example', intro: ['`DropZone` is a dashed area. While something is dragged over it, its border turns solid and it takes the accent tint.'] },
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
          { name: 'Text', description: 'Its visible label, with `slot="label"`.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Handle `onDrop` to receive the dropped items, and `getDropOperation` to accept only some kinds. Put a `FileTrigger` inside it to offer a button that opens the file picker as well.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Keyboard users focus the drop zone with Tab and paste into it. Screen readers announce its label, and announce when a drag is over it.',
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

// The example's label.
export const dropZoneExampleLabel = 'Drop zone A'
