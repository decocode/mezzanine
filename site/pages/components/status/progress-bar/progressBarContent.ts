import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { pointerRows } from '../../../../components/pointerRows'

export const progressBarContent: DocsPageContent = {
  id: 'progress-bar',
  kind: 'component',
  title: 'Progress bar',
  description: 'A progress bar shows how far a task has got, or that it is still working when the end isn’t known.',
  sections: [
    { key: 'example', intro: ['`ProgressBar` shows a `label`, the value as a percentage and a filled track.'] },
    { key: 'variants', intro: ['With `isIndeterminate`, a segment travels along the track, and no value is shown. Only the system’s reduced-motion setting stops it, as with Button’s pending spinner.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Progress bar anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'ProgressBar', description: 'Holds the value and announces it. Mezzanine draws the label, value text, track and fill inside it.' },
          { name: 'Label', description: 'The visible label, from the `label` prop.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Set `value`, and `minValue` and `maxValue` when the range isn’t 0 to 100. Use `isIndeterminate` while the amount of work is unknown.',
        'Give the bar a `label`, or an `aria-label` when there is no visible one. `formatOptions` and `valueLabel` change the value text.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Screen readers announce the bar as a progress bar, with its label and current value. An indeterminate bar is announced as busy, without a value.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Progress bar pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('ProgressBar'),
      },
    },
  ],
  relatedPages: [
    { label: 'Meter', href: '/meter' },
    { label: 'Button', href: '/button' },
    { label: 'Motion', href: '/motion' },
  ],
  references: [
    { label: 'React Aria ProgressBar', href: 'https://react-aria.adobe.com/ProgressBar' },
  ],
}
