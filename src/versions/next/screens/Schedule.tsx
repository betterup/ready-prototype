import { schedule, scheduleAllowance } from '../../../data'
import { PlusIcon, TrashIcon, CalendarIcon, ChevronRight } from '../../../icons'

/** Concept Schedule. Identical to the current screen except for the allowance
 *  line under the header, so the slider isolates that one change. */
export default function Schedule() {
  const { remaining, expires } = scheduleAllowance

  return (
    <div className="page">
      <div className="sched-head">
        <div className="sched-title">
          <h1 className="serif">Upcoming schedule</h1>
          <p className="sched-sub muted">
            {remaining} session{remaining === 1 ? '' : 's'} available to book until {expires}
          </p>
        </div>
        <span className="spacer" />
        <button className="btn primary sched-new">New session</button>
      </div>

      <div className="sched-meta">
        <span className="period">{schedule.period}</span>
        <span className="tz">{schedule.timezone}</span>
        <span className="spacer" />
        <span className="contact">Your coach will contact you via {schedule.contactMethod}</span>
        <button className="sched-change">
          Change contact method
          <ChevronRight className="ic" />
        </button>
      </div>

      {schedule.sessions.map((s) => (
        <article className="card sched-card" key={`${s.day}-${s.start}`}>
          <span className="sched-day serif">{s.day}</span>

          <div className="sched-body">
            <p className="sched-weekday">{s.weekday}</p>
            <p className="sched-time">{s.start} - {s.end}</p>
            <p className="sched-who">
              <span className="av">👩🏼‍💼</span>
              {s.kind} with {s.with}
            </p>
          </div>

          <div className="sched-actions">
            <button className="sched-action"><PlusIcon />Add to calendar</button>
            <button className="sched-action"><TrashIcon />Cancel</button>
            <button className="sched-action"><CalendarIcon />Reschedule</button>
          </div>
        </article>
      ))}
    </div>
  )
}
