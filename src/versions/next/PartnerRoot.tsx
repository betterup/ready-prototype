import { useState } from 'react'
import { partnerNavNext } from '../../data'
import {
  ChevronDown, ChevronUp, GearIcon, HelpIcon, HomeIcon, InsightsIcon,
  PanelIcon, PersonPairIcon,
} from '../../icons'
import AccountMenu from '../current/AccountMenu'
import Invite from '../current/screens/partner/Invite'
import PartnerHomeScreen from '../current/screens/partner/Home'
import Members from '../current/screens/partner/Members'
import Scheduled from '../current/screens/partner/Scheduled'
import Upgrade from './screens/partner/Upgrade'

const RAIL_ICONS: Record<string, (p: { className?: string }) => JSX.Element> = {
  home: HomeIcon,
  analytics: InsightsIcon,
  admin: PersonPairIcon,
}

/** Rail destinations that have a screen. Everything else is a placeholder. */
type Dest = 'home' | 'invite' | 'upgrade' | 'members' | 'scheduled' | string

/** Rail leaves whose label doesn't match its destination id. */
const LEAF_DEST: Record<string, Dest> = {
  Members: 'members',
  'Invite members': 'invite',
  'Upgrade members': 'upgrade',
  'Scheduled invitations': 'scheduled',
}

const BUILT: Dest[] = ['home', 'invite', 'upgrade', 'members', 'scheduled']

/** The CONCEPT partner shell. Forked from ../current/PartnerRoot so the two
 *  sides of the comparison can diverge; it still imports the screens that
 *  haven't been redesigned yet, so only the differences live here.
 *
 *  Differences from the baseline so far:
 *  - the rail carries an Admin > Upgrade members leaf, and its screen. */
export default function PartnerRoot({ onSwitchExperience, onLogo }: {
  onSwitchExperience: (e: 'member' | 'partner' | 'coach') => void
  onLogo: () => void
}) {
  // Collapsed on landing: the admin screens are wide tables, so the rail earns
  // its width only once you go looking for it.
  const [expanded, setExpanded] = useState(false)
  // Analytics starts collapsed; Admin is where the built screens live, so it
  // stays open.
  const [openGroups, setOpenGroups] = useState<string[]>(['admin'])
  // Switching into the partner experience remounts this shell, so the initial
  // dest is also the landing screen — Home, same as the member experience.
  const [dest, setDest] = useState<Dest>('home')

  const toggleGroup = (id: string) =>
    setOpenGroups((g) => (g.includes(id) ? g.filter((x) => x !== id) : [...g, id]))

  // Collapsed rail: tapping a group opens the rail on that group.
  const onCollapsedClick = (id: string) => {
    if (id === 'home') return setDest('home')
    setExpanded(true)
    setOpenGroups((g) => (g.includes(id) ? g : [...g, id]))
  }

  const leafDest = (label: string): Dest => LEAF_DEST[label] ?? label

  return (
    <div className="p-shell">
      <header className="p-topbar">
        <button className="p-logo" onClick={onLogo}>BetterUp</button>
        <span className="spacer" />
        <button className="p-icon-btn" aria-label="Settings"><GearIcon /></button>
        <button className="p-icon-btn" aria-label="Help"><HelpIcon /></button>
        <AccountMenu experience="partner" onSwitchExperience={onSwitchExperience} />
      </header>

      <div className="p-body">
        <nav className={`p-rail${expanded ? ' wide' : ''}`} aria-label="Admin sections">
          <button
            className="p-rail-toggle"
            aria-label={expanded ? 'Collapse menu' : 'Expand menu'}
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
          >
            <PanelIcon />
          </button>

          {partnerNavNext.map((entry) => {
            const Icon = RAIL_ICONS[entry.id]
            const isLeaf = !entry.groups
            const groupOpen = openGroups.includes(entry.id)

            if (!expanded) {
              return (
                <button
                  key={entry.id}
                  className={`p-rail-btn${isLeaf && dest === 'home' ? ' on' : ''}`}
                  aria-label={entry.label}
                  onClick={() => onCollapsedClick(entry.id)}
                >
                  <Icon />
                </button>
              )
            }

            if (isLeaf) {
              return (
                <button
                  key={entry.id}
                  className={`p-nav-item${dest === 'home' ? ' on' : ''}`}
                  aria-current={dest === 'home' ? 'page' : undefined}
                  onClick={() => setDest('home')}
                >
                  <Icon />
                  {entry.label}
                </button>
              )
            }

            return (
              <div className="p-nav-group" key={entry.id}>
                <button
                  className="p-nav-item"
                  aria-expanded={groupOpen}
                  onClick={() => toggleGroup(entry.id)}
                >
                  <Icon />
                  {entry.label}
                  <span className="spacer" />
                  {groupOpen ? <ChevronUp /> : <ChevronDown />}
                </button>

                {groupOpen && entry.groups!.map((g, gi) => (
                  <div className="p-nav-sub" key={g.label ?? gi}>
                    {gi > 0 && <hr className="p-nav-divider" />}
                    {g.label && <p className="p-nav-label">{g.label}</p>}
                    {g.items.map((item) => (
                      <button
                        key={item}
                        className={`p-nav-leaf${dest === leafDest(item) ? ' on' : ''}`}
                        aria-current={dest === leafDest(item) ? 'page' : undefined}
                        onClick={() => setDest(leafDest(item))}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )
          })}
        </nav>

        <main className="p-main">
          {dest === 'home' && <PartnerHomeScreen />}
          {dest === 'invite' && <Invite />}
          {dest === 'upgrade' && <Upgrade />}
          {dest === 'members' && <Members onInvite={() => setDest('invite')} />}
          {dest === 'scheduled' && <Scheduled onInvite={() => setDest('invite')} />}
          {!BUILT.includes(dest) && (
            <>
              <p className="p-eyebrow">Admin</p>
              <h1 className="p-title serif">{dest}</h1>
              <p className="p-todo">
                This screen isn't designed yet — send it over and it goes in here.
              </p>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
