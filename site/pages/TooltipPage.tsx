import { IconButton, SettingsIcon, Tooltip, TooltipTrigger } from '@decocode/mezzanine'
import { ComponentExample } from '../components/ComponentExample'
import { ComponentReferenceTable } from '../components/ComponentReferenceTable'
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
            <ComponentExample>
              <TooltipTrigger>
                <IconButton icon={<SettingsIcon />} label={tooltipContent.exampleLabel} />
                <Tooltip placement="bottom">{tooltipContent.exampleTooltip}</Tooltip>
              </TooltipTrigger>
            </ComponentExample>
          </>,
        },
        {
          id: 'tooltip-technical-details',
          title: 'Technical details',
          sections: [
            {
              id: 'tooltip-anatomy-heading',
              title: 'Anatomy',
              content: <ComponentReferenceTable aria-label="Tooltip anatomy" nameColumn="Component" rows={tooltipContent.anatomyRows} />,
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
              content: <ComponentReferenceTable aria-label="Tooltip props" nameColumn="Prop" rows={tooltipContent.propsRows} />,
            },
            {
              id: 'tooltip-tokens-heading',
              title: 'CSS tokens',
              content: <>
                <p>{tooltipContent.tokensParagraph}</p>
                <ComponentReferenceTable aria-label="Tooltip CSS tokens" nameColumn="CSS token" rows={tooltipContent.tokensRows} />
              </>,
            },
          ],
        },
      ]}
    />
  )
}
