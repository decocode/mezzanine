import { appShellContent } from './appShellContent'
import { AppShellExample } from './AppShellExample'
import { ContentPage } from '../../../templates/ContentPage'

export default function AppShellPage() {
  return <ContentPage content={appShellContent} parts={{ example: <AppShellExample /> }} />
}
