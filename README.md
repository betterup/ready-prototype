# BetterUp Ready — prototype

A before/after comparison of the BetterUp Ready member experience. Two full versions
render on top of each other and a draggable divider reveals one over the other, so on
any screen you can slide between today's design and where we're taking it.

```bash
cd ready && npm run dev
```

Runs at http://localhost:4190 (also registered as the `ready` config in
`.claude/launch.json`).

## Using the comparison

- **The divider starts at the far right**, so you open on the current version whole and
  drag left to reveal the concept.
- **Drag the handle** (or click it and use `←` / `→`, `Shift` for bigger steps,
  `Home` / `End` to slam either way). Double-click returns it to the far right.
- **Mode toolbar** at the bottom: `Current` / `Split` / `Concept`. Keys `1` `2` `3`.
  `[` and `]` nudge the divider from anywhere.
- **Both halves stay live.** Clicks land on whichever version is under the cursor, so
  you can navigate from either side — and the tab you're on is shared, so sliding always
  compares the same screen.

### How it works

Both versions render stacked in one CSS grid cell at **full width**, and the `current`
layer is clipped horizontally (`clip-path: inset(...)`). Clipping rather than resizing is
the whole trick — each side keeps laying out exactly as it would at full viewport width,
so you're comparing designs instead of comparing reflow. Clipped-away regions aren't
hit-tested, which is what keeps both sides clickable.

Two non-obvious details, both load-bearing:

- **Both panes set `isolation: isolate`.** `clip-path` already makes the current pane a
  stacking context, which scopes its sticky nav's `z-index` inside it. Without a matching
  stacking context on the other pane, *that* nav escapes to the root and paints above both
  halves — so the left side would show the wrong version's chrome the moment the two navs
  differ. Isolating both keeps paint order pure DOM order.
- **One document scrollbar moves both panes**, pixel-locked rather than
  percentage-locked, so the same element stays side-by-side across the seam even when the
  two versions end up different heights.
- **Matched rows are height-synced at runtime** (`useRowSync`). Each card's natural
  height depends on how its own copy wraps, so a hard-coded height only holds at one
  viewport width — Home's cards matched at 1440px and diverged by 21px at 1060px. The
  hook measures both sides at the current width and pins each pair to the taller. Add a
  selector to `SYNCED_ROWS` for anything else that must stay aligned across the seam.
- **Panes are opaque and at least `100vh` tall.** `.page` has no background of its own,
  so without this the pane underneath shows through — the concept side visibly bled into
  Current mode on short screens like Schedule.

## Table of contents (the walkthrough)

Click the **BetterUp logo** in any top bar and a presentation-grade table of contents
overlays the prototype: the concept's key points organised by persona (Member, Partner,
Coach), each tagged with its strategic pillar (Configurable / IC-Specific / Braid /
Scalable). Built features link straight to the concept screen where they live; unbuilt
ones are dimmed with a "not built yet" chip. "Back to prototype" (or any link) closes it.

**Process rule: every feature added to the concept gets an entry here.** The list lives
in `src/tocData.ts` — add the item under its persona, tag the pillar, and point `target`
at the tab. The TOC is harness chrome (like the mode bar), so it belongs to neither
version and overlays the comparison without unmounting it — chat state survives.

## Three experiences

The avatar menu switches between the **member**, **partner/admin**, and **coach**
products. The menu always offers the two you're *not* currently in — derived from the
current experience rather than hard-coded, so you can never get stranded in a shell you
can't leave. Both panes always show the same experience, so the comparison never ends up
straddling two different products.

