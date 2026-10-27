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

export function SearchIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5.5 5.5" /></StrokeIcon>
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

export function InfoIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7v1.5" /></StrokeIcon>
}

export function CheckCircleIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><circle cx="12" cy="12" r="9" /><path d="m8 12.5 2.5 2.5L16 9.5" /></StrokeIcon>
}

export function WarningIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><path d="M12 3.5 2.5 20h19Z" /><path d="M12 9.5v5M12 16.5V18" /></StrokeIcon>
}

export function ErrorIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><circle cx="12" cy="12" r="9" /><path d="M12 7v6.5M12 15.5V17" /></StrokeIcon>
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

// A page layout: header bar, column and image placeholder. Used for the Wireframe theme.
export function LayoutIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><rect height="5" width="18" x="3" y="3" /><rect height="10" width="6" x="3" y="11" /><rect height="10" width="9" x="12" y="11" /><path d="M12 11l9 10M21 11l-9 10" /></StrokeIcon>
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

// A circle, half filled: light or dark, whichever the device is set to.
export function ContrastIcon(iconProps: IconProps) {
  return (
    <StrokeIcon {...iconProps}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" />
    </StrokeIcon>
  )
}

export function HeartIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><path d="M12 20 4.2 12.2a4.6 4.6 0 0 1 6.5-6.5L12 7l1.3-1.3a4.6 4.6 0 0 1 6.5 6.5Z" /></StrokeIcon>
}

export function HomeIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><path d="m3 10 9-7 9 7M5 9v12h14V9M9 21v-8h6v8" /></StrokeIcon>
}

export function AccountIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><circle cx="12" cy="8" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2" /></StrokeIcon>
}

export function SlidersVerticalIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><path d="M4 3v18M12 3v18M20 3v18" /><path d="M1 8h6M9 16h6M17 8h6" /></StrokeIcon>
}


export function SettingsIcon(iconProps: IconProps) {
  return (
    <StrokeIcon {...iconProps}>
      <path d="M9.5 3h5l.5 3 2 1 2.8-1 2.5 4.3L20 12l2.3 1.7-2.5 4.3-2.8-1-2 1-.5 3h-5L9 18l-2-1-2.8 1-2.5-4.3L4 12l-2.3-1.7L4.2 6 7 7l2-1Z" />
      <circle cx="12" cy="12" r="3" />
    </StrokeIcon>
  )
}

function Solid({ d }: { d: string }) {
  return <path d={d} fill="currentColor" stroke="none" />
}

function Outline({ d }: { d: string }) {
  return <path d={d} fill="none" strokeWidth={iconLineWeight} />
}

function OutlineCircle({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return <circle cx={cx} cy={cy} fill="none" r={r} strokeWidth={iconLineWeight} />
}

// Lines of text, the middle one turning back under itself, as wrapped lines do.
export function TextWrapIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M3 6h18" /><Outline d="M3 12h15a3 3 0 0 1 0 6h-4" /><Outline d="m16 16-2 2 2 2" /><Outline d="M3 18h7" /></StrokeIcon>
}

export function TrashIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M3.5 6.5h17" /><Outline d="M9 6.5v-3h6v3" /><Outline d="M5.75 6.5l1 14h10.5l1-14" /><Outline d="M10 10.5v6.5M14 10.5v6.5" /></StrokeIcon>
}

export function UndoIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M8.5 13.5 4 9l4.5-4.5" /><Outline d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" /></StrokeIcon>
}

export function RedoIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M15.5 13.5 20 9l-4.5-4.5" /><Outline d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13" /></StrokeIcon>
}

export function MoreIcon(iconProps: IconProps) {
  return (
    <StrokeIcon {...iconProps}>
      <Solid d="M5 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
      <Solid d="M12 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
      <Solid d="M19 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
    </StrokeIcon>
  )
}

export function ExitIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M13.5 4H6.5v16h7" /><Outline d="M10.5 12h9.5" /><Outline d="M16.75 8.75 20 12l-3.25 3.25" /></StrokeIcon>
}

export function MusicNotesIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M9 18V5l12-2v13" /><OutlineCircle cx={6} cy={18} r={3} /><OutlineCircle cx={18} cy={16} r={3} /></StrokeIcon>
}

