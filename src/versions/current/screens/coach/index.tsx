import type { CoachTab } from '../../../../nav'
import type { CoachMember } from '../../../../data'
import Home from './Home'
import Members from './Members'
import Circles from './Circles'
import Resources from './Resources'
import You from './You'
import Replay from './Replay'

/** Router for the coach shell. `1:1 Coaching` is the only tab with a
 *  drill-down, so the open-member handler is threaded through to it and the
 *  detail view is mounted by CoachRoot rather than here. */
export default function CoachScreen({ tab, onOpenMember }: {
  tab: CoachTab
  onOpenMember: (m: CoachMember) => void
}) {
  switch (tab) {
    case 'home': return <Home />
    case 'oneToOne': return <Members onOpenMember={onOpenMember} />
    case 'circles': return <Circles />
    case 'resources': return <Resources />
    case 'you': return <You />
    case 'replay': return <Replay />
    case 'ai': return (
      <div className="c-page">
        <p className="c-md-eyebrow">Coach</p>
        <h1 className="c-md-h1">AI Coaching</h1>
        <p className="c-todo">
          Not designed yet. This is where the walkthrough's two coach features land — AI
          coaching summaries arriving from the member's own AI sessions, and shared context
          between the human coach and the AI coach.
        </p>
      </div>
    )
    default: return null
  }
}
