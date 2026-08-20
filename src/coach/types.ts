export type Role = 'coach' | 'you'

export type Message = {
  id: number
  role: Role
  text: string
  /** Renders an interactive card under the message, e.g. the booking picker. */
  widget?: 'scheduler'
  /** Small glyph before the text, for confirmation-style messages. */
  icon?: 'envelope'
}

/** What the Session highlights panel promises to surface. */
export type Highlights = {
  challenges: string[]
  goals: string[]
  actions: string[]
}

export const emptyHighlights = (): Highlights => ({ challenges: [], goals: [], actions: [] })
