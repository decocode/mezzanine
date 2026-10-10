import type { ReactNode, SVGProps } from 'react'

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'children' | 'strokeWidth' | 'viewBox'>

const iconLineWeight = 1.25

interface StrokeIconProps extends IconProps {
  children: ReactNode
}

function StrokeIcon({
  children,
  ...iconProps
}: StrokeIconProps) {
  return (
    <svg
      {...iconProps}
      aria-hidden="true"
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeWidth={iconLineWeight}
      viewBox="0 0 24 24"
    >
      {children}
    </svg>
  )
}

export function DownloadIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><path d="M12 3v13m-5-5 5 5 5-5M4 18v3h16v-3" /></StrokeIcon>
}

export function ExternalLinkIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><path d="M14 2h8v8m0-8L11 13m9 0v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6" /></StrokeIcon>
}

export function MenuIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><path d="M3 6h18M3 12h18M3 18h18" /></StrokeIcon>
}

export function LinkedInIcon(iconProps: IconProps) {
  return (
    <StrokeIcon {...iconProps}>
      <rect height="20" width="20" x="2" y="2" />
      <path d="M7 9v7M7 6h.01M11 16v-7m0 3a3 3 0 0 1 6 0v4" />
    </StrokeIcon>
  )
}

export function ResetIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><path d="M4 9a8 8 0 1 1-.5 5.5" /><path d="M4 4v5h5" /></StrokeIcon>
}

export function EyeIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></StrokeIcon>
}

export function EyeOffIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /><path d="M3 21 21 3" /></StrokeIcon>
}

export function CheckIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><path d="m6 12 4 4 8-8" /></StrokeIcon>
}

export function TrustIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><path d="M12 3 19 6v5c0 4.75-2.88 8.18-7 10-4.12-1.82-7-5.25-7-10V6l7-3Z" /><path d="m8.5 12 2.25 2.25L15.5 9.5" /></StrokeIcon>
}

export function LocationIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" /></StrokeIcon>
}

export function BriefcaseIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><rect height="13" width="18" x="3" y="7" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" /></StrokeIcon>
}

export function CopyIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><rect height="12" width="12" x="8" y="8" /><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" /></StrokeIcon>
}

export function EmailIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><rect height="14" width="18" x="3" y="5" /><path d="m4 7 8 6 8-6" /></StrokeIcon>
}

export function LoadingIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><circle cx="12" cy="12" r="8" strokeDasharray="14 50" /></StrokeIcon>
}

export function MoonIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" /></StrokeIcon>
}

export function PlaceholderIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><rect height="18" width="18" x="3" y="3" /><path d="M3 3l18 18M21 3 3 21" /></StrokeIcon>
}

export function SunIcon(iconProps: IconProps) {
  return (
    <StrokeIcon {...iconProps}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
    </StrokeIcon>
  )
}
