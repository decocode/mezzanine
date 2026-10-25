import { useState, type ReactNode } from 'react'
import {
  Button, Checkbox, CheckCircleIcon, DemoArea, ErrorIcon, Header, InfoIcon, Link, ListBoxItem, ListBoxSection, Notice, PlaceholderIcon,
  Select, Separator, WarningIcon, type NoticePurpose,
} from '@decocode/mezzanine'
import { noticeContent, noticeExample, noticeExampleCode, noticePurposeGroups } from './noticeContent'
import { ContentPage } from '../../../../templates/ContentPage'

// The icon for each purpose, matching noticeIconNames in the content file.
const purposeIcons: Record<NoticePurpose, ReactNode> = {
  neutral: <InfoIcon />, info: <InfoIcon />, success: <CheckCircleIcon />, warning: <WarningIcon />, danger: <ErrorIcon />, accent: <PlaceholderIcon />, signature: <PlaceholderIcon />,
}

export default function NoticePage() {
  const [purpose, setPurpose] = useState<NoticePurpose>('accent')
  const [hasTitle, setHasTitle] = useState(true)
  const [hasIcon, setHasIcon] = useState(false)
  const [hasActions, setHasActions] = useState(false)
  const [hasContent, setHasContent] = useState(true)
  return (
    <ContentPage
      content={noticeContent}
      parts={{
        // The Properties panel has a control for each of Notice's props.
        example: (
          <DemoArea align="stretch"
            codeView={noticeExampleCode({ purpose, hasTitle, hasIcon, hasActions, hasContent })}
            endPanel={<>
              <Select label={noticeExample.purposeLabel} selectedKey={purpose} onSelectionChange={(key) => { if (key != null) setPurpose(key as NoticePurpose) }}>
                {/* A Separator between the two sections, as a direct child of the list. */}
                {noticePurposeGroups.flatMap((group, index) => [
                  ...(index > 0 ? [<Separator key={`${group.key}-separator`} />] : []),
                  <ListBoxSection key={group.key} id={group.key}>
                    <Header>{group.label}</Header>
                    {group.purposes.map((option) => <ListBoxItem key={option} id={option}>{option}</ListBoxItem>)}
                  </ListBoxSection>,
                ])}
              </Select>
              <Checkbox isSelected={hasTitle} onChange={setHasTitle}>{noticeExample.titleLabel}</Checkbox>
              <Checkbox isSelected={hasContent} onChange={setHasContent}>{noticeExample.contentLabel}</Checkbox>
              <Checkbox isSelected={hasIcon} onChange={setHasIcon}>{noticeExample.iconLabel}</Checkbox>
              <Checkbox isSelected={hasActions} onChange={setHasActions}>{noticeExample.actionsLabel}</Checkbox>
            </>}
          >
            <Notice
              purpose={purpose}
              title={hasTitle ? noticeExample.title : undefined}
              icon={hasIcon ? purposeIcons[purpose] : undefined}
              actions={hasActions ? <>
                <Button size="sm" hierarchy="secondary">{noticeExample.button}</Button>
                <Link href="/notice">{noticeExample.link}</Link>
              </> : undefined}
            >
              {hasContent ? noticeExample.content : undefined}
            </Notice>
          </DemoArea>
        ),
      }}
    />
  )
}