export function CloseIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M6 6l12 12M18 6 6 18" /></StrokeIcon>
}

// Six dots for a drag handle, as in GridList and Tree rows. Used inside the library, not exported.
export function DragHandleIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}>{[6, 12, 18].map((y) => <g key={y}><OutlineCircle cx={9} cy={y} r={1} /><OutlineCircle cx={15} cy={y} r={1} /></g>)}</StrokeIcon>
}

export function ChevronDownIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M6 9l6 6 6-6" /></StrokeIcon>
}

export function ChevronLeftIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="m15 6-6 6 6 6" /></StrokeIcon>
}

export function ChevronRightIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="m9 6 6 6-6 6" /></StrokeIcon>
}

export function ChevronUpIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="m6 15 6-6 6 6" /></StrokeIcon>
}

const panelFrame = 'M3.75 4.75h16.5v14.5H3.75z'

export function PanelLeftOpenIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d={panelFrame} /><Outline d="M9 4.75v14.5" /><Outline d="M12.5 9l3 3-3 3" /></StrokeIcon>
}

export function PanelLeftCloseIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d={panelFrame} /><Outline d="M9 4.75v14.5" /><Outline d="M15.5 9l-3 3 3 3" /></StrokeIcon>
}

export function PanelRightOpenIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d={panelFrame} /><Outline d="M15 4.75v14.5" /><Outline d="M11.5 9l-3 3 3 3" /></StrokeIcon>
}

export function PanelRightCloseIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d={panelFrame} /><Outline d="M15 4.75v14.5" /><Outline d="M8.5 9l3 3-3 3" /></StrokeIcon>
}

export function PlayIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M7.5 5.5v13L19 12z" /></StrokeIcon>
}

export function PauseIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M6.5 5.5h4v13h-4zM13.5 5.5h4v13h-4z" /></StrokeIcon>
}

export function RewindToStartIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M5.5 5.5v13M18.5 5.5v13L8.5 12z" /></StrokeIcon>
}

function Speaker() {
  return <Outline d="M3.75 9h3.5l5-4.25v14.5l-5-4.25h-3.5z" />
}

export function VolumeOffIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Speaker /></StrokeIcon>
}

export function VolumeLowIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Speaker /><Outline d="M15.25 9.25a3.9 3.9 0 0 1 0 5.5" /></StrokeIcon>
}

export function VolumeHighIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Speaker /><Outline d="M15.25 9.25a3.9 3.9 0 0 1 0 5.5" /><Outline d="M17.75 6.75a7.4 7.4 0 0 1 0 10.5" /></StrokeIcon>
}

export function VolumeMutedIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Speaker /><Outline d="M15.5 9.25l5.5 5.5M21 9.25l-5.5 5.5" /></StrokeIcon>
}

export function DrumIcon(iconProps: IconProps) {
  return (
    <StrokeIcon {...iconProps}>
      <ellipse cx="12" cy="11.75" fill="none" rx="9.75" ry="3.25" strokeWidth={iconLineWeight} />
      <Outline d="M2.25 11.75v6c0 1.8 4.37 3.25 9.75 3.25s9.75-1.45 9.75-3.25v-6" />
      <Outline d="M7 14.6v5.9M12 15v6M17 14.6v5.9" />
      <Outline d="M1.75 2.5l8.3 8.9M22.25 2.5l-8.3 8.9" />
      <circle cx="10.4" cy="11.8" fill="currentColor" r="1.4" stroke="none" />
      <circle cx="13.6" cy="11.8" fill="currentColor" r="1.4" stroke="none" />
    </StrokeIcon>
  )
}

function Magnifier() {
  return <><OutlineCircle cx={10.5} cy={10.5} r={6.25} /><Outline d="M15 15l5.5 5.5" /></>
}

export function ZoomInIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Magnifier /><Outline d="M10.5 7.5v6M7.5 10.5h6" /></StrokeIcon>
}

export function ZoomOutIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Magnifier /><Outline d="M7.5 10.5h6" /></StrokeIcon>
}

export function PlusIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M12 5v14M5 12h14" /></StrokeIcon>
}

export function MinusIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M5 12h14" /></StrokeIcon>
}

