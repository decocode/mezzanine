import type { DocsPageContent } from '../../../templates/docsPageContent'

export const wireframeContent: DocsPageContent = {
  id: 'wireframe',
  kind: 'foundation',
  title: 'Wireframe',
  description: 'Wireframe is Mezzanine’s stripped-back theme. No brand colors or animation. The wireframe theme is a tool to help product teams (and their stakeholders) to focus on how people will experience core task flows, layout and how information is presented, without any distractions.',
  sections: [
    {
      key: 'whyItExists',
      title: 'Why it exists',
      intro: [
        'If people can find what they need, read it and act on it in Wireframe, your design works, without any visual brand expression. It also demonstrates what some people experience anyway. For example, people with visual impairments using screen readers, or people using the Reading mode of their browsers.',
      ],
    },
    {
      key: 'whyWireframesStillMatter',
      title: 'Why wireframes still matter',
      intro: [
        'AI tools can now turn an idea for a product into a high-fidelity, working prototype in a very short amount of time.',
        'However, a polished look-and-feel can be persuasive: beautiful screens may invite feedback on colors and images, rather than on whether the product is easy to use. Wireframe keeps the conversation on structure, copy and interaction which are the parts that are expensive to change later.',
        'Wireframe is not just a separate static drawing of a screen, although you can print it out if you want to! Wireframe theme is like an x-ray machine you can switch on at anytime to examine the bare bones, and then switch back to your custom brand theme in all its visual, content-rich splendor.',
      ],
    },
    {
      key: 'whatChanges',
      title: 'What changes in Wireframe',
      intro: [
        { list: [
          'Monochrome and semantic colors only.',
          'All links are underlined.',
          'Motion is switched off - no animation effects.',
        ] },
      ],
    },
  ],
}
