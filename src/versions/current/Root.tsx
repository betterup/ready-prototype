import type { Experience, Tab, ScreenProps } from '../../nav'
import TopNav from './TopNav'
import CurrentScreen from './screens'
import PartnerRoot from './PartnerRoot'
import CoachRoot from './CoachRoot'

export default function CurrentRoot({
  experience, tab, onNavigate, onSwitchExperience, onShowToc,
}: {
  experience: Experience
  tab: Tab
  onSwitchExperience: (e: Experience) => void
  onShowToc: () => void
} & ScreenProps) {
  if (experience === 'partner') {
    return <PartnerRoot onSwitchExperience={onSwitchExperience} onLogo={onShowToc} />
  }

  if (experience === 'coach') {
    return <CoachRoot onSwitchExperience={onSwitchExperience} onLogo={onShowToc} />
  }

  return (
    <div className="shell">
      <TopNav
        tab={tab}
        onNavigate={onNavigate}
        onSwitchExperience={onSwitchExperience}
        onLogo={onShowToc}
      />
      <main className="screen">
        <CurrentScreen tab={tab} onNavigate={onNavigate} />
      </main>
    </div>
  )
}
