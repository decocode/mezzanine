import type { DocsPageContent } from '../../../../templates/docsPageContent'

export const opacityContent: DocsPageContent = {
  id: 'opacity',
  kind: 'foundation',
  title: 'Opacity',
  description: 'Opacity sets how see-through something is. Its scale gives faint washes of color, such as hover backgrounds, and dims disabled controls.',
  sections: [
    {
      key: 'opacityScale',
      title: 'Opacity scale',
      intro: [
        'Each step is a percentage, so it works in both `color-mix()` and the `opacity` property. Each sample is a block of the accent color at that step, over a checkerboard: the more the pattern shows through, the more see-through the step. Values come from the active CSS tokens.',
        'For example, `--color-neutral-muted` mixes the text color at `--opacity-8` with transparent, and `--opacity-disabled` points at `--opacity-50`.',
      ],
    },
  ],
}

export const opacityLevels = [
  { label: '4', token: '--opacity-4' },
  { label: '8', token: '--opacity-8' },
  { label: '12', token: '--opacity-12' },
  { label: '16', token: '--opacity-16' },
  { label: '24', token: '--opacity-24' },
  { label: '32', token: '--opacity-32' },
  { label: '50', token: '--opacity-50' },
  { label: '75', token: '--opacity-75' },
] as const
