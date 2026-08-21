/** Mock content for the prototype. Values transcribed from the screenshots
 *  so the shell can be swapped onto real APIs later without layout churn. */

export const member = {
  firstName: 'Doran',
}

export type Strength = {
  name: string
  score: number
  desc: string
  /** two-point sparkline, matching the Jul → Jul mini charts */
  series: [number, number]
}

export const strengths: Strength[] = [
  {
    name: 'Recovery',
    score: 100,
    series: [100, 100],
    desc: "Recovery is the practice of consciously balancing one's physical, emotional, and mental exertion with deliberate rest.",
  },
  {
    name: 'Focus',
    score: 93,
    series: [93, 93],
    desc: 'Focus is the extent to which we are able to cultivate a state of deep concentration on a single task.',
  },
  {
    name: 'Cognitive Agility',
    score: 92,
    series: [92, 92],
    desc: 'Cognitive agility is the extent to which we can quickly adapt and adjust our thinking to new information.',
  },
  {
    name: 'Emotional Regulation',
    score: 91,
    series: [91, 91],
    desc: 'Emotional regulation is the extent to which we can quickly adapt, control, and recover from strong emotions.',
  },
  {
    name: 'Decision-making',
    score: 89,
    series: [89, 89],
    desc: 'Decision-making refers to the process of evaluating and choosing among alternatives with clear judgment.',
  },
  {
    name: 'Coaching',
    score: 89,
    series: [89, 89],
    desc: "Coaching is the extent to which we actively engage with team members' development and growth.",
  },
  {
    name: 'Problem Solving',
    score: 88,
    series: [88, 88],
    desc: 'Problem solving is characterized by embracing contradictions and working through them systematically.',
  },
  {
    name: 'Growth Mindset',
    score: 87,
    series: [87, 87],
    desc: 'Growth mindset is the extent to which we desire to learn and grow through new and difficult challenges.',
  },
]

export const growthAreas: Strength[] = [
  {
    name: 'Delegation',
    score: 54,
    series: [49, 54],
    desc: 'Delegation is the extent to which we entrust meaningful work to others and resist doing it ourselves.',
  },
  {
    name: 'Setting Boundaries',
    score: 58,
    series: [62, 58],
    desc: 'Setting boundaries is the practice of protecting the time and energy your priorities actually require.',
  },
  {
    name: 'Strategic Planning',
    score: 61,
    series: [55, 61],
    desc: 'Strategic planning is the extent to which we translate long-range intent into sequenced, concrete steps.',
  },
  {
    name: 'Influence',
    score: 64,
    series: [60, 64],
    desc: 'Influence is the extent to which we build alignment and move decisions without relying on authority.',
  },
  {
    name: 'Feedback',
    score: 66,
    series: [66, 66],
    desc: 'Feedback is the extent to which we seek, receive, and act on input about our own performance.',
  },
  {
    name: 'Physical Activity',
    score: 68,
    series: [72, 68],
    desc: 'Physical activity is the extent to which regular movement is built into the rhythm of your week.',
  },
  {
    name: 'Self-Compassion',
    score: 71,
    series: [67, 71],
    desc: 'Self-compassion is the extent to which we treat our own setbacks with the kindness we extend to others.',
  },
  {
    name: 'Purpose',
    score: 74,
    series: [70, 74],
    desc: 'Purpose is the extent to which daily work connects to something you find personally meaningful.',
  },
]

/** Well-being check-ins. x = month position on a Feb→Aug axis, y = score. */
export const wellbeing = {
  lastCheckIn: 'July 15, 2026',
  points: [
    { date: '02/13', x: 0.42, y: 80 },
    { date: '02/20', x: 0.64, y: 97 },
    { date: '02/24', x: 0.76, y: 84 },
    { date: '07/15', x: 5.42, y: 100 },
  ],
  breakdown: [
    { label: 'Mood', delta: 0, score: 20 },
    { label: 'Engagement', delta: 0, score: 20 },
    { label: 'Vigor', delta: 0, score: 20 },
    { label: 'Rest', delta: 0, score: 20 },
    { label: 'Calm', delta: 0, score: 20 },
  ],
}

export const coach = {
  name: 'Maria DH Lee',
  practice: 'Ready Coaching',
  sessions: 'No sessions',
}

export const specialistTracks = [
  { title: 'Working Parents Coaching', emoji: '🧸', bg: '#fde8d9' },
  { title: 'Well-Being Habits', emoji: '🥤', bg: '#fdf0d6' },
  { title: 'Navigating Grief', emoji: '💗', bg: '#fbe0ea' },
]

