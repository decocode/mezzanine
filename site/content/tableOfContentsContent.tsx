// Written guidance and reference entries; live examples stay in the page.
export const tableOfContentsContent = {
  title: 'Table of contents',
  description: 'A table of contents lists the sections of a page as links. It helps people see what the page covers and jump straight to the part they need.',
  relatedPages: [
    { label: 'Link', href: '/link' },
    { label: 'Button', href: '/button' },
    { label: 'Radio group', href: '/radio-group' },
  ],
  references: [
    { label: 'React Aria Link', href: 'https://react-aria.adobe.com/Link' },
  ],
  referencesId: 'table-of-contents-references-heading',
  exampleParagraphs: [
    <>
      Parent links lead to sections; indented child links lead to their subsections.
      All links stay visible. Try a child link in the example to jump to its heading.
    </>,
    <>
      Import <code>TableOfContents</code> from <code>@decocode/mezzanine</code>.
      It composes Mezzanine’s React Aria <code>Heading</code> and <code>Link</code>
      with a navigation landmark and nested lists.
    </>,
  ],
  anatomyRows: [
    { name: 'TableOfContents', description: <>Renders a named navigation landmark and nested lists of section links.</> },
    { name: 'Heading', description: <>Provides the visible Contents label and accessible navigation name.</> },
    { name: 'Link', description: <>Points to the id supplied for each section.</> },
  ],
  propsRows: [
    {
      name: 'sections', description: <>
        Required list of sections, each with an <code>id</code> matching a destination
        heading and a <code>label</code> for its link. Optional <code>children</code>
        {' '}contain sections with the same structure, rendered as a nested list.
        List order is preserved. An empty list renders nothing.
      </>
    },
    { name: 'heading', description: <>Visible heading and navigation landmark name. Defaults to Contents.</> },
    { name: 'headingLevel', description: <>Heading level: 2 by default, or 3 when nested within a page section.</> },
    { name: 'className', description: <>Optional CSS class added alongside the component’s default class.</> },
  ],
  usageParagraphs: [
    <>
      Place the component after the page introduction. Match link labels to the section
      headings and give each destination a unique ID. Nest children to match the heading
      hierarchy.
    </>,
  ],
  accessibilityParagraphs: [
    <>
      The visible heading names the navigation landmark; use a distinct heading
      when more than one Table of Contents appears on a page.
    </>,
    <>
      Tab moves between links and Enter follows a link. Following a link updates the
      URL fragment to identify the section. The showcase keeps target headings
      below its sticky header and turns off smooth scrolling for reduced-motion preferences.
    </>,
  ],
}