export function AudioBarsIcon(iconProps: IconProps) {
  return (
    <StrokeIcon {...iconProps}>
      <Outline d="M3.7 10v4" />
      <Outline d="M7.3 7.5v9" />
      <Outline d="M10.9 5v14" />
      <Outline d="M14.5 8.5v7" />
      <Outline d="M18.1 6.5v11" />
      <Outline d="M21.25 10v4" />
    </StrokeIcon>
  )
}

export function PulseIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M2 12h4l3-7 6 14 3-7h4" /></StrokeIcon>
}

export function WaveformIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M2 12h2.5l2-5 3 10 3-14 3 16 3-10 2 3H22" /></StrokeIcon>
}

export function RisingIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M2.5 17.5 9 11l4 4 8-8" /><Outline d="M15.5 7H21v5.5" /></StrokeIcon>
}

export function FallingIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M2.5 6.5 9 13l4-4 8 8" /><Outline d="M15.5 17H21v-5.5" /></StrokeIcon>
}

export function WavesIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M2.5 7c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 3-2" /><Outline d="M2.5 12.5c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 3-2" /><Outline d="M2.5 18c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 3-2" /></StrokeIcon>
}

export function MusicNoteIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><OutlineCircle cx={8.5} cy={17.5} r={3} /><Outline d="M11.5 17.5V3.5l6.5 3v4l-6.5-3" /></StrokeIcon>
}

export function FigureIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><OutlineCircle cx={12} cy={4.75} r={2.25} /><Outline d="M5 9.5h14" /><Outline d="M12 9.5v5" /><Outline d="M12 14.5l-3.5 7M12 14.5l3.5 7" /></StrokeIcon>
}

export function BulbIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M9 17.5v-2.75C7 13.4 5.75 11.4 5.75 9.25a6.25 6.25 0 0 1 12.5 0c0 2.15-1.25 4.15-3.25 5.5v2.75z" /><Outline d="M9.5 20.5h5" /></StrokeIcon>
}

export function VideoCameraIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M2.75 6.75h12.5v10.5H2.75z" /><Outline d="M15.25 10.5l6-3.5v10l-6-3.5z" /></StrokeIcon>
}

export function CaptionsIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M2.75 5.25h18.5v13.5H2.75z" /><Outline d="M6 11.5h7M15 11.5h3M6 15h3M11 15h7" /></StrokeIcon>
}

export function MicIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M9 5.5a3 3 0 0 1 6 0v6a3 3 0 0 1-6 0z" /><Outline d="M5.5 11a6.5 6.5 0 0 0 13 0" /><Outline d="M12 17.5v4M8.5 21.5h7" /></StrokeIcon>
}

export function MicOffIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M9 5.5a3 3 0 0 1 6 0v6a3 3 0 0 1-6 0z" /><Outline d="M5.5 11a6.5 6.5 0 0 0 13 0" /><Outline d="M12 17.5v4M8.5 21.5h7M3 21 21 3" /></StrokeIcon>
}

export function SparkleIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M10 3.5l1.9 5.1L17 10.5l-5.1 1.9L10 17.5l-1.9-5.1L3 10.5l5.1-1.9z" /><Solid d="M18.5 14.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" /></StrokeIcon>
}

export function DancePadIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M3.25 3.25h17.5v17.5H3.25z" /><Outline d="M9.5 8.5 12 6l2.5 2.5M9.5 15.5 12 18l2.5-2.5M8.5 9.5 6 12l2.5 2.5M15.5 9.5 18 12l-2.5 2.5" /></StrokeIcon>
}

export function ArrowUpIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M12 20V4.5M5.5 11 12 4.5l6.5 6.5" /></StrokeIcon>
}

export function ArrowDownIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M12 4v15.5M5.5 13l6.5 6.5 6.5-6.5" /></StrokeIcon>
}

export function ArrowLeftIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M20 12H4.5M11 5.5 4.5 12l6.5 6.5" /></StrokeIcon>
}

export function ArrowRightIcon(iconProps: IconProps) {
  return <StrokeIcon {...iconProps}><Outline d="M4 12h15.5M13 5.5l6.5 6.5-6.5 6.5" /></StrokeIcon>
}
