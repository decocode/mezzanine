import type { DocsPageContent } from '../../../templates/docsPageContent'

export const accessibilityFeedbackButton = { label: 'Open GitHub issue', href: 'https://github.com/decocode/mezzanine/issues' }

export const accessibilityContent: DocsPageContent = {
  id: 'accessibility',
  kind: 'foundation',
  title: 'Accessibility',
  description: 'Accessibility is built into every Mezzanine component rather than added afterwards. This page covers what applies everywhere; other pages note only what is specific to them.',
  sections: [
    {
      key: 'target',
      title: 'Target',
      intro: [
        'Mezzanine aims to meet WCAG 2.2 at Level AA. However, it’s worth stating plainly that this is a target. Although each component is checked as it is built, Mezzanine does not claim compliance with any standards.',
        'Once the design system reaches a suitable level of maturity, our intent is to test with real users of assistive technologies, not just automated testing. In the meantime, if you encounter any accessibility issues, we’d love your feedback.',
      ],
    },
    {
      key: 'reactAria',
      title: 'What React Aria provides',
      table: {
        label: 'Accessibility provided by React Aria',
        nameColumn: 'Area',
        descriptionColumn: 'What it does',
        namesAreCode: false,
        rows: [
          { name: 'Keyboard', description: 'Every interactive component can be operated with the keyboard, including arrow-key movement inside groups such as Tabs and RadioGroup.' },
          { name: 'Focus management', description: 'Dialogs keep focus inside while open and return it to the control that opened them.' },
          { name: 'Names, roles and states', description: 'Assistive technology is told what each control is, what it is called and whether it is selected, expanded, disabled or invalid.' },
          { name: 'Pointer and touch', description: 'Mouse, touch, pen and keyboard presses behave the same way, and a tap never leaves a hover state behind.' },
        ],
      },
    },
    {
      key: 'mezzanine',
      title: 'What Mezzanine adds',
      table: {
        label: 'Accessibility added by Mezzanine',
        nameColumn: 'Area',
        descriptionColumn: 'What Mezzanine does',
        namesAreCode: false,
        rows: [
          { name: 'Visible focus', description: 'Keyboard focus shows a ring in `--color-focus`. See [Interaction](/interaction).' },
          { name: 'Colour contrast', description: 'Colour roles pair text and surfaces from the shared palettes. Automated scans check contrast. See [Color](/color).' },
          { name: 'Reduced motion', description: 'Every component with motion follows the system reduced-motion setting, which nothing overrides. The Wireframe theme also removes motion. State changes, such as a chevron turning, then happen immediately, so the state stays visible. See [Motion](/motion).' },
          { name: 'Forced colours', description: 'In Windows high contrast mode, borders, focus rings and selection stay visible. Browser tests check this for several components.' },
          { name: 'Text size', description: 'Library lengths are stored in `rem`, so spacing and sizes grow when someone increases their default text size. See [Spacing](/spacing).' },
          { name: 'Touch targets', description: 'Buttons, tabs, text inputs and TopBar links are at least 44px tall at the default text size. See [Interaction](/interaction).' },
        ],
      },
    },
    {
      key: 'product',
      title: 'What your product supplies',
      table: {
        label: 'Accessibility supplied by products',
        nameColumn: 'Area',
        descriptionColumn: 'What to do',
        namesAreCode: false,
        rows: [
          { name: 'Names and labels', description: 'Give every control a clear, visible label where possible, and an accessible name when it shows only an icon. A tooltip supplements an accessible name; it does not replace it.' },
          { name: 'Images', description: 'Meaningful images need alternative text. Decorative images do not.' },
        ],
      },
    },
    {
      key: 'checking',
      title: 'How it is checked',
      intro: [
        'Browser tests check pages at 320px wide and with text enlarged to 200%, without sideways scrolling. They also check keyboard operation, forced colours and reduced motion for the components that need it, and run automated accessibility scans against the WCAG 2.2 A and AA rules.',
        'Automated checks catch many problems but not all of them, so they support a review rather than replace it.',
      ],
    },
    {
      key: 'pageSpecifics',
      title: 'Notes on other pages',
      intro: ['Other pages include an Accessibility section in their Technical details only when they have something specific to add, such as a Tooltip not opening on tap.'],
    },
  ],
  relatedPages: [
    { label: 'Interaction', href: '/interaction' },
    { label: 'Color', href: '/color' },
    { label: 'Motion', href: '/motion' },
  ],
  references: [
    { label: 'WCAG 2.2', href: 'https://www.w3.org/TR/WCAG22/' },
    { label: 'React Aria: Accessibility', href: 'https://react-aria.adobe.com/quality#accessibility' },
  ],
}