export const aiSessions = [
  { title: 'Welcome back, Doran', emoji: '👋' },
  { title: 'Acknowledging Incomplete Exercise' },
  { title: 'Preparing for Mid Year Review' },
  { title: 'Role Play', dim: true },
]

export const aiExperiences = [
  { title: 'Role play practice', grad: 'linear-gradient(140deg,#3ee0c0,#1f8fd8 70%)' },
  { title: 'Core values exercise', grad: 'linear-gradient(140deg,#4f7bf0,#c23ce0 75%)' },
  { title: 'Gratitude practice', grad: 'linear-gradient(140deg,#f04ba8,#7b3ce0 75%)' },
  { title: 'Scenario simulator', grad: 'linear-gradient(140deg,#f0679b,#8a6ae8 72%)' },
]

export const quickOptions = [
  'I want to improve my communication',
  "I'm working on work-life balance",
  'I need help with collaboration',
]

/** Concept-only: a coach-authored role play recommendation, surfaced on Home.
 *  Ties to `coach` above — the recommender is the member's own coach. */
export const roleplayRec = {
  eyebrow: 'AI Coaching',
  title: 'Practice your performance review conversation',
  recommender: 'Maria',
  quote:
    "This role play was designed to help you practice saying the thing you've been avoiding: what do I need to get promoted?",
  cta: 'Role Play',
}

export const focusAreas = [
  { title: 'Productivity and Planning', emoji: '⏱️', bg: '#fdefdb' },
  { title: 'Connection and Support', emoji: '🗣️', bg: '#e0f0e4' },
  { title: 'Purpose and Impact', emoji: '🔭', bg: '#fdeedb' },
  { title: 'Career Planning', emoji: '🚪', bg: '#efe2fb' },
  { title: 'Emotional Well-Being', emoji: '💗', bg: '#fbe0ea' },
  { title: 'Physical Vitality', emoji: '🏃', bg: '#f3e2fb' },
  { title: 'Leading Others', emoji: '🧭', bg: '#e2ecfb' },
]

export const articles = [
  {
    title: 'Symptoms of Misalignment',
    mins: 10,
    desc: 'Symptoms of misalignment include indecisiveness, ineffective communication, lack of direction, and stalled decisions.',
    hero: 'linear-gradient(150deg,#0f4c6e,#1c7fa8 55%,#8ecfe6)',
  },
  {
    title: 'Seven Types of Rest',
    mins: 5,
    desc: 'Rest is crucial for wellbeing, involving various forms that support different aspects of our health.',
    hero: 'linear-gradient(150deg,#12b58a,#8fd9c0 45%,#d8c4a8)',
  },
  {
    title: 'Getting Great Sleep',
    mins: 7,
    desc: 'Research shows that sufficient sleep improves mental health, reducing depression and anxiety, and sharpens focus.',
    hero: 'linear-gradient(150deg,#0a2a4a,#12a887 60%,#4fe0c0)',
  },
]

/** Partner/admin left rail. Icons are mapped in PartnerRoot — this is just
 *  the tree. `to` marks the destinations that have a screen. */
type PartnerNavGroup = { label?: string; items: string[] }
type PartnerNavEntry = { id: string; label: string; to?: 'home'; groups?: PartnerNavGroup[] }

export const partnerNav: PartnerNavEntry[] = [
  { id: 'home', label: 'Home', to: 'home' as const },
  {
    id: 'analytics',
    label: 'Analytics',
    groups: [
      {
        label: 'Platform analytics',
        items: ['Activation & Onboarding', 'Platform Usage', 'Business Impact', 'Talent Capabilities', 'Competencies'],
      },
      { label: 'Product analytics', items: ['Lead Insights Snapshot'] },
    ],
  },
  {
    id: 'admin',
    label: 'Admin',
    groups: [
      { items: ['Members', 'Invite members', 'Scheduled invitations', 'Employees', 'Waitlist'] },
    ],
  },
]

/** Partner home. "Actions & announcements" is cut off in the reference, so it
 *  isn't built yet. */
export const partnerHome = {
  greeting: 'Welcome back, Howden Demo - Test.Partner',
  sectionTitle: 'Reporting insights for you',
  cards: [
    {
      title: 'Your Lead Insights Snapshot is coming soon',
      body: "As your team starts using Lead coaching, you'll see how BetterUp drives results for key outcomes at your organization.",
      hero: 'linear-gradient(92deg, #d59aa7 0%, #d7a99b 45%, #dfc28c 100%)',
    },
    {
      title: '0% of activated members have engaged with BetterUp in the last 30 days',
      ring: 0,
      link: 'View all usage',
      hero: 'linear-gradient(200deg, #2a5fe8 0%, #4f9bf2 48%, #c9b6e8 100%)',
    },
    {
      title: 'Stay tuned for your business impact report',
      body: "When enough data is available, you'll see how BetterUp drives productivity, retention, and resilience at your organization.",
      hero: 'linear-gradient(120deg, #a3bab2 0%, #94aaa6 100%)',
    },
  ],
}

