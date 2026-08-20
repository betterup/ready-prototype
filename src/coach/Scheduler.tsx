import { useState } from 'react'
import { coachAvailability } from '../data'
import { CalendarIcon, ClockIcon, PlusIcon } from '../icons'

/** Inline booking card the coach drops into the thread. Shared by both
 *  versions; the parent owns the booking so it survives re-renders and can
 *  post a follow-up message when a slot is taken. */
export default function Scheduler({
  booked, onBook,
}: { booked: string | null; onBook: (label: string) => void }) {
  const { days, sessionLabel, duration, timezone } = coachAvailability
  const [dayId, setDayId] = useState(days[0].id)
  const day = days.find((d) => d.id === dayId) ?? days[0]
  const zone = timezone.replace(/^All times in /, '')

  if (booked) {
    return (
      <div className="booker booked">
        <p className="booker-confirm"><CalendarIcon className="ic" /> Session booked</p>
        <p className="booker-what">{sessionLabel}</p>
        <p className="booker-when">{booked} · {zone}</p>
        <div className="booker-actions">
          <button className="booker-link"><PlusIcon className="ic" /> Add to calendar</button>
        </div>
      </div>
    )
  }

  return (
    <div className="booker" role="group" aria-label="Choose a session time">
      <div className="booker-head">
        <span className="booker-av">👩🏼‍💼</span>
        <div>
          <p className="booker-what">{sessionLabel}</p>
          <p className="booker-meta"><ClockIcon className="ic" />{duration} · {timezone}</p>
        </div>
      </div>

      <div className="booker-days">
        {days.map((d) => (
          <button
            key={d.id}
            className={`booker-day${d.id === dayId ? ' on' : ''}`}
            aria-pressed={d.id === dayId}
            onClick={() => setDayId(d.id)}
          >
            <span className="wd">{d.weekday}</span>
            <span className="dn">{d.day}</span>
          </button>
        ))}
      </div>

      <div className="booker-times">
        {day.times.map((t) => (
          <button
            key={t}
            className="booker-time"
            onClick={() => onBook(`${day.weekday} ${day.day} ${day.month} at ${t}`)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  )
}
