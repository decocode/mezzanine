import {
  Button, Cell, Column, DemoArea, DownloadIcon, ListBoxItem, Notice, Row, Select, Separator, Table, TableBody, TableHeader, type ButtonHierarchy,
  type ButtonSize,
} from '@decocode/mezzanine'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { useState } from 'react'
import {
  buttonContent,
  buttonExampleCode,
  buttonExampleCopy,
  buttonExampleLabel,
  buttonFlags,
  buttonLinkNotice,
  buttonIconPositions,
  buttonLabelPositions,
  buttonTooltipPositions,
  buttonSizes,
  buttonStates,
  buttonHierarchies,
} from './buttonContent'
import { RichText } from '../../../../components/RichText'
import { ContentPage } from '../../../../templates/ContentPage'

export default function ButtonPage() {
  const [pressCount, setPressCount] = useState(0)
  const [hierarchy, setHierarchy] = useState<ButtonHierarchy>('primary')
  const [size, setSize] = useState<ButtonSize>('md')
  const [iconPosition, setIconPosition] = useState<(typeof buttonIconPositions)[number]>('leading')
  const [labelPosition, setLabelPosition] = useState<(typeof buttonLabelPositions)[number]>('tooltip')
  const [tooltipPosition, setTooltipPosition] = useState<(typeof buttonTooltipPositions)[number]>('top')
  const [flags, setFlags] = useState<Record<(typeof buttonFlags)[number], boolean>>({ isPending: false, isDisabled: false, icon: false })
  const flagCheckbox = (name: (typeof buttonFlags)[number], isDisabled = false) => (
    <PanelSwitch key={name} isDisabled={isDisabled} isSelected={flags[name]} onChange={(isSelected) => setFlags({ ...flags, [name]: isSelected })}>{name}</PanelSwitch>
  )
  // The icon settings apply one after another: iconPosition with an icon, labelPosition for an icon on
  // its own, and tooltipPosition for a label in a tooltip.
  const isIconButton = flags.icon && iconPosition === 'iconOnly'
  const hasTooltip = isIconButton && labelPosition === 'tooltip'
  const props = {
    hierarchy: hierarchy === 'primary' ? undefined : hierarchy, size: size === 'md' ? undefined : size,
    isPending: flags.isPending, isDisabled: flags.isDisabled,
  }
  const codeProps = {
    icon: flags.icon,
    iconPosition: flags.icon && iconPosition !== 'leading' ? iconPosition : undefined,
    labelPosition: isIconButton && !hasTooltip ? labelPosition : undefined,
    tooltipPosition: hasTooltip && tooltipPosition !== 'top' ? tooltipPosition : undefined,
    ...props,
  }
  const handlePress = () => setPressCount((count) => count + 1)

  return (
    <ContentPage
      content={buttonContent}
      parts={{
        example: (
          <DemoArea
            codeView={buttonExampleCode(codeProps)}
            endPanel={<>
              <Select label="hierarchy" selectedKey={hierarchy} onSelectionChange={(key) => { if (key != null) setHierarchy(key as ButtonHierarchy) }}>
                {buttonHierarchies.map((option) => <ListBoxItem key={option.hierarchy} id={option.hierarchy}>{option.hierarchy}</ListBoxItem>)}
              </Select>
              <Select label="size" selectedKey={size} onSelectionChange={(key) => { if (key != null) setSize(key as ButtonSize) }}>
                {buttonSizes.map((option) => <ListBoxItem key={option.size} id={option.size}>{option.size}</ListBoxItem>)}
              </Select>
              <Separator />
              {/* A running action isn't an unavailable one, so the two can't be on together. */}
              <div className="demo-panel-switches">
                {flagCheckbox('isPending', flags.isDisabled)}
                {flagCheckbox('isDisabled', flags.isPending)}
                {flagCheckbox('icon')}
              </div>
              {flags.icon && <Separator />}
              {/* Each icon setting appears once it applies. */}
              {flags.icon && (
                <Select
                  className="demo-panel-new-row"
                  label="iconPosition"
                  selectedKey={iconPosition}
                  onSelectionChange={(key) => { if (key != null) setIconPosition(key as (typeof buttonIconPositions)[number]) }}
                >
                  {buttonIconPositions.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
                </Select>
              )}
              {isIconButton && (
                <Select
                  className="demo-panel-new-row"
                  label="labelPosition"
                  selectedKey={labelPosition}
                  onSelectionChange={(key) => { if (key != null) setLabelPosition(key as (typeof buttonLabelPositions)[number]) }}
                >
                  {buttonLabelPositions.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
                </Select>
              )}
              {hasTooltip && (
                <Select
                  label="tooltipPosition"
                  selectedKey={tooltipPosition}
                  onSelectionChange={(key) => { if (key != null) setTooltipPosition(key as (typeof buttonTooltipPositions)[number]) }}
                >
                  {buttonTooltipPositions.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
                </Select>
              )}
            </>}
          >
            {isIconButton && !hasTooltip
              ? <Button {...props} icon={<DownloadIcon />} iconPosition="iconOnly" labelPosition={labelPosition as 'top' | 'bottom'} onPress={handlePress}>{buttonExampleLabel}</Button>
              : isIconButton
                ? <Button {...props} icon={<DownloadIcon />} iconPosition="iconOnly" tooltipPosition={tooltipPosition} onPress={handlePress}>{buttonExampleLabel}</Button>
                : <Button {...props} icon={flags.icon ? <DownloadIcon /> : undefined} iconPosition={iconPosition === 'trailing' ? 'trailing' : 'leading'} onPress={handlePress}>{buttonExampleLabel}</Button>}
            <p className="component-example-feedback" role="status">{buttonExampleCopy.pressCount} {pressCount}</p>
          </DemoArea>
        ),
        about: (
          <Notice purpose="info" title={buttonLinkNotice.title}>
            <p><RichText text={buttonLinkNotice.body} /></p>
          </Notice>
        ),
        states: (
          <div className="documentation-table">
            <Table aria-label="Button states">
              <TableHeader><Column id="state" isRowHeader>State</Column><Column id="behaviour">Behaviour</Column></TableHeader>
              <TableBody>
                {buttonStates.map(({ name, state, reactAriaState, description }) => (
                  <Row id={state} key={state}>
                    <Cell><span className="table-item-heading"><strong>{name}</strong><code>{reactAriaState}</code></span></Cell>
                    <Cell>{description}</Cell>
                  </Row>
                ))}
              </TableBody>
            </Table>
          </div>
        ),
      }}
    />
  )
}
