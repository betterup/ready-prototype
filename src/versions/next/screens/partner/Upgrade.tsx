import { useState } from 'react'
import { upgradeFlow } from '../../../../data'
import {
  ChevronDown, ChevronUp, EnvelopeIcon, GridIcon, MessageIcon, MobileIcon,
} from '../../../../icons'
import AudienceSelect from './AudienceSelect'

const { audience, compose, review } = upgradeFlow

const CHANNEL_ICONS: Record<string, (p: { className?: string }) => JSX.Element> = {
  email: EnvelopeIcon,
  slack: GridIcon,
  teams: MessageIcon,
  text: MobileIcon,
}

/** Concept-only: a three-step nudge composer living behind Admin > Upgrade
 *  members. It reuses the invite flow's accordion shell (`p-step*`) so the two
 *  admin wizards still read as the same pattern; everything inside a step is
 *  new and scoped under `.v-next` in next.css. */
export default function Upgrade() {
  const [openStep, setOpenStep] = useState(1)
  const [unlocked, setUnlocked] = useState(1)

  const [audiences, setAudiences] = useState<string[]>([])
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [channel, setChannel] = useState('email')
  const [timing, setTiming] = useState('now')

  const advance = (to: number) => {
    setUnlocked((u) => Math.max(u, to))
    setOpenStep(to)
  }

  const channelLabel = compose.channels.find((c) => c.id === channel)?.label ?? ''
  const composed = subject.trim() !== '' && message.trim() !== ''

  /** Tokens append rather than splice at the caret: the point is showing what
   *  personalisation is available, and appending never mangles a draft. */
  const addToken = (token: string) =>
    setMessage((m) => `${m}${m && !m.endsWith(' ') ? ' ' : ''}{${token}}`)

  return (
    <>
      <p className="p-eyebrow">{upgradeFlow.eyebrow}</p>
      <h1 className="p-title serif">{upgradeFlow.title}</h1>

      <div className="p-steps nudge">
        {upgradeFlow.steps.map(({ n, title }) => {
          const isOpen = openStep === n
          const available = n <= unlocked

          return (
            <section
              key={n}
              className={`p-step${isOpen ? ' open' : ''}${available ? '' : ' locked'}`}
            >
              <button
                className="p-step-head"
                aria-expanded={isOpen}
                disabled={!available}
                onClick={() => setOpenStep(isOpen ? 0 : n)}
              >
                <span className="p-step-title">{n}. {title}</span>
                {available && (isOpen ? <ChevronUp /> : <ChevronDown />)}
                {!available && <ChevronDown />}
              </button>

              {isOpen && n === 1 && (
                <div className="p-step-body">
                  <AudienceSelect picked={audiences} onChange={setAudiences} />

                  <div className="p-step-foot">
                    <button className="nudge-link">{audience.preview}</button>
                    <button
                      className="p-continue"
                      disabled={!audiences.length}
                      onClick={() => advance(2)}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {isOpen && n === 2 && (
                <div className="p-step-body">
                  <label className="p-field-label" htmlFor="nudge-subject">
                    {compose.subjectLabel}
                  </label>
                  <input
                    id="nudge-subject"
                    className="nudge-input"
                    maxLength={compose.subjectMax}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                  <p className="nudge-count">{subject.length} / {compose.subjectMax}</p>

                  <div className="nudge-field-head">
                    <label className="p-field-label" htmlFor="nudge-message">
                      {compose.messageLabel}
                    </label>
                    <button className="nudge-link">{compose.fromTemplate}</button>
                  </div>
                  <textarea
                    id="nudge-message"
                    className="p-textarea tall"
                    maxLength={compose.messageMax}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <p className="nudge-count">{message.length} / {compose.messageMax}</p>

                  <p className="nudge-token-label">{compose.tokenLabel}</p>
                  <div className="nudge-token-row">
                    <div className="nudge-tokens">
                      {compose.tokens.map((t) => (
                        <button key={t} className="nudge-token" onClick={() => addToken(t)}>
                          + {t}
                        </button>
                      ))}
                    </div>
                    <button className="nudge-link">{compose.saveTemplate}</button>
                  </div>

                  <p className="p-field-label spaced">{compose.channelLabel}</p>
                  <div className="nudge-channels">
                    {compose.channels.map((c) => {
                      const Icon = CHANNEL_ICONS[c.id]
                      const on = channel === c.id
                      return (
                        <label
                          key={c.id}
                          className={`nudge-channel${on ? ' on' : ''}${c.off ? ' off' : ''}`}
                        >
                          <input
                            type="radio"
                            name="nudge-channel"
                            checked={on}
                            disabled={c.off}
                            onChange={() => setChannel(c.id)}
                          />
                          <span className="nudge-channel-body">
                            <span className="nudge-channel-name"><Icon className="ic" /> {c.label}</span>
                            <span className="nudge-channel-desc">{c.desc}</span>
                          </span>
                        </label>
                      )
                    })}
                  </div>

                  <div className="p-step-foot">
                    <button className="nudge-link">{compose.preview}</button>
                    <button className="p-continue" disabled={!composed} onClick={() => advance(3)}>
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {isOpen && n === 3 && (
                <div className="p-step-body">
                  <dl className="nudge-review">
                    <div>
                      <dt>Audience</dt>
                      <dd>
                        {audiences.join(', ')}
                        <span className="nudge-review-note">{review.audienceNote}</span>
                      </dd>
                    </div>
                    <div><dt>Channel</dt><dd>{channelLabel}</dd></div>
                    <div><dt>{compose.subjectLabel}</dt><dd>{subject}</dd></div>
                    <div><dt>{compose.messageLabel}</dt><dd>{message}</dd></div>
                  </dl>

                  <p className="nudge-when">{review.whenLabel}</p>
                  <div className="nudge-options">
                    {review.timing.map((t) => (
                      <label key={t.id} className={`nudge-option${timing === t.id ? ' on' : ''}`}>
                        <input
                          type="radio"
                          name="nudge-timing"
                          checked={timing === t.id}
                          onChange={() => setTiming(t.id)}
                        />
                        <span className="nudge-option-label">
                          {t.label}
                          <span className="nudge-option-desc">{t.desc}</span>
                        </span>
                      </label>
                    ))}
                  </div>

                  <p className="nudge-note">{review.note}</p>
                </div>
              )}
            </section>
          )
        })}
      </div>

      {/* Outside the accordion, as in the reference: the send action belongs to
          the whole nudge, not to step 3. */}
      <div className="nudge-send">
        <button className="p-continue" disabled={unlocked < 3 || !composed}>
          {review.submit}
        </button>
      </div>
    </>
  )
}