/** Partner/admin experience: the Invite to BetterUp flow. */
export const inviteFlow = {
  eyebrow: 'Admin',
  title: 'Invite to BetterUp',
  emailsLabel: 'Add a list of emails separated by commas, spaces, or line breaks',
  emailsPlaceholder: 'member1@yourcompany.com  member2@yourcompany.com...',
  steps: [
    { n: 1, title: 'Add members' },
    { n: 2, title: 'Select a program' },
    { n: 3, title: 'Select subscriptions' },
    { n: 4, title: 'Review invitation' },
  ],
}

/** The CONCEPT rail: the current tree plus Upgrade members, which only exists
 *  on the next side. Derived from `partnerNav` rather than copied, so anything
 *  added to the shared rail still shows up on the concept. */
export const partnerNavNext: typeof partnerNav = partnerNav.map((entry) =>
  entry.id !== 'admin' ? entry : {
    ...entry,
    groups: entry.groups!.map((g) => ({
      ...g,
      items: g.items.flatMap((i) => (i === 'Invite members' ? [i, 'Upgrade members'] : [i])),
    })),
  },
)

/** Shared by the three groupings BetterUp derives from HRIS data. */
const HRIS_TIP =
  'BetterUp uses HRIS data to identify members in this group. Employees experiencing change are more likely to benefit from concentrated coaching.'

/** Concept-only. The Upgrade members screen is a three-step nudge composer:
 *  pick the audiences, write the message, review and send. */
export const upgradeFlow = {
  eyebrow: 'Admin',
  title: 'Upgrade members',
  steps: [
    { n: 1, title: 'Select your audience' },
    { n: 2, title: 'Write your message' },
    { n: 3, title: 'Review and send' },
  ],
  audience: {
    /** Accessible name for the dropdown; not rendered — the step header and
     *  the helper line already say it. */
    label: 'Audience',
    help: 'Select all the audiences that apply',
    placeholder: 'Select audiences',
    /** `ai` marks a grouping BetterUp generated rather than one the partner
     *  built from employee attributes; the sparkle is what tells the two apart,
     *  and `tip` explains what the generation looked at. `count` is the size
     *  BetterUp resolved the grouping to — the static segments carry no count,
     *  since those resolve against the partner's own filters. Generated
     *  groupings lead the list — they're the point of this screen, not a
     *  footnote under the static segments. */
    options: [
      {
        label: 'Most Likely to Benefit from Coaching',
        ai: true,
        count: 218,
        tip: 'BetterUp looks at Grow usage to identify engaged members that demonstrate readiness for human coaching.',
      },
      { label: 'Recently hired', ai: true, count: 143, tip: HRIS_TIP },
      { label: 'Recently promoted ICs', ai: true, count: 87, tip: HRIS_TIP },
      { label: 'Impacted by org change', ai: true, count: 312, tip: HRIS_TIP },
      { label: 'Finance' },
      { label: 'Marketing' },
      { label: 'Product' },
      { label: 'Engineering' },
      { label: 'Levels I - III' },
      { label: 'Grow 2026 ICs Track' },
      { label: 'Grow 2026 Managers Track' },
    ],
    preview: 'Preview members',
  },
  compose: {
    subjectLabel: 'Subject',
    subjectMax: 200,
    messageLabel: 'Message',
    messageMax: 3000,
    fromTemplate: 'Start from a template',
    saveTemplate: 'Save as template',
    tokenLabel: 'Use these to personalize your message to each member:',
    tokens: ['First name', 'Program name', 'Coach name', 'Next step'],
    channelLabel: 'Send via',
    channels: [
      { id: 'email', label: 'Email', desc: 'Sent by BetterUp, from you. Replies go to you.' },
      /** Not connected in this org — greyed out, same as the reference. */
      { id: 'slack', label: 'Slack', desc: 'Sent by the BetterUp app in your Slack workspace.', off: true },
      { id: 'teams', label: 'Microsoft Teams', desc: 'Sent by the BetterUp app in your Teams workspace.' },
      { id: 'text', label: 'Text', desc: "Members without a phone number won't receive the nudge." },
    ],
    preview: 'Preview nudge',
  },
  review: {
    audienceNote: 'Members who match these audiences when the nudge sends.',
    whenLabel: 'When to send',
    timing: [
      { id: 'now', label: 'Send now', desc: 'Sends immediately' },
      { id: 'later', label: 'Schedule for later', desc: 'Pick a date and time' },
    ],
    note: 'Members\u2019 notification preferences for the selected channel will be respected.',
    submit: 'Send nudge',
  },
}

