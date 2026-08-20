import { PersonIcon, ClockIcon, GlobeIcon, SparkleIcon } from '../../../../../icons'
import { MemberBlob } from '../Members'
import type { MemberView } from './view'

export default function Summary({ v }: { v: MemberView }) {
  const d = v.detail

  return (
    <div className="c-md-split">
      <aside className="c-md-side">
        <MemberBlob colors={v.avatar} size={112} online={d?.online} />
        <h1 className="c-md-name">{v.name}</h1>

        {d?.online && (
          <p className="c-live-row"><span className="c-presence static" /> {d.lastActive}</p>
        )}

        <ul className="c-md-facts">
          <li><PersonIcon className="ic" /> {v.role} at {v.company}</li>
          <li><ClockIcon className="ic" /> {d?.timezone ?? '—'}</li>
          <li><GlobeIcon className="ic" /> Language preferred: {d?.language ?? 'English'}</li>
          <li><SparkleIcon className="ic" /> {d?.ai ?? 'AI Disabled'}</li>
        </ul>

        <hr className="c-rule" />

        <dl className="c-md-meta">
          <dt>Program name</dt>
          <dd>{d ? <button className="c-underline">{d.programName}</button> : '—'}</dd>
          <dt>Coaching type</dt>
          <dd>{d?.coachingType ?? `${v.modality} coaching`}</dd>
          <dt>Coaching cloud</dt>
          <dd>{d?.coachingCloud ?? 'Professional'}</dd>
        </dl>

        <hr className="c-rule" />

        <dl className="c-md-meta">
          <dt>Complete final session before</dt>
          <dd>{d?.finalSessionBefore ?? '—'}</dd>
          <dt>Coaching start date</dt>
          <dd>{d?.startDate ?? '—'}</dd>
        </dl>
      </aside>

      <section className="c-md-main">
        {d ? (
          <article className="c-note-card">
            <span className="c-note-art">📅</span>
            <div>
              <h3>Next session is booked</h3>
              <p>
                {d.sessions.upcoming[0].weekday} the {d.sessions.upcoming[0].day},{' '}
                {d.sessions.upcoming[0].time}.{' '}
                <button className="c-underline">Open the session prep.</button>
              </p>
            </div>
          </article>
        ) : (
          <article className="c-note-card">
            <span className="c-note-art">⏰</span>
            <div>
              <h3>No sessions coming up</h3>
              <p>
                {v.firstName} doesn't have any sessions scheduled after this one.{' '}
                <button className="c-underline">Send a message and check-in.</button>
              </p>
            </div>
          </article>
        )}
      </section>
    </div>
  )
}
