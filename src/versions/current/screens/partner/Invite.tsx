import { useState } from 'react'
import { inviteFlow } from '../../../../data'
import { ChevronDown, ChevronUp } from '../../../../icons'

/** Counts anything that looks like an address, so Continue enables on real input. */
const countEmails = (raw: string) =>
  raw.split(/[\s,;]+/).filter((t) => /.+@.+\..+/.test(t)).length

export default function Invite() {
  const [emails, setEmails] = useState('')
  const [openStep, setOpenStep] = useState(1)
  const [unlocked, setUnlocked] = useState(1)

  const valid = countEmails(emails)

  const advance = () => {
    setUnlocked((u) => Math.max(u, 2))
    setOpenStep(2)
  }

  return (
    <>
      <p className="p-eyebrow">{inviteFlow.eyebrow}</p>
      <h1 className="p-title serif">{inviteFlow.title}</h1>

      <div className="p-steps">
        {inviteFlow.steps.map(({ n, title }) => {
          const isOpen = openStep === n
          const available = n <= unlocked
          const done = n < unlocked

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
                {done && <span className="p-step-done">{valid} added</span>}
                {available && (isOpen ? <ChevronUp /> : <ChevronDown />)}
                {!available && <ChevronDown />}
              </button>

              {isOpen && n === 1 && (
                <div className="p-step-body">
                  <label className="p-field-label" htmlFor="invite-emails">
                    {inviteFlow.emailsLabel}
                  </label>
                  <textarea
                    id="invite-emails"
                    className="p-textarea"
                    placeholder={inviteFlow.emailsPlaceholder}
                    value={emails}
                    onChange={(e) => setEmails(e.target.value)}
                  />
                  <div className="p-step-foot">
                    <button className="p-continue" disabled={!valid} onClick={advance}>
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {isOpen && n > 1 && (
                <div className="p-step-body">
                  <p className="p-todo">
                    This step isn't designed yet — send the screen over and it goes in here.
                  </p>
                </div>
              )}
            </section>
          )
        })}
      </div>
    </>
  )
}
