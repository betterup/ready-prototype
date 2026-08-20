import { updateHighlights } from './engine'
import { emptyHighlights, type Highlights, type Message } from './types'

/**
 * Authored opening conversations. These are written rather than generated: a
 * demo needs to land on the same beats every time. "Start a new session" clears
 * back to `freshGreeting`, where the live scripted engine takes over.
 */

export const freshGreeting =
  "Hello, and welcome! I'm ready to jump into your AI coaching session. Whether it's " +
  "communication, work-life balance, collaboration, or other topics, I'm here to help. " +
  "If you'd like, I can share detailed examples to guide our conversation. So, what's on your mind today?"

const withIds = (turns: Omit<Message, 'id'>[]): Message[] =>
  turns.map((m, i) => ({ ...m, id: i }))

/* ---------- current: a session in progress, ending at the booking picker ---------- */

const SCHEDULING: Omit<Message, 'id'>[] = [
  { role: 'coach', text: freshGreeting },
  { role: 'you', text: 'I keep going round in circles about whether to push for the promotion this cycle.' },
  {
    role: 'coach',
    text: 'So you keep going round in circles about whether to push for the promotion this cycle. ' +
      'Worth being specific about this one — do you know what the bar actually is, or are you guessing at it?',
  },
  { role: 'you', text: "Guessing, honestly. And I don't want to make the case badly and burn the opportunity." },
  {
    role: 'coach',
    text: 'That is a fair thing to protect. Getting the bar in writing is usually the difference between ' +
      'a pitch that lands and one that gets deferred — and that is a conversation, not a document.',
  },
  { role: 'you', text: "Can I book some time with Maria to talk it through properly? I'd rather do this with a real person." },
  {
    role: 'coach',
    text: 'Absolutely — this is exactly the kind of decision that lands better with a coach who knows your ' +
      "history. Maria has openings next week. Pick a time and I'll set it up.",
    widget: 'scheduler',
  },
]

export const schedulingThread = () => withIds(SCHEDULING)

/* ---------- concept: a session that reaches a realisation, then hands off ---------- */

const BREAKTHROUGH: Omit<Message, 'id'>[] = [
  { role: 'coach', text: freshGreeting },
  {
    role: 'you',
    text: "I've been putting off asking my manager what I actually need to do to get promoted. It's been three months.",
  },
  {
    role: 'coach',
    text: 'Three months is a long time to carry a question you could ask in ten minutes. What happens in your ' +
      'head when you picture opening that conversation?',
  },
  { role: 'you', text: "I assume he'll tell me I'm not ready. And then it's official." },
  {
    role: 'coach',
    text: "So while you don't ask, the possibility stays alive. Is that patience, or is it protection?",
  },
  { role: 'you', text: "...Protection. I'd rather not know than be told no." },
  {
    role: 'coach',
    text: 'Thank you for saying that plainly — most people circle it for a lot longer. Here is what I notice: ' +
      "you have described the risk as hearing “not ready”. But you have been living inside “not ready” for " +
      'three months already. You just have not had it confirmed. Which of those is actually worse?',
  },
  {
    role: 'you',
    text: 'Living in it is worse. Obviously. If he says it out loud then at least I know what to work on.',
  },
  {
    role: 'coach',
    text: 'That is the shift. The conversation stops being a verdict and becomes information. What would you ' +
      'want to walk away from it knowing?',
  },
  {
    role: 'you',
    text: 'The two or three specific things that would make it a yes next cycle. That is a much easier thing to ask for.',
  },
  {
    role: 'coach',
    text: 'It is — and it is a question a good manager will want to answer. We did great work here today. ' +
      'Would you like to share a summary with your human coach?',
  },
  { role: 'you', text: 'Yes please — Maria should see this.' },
  { role: 'coach', text: 'Summary sent.', icon: 'envelope' },
]

export const breakthroughThread = () => withIds(BREAKTHROUGH)

/**
 * Authored, unlike the scheduling session's replayed set. The value of that
 * conversation is the reframe the member arrives at, which pattern matching on
 * keywords cannot pull out — so these are written to match what a coach would
 * actually have captured.
 */
export const breakthroughHighlights = (): Highlights => ({
  challenges: ['Career progression', 'Self-advocacy'],
  goals: ['Ask for the specific bar for promotion next cycle'],
  actions: [
    'Book 30 minutes with my manager this week',
    'Share session summary with Maria DH Lee',
  ],
})

/**
 * Replay a thread through the live engine so the panel cannot drift out of step
 * with what the engine would actually have produced from these messages.
 */
export function replayHighlights(thread: Message[]): Highlights {
  let highlights = emptyHighlights()
  thread.forEach((m, i) => {
    if (m.role !== 'you') return
    const coachStage = thread.slice(0, i).filter((x) => x.role === 'coach').length
    highlights = updateHighlights(highlights, m.text, coachStage)
  })
  return highlights
}
