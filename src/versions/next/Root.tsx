import type { Experience, Tab, ScreenProps } from '../../nav'
import TopNav from '../current/TopNav'
import CurrentScreen from '../current/screens'
import PartnerRoot from '../current/PartnerRoot'
import CoachRoot from '../current/CoachRoot'
import { nextScreens } from './screens'

/** The "after" side of the comparison. Everything renders inside `.v-next`, so
 *  next.css can restyle freely without touching the frozen baseline.
 *
 *  The nav and the partner experience are still borrowed from `current`. When we
 *  redesign either, add it under versions/next/ and swap the import. */
export default function NextRoot({
  experience, tab, onNavigate, onSwitchExperience, onShowToc,
}: {
  experience: Experience
  tab: Tab
  onSwitchExperience: (e: Experience) => void
  onShowToc: () => void
} & ScreenProps) {
  const Screen = nextScreens[tab]

  if (experience === 'partner') {
    return (
      <div className="v-next">
        <PartnerRoot onSwitchExperience={onSwitchExperience} onLogo={onShowToc} />
      </div>
    )
  }

  if (experience === 'coach') {
    return (
      <div className="v-next">
        <CoachRoot onSwitchExperience={onSwitchExperience} onLogo={onShowToc} />
      </div>
    )
  }

  return (
    <div className="shell v-next">
      <TopNav
        tab={tab}
        onNavigate={onNavigate}
        onSwitchExperience={onSwitchExperience}
        onLogo={onShowToc}
      />
      <main className="screen">
        {Screen
          ? <Screen onNavigate={onNavigate} />
          : (
            <>
              <CurrentScreen tab={tab} onNavigate={onNavigate} />
              <p className="not-yet" role="status">Not yet reimagined — showing current</p>
            </>
          )}
      </main>
    </div>
  )
}
