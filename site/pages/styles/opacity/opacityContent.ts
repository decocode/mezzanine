import type { DocsPageContent } from '../../../templates/docsPageContent'

export const opacityContent: DocsPageContent = {
  id: 'opacity',
  kind: 'foundation',
  title: 'Opacity',
  description: 'Opacity sets how see-through something is. Mezzanine uses its opacity scale for faint washes of color, such as hover backgrounds, and for disabled controls.',
  sections: [
    {
      key: 'opacityScale',
      title: 'Opacity scale',
      intro: [
        'Each step is a percentage, so it works in both `color-mix()` and the `opacity` property. Each sample shows the text color at that step. Values below come from the active CSS tokens.',
        'For example, `--color-neutral-muted-hovered` mixes the text color at `--opacity-8` with transparent, and `--opacity-disabled` points at `--opacity-50`.',
      ],
    },
  ],
}

export const opacityLevels = [
  { label: '4', token: '--opacity-4' },
  { label: '8', token: '--opacity-8' },
  { label: '12', token: '--opacity-12' },
  { label: '16', token: '--opacity-16' },
  { label: '20', token: '--opacity-20' },
  { label: '50', token: '--opacity-50' },
] as const
