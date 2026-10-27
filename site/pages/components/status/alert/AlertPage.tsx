import { useState, type ReactNode } from 'react'
import {
  Button, CheckCircleIcon, DemoBlock, ErrorIcon, Header, InfoIcon, Link, ListBoxItem, ListBoxSection, Alert, PlaceholderIcon,
  Select, Separator, WarningIcon, type AlertPurpose,
} from '@decocode/mezzanine'
import { PanelSwitch } from '../../../../components/PanelSwitch'
import { alertContent, alertExample, alertExampleCode, alertPurposeGroups } from './alertContent'
import { ContentPage } from '../../../../templates/ContentPage'

// The icon for each purpose, matching alertIconNames in the content file.
const purposeIcons: Record<AlertPurpose, ReactNode> = {
  neutral: <InfoIcon />, info: <InfoIcon />, success: <CheckCircleIcon />, warning: <WarningIcon />, danger: <ErrorIcon />, accent: <PlaceholderIcon />, signature: <PlaceholderIcon />,
}

export default function AlertPage() {
  const [purpose, setPurpose] = useState<AlertPurpose>('accent')
  const [hasTitle, setHasTitle] = useState(true)
  const [hasIcon, setHasIcon] = useState(false)
  const [hasActions, setHasActions] = useState(false)
  const [hasContent, setHasContent] = useState(true)
  return (
    <ContentPage
      content={alertContent}
      parts={{
        // The Properties panel has a control for each of Alert's props.
        example: (
          <DemoBlock align="stretch"
            codeView={alertExampleCode({ purpose, hasTitle, hasIcon, hasActions, hasContent })}
            endPanel={<>
              <Select size="sm" label={alertExample.purposeLabel} selectedKey={purpose} onSelectionChange={(key) => { if (key != null) setPurpose(key as AlertPurpose) }}>
                {/* A Separator between the two sections, as a direct child of the list. */}
                {alertPurposeGroups.flatMap((group, index) => [
                  ...(index > 0 ? [<Separator key={`${group.key}-separator`} />] : []),
                  <ListBoxSection key={group.key} id={group.key}>
                    <Header>{group.label}</Header>
                    {group.purposes.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
                  </ListBoxSection>,
                ])}
              </Select>
              <PanelSwitch isSelected={hasTitle} onChange={setHasTitle}>{alertExample.titleLabel}</PanelSwitch>
              <PanelSwitch isSelected={hasContent} onChange={setHasContent}>{alertExample.contentLabel}</PanelSwitch>
              <PanelSwitch isSelected={hasIcon} onChange={setHasIcon}>{alertExample.iconLabel}</PanelSwitch>
              <PanelSwitch isSelected={hasActions} onChange={setHasActions}>{alertExample.actionsLabel}</PanelSwitch>
            </>}
          >
            <Alert
              purpose={purpose}
              title={hasTitle ? alertExample.title : undefined}
              icon={hasIcon ? purposeIcons[purpose] : undefined}
              actions={hasActions ? <>
                <Button size="sm" hierarchy="secondary">{alertExample.button}</Button>
                <Link href="/alert">{alertExample.link}</Link>
              </> : undefined}
            >
              {hasContent ? alertExample.content : undefined}
            </Alert>
          </DemoBlock>
        ),
      }}
    />
  )
}