export type PartnerColumn = {
  label: string
  /** Renders the info affordance the reference shows on explained columns. */
  info?: boolean
  sortable?: boolean
  /** The column the table is currently sorted by — gets the filled caret. */
  sorted?: boolean
}

export type PartnerMemberRow = {
  name: string
  role: string
  email: string
  program: string
  status: string
  engaged: string
  sessions: number
  next: string
  ends: string
  access: string
}

/** Admin > Members. The first four rows are the reference screen verbatim; the
 *  rest continue the alphabetical page so Status and Next session have live
 *  values to show, which an all-`Ended` page never would. */
export const partnerMembers = {
  eyebrow: 'Admin',
  title: 'Members',
  blurb:
    'Everyone enrolled in a BetterUp program that you manage, past and present. Use this list to track and drive engagement.',
  updated: 'Data last updated Aug 20, 2026 4:15 PM',
  total: '2,065',
  columns: [
    { label: 'Name', sorted: true },
    { label: 'Program', info: true },
    { label: 'Status', info: true },
    { label: 'Last engaged', info: true, sortable: true },
    { label: 'Sessions', info: true, sortable: true },
    { label: 'Next session', info: true, sortable: true },
    { label: 'End date', info: true, sortable: true },
    { label: 'Product access' },
  ] as PartnerColumn[],
  rows: [
    { name: 'Aaron Burcham', role: 'Senior Technical Program Manager', email: 'aaron@aaronburcham.com', program: 'BetterUp - Employee - Lead', status: 'Ended', engaged: '05/05/2026', sessions: 14, next: '—', ends: '06/15/2026', access: 'BetterUp Employee Access' },
    { name: 'Aaron Ervin', role: 'Sr. Enterprise Account Executive', email: 'aaron.ervin@betterup.co', program: 'BetterUp - Employee - Lead', status: 'Ended', engaged: '01/06/2022', sessions: 17, next: '—', ends: '02/15/2022', access: '—' },
    { name: 'Aaron Falls', role: 'iOS Engineer', email: 'aaron.falls@betterup.co', program: 'BetterUp - Employee - Lead', status: 'Ended', engaged: '05/12/2021', sessions: 8, next: '—', ends: '02/15/2022', access: '—' },
    { name: 'Aaron Scales', role: 'Principal Product Manager', email: 'maxwell.scales@gmail.com', program: 'BetterUp - Employee - Lead', status: 'Ended', engaged: '02/20/2026', sessions: 17, next: '—', ends: '02/24/2026', access: 'BetterUp Employee Access' },
    { name: 'Abigail Nwosu', role: 'Director of Customer Success', email: 'abigail.nwosu@howdendemo.com', program: 'BetterUp - Employee - Ready', status: 'Active', engaged: '08/19/2026', sessions: 6, next: '08/24/2026', ends: '12/31/2026', access: 'BetterUp Employee Access' },
    { name: 'Adaora Eze', role: 'Regional Operations Manager', email: 'adaora.eze@howdendemo.com', program: 'BetterUp - Employee - Ready', status: 'Not started', engaged: '—', sessions: 0, next: '—', ends: '12/31/2026', access: 'BetterUp Employee Access' },
    { name: 'Adam Reinholt', role: 'Staff Data Scientist', email: 'adam.reinholt@howdendemo.com', program: 'BetterUp - Employee - Lead', status: 'Active', engaged: '08/18/2026', sessions: 11, next: '08/26/2026', ends: '12/31/2026', access: 'BetterUp Employee Access' },
    { name: 'Adrian Kowalski', role: 'Senior Underwriter', email: 'adrian.kowalski@howdendemo.com', program: 'BetterUp - Employee - Ready', status: 'Active', engaged: '08/15/2026', sessions: 3, next: '09/02/2026', ends: '12/31/2026', access: '—' },
  ] as PartnerMemberRow[],
}

