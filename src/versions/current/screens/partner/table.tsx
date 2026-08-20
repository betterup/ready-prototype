import { useState } from 'react'
import { partnerTable, type PartnerColumn } from '../../../../data'
import { CaretUp, FilterIcon, InfoIcon, SearchIcon, SortIcon } from '../../../../icons'

/** The chrome both admin tables share: the filter/count/search row above the
 *  table, the header cells, and the row checkboxes. Members and Scheduled
 *  invitations differ only in their columns and cells. */

export function FilterBar({ count, unit = 'members' }: { count: string | number; unit?: string }) {
  return (
    <div className="p-filters">
      <button className="p-filter-btn">
        <FilterIcon />
        {partnerTable.filterLabel}
      </button>
      <span className="p-filter-count">{count} {unit}</span>
      <span className="spacer" />
      <label className="p-search">
        <SearchIcon />
        <input placeholder={partnerTable.searchPlaceholder} />
      </label>
    </div>
  )
}

/** Header cells. The sorted column shows the filled caret; sortable-but-idle
 *  columns show the stacked chevrons, exactly as the reference does. */
export function HeadCells({ columns }: { columns: PartnerColumn[] }) {
  return (
    <>
      {columns.map((c) => (
        <th key={c.label}>
          <button className="p-th">
            {c.label}
            {c.sorted && <CaretUp className="ic sorted" />}
            {c.sortable && <SortIcon className="ic" />}
            {c.info && <InfoIcon className="ic" />}
          </button>
        </th>
      ))}
    </>
  )
}

export function Checkbox({ checked, onChange, label }: {
  checked: boolean
  onChange: () => void
  label: string
}) {
  return (
    <input className="p-check" type="checkbox" aria-label={label} checked={checked} onChange={onChange} />
  )
}

/** Row selection with a header box that reflects all / none. */
export function useSelection(keys: string[]) {
  const [selected, setSelected] = useState<string[]>([])
  const allOn = keys.length > 0 && selected.length === keys.length

  return {
    selected,
    allOn,
    isOn: (k: string) => selected.includes(k),
    toggle: (k: string) =>
      setSelected((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k])),
    toggleAll: () => setSelected(allOn ? [] : keys),
  }
}
