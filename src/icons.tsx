/** Line icons drawn to match the product's 1.6px stroked set. */
type P = { className?: string; style?: React.CSSProperties }

const s = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const Svg = ({ children, className, style }: P & { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">{children}</svg>
)

export const HomeIcon = (p: P) => (
  <Svg {...p}><path {...s} d="M3.5 10.2 12 3.5l8.5 6.7V20a.9.9 0 0 1-.9.9h-4.4v-6h-4.4v6H4.4A.9.9 0 0 1 3.5 20z" /></Svg>
)

export const InsightsIcon = (p: P) => (
  <Svg {...p}>
    <path {...s} d="M3 16.5 8.8 10l3.6 3.2L21 5" />
    <path {...s} d="M15.6 5H21v5.2" />
  </Svg>
)

export const CoachingIcon = (p: P) => (
  <Svg {...p}>
    <circle {...s} cx="9.6" cy="7.4" r="3.5" />
    <path {...s} d="M3.4 20.5c0-3.4 2.8-6.1 6.2-6.1 1.2 0 2.3.3 3.2.9" />
    <path {...s} d="m17.6 12.6.95 1.93 2.15.3-1.55 1.5.36 2.13-1.91-1-1.91 1 .36-2.13-1.55-1.5 2.15-.3z" />
  </Svg>
)

export const SparkleIcon = (p: P) => (
  <Svg {...p}>
    <path {...s} d="M10 3.2 11.7 8 16.5 9.7 11.7 11.4 10 16.2 8.3 11.4 3.5 9.7 8.3 8z" />
    <path {...s} d="M17.4 14.4l.85 2.15 2.15.85-2.15.85-.85 2.15-.85-2.15-2.15-.85 2.15-.85z" />
  </Svg>
)

export const GlobeIcon = (p: P) => (
  <Svg {...p}>
    <circle {...s} cx="12" cy="12" r="8.6" />
    <path {...s} d="M3.4 12h17.2M12 3.4c2.3 2.3 3.4 5.2 3.4 8.6s-1.1 6.3-3.4 8.6c-2.3-2.3-3.4-5.2-3.4-8.6S9.7 5.7 12 3.4z" />
  </Svg>
)

export const CalendarIcon = (p: P) => (
  <Svg {...p}>
    <rect {...s} x="3.6" y="5.2" width="16.8" height="15.2" rx="2.4" />
    <path {...s} d="M3.6 9.8h16.8M8.4 3.6v3.2M15.6 3.6v3.2" />
  </Svg>
)

export const BookmarkIcon = ({ className, style, filled }: P & { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
    <path {...s} fill={filled ? 'currentColor' : 'none'} d="M6 4.6h12v15.8l-6-4.2-6 4.2z" />
  </svg>
)

export const MessageIcon = (p: P) => (
  <Svg {...p}><path {...s} d="M4 5.4h16v11.2h-9.4L5.4 20.4v-3.8H4z" /></Svg>
)

export const HelpIcon = (p: P) => (
  <Svg {...p}>
    <circle {...s} cx="12" cy="12" r="8.6" />
    <path {...s} d="M9.7 9.4A2.4 2.4 0 0 1 12 7.6c1.4 0 2.4.9 2.4 2.2 0 1.6-2.4 1.7-2.4 3.6" />
    <circle cx="12" cy="16.6" r="0.95" fill="currentColor" />
  </Svg>
)

export const SearchIcon = (p: P) => (
  <Svg {...p}><circle {...s} cx="10.8" cy="10.8" r="6.4" /><path {...s} d="m15.6 15.6 4 4" /></Svg>
)

export const ChevronLeft = (p: P) => <Svg {...p}><path {...s} d="m14.5 5-7 7 7 7" /></Svg>
export const ChevronRight = (p: P) => <Svg {...p}><path {...s} d="m9.5 5 7 7-7 7" /></Svg>
export const ChevronDown = (p: P) => <Svg {...p}><path {...s} d="m5 9.5 7 7 7-7" /></Svg>
export const ChevronUp = (p: P) => <Svg {...p}><path {...s} d="m5 14.5 7-7 7 7" /></Svg>

export const PlusIcon = (p: P) => (
  <Svg {...p}><circle {...s} cx="12" cy="12" r="8.6" /><path {...s} d="M12 8.2v7.6M8.2 12h7.6" /></Svg>
)

export const PlusBare = (p: P) => <Svg {...p}><path {...s} d="M12 5.4v13.2M5.4 12h13.2" /></Svg>

export const MicIcon = (p: P) => (
  <Svg {...p}>
    <rect {...s} x="9.2" y="3.4" width="5.6" height="10.4" rx="2.8" />
    <path {...s} d="M5.8 11.6a6.2 6.2 0 0 0 12.4 0M12 17.8v2.8" />
  </Svg>
)

export const WaveIcon = (p: P) => (
  <Svg {...p}>
    <path {...s} d="M5 10v4M8.5 7.2v9.6M12 4.6v14.8M15.5 7.2v9.6M19 10v4" />
  </Svg>
)

export const MuteIcon = (p: P) => (
  <Svg {...p}>
    <path {...s} d="M4.4 9.6h3l4-3.2v11.2l-4-3.2h-3z" />
    <path {...s} d="m15.4 9.8 4.2 4.4M19.6 9.8l-4.2 4.4" />
  </Svg>
)

export const AttachIcon = (p: P) => (
  <Svg {...p}>
    <path {...s} d="M18.4 11.6l-6.5 6.5a4 4 0 0 1-5.7-5.7l7-7a2.7 2.7 0 0 1 3.8 3.8l-6.9 6.9a1.4 1.4 0 0 1-2-2l6.2-6.2" />
  </Svg>
)

export const PanelIcon = (p: P) => (
  <Svg {...p}>
    <rect {...s} x="3.6" y="4.4" width="16.8" height="15.2" rx="2.4" />
    <path {...s} d="M9.6 4.4v15.2" />
  </Svg>
)

export const ComposeIcon = (p: P) => (
  <Svg {...p}>
    <path {...s} d="M11 5.4H5.4v13.2h13.2V13" />
    <path {...s} d="m14.2 4.6 5.2 5.2-6.6 6.6H9.6v-3.2z" />
  </Svg>
)

export const RefreshIcon = (p: P) => (
  <Svg {...p}>
    <path {...s} d="M20 12a8 8 0 1 1-2.6-5.9M20 4.2v4.4h-4.4" />
  </Svg>
)

export const InfoIcon = (p: P) => (
  <Svg {...p}>
    <circle {...s} cx="12" cy="12" r="8.6" />
    <path {...s} d="M12 11v5.4" />
    <circle cx="12" cy="8.1" r="0.95" fill="currentColor" />
  </Svg>
)

export const DocIcon = (p: P) => (
  <Svg {...p}>
    <path {...s} d="M6.4 3.6h7.2l4 4v12.8H6.4z" />
    <path {...s} d="M13.2 3.8v4.2h4M9 12.4h6M9 15.6h4.4" />
  </Svg>
)

export const ClockIcon = (p: P) => (
  <Svg {...p}><circle {...s} cx="12" cy="12" r="8.6" /><path {...s} d="M12 7.4V12l3.2 2" /></Svg>
)

export const EnvelopeIcon = (p: P) => (
  <Svg {...p}>
    <rect {...s} x="3.4" y="5.8" width="17.2" height="12.4" rx="1.8" />
    <path {...s} d="m3.9 6.6 8.1 6.2 8.1-6.2" />
  </Svg>
)

export const GearIcon = (p: P) => (
  <Svg {...p}>
    <circle {...s} cx="12" cy="12" r="3.1" />
    <path {...s} d="M19.2 14.6a1.5 1.5 0 0 0 .3 1.65l.05.05a1.8 1.8 0 1 1-2.55 2.55l-.05-.05a1.5 1.5 0 0 0-2.55 1.07v.14a1.8 1.8 0 1 1-3.6 0v-.07a1.5 1.5 0 0 0-2.62-1 1.5 1.5 0 0 0-1.65.3l-.05.05A1.8 1.8 0 1 1 3.93 16.7l.05-.05a1.5 1.5 0 0 0-1.07-2.55h-.14a1.8 1.8 0 1 1 0-3.6h.07a1.5 1.5 0 0 0 1-2.62 1.5 1.5 0 0 0-.3-1.65l-.05-.05A1.8 1.8 0 1 1 6.04 3.63l.05.05a1.5 1.5 0 0 0 1.65.3h.07a1.5 1.5 0 0 0 .91-1.37v-.14a1.8 1.8 0 1 1 3.6 0v.07a1.5 1.5 0 0 0 2.55 1.07l.05-.05a1.8 1.8 0 1 1 2.55 2.55l-.05.05a1.5 1.5 0 0 0-.3 1.65v.07a1.5 1.5 0 0 0 1.37.91h.14a1.8 1.8 0 1 1 0 3.6h-.07a1.5 1.5 0 0 0-1.37.91z" />
  </Svg>
)

export const PersonIcon = (p: P) => (
  <Svg {...p}>
    <circle {...s} cx="12" cy="8" r="3.7" />
    <path {...s} d="M5.4 20.4c0-3.6 2.95-6.6 6.6-6.6s6.6 3 6.6 6.6" />
  </Svg>
)

export const ShieldIcon = (p: P) => (
  <Svg {...p}>
    <path {...s} d="M12 3.4 19.2 6v6.3c0 4-3 7.3-7.2 8.5-4.2-1.2-7.2-4.5-7.2-8.5V6z" />
  </Svg>
)

export const MapIcon = (p: P) => (
  <Svg {...p}>
    <path {...s} d="M9 5.2 3.8 7.3v11.5L9 16.7l6 2.1 5.2-2.1V5.2L15 7.3z" />
    <path {...s} d="M9 5.2v11.5M15 7.3v11.5" />
  </Svg>
)

export const LogOutIcon = (p: P) => (
  <Svg {...p}>
    <path {...s} d="M13.4 5.4H5.6v13.2h7.8" />
    <path {...s} d="M13.8 12h7.4M18 8.8 21.2 12 18 15.2" />
  </Svg>
)

export const TrashIcon = (p: P) => (
  <Svg {...p}>
    <path {...s} d="M5.4 7.4h13.2M9.6 7.4V5.2h4.8v2.2" />
    <path {...s} d="m7.3 7.4.85 12.3h7.7l.85-12.3" />
  </Svg>
)

/** Filled 4-point sparkle, for solid CTAs where the line version reads too thin. */
export const SparkleFilled = ({ className, style }: P) => (
  <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
    <path fill="currentColor" d="M12 2.8Q13.1 10.2 21.2 12 13.1 13.8 12 21.2 10.9 13.8 2.8 12 10.9 10.2 12 2.8Z" />
  </svg>
)

export const PersonPairIcon = (p: P) => (
  <Svg {...p}>
    <circle {...s} cx="9" cy="8" r="3.2" />
    <path {...s} d="M3.6 19.6c0-3 2.4-5.4 5.4-5.4s5.4 2.4 5.4 5.4" />
    <path {...s} d="M16 5.4a3.2 3.2 0 0 1 0 6M17.4 14.6c1.8.7 3 2.5 3 4.6" />
  </Svg>
)

/* ---------- coach shell ---------- */

export const BookIcon = (p: P) => (
  <Svg {...p}>
    <path {...s} d="M12 6.4C10.4 5.1 8.4 4.4 6 4.4H3.4v13.4H6c2.4 0 4.4.7 6 2 1.6-1.3 3.6-2 6-2h2.6V4.4H18c-2.4 0-4.4.7-6 2Z" />
    <path {...s} d="M12 6.4v13.4" />
  </Svg>
)

export const BoltIcon = (p: P) => (
  <Svg {...p}><path {...s} d="M13.4 2.8 5.2 13.4h5.2l-.8 7.8 8.2-10.6h-5.2z" /></Svg>
)

export const BellIcon = (p: P) => (
  <Svg {...p}>
    <path {...s} d="M18.2 16.6V10.6a6.2 6.2 0 0 0-12.4 0v6L4.2 18.4h15.6z" />
    <path {...s} d="M9.8 21.4a2.4 2.4 0 0 0 4.4 0" />
  </Svg>
)

export const ExternalIcon = (p: P) => (
  <Svg {...p}>
    <path {...s} d="M13.6 4.4h6v6M19.2 4.8 11 13" />
    <path {...s} d="M17.6 14v4.8a.8.8 0 0 1-.8.8H5.2a.8.8 0 0 1-.8-.8V7.2a.8.8 0 0 1 .8-.8H10" />
  </Svg>
)

export const ArrowUpIcon = (p: P) => <Svg {...p}><path {...s} d="M12 19V5.4M6.6 10.8 12 5.4l5.4 5.4" /></Svg>
export const ArrowDownIcon = (p: P) => <Svg {...p}><path {...s} d="M12 5v13.6M6.6 13.2 12 18.6l5.4-5.4" /></Svg>
