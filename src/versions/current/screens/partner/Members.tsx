import { partnerMembers } from '../../../../data'
import { DownloadIcon } from '../../../../icons'
import { Checkbox, FilterBar, HeadCells, useSelection } from './table'

export default function Members({ onInvite }: { onInvite: () => void }) {
  const sel = useSelection(partnerMembers.rows.map((r) => r.email))

  return (
    <>
      <div className="p-head">
        <div className="p-head-text">
          <p className="p-eyebrow">{partnerMembers.eyebrow}</p>
          <h1 className="p-title serif tight">{partnerMembers.title}</h1>
          <p className="p-blurb">{partnerMembers.blurb}</p>
          <p className="p-updated">{partnerMembers.updated}</p>
        </div>
        <button className="p-invite" onClick={onInvite}>Invite</button>
      </div>

      <FilterBar count={partnerMembers.total} />

      <div className="p-table-wrap">
        <div className="p-table-tools">
          <button className="p-tool"><DownloadIcon className="ic" /> Generate CSV</button>
        </div>

        <table className="p-table">
          <thead>
            <tr>
              <th className="p-check-cell">
                <Checkbox checked={sel.allOn} onChange={sel.toggleAll} label="Select all members" />
              </th>
              <HeadCells columns={partnerMembers.columns} />
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {partnerMembers.rows.map((m) => (
              <tr key={m.email} className={sel.isOn(m.email) ? 'on' : undefined}>
                <td className="p-check-cell">
                  <Checkbox
                    checked={sel.isOn(m.email)}
                    onChange={() => sel.toggle(m.email)}
                    label={`Select ${m.name}`}
                  />
                </td>
                <td>
                  <button className="p-name">{m.name}</button>
                  <p className="p-sub">{m.role}</p>
                  <p className="p-sub">{m.email}</p>
                </td>
                <td>{m.program}</td>
                <td>{m.status}</td>
                <td>{m.engaged}</td>
                <td>{m.sessions}</td>
                <td>{m.next}</td>
                <td>{m.ends}</td>
                <td>{m.access}</td>
                <td />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
