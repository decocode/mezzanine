// The Lab's Item page: the candidate Item in the Lab demo block, with its properties and its parts in
// separate groups. Illustrative and unapproved.
import { useState } from 'react'
import { Button, CodeBlock, PlaceholderIcon } from '@decocode/mezzanine'
import { PanelSelect } from '../../components/PanelSelect'
import { PanelSwitch } from '../../components/PanelSwitch'
import { LabDemoBlock } from '../panel-demo-block/LabDemoBlock'
import { LabContentPage } from '../shared/StagePages'
import { Item, ItemActions, ItemFooter, ItemHeader, ItemMedia, type ItemPurpose, type ItemSize, type ItemVariant } from './Item'
import { itemCode, itemLabels as labels, itemPage, itemParts, itemPurposes, itemSizes, itemVariants } from './itemContent'
import '../panel-demo-block/panelDemoBlock.css'

export function ItemExperiment() {
  const [variant, setVariant] = useState<ItemVariant>('outline')
  const [purpose, setPurpose] = useState<ItemPurpose>('neutral')
  const [size, setSize] = useState<ItemSize>('md')
  const [description, setDescription] = useState(true)
  const [href, setHref] = useState(false)
  const [parts, setParts] = useState<Record<(typeof itemParts)[number], boolean>>({ ItemMedia: true, ItemActions: true, ItemHeader: false, ItemFooter: false })
  return <LabContentPage content={itemPage} parts={{
    example: (
      <LabDemoBlock
        properties={<>
          <PanelSelect label="variant" options={itemVariants} value={variant} onChange={setVariant} />
          <PanelSelect label="purpose" options={itemPurposes} value={purpose} onChange={setPurpose} />
          <PanelSelect label="size" options={itemSizes} value={size} onChange={setSize} />
          <PanelSwitch isSelected={description} onChange={setDescription}>description</PanelSwitch>
          <PanelSwitch isSelected={href} onChange={setHref}>href</PanelSwitch>
        </>}
        parts={itemParts.map((name) => (
          <PanelSwitch key={name} isSelected={parts[name]} onChange={(isSelected) => setParts({ ...parts, [name]: isSelected })}>{name}</PanelSwitch>
        ))}
      >
        <div className="lab-item-example">
          <Item variant={variant} purpose={purpose} size={size} title={labels.title} description={description ? labels.description : undefined} href={href ? labels.href : undefined}>
            {parts.ItemHeader && <ItemHeader>{labels.header}</ItemHeader>}
            {parts.ItemMedia && <ItemMedia><PlaceholderIcon /></ItemMedia>}
            {parts.ItemActions && <ItemActions><Button hierarchy="secondary" size="sm">{labels.action}</Button></ItemActions>}
            {parts.ItemFooter && <ItemFooter>{labels.footer}</ItemFooter>}
          </Item>
        </div>
      </LabDemoBlock>
    ),
    // The code shows in its own section under the example, and follows the demo settings.
    code: <CodeBlock language="tsx">{itemCode({ variant, purpose, size, description, href, parts })}</CodeBlock>,
  }} />
}
