import { useState } from 'react'
import type { CoachTab, Experience } from '../../nav'
import type { CoachMember } from '../../data'
import CoachTopNav from './CoachTopNav'
import CoachScreen from './screens/coach'
import MemberDetail from './screens/coach/member'

/** The coach experience. Its own nav and its own screen set — nothing here is
 *  shared with the member tabs, so tab state is local rather than lifted into
 *  App like the member `tab` is.
 *
 *  `openMember` is the 1:1 roster's drill-down. It sits beside the tab rather
 *  than inside it so leaving the tab clears the member, and coming back to
 *  1:1 Coaching lands on the list again. */
export default function CoachRoot({ onSwitchExperience, onLogo }: {
  onSwitchExperience: (e: Experience) => void
  onLogo: () => void
}) {
  const [tab, setTab] = useState<CoachTab>('home')
  const [openMember, setOpenMember] = useState<CoachMember | null>(null)

  const navigate = (t: CoachTab) => {
    setOpenMember(null)
    setTab(t)
  }

  return (
    <div className="c-shell">
      <CoachTopNav
        tab={tab}
        onNavigate={navigate}
        onSwitchExperience={onSwitchExperience}
        onLogo={onLogo}
      />

      <main className="c-screen">
        {openMember
          ? <MemberDetail member={openMember} onBack={() => setOpenMember(null)} />
          : <CoachScreen tab={tab} onOpenMember={setOpenMember} />}
      </main>
    </div>
  )
}