/** Admin > Scheduled invitations. One pending send, matching the reference. */
export const scheduledInvitations = {
  eyebrow: 'Admin',
  title: 'Scheduled invitations',
  send: {
    date: 'Aug 21, 2026',
    time: '4:16 PM EDT',
    members: '1 member',
    track: 'Test PR link',
    program: 'BetterUp Grow\u2122 (AI Coach) from 8/20/2026 - 2/20/2027',
    createdBy: 'Created by Your BetterUp account team on Aug 20, 2026 at 4:17 PM EDT',
    cancel: 'Cancel send',
  },
  promo: {
    title: 'Ready to invite more members?',
    body: 'Plan the launch of your next program, or add members to start today.',
    link: 'Schedule invitations',
  },
  pending: {
    title: 'Pending access',
    /** Split so `Invite members` can render bold, as in the reference. */
    blurbBefore:
      'Take a moment to review your upcoming invitations. If you need to update any, select the employees and cancel their existing invites. You can then resend with updated details by clicking ',
    blurbBold: 'Invite members',
    unit: 'employee',
    total: 1,
    columns: [
      { label: 'Name', sorted: true },
      { label: 'Track', info: true },
      { label: 'Access' },
      { label: 'Send date', sortable: true },
    ] as PartnerColumn[],
    rows: [
      {
        email: 'rachel.cooper+820_2@betterup.co',
        track: 'Test PR link',
        access: 'BetterUp Grow\u2122 (AI Coach)',
        sent: '8/21/2026',
        avatar: ['#1d4ed8', '#60a5fa'] as [string, string],
      },
    ],
  },
}

/** Shared by both admin tables. */
export const partnerTable = {
  filterLabel: 'Filter by program or employee attributes',
  searchPlaceholder: 'Search by name or email',
}

/** Open slots the in-chat scheduler offers. Deliberately later than the
 *  Friday 21 session already on the Schedule screen. */
export const coachAvailability = {
  sessionLabel: `Ready coaching with ${coach.name}`,
  duration: '30 min',
  timezone: 'All times in EDT',
  days: [
    { id: '2026-08-24', weekday: 'Mon', day: 24, month: 'Aug', times: ['9:30 AM', '11:00 AM', '2:00 PM'] },
    { id: '2026-08-25', weekday: 'Tue', day: 25, month: 'Aug', times: ['8:45 AM', '1:15 PM', '4:30 PM'] },
    { id: '2026-08-26', weekday: 'Wed', day: 26, month: 'Aug', times: ['10:15 AM', '12:00 PM'] },
    { id: '2026-08-27', weekday: 'Thu', day: 27, month: 'Aug', times: ['9:00 AM', '11:30 AM', '3:15 PM'] },
  ],
}

/** Concept-only: remaining session allowance, shown under the Schedule header. */
export const scheduleAllowance = {
  remaining: 3,
  expires: '12/31/2026',
}

/** Upcoming schedule. `scheduleAvatars` (the nothing-scheduled empty state)
 *  was dropped when this populated state replaced it. */
export const schedule = {
  period: 'This month',
  timezone: 'All times in EDT',
  contactMethod: 'Zoom',
  sessions: [
    {
      day: 21,
      weekday: 'Friday',
      start: '1:15 PM',
      end: '1:45 PM',
      kind: 'Ready coaching',
      with: coach.name,
    },
  ],
}

/* ============================================================
   COACH EXPERIENCE
   Transcribed from the coach-side screenshots. Two deliberate departures from
   the reference: the coach is the prototype's own coach (`coach` above) rather
   than the QA account the screenshots were captured under, and member/list
   names are realistic rather than test fixtures, since this build gets shared.
   ============================================================ */

/** The coach viewing the shell. Same person the member sees in `coach`. */
export const coachSelf = {
  name: coach.name,
  firstName: 'Maria',
  /** Matches the member-side coach card, so it reads as the same person. */
  avatar: '👩🏼‍💼',
}

/** Partner tools the coach jumps out to. Home shows all four; You shows two. */
export const coachLinks = ['BetterUp University', 'MightyNetworks', 'Docebo', 'Wingspan']

export const coachHome = {
  nextSession: {
    badge: 'Coach assigns next step',
    kind: 'BetterUp Manage™ Coaching Session',
    duration: '30 min',
    title: 'Session with Vanessa Hagood',
    when: 'Begins next week',
    cta: 'View profile',
    hero: 'linear-gradient(155deg,#f6cfc4 0%,#f0a894 42%,#e8846a 100%)',
  },
  /** The day column beside it. `now` is the fraction through the visible range
   *  where the current-time marker sits. */
  day: {
    label: 'Thu, Aug 20',
    hours: ['11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'],
    now: 0.185,
  },
  checklist: [
    { title: 'Time to add more availability to your calendar', emoji: '🕰️', bg: '#e6ddfa' },
    { title: 'Complete session for Agustina Mazzeo', emoji: '🧑🏽‍💼', bg: '#d7e6fb' },
    { title: 'Complete session for Doran Whitfield', emoji: '🧑🏽‍💼', bg: '#d7e6fb' },
    { title: 'Complete session for Aaron Burcham', emoji: '🧑🏽‍💼', bg: '#d7e6fb' },
  ],
}

