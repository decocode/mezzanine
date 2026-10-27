import type { DocsPageContent } from '../../../../templates/docsPageContent'

export const colorAndContrastContent: DocsPageContent = {
  id: 'color-and-contrast',
  kind: 'foundation',
  title: 'Color and contrast',
  description: 'Text takes its color from roles that keep it readable on every theme’s backgrounds.',
  sections: [
    {
      key: 'textColors',
      title: 'Text colors',
      body: [
        'Four roles color text:',
        { list: [
          '`--color-text`, for normal reading and interface text.',
          '`--color-text-muted`, for supporting text, such as help text under a field.',
          '`--color-link`, for links.',
          '`--color-danger`, for error messages.',
        ] },
        'Each theme sets them, so text changes color with the theme, never by hand.',
      ],
    },
    {
      key: 'contrast',
      title: 'Contrast',
      body: ['The roles are chosen to meet WCAG 2.2 AA on the page and on surfaces: 4.5 to 1 for normal text, and 3 to 1 for large text. The [Color palettes](/color/palettes) page works out each step’s contrast live.'],
    },
    {
      key: 'darkMode',
      title: 'Dark mode',
      body: ['Light text on a dark background tends to look bolder than it is. So text is drawn with thinner font smoothing on macOS, to keep its intended weight: see [Text rendering](/typography/text-rendering). Normal text in Dark is a soft off-white, not pure white, which is easier on the eyes.'],
    },
  ],
  relatedPages: [
    { label: 'Color roles', href: '/color/roles' },
    { label: 'Color palettes', href: '/color/palettes' },
    { label: 'Text rendering', href: '/typography/text-rendering' },
  ],
}
