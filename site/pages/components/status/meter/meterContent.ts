import type { DocsPageContent } from '../../../../templates/docsPageContent'
import { formatJsxProps } from '../../../../components/formatJsxProps'
import { pointerRows } from '../../../../components/pointerRows'

export const meterContent: DocsPageContent = {
  id: 'meter',
  kind: 'component',
  title: 'Meter',
  description: '`Meter` is a component that shows an amount within a known range, such as storage used or a password’s strength.',
  sections: [
    { key: 'example', intro: ['`Meter` shows a `label`, the value as a percentage and a filled track. Unlike a progress bar, it shows an amount, not a task moving forward, so it never animates.'] },
  ],
  technicalDetails: [
    {
      key: 'anatomy',
      table: {
        label: 'Meter anatomy',
        nameColumn: 'Component',
        className: 'documentation-anatomy-table',
        rows: [
          { name: 'Meter', description: 'Holds the value and announces it. Mezzanine draws the label, value text, track and fill inside it.' },
          { name: 'Label', description: 'The visible label, from the `label` prop.' },
        ],
      },
    },
    {
      key: 'usage',
      body: [
        'Set `value`, and `minValue` and `maxValue` when the range isn’t 0 to 100. `formatOptions` and `valueLabel` change the value text.',
        'Give the meter a `label`, or an `aria-label` when there is no visible one.',
      ],
    },
    {
      key: 'accessibility',
      body: [
        'Screen readers announce the meter with its label and current value.',
      ],
    },
    {
      key: 'pointers',
      title: 'Pointers',
      intro: ['Set one of these on the component, or on any element around it, to restyle that part alone. When it isn’t set, the part uses the shared token shown.'],
      table: {
        label: 'Meter pointers',
        nameColumn: 'Pointer',
        descriptionColumn: 'Falls back to',
        rows: pointerRows('Meter'),
      },
    },
  ],
  relatedPages: [
    { label: 'Progress bar', href: '/progress-bar' },
    { label: 'Badge', href: '/badge' },
  ],
  references: [
    { label: 'React Aria Meter', href: 'https://react-aria.adobe.com/Meter' },
  ],
}

// The Example's label and the Properties panel's choices. Without a visible label, the code names the
// meter with aria-label instead.
export const meterExampleLabel = 'Meter'
export const meterValues = ['0', '35', '70', '100'] as const

export function meterExampleCode(value: number, hasLabel: boolean) {
  return `<Meter${formatJsxProps({ label: hasLabel ? meterExampleLabel : undefined, 'aria-label': hasLabel ? undefined : meterExampleLabel, value })} />`
}
