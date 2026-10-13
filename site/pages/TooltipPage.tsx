import { Button, SettingsIcon, Tooltip, TooltipTrigger } from '@decocode/mezzanine'
import { ExampleZone } from '../components/ExampleZone'
import { DocsTable } from '../components/DocsTable'
import { tooltipContent } from '../content/tooltipContent'
import { ComponentPageTemplate } from '../templates/ComponentPageTemplate'

export default function TooltipPage() {
  return (
    <ComponentPageTemplate
      title={tooltipContent.title}
      description={tooltipContent.description}
      relatedPages={tooltipContent.relatedPages}
      references={tooltipContent.references}
      sections={[
        {
          id: 'tooltip-example-heading',
          title: 'Example',
          content: <>
            {tooltipContent.exampleParagraphs.map((paragraph, index) => <p className="component-section-description" key={index}>{paragraph}</p>)}
            <ExampleZone>
              <TooltipTrigger>
                <Button iconLeading={<SettingsIcon />} aria-label={tooltipContent.exampleLabel} />
                <Tooltip placement="bottom">{tooltipContent.exampleTooltip}</Tooltip>
              </TooltipTrigger>
            </ExampleZone>
          </>,
        },
        {
          id: 'tooltip-technical-details',
          title: 'Technical details',
          sections: [
            {
              id: 'tooltip-anatomy-heading',
              title: 'Anatomy',
              content: <DocsTable aria-label="Tooltip anatomy" nameColumn="Component" rows={tooltipContent.anatomyRows} />,
            },
            {
              id: 'tooltip-behaviour-heading',
              title: 'Behaviour',
              content: tooltipContent.behaviourParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>),
            },
            {
              id: 'tooltip-usage-heading',
              title: 'Usage',
              content: tooltipContent.usageParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>),
            },
            {
              id: 'tooltip-props-heading',
              title: 'Props',
              content: <DocsTable aria-label="Tooltip props" nameColumn="Prop" rows={tooltipContent.propsRows} />,
            },
            {
              id: 'tooltip-tokens-heading',
              title: 'CSS tokens',
              content: <>
                <p>{tooltipContent.tokensParagraph}</p>
                <DocsTable aria-label="Tooltip CSS tokens" nameColumn="CSS token" rows={tooltipContent.tokensRows} />
              </>,
            },
          ],
        },
      ]}
    />
  )
}
