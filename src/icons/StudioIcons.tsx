import type { ReactNode } from 'react'
import type { IconProps } from './Icons'

const iconLineWeight = 1.25

function GeometricIcon({ children, ...iconProps }: IconProps & { children: ReactNode }) {
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

function Solid({ d }: { d: string }) {
  return <path d={d} fill="currentColor" stroke="none" />
}

function Outline({ d }: { d: string }) {
  return <path d={d} fill="none" strokeWidth={iconLineWeight} />
}

function OutlineCircle({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return <circle cx={cx} cy={cy} fill="none" r={r} strokeWidth={iconLineWeight} />
}

export function TrashIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M3.5 6.5h17" /><Outline d="M9 6.5v-3h6v3" /><Outline d="M5.75 6.5l1 14h10.5l1-14" /><Outline d="M10 10.5v6.5M14 10.5v6.5" /></GeometricIcon>
}

export function UndoIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M8.5 13.5 4 9l4.5-4.5" /><Outline d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" /></GeometricIcon>
}

export function RedoIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M15.5 13.5 20 9l-4.5-4.5" /><Outline d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13" /></GeometricIcon>
}

export function MoreIcon(iconProps: IconProps) {
  return (
    <GeometricIcon {...iconProps}>
      <Solid d="M5 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
      <Solid d="M12 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
      <Solid d="M19 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
    </GeometricIcon>
  )
}

export function ExitIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M13.5 4H6.5v16h7" /><Outline d="M10.5 12h9.5" /><Outline d="M16.75 8.75 20 12l-3.25 3.25" /></GeometricIcon>
}

export function MusicNotesIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M9 18V5l12-2v13" /><OutlineCircle cx={6} cy={18} r={3} /><OutlineCircle cx={18} cy={16} r={3} /></GeometricIcon>
}

export function CloseIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M6 6l12 12M18 6 6 18" /></GeometricIcon>
}

export function ChevronDownIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M6 9l6 6 6-6" /></GeometricIcon>
}

export function ChevronLeftIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="m15 6-6 6 6 6" /></GeometricIcon>
}

export function ChevronRightIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="m9 6 6 6-6 6" /></GeometricIcon>
}

export function ChevronUpIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="m6 15 6-6 6 6" /></GeometricIcon>
}

const panelFrame = 'M3.75 4.75h16.5v14.5H3.75z'

export function PanelRightOpenIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d={panelFrame} /><Outline d="M15 4.75v14.5" /><Outline d="M11.5 9l-3 3 3 3" /></GeometricIcon>
}

export function PanelRightCloseIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d={panelFrame} /><Outline d="M15 4.75v14.5" /><Outline d="M8.5 9l3 3-3 3" /></GeometricIcon>
}

export function PlayIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M7.5 5.5v13L19 12z" /></GeometricIcon>
}

export function PauseIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M6.5 5.5h4v13h-4zM13.5 5.5h4v13h-4z" /></GeometricIcon>
}

export function RewindToStartIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M5.5 5.5v13M18.5 5.5v13L8.5 12z" /></GeometricIcon>
}

function Speaker() {
  return <Outline d="M3.75 9h3.5l5-4.25v14.5l-5-4.25h-3.5z" />
}

export function VolumeOffIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Speaker /></GeometricIcon>
}

export function VolumeLowIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Speaker /><Outline d="M15.25 9.25a3.9 3.9 0 0 1 0 5.5" /></GeometricIcon>
}

export function VolumeHighIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Speaker /><Outline d="M15.25 9.25a3.9 3.9 0 0 1 0 5.5" /><Outline d="M17.75 6.75a7.4 7.4 0 0 1 0 10.5" /></GeometricIcon>
}

export function VolumeMutedIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Speaker /><Outline d="M15.5 9.25l5.5 5.5M21 9.25l-5.5 5.5" /></GeometricIcon>
}

export function DrumIcon(iconProps: IconProps) {
  return (
    <GeometricIcon {...iconProps}>
      <ellipse cx="12" cy="11.75" fill="none" rx="9.75" ry="3.25" strokeWidth={iconLineWeight} />
      <Outline d="M2.25 11.75v6c0 1.8 4.37 3.25 9.75 3.25s9.75-1.45 9.75-3.25v-6" />
      <Outline d="M7 14.6v5.9M12 15v6M17 14.6v5.9" />
      <Outline d="M1.75 2.5l8.3 8.9M22.25 2.5l-8.3 8.9" />
      <circle cx="10.4" cy="11.8" fill="currentColor" r="1.4" stroke="none" />
      <circle cx="13.6" cy="11.8" fill="currentColor" r="1.4" stroke="none" />
    </GeometricIcon>
  )
}

