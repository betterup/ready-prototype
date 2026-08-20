import type { Highlights, Message } from './types'

/* ------------------------------------------------------------------
   A scripted coach.

   Runs entirely in the browser: no API key, no network, nothing typed
   here ever leaves the page. That's what makes the prototype safe to
   share. It is not a language model — it recognises a theme, tracks
   where the conversation has got to, and reflects the member's own
   words back. Coaching conversations are patterned enough (reflect →
   open question → name the pattern → commit to a step) that this reads
   convincingly for a demo, but it will not hold up under probing.
   ------------------------------------------------------------------ */

type Topic = {
  id: string
  label: string
  match: RegExp
  open: string[]
  deepen: string[]
}

const TOPICS: Topic[] = [
  {
    id: 'feedback',
    label: 'Navigating feedback',
    match: /feedback|criticism|critical|review|told me|said i|calibration/i,
    open: [
      'Feedback can land a lot harder than the person giving it realises. Which part of it stayed with you?',
      'That kind of feedback is worth sitting with rather than rushing past. What did you make of it?',
    ],
    deepen: [
      'Setting aside whether it was fair — was any of it true?',
      'What would you want to be different the next time that conversation happens?',
    ],
  },
  {
    id: 'workload',
    label: 'Workload and capacity',
    match: /workload|too much|overwhelm|burn ?out|swamped|no time|stretched|capacity|drowning|exhaust/i,
    open: [
      'That sounds like a lot to be carrying. When you picture a normal week, where does most of it actually go?',
      "There's a difference between busy and overloaded. Which one does this feel like?",
    ],
    deepen: [
      'What on that list would nobody notice if you stopped doing it?',
      'Who else could be holding some of this, even imperfectly?',
    ],
  },
  {
    id: 'manager',
    label: 'Managing up',
    match: /\bmanager\b|my boss|skip.?level|my lead\b|leadership team|upward/i,
    open: [
      'Managing that relationship is real work in itself. What would you want from them that you are not getting?',
      'What do you think they would say the situation is, if I asked them?',
    ],
    deepen: [
      'What have you already tried saying to them directly?',
      'What makes that conversation feel risky to open?',
    ],
  },
  {
    id: 'promotion',
    label: 'Career progression',
    match: /promot|next level|raise|title|senior|career path|progress|advance/i,
    open: [
      'Worth being specific about this one. Do you know what the bar actually is, or are you guessing at it?',
      'What makes now the moment you want to move on this?',
    ],
    deepen: [
      'If someone else on your team got it instead, what reason would you expect to hear?',
      'Who already knows you want this?',
    ],
  },
  {
    id: 'conflict',
    label: 'Working through conflict',
    match: /conflict|disagree|tension|friction|argument|difficult (person|colleague|conversation)|pushback/i,
    open: [
      'Tension like that tends to cost more energy than the original issue. What is the disagreement actually about?',
      'What do you think they believe is at stake for them here?',
    ],
    deepen: [
      'What is the most generous reading of their position?',
      'What would you need in order to let this go?',
    ],
  },
  {
    id: 'confidence',
    label: 'Confidence',
    match: /confiden|imposter|self.?doubt|doubt myself|not good enough|second.?guess|out of my depth/i,
    open: [
      'That feeling is remarkably common at exactly the moment people are growing. When does it show up most?',
      'Where does that voice get loudest — before, during, or after?',
    ],
    deepen: [
      'What evidence would you accept that it is not true?',
      'What would you tell a colleague who said that about themselves?',
    ],
  },
  {
    id: 'balance',
    label: 'Work-life balance',
    match: /balance|boundar|weekend|evening|switch off|log off|personal life|family|home life|always on/i,
    open: [
      'Boundaries usually erode gradually rather than all at once. When did you notice it slipping?',
      'What is the thing outside work that has been getting the least of you?',
    ],
    deepen: [
      'What would you have to say no to for that to change?',
      'What are you afraid happens if you protect that time?',
    ],
  },
  {
    id: 'communication',
    label: 'Communication',
    match: /communicat|present|speak up|articulate|explain|my point across|get through to/i,
    open: [
      'Worth separating two things — is it what you want to say, or saying it in the moment?',
      'Where does it break down: the preparation, or the room?',
    ],
    deepen: [
      'What do you want people to walk away thinking?',
      'When has it gone well? What was different that time?',
    ],
  },
  {
    id: 'team',
    label: 'Leading the team',
    match: /\bteam\b|delegat|direct report|my reports|hiring|collaborat|manage people/i,
    open: [
      'What do you think the team would say they need from you right now?',
      'Which part of this is yours to solve, and which part are you picking up out of habit?',
    ],
    deepen: [
      'What would you have to trust someone else with to get your time back?',
      'What are you modelling for them without meaning to?',
    ],
  },
]

const GENERIC: Pick<Topic, 'open' | 'deepen'> = {
  open: [
    'Thanks for putting that into words. What makes it feel important to look at now?',
    'Say a little more about that — what does it look like on a normal day?',
  ],
  deepen: [
    'What have you already tried?',
    "What would 'better' actually look like here?",
  ],
}

/* ---------- reflective listening ---------- */