/** The 1:1 roster. `avatar` is the two-tone blob the table uses in place of a
 *  photo; `next`/`last`/`active` are pre-formatted, matching the reference. */
export type CoachMember = {
  name: string
  role: string
  company: string
  program?: string
  next: string
  last: string
  active: string
  modality: string
  avatar: [string, string]
  /** In the platform right now. Drives the presence dot and the `Active now`
   *  treatment, instead of the stale day-count everyone else shows. */
  online?: boolean
}

export const coachMembers: CoachMember[] = [
  { name: 'Doran Whitfield', role: 'Engineering Manager', company: 'Halcyon Health', program: 'Ready Coaching', next: 'Aug 21 at 1:15 PM', last: '—', active: 'Active now', modality: 'Ready', avatar: ['#f0a41c', '#f9cf68'], online: true },
  { name: 'Paolo Cappelli', role: 'Operations Lead', company: 'Northwind Retail', program: 'BetterUp Manage™', next: 'Mar 27 at 4:30 PM', last: '—', active: '512 days ago', modality: 'BetterUp Manage™', avatar: ['#f4611f', '#f9b03c'] },
  { name: 'Agustina Mazzeo', role: 'Software Engineer', company: 'Northwind Retail', program: 'BetterUp Manage™', next: 'Dec 16 at 11:45 AM', last: '—', active: '247 days ago', modality: 'BetterUp Manage™', avatar: ['#ef4b3c', '#f7857a'] },
  { name: 'Alex Ramirez', role: 'Guest Experience Manager', company: 'Northwind Retail', program: 'BetterUp Manage™', next: 'Jan 28 at 1:00 PM', last: '520 days ago', active: '204 days ago', modality: 'BetterUp Manage™', avatar: ['#ef5a2e', '#f79a6b'] },
  { name: 'Claire Beaumont', role: 'Software Engineer', company: 'Northwind Retail', program: 'BetterUp Manage™', next: 'Feb 3 at 1:45 PM', last: '—', active: '198 days ago', modality: 'BetterUp Manage™', avatar: ['#127a68', '#3fb59a'] },
  { name: 'Martin Osei', role: 'Claims Specialist', company: 'Meridian Assurance', program: 'Ready Coaching', next: 'Apr 28 at 8:15 AM', last: '—', active: '118 days ago', modality: 'Ready', avatar: ['#0f6f63', '#2f9e8c'] },
  { name: 'Van Pham', role: 'Developer', company: 'Lantern Software', next: 'Apr 30 at 3:30 PM', last: '—', active: '113 days ago', modality: 'Primary', avatar: ['#16607a', '#3d97ae'] },
  { name: 'Vanessa Hagood', role: 'Developer', company: 'Halcyon Health', program: 'BetterUp Manage™', next: 'May 7 at 2:30 PM', last: '—', active: '106 days ago', modality: 'BetterUp Manage™', avatar: ['#ee4f45', '#f79088'] },
  { name: 'Sophie Yuan', role: 'Software Engineering Intern', company: 'Halcyon Health', program: 'BetterUp Manage™', next: 'May 7 at 3:30 PM', last: '—', active: '106 days ago', modality: 'BetterUp Manage™', avatar: ['#f2a516', '#f8ce62'] },
  { name: 'Rafa Martino', role: 'Engineer', company: 'Halcyon Health', program: 'BetterUp Manage™', next: 'May 13 at 5:15 PM', last: '—', active: '106 days ago', modality: 'BetterUp Manage™', avatar: ['#12766b', '#3aa693' ] },
]

/** Header counts. The roster above is the visible page of a longer list, which
 *  is why the count exceeds its length — same as the reference. */
export const coachRoster = {
  total: 17,
  scopeFilter: 'All members',
  statusFilter: 'Current members',
  searchPlaceholder: 'Search by name or company',
  columns: ['Name', 'Next session', 'Last session', 'Last active', 'Modality'],
}

export const coachCircles = {
  filter: 'Current',
  emptyTitle: "You currently don't have any Coaching Circles or Workshops.",
}

