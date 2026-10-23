// Values shared by the Lab's pages: the overview heading, labels, the example picture's alt text
// and links to where layout components' ideas come from. Illustrative and unapproved.
import type { LinkItem } from '../../templates/docsPageContent'

// The badge on emerging features: they shouldn't be introduced into Mezzanine yet.
export const labBadgeLabel = 'Lab'

// The heading above an overview page's Cards, unless the overview names its own.
export const overviewPagesHeading = 'Pages'

// The label of the Button on each page's Card, which opens that page.
export const childPageCardAction = 'Read docs'

// The alt text for the example picture used by the Filling the box and Aspect ratio examples.
export const exampleImageAlt = 'Example picture: a dark square and a grey circle on a light background'

// Where a layout component's idea comes from: Every Layout and Bedrock Layouts.
export const everyLayout = (name: string, slug: string): LinkItem => ({ label: `Every Layout: ${name}`, href: `https://every-layout.dev/layouts/${slug}/` })
export const bedrock = (name: string, slug: string): LinkItem => ({ label: `Bedrock: ${name}`, href: `https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/${slug}` })
