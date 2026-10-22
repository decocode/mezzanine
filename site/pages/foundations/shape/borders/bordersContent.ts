import type { DocsPageContent } from '../../../../templates/docsPageContent'

// {baseline} is replaced with the live value of --border-width-baseline.
export const bordersContent: DocsPageContent = {
  id: 'borders',
  kind: 'foundation',
  title: 'Borders',
  description: "Border width controls how heavy a surface's outline is. A shared scale gives every component the same steps to choose from.",
  sections: [
    {
      key: 'borderWidth',
      title: 'Border width',
      intro: ['The border-width scale goes up in 1px steps after a hairline. It uses `rem`, so borders thicken slightly when text is enlarged. Values come from the active CSS tokens.'],
    },
    {
      key: 'baselineBorderWidth',
      title: 'Baseline border width',
      intro: [
        "`--border-width-baseline` is the thickness of a component's border whenever it has one. It points at Small, `var(--border-width-sm)`, which is `{baseline}`. Every component's border-width token uses it, so a theme can make every border heavier or lighter by changing this one token, for example to `var(--border-width-md)`.",
        'It sets thickness only. Each component still decides whether it has a border at all, and `--color-border` on the [Color roles](/color/roles) page sets its color.',
        '`--border-width-hairline` is the thinner role for the edges between an app’s main areas, such as the AppShell’s areas. It points at Extra small, `var(--border-width-xs)`.',
      ],
    },
    {
      key: 'usingTheScale',
      title: 'Using the scale',
      intro: [
        'Components read a level directly, for example `border-width: var(--border-width-sm)`. A border only takes up space when its style is set: with `border-style: none`, the default, the width counts as zero.',
        'To give one component a different thickness from the rest, point its own token at another level instead of the baseline.',
      ],
    },
  ],
}