const SWAPS: [RegExp, string][] = [
  [/\bI am\b/gi, 'you are'], [/\bI'm\b/gi, "you're"], [/\bI\b/g, 'you'],
  [/\bmy\b/gi, 'your'], [/\bmine\b/gi, 'yours'], [/\bmyself\b/gi, 'yourself'],
  [/\bme\b/gi, 'you'], [/\bwe\b/gi, 'you and your team'], [/\bour\b/gi, 'your'],
  [/\bam\b/gi, 'are'], [/\bI've\b/gi, "you've"], [/\bI'd\b/gi, "you'd"],
]

/**
 * Turn a fragment of what the member said into something the coach can say
 * back. Only used on short fragments — pronoun swapping longer sentences
 * produces nonsense, so anything long falls back to a non-echoing phrasing.
 */
function reflect(text: string): string | null {
  const clause = text
    .split(/[.!?;]/)[0]
    .replace(/^(so|well|i mean|honestly|basically|and|but)\b[,\s]*/i, '')
    .trim()
  const words = clause.split(/\s+/)
  if (words.length < 3 || words.length > 13) return null

  let out = clause
  for (const [re, to] of SWAPS) out = out.replace(re, to)
  out = out.charAt(0).toLowerCase() + out.slice(1)
  return out.replace(/[,\s]+$/, '')
}

/* ---------- stages ---------- */

const pick = <T,>(arr: T[], seed: number): T => arr[Math.abs(seed) % arr.length]

const PATTERNS = [
  (t: string) => `Let me play something back. Every time we circle round to ${t}, the thing underneath it seems to be about what you can control. Does that match how it feels from the inside?`,
  (t: string) => `I notice you have described ${t} twice now in terms of other people's expectations. What would this look like if you set those aside?`,
  (t: string) => `There is a thread here. ${t} keeps coming back to the same tension. What do you make of that?`,
]

const ACTIONS = [
  'Let us make this concrete. What is one small thing you could do before the end of the week?',
  'If you did one thing in the next few days that would move this even slightly — what would it be?',
  'What is the smallest step that would still count as progress here?',
]

const COMMITS = [
  'That sounds like a real commitment rather than a comfortable one. What might get in the way, and how would you notice early?',
  'Good. Who will you tell, so it does not quietly slide?',
  'That is specific enough to actually happen. What would make it easier to follow through?',
]

const CONTINUES = [
  'What else is sitting underneath that?',
  'What would change if that were already resolved?',
  'What is the part of this you have not said out loud yet?',
  'And what does that cost you, week to week?',
]

/* ---------- public API ---------- */

export function detectTopic(text: string): Topic | null {
  return TOPICS.find((t) => t.match.test(text)) ?? null
}

/** Build the coach's next turn from the history and the newest message. */
export function scriptedReply(history: Message[], userText: string): string {
  const coachTurns = history.filter((m) => m.role === 'coach').length
  const stage = Math.max(0, coachTurns - 1) // the seeded greeting is turn 0
  const topic = detectTopic(userText) ?? detectTopic(history.map((m) => m.text).join(' '))
  const voice = topic ?? GENERIC
  const seed = userText.length + coachTurns
  const echo = reflect(userText)
  const label = topic ? topic.label.toLowerCase() : 'this'

  switch (stage) {
    case 0:
      return echo
        ? `So ${echo}. ${pick(voice.open, seed)}`
        : pick(voice.open, seed)
    case 1:
      return echo
        ? `That is worth staying with — ${echo}. ${pick(voice.deepen, seed)}`
        : pick(voice.deepen, seed)
    case 2:
      return pick(PATTERNS, seed)(label)
    case 3:
      return pick(ACTIONS, seed)
    case 4:
      return pick(COMMITS, seed)
    default:
      return echo
        ? `${echo.charAt(0).toUpperCase()}${echo.slice(1)}. ${pick(CONTINUES, seed)}`
        : pick(CONTINUES, seed)
  }
}

const GOAL_RE = /\b(?:i want to|i'd like to|i would like to|i need to|my goal is to|i'm trying to|i am trying to|i hope to)\s+(.{4,70}?)(?:[.!?,]|$)/i

/** Grow the highlights panel from the conversation as it goes. */
export function updateHighlights(prev: Highlights, userText: string, coachStage: number): Highlights {
  const next: Highlights = {
    challenges: [...prev.challenges],
    goals: [...prev.goals],
    actions: [...prev.actions],
  }

  // Cap at two. Long conversations brush against many topics ("my manager",
  // "meetings"), and listing every one turns the panel into noise rather than
  // insight. The themes detected first are the session's real subject.
  const topic = detectTopic(userText)
  if (topic && !next.challenges.includes(topic.label) && next.challenges.length < 2) {
    next.challenges.push(topic.label)
  }

  const goal = userText.match(GOAL_RE)?.[1]?.trim()
  if (goal) {
    const phrased = goal.charAt(0).toUpperCase() + goal.slice(1)
    if (!next.goals.includes(phrased)) next.goals.push(phrased)
  }

  // The coach asks for a step when coachStage is 4, so the member's answer
  // arrives on the turn after that — at 5, not 4.
  if (coachStage === 5) {
    const step = userText.split(/[.!?]/)[0].trim()
    const phrased = step.charAt(0).toUpperCase() + step.slice(1)
    if (step.split(/\s+/).length >= 2 && !next.actions.includes(phrased)) next.actions.push(phrased)
  }

  return next
}
