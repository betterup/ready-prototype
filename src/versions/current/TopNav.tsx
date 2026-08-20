import { TAB_LABELS, TAB_ORDER, type Experience, type Tab } from '../../nav'
import {
  HomeIcon, InsightsIcon, CoachingIcon, SparkleIcon, GlobeIcon, CalendarIcon,
  BookmarkIcon, MessageIcon, HelpIcon,
} from '../../icons'
import AccountMenu from './AccountMenu'

const ICONS: Record<Tab, (p: { className?: string }) => JSX.Element> = {
  home: HomeIcon,
  insights: InsightsIcon,
  coaching: CoachingIcon,
  ai: SparkleIcon,
  discover: GlobeIcon,
  schedule: CalendarIcon,
}

const UTILITY = [
  { label: 'Saved', Icon: (p: { className?: string }) => <BookmarkIcon {...p} /> },
  { label: 'Messages', Icon: MessageIcon },
  { label: 'Help', Icon: HelpIcon },
]

export default function TopNav({ tab, onNavigate, onSwitchExperience, onLogo }: {
  tab: Tab
  onNavigate: (t: Tab) => void
  onSwitchExperience: (e: Experience) => void
  onLogo: () => void
}) {
  return (
    <nav className="topnav">
      <button className="logo" onClick={onLogo}>BetterUp</button>

      <div className="navgroup">
        {TAB_ORDER.map((id) => {
          const Icon = ICONS[id]
          return (
            <button
              key={id}
              className={`navitem${tab === id ? ' active' : ''}`}
              aria-current={tab === id ? 'page' : undefined}
              onClick={() => onNavigate(id)}
            >
              <Icon />
              {TAB_LABELS[id]}
            </button>
          )
        })}
      </div>

      <div className="navgroup right">
        {UTILITY.map(({ label, Icon }) => (
          <button key={label} className="navitem">
            <Icon />
            {label}
          </button>
        ))}

        <AccountMenu experience="member" onSwitchExperience={onSwitchExperience} />
      </div>
    </nav>
  )
}
