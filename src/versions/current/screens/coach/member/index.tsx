import { useState } from 'react'
import { MEMBER_TABS, type CoachMember, type MemberTab } from '../../../../../data'
import Summary from './Summary'
import Sessions from './Sessions'
import Activities from './Activities'
import Insights from './Insights'
import Assessments from './Assessments'
import Messages from './Messages'
import Notes from './Notes'
import Programs from './Programs'
import Goals from './Goals'
import { resolveMember } from './view'

/** The drill-down from the 1:1 roster: breadcrumb back to the list, then nine
 *  sub-tabs over one member. Tab state lives here, so it resets when you open a
 *  different member — same as the product. */
export default function MemberDetail({ member, onBack }: {
  member: CoachMember
  onBack: () => void
}) {
  const [tab, setTab] = useState<MemberTab>('Summary')
  const v = resolveMember(member)

  return (
    <>
      <div className="c-crumb">
        <button className="c-underline" onClick={onBack}>Member list</button>
        <span>/</span>
        <span className="c-subtle">{v.name}: {tab}</span>
      </div>

      <nav className="c-subtabs" aria-label={`${v.name} sections`}>
        {MEMBER_TABS.map((t) => (
          <button
            key={t}
            className={`c-subtab${tab === t ? ' on' : ''}`}
            aria-current={tab === t ? 'page' : undefined}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </nav>

      {tab === 'Summary' && <Summary v={v} />}
      {tab === 'Sessions' && <Sessions v={v} />}
      {tab === 'Activities' && <Activities />}
      {tab === 'Member Insights' && <Insights v={v} />}
      {tab === 'Assessments' && <Assessments v={v} />}
      {tab === 'Messages' && <Messages v={v} />}
      {tab === 'Notes' && <Notes />}
      {tab === 'Programs' && <Programs v={v} />}
      {tab === 'Goals' && <Goals v={v} />}
    </>
  )
}
