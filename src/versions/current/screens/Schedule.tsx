import { schedule } from '../../../data'
import { PlusIcon, TrashIcon, CalendarIcon, ChevronRight } from '../../../icons'

export default function Schedule() {
  return (
    <div className="page">
      <div className="sched-head">
        <h1 className="serif">Upcoming schedule</h1>
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
