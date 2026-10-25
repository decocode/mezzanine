import type { DocsPageContent } from '../../../../templates/docsPageContent'

// Wording for the Foundations › Typography › Typeface and fonts page: which fonts text uses today.
export const typefaceAndFontsContent: DocsPageContent = {
  id: 'typeface-and-fonts',
  kind: 'foundation',
  title: 'Typeface and fonts',
  description: 'When text uses each device’s own interface font.',
  sections: [
    {
      key: 'howItWorks',
      body: [
        'Many sites download a typeface so that text looks the same everywhere. That makes the first page slower to appear, and text can change as the font arrives. Text here works differently: it uses the interface font each device already has, such as San Francisco on Apple devices and Segoe UI on Windows. Nothing is downloaded, text appears straight away, and it looks familiar to the people using each device.',
        'The catch is that text looks slightly different from one device to another, so spacing judged on one device can look a little different on another.',
      ],
    },
    {
      key: 'fontFamilies',
      title: 'Font families',
      intro: ['Three tokens choose the fonts. Each holds a list of fonts, in order of preference.'],
    },
    {
      key: 'fallbackFonts',
      title: 'Fallback fonts',
      body: [
        'A list of fonts like this is called a font stack. The browser uses the first font in the list that the device has, and moves down the list when it doesn’t.',
        'In the body stack, `system-ui` asks for the device’s own interface font. `-apple-system` and `BlinkMacSystemFont` ask for the same font in older browsers on Apple devices, and `Segoe UI` is the Windows interface font. The generic `sans-serif` at the end means any sans-serif font, so text always has something to show.',
        'The monospace stack does the same for code: `ui-monospace` is the device’s own code font, followed by code fonts from Apple, Windows and Linux, and the generic `monospace` last.',
      ],
    },
    {
      key: 'changingTheTypeface',
      title: 'Changing the typeface',
      body: [
        'A theme changes the typeface by setting these tokens. Headings follow the body font unless a theme also sets `--font-family-heading`, so a brand can give its headings a typeface of their own.',
      ],
    },
    {
      key: 'webFonts',
      title: 'Web fonts and variable fonts',
      body: [
        'No font files are downloaded today, so there is nothing to load and no variable fonts are used. If an open-source typeface is adopted, how it loads will be covered here.',
      ],
    },
  ],
  relatedPages: [
    { label: 'Text styles', href: '/typography/text-styles' },
    { label: 'Weight and emphasis', href: '/typography/weight-and-emphasis' },
    { label: 'Text rendering', href: '/typography/text-rendering' },
  ],
  references: [
    { label: 'MDN: font-family', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/font-family' },
  ],
}
