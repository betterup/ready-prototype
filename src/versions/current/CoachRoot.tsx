import { GearIcon, HelpIcon } from '../../icons'
import AccountMenu from './AccountMenu'

/** The coach experience. No design yet — this is a landing place so the switch
 *  in the account menu has somewhere to go, and it carries the same account menu
 *  so you can always switch back out. Replace the body when the screens land. */
export default function CoachRoot({
  onSwitchExperience, onLogo,
}: {
  onSwitchExperience: (e: 'member' | 'partner' | 'coach') => void
  onLogo: () => void
}) {
  return (
    <div className="p-shell">
      <header className="p-topbar">
        <button className="p-logo" onClick={onLogo}>BetterUp</button>
        <span className="spacer" />
        <button className="p-icon-btn" aria-label="Settings"><GearIcon /></button>
        <button className="p-icon-btn" aria-label="Help"><HelpIcon /></button>
        <AccountMenu experience="coach" onSwitchExperience={onSwitchExperience} />
      </header>

      <div className="p-body">
        <main className="p-main solo">
          <p className="p-eyebrow">Coach</p>
          <h1 className="p-title serif">Coach experience</h1>
          <p className="p-todo">
            Not designed yet. The walkthrough lists two features for this persona — AI
            coaching summaries arriving from the member's AI sessions, and shared context
            between the human coach and the AI coach. Send the screens over and they go
            in here.
          </p>
        </main>
      </div>
    </div>
  )
}