/** Resources: the coach's own saved lists, then the shared library. */
export const coachLists = [
  { name: 'Delegation practice', count: 0 },
  { name: 'First 90 days', count: 0 },
  { name: 'Difficult conversations', count: 1 },
  { name: 'Career growth', count: 0 },
  { name: 'Meditation', count: 2 },
  { name: 'Leadership', count: 0 },
  { name: 'Action items', count: 2 },
  { name: 'Feedback prep', count: 1 },
  { name: 'Onboarding reads', count: 1 },
  { name: 'New list', count: 0 },
]

export const coachLibrary = {
  sort: 'Recently created',
  searchPlaceholder: 'Search resources',
  filters: [
    'Previously used', 'Time', 'Type', 'Language', 'Sub-dimensions',
    'Topics', 'Products', 'Organizations',
  ],
  cards: [
    {
      title: 'Writing My SFD',
      kind: 'Reflection',
      meta: '1 min reflect',
      hero: 'linear-gradient(120deg,#f2a3c4 0%,#f3ab7e 55%,#ef8a3c 100%)',
    },
    {
      title: 'The 5Cs',
      kind: 'Reflection',
      meta: '1 min reflect',
      hero: 'linear-gradient(100deg,#f6d211 0%,#fbe45e 40%,#e8bd06 100%)',
    },
    {
      title: 'Continue with your BetterUp AI Coach',
      kind: 'AI Experience',
      meta: '1 min AI Experience',
      hero: 'linear-gradient(150deg,#fbd93a 0%,#f7cf2a 45%,#e9c022 100%)',
    },
    {
      title: 'Naming what you want next',
      kind: 'AI Experience',
      meta: '1 min AI Experience',
      hero: 'linear-gradient(150deg,#2b0b12 0%,#8f1420 45%,#e0473a 100%)',
    },
  ],
}

/** The You / insights screen. Every metric is at its zero state, matching a
 *  coach who hasn't accumulated survey data yet. */
export const coachInsights = {
  greeting: `${coachSelf.firstName}, you're just beginning your coaching journey! We can't wait to see the impact you have.`,
  mpi: {
    title: 'Member Progress Index',
    link: 'Learn more about MPI',
    emptyTitle: 'Not enough data',
    emptyBody:
      "We don't have enough data on Member Progress to show you at this time. When enough Members complete the post-session survey, we'll show the results here.",
  },
  attendance: {
    title: 'Session Attendance & Punctuality',
    body:
      'Maintaining strong Session Attendance & Punctuality trends is foundational to what it means to deliver a great Coach experience. We want to enable all of our community with data and insights on their activity over time. The below metrics measure how often a Coach no shows, late cancels, or is tardy to their sessions. These metrics are inclusive of all 1:1 Coaching sessions and are updated on the first of every month.',
    link: 'Learn more about Session Attendance and Punctuality',
    stats: [
      { label: 'Total occurrence rate', value: '0.0%' },
      { label: 'Coach late cancel rate', value: '0.0%' },
      { label: 'Coach tardiness rate', value: '0.0%' },
      { label: 'Coach no show rate', value: '0.0%' },
    ],
  },
}

export const coachReplay = {
  recapTitle: 'Week recap',
  recapEmpty: 'No week recap available',
  listTitle: 'Recent Replays',
  filters: ['All time', 'All members', 'All session types'],
  empty: 'No more replays available',
}

/* ---------- coach → member detail ----------
   The drill-down from the 1:1 roster. Doran is the same person the member
   experience is built around, so the numbers here are pulled from `strengths`,
   `growthAreas`, `wellbeing` and `schedule` rather than invented — the coach's
   view of Doran and Doran's view of herself have to agree.
   The reference captures were of a QA account with an unfilled program doc;
   Doran's is written out, since a blank template reads as a bug in a demo. */

export const MEMBER_TABS = [
  'Summary', 'Sessions', 'Activities', 'Member Insights', 'Assessments',
  'Messages', 'Notes', 'Programs', 'Goals',
] as const

export type MemberTab = (typeof MEMBER_TABS)[number]

/** Whole Person bands. Thresholds read off the reference: 71 was a strength,
 *  56/55/44 emerging, 38/25 a growth area. */
export const band = (score: number) =>
  score >= 70 ? 'Strength' : score >= 40 ? 'Emerging strength' : 'Growth area'