The coach side has its own dark full-bleed nav (neither the member's light bar nor the
partner's floating one), seven top-level screens, and a nine-tab drill-down behind the
1:1 roster:

| Coach tab | State |
| --- | --- |
| **Home** | Greeting, partner-tool links, next-session card, the day's calendar column with a now-marker, and this week's checklist |
| **1:1 Coaching** | The roster — 17 members, sortable columns, quick actions. Every name opens the member detail |
| **Coaching Circles & Workshops** | Empty state |
| **Resources** | Saved lists on the left, the shared library on the right with filters and resource cards |
| **You** | Coaching impact, Member Progress Index (not enough data), and the four attendance/punctuality rates |
| **Replay** | Week recap and Recent Replays, both empty. The one coach screen with its own warm gradient canvas |
| **AI Coaching** | Not designed yet — where the walkthrough's two coach features land |

**The member detail** (`screens/coach/member/`) has all nine sub-tabs: Summary, Sessions,
Activities, Member Insights, Assessments, Messages, Notes, Programs, Goals. Every roster
row opens, but only **Doran** has a profile behind her — her numbers are read from
`strengths` / `growthAreas` / `wellbeing` / `schedule`, the same data the member
experience renders, so the coach's view of Doran and Doran's view of herself agree.
Everyone else falls back to empty states, which is what the reference captures showed.

The partner side has a dark floating top bar and a left rail that **starts collapsed** —
the admin screens are wide tables, so the rail earns its width only once you go looking
for it. Switching into the experience lands on Home, the same as the member side.

| Rail destination | State |
| --- | --- |
| **Home** | Welcome header + three reporting-insight cards (including the 0% engagement ring) |
| **Admin → Members** | The full roster table: select-all and per-row checkboxes, sorted-by-Name header, Generate CSV, Invite |
| **Admin → Invite members** | The 4-step Invite to BetterUp flow |
| **Admin → Scheduled invitations** | The pending send card with Cancel send, the invite-more promo, and the Pending access table |
| Everything else | Placeholder; those screens aren't designed yet |

Members and Scheduled invitations share their filter row, header cells, and checkbox
selection via `screens/partner/table.tsx` — the two differ only in columns and cells.
Both tables carry a `min-width` and scroll horizontally rather than crushing their
columns to fit a half-width comparison pane.

The first four Members rows are the reference screen verbatim; the rest continue the
alphabetical page so `Status` and `Next session` have live values to show, which an
all-`Ended` page never would.

The invite flow's step 1 is fully built: paste addresses, Continue enables once at least
one parses, and advancing unlocks step 2. Steps 2–4 are locked headers matching their
greyed-out state in the reference, since we don't have those designs.

The concept side reuses the current partner shell for now — same fallback idea as the
member screens, so it's one fork away from diverging.

## What's here

Six member screens behind the real top nav, all reachable by clicking:

| Screen | State shown |
| --- | --- |
| **Home** | Gradient canvas, greeting, three cards (Personal Concierge / Group Coaching / AI Coaching), bottom chat bar |
| **Insights** | Well-being journey chart with banded score ranges + score breakdown; "You as a whole person" Whole Person™ report |
| **Coaching** | Coaching team card, Goals/Actions empty states, specialized support tracks |
| **AI Coaching** | Opens on a session already in progress. **Current:** member asks to see their human coach, and an interactive booking picker appears inline. **Concept:** a session that reaches a realisation, then offers to send a summary to the human coach |
| **Discover** | Resource search, focus-area carousel, recommended articles |
| **Schedule** | Upcoming schedule with a booked session — day/time, coach, and add-to-calendar / cancel / reschedule actions |

## Interactions that actually work

- Nav between all six screens from either half; "Start now" on Home jumps to AI Coaching
- Account dropdown on the avatar: click to open, dismiss via Escape, outside click, or
  item click; subtle grey backfill on hover
- **Switch between member / partner / coach experiences** from that dropdown, in both
  panes at once
- Partner rail: starts collapsed, expandable Analytics and Admin groups, working
  navigation between Home, Members, Invite members, and Scheduled invitations
- Admin tables: select-all and per-row checkboxes, row selection highlight, and an
  Invite button that drops you into the invite flow
- Insights: **Strengths / Growth Areas** toggle swaps the eight report cards
- Discover: focus-area carousel arrows, article bookmark toggle
- AI Coaching: **a real back-and-forth conversation** (see below), left panel collapse/expand,
  "Start a new session" resets the thread, session selection, Quick options send as messages

Everything else is presentational — buttons render but don't submit.

## The AI coach

Type into AI Coaching and it holds a conversation: it reflects your words back, asks
open questions, names a pattern after a few turns, then pushes for a concrete step. The
**Session highlights** panel fills in Challenges, Goals, and Action items as you go,
which is what that panel's copy always promised.

**It is not a language model.** It's a scripted engine in `src/coach/engine.ts` — topic
detection, conversation stages, and pronoun-swapped reflective listening. Coaching
conversations are patterned enough that this reads convincingly for a demo, but it won't
hold up under probing.

### Opening conversations

Both sides open mid-session rather than on an empty thread, so the screen demos without
anyone having to type. The threads are authored in `src/coach/seed.ts` — a demo needs to
hit the same beats every time — and they differ by design:

- **Current** ends on the member asking to book their human coach, with a working date
  picker in the chat: pick a day, pick a time, and it confirms, posts a follow-up message,
  and adds an action item.
- **Concept** runs a fuller arc to a realisation ("is that patience, or is it
  protection?") and closes by offering to share a summary with the human coach.

"Start a new session" clears either one back to the greeting, where the live scripted
engine takes over.

The composer and the privacy disclaimer are pinned to the bottom of the pane — the thread
is the scroll container, not the pane, so the conversation scrolls above them and they
stay reachable. Both open at the top of the conversation rather than jumping to the
newest message; auto-scroll only kicks in for messages that arrive after first paint.

Highlights for the current thread are **replayed through the engine** so the panel can't
drift from what the engine would really produce. The concept's are **authored**: the value
of that conversation is the reframe the member arrives at, which keyword matching can't
extract.

### Why it isn't wired to Claude

This is deliberate, so the prototype stays shareable. A browser app calling the Anthropic
API needs the key in the client bundle, where **anyone who opens the prototype can read it
from devtools and spend against it**. There's also the content question: coaching
conversations are exactly the sensitive material that shouldn't flow to an unapproved
destination, and right now nothing typed here leaves the page.

### Upgrading to real Claude later

`src/coach/provider.ts` is the seam. Set `VITE_COACH_PROXY_URL` (see `.env.example`) to a
server-side endpoint that holds the key and forwards to the API:

```
POST { messages: [{ role: 'user' | 'assistant', content: string }] }
200  { reply: string }
```

No client change needed, and it falls back to the scripted engine if the proxy errors, so
a broken endpoint never leaves someone staring at a dead input. Deploying that proxy is
an internal-app exercise — worth routing through the Launchpad prototyping process rather
than standing up something ad hoc.

## Structure

```
src/
  App.tsx                  owns tab + mode + split state, renders both versions
  Compare.tsx              the slider harness
  useRowSync.ts            keeps matched rows the same height on both sides
  compare.css              harness chrome (belongs to neither version)
  tokens.css               shared design tokens + fonts
  nav.ts                   the screen set, shared so both sides stay in sync
  data.ts                  mock content (member, coach, scores, articles…)
  icons.tsx                inline line-icon set
  coach/                   the scripted coach + the seam for a real model
    engine.ts  provider.ts  seed.ts  Scheduler.tsx  types.ts
  styles/
    base.css               reset, element defaults, display face
    primitives.css         shared UI primitives + the account dropdown
  versions/
    current/               FROZEN baseline — the shipping design
      Root.tsx  TopNav.tsx  AccountMenu.tsx
      PartnerRoot.tsx      the partner/admin shell
      CoachRoot.tsx        the coach shell + CoachTopNav.tsx
      styles/              one file per shell: member · partner · coach
      screens/             member screens + screens/partner/
        coach/             the seven coach screens
          member/          the nine-tab member drill-down
    next/                  the concept we iterate on
      Root.tsx  next.css  screens/
```

### Iterating on the concept

`versions/next/screens/index.ts` is a registry of screens we've reimagined. Anything
absent falls back to the current design with a "not yet reimagined" marker, so we
redesign one screen at a time instead of maintaining six throwaway copies:

```ts
export const nextScreens = { home: Home, ai: AICoaching, schedule: Schedule }
```

Two rules keep the baseline safe:

- **Don't edit `versions/current/`.** It's the "before" side. Deliberate, explicitly
  requested exceptions so far, all meant to apply to *both* sides: AI Coaching's left
  panel starts collapsed; Schedule shows the populated "Upcoming schedule" state rather
  than the empty state (still faithful — just a different real state of the product); the
  avatar opens an account dropdown; and Home's cards use a solid white border instead of
  the product's 75%-opacity one. Anything that should differ *between* the two sides
  belongs in `next/`.
- **Put shell styles in the right file.** `versions/current/styles/` holds one file per
  shell (`member.css`, `partner.css`, `coach.css`); anything used by more than one shell
  belongs in `src/styles/primitives.css`. Load order is base → primitives → member →
  partner → coach → next. `coach.css` is self-contained — it used to override
  `partner.css`, but the coach shell now owns its own chrome, so the two no longer share
  anything.
- **Scope every new rule under `.v-next`** in `next.css`. It loads after `theme.css`, so
  it wins on equal specificity, and it can override tokens wholesale
  (`.v-next { --accent: …; --radius: …; }`) without touching the baseline.

The `next` version currently borrows the nav from `current`. When we redesign the chrome,
add a `TopNav` under `versions/next/` and swap the import in its `Root.tsx`.

## Fidelity notes

Worth knowing before we iterate:

- **Colors are eyedropped from the screenshots**, not from a token export. `--accent`
  (`#c4084f`) and the Home/AI gradients are the closest approximations, not official values.
  Swap `:root` in `theme.css` when we get the real tokens.
- **Type**: headings use Source Serif 4 (bundled woff2, upright + italic) standing in for
  the product's Tiempos-style serif display face. Body copy is the system sans stack.
- **Illustrations are emoji placeholders.** Every spot illustration, coach photo, and
  article hero image is a gradient blob or emoji — the real assets aren't in this repo.
- The well-being chart's four check-ins are positioned to match the screenshot
  (Feb cluster + a July 15 point); band boundaries render at 0/50/70/90 while the legend
  keeps the product's `0-48 / 52-68 / 72-88 / 92-100` labels.
- Laid out for a ~1600px desktop viewport. There's one breakpoint at 1500px; below
  roughly 1100px it isn't designed yet — and the comparison slider is least useful at
  narrow widths, since each half gets very little room.
- Concept work so far: **Home** (coach-recommended role play replaces the Personal
  Concierge card) and **Schedule** (session-allowance line under the header).
  **AI Coaching** is forked but not yet changed — an identical copy of the current screen,
  ready to diverge. Insights, Coaching and Discover still fall back to the baseline.
- Each pane holds its own conversation state, so a chat on one side doesn't appear on the
  other. Both start from the same empty thread.
