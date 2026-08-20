import { COACH_TAB_LABELS, COACH_TAB_ORDER, type CoachTab, type Experience } from '../../nav'
import { coachSelf } from '../../data'
import {
  HomeIcon, PersonIcon, PersonPairIcon, BookIcon, GlobeIcon, SparkleIcon,
  BoltIcon, CalendarIcon, MessageIcon, BellIcon, HelpIcon,
} from '../../icons'
import AccountMenu from './AccountMenu'

const ICONS: Record<CoachTab, (p: { className?: string }) => JSX.Element> = {
  home: HomeIcon,
  oneToOne: PersonIcon,
  circles: PersonPairIcon,
  resources: BookIcon,
  you: GlobeIcon,
  replay: SparkleIcon,
  ai: BoltIcon,
}

/** Right-hand group. None of these have screens in the reference captures, so
 *  they render but don't navigate. `badge` is the unread count on Messages. */
const UTILITY = [
  { label: 'Calendar', Icon: CalendarIcon },
  { label: 'Messages', Icon: MessageIcon, badge: 1 },
  { label: 'Notifications', Icon: BellIcon },
  { label: 'Help', Icon: HelpIcon },
]

/** The coach's dark, full-bleed nav. Distinct from both the member's light bar
 *  and the partner's floating one, so it gets its own component rather than a
 *  variant of either. */
export default function CoachTopNav({ tab, onNavigate, onSwitchExperience, onLogo }: {
  tab: CoachTab
  onNavigate: (t: CoachTab) => void
  onSwitchExperience: (e: Experience) => void
  onLogo: () => void
}) {
  return (
    <nav className="c-topnav">
      <button className="c-logo" onClick={onLogo}>BetterUp</button>

      <div className="c-navgroup">
        {COACH_TAB_ORDER.map((id) => {
          const Icon = ICONS[id]
          return (
            <button
              key={id}
              className={`c-navitem${tab === id ? ' active' : ''}`}
              aria-current={tab === id ? 'page' : undefined}
              onClick={() => onNavigate(id)}
            >
              <Icon />
              {COACH_TAB_LABELS[id]}
            </button>
          )
        })}
      </div>

      <div className="c-navgroup right">
        {UTILITY.map(({ label, Icon, badge }) => (
          <button key={label} className="c-navitem">
            <span className="c-navicon">
              <Icon />
              {badge && <span className="c-badge">{badge}</span>}
            </span>
            {label}
          </button>
        ))}

        <AccountMenu
          experience="coach"
          onSwitchExperience={onSwitchExperience}
          avatar={<span className="c-avatar-face">{coachSelf.avatar}</span>}
        />
      </div>
    </nav>
  )
}
