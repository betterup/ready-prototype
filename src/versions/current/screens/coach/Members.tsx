import { coachMembers, coachRoster, type CoachMember } from '../../../../data'
import { ArrowDownIcon, ArrowUpIcon, ChevronDown, InfoIcon, SearchIcon } from '../../../../icons'

/** The two-tone disc the roster uses in place of a member photo. `online` adds
 *  the presence dot, so "active now" reads at a glance and not just in the
 *  Last active column. */
export function MemberBlob({ colors, size = 44, online }: {
  colors: [string, string]
  size?: number
  online?: boolean
}) {
  return (
    <span className="c-blob-wrap" style={{ width: size, height: size }}>
      <span
        className="c-blob"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 68% 30%, ${colors[1]}, ${colors[0]} 70%)`,
        }}
      />
      {online && <span className="c-presence" aria-label="Active now" />}
    </span>
  )
}

/** `Next session` is the sorted column in the reference, so it alone gets the
 *  ascending arrow — the rest show the idle descending affordance. */
const SORTED = 'Next session'

export default function Members({ onOpenMember }: { onOpenMember: (m: CoachMember) => void }) {
  return (
    <div className="c-page">
      <header className="c-filters">
        <button className="c-select">{coachRoster.scopeFilter} <ChevronDown /></button>
        <button className="c-select">{coachRoster.statusFilter} <ChevronDown /></button>
        <strong className="c-count">{coachRoster.total} members</strong>
        <span className="spacer" />
        <label className="c-search">
          <SearchIcon />
          <input placeholder={coachRoster.searchPlaceholder} />
        </label>
      </header>

      <div className="c-table-wrap">
        <table className="c-table">
          <thead>
            <tr>
              {coachRoster.columns.map((c) => (
                <th key={c}>
                  <button className="c-th">
                    {c}
                    {c === 'Last active' && <InfoIcon className="ic" />}
                    {c === SORTED ? <ArrowUpIcon className="ic" /> : <ArrowDownIcon className="ic" />}
                  </button>
                </th>
              ))}
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {coachMembers.map((m) => (
              <tr key={m.name}>
                <td>
                  <div className="c-who">
                    <MemberBlob colors={m.avatar} online={m.online} />
                    <div>
                      <button className="c-name" onClick={() => onOpenMember(m)}>{m.name}</button>
                      <p className="c-role">{m.role} at {m.company}</p>
                      {m.program && <p className="c-program">{m.program}</p>}
                    </div>
                  </div>
                </td>
                <td>{m.next}</td>
                <td className={m.last === '—' ? 'c-dim' : 'c-stale'}>{m.last}</td>
                <td className={m.online ? 'c-live' : 'c-stale'}>{m.active}</td>
                <td>{m.modality}</td>
                <td className="c-actions-cell">
                  <button className="c-quick">Quick actions <ChevronDown /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