export const memberDetail = {
  name: `${member.firstName} Whitfield`,
  firstName: member.firstName,
  role: 'Engineering Manager',
  company: 'Halcyon Health',
  timezone: 'San Francisco',
  language: 'English',
  ai: 'AI Enabled',
  /** In the platform right now — same state the roster shows her in. */
  online: true,
  lastActive: 'Active now',
  avatar: ['#f0a41c', '#f9cf68'] as [string, string],
  programName: 'Halcyon Leaders Track',
  coachingType: 'Ready coaching',
  coachingCloud: 'Professional',
  finalSessionBefore: 'Apr 2, 2030',
  startDate: 'Feb 9, 2026',

  /** Mirrors `schedule` — the Friday 21 session the member sees on their side. */
  sessions: {
    completedAll: 0,
    completedWithYou: 0,
    month: 'August 2026',
    timezone: 'All times in EDT',
    upcoming: [
      { day: 21, weekday: 'Friday', time: '1:15 PM - 1:45 PM', label: 'Session 1' },
    ],
  },

  /** Derived from `wellbeing`: last check-in July 15, score 100. */
  readings: {
    mood: 'No mood logged',
    who5: 'High',
    who5Updated: 'Updated 1 month ago',
  },
  assessments: [
    { name: 'Whole Person Report', completed: 'Feb 14, 2026' },
    { name: 'WHO 5', completed: 'Jul 15, 2026' },
  ],

  /** Three from `strengths`, three from `growthAreas`, so the coach sees the
   *  same profile the member does on their Insights screen. */
  insights: {
    title: 'You as a whole person',
    intro:
      "This report, built on BetterUp's Whole Person™ model, highlights your strengths and growth areas, empowering you to thrive personally and inspire professionally.",
    asOf: 'Jul 26',
    picks: ['Recovery', 'Focus', 'Emotional Regulation', 'Purpose', 'Influence', 'Delegation'],
  },

  /** Written program doc, replacing the reference's unfilled template. */
  program: {
    madeFor: 'Halcyon Health',
    name: 'Halcyon Leaders Track',
    sections: [
      {
        heading: 'Coaching Program',
        bullets: [
          'Twelve 1:1 Ready Coaching sessions over six months, scheduled at the member’s pace.',
          'Unlimited access to the AI coach between sessions, including role play and reflection exercises.',
          'A Whole Person™ assessment at intake, at the midpoint, and at close.',
          'Specialist coaching on request — working parents, well-being habits, and navigating grief.',
        ],
      },
      {
        heading: 'Program Success',
        bullets: [
          'Halcyon is promoting engineers into management faster than it can develop them, and wants first-time managers steady inside two quarters.',
          'Retention in the engineering org is the board-level metric this program is measured against.',
        ],
      },
      {
        heading: 'What to know going in',
        bullets: [
          'Members are mid-level engineering managers, most in their first management role.',
          'Delegation and boundary-setting are the two themes that come up across the cohort.',
        ],
      },
    ],
  },

  goals: { goals: [], actions: [] },

  /** One inbound message, sent this morning — which is why she reads as active
   *  now. Her assessment debrief, so the numbers quoted are the same ones on
   *  her Member Insights tab. Blank lines separate blocks; the reference renders
   *  every block at body weight, headings included. */
  messages: [
    {
      from: 'member' as const,
      at: '08/20/2026 at 11:42 am',
      body: [
        "I just finished my Whole Person debrief — here's my profile summary: The Reliable One Who Can't Hand It Over",
        'Who You Are as a Leader',
        'Recovery and focus are the two things you never let slip. A perfect recovery score and focus at 93 say you protect your own capacity and cut through noise. Under real pressure you stay level, and emotional regulation at 91 backs that up. People read you as steady, and they are right to.',
        'Potential Pitfalls',
        'The strain shows up in what you hand off. Delegation sits at 54 and setting boundaries at 58 — the two lowest scores in your profile. You absorb work rather than distribute it, which protects the quality of what ships and quietly stops your team from stretching. It also means the case you are building for promotion is made almost entirely of work only you can point to.',
        'Your Growth Opportunities',
        'Turn the discipline you already apply to your own recovery outward — onto what you let other people own.',
        'What You Want to Focus On',
        '🎯 Delegation: Give away one piece of work you are known for, before you feel ready to.\n🎯 Setting Boundaries: Name the limit out loud in the moment, instead of absorbing it and recovering from it later.',
        'Ways You Learn Best',
        '✍️ Reflection Activities\n🎧 Audio and Video Content',
      ],
    },
  ],
}

/** The composer and empty states on the member's Messages tab. */
export const memberMessaging = {
  emptyTitle: "It's a little quiet in here!",
  sendHint: 'Press CMD + ENTER to send',
  fileHint: 'Max file size is 50MB',
}
