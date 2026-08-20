import { scheduledInvitations as data } from '../../../../data'
import {
  ArrowRight, CheckIcon, EnvelopeIcon, PersonPairIcon, TrashIcon,
} from '../../../../icons'
import { Checkbox, FilterBar, HeadCells, useSelection } from './table'

export default function Scheduled({ onInvite }: { onInvite: () => void }) {
  const { send, promo, pending } = data
  const sel = useSelection(pending.rows.map((r) => r.email))

  return (
    <>
      <div className="p-head">
        <div className="p-head-text">
          <p className="p-eyebrow">{data.eyebrow}</p>
          <h1 className="p-title serif tight">{data.title}</h1>
        </div>
        <button className="p-invite" onClick={onInvite}>Invite</button>
      </div>

      <div className="p-send-row">
        <article className="p-send">
          <h2 className="p-send-date">{send.date}</h2>
          <p className="p-send-time">{send.time}</p>

          <ul className="p-send-facts">
            <li><EnvelopeIcon className="ic" /><button className="p-link">{send.members}</button></li>
            <li><PersonPairIcon className="ic" />{send.track}</li>
            <li><CheckIcon className="ic" />{send.program}</li>
          </ul>

          <p className="p-send-meta">{send.createdBy}</p>
          <button className="p-ghost">{send.cancel}</button>
        </article>

        <article className="p-send quiet">
          <h2 className="p-promo-title">{promo.title}</h2>
          <p className="p-promo-body">{promo.body}</p>
          <button className="p-promo-link">{promo.link} <ArrowRight className="ic" /></button>
        </article>
      </div>

      <section className="p-pending">
        <h2 className="p-section">{pending.title}</h2>
        <p className="p-pending-blurb">
          {pending.blurbBefore}<strong>{pending.blurbBold}</strong>.
        </p>

        <FilterBar count={pending.total} unit={pending.unit} />

        <div className="p-table-wrap">
          <table className="p-table roomy">
            <thead>
              <tr>
                <th className="p-check-cell">
                  <Checkbox checked={sel.allOn} onChange={sel.toggleAll} label="Select all invitations" />
                </th>
                <HeadCells columns={pending.columns} />
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {pending.rows.map((r) => (
                <tr key={r.email} className={sel.isOn(r.email) ? 'on' : undefined}>
                  <td className="p-check-cell">
                    <Checkbox
                      checked={sel.isOn(r.email)}
                      onChange={() => sel.toggle(r.email)}
                      label={`Select ${r.email}`}
                    />
                  </td>
                  <td>
                    <div className="p-who">
                      <span
                        className="p-avatar"
                        style={{
                          background: `radial-gradient(circle at 68% 30%, ${r.avatar[1]}, ${r.avatar[0]} 70%)`,
                        }}
                      />
                      {r.email}
                    </div>
                  </td>
                  <td>{r.track}</td>
                  <td>{r.access}</td>
                  <td>{r.sent}</td>
                  <td className="p-row-actions">
                    <button className="p-icon-ghost" aria-label={`Cancel invitation for ${r.email}`}>
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="p-table-foot">{pending.total} {pending.unit}</p>
        </div>
      </section>
    </>
  )
}