function Magnifier() {
  return <><OutlineCircle cx={10.5} cy={10.5} r={6.25} /><Outline d="M15 15l5.5 5.5" /></>
}

export function ZoomInIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Magnifier /><Outline d="M10.5 7.5v6M7.5 10.5h6" /></GeometricIcon>
}

export function ZoomOutIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Magnifier /><Outline d="M7.5 10.5h6" /></GeometricIcon>
}

export function PlusIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M12 5v14M5 12h14" /></GeometricIcon>
}

export function MinusIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M5 12h14" /></GeometricIcon>
}

export function AudioBarsIcon(iconProps: IconProps) {
  return (
    <GeometricIcon {...iconProps}>
      <Outline d="M3.7 10v4" />
      <Outline d="M7.3 7.5v9" />
      <Outline d="M10.9 5v14" />
      <Outline d="M14.5 8.5v7" />
      <Outline d="M18.1 6.5v11" />
      <Outline d="M21.25 10v4" />
    </GeometricIcon>
  )
}

export function PulseIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M2 12h4l3-7 6 14 3-7h4" /></GeometricIcon>
}

export function WaveformIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M2 12h2.5l2-5 3 10 3-14 3 16 3-10 2 3H22" /></GeometricIcon>
}

export function RisingIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M2.5 17.5 9 11l4 4 8-8" /><Outline d="M15.5 7H21v5.5" /></GeometricIcon>
}

export function FallingIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M2.5 6.5 9 13l4-4 8 8" /><Outline d="M15.5 17H21v-5.5" /></GeometricIcon>
}

export function WavesIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M2.5 7c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 3-2" /><Outline d="M2.5 12.5c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 3-2" /><Outline d="M2.5 18c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 3-2" /></GeometricIcon>
}

export function MusicNoteIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><OutlineCircle cx={8.5} cy={17.5} r={3} /><Outline d="M11.5 17.5V3.5l6.5 3v4l-6.5-3" /></GeometricIcon>
}

export function FigureIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><OutlineCircle cx={12} cy={4.75} r={2.25} /><Outline d="M5 9.5h14" /><Outline d="M12 9.5v5" /><Outline d="M12 14.5l-3.5 7M12 14.5l3.5 7" /></GeometricIcon>
}

export function BulbIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M9 17.5v-2.75C7 13.4 5.75 11.4 5.75 9.25a6.25 6.25 0 0 1 12.5 0c0 2.15-1.25 4.15-3.25 5.5v2.75z" /><Outline d="M9.5 20.5h5" /></GeometricIcon>
}

export function VideoCameraIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M2.75 6.75h12.5v10.5H2.75z" /><Outline d="M15.25 10.5l6-3.5v10l-6-3.5z" /></GeometricIcon>
}

export function CaptionsIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M2.75 5.25h18.5v13.5H2.75z" /><Outline d="M6 11.5h7M15 11.5h3M6 15h3M11 15h7" /></GeometricIcon>
}

export function MicIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M9 5.5a3 3 0 0 1 6 0v6a3 3 0 0 1-6 0z" /><Outline d="M5.5 11a6.5 6.5 0 0 0 13 0" /><Outline d="M12 17.5v4M8.5 21.5h7" /></GeometricIcon>
}

export function MicOffIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M9 5.5a3 3 0 0 1 6 0v6a3 3 0 0 1-6 0z" /><Outline d="M5.5 11a6.5 6.5 0 0 0 13 0" /><Outline d="M12 17.5v4M8.5 21.5h7M3 21 21 3" /></GeometricIcon>
}

export function SparkleIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M10 3.5l1.9 5.1L17 10.5l-5.1 1.9L10 17.5l-1.9-5.1L3 10.5l5.1-1.9z" /><Solid d="M18.5 14.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" /></GeometricIcon>
}

export function DancePadIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M3.25 3.25h17.5v17.5H3.25z" /><Outline d="M9.5 8.5 12 6l2.5 2.5M9.5 15.5 12 18l2.5-2.5M8.5 9.5 6 12l2.5 2.5M15.5 9.5 18 12l-2.5 2.5" /></GeometricIcon>
}

export function ArrowUpIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M12 20V4.5M5.5 11 12 4.5l6.5 6.5" /></GeometricIcon>
}

export function ArrowDownIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M12 4v15.5M5.5 13l6.5 6.5 6.5-6.5" /></GeometricIcon>
}

export function ArrowLeftIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M20 12H4.5M11 5.5 4.5 12l6.5 6.5" /></GeometricIcon>
}

export function ArrowRightIcon(iconProps: IconProps) {
  return <GeometricIcon {...iconProps}><Outline d="M4 12h15.5M13 5.5l6.5 6.5-6.5 6.5" /></GeometricIcon>
}
