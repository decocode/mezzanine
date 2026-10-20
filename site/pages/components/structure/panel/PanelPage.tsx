import { panelContent } from './panelContent'
import { AppShellExample } from '../app-shell/AppShellExample'
import { ContentPage } from '../../../../templates/ContentPage'

export default function PanelPage() {
  return <ContentPage content={panelContent} parts={{ example: <AppShellExample /> }} />
}
