import { DemoArea, Header, ListBox, ListBoxItem, ListBoxSection, Text } from '@decocode/mezzanine'
import { listBoxContent, listBoxSections } from './listBoxContent'
import { ContentPage } from '../../../../templates/ContentPage'

export default function ListBoxPage() {
  return (
    <ContentPage
      content={listBoxContent}
      parts={{
        example: (
          <DemoArea>
            <ListBox aria-label="Options" selectionMode="single" className="list-box-example">
              {listBoxSections.map((section) => (
                <ListBoxSection key={section.id} id={section.id}>
                  <Header>{section.label}</Header>
                  {section.items.map((item) => (
                    <ListBoxItem key={item.id} id={item.id} textValue={item.label}>
                      <Text slot="label">{item.label}</Text>
                      <Text slot="description">{item.description}</Text>
                    </ListBoxItem>
                  ))}
                </ListBoxSection>
              ))}
            </ListBox>
          </DemoArea>
        ),
      }}
    />
  )
}
