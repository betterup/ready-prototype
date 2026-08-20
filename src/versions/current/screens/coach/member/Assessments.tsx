import type { MemberView } from './view'

export default function Assessments({ v }: { v: MemberView }) {
  const d = v.detail

  return (
    <div className="c-page">
      <h2 className="c-h2 serif-h">Latest Readings</h2>
      <div className="c-readings">
        <div className="c-reading">
          <p className="c-reading-label">Mood</p>
          <p className="c-reading-value">{d?.readings.mood ?? 'No mood logged'}</p>
        </div>
        <div className="c-reading">
          <p className="c-reading-label">WHO-5</p>
          <p className="c-reading-value">{d?.readings.who5 ?? 'Not taken'}</p>
          {d && <p className="c-subtle">{d.readings.who5Updated}</p>}
        </div>
        <span className="c-reading-art" aria-hidden="true" />
      </div>

      <h2 className="c-h2 serif-h">{v.firstName}'s assessments</h2>
      {d ? (
        <table className="c-table flat">
          <thead>
            <tr><th>Report name</th><th>Date completed</th><th aria-label="View" /></tr>
          </thead>
          <tbody>
            {d.assessments.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.completed}</td>
                <td className="c-actions-cell"><button className="c-underline">View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="c-replay-empty">No assessments completed yet</p>
      )}
    </div>
  )
}
