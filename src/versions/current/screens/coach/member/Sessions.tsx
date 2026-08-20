import { PlusIcon, CalendarIcon } from '../../../../../icons'
import type { MemberView } from './view'

export default function Sessions({ v }: { v: MemberView }) {
  const s = v.detail?.sessions

  return (
    <>
      <header className="c-md-bar">
        <p><strong>{s?.completedAll ?? 0}</strong> sessions completed with all coaches</p>
        <p><strong>{s?.completedWithYou ?? 0}</strong> sessions completed with you</p>
        <span className="spacer" />
        <button className="c-addlink"><PlusIcon /> New session</button>
      </header>

      <div className="c-page">
        <h2 className="c-h2 serif-h">Upcoming sessions</h2>
        <hr className="c-rule" />

        {s?.upcoming.length ? (
          <>
            <div className="c-md-monthrow">
              <strong>{s.month}</strong>
              <span className="spacer" />
              <span className="c-subtle">{s.timezone}</span>
            </div>

            {s.upcoming.map((u) => (
              <article className="c-sess" key={u.day}>
                <span className="c-sess-day">{u.day}</span>
                <div className="c-sess-body">
                  <h3>{u.weekday}</h3>
                  <p className="c-sess-time">{u.time}</p>
                  <p className="c-subtle">{u.label}</p>
                </div>
                <button className="c-textlink strong">Complete</button>
                <button className="c-textlink strong"><CalendarIcon className="ic" /> Manage</button>
              </article>
            ))}
          </>
        ) : (
          <p className="c-replay-empty">No upcoming sessions</p>
        )}
      </div>
    </>
  )
}
